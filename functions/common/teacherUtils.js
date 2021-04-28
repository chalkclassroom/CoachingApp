const Firestore = require("@google-cloud/firestore");

const PROJECTID = "cqrefpwa";
const firestore = new Firestore({
    projectId: PROJECTID
});



export const canAccessTeacher = async (teacher, userId) => {
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

export const canAccessActionPlans = async (teacher, userId) => {
    return teacher === userId || await canAccessTeacher(teacher, userId)
}