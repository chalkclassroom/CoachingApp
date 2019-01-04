import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyB7IUNOBelyA5-rMBSM4PtADvlvUOqe6NU",
    authDomain: "cqrefpwa.firebaseapp.com",
    databaseURL: "https://cqrefpwa.firebaseio.com",
    projectId: "cqrefpwa",
    storageBucket: "cqrefpwa.appspot.com",
    messagingSenderId: "353838544707"
};

export const isSignedIn = function() {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    var user = firebase.auth().currentUser;
    console.log('user status:');
    console.log(user);
    return !!user;
};

export const firebaseEmailSignUp = function (userData, role) {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }

    console.log(role);
    console.log(userData);
    firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(errorCode+':'+ errorMessage);
    });
};

export const firebaseEmailSignIn = function (userData, role) {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    const auth = firebase.auth();

    console.log(role);
    console.log(userData);

    firebase.auth().signInWithEmailAndPassword(userData.email, userData.password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(errorCode+':'+ errorMessage);
    });
};



export const firebaseSignOut = function (userData, role) {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log('Signed Out');
    }).catch(function(error) {
        // An error happened.
    });
};