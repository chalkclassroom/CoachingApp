const Firestore = require("@google-cloud/firestore");

const PROJECTID = "cqrefpwa";
const firestore = new Firestore({
    projectId: PROJECTID
});

const canAccessTeacher = async (teacher, userId) => {
    const docRef = await firestore.collection("users")
        .doc(userId);
    const docData = await docRef.get().then((doc) => {
        if (doc.exists) {
          return doc.data();
        } else {
          console.log("Doc does not exist");
        }
      }).catch(error => console.error("Error getting cached document:", error));
    const role = docData.role;

    if (role === 'admin'){
        return true;
    }else if (role === 'coach'){
        const partnerCollection = await docRef.listCollections().then(collections => collections.find(c => c.id === "partners"))
        return (await partnerCollection.doc(teacher).get()).exists
    }else{
        return docData.email === "practice@teacher.edu" //self or practice teacher
    }
}

/**
 * User can access an observation if they either are the user that submitted the observation
 * or can access the teacher.
 * @param observation
 * @param userId
 * @returns {Promise<boolean|*>}
 */
const canAccessObservation = async (observation, userId) => {
    if (!observation || observation === ""){
        return false;
    }
    /*
     * TODO Maybe adjust for roles? I.e. coach can only access
     * observations they submitted, but school admin can access
     * any observation for their teachers?
     */
    const docData = await firestore.collection('observations')
        .doc(observation).get()
        .then((doc) => {
            if (doc.exists) {
              return doc.data();
            } else {
              console.log("Doc does not exist");
            }
          })
        .catch(err => console.error("Error getting observation doc:", err));
    const teacher = docData.teacher;
    const observedBy = docData.observedBy;
    return userId === observedBy.substring(observedBy.lastIndexOf("/") + 1)
        ||await canAccessTeacher(teacher.substring(teacher.lastIndexOf("/") + 1), userId)
}

const canAccessActionPlans = async (teacher, userId) => {
    return teacher === userId || await canAccessTeacher(teacher, userId)
}

module.exports = {
    canAccessObservation,
    canAccessTeacher,
    canAccessActionPlans
};
