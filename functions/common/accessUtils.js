const Firestore = require("@google-cloud/firestore");

const PROJECTID = "cqrefpwa";
const firestore = new Firestore({
    projectId: PROJECTID
});

const canAccessTeacher = async (teacher, userId) => {
    const doc = await firestore.collection("users")
        .doc(userId)
        .get().catch(error => console.error("Error getting cached document:", error));
    const role = doc.data().role

    if (role === 'admin'){
        return true;
    }else if (role === 'coach'){
        const partnerCollection = doc.collection("partners")
        return (await partnerCollection.doc(teacher).get()).exists
    }else{
        return doc.data().email === "practice@teacher.edu" //self or practice teacher
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
    /*
     * TODO Maybe adjust for roles? I.e. coach can only access
     * observations they submitted, but school admin can access
     * any observation for their teachers?
     */
    const doc = await firestore.collection('observations')
        .doc(observation).get()
        .catch(err => console.error("Error getting observation doc:", err));
    const obsDoc = doc.data();
    const teacher = obsDoc.teacher;
    const observedBy = obsDoc.observedBy;
    return userId === observedBy.substring(observedBy.lastIndexOf("/") + 1)
        ||await canAccessTeacher(teacher.substring(teacher.lastIndexOf("/") + 1))
}

const canAccessActionPlans = async (teacher, userId) => {
    return teacher === userId || await canAccessTeacher(teacher, userId)
}

module.exports = {
    canAccessObservation,
    canAccessTeacher,
    canAccessActionPlans
};

