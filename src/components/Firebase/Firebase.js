import * as firebase from 'firebase';

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
        }
    }

    firebaseEmailSignUp = async function (userData, role) {
        console.log(role);
        console.log(userData);
        await this.auth.createUserWithEmailAndPassword(userData.email, userData.password)
            .then(function(userInfo) {
                console.log("Create user and sign in Success", userInfo);
                var data = {
                    email: userData.email,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    role: role,
                    id: userInfo.user.uid
                };
                firebase.database().ref('users/' + role +'/'+ userInfo.user.uid).set(data).then(function(ref) {//use 'child' and 'set' combination to save data in your own generated key
                    console.log("Saved");
                    return true;
                }, function(error) {
                    console.log(error);
                    return false;
                });
            })
            .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error(errorCode+':'+ errorMessage);
            alert(errorMessage);
            return false;
        });
    };

    firebaseEmailSignIn = async function (userData, role) {
        console.log(role);
        console.log(userData);

        await this.auth.signInWithEmailAndPassword(userData.email, userData.password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error(errorCode+':'+ errorMessage);
            alert(errorMessage);
            return errorMessage;
        });
    };

    firebaseSignOut = async function () {
        await this.auth.signOut().then(function() {
            // Sign-out successful.
            console.log('Signed Out');
        }).catch(function(error) {
            // An error happened.
            console.log('Signed Out Unsuccessful');
        });
    };

    resetPassword  = (email) => {
        return this.auth.sendPasswordResetEmail(email);
    };

    getTeacherList = function () {
        return firebase.database().ref('users/teacher/');
    };

    getCoachList = function () {
        return firebase.database().ref('users/coach/');
    };

    getAdminList = function () {
        return firebase.database().ref('users/administrator/');
    };
}

export default Firebase;
