import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyB7IUNOBelyA5-rMBSM4PtADvlvUOqe6NU",
    authDomain: "cqrefpwa.firebaseapp.com",
    databaseURL: "https://cqrefpwa.firebaseio.com",
    projectId: "cqrefpwa",
    storageBucket: "cqrefpwa.appspot.com",
    messagingSenderId: "353838544707"
};

class Firebase {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
            this.auth = firebase.auth();
            this.db = firebase.firestore();
        }
    }

    firebaseEmailSignUp = async function(userData, role) {
        console.log(role);
        console.log(userData);
        await this.auth
            .createUserWithEmailAndPassword(userData.email, userData.password)
            .then(function(userInfo) {
                console.log("Create user and sign in Success", userInfo);
                var data = Object.assign(
                    {},
                    {
                        email: userData.email,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        role: role,
                        id: userInfo.user.uid
                    }
                );

                firebase
                    .firestore()
                    .collection("users")
                    .doc(userInfo.user.uid)
                    .set(data)
                    .then(function(docRef) {
                        console.log("Document written with ID: ", docRef.id);
                    })
                    .catch(function(error) {
                        console.error("Error adding document: ", error);
                    });

                // firebase.database().ref('users/' + role +'/'+ userInfo.user.uid).set(data).then(function(ref) {//use 'child' and 'set' combination to save data in your own generated key
                //     console.log("Saved");
                //     return true;
                // }, function(error) {
                //     console.log(error);
                //     return false;
                // });
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error(errorCode + ":" + errorMessage);
                alert(errorMessage);
                return false;
            });
    };

    firebaseEmailSignIn = async function(userData, role) {
        console.log(role);
        console.log(userData);

        await this.auth
            .signInWithEmailAndPassword(userData.email, userData.password)
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error(errorCode + ":" + errorMessage);
                alert(errorMessage);
                return errorMessage;
            });
    };

    firebaseSignOut = async function() {
        await this.auth
            .signOut()
            .then(function() {
                // Sign-out successful.
                console.log("Signed Out");
            })
            .catch(function(error) {
                // An error happened.
                console.log("Signed Out Unsuccessful");
            });
    };

    resetPassword = email => {
        return this.auth.sendPasswordResetEmail(email);
    };

    getTeacherList = function() {
        return firebase
            .firestore()
            .collection("users")
            .where("role", "==", "teacher")
            .get()
            .then(function(querySnapshot) {
                let teacherList = [];
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    teacherList.push(doc.data());
                });
                console.log(teacherList);
                return teacherList;
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
    };

    getCoachList = function() {
        return firebase
            .firestore()
            .collection("users")
            .where("role", "==", "coach")
            .get()
            .then(function(querySnapshot) {
                let teacherList = [];
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    teacherList.push(doc.data());
                });
                console.log(teacherList);
                return teacherList;
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
    };

    getAdminList = function() {
        return firebase
            .firestore()
            .collection("users")
            .where("role", "==", "admin")
            .get()
            .then(function(querySnapshot) {
                let teacherList = [];
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    teacherList.push(doc.data());
                });
                console.log(teacherList);
                return teacherList;
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
    };

    handlePushFire = async entry => {
        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        const userRef = db.collection("observation").add({
            BehaviorResponse: entry.observable,
            InstructionTransition: entry.climateType,
            TeacherID: this.props.teacherId,
            Timestamp: this.props.firebase.database.ServerValue.TIMESTAMP,
            Type: "climate"
        });
    };
}

export default Firebase;
