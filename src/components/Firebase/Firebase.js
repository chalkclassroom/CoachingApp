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
      this.db.settings({timestampsInSnapshots: true});
      // this.db.enablePersistence({experimentalTabSynchronization:true}).then(() => {
      //   console.log("Woohoo! Multi-Tab Persistence!");
      // }).catch((err=>{console.log("Offline Not Working")}));

      this.functions = firebase.functions();
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
      .doc(this.auth.currentUser.uid)
      .collection("partners")
      .get()
      .then( partners => {
        let teacherList = [];
        partners.forEach( (partner) => {
          console.log(partner.id, "=>", partner.data());
          teacherList.push(this.getTeacherInfo(partner.id).then((doc=> doc.data()))
          );
        })
        return teacherList;
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  };

  getTeacherInfo = async (partnerId) =>{
     return await firebase.firestore().collection("users").doc(partnerId).get();
  }

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

  sessionRef;

  handleSession = async mEntry => {
    this.sessionRef = this.db.collection("observations").doc();
    this.sessionRef.set({
      observedBy: "/user/" + mEntry.observedBy,
      start: firebase.firestore.FieldValue.serverTimestamp(),
      teacher: "/user/" + mEntry.teacher,
      end: firebase.firestore.FieldValue.serverTimestamp(),
      type: "climate"
    });
  };

  endSession = async () => {
    this.sessionRef.update({
      end: firebase.firestore.FieldValue.serverTimestamp()
    });
  };

  handlePushFireStore = async mEntry => {
    const userRef = this.sessionRef.collection("entries").add({
      BehaviorResponse: mEntry.BehaviorResponse,
      Type: mEntry.Type,
      Timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  };

  fetchClimateSessionDates = async teacherId => {
    var getClimateSessionDatesFirebaseFunction = this.functions.httpsCallable('funcSessionDates');

    return getClimateSessionDatesFirebaseFunction({teacherId: teacherId}).then(function(result) {
      // Read result of the Cloud Function.
      var sanitizedMessage = result.data[0];
      console.log(sanitizedMessage);
      return sanitizedMessage;

    });

  };

  fetchAvgToneRating = async sessionId => {
    var getAvgToneRatingFirebaseFunction = this.functions.httpsCallable('funcAvgToneRating');

    return getAvgToneRatingFirebaseFunction({sessionId: sessionId}).then(function(result) {
      // Read result of the Cloud Function.
      var sanitizedMessage = result.data[0];
      console.log(sanitizedMessage);
      return sanitizedMessage;
    });

  };


  fetchBehaviourTypeCount = async sessionId => {
    var getBehaviourTypeCountFirebaseFunction = this.functions.httpsCallable('funcBehaviourTypeCount');

    return getBehaviourTypeCountFirebaseFunction({sessionId: sessionId}).then(function(result) {
      // Read result of the Cloud Function.
      var sanitizedMessage = result.data[0];
      console.log(sanitizedMessage);
      return sanitizedMessage;
    });

  };

  fetchBehaviourTrend = async teacherId => {
    var getBehaviourTrendFirebaseFunction = this.functions.httpsCallable('funcBehaviourTrend');

    return getBehaviourTrendFirebaseFunction({teacherId: teacherId}).then(function(result) {
      // Read result of the Cloud Function.
      var sanitizedMessage = result.data[0];
      console.log(sanitizedMessage);
      return sanitizedMessage;

    });

  };
}

export default Firebase;
