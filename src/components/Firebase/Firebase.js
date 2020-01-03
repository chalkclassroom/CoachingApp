import * as firebase from "firebase";

// Need to find a new place for this...
// ask Jules about where to put it
const config = {
  apiKey: "AIzaSyB7IUNOBelyA5-rMBSM4PtADvlvUOqe6NU",
  authDomain: "cqrefpwa.firebaseapp.com",
  databaseURL: "https://cqrefpwa.firebaseio.com",
  projectId: "cqrefpwa",
  storageBucket: "cqrefpwa.appspot.com",
  messagingSenderId: "353838544707",
  measurementId: "G-S797QZ8L3N"
};

class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
      this.auth = firebase.auth();
      this.db = firebase.firestore();
      this.db
        .enablePersistence({ experimentalTabSynchronization: true })
        .then(() => console.log("Woohoo! Multi-Tab Persistence!"))
        .catch(error => console.error("Offline Not Working: ", error));
      this.functions = firebase.functions();
      this.sessionRef = null;
    }
  }

  firebasePilotSignUp = async function(userData) {
    const data = Object.assign(
      {},
      {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        program: userData.program
      }
    );
    const docRef = firebase.firestore().collection('pilotForm').doc();
    docRef.set(data)
      .then( () => {
        console.log("Visitor submitted pilot form");
      })
      .catch(function(error) {
        console.error("Error signing up: ", error);
      });
  };

  emailListSignUp = async email => {
    this.sessionRef = this.db.collection("emailList").doc();
    this.sessionRef.set({
      email: email
    });
  };

  firebaseEmailSignUp = async function(userData, role) {
    return this.auth
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then(userInfo => {
        console.log("Create user and sign in Success", userInfo);
        const data = {
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: role,
          id: userInfo.user.uid
        };
        const docRef = firebase
          .firestore()
          .collection("users")
          .doc(userInfo.user.uid);
        docRef
          .set(data)
          .then(() => {
            if (role === "coach") {
              docRef
                .collection("partners")
                .doc("rJxNhJmzjRZP7xg29Ko6") // Practice Teacher UID
                .set({})
                .then(() => console.log("Practice Teacher added to coach!"))
                .catch(error =>
                  console.error(
                    "Error occurred while assigning practice teacher to coach: ",
                    error
                  )
                );
            } else console.log("User properly added to Firebase!");
          })
          .catch(error => console.error("Error adding coach: ", error));
      })
      .catch(error => console.error("Error creating user signup: ", error));
  };

  firebaseEmailSignIn = async function(userData) {
    return this.auth
      .signInWithEmailAndPassword(userData.email, userData.password)
      .catch(error => console.error("Error signing in: ", error));
  };

  firebaseSignOut = async function() {
    return this.auth
      .signOut()
      .then(() => console.log("Successfully Signed Out!"))
      .catch(error => console.error("Sign Out Unsuccessful: ", error));
  };

  resetPassword = async function(email) {
    return this.auth
      .sendPasswordResetEmail(email)
      .catch(error =>
        console.error("Error occurred sending password reset email: ", error)
      );
  };

  getTeacherList = async function() {
    return this.db
      .collection("users")
      .doc(this.auth.currentUser.uid)
      .collection("partners")
      .get()
      .then(partners => {
        const teacherList = [];
        partners.forEach(partner =>
          teacherList.push(this.getTeacherInfo(partner.id))
        );
        return teacherList;
      })
      .catch(error => console.error("Error getting partner list: ", error));
  };

  getFullTeacherList = async function() {
    return firebase
      .firestore()
      .collection("users")
      .where("role", "==", "teacher")
      .get()
      .then(snapshot => {
        const teacherList = [];
        snapshot.forEach(doc =>
          teacherList.push(doc.data().then(doc => doc.data()))
        );
        return teacherList;
      })
      .catch(error => console.error("Error getting teacher list: ", error));
  };

  // Retrieves a teacher's User data
  // @param:string partnerID -> UID retrieved from a coach's 'partners' list
  // @return:Promise -> onFulfilled: returns Object of teacherInfo
  //                '-> onRejected: prints error to console
  getTeacherInfo = async function(partnerID) {
    return this.db
      .collection("users")
      .doc(partnerID)
      .get()
      .then(doc => {
        if (doc.exists) {
          return doc.data();
        } else {
          console.log("Partner's ID is 'undefined' in dB.");
        }
      })
      .catch(error =>
        console.error("Error occurred when getting document:", error)
      );
  };

  // Pushes edits to a teacher's User data
  // @param:string partnerID -> UID retrieved from a coach's 'partners' list
  // @param:object edits -> object containing edited information
  // @return:Promise -> onFulfilled: returns true
  //                '-> onRejected: returns false
  setTeacherInfo = async function(partnerID, edits) {
    if (partnerID === "rJxNhJmzjRZP7xg29Ko6") {
      console.log("You can't edit the Practice Teacher!");
    } else {
      const { firstName, lastName, school, email, phone, notes } = edits;
      return this.db
        .collection("users")
        .doc(partnerID)
        .set(
          {
            firstName: firstName,
            lastName: lastName,
            school: school,
            email: email,
            phone: phone,
            notes: notes
          },
          { merge: true }
        )
        .catch(error =>
          console.error("Error occurred when writing document:", error)
        );
    }
  };

  // Adds a teacher to the dB AND to the coach's 'partners' list
  // @param:object teacherInfo -> object containing teacher's information
  // @return:Promise -> onFulfilled: returns id string of new teacher
  //                '-> onRejected: returns ""
  addTeacher = async function(teacherInfo) {
    const { firstName, lastName, school, email, notes, phone } = teacherInfo;
    const newTeacherRef = this.db.collection("users").doc(); // auto-generated iD
    return newTeacherRef
      .set({
        firstName: firstName,
        lastName: lastName,
        school: school,
        email: email,
        notes: notes,
        role: "teacher",
        id: newTeacherRef.id,
        phone: phone
      })
      .then(() => {
        const id = newTeacherRef.id; // get new iD
        return this.db
          .collection("users")
          .doc(this.auth.currentUser.uid)
          .collection("partners")
          .doc(id)
          .set({})
          .then(() => id)
          .catch(error => {
            console.error(
              "Error occurred when adding teacher to coach's partner list: ",
              error
            );
            return "";
          });
      })
      .catch(error => {
        console.error("Error occurred when adding teacher to dB: ", error);
        return "";
      });
  };

  // Removes a partner from the user's 'partners' subcollection
  // @param:string partnerID -> id of partner to be removed
  // @return:Promise -> prints to console, no other return object
  removePartner = async function(partnerID) {
    if (partnerID === "rJxNhJmzjRZP7xg29Ko6") {
      console.log("You can't delete the Practice Teacher!");
    } else {
      return this.db
        .collection("users")
        .doc(this.auth.currentUser.uid)
        .collection("partners")
        .doc(partnerID)
        .delete()
        .then(() =>
          console.log("Partner successfully removed from Partners list!")
        )
        .catch(error =>
          console.error(
            "An error occurred trying to remove the teacher from" +
              " the Partners list: ",
            error
          )
        );
    }
  };

  // Gets most recent observation of each type for a teacher
  // @param:string partnerID -> iD of teacher
  // @return:Promise -> onFulfilled: returns Array of dates of most recent observations
  //                '-> onRejected: prints error to console
  // NOTE: Index specified in Firebase console in order to execute Query
  getRecentObservations = async function(partnerID) {
    const obsRef = this.db
      .collection("observations")
      .where("teacher", "==", `/user/${partnerID}`)
      .where("observedBy", "==", `/user/${this.auth.currentUser.uid}`);
    // ONLY 'transition','climate', & 'AC' types specified in dB! The rest are subject to change!
    return Promise.all([
      obsRef
        .where("type", "==", "transition")
        .orderBy("end", "desc")
        .limit(1)
        .get(),
      obsRef
        .where("type", "==", "climate")
        .orderBy("end", "desc")
        .limit(1)
        .get(),
      obsRef
        .where("type", "==", "listening")
        .orderBy("end", "desc")
        .limit(1)
        .get(),
      obsRef
        .where("type", "==", "level")
        .orderBy("end", "desc")
        .limit(1)
        .get(),
      obsRef
        .where("type", "==", "math")
        .orderBy("end", "desc")
        .limit(1)
        .get(),
      obsRef
        .where("type", "==", "engagement")
        .orderBy("end", "desc")
        .limit(1)
        .get(),
      obsRef
        .where("type", "==", "sequential")
        .orderBy("end", "desc")
        .limit(1)
        .get(),
      obsRef
        .where("type", "==", "AC")
        .orderBy("end", "desc")
        .limit(1)
        .get()
    ])
      .then(snapshots => {
        const recentObs = new Array(8).fill(null);
        snapshots.forEach((snapshot, index) =>
          snapshot.forEach(
            doc =>
              (recentObs[index] = doc
                .data()
                .end.toDate()
                .toLocaleDateString())
          )
        );
        return recentObs;
      })
      .catch(error =>
        console.error("Error occurred during Promise.all() resolution: ", error)
      );
  };

  getCoachList = async function() {
    return this.db
      .collection("users")
      .where("role", "==", "coach")
      .get()
      .then(snapshot => {
        const coachList = [];
        snapshot.forEach(doc => coachList.push(doc.data()));
        return coachList;
      })
      .catch(error => console.error("Error getting documents: ", error));
  };

  getCoachFirstName = async function() {
    return this.db
      .collection("users")
      .doc(this.auth.currentUser.uid)
      .get()
      .then(doc => doc.data().firstName)
      .catch(error => console.error("Error getting cached document:", error));
  };

  getAdminList = async function() {
    return this.db
      .collection("users")
      .where("role", "==", "admin")
      .get()
      .then(snapshot => {
        const teacherList = [];
        snapshot.forEach(doc => teacherList.push(doc.data()));
        return teacherList;
      })
      .catch(error => console.error("Error getting documents: ", error));
  };

  pushKnowledgeCheck = async function(entry) {
    const {
      type,
      questionIndex,
      answerIndex,
      isCorrect
    } = entry;
    return this.db
      .collection("knowledgeChecks")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        answeredBy: this.auth.currentUser.uid,
        type: type,
        questionIndex: questionIndex,
        answerIndex: answerIndex,
        isCorrect: isCorrect
      })
    .catch(error => console.error("Error occurred recording knowlegde check answer: ", error))
  }

  handleSession = async function(mEntry) {
    this.sessionRef = this.db.collection("observations").doc();
    this.sessionRef
      .set({
        observedBy: "/user/" + mEntry.observedBy,
        start: firebase.firestore.FieldValue.serverTimestamp(),
        teacher: "/user/" + mEntry.teacher,
        end: firebase.firestore.FieldValue.serverTimestamp(),
        type: mEntry.type
      })
      .catch(error => console.error("Error setting session ref: ", error));
  };

  endSession = async function() {
    this.sessionRef
      .update({
        end: firebase.firestore.FieldValue.serverTimestamp()
      })
      .catch(error =>
        console.error("Error occurred updating session ref: ", error)
      );
  };

  handlePushAC = async function(mEntry) {
    return this.sessionRef
      .collection("entries")
      .add({
        Checked: mEntry.checked.slice(1),
        PeopleType: mEntry.people,
        acType: mEntry.type,
        Timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .catch(error =>
        console.error("Error occurred adding observation: ", error)
      );
  };

  handlePushSequential = async function(mEntry) {
    return this.sessionRef
      .collection("entries")
      .add({
        Checked: mEntry.checked.slice(1),
        PeopleType: mEntry.people,
        seqType: mEntry.type,
        Timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .catch(error =>
        console.error("Error occurred adding observation: ", error)
      );
  };

  handleUnlockSection = async function(section) {
    return this.db
      .collection("users")
      .doc(this.auth.currentUser.uid)
      .update({
        unlocked: firebase.firestore.FieldValue.arrayUnion(section)
      })
      .catch(error =>
        console.error("Error occurred unlocking section: ", error)
      );
  };

  getUnlockedSections = async function() {
    return this.db
      .collection("users")
      .doc(this.auth.currentUser.uid)
      .get()
      .then(doc => {
        if (doc.data().unlocked === undefined) {
          return [];
        } else {
          return doc.data().unlocked;
        }
      })
      .catch(error => console.error("Error getting cached document:", error));
  };

  handlePushTransition = async function(mEntry) {
    return this.sessionRef
      .collection("entries")
      .add({
        TrnStart: mEntry.start,
        TrnEnd: mEntry.end,
        TrnDur: mEntry.duration,
        TrnType: mEntry.transitionType,
        Timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .catch(error =>
        console.error("Error occurred adding observation: ", error)
      );
  };

  handlePushClimate = async function(mEntry) {
    return this.sessionRef
      .collection("entries")
      .add({
        BehaviorResponse: mEntry.BehaviorResponse,
        Type: mEntry.Type,
        Timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .catch(error =>
        console.error("Error occurred adding observation: ", error)
      );
  };

  handlePushNotes = async function(mNote) {
    return this.sessionRef
      .collection("notes")
      .add({
        Timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        Note: mNote
      })
      .catch(error => console.error("Error occurred adding notes: ", error));
  };

  handleFetchNotes = async function() {
    return this.sessionRef
      .collection("notes")
      .get()
      .then(snapshot => {
        const notesArr = [];
        snapshot.forEach(doc =>
          notesArr.push({
            id: doc.id,
            content: doc.data().Note,
            timestamp: doc.data().Timestamp
          })
        );
        return notesArr;
      })
      .catch(error =>
        console.error("Error occurred fetching coach notes: ", error)
      );
  };

  handleFetchTrainingStatus = async function() {
    return this.db
      .collection("users")
      .doc(this.auth.currentUser.uid)
      .get()
      .then(doc => doc.data().training)
      .catch(error => console.error("Error getting training status: ", error));
  };

  handleFetchQuestions = async function(section) {
    return this.db
      .collection("questionbank")
      .doc(section)
      .collection("questions")
      .get()
      .then(questions => {
        const questionList = [];
        questions.forEach(question => questionList.push(question.data()));
        return questionList;
      })
      .catch(error => console.error("Error getting documents: ", error));
  };

  handleFetchNotesResults = async function(sessionId) {
    this.sessionRef = this.db.collection("observations").doc(sessionId);
    return this.sessionRef
      .collection("notes")
      .get()
      .then(querySnapshot => {
        const notesArr = [];
        querySnapshot.forEach(doc =>
          notesArr.push({
            id: doc.id,
            content: doc.data().Note,
            timestamp: doc.data().Timestamp
          })
        );
        return notesArr;
      })
      .catch(error =>
        console.error("Error occurred getting result notes: ", error)
      );
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

  fetchAvgToneRating = async function(sessionId) {
    const getAvgToneRatingFirebaseFunction = this.functions.httpsCallable(
      "funcAvgToneRating"
    );
    return getAvgToneRatingFirebaseFunction({ sessionId: sessionId })
      .then(
        result =>
          // Read result of the Cloud Function.
          // const sanitizedMessage = result.data[0];
          // console.log(sanitizedMessage);
          // return sanitizedMessage;
          result.data[0]
      )
      .catch(error =>
        console.error("Error occurred getting average tone rating: ", error)
      );
  };

  fetchBehaviourTypeCount = async function(sessionId) {
    const getBehaviourTypeCountFirebaseFunction = this.functions.httpsCallable(
      "funcBehaviourTypeCount"
    );

    return getBehaviourTypeCountFirebaseFunction({ sessionId: sessionId })
      .then(
        result =>
          // Read result of the Cloud Function.
          // var sanitizedMessage = result.data[0];
          // console.log(sanitizedMessage);
          // return sanitizedMessage;
          result.data[0]
      )
      .catch(error =>
        console.error("Error occurred getting behavior type count: ", error)
      );
  };

  fetchBehaviourTrend = async function(teacherId) {
    const getBehaviourTrendFirebaseFunction = this.functions.httpsCallable(
      "funcBehaviourTrend"
    );
    return getBehaviourTrendFirebaseFunction({ teacherId: teacherId })
      .then(
        result =>
          // Read result of the Cloud Function.
          // var sanitizedMessage = result.data[0];
          // console.log(sanitizedMessage);
          // return sanitizedMessage;
          result.data[0]
      )
      .catch(error =>
        console.error("Error occurred getting behavior trend: ", error)
      );
  };

  fetchSessionDates = async function(teacherId, sessionType) {
    const getTransitionSessionDatesFirebaseFunction = this.functions.httpsCallable(
      "funcSessionDates"
    );

    return getTransitionSessionDatesFirebaseFunction({
      teacherId: teacherId,
      type: sessionType
    })
      .then(
        result =>
          // Read result of the Cloud Function.
          // var sanitizedMessage = result.data[0];
          // console.log(sanitizedMessage);
          // return sanitizedMessage;
          result.data[0]
      )
      .catch(error =>
        console.error("Error occurred getting session dates: ", error)
      );
  };

  fetchTransitionSummary = async function(sessionId) {
    const getTransitionTypeCountFirebaseFunction = this.functions.httpsCallable(
      "funcTransitionOfSession"
    );

    return getTransitionTypeCountFirebaseFunction({ sessionId: sessionId })
      .then(
        result =>
          // Read result of the Cloud Function.
          // var sanitizedMessage = result.data[0];
          // console.log(sanitizedMessage);
          // return sanitizedMessage;
          result.data[0]
      )
      .catch(error =>
        console.error("Error getting transition summary: ", error)
      );
  };

  fetchTransitionTypeSummary = async function(sessionId) {
    const getTransitionTypeCountFirebaseFunction = this.functions.httpsCallable(
      'funcTransitionTypeSummary'
    );
    return getTransitionTypeCountFirebaseFunction({ sessionId: sessionId })
    .then(
      result =>
        // Read result of the Cloud Function.
        // var sanitizedMessage = result.data[0];
        // console.log(sanitizedMessage);
        // return sanitizedMessage;
        result.data[0]
    )
    .catch(error =>
      console.error("Error occurred getting transition type summary: ", error)
    );
  };

  fetchTransitionLog = async function(sessionId) {
      const getTransitionsFirebaseFunction = this.functions.httpsCallable(
        'funcTransitionLogNew'
      );
      return getTransitionsFirebaseFunction({ sessionId: sessionId })
      .then(
        result =>
          // Read result of the Cloud Function.
          // var sanitizedMessage = result.data[0];
          // console.log(sanitizedMessage);
          // return sanitizedMessage;
          result.data[0]
      )
      .catch(error =>
        console.error("Error occurred getting transition log: ", error)
      );
  };

  fetchTransitionTrend = async function(teacherId) {
      const getTransitionTrendFirebaseFunction = this.functions.httpsCallable(
        'funcTransitionTrendNew'
      );
      return getTransitionTrendFirebaseFunction({ teacherId: teacherId })
        .then(
          result =>

          // Read result of the Cloud Function.
          // var sanitizedMessage = result.data[0];
          // console.log(sanitizedMessage);
          // return sanitizedMessage;
          result.data[0]
      )
      .catch(error =>
        console.error("Error occurred getting transition trend: ", error)
      );
  };

  fetchACDetails = async function(sessionId) {
    const getACDetailsFirebaseFunction = this.functions.httpsCallable(
      "funcACDetails"
    );
    return getACDetailsFirebaseFunction({ sessionId: sessionId })
      .then(
        result =>
          // Read result of the Cloud Function.
          // var sanitizedMessage = result.data[0];
          // console.log(sanitizedMessage);
          // return sanitizedMessage;
          result.data[0]
      )
      .catch(error =>
        console.error("Error occurred getting AC details: ", error)
      );
  };

  fetchSeqDetails = async function(sessionId) {
    const getSeqDetailsFirebaseFunction = this.functions.httpsCallable(
      "funcSeqDetails"
    );
    return getSeqDetailsFirebaseFunction({ sessionId: sessionId })
      .then(
        result =>
          // Read result of the Cloud Function.
          // var sanitizedMessage = result.data[0];
          // console.log(sanitizedMessage);
          // return sanitizedMessage;
          result.data[0]
      )
      .catch(error =>
        console.error("Error occurred getting sequential details: ", error)
      );
  };

  fetchChildACSummary = async function(sessionId) {
    const getChildACSummaryFirebaseFunction = this.functions.httpsCallable(
      "funcChildACSummary"
    );
    return getChildACSummaryFirebaseFunction({ sessionId: sessionId })
      .then(
        result =>
          // Read result of the Cloud Function.
          // var sanitizedMessage = result.data[0];
          // console.log(sanitizedMessage);
          // return sanitizedMessage;
          result.data[0]
      )
      .catch(error =>
        console.error("Error occurred getting child AC summary: ", error)
      );
  };

  fetchChildSeqSummary = async function(sessionId) {
    const getChildSeqSummaryFirebaseFunction = this.functions.httpsCallable(
      "funcChildSeqSummary"
    );
    return getChildSeqSummaryFirebaseFunction({ sessionId: sessionId })
      .then(
        result =>
          // Read result of the Cloud Function.
          // var sanitizedMessage = result.data[0];
          // console.log(sanitizedMessage);
          // return sanitizedMessage;
          result.data[0]
      )
      .catch(error =>
        console.error(
          "Error occurred getting child Sequential summary: ",
          error
        )
      );
  };

  fetchTeacherACSummary = async function(sessionId) {
    const getTeacherACSummaryFirebaseFunction = this.functions.httpsCallable(
      "funcTeacherACSummary"
    );
    return getTeacherACSummaryFirebaseFunction({ sessionId: sessionId })
      .then(
        result =>
          // Read result of the Cloud Function.
          // var sanitizedMessage = result.data[0];
          // console.log(sanitizedMessage);
          // return sanitizedMessage;
          result.data[0]
      )
      .catch(error =>
        console.error("Error occurred getting teacher AC summary: ", error)
      );
  };

  fetchTeacherSeqSummary = async function(sessionId) {
    const getTeacherSeqSummaryFirebaseFunction = this.functions.httpsCallable(
      "funcTeacherSeqSummary"
    );
    return getTeacherSeqSummaryFirebaseFunction({ sessionId: sessionId })
      .then(
        result =>
          // Read result of the Cloud Function.
          // var sanitizedMessage = result.data[0];
          // console.log(sanitizedMessage);
          // return sanitizedMessage;
          result.data[0]
      )
      .catch(error =>
        console.error(
          "Error occurred getting teacher sequential summary: ",
          error
        )
      );
  };

  fetchChildACTrend = async function(teacherId) {
    const getChildACTrendFirebaseFunction = this.functions.httpsCallable(
      "funcChildACTrend"
    );
    return getChildACTrendFirebaseFunction({ teacherId: teacherId })
      .then(
        result =>
          // Read result of the Cloud Function.
          // var sanitizedMessage = result.data[0];
          // console.log(sanitizedMessage);
          // return sanitizedMessage;
          result.data[0]
      )
      .catch(error =>
        console.error("Error occurred getting child AC trend: ", error)
      );
  };

  fetchChildSeqTrend = async function(teacherId) {
    const getChildSeqTrendFirebaseFunction = this.functions.httpsCallable(
      "funcChildSeqTrend"
    );
    return getChildSeqTrendFirebaseFunction({ teacherId: teacherId })
      .then(
        result =>
          // Read result of the Cloud Function.
          // var sanitizedMessage = result.data[0];
          // console.log(sanitizedMessage);
          // return sanitizedMessage;
          result.data[0]
      )
      .catch(error =>
        console.error("Error occurred getting child sequential trend: ", error)
      );
  };

  fetchTeacherACTrend = async function(sessionId) {
    const getTeacherACTrendFirebaseFunction = this.functions.httpsCallable(
      "funcTeacherACTrend"
    );
    return getTeacherACTrendFirebaseFunction({ sessionId: sessionId })
      .then(
        result =>
          // Read result of the Cloud Function.
          // var sanitizedMessage = result.data[0];
          // console.log(sanitizedMessage);
          // return sanitizedMessage;
          result.data[0]
      )
      .catch(error =>
        console.error("Error occurred getting teacher AC trend: ", error)
      );
  };

  fetchTeacherSeqTrend = async function(sessionId) {
    const getTeacherSeqTrendFirebaseFunction = this.functions.httpsCallable(
      "funcTeacherSeqTrend"
    );
    return getTeacherSeqTrendFirebaseFunction({ sessionId: sessionId })
      .then(
        result =>
          // Read result of the Cloud Function.
          // var sanitizedMessage = result.data[0];
          // console.log(sanitizedMessage);
          // return sanitizedMessage;
          result.data[0]
      )
      .catch(error => console.error("Error occurred getting teacher sequential trend: ", error))
  }

}

export default Firebase;
