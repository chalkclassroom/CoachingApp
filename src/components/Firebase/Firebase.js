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
      this.db.settings({ timestampsInSnapshots: true });
      this.db.enablePersistence({ experimentalTabSynchronization: true }).then(() => {
        console.log("Woohoo! Multi-Tab Persistence!");
      }).catch((err => {
        console.log("Offline Not Working");
      }));

      this.functions = firebase.functions();
    }
  }

  firebaseEmailSignUp = async function(userData, role) {
    await this.auth
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then(function(userInfo) {
        console.log("Create user and sign in Success", userInfo);
        const data = Object.assign(
          {},
          {
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: role,
            id: userInfo.user.uid
          }
        );
        const docRef = firebase.firestore().collection('users').doc(userInfo.user.uid);
        docRef.set(data)
          .then( () => {
            console.log("Document written with ID: ", docRef.id);
            if (role === 'coach') {
              docRef.collection('partners')
                .doc('rJxNhJmzjRZP7xg29Ko6') // Practice Teacher Uid
                .set({})
                .then( () => {
                  console.log("Practice Teacher added to coach!");
                })
                .catch( error => {
                  console.error("Error occurred while assigning practice teacher to coach: ", error);
                })
            } else {
              console.log("User properly added to Firebase!");
            }
          })
          .catch(function(error) {
            console.error("Error adding coach: ", error);
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
    return this.db
      .collection("users")
      .doc(this.auth.currentUser.uid)
      .collection("partners")
      .get()
      .then(partners => {
        let teacherList = [];
        partners.forEach(partner => {
          //console.log(partner.id, "=>", partner.data());
          teacherList.push(this.getTeacherInfo(partner.id));
        });
        return teacherList;
      })
      .catch(function(error) {
        console.error("Error getting partner list: ", error);
      });
  };

  getFullTeacherList = function() {
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
          teacherList.push(doc.data().then((doc => doc.data()))
          );
        });
        console.log(teacherList);
        return teacherList;
      })
      .catch(function(error) {
        console.error("Error getting documents: ", error);
      });
  };

  // Retrieves a teacher's User data
  // @param:string partnerID -> UID retrieved from a coach's 'partners' list
  // @return:object teacher's user object with corresponding ID
  getTeacherInfo = function(partnerID) {
    return this.db
      .collection("users")
      .doc(partnerID)
      .get()
      .then(doc => {
        if (doc.exists) {
          return doc.data();
        } else {
          console.log("Partner's ID is 'undefined' in dB.")
        }
      }).catch(error => {
        console.error("Error occurred when getting document:", error);
      })
  };

  // Pushes edits to a teacher's User data
  // @param:string partnerID -> UID retrieved from a coach's 'partners' list
  // @param:object edits -> object containing edited information
  // @return:boolean -> true on success, false o/w
  setTeacherInfo = function(partnerID, edits) {
    if (partnerID === "rJxNhJmzjRZP7xg29Ko6") {
      console.log("You can't edit the Practice Teacher!")
    } else {
      const { firstName, lastName, school, email, notes } = edits;
      return this.db
        .collection("users")
        .doc(partnerID)
        .set({
          firstName: firstName,
          lastName: lastName,
          school: school,
          email: email,
          notes: notes
        }, { merge: true })
        .then(() => true )
        .catch(error => {
          console.error("Error occurred when writing document:", error);
          return false;
        })
    }
  };

  // Adds a teacher to the dB AND to the coach's 'partners' list
  // @param:object teacherInfo -> object containing teacher's information
  // @return:string -> id on success, empty string "" o/w
  addTeacher = function(teacherInfo) {
    const { firstName, lastName, school, email, notes } = teacherInfo;
    console.log(firstName, lastName, school);
    let newTeacherRef = this.db.collection("users").doc(); // auto-generated iD
    return newTeacherRef.set({
      firstName: firstName,
      lastName: lastName,
      school: school,
      email: email,
      notes: notes,
      role: "teacher",
      id: newTeacherRef.id
    })
      .then( () => {
        const id = newTeacherRef.id; // get new iD
        return this.db
          .collection("users")
          .doc(this.auth.currentUser.uid)
          .collection("partners")
          .doc(id)
          .set({})
          .then(() => id)
          .catch(error => {
            console.error("Error occurred when adding teacher to coach's partner list: ", error);
            return "";
          })
      })
      .catch( error => {
        console.error("Error occurred when adding teacher to dB: ", error);
        return "";
      })
  };

  // Removes a partner from the user's 'partners' subcollection
  // @param:string partnerID -> id of partner to be removed
  // @return:Promise -> prints to console, no other return object
  removePartner = function(partnerID) {
    if (partnerID === "rJxNhJmzjRZP7xg29Ko6") {
      console.log("You can't delete the Practice Teacher!")
    } else {
      return this.db
        .collection("users")
        .doc(this.auth.currentUser.uid)
        .collection("partners")
        .doc(partnerID)
        .delete()
        .then(() =>
          console.log("Partner successfully removed from Partners list!"))
        .catch( error => console.error("An error occurred trying to remove the teacher from" +
          " the Partners list: ", error))
    }
  };

  // Gets most recent observation of each type for a teacher
  // @param:string partnerID -> iD of teacher
  // @return:Promise -> onFulfilled:returns Array of dates of most recent observations
  //                 '-> onRejected: prints error to console
  // NOTE: Index specified in Firebase console in order to execute Query
  getRecentObservations = function(partnerID) {
    const obsRef = this.db.collection('observations')
      .where('teacher','==',`/user/${partnerID}`)
      .where('observedBy','==',`/user/${this.auth.currentUser.uid}`);
    // ONLY 'transition','climate', & 'AC' types specified in dB! The rest are subject to change!
    return Promise.all([
      obsRef.where('type','==','transition')
        .orderBy('end','desc')
        .limit(1)
        .get(),
      obsRef.where('type','==','climate')
        .orderBy('end','desc')
        .limit(1)
        .get(),
      obsRef.where('type','==','listening')
        .orderBy('end','desc')
        .limit(1)
        .get(),
      obsRef.where('type','==','level')
        .orderBy('end','desc')
        .limit(1)
        .get(),
      obsRef.where('type','==','math')
        .orderBy('end','desc')
        .limit(1)
        .get(),
      obsRef.where('type','==','engagement')
        .orderBy('end','desc')
        .limit(1)
        .get(),
      obsRef.where('type','==','sequential')
        .orderBy('end','desc')
        .limit(1)
        .get(),
      obsRef.where('type','==','AC')
        .orderBy('end','desc')
        .limit(1)
        .get()
    ])
      .then( snapshots => {
        const recentObs = new Array(8).fill(null);
        snapshots.forEach( (snapshot, index) => {
          snapshot.forEach( doc => { // doc.data() can't be undefined
            recentObs[index] = doc.data().end.toDate().toLocaleDateString();
          })
        });
        return recentObs
      })
      .catch( error => {
        console.error("Error occurred during Promise.all() resolution: ", error);
      })
  };

  getTeacherFirstName = function() {
    return firebase
      .firestore()
      .collection("users")
      .doc(this.auth.currentUser.uid)
      .get()
      .then(function(doc) {
        // Document was found in the cache. If no cached document exists,
        // an error will be returned to the 'catch' block below.
        console.log("Cached document data:", doc.data());
        return doc.data().firstName;
      }).catch(function(error) {
        console.error("Error getting cached document:", error);
      });
  };

  getTeacherLastName = function() {
    return firebase
      .firestore()
      .collection("users")
      .doc(this.auth.currentUser.uid)
      .get()
      .then(function(doc) {
        // Document was found in the cache. If no cached document exists,
        // an error will be returned to the 'catch' block below.
        console.log("Cached document data:", doc.data());
        return doc.data().lastName;
      }).catch(function(error) {
        console.error("Error getting cached document:", error);
      });
  };

  getTeacherEmail = function() {
    return firebase
      .firestore()
      .collection("users")
      .doc(this.auth.currentUser.uid)
      .get()
      .then(function(doc) {
        // Document was found in the cache. If no cached document exists,
        // an error will be returned to the 'catch' block below.
        console.log("Cached document data:", doc.data());
        return doc.data().email;
      }).catch(function(error) {
        console.error("Error getting cached document:", error);
      });
  };

  getTeacherSchool = function() {
    return firebase
      .firestore()
      .collection("schools")
      .doc(this.auth.currentUser.uid)
      .get()
      .then(function(doc) {
        // Document was found in the cache. If no cached document exists,
        // an error will be returned to the 'catch' block below.
        console.log("Cached document data:", doc.data());
        return doc.data().name;
      }).catch(function(error) {
        console.error("Error getting cached document:", error);
      });
  };

  getTeacherObservationNum = function() {
    return firebase
      .firestore()
      .collection("observations")
      .doc(this.auth.currentUser.uid)
      .get()
      .then(function(doc) {
        // Document was found in the cache. If no cached document exists,
        // an error will be returned to the 'catch' block below.
        console.log("Cached document data:", doc());
        return doc.id();
      }).catch(function(error) {
        console.error("Error getting cached document:", error);
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
          teacherList.push(doc.data().then((doc => doc.data()))
          );
        });
        console.log(teacherList);
        return teacherList;
      })
      .catch(function(error) {
        console.error("Error getting documents: ", error);
      });
  };

  getCoachFirstName = function() {
    return firebase
      .firestore()
      .collection("users")
      .doc(this.auth.currentUser.uid)
      .get()
      .then(function(doc) {
        // Document was found in the cache. If no cached document exists,
        // an error will be returned to the 'catch' block below.
        console.log("Cached document data:", doc.data());
        return doc.data().firstName;
      }).catch(function(error) {
        console.error("Error getting cached document:", error);
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
        console.error("Error getting documents: ", error);
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
      type: mEntry.type
    });
  };

  endSession = async () => {
    this.sessionRef.update({
      end: firebase.firestore.FieldValue.serverTimestamp()
    });
  };

  helloWorld = async () => {
    alert("Hello World!!");
  };

  handlePushAC = async mEntry => {
    const userRef = this.sessionRef.collection("entries").add({
      Checked: mEntry.checked.slice(1),
      PeopleType: mEntry.people,
      Timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  };

  handlePushTransition = async mEntry => {
    const userRef = this.sessionRef.collection("entries").add({
      TrnStart: mEntry.start,
      TrnEnd: mEntry.end,
      TrnDur: mEntry.duration,
      TrnType: mEntry.transitionType,
      Timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  };

  handlePushClimate = async mEntry => {
    const userRef = this.sessionRef.collection("entries").add({
      BehaviorResponse: mEntry.BehaviorResponse,
      Type: mEntry.Type,
      Timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  };

  handlePushNotes = async mNote => {
    const noteRef = this.sessionRef.collection("notes").add({
      Timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      Note: mNote
    });
  };

  handlePushTeachers = async mEntry => {
    const userRef = this.sessionRef.collection("entries").add({
      Type: mEntry.Type,
    });
  };

  handleFetchNotes = async () => {
    return this.sessionRef.collection("notes")
      .get()
      .then(function(querySnapshot) {
        let notesArr = [];
        querySnapshot.forEach(function(doc) {
          //console.log("doc data: ", doc.data());
          // doc.data() is never undefined for query doc snapshots
          notesArr.push({ id: doc.id, content: doc.data().Note, timestamp: doc.data().Timestamp });
        });
        //console.log("Logging firebase notesArr: ", notesArr);
        return notesArr;
      });
  };


  handleFetchNotesResults = async (sessionId) => {
    this.sessionRef = this.db.collection("observations").doc(sessionId);
    return this.sessionRef.collection("notes")
      .get()
      .then(function(querySnapshot) {
        let notesArr = [];
        querySnapshot.forEach(function(doc) {
          //console.log("doc data: ", doc.data());
          // doc.data() is never undefined for query doc snapshots
          notesArr.push({ id: doc.id, content: doc.data().Note, timestamp: doc.data().Timestamp });
        });
        //console.log("Logging firebase notesArr: ", notesArr);
        return notesArr;
      });
  };

  // fetchClimateSessionDates = async teacherId => {
  //     var getClimateSessionDatesFirebaseFunction = this.functions.httpsCallable('funcSessionDates');
  //
  //     return getClimateSessionDatesFirebaseFunction({teacherId: teacherId}).then(function (result) {
  //         // Read result of the Cloud Function.
  //         var sanitizedMessage = result.data[0];
  //         console.log(sanitizedMessage);
  //         return sanitizedMessage;
  //
  //     });
  //
  // };

  fetchAvgToneRating = async sessionId => {
    var getAvgToneRatingFirebaseFunction = this.functions.httpsCallable("funcAvgToneRating");

    return getAvgToneRatingFirebaseFunction({ sessionId: sessionId }).then(function(result) {
      // Read result of the Cloud Function.
      var sanitizedMessage = result.data[0];
      console.log(sanitizedMessage);
      return sanitizedMessage;
    });

  };


  fetchBehaviourTypeCount = async sessionId => {
    var getBehaviourTypeCountFirebaseFunction = this.functions.httpsCallable("funcBehaviourTypeCount");

    return getBehaviourTypeCountFirebaseFunction({ sessionId: sessionId }).then(function(result) {
      // Read result of the Cloud Function.
      var sanitizedMessage = result.data[0];
      console.log(sanitizedMessage);
      return sanitizedMessage;
    });

  };

  fetchBehaviourTrend = async teacherId => {
    var getBehaviourTrendFirebaseFunction = this.functions.httpsCallable("funcBehaviourTrend");

    return getBehaviourTrendFirebaseFunction({ teacherId: teacherId }).then(function(result) {
      // Read result of the Cloud Function.
      var sanitizedMessage = result.data[0];
      console.log(sanitizedMessage);
      return sanitizedMessage;

    });

  };

  fetchSessionDates = async (teacherId, sessionType) => {
    var getTransitionSessionDatesFirebaseFunction = this.functions.httpsCallable("funcSessionDates");

    return getTransitionSessionDatesFirebaseFunction({
      teacherId: teacherId,
      type: sessionType
    }).then(function(result) {
      // Read result of the Cloud Function.
      var sanitizedMessage = result.data[0];
      console.log(sanitizedMessage);
      return sanitizedMessage;

    });

  };

  fetchTransitionSummary = async sessionId => {
    var getTransitionTypeCountFirebaseFunction = this.functions.httpsCallable("funcTransitionOfSession");

    return getTransitionTypeCountFirebaseFunction({ sessionId: sessionId }).then(function(result) {
      // Read result of the Cloud Function.
      var sanitizedMessage = result.data[0];
      console.log(sanitizedMessage);
      return sanitizedMessage;
    });

  };

  fetchTransitionLog = async sessionId => {
    var getTransitionsFirebaseFunction = this.functions.httpsCallable("funcTransitionLog");

    return getTransitionsFirebaseFunction({ sessionId: sessionId }).then(function(result) {
      // Read result of the Cloud Function.
      var sanitizedMessage = result.data[0];
      console.log(sanitizedMessage);
      return sanitizedMessage;
    });

  };

  fetchTransitionTrend = async teacherId => {
    var getTransitionTrendFirebaseFunction = this.functions.httpsCallable("funcTransitionTrend");

    return getTransitionTrendFirebaseFunction({ teacherId: teacherId }).then(function(result) {
      // Read result of the Cloud Function.
      var sanitizedMessage = result.data[0];
      console.log(sanitizedMessage);
      return sanitizedMessage;
    });
  };
}

export default Firebase;
