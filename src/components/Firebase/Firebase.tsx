import firebase from 'firebase'
import {FirebaseFunctions} from '@firebase/functions-types'
import * as Constants from '../../constants/Constants'
import * as MessagingTypes from '../MessagingComponents/MessagingTypes'
import * as Types from '../../constants/Types'
import {v4 as uuidv4} from 'uuid'
import DateFnsUtils from "@date-io/date-fns";
import SiteProfileResults from '../SiteProfileComponents/SiteProfileResults'
import { resultsAriaMessage } from 'react-select/src/accessibility'
import ProgramProfileBarDetails from '../ProgramProfileComponents/ProgramProfileBarDetails'
import ActivitySettingButtons from '../StudentEngagementComponents/ActivitySettingButtons'
import da from 'date-fns/esm/locale/da/index.js'
import { add } from 'date-fns'

const config = process.env.FIREBASE_CONFIG

interface ProgramInfo {
  name: string
  leaders: Array<string>
  sites: Array<string>
}

interface TeacherInfo {
  firstName: string
  lastName: string
  school: string
  email: string
  phone: string
  notes: string
  sites?: Array<string>
}

export interface UserDocument {
  firstName: string
  lastName: string
  role: string
  id: string
  email: string
  favouriteQuestions: Array<string>
  playedVideos: Array<string>
}

interface Note {
  id: string
  content: string
  Timestamp: {
    seconds: number
    nanoseconds: number
  }
}

interface Entry {
  Timestamp: Date
}

interface LocalNote {
  content: string
  Timestamp: Date
  id: string
}

interface Observation {
  activitySetting?: string | null
  checklist: string | null
  entries: Entry[]
  notes: LocalNote[]
  completed: boolean
  end: Date
  start: Date
  observedBy: string
  teacher: string
  timezone: string
  type: string
  lastClickTime: Date
  timedOut: boolean
}

/**
 * defines functions to get and set data in cloud firestore
 */
class Firebase {
  auth: firebase.auth.Auth
  db: firebase.firestore.Firestore
  functions: FirebaseFunctions
  sessionRef: firebase.firestore.DocumentReference | null
  query: firebase.firestore.Query | null
  app: firebase.app.App | null = null
  currentObservation?: Observation | null

  /**
   * initializes firebase
   */
  constructor() {
    firebase.initializeApp(config)
    this.auth = firebase.auth()
    this.db = firebase.firestore()
    this.sessionRef = null
    this.query = null
    if (process.env.USE_LOCAL_AUTH) {
      this.auth.useEmulator("http://localhost:9099");
    }
    if (process.env.USE_LOCAL_FIRESTORE) {
      this.db.settings({
        host: 'localhost:8080',
        ssl: false,
      })
    }
    this.db
      .enablePersistence({synchronizeTabs: true})
      .catch((error: Error) => console.error('Offline Not Working: ', error))
    this.functions = firebase.functions()
    if (process.env.USE_LOCAL_FUNCTIONS) {
      this.functions.useFunctionsEmulator('http://localhost:5001')
    }
  }

  updateCurrentObservation = (observation: Partial<Observation>) => {
    this.currentObservation = {
      ...this.currentObservation,
      ...observation
    }
  }
  /**
   * submits pilot form to database
   * @param {object} userData
   */
  firebasePilotSignUp = async function (userData: {
    email: string
    firstName: string
    lastName: string
    program: string
  }): Promise<void> {
    const data = {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      program: userData.program,
    }
    const docRef = firebase
      .firestore()
      .collection('pilotForm')
      .doc()
    docRef
      .set(data)
      .then(() => {
        console.log('Visitor submitted pilot form')
      })
      .catch(function (error) {
        console.error('Error signing up: ', error)
      })
  }

  /**
   * submits email to database
   * @param {string} email
   */
  emailListSignUp = async (email: string): Promise<void> => {
    this.sessionRef = this.db.collection('emailList').doc()
    this.sessionRef.set({
      email: email,
      timestamp: firebase.firestore.FieldValue.serverTimestamp().toString
    })
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  /**
   * creates account for user, makes entry in users collection, adds practice teacher if role===coach
   * @param {object} userData
   * @param {string} role
   */
  firebaseEmailSignUp = async (
    userData: {
      email: string
      password: string
      firstName: string
      lastName: string
    },
    role: string,
    hasProgram: boolean,
    program: string,
    hasSite: boolean,
    site
  ): Promise<void> => {
    const secondFirebase = firebase.initializeApp(config, 'secondary')
    // Added emulators for local testing
    if (process.env.USE_LOCAL_AUTH) {
      console.log('using local Auth');
      secondFirebase.auth().useEmulator("http://localhost:9099");
    }
    if (process.env.use_LOCAL_FIRESTORE) {
      secondFirebase.firestore().settings({
        host: 'localhost:8080',
        ssl: false,
      })
    }
    try {
      const userInfo = await secondFirebase
        .auth()
        .createUserWithEmailAndPassword(userData.email, userData.password)
      if (userInfo.user) {
        console.log('Create user and sign in Success', userInfo)
        const data = {
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: role,
          id: userInfo.user ? userInfo.user.uid : '',
          archived: false
        }

        // Create the Practice Teacher if it does not currently exist
        let practiceTeacher = await firebase.firestore().collection('users').doc('rJxNhJmzjRZP7xg29Ko6').get()
        if (!practiceTeacher.exists) {
          firebase.firestore().collection('users').doc('rJxNhJmzjRZP7xg29Ko6')
            .set({
              firstName: 'Practice',
              lastName: 'Teacher',
              school: 'Elum Entaree School',
              email: 'practice@teacher.edu',
              notes: "Notes are a useful place to put highlights or reminders!",
              role: "teacher",
              phone: '012-345-6789',
              id: 'rJxNhJmzjRZP7xg29Ko6'
            })

        }
        const docRef = firebase
          .firestore()
          .collection('users')
          .doc(userInfo.user.uid)
        docRef.set(data).then(() => {
          docRef
            .collection('partners')
            .doc('rJxNhJmzjRZP7xg29Ko6') // Practice Teacher UID
            .set({})
            .then(() => console.log('Practice Teacher added to new user'))
            .catch((error: Error) =>
              console.error(
                'Error occurred while assigning practice teacher to coach: ',
                error
              )
            )
        })
        if( hasProgram && (program !== "")) {
          this.assignProgramToUser({userId: data.id, programId: program }).then(() => {
            console.log("Program " + program + "added to user " + data.id);
          }).catch(e => console.error("error =>", e));
          this.assignUserToSiteOrProgram({programId: program, userId: data.id}).then(() => {
            console.log("User added to program " + program);
          }).catch(e => console.error("error => Program : " + program, e));

          data.program = program;
        }

        if ( hasSite && (site !== "")) {

          // Check to see if it's a string or array
          var assignSite;
          console.log("SITE : ", site);

          if(typeof site == "string")
          {
            assignSite = this.assignSiteToUser({userId: data.id, siteId: site , bulkSiteIds: []}).then(() => {
              console.log("Sites " + site + " added to user " + data.id);
            }).catch(e => console.error("error =>", e));
          }
          else
          {
            assignSite = this.assignSiteToUser({userId: data.id, bulkSiteIds: site}).then(() => {
              console.log("Site " + site + " added to user " + data.id);
            }).catch(e => console.error("error =>", e));
          }

          if (data.role !== "coach") {
            this.assignUserToSiteOrProgram({siteId: site, userId: data.id}).then(() => {
              console.log("User added to site " + site);
            }).catch(e => console.error("error => Site : " + site, e));
          }

          data.sites = site;
        }

        return data;


      }
    } catch (e) {
      console.log("An Error occurred when creating the user:")
      throw new Error(e) // Raise error to caller; prevents recreating password in NewUser
    } finally {
      secondFirebase.delete() // Frees resources for any subsequent users created
    }

  }

  /**
   * signs user in
   * @param {object} userData
   */
  firebaseEmailSignIn = async (userData: {
    email: string
    password: string
  }): Promise<firebase.auth.UserCredential | void> => {
    return this.auth
      .signInWithEmailAndPassword(userData.email, userData.password)
      .catch((error: Error) => {
        console.error('Error signing in: ', error)
        alert(error)
      })
  }

  reauthenticate = async (userData: {
    email: string
    password: string
  }): Promise<firebase.User | null> => {
    await this.firebaseEmailSignIn(userData)
    return firebase.auth().currentUser
  }

  /**
   * signs user out
   */
  firebaseSignOut = async (): Promise<void> => {
    return this.auth
      .signOut()
      .then(() => console.log('Successfully Signed Out!'))
      .catch((error: Error) => console.error('Sign Out Unsuccessful: ', error))
  }

  /**
   * sends password reset email to user-entered email
   * @param {string} email
   */
  resetPassword = async (email: string): Promise<void> => {
    return this.auth
      .sendPasswordResetEmail(email)
      .catch((error: Error) =>
        console.error('Error occurred sending password reset email: ', error)
      )
  }

  userIsAdmin = async () => {
    let userDocs = await this.db.collection('users').where('id', '==', this.auth.currentUser.uid).get();
    return userDocs.docs[0].get('role') === 'admin'
  }

  userIsLeader= async () => {
    let userDocs = await this.db.collection('users').where('id', '==', this.auth.currentUser.uid).get();
    return userDocs.docs[0].get('role') === 'admin' || userDocs.docs[0].get('role') === 'programLeader' || userDocs.docs[0].get('role') === 'siteLeader'
  }

  sendEmail = async (msg: string): Promise<void> => {
    const sendEmailFirebaseFunction = this.functions.httpsCallable(
      'funcSendEmail'
    )
    return sendEmailFirebaseFunction(msg)
      .then(result => {
        result
        console.log('result is', result)
      })
      .catch(error => error)
  }


  sendMLE = async (email: string): Promise<void> => {
    const sendEmailFirebaseFunction = this.functions.httpsCallable(
      'funcSendMLE'
    )
    return sendEmailFirebaseFunction(email)
      .then(result => {
        result
        console.log('result is', result)
      })
      .catch(error => error)
  }

  /**
   * gets list of all teachers linked to current user's account
   */
  getTeacherList = async (): Promise<Array<firebase.firestore.DocumentData> | void | undefined> => {
    if (this.auth.currentUser) {
      return this.db
        .collection('users')
        .doc(this.auth.currentUser.uid)
        .collection('partners')
        .get()
        .then((partners: firebase.firestore.QuerySnapshot) => {
          const teacherList: Array<firebase.firestore.DocumentData> = []
          partners.forEach(partner =>
            teacherList.push(this.getTeacherInfo(partner.id))
          )
          console.log('teacher list', teacherList)
          return teacherList
        })
        .catch((error: Error) =>
          console.error('Error getting partner list: ', error)
        )
    }
  }

  getTeacherId = async (firstName: string, lastName: string, email: string) => {
    this.query = this.db.collection('users').where("firstName", "==", firstName).where("lastName", "==", lastName).where("email", "==", email );
    let document = await this.query.get();

    return document.docs[0].id;
  }

  getTeacherListFromUser = async (
    data: {
      userId: string,
     }
 ): Promise<Array<firebase.firestore.DocumentData> | void | undefined> => {
    if (this.auth.currentUser) {
      return this.db
        .collection('users')
        .doc(data.userId)
        .collection('partners')
        .get()
        .then( async (partners: firebase.firestore.QuerySnapshot) => {
          const teacherList: Array<firebase.firestore.DocumentData> = [];

          partners.forEach(partner => {
              teacherList.push(partner.id.trim());
            }
          )

          return teacherList;
        })
        .catch((error: Error) =>
          console.error('Error getting partner list: ', error)
        )
    }
  }

  fetchCustomQuestions = async (magic8: string): Promise<Array<string> | void | undefined> => {
    if (this.auth.currentUser) {
      return this.db.collection('users').doc(this.auth.currentUser.uid).get()
      .then(user => {
        const favoriteQuestions = user.data().favoriteQuestions || []
        const questionList: Array<string> = []
          favoriteQuestions.forEach(question => {
            if (question.includes(magic8 + ': ')) {
              questionList.push(question.split(magic8 + ': ')[1])
            }
          })
          console.log(questionList)
          return questionList
      })
    }
  }

  // adds custom favorite questions
  addFavoriteQuestion = async (question: string[], magic8: string): Promise<Array<firebase.firestore.DocumentData> | void | undefined> => {
    if (this.auth.currentUser) {
      return this.db.collection('users').doc(this.auth.currentUser.uid).get()
      .then(user => {
        const favoriteQuestions = user.data().favoriteQuestions || []
      const newFavoriteQuestions = favoriteQuestions.includes(magic8 + ': ' + question) ? favoriteQuestions.filter(
        favoriteQuestions => favoriteQuestions !== magic8 + ': ' + question
      ) : [magic8 + ': ' + question, ...favoriteQuestions]
      return this.db.collection('users').doc(this.auth.currentUser.uid).update({
        favoriteQuestions: newFavoriteQuestions,
      }).catch((error: Error) =>
      console.error('Error updating favorite questions list: ', error)
    )
      }).catch((error: Error) =>
      console.error('Error getting favorite questions list: ', error)
    )
    }
  }

  // adds favorite questions from constants
  updateFavouriteQuestions = async (
    questionId: string[]
  ): Promise<Array<firebase.firestore.DocumentData> | void | undefined> => {
    if (this.auth.currentUser) {
      return this.db
        .collection('users')
        .doc(this.auth.currentUser.uid)
        .get()
        .then(user => {
          const favouriteQuestions = user.data().favouriteQuestions || []
          const newFavouriteQuestions = favouriteQuestions.includes(questionId)
            ? favouriteQuestions.filter(
              favouriteQuestions => favouriteQuestions !== questionId
            )
            : [questionId, ...favouriteQuestions]
          return this.db
            .collection('users')
            .doc(this.auth.currentUser.uid)
            .update({
              favouriteQuestions: newFavouriteQuestions,
            })
            .catch((error: Error) =>
              console.error('Error updating favourites questions list: ', error)
            )
        })
        .catch((error: Error) =>
          console.error('Error getting favourites questions list: ', error)
        )
    }
  }

  /**
   * retrieves a teacher's user data
   * @param {string} partnerID
   */
  getTeacherInfo = async (
    partnerID: string
  ): Promise<firebase.firestore.DocumentData | undefined | void> => {
    return this.db
      .collection('users')
      .doc(partnerID)
      .get()
      .then((doc: firebase.firestore.DocumentSnapshot) => {
        if (doc.exists) {
          console.log('teacher info', doc.data())
          return doc.data()
        } else {
          console.log("Partner's ID is 'undefined' in dB.")
          return ({id: null})
        }
      })
      .catch((error: Error) =>
        console.error('Error occurred when getting document:', error)
      )
  }

  /**
   * saves edits to a teacher's user data
   * @param {string} partnerID
   * @param {object} edits
   */
  setTeacherInfo = async (
    partnerID: string,
    edits: TeacherInfo
  ): Promise<void> => {
    if (partnerID === 'rJxNhJmzjRZP7xg29Ko6') {
      console.log("You can't edit the Practice Teacher!")
    } else {
      const {firstName, lastName, school, email, phone, notes} = edits
      return this.db
        .collection('users')
        .doc(partnerID)
        .set(
          {
            firstName: firstName,
            lastName: lastName,
            school: school,
            email: email,
            phone: phone,
            notes: notes,
          },
          {merge: true}
        )
        .catch((error: Error) =>
          console.error('Error occurred when writing document:', error)
        )
    }
  }

  /**
   * adds teacher to the database and to the coach's partners list
   * @param {TeacherInfo} teacherInfo
   */
  addTeacher = async (teacherInfo: TeacherInfo): Promise<string | void> => {
    const {firstName, lastName, school, email, notes, phone} = teacherInfo
    const newTeacherRef = this.db.collection('users').doc() // auto-generated iD
    return newTeacherRef
      .set({
        firstName: firstName,
        lastName: lastName,
        school: school,
        email: email,
        notes: notes,
        role: 'teacher',
        id: newTeacherRef.id,
        phone: phone,
        archived: false
      })
      .then(() => {
        const id = newTeacherRef.id // get new iD
        return this.db
          .collection('users')
          .doc(this.auth.currentUser ? this.auth.currentUser.uid : '')
          .collection('partners')
          .doc(id)
          .set({})
          .then(() => id)
          .catch((error: Error) => {
            console.error(
              "Error occurred when adding teacher to coach's partner list: ",
              error
            )
            // return "";
          })
      })
      .catch((error: Error) => {
        console.error('Error occurred when adding teacher to dB: ', error)
        // return "";
      })
  }

  addTeacherToCoach = async (teacherInfo: TeacherInfo, coachId: string): Promise<string | void> => {
    const {firstName, lastName, school, email, notes, phone, sites} = teacherInfo
    const newTeacherRef = this.db.collection('users').doc() // auto-generated iD
    return newTeacherRef
      .set({
        firstName: firstName,
        lastName: lastName,
        school: school,
        email: email,
        notes: notes,
        role: 'teacher',
        id: newTeacherRef.id,
        phone: phone,
        sites: sites ? sites : [],
        archived: false
      })
      .then(() => {
        const id = newTeacherRef.id // get new iD
        return this.db
          .collection('users')
          .doc(coachId)
          .collection('partners')
          .doc(id)
          .set({})
          .then(() => id)
          .catch((error: Error) => {
            console.error(
              "Error occurred when adding teacher to coach's partner list: ",
              error
            )
            // return "";
          })
      })
      .catch((error: Error) => {
        console.error('Error occurred when adding teacher to dB: ', error)
        // return "";
      })
  }


  addTeacherIdToCoach = async (data: {
    teacherId: string,
    coachId: string,
  }) => {

    var coachId = !(data.coachId) ?  this.auth.currentUser.uid : data.coachId;

    return this.db
      .collection('users')
      .doc(coachId)
      .collection('partners')
      .doc(data.teacherId)
      .set({})
      .then(() => id)
      .catch((error: Error) => {
        console.error(
          "Error occurred when adding teacher to coach's partner list: ",
          error
        )
        // return "";
      })
  }


  /*
   * Get's a teacher by the email
   */
  getTeacherByEmail = async (
    data: {
      email: string,
    }
  ) => {
    var email = data.email;

    var snapshot = await this.db.collection('users').where('email', '==', email).get().catch((e) => {console.log("Error getting user ", e);});

    if(!snapshot.empty) {
      var results;
      snapshot.forEach(doc => {
        results = doc.data();
      });

      return results;
    }
    else
    {
      console.log("A user with the email " + email + " does not exist.");
    }
  }



  /*
   * Get's a teacher by the full name
   */
  getTeacherByFullName = async (
    data: {
      firstName: string,
      lastName: string,
    }
  ) => {
    var firstName = data.firstName;
    var lastName = data.lastName;

    var snapshot = await this.db.collection('users').where('firstName', '==', firstName).where('lastName', '==', lastName).get().catch((e) => {console.log("Error getting user ", e);
    });

    if(!snapshot.empty) {
      var results;
      snapshot.forEach(doc => {
        results = doc.data();
      });

      return results;
    }
    else
    {
      console.log("A user with the name " + firstName + " " + lastName + " does not exist.");
    }
  }



  /**
   * removes partner from the user's partners subcollection
   * @param {string} partnerID
   */
  removePartner = async (partnerID: string): Promise<void> => {
    if (partnerID === 'rJxNhJmzjRZP7xg29Ko6') {
      console.log("You can't delete the Practice Teacher!")
    } else if (this.auth.currentUser) {
      return this.db
        .collection('users')
        .doc(this.auth.currentUser.uid)
        .collection('partners')
        .doc(partnerID)
        .delete()
        .then(() =>
          console.log('Partner successfully removed from Partners list!')
        )
        .catch((error: Error) =>
          console.error(
            'An error occurred trying to remove the teacher from' +
            ' the Partners list: ',
            error
          )
        )
    }
  }

  /**
   * Classroom Climate cloud function
   * get average tone rating for observation session
   * @param {string} sessionId
   */
  getRecentObservations = async (): Promise<{} | void> => {
    const getRecentObservations = this.functions.httpsCallable(
      'funcRecentObservations'
    )
    return getRecentObservations()
      .then(result => result.data[0])
      .catch((error: Error) =>
        console.error('Error occurred getting average tone rating: ', error)
      )
  }

  getCoaches = async () => {
    if (!await this.userIsAdmin()) {
      throw new Error('User is not authorized for this action')
    }

    let coaches = await this.db.collection('users')
      .where('role', "in", ['coach', 'admin'])
      .get();

    return coaches.docs.map(doc => doc.data());
  }

  /* getCoachList = async function() {
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
  }; */
  getUserInformation = async (): Promise<UserDocument | void> => {
    if (this.auth.currentUser) {
      return await this.db
        .collection('users')
        .doc(this.auth.currentUser.uid)
        .get()
        .then((doc: firebase.firestore.DocumentData) => doc.data())
        .catch((error: Error) =>
          console.error('Error getting cached document:', error)
        )
    }
  }
  // TODO: I don't love this, is there a reason we don't just load the user
  //       once and store the whole doc in redux?
  /**
   * gets first name of current user
   */
  getCoachFirstName = async (): Promise<string | void> => {
    if (this.auth.currentUser) {
      return this.db
        .collection('users')
        .doc(this.auth.currentUser.uid)
        .get()
        .then((doc: firebase.firestore.DocumentData) => doc.data().firstName)
        .catch((error: Error) =>
          console.error('Error getting cached document:', error)
        )
    }
  }

  /**
   * gets the 'role' of the user. for controlling access to app sections.
   */
  getUserRole = async (): Promise<string | void> => {
    if (this.auth.currentUser) {
      return this.db
        .collection('users')
        .doc(this.auth.currentUser.uid)
        .get()
        .then((doc: firebase.firestore.DocumentData) => doc.data().role)
        .catch((error: Error) =>
          console.error('Error getting cached document:', error)
        )
    }
  }

  /**
   * gets last name of current user
   */
  getCoachLastName = async (): Promise<string | void> => {
    if (this.auth.currentUser) {
      return this.db
        .collection('users')
        .doc(this.auth.currentUser.uid)
        .get()
        .then((doc: firebase.firestore.DocumentData) => doc.data().lastName)
        .catch((error: Error) =>
          console.error('Error getting cached document:', error)
        )
    }
  }

  /* getAdminList = async function() {
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
  }; */

  /**
   * adds knowledge check entry to database
   * @param {object} entry
   */
  pushKnowledgeCheck = async (entry: {
    type: string
    questionIndex: number
    answerIndex: number
    isCorrect: boolean
  }): Promise<firebase.firestore.DocumentReference | void> => {
    const {type, questionIndex, answerIndex, isCorrect} = entry
    if (this.auth.currentUser) {
      return this.db
        .collection('knowledgeChecks')
        .add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          answeredBy: this.auth.currentUser.uid,
          type: type,
          questionIndex: questionIndex,
          answerIndex: answerIndex,
          isCorrect: isCorrect,
        })
        .catch((error: Error) =>
          console.error(
            'Error occurred recording knowlegde check answer: ',
            error
          )
        )
    }
  }

  /**
   * sets fields in document for current observation
   * @param {object} mEntry
   */
  handleSession = async (mEntry: {
    observedBy: string
    teacher: string
    type: string
    start?: Date
    checklist?: string // specific literacy type
  }) => {
    this.currentObservation =
      {
        entries: [],
        observedBy: '/user/' + mEntry.observedBy,
        start: mEntry.start
          ? mEntry.start
          : new Date(),
        teacher: '/user/' + mEntry.teacher,
        end: new Date(),
        type: mEntry.type,
        notes: [],
        checklist: mEntry.checklist ? mEntry.checklist : null,
        completed: false,
        timezone: new Intl.DateTimeFormat().resolvedOptions().timeZone,
        activitySetting: null,
        lastClickTime: new Date(),
        timedOut: false
      }
  }

  /**
   * updates the end time of the observation session when completed
   * @param {Date | null} time
   */
  endSession = (time: Date | null = null) => {
    if (this.currentObservation) {
      this.updateCurrentObservation({
        end: time ? time : new Date(),
        completed: true
      })
      if(this.currentObservation.type === 'LI' && !this.currentObservation.activitySetting) {
        this.handleLiteracyActivitySetting('Not Recorded')
      }
      let {
        checklist,
        completed,
        end,
        observedBy,
        start,
        teacher,
        type,
        timezone,
        entries,
        activitySetting,
        notes,
        timedOut
      } = this.currentObservation;
      this.sessionRef = this.db.collection('observations').doc()
      // Entries must be added before the document is 'set', or else the
      // observationToBQ cloud function may not grab all the entries.
      let entryCollection = this.sessionRef.collection('entries')
      entries.forEach(entry => {
        entryCollection.add({...entry, Timestamp: firebase.firestore.Timestamp.fromDate(entry.Timestamp)})
      })
      if(timedOut) {
        end = this.currentObservation.lastClickTime
      }
      this.sessionRef.set({
        activitySetting,
        checklist,
        completed,
        end: firebase.firestore.Timestamp.fromDate(end),
        observedBy,
        start: firebase.firestore.Timestamp.fromDate(start),
        teacher,
        type,
        timezone
      })
      let notesCollection = this.sessionRef.collection('notes')
      notes.forEach(note => {
        notesCollection.add({
          Note: note.content,
          Timestamp: firebase.firestore.Timestamp.fromDate(note.Timestamp)
        })
      })
      this.currentObservation = null;
      this.sessionRef = null;
    }
  }

  updateSessionLastClick = () => {
    if(this.currentObservation) {
      this.currentObservation.lastClickTime = new Date()
    }

  }

  discardSession = () => {
    this.sessionRef = null
    this.currentObservation = null
  }

  /**
   *
   * @param {teacherId:string}
   * @param {type:string}
   * @param {tool:string}
   */
  completeAppointment = async (
    teacherId: string,
    type: string,
    tool: string
  ): Promise<void> => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    if (this.auth.currentUser) {
      this.query = this.db
        .collection('appointments')
        .where('coach', '==', this.auth.currentUser.uid)
        .where('teacherID', '==', teacherId)
        .where('date', '>=', today)
        .where('date', '<', tomorrow)
        .where('tool', '==', tool)
        .where('type', '==', type)
        .orderBy('date', 'asc')
        .limit(1)
      return this.query
        .get()
        .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
          querySnapshot.forEach(doc => {
            return this.db
              .collection('appointments')
              .doc(doc.id)
              .update({
                completed: true,
              })
              .catch((error: Error) =>
                console.error('Error occurred unlocking section: ', error)
              )
          })
          return
        })
        .catch((error: Error) => {
          console.log('unable to retrieve action plans', error)
        })
    }
  }

  /**
   * submits a single center observation to local observation
   * @param {object} mEntry
   */
  handlePushCentersData =  (mEntry: {
    checked: Array<number>
    people: number
  }) => {
    this.currentObservation?.entries.push({
      Checked: mEntry.checked,
      PeopleType: mEntry.people,
      Timestamp: new Date(),
    })
  }

  /**
   *
   * @param {object} mEntry
   */
  handlePushSEEachEntry =  (mEntry: {
    entryType: string
    point: number
    id: number
  }) => {
    this.currentObservation?.entries.push({
      studentId: mEntry.id,
      point: mEntry.point,
      entryType: mEntry.entryType,
      Timestamp: new Date(),
    })

  }

  /**
   * adds level of instruction selection to local observation
   * @param {string} insType
   */
  handlePushInstruction = async (
    insType: string
  ) => {
    this.currentObservation?.entries.push({
      instructionType: insType,
      Timestamp: new Date(),
    })

  }

  /**
   * adds listening to children 1-minute observation to local observation
   * @param {object} mEntry
   */
  handlePushListening = (mEntry: {
    checked: Array<number>
  }) => {
    this.currentObservation?.entries.push({
      Checked: mEntry.checked,
      Timestamp: new Date(),
    })
  }

  /**
   * adds literacy 1-minute observation to local observation
   * @param {object} mEntry
   */
  handlePushLiteracy =  (mEntry: {
    checked: Array<number>
  }) => {
    this.currentObservation?.entries.push({
      Checked: mEntry.checked,
      Timestamp: new Date(),
    })
  }

  /**
   * sets fields in document for current observation
   * @param {string} activitySetting
   */
  handleLiteracyActivitySetting = async (
    activitySetting: string
  ) => {
    this.updateCurrentObservation({
      activitySetting: activitySetting,
      end: new Date(),
      completed: true,
    })
  }

  /**
   * adds number for tool to user's unlocked list when they complete training
   * @param {number} section
   */
  handleUnlockSection = async (section: number): Promise<void> => {
    if (this.auth.currentUser) {
      return this.db
        .collection('users')
        .doc(this.auth.currentUser.uid)
        .update({
          unlocked: firebase.firestore.FieldValue.arrayUnion(section),
        })
        .catch((error: Error) =>
          console.error('Error occurred unlocking section: ', error)
        )
    }
  }

  /**
   * gets array of unlocked tools for current user
   */
  getUnlockedSections = async (): Promise<Array<number> | void> => {
    if (this.auth.currentUser) {
      return this.db
        .collection('users')
        .doc(this.auth.currentUser.uid)
        .get()
        .then((doc: firebase.firestore.DocumentData) => {
          if (doc.data().unlocked === undefined) {
            return []
          } else {
            return doc.data().unlocked
          }
        })
        .catch((error: Error) =>
          console.error('Error getting cached document:', error)
        )
    }
  }

  /**
   * gets unlocked literacy sections
   */
  getLiteracyTraining = async (): Promise<Array<number> | void> => {
    if (this.auth.currentUser) {
      return this.db
        .collection('users')
        .doc(this.auth.currentUser.uid)
        .collection('training')
        .doc('LI')
        .get()
        .then((doc: firebase.firestore.DocumentData) => {
          return doc.data()
        })
        .catch((error: Error) =>
          console.error('Error getting cached document:', error)
        )
    }
  }

  /**
   * unlocks literacy knowledge check
   */
  unlockLiteracyKnowledgeCheck = async (
    checklistType: Constants.LiteracyTypes
  ): Promise<void> => {
    if (this.auth.currentUser) {
      const literacyTrainingDoc = this.db
        .collection('users')
        .doc(this.auth.currentUser.uid)
        .collection('training')
        .doc('LI')
      const doc = await literacyTrainingDoc.get()
      if (!doc.exists) {
        await literacyTrainingDoc.set({})
      }
      if (checklistType === 'Foundational') {
        return literacyTrainingDoc
          .update({
            conceptsFoundational: true,
            definitionsFoundational: true,
            demoFoundational: true,
            knowledgeCheckFoundational: true,
          })
          .catch((error: Error) =>
            console.error('Error getting cached document:', error)
          )
      } else if (checklistType === 'Writing') {
        return literacyTrainingDoc
          .update({
            conceptsWriting: true,
            definitionsWriting: true,
            demoWriting: true,
            knowledgeCheckWriting: true,
          })
          .catch((error: Error) =>
            console.error('Error getting cached document:', error)
          )
      } else if (checklistType === 'Reading') {
        return literacyTrainingDoc
          .update({
            conceptsReading: true,
            definitionsReading: true,
            demoReading: true,
            knowledgeCheckReading: true,
          })
          .catch((error: Error) =>
            console.error('Error getting cached document:', error)
          )
      } else {
        return literacyTrainingDoc
          .update({
            conceptsLanguage: true,
            definitionsLanguage: true,
            demoLanguage: true,
            knowledgeCheckLanguage: true,
          })
          .catch((error: Error) =>
            console.error('Error getting cached document:', error)
          )
      }
    }
  }

  /**
   * adds tool to user's watched list when they watch results training video
   * @param {string} section
   */
  handleWatchResultsTraining = async (section: string): Promise<void> => {
    if (this.auth.currentUser) {
      return this.db
        .collection('users')
        .doc(this.auth.currentUser.uid)
        .update({
          resultsTraining: firebase.firestore.FieldValue.arrayUnion(section),
        })
        .catch((error: Error) =>
          console.error('Error occurred recording watched video: ', error)
        )
    }
  }

  /**
   * get array of watched results training video
   */
  getWatchedResultsTraining = async (): Promise<Array<string> | void> => {
    if (this.auth.currentUser) {
      return this.db
        .collection('users')
        .doc(this.auth.currentUser.uid)
        .get()
        .then((doc: firebase.firestore.DocumentData) => {
          if (doc.data().resultsTraining === undefined) {
            return []
          } else {
            return doc.data().resultsTraining
          }
        })
        .catch((error: Error) =>
          console.error('Error getting document: ', error)
        )
    }
  }

  /**
   * saves a logged transition in the database
   * @param {object} mEntry
   */
  handlePushTransition =  (mEntry: {
    start: string
    end: string
    duration: string
    transitionType: string
  }) => {
    this.currentObservation?.entries?.push({
      TrnStart: mEntry.start,
      TrnEnd: mEntry.end,
      TrnDur: mEntry.duration,
      TrnType: mEntry.transitionType,
      Timestamp: new Date(),
    })

  }

  /**
   * adds climate selection to database
   * @param {object} mEntry
   */
  handlePushClimate =  (mEntry: {
    BehaviorResponse: string
    Type: string
  })  => {
    if(this.currentObservation) {
      this.currentObservation.entries.push(
        {
            BehaviorResponse: mEntry.BehaviorResponse,
            Type: mEntry.Type,
            Timestamp: new Date(),
          }
      )
    }

  }

  /**
   * add note to local observation
   * @param {string} mNote
   */
  handlePushNotes = (
    mNote: string
  ) => {
    if(this.currentObservation) {
      this.currentObservation.notes.push(
        {content: mNote,
        Timestamp: new Date(),
        id: uuidv4()})
    }
  }

  handlePushNotesRemote = async (
    mNote: string
  ): Promise<firebase.firestore.DocumentReference | void> => {
    if(this.sessionRef) {
      return this.sessionRef
        .collection('notes')
        .add({
          Timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          Note: mNote,
        })
        .catch((error: Error) =>
          console.error('Error occurred adding notes: ', error)
        )
    }
  }

  handleFetchNotes = () => {
    if(this.currentObservation) {
      return this.currentObservation.notes
    }
    return []
  }


  handleUpdateNote = (id: string, text:string) => {
    let noteIndex = this.currentObservation?.notes.findIndex(note => note.id === id)
    if(noteIndex === undefined || noteIndex === -1) {
      throw new Error(`Cannot find note with id ${id}`)
    }
    let newNote = {
      id: id,
      content: text,
      Timestamp: new Date()
    }
    this.currentObservation?.notes.splice(noteIndex, 1, newNote)
  }

  handleUpdateNoteRemote = (id:string, text: string, session: string | null = null) => {
    let sessionRef = session ? this.db.collection('observations').doc(session) : this.sessionRef
   sessionRef.collection('notes').doc(id).update({Note: text})
     .catch(error => console.log('Could not update note:', error))
  }

  /* handleFetchTrainingStatus = async function() {
    return this.db
      .collection("users")
      .doc(this.auth.currentUser.uid)
      .get()
      .then(doc => doc.data().training)
      .catch(error => console.error("Error getting training status: ", error));
  }; */

  /* handleFetchQuestions = async function(section) {
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
  }; */

  handleFetchNotesResults = async (
    sessionId: string
  ): Promise<Array<Note> | void> => {
    this.sessionRef = this.db.collection('observations').doc(sessionId)
    return this.sessionRef
      .collection('notes')
      .orderBy('Timestamp')
      .get()
      .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
        const notesArr: Array<Note> = []
        querySnapshot.forEach(doc =>
          notesArr.push({
            id: doc.id,
            content: doc.data().Note,
            timestamp: doc.data().Timestamp,
          })
        )
        return notesArr
      })
      .catch((error: Error) =>
        console.error('Error occurred getting result notes: ', error)
      )
  }

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

  /**
   * Classroom Climate cloud function
   * get average tone rating for observation session
   * @param {string} sessionId
   */
  fetchAvgToneRating = async (sessionId: string): Promise<number | void> => {
    const getAvgToneRatingFirebaseFunction = this.functions.httpsCallable(
      'funcAvgToneRating'
    )
    return getAvgToneRatingFirebaseFunction({sessionId: sessionId})
      .then(
        (result: { data: Array<Array<{ average: number }>> }) =>
          result.data[0][0].average
      )
      .catch((error: Error) =>
        console.error('Error occurred getting average tone rating: ', error)
      )
  }

  /**
   * Student Engagement cloud function
   * get average engagement rating for observations session
   * @param {string} sessionId
   */
  fetchEngagementAvgSummary = async (
    sessionId: string
  ): Promise<{ average: number } | void> => {
    const getEngagementAvgSummaryFirebaseFunction = this.functions.httpsCallable(
      'funcEngagementAvgSummary'
    )
    return getEngagementAvgSummaryFirebaseFunction({sessionId: sessionId})
      .then(
        (result: { data: Array<Array<{ average: number }>> }) =>
          result.data[0][0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting average tone rating: ', error)
      )
  }

  /**
   * Classroom Climate cloud function
   * gets counts of each behavior type for climate observation
   * @param {string} sessionId
   */
  fetchBehaviourTypeCount = async (
    sessionId: string
  ): Promise<Array<{ behaviorResponse: string; count: number }> | void> => {
    const getBehaviourTypeCountFirebaseFunction = this.functions.httpsCallable(
      'funcBehaviourTypeCount'
    )
    return getBehaviourTypeCountFirebaseFunction({sessionId: sessionId})
      .then(
        (result: {
          data: Array<Array<{ behaviorResponse: string; count: number }>>
        }) => result.data[0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting behavior type count: ', error)
      )
  }

  /**
   * Classroom Climate cloud function
   * gets positive and negative behavior count for each observation
   * @param {string} teacherId
   */
  fetchBehaviourTrend = async (
    teacherId: string
  ): Promise<Array<{
    dayOfEvent: { value: string }
    positive: number
    negative: number
  }> | void> => {
    const getBehaviourTrendFirebaseFunction = this.functions.httpsCallable(
      'funcBehaviourTrend'
    )
    return getBehaviourTrendFirebaseFunction({teacherId: teacherId})
      .then(
        (result: {
          data: Array<Array<{
            dayOfEvent: { value: string }
            positive: number
            negative: number
          }>>
        }) => result.data[0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting behavior trend: ', error)
      )
  }

  /**
   * Student Engagement cloud function
   * gets average engagement rating for each observation
   * @param {string} teacherId
   */
  fetchEngagementTrend = async (
    teacherId: string
  ): Promise<Array<{
    startDate: { value: string }
    average: number
  }> | void> => {
    const getEngagementTrendFirebaseFunction = this.functions.httpsCallable(
      'funcEngagementTrend'
    )
    return getEngagementTrendFirebaseFunction({teacherId: teacherId})
      .then(
        (result: {
          data: Array<Array<{ startDate: { value: string }; average: number }>>
        }) => result.data[0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting engagement trend: ', error)
      )
  }

  /**
   * Level of Instruction cloud function
   * gets count of each instruction type
   * @param {string} sessionId
   */
  fetchInstructionTypeCount = async (
    sessionId: string
  ): Promise<Array<{ instructionType: string; count: number }> | void> => {
    const getInstructionTypeCountFirebaseFunction = this.functions.httpsCallable(
      'funcInstructionTypeCount'
    )
    return getInstructionTypeCountFirebaseFunction({sessionId: sessionId})
      .then(
        (result: {
          data: Array<Array<{ instructionType: string; count: number }>>
        }) => result.data[0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting instruction type count: ', error)
      )
  }

  /**
   * Level of Instruction cloud function
   * gets counts of the 4 instruction types for each observation
   * @param {string} teacherId
   */
  fetchInstructionTrend = async (
    teacherId: string
  ): Promise<Array<{
    dayOfEvent: { value: string }
    hlq: number
    hlqResponse: number
    llq: number
    llqResponse: number
  }> | void> => {
    const getInstructionTrendFirebaseFunction = this.functions.httpsCallable(
      'funcInstructionTrend'
    )
    return getInstructionTrendFirebaseFunction({teacherId: teacherId})
      .then(
        (result: {
          data: Array<Array<{
            dayOfEvent: { value: string }
            hlq: number
            hlqResponse: number
            llq: number
            llqResponse: number
          }>>
        }) => result.data[0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting instruction trend: ', error)
      )
  }

  /**
   * cloud function
   * gets ids and start dates of each observation for a particular teacher and tool
   * @param {string} teacherId
   * @param {string} sessionType
   */
  fetchSessionDates = async (
    teacherId: string,
    sessionType: string
  ): Promise<Array<{
    id: string
    sessionStart: { value: string }
  }> | void> => {
    const getTransitionSessionDatesFirebaseFunction = this.functions.httpsCallable(
      'funcSessionDates'
    )
    return getTransitionSessionDatesFirebaseFunction({
      teacherId: teacherId,
      type: sessionType,
    })
      .then(
        (result: {
          data: Array<Array<{ id: string; sessionStart: { value: string } }>>
        }) => result.data[0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting session dates: ', error)
      )
  }

  /**
   * cloud function
   * gets ids and start dates of each literacy observation for a particular teacher and focus
   * @param {string} teacherId
   * @param {string} checklist
   */
  fetchLiteracySessionDates = async (
    teacherId: string,
    checklist: string
  ): Promise<Array<{
    id: string
    sessionStart: { value: string }
    who: string
  }> | void> => {
    const getLiteracySessionDatesFirebaseFunction = this.functions.httpsCallable(
      'funcLiteracySessionDates'
    )
    return getLiteracySessionDatesFirebaseFunction({
      teacherId: teacherId,
      type: checklist,
    })
      .then(
        (result: {
          data: Array<Array<{
            id: string
            sessionStart: { value: string }
            who: string
          }>>
        }) => result.data[0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting session dates: ', error)
      )
  }

  /**
   * Transition Time cloud function
   * gets transition time and total session time
   * @param {string} sessionId
   */
  fetchTransitionSummary = async (
    sessionId: string
  ): Promise<Array<{
    total: number
    sessionTotal: number
    startDate: { value: string }
  }> | void> => {
    const getTransitionTypeCountFirebaseFunction = this.functions.httpsCallable(
      'funcTransitionSessionSummary'
    )
    return getTransitionTypeCountFirebaseFunction({sessionId: sessionId})
      .then(
        (result: {
          data: Array<Array<{
            total: number
            sessionTotal: number
            startDate: { value: string }
          }>>
        }) => result.data[0]
      )
      .catch((error: Error) =>
        console.error('Error getting transition summary: ', error)
      )
  }

  /**
   * Transition Time cloud function
   * @param {string} sessionId
   */
  fetchTransitionTypeSummary = async (
    sessionId: string
  ): Promise<Array<{
    line: number
    traveling: number
    waiting: number
    routines: number
    behaviorManagement: number
    other: number
    total: number
  }> | void> => {
    const getTransitionTypeCountFirebaseFunction = this.functions.httpsCallable(
      'funcTransitionTypeSummary'
    )
    return getTransitionTypeCountFirebaseFunction({sessionId: sessionId})
      .then(
        (result: {
          data: Array<Array<{
            line: number
            traveling: number
            waiting: number
            routines: number
            behaviorManagement: number
            other: number
            total: number
          }>>
        }) => result.data[0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting transition type summary: ', error)
      )
  }

  /* fetchTransitionLog = async function(sessionId) {
      const getTransitionsFirebaseFunction = this.functions.httpsCallable(
        'funcTransitionLogNew'
      );
      return getTransitionsFirebaseFunction({ sessionId: sessionId })
      .then(
        result =>
          result.data[0]
      )
      .catch(error =>
        console.error("Error occurred getting transition log: ", error)
      );
  }; */

  /**
   * Transition Time cloud function
   * gets totals of each transition type for each observation
   * @param {string} teacherId
   */
  fetchTransitionTrend = async (
    teacherId: string
  ): Promise<Array<{
    id: string
    line: number
    traveling: number
    waiting: number
    routines: number
    behaviorManagement: number
    other: number
    total: number
    sessionTotal: number
    startDate: { value: string }
  }> | void> => {
    const getTransitionTrendFirebaseFunction = this.functions.httpsCallable(
      'funcTransitionTrendNew'
    )
    return getTransitionTrendFirebaseFunction({teacherId: teacherId})
      .then(
        (result: {
          data: Array<Array<{
            id: string
            line: number
            traveling: number
            waiting: number
            routines: number
            behaviorManagement: number
            other: number
            total: number
            sessionTotal: number
            startDate: { value: string }
          }>>
        }) => result.data[0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting transition trend: ', error)
      )
  }

  /**
   *
   * @param {string} tableName
   */
  fetchExport = async (
    tableName: string,
    from: string,
    to: string
  ): Promise<{} | void> => {
    const exportBqFunction = this.functions.httpsCallable('exportBqData')
    return exportBqFunction({tableName, from, to})
  }

  createTables = async (): Promise<{} | void> => {
    const createTables = this.functions.httpsCallable('createTables')
    return createTables()
  }

  /**
   * Associative Cooperative cloud function
   * gets counts of each type of child & teacher behaviors
   * @param {string} sessionId
   */
  fetchACDetails = async (
    sessionId: string
  ): Promise<{
    ac1: number
    ac2: number
    ac3: number
    ac4: number
    teacher1: number
    teacher2: number
    teacher3: number
    teacher4: number
  } | void> => {
    const getACDetailsFirebaseFunction = this.functions.httpsCallable(
      'funcACDetails'
    )
    return getACDetailsFirebaseFunction({sessionId: sessionId})
      .then(
        (result: {
          data: Array<Array<{
            ac1: number
            ac2: number
            ac3: number
            ac4: number
            teacher1: number
            teacher2: number
            teacher3: number
            teacher4: number
          }>>
        }) => result.data[0][0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting AC details: ', error)
      )
  }

  /**
   * Sequential Activities cloud function
   * gets counts of each type of child & teacher behaviors
   * @param {string} sessionId
   */
  fetchSeqDetails = async (
    sessionId: string
  ): Promise<{
    sequential1: number
    sequential2: number
    sequential3: number
    sequential4: number
    teacher1: number
    teacher2: number
    teacher3: number
    teacher4: number
  } | void> => {
    const getSeqDetailsFirebaseFunction = this.functions.httpsCallable(
      'funcSeqDetails'
    )
    return getSeqDetailsFirebaseFunction({sessionId: sessionId})
      .then(
        (result: {
          data: Array<Array<{
            sequential1: number
            sequential2: number
            sequential3: number
            sequential4: number
            teacher1: number
            teacher2: number
            teacher3: number
            teacher4: number
          }>>
        }) => result.data[0][0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting sequential details: ', error)
      )
  }

  /**
   * Student Engagement cloud function
   * gets counts of engagement ratings by activity type
   * @param {string} sessionId
   */
  fetchEngagementDetails = async (
    sessionId: string
  ): Promise<{
    offTask0: number
    offTask1: number
    offTask2: number
    mildlyEngaged0: number
    mildlyEngaged1: number
    mildlyEngaged2: number
    engaged0: number
    engaged1: number
    engaged2: number
    highlyEngaged0: number
    highlyEngaged1: number
    highlyEngaged2: number
  } | void> => {
    const getEngagementDetailsFirebaseFunction = this.functions.httpsCallable(
      'funcEngagementDetails'
    )
    return getEngagementDetailsFirebaseFunction({sessionId: sessionId})
      .then(
        (result: {
          data: Array<Array<{
            offTask0: number
            offTask1: number
            offTask2: number
            mildlyEngaged0: number
            mildlyEngaged1: number
            mildlyEngaged2: number
            engaged0: number
            engaged1: number
            engaged2: number
            highlyEngaged0: number
            highlyEngaged1: number
            highlyEngaged2: number
          }>>
        }) => result.data[0][0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting sequential details: ', error)
      )
  }

  /**
   * Math Instruction cloud function
   * gets counts of each type of child & teacher behaviors
   * @param {string} sessionId
   */
  fetchMathDetails = async (
    sessionId: string
  ): Promise<{
    math1: number
    math2: number
    math3: number
    math4: number
    teacher1: number
    teacher2: number
    teacher3: number
    teacher4: number
  } | void> => {
    const getMathDetailsFirebaseFunction = this.functions.httpsCallable(
      'funcMathDetails'
    )
    return getMathDetailsFirebaseFunction({sessionId: sessionId})
      .then(
        (result: {
          data: Array<Array<{
            math1: number
            math2: number
            math3: number
            math4: number
            teacher1: number
            teacher2: number
            teacher3: number
            teacher4: number
          }>>
        }) => result.data[0][0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting math details: ', error)
      )
  }

  /**
   * Listening to Children cloud function
   * gets counts of each listening behavior type
   * @param {string} sessionId
   */
  fetchListeningDetails = async (
    sessionId: string
  ): Promise<{
    listening1: number
    listening2: number
    listening3: number
    listening4: number
    listening5: number
    listening6: number
  } | void> => {
    const getListeningDetailsFirebaseFunction = this.functions.httpsCallable(
      'funcListeningDetails'
    )
    return getListeningDetailsFirebaseFunction({sessionId: sessionId})
      .then(
        (result: {
          data: Array<Array<{
            listening1: number
            listening2: number
            listening3: number
            listening4: number
            listening5: number
            listening6: number
          }>>
        }) => result.data[0][0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting listening details: ', error)
      )
  }

  /**
   * Associative Cooperative cloud function
   * gets counts of child summary data
   * @param {string} sessionId
   */
  fetchChildACSummary = async (
    sessionId: string
  ): Promise<{
    noOpportunity: number
    noac: number
    ac: number
  } | void> => {
    const getChildACSummaryFirebaseFunction = this.functions.httpsCallable(
      'funcChildACSummary'
    )
    return getChildACSummaryFirebaseFunction({sessionId: sessionId})
      .then(
        (result: {
          data: Array<Array<{
            noOpportunity: number
            noac: number
            ac: number
          }>>
        }) => result.data[0][0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting child AC summary: ', error)
      )
  }

  /**
   * Sequential Activities cloud function
   * gets counts of child summary data
   * @param {string} sessionId
   */
  fetchChildSeqSummary = async (
    sessionId: string
  ): Promise<{
    notSequential: number
    sequential: number
  } | void> => {
    const getChildSeqSummaryFirebaseFunction = this.functions.httpsCallable(
      'funcChildSeqSummary'
    )
    return getChildSeqSummaryFirebaseFunction({sessionId: sessionId})
      .then(
        (result: {
          data: Array<Array<{ notSequential: number; sequential: number }>>
        }) => result.data[0][0]
      )
      .catch((error: Error) =>
        console.error(
          'Error occurred getting child Sequential summary: ',
          error
        )
      )
  }

  /**
   * Student Engagement cloud function
   * gets counts of summary data
   * @param {string} sessionId
   */
  fetchEngagementPieSummary = async (
    sessionId: string
  ): Promise<{
    offTask: number
    engaged: number
  } | void> => {
    const getEngagementPieSummaryFirebaseFunction = this.functions.httpsCallable(
      'funcEngagementPieSummary'
    )
    return getEngagementPieSummaryFirebaseFunction({sessionId: sessionId})
      .then(
        (result: {
          data: Array<Array<{
            offTask: number
            engaged: number
          }>>
        }) => result.data[0][0]
      )
      .catch((error: Error) =>
        console.error(
          'Error occurred getting child Sequential summary: ',
          error
        )
      )
  }

  /**
   * Math Instruction cloud function
   * gets counts of child summary data
   * @param {string} sessionId
   */
  fetchChildMathSummary = async (
    sessionId: string
  ): Promise<{
    math: number
    notMath: number
  } | void> => {
    const getChildMathSummaryFirebaseFunction = this.functions.httpsCallable(
      'funcChildMathSummary'
    )
    return getChildMathSummaryFirebaseFunction({sessionId: sessionId})
      .then(
        (result: {
          data: Array<Array<{
            math: number
            notMath: number
          }>>
        }) => result.data[0][0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting child math summary: ', error)
      )
  }

  /**
   * Associative Cooperative cloud function
   * gets counts of teacher summary data
   * @param {string} sessionId
   */
  fetchTeacherACSummary = async (
    sessionId: string
  ): Promise<{
    noOpportunity: number
    noSupport: number
    support: number
  } | void> => {
    const getTeacherACSummaryFirebaseFunction = this.functions.httpsCallable(
      'funcTeacherACSummary'
    )
    return getTeacherACSummaryFirebaseFunction({sessionId: sessionId})
      .then(
        (result: {
          data: Array<Array<{
            noOpportunity: number
            noSupport: number
            support: number
          }>>
        }) => result.data[0][0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting teacher AC summary: ', error)
      )
  }

  /**
   * Sequential Activities cloud function
   * gets counts of teacher summary data
   * @param {string} sessionId
   */
  fetchTeacherSeqSummary = async (
    sessionId: string
  ): Promise<{
    noOpportunity: number
    noSupport: number
    support: number
  } | void> => {
    const getTeacherSeqSummaryFirebaseFunction = this.functions.httpsCallable(
      'funcTeacherSeqSummary'
    )
    return getTeacherSeqSummaryFirebaseFunction({sessionId: sessionId})
      .then(
        (result: {
          data: Array<Array<{
            noOpportunity: number
            noSupport: number
            support: number
          }>>
        }) => result.data[0][0]
      )
      .catch((error: Error) =>
        console.error(
          'Error occurred getting teacher sequential summary: ',
          error
        )
      )
  }

  /**
   * Math Instruction cloud function
   * gets counts of teacher summary data
   * @param {string} sessionId
   */
  fetchTeacherMathSummary = async (
    sessionId: string
  ): Promise<{
    noOpportunity: number
    noSupport: number
    support: number
  } | void> => {
    const getTeacherMathSummaryFirebaseFunction = this.functions.httpsCallable(
      'funcTeacherMathSummary'
    )
    return getTeacherMathSummaryFirebaseFunction({sessionId: sessionId})
      .then(
        (result: {
          data: Array<Array<{
            noOpportunity: number
            noSupport: number
            support: number
          }>>
        }) => result.data[0][0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting teacher math summary: ', error)
      )
  }

  /**
   * Listening to Children cloud function
   * gets counts of summary data
   * @param {string} sessionId
   */
  fetchListeningSummary = async (
    sessionId: string
  ): Promise<{
    listening: number
    notListening: number
  } | void> => {
    const getListeningSummaryFirebaseFunction = this.functions.httpsCallable(
      'funcListeningSummary'
    )
    return getListeningSummaryFirebaseFunction({sessionId: sessionId})
      .then(
        (result: {
          data: Array<Array<{ listening: number; notListening: number }>>
        }) => result.data[0][0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting listening summary: ', error)
      )
  }

  /**
   * Literacy Instruction cloud function
   * gets counts of summary data
   * @param {string} sessionId
   * @param {string} type
   * @param {string} who
   */
  fetchLiteracySummary = async (
    sessionId: string,
    type: string,
    who: string
  ): Promise<{
    literacy: number
    noLiteracy: number
  } | void> => {
    const getLiteracySummaryFirebaseFunction =
      type === 'Foundational'
        ? this.functions.httpsCallable('funcLiteracySummaryFoundational')
        : type === 'Writing'
          ? this.functions.httpsCallable('funcLiteracySummaryWriting')
          : type === 'Reading'
            ? this.functions.httpsCallable('funcLiteracySummaryReading')
            : this.functions.httpsCallable('funcLiteracySummaryLanguage')
    return getLiteracySummaryFirebaseFunction({
      sessionId: sessionId,
      type: type,
      who: who,
    })
      .then(
        (result: {
          data: Array<Array<{ literacy: number; noLiteracy: number }>>
        }) => result.data[0][0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting listening summary: ', error)
      )
  }

  /**
   * Literacy Instruction cloud function
   * gets counts of each literacy behavior type
   * @param {string} sessionId
   * @param {string} who
   */
  fetchLiteracyDetailsFoundational = async (
    sessionId: string,
    who: string
  ): Promise<{
    literacy1: number
    literacy2: number
    literacy3: number
    literacy4: number
    literacy5: number
    literacy6: number
    literacy7: number
    literacy8: number
    literacy9: number
    literacy10: number
  } | void> => {
    const getLiteracyDetailsFirebaseFunction = this.functions.httpsCallable(
      'funcLiteracyDetailsFoundational'
    )
    return getLiteracyDetailsFirebaseFunction({
      sessionId: sessionId,
      who: who,
    })
      .then(
        (result: {
          data: Array<Array<{
            literacy1: number
            literacy2: number
            literacy3: number
            literacy4: number
            literacy5: number
            literacy6: number
            literacy7: number
            literacy8: number
            literacy9: number
            literacy10: number
          }>>
        }) => result.data[0][0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting literacy details: ', error)
      )
  }

  /**
   * Literacy Instruction cloud function
   * gets counts of each literacy behavior type
   * @param {string} sessionId
   * @param {string} who
   */
  fetchLiteracyDetailsWriting = async (
    sessionId: string,
    who: string
  ): Promise<{
    literacy1: number
    literacy2: number
    literacy3: number
    literacy4: number
    literacy5: number
    literacy6: number
    literacy7: number
    literacy8: number
  } | void> => {
    const getLiteracyDetailsFirebaseFunction = this.functions.httpsCallable(
      'funcLiteracyDetailsWriting'
    )
    return getLiteracyDetailsFirebaseFunction({
      sessionId: sessionId,
      who: who,
    })
      .then(
        (result: {
          data: Array<Array<{
            literacy1: number
            literacy2: number
            literacy3: number
            literacy4: number
            literacy5: number
            literacy6: number
            literacy7: number
            literacy8: number
          }>>
        }) => result.data[0][0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting literacy details: ', error)
      )
  }

  /**
   * Literacy Instruction cloud function
   * gets counts of each literacy behavior type
   * @param {string} sessionId
   * @param {string} who
   */
  fetchLiteracyDetailsReading = async (
    sessionId: string,
    who: string
  ): Promise<{
    literacy1: number
    literacy2: number
    literacy3: number
    literacy4: number
    literacy5: number
    literacy6: number
    literacy7: number
    literacy8: number
    literacy9: number
    literacy10: number
  } | void> => {
    const getLiteracyDetailsFirebaseFunction = this.functions.httpsCallable(
      'funcLiteracyDetailsReading'
    )
    return getLiteracyDetailsFirebaseFunction({
      sessionId: sessionId,
      who: who,
    })
      .then(
        (result: {
          data: Array<Array<{
            literacy1: number
            literacy2: number
            literacy3: number
            literacy4: number
            literacy5: number
            literacy6: number
            literacy7: number
            literacy8: number
            literacy9: number
            literacy10: number
          }>>
        }) => result.data[0][0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting literacy details: ', error)
      )
  }

  /**
   * Literacy Instruction cloud function
   * gets counts of each literacy behavior type
   * @param {string} sessionId
   * @param {string} who
   */
  fetchLiteracyDetailsLanguage = async (
    sessionId: string,
    who: string
  ): Promise<{
    literacy1: number
    literacy2: number
    literacy3: number
    literacy4: number
    literacy5: number
    literacy6: number
    literacy7: number
    literacy8: number
  } | void> => {
    const getLiteracyDetailsFirebaseFunction = this.functions.httpsCallable(
      'funcLiteracyDetailsLanguage'
    )
    return getLiteracyDetailsFirebaseFunction({
      sessionId: sessionId,
      who: who,
    })
      .then(
        (result: {
          data: Array<Array<{
            literacy1: number
            literacy2: number
            literacy3: number
            literacy4: number
            literacy5: number
            literacy6: number
            literacy7: number
            literacy8: number
          }>>
        }) => result.data[0][0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting literacy details: ', error)
      )
  }

  /**
   * Literacy Instruction cloud function
   * gets literacy data for each foundational skills observation for teachers
   * @param {string} teacherId
   */
  fetchLiteracyTrendFoundationalTeacher = async (
    teacherId: string
  ): Promise<Array<{
    startDate: { value: string }
    literacy1: number
    literacy2: number
    literacy3: number
    literacy4: number
    literacy5: number
    literacy6: number
    literacy7: number
    literacy8: number
    literacy9: number
    literacy10: number
    total: number
    activitySetting: string
  }> | void> => {
    const getLiteracyTrendFoundationalFirebaseFunction = this.functions.httpsCallable(
      'funcLiteracyTrendFoundationalTeacher'
    )
    return getLiteracyTrendFoundationalFirebaseFunction({
      teacherId: teacherId,
    })
      .then(
        (result: {
          data: Array<Array<{
            startDate: { value: string }
            literacy1: number
            literacy2: number
            literacy3: number
            literacy4: number
            literacy5: number
            literacy6: number
            literacy7: number
            literacy8: number
            literacy9: number
            literacy10: number
            total: number
            activitySetting: string
          }>>
        }) => result.data[0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting listening trend: ', error)
      )
  }

  /**
   * Literacy Instruction cloud function
   * gets literacy data for each foundational skills observation for children
   * @param {string} teacherId
   */
  fetchLiteracyTrendFoundationalChild = async (
    teacherId: string
  ): Promise<Array<{
    startDate: { value: string }
    literacy1: number
    literacy2: number
    literacy3: number
    literacy4: number
    literacy5: number
    literacy6: number
    literacy7: number
    literacy8: number
    literacy9: number
    total: number
    activitySetting: string
  }> | void> => {
    const getLiteracyTrendFoundationalFirebaseFunction = this.functions.httpsCallable(
      'funcLiteracyTrendFoundationalChild'
    )
    return getLiteracyTrendFoundationalFirebaseFunction({
      teacherId: teacherId,
    })
      .then(
        (result: {
          data: Array<Array<{
            startDate: { value: string }
            literacy1: number
            literacy2: number
            literacy3: number
            literacy4: number
            literacy5: number
            literacy6: number
            literacy7: number
            literacy8: number
            literacy9: number
            total: number
            activitySetting: string
          }>>
        }) => result.data[0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting listening trend: ', error)
      )
  }

  /**
   * Literacy Instruction cloud function
   * gets literacy data for each writing observation
   * @param {string} teacherId
   */
  fetchLiteracyTrendWriting = async (
    teacherId: string,
    who: string
  ): Promise<Array<{
    startDate: { value: string }
    literacy1: number
    literacy2: number
    literacy3: number
    literacy4: number
    literacy5: number
    literacy6: number
    literacy7: number
    literacy8: number
    total: number
    activitySetting: string
  }> | void> => {
    const getLiteracyTrendFoundationalFirebaseFunction = this.functions.httpsCallable(
      'funcLiteracyTrendWriting'
    )
    return getLiteracyTrendFoundationalFirebaseFunction({
      teacherId: teacherId,
      who: who,
    })
      .then(
        (result: {
          data: Array<Array<{
            startDate: { value: string }
            literacy1: number
            literacy2: number
            literacy3: number
            literacy4: number
            literacy5: number
            literacy6: number
            literacy7: number
            literacy8: number
            total: number
            activitySetting: string
          }>>
        }) => result.data[0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting listening trend: ', error)
      )
  }

  /**
   * Literacy Instruction cloud function
   * gets literacy data for each language observation
   * @param {string} teacherId
   */
  fetchLiteracyTrendLanguage = async (
    teacherId: string,
    who: string
  ): Promise<Array<{
    startDate: { value: string }
    literacy1: number
    literacy2: number
    literacy3: number
    literacy4: number
    literacy5: number
    literacy6: number
    literacy7: number
    literacy8: number
    total: number
    activitySetting: string
  }> | void> => {
    const getLiteracyTrendFoundationalFirebaseFunction = this.functions.httpsCallable(
      'funcLiteracyTrendLanguage'
    )
    return getLiteracyTrendFoundationalFirebaseFunction({
      teacherId: teacherId,
      who: who,
    })
      .then(
        (result: {
          data: Array<Array<{
            startDate: { value: string }
            literacy1: number
            literacy2: number
            literacy3: number
            literacy4: number
            literacy5: number
            literacy6: number
            literacy7: number
            literacy8: number
            total: number
            activitySetting: string
          }>>
        }) => result.data[0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting listening trend: ', error)
      )
  }

  /**
   * Literacy Instruction cloud function
   * gets literacy data for each language observation
   * @param {string} teacherId
   */
  fetchLiteracyTrendReading = async (
    teacherId: string,
    who: string
  ): Promise<Array<{
    startDate: { value: string }
    literacy1: number
    literacy2: number
    literacy3: number
    literacy4: number
    literacy5: number
    literacy6: number
    literacy7: number
    literacy8: number
    literacy9: number
    literacy10: number
    total: number
    activitySetting: string
  }> | void> => {
    const getLiteracyTrendFoundationalFirebaseFunction = this.functions.httpsCallable(
      'funcLiteracyTrendReading'
    )
    return getLiteracyTrendFoundationalFirebaseFunction({
      teacherId: teacherId,
      who: who,
    })
      .then(
        (result: {
          data: Array<Array<{
            startDate: { value: string }
            literacy1: number
            literacy2: number
            literacy3: number
            literacy4: number
            literacy5: number
            literacy6: number
            literacy7: number
            literacy8: number
            literacy9: number
            literacy10: number
            total: number
            activitySetting: string
          }>>
        }) => result.data[0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting listening trend: ', error)
      )
  }

  /**
   * Associative Cooperative cloud function
   * gets counts of child data for each observation
   * @param {string} teacherId
   */
  fetchChildACTrend = async (
    teacherId: string
  ): Promise<Array<{
    startDate: { value: string }
    noOpportunity: number
    ac: number
    noac: number
  }> | void> => {
    const getChildACTrendFirebaseFunction = this.functions.httpsCallable(
      'funcChildACTrend'
    )
    return getChildACTrendFirebaseFunction({teacherId: teacherId})
      .then(
        (result: {
          data: Array<Array<{
            startDate: { value: string }
            noOpportunity: number
            ac: number
            noac: number
          }>>
        }) => result.data[0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting child AC trend: ', error)
      )
  }

  /**
   * Sequential Activities cloud function
   * gets counts of child data for each observation
   * @param {string} teacherId
   */
  fetchChildSeqTrend = async (
    teacherId: string
  ): Promise<Array<{
    startDate: { value: string }
    sequential: number
    notSequential: number
  }> | void> => {
    const getChildSeqTrendFirebaseFunction = this.functions.httpsCallable(
      'funcChildSeqTrend'
    )
    return getChildSeqTrendFirebaseFunction({teacherId: teacherId})
      .then(
        (result: {
          data: Array<Array<{
            startDate: { value: string }
            sequential: number
            notSequential: number
          }>>
        }) => result.data[0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting child sequential trend: ', error)
      )
  }

  /**
   * Math Instruction cloud function
   * gets counts of child data for each observation
   * @param {string} teacherId
   */
  fetchChildMathTrend = async (
    teacherId: string
  ): Promise<Array<{
    startDate: { value: string }
    math: number
    notMath: number
  }> | void> => {
    const getChildMathTrendFirebaseFunction = this.functions.httpsCallable(
      'funcChildMathTrend'
    )
    console.log('fetchChildMathTrend from firebase executed')
    return getChildMathTrendFirebaseFunction({teacherId: teacherId})
      .then(
        (result: {
          data: Array<Array<{
            startDate: { value: string }
            math: number
            notMath: number
          }>>
        }) => result.data[0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting child math trend: ', error)
      )
  }

  /**
   * Associative Cooperative cloud function
   * gets counts of teacher data for each observation
   * @param {string} teacherId
   */
  fetchTeacherACTrend = async (
    teacherId: string
  ): Promise<Array<{
    startDate: { value: string }
    noOpportunity: number
    support: number
    nosupport: number
  }> | void> => {
    const getTeacherACTrendFirebaseFunction = this.functions.httpsCallable(
      'funcTeacherACTrend'
    )
    return getTeacherACTrendFirebaseFunction({teacherId: teacherId})
      .then(
        (result: {
          data: Array<Array<{
            startDate: { value: string }
            noOpportunity: number
            support: number
            nosupport: number
          }>>
        }) => result.data[0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting teacher AC trend: ', error)
      )
  }

  /**
   * Sequential Activities cloud function
   * gets counts of teacher data for each observation
   * @param {string} teacherId
   */
  fetchTeacherSeqTrend = async (
    teacherId: string
  ): Promise<Array<{
    startDate: { value: string }
    noOpportunity: number
    support: number
    noSupport: number
  }> | void> => {
    const getTeacherSeqTrendFirebaseFunction = this.functions.httpsCallable(
      'funcTeacherSeqTrend'
    )
    return getTeacherSeqTrendFirebaseFunction({teacherId: teacherId})
      .then(
        (result: {
          data: Array<Array<{
            startDate: { value: string }
            noOpportunity: number
            support: number
            noSupport: number
          }>>
        }) => result.data[0]
      )
      .catch((error: Error) =>
        console.error(
          'Error occurred getting teacher sequential trend: ',
          error
        )
      )
  }

  /**
   * Math Instruction cloud function
   * gets counts of teacher data for each observation
   * @param {string} teacherId
   */
  fetchTeacherMathTrend = async (
    teacherId: string
  ): Promise<Array<{
    startDate: { value: string }
    noOpportunity: number
    support: number
    noSupport: number
  }> | void> => {
    const getTeacherMathTrendFirebaseFunction = this.functions.httpsCallable(
      'funcTeacherMathTrend'
    )
    return getTeacherMathTrendFirebaseFunction({teacherId: teacherId})
      .then(
        (result: {
          data: Array<Array<{
            startDate: { value: string }
            noOpportunity: number
            support: number
            noSupport: number
          }>>
        }) => result.data[0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting teacher math trend: ', error)
      )
  }

  /**
   * Listening to Children cloud function
   * gets listening counts for each observation
   * @param {string} teacherId
   */
  fetchListeningTrend = async (
    teacherId: string
  ): Promise<Array<{
    startDate: { value: string }
    listening: number
    notListening: number
  }> | void> => {
    const getListeningTrendFirebaseFunction = this.functions.httpsCallable(
      'funcListeningTrend'
    )
    return getListeningTrendFirebaseFunction({teacherId: teacherId})
      .then(
        (result: {
          data: Array<Array<{
            startDate: { value: string }
            listening: number
            notListening: number
          }>>
        }) => result.data[0]
      )
      .catch((error: Error) =>
        console.error('Error occurred getting listening trend: ', error)
      )
  }

  setActionPlanStatus = async ( actionPlanId: string ): Promise<void> => {
    await firebase.firestore().collection('actionPlans').doc(actionPlanId).update({status: 'Maintenance'})
  }

  /**
   * adds action plan entry to database
   * @param {string} teacherId
   * @param {string} magic8
   */
  createActionPlan = async (
    teacherId: string,
    magic8: string,
    planNumber: number
  ): Promise<string | void> => {
    const data = Object.assign(
      {},
      {
        coach: this.auth.currentUser ? this.auth.currentUser.uid : 'unknown',
        teacher: teacherId,
        tool: magic8,
        dateModified: firebase.firestore.Timestamp.now(),
        dateCreated: firebase.firestore.Timestamp.now(),
        goal: '',
        goalTimeline: '',
        benefit: '',
        planNum: (planNumber > 0) ? planNumber+1 : 1 ,
        status: "Active"
      }
    )
    const actionPlansRef = firebase
      .firestore()
      .collection('actionPlans')
      .doc()
    actionPlansRef
      .set(data)
      .then(() => {
        const actionStepsRef = actionPlansRef.collection('actionSteps').doc('0')
        actionStepsRef
          .set({
            person: '',
            step: '',
            timeline: null,
          })
          .then(() => {
            console.log('action steps created')
          })
          .catch(() => {
            console.log('error creating action steps')
          })
      })
      .catch(() => {
        console.log('error creating action plan')
      })
  }

  /**
   * adds action step to database
   * @param {string} actionPlanId
   * @param {string} index
   */
  createActionStep = async (
    actionPlanId: string,
    index: string
  ): Promise<string | void> => {
    const actionStepsRef = this.db
      .collection('actionPlans')
      .doc(actionPlanId)
      .collection('actionSteps')
      .doc(index)
    actionStepsRef
      .set({
        step: '',
        person: '',
        timeline: null,
      })
      .then(() => {
        console.log('action steps created')
      })
      .catch(() => {
        console.log('error creating action steps')
      })
  }

  /**
   * finds all action plans for coach and all their teachers
   */
  getCoachActionPlans = async (): Promise<Array<{
    id: string
    teacherId: string
    date: { seconds: number; nanoseconds: number }
    practice: string
    modified: number
    teacherFirstName: string
    teacherLastName: string
    achieveBy: firebase.firestore.Timestamp
    status: string
  }> | void> => {
    if (this.auth.currentUser) {
      this.query = this.db
        .collection('actionPlans')
        .where('coach', '==', this.auth.currentUser.uid)
      return this.query
        .get()
        .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
          const idArr: Array<{
            id: string
            teacherId: string
            date: { seconds: number; nanoseconds: number }
            practice: string
            teacherFirstName: string
            modified: number
            teacherLastName: string
            achieveBy: firebase.firestore.Timestamp
            status: string
          }> = []
          querySnapshot.forEach(doc => {
              // Moved the logic for 'modified' here so it sorts correctly in the Action Plan List
              idArr.push({
                id: doc.id,
                teacherId: doc.data().teacher,
                teacherFirstName: '',
                teacherLastName: '',
                practice: doc.data().tool,
                date: doc.data().dateModified,
                modified: new Date(0).setUTCSeconds(doc.data().dateModified.seconds),
                achieveBy: doc.data().goalTimeline
                  ? doc.data().goalTimeline
                  : firebase.firestore.Timestamp.fromDate(new Date()),
                status: doc.data().status
              })
            }
          )
          console.log('idArr is2 ', idArr)
          return idArr
        })
        .catch(() => {
          console.log('unable to retrieve the action plan id')
        })
    }
  }

  /**
   * finds all action plans for coach and their selected teacher for a specific practice
   * @param {string} practice
   * @param {string} teacherId
   */
  getTeacherActionPlans = async (
    practice: string,
    teacherId: string
  ): Promise<Array<{
    id: string
    date: { seconds: number; nanoseconds: number }
    // newDate: Date
  }> | void> => {
    if (this.auth.currentUser) {
      this.query = this.db
        .collection('actionPlans')
        .where('coach', '==', this.auth.currentUser.uid)
        .where('teacher', '==', teacherId)
        .where('tool', '==', practice)
      return this.query
        .get()
        .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
          const idArr: Array<{
            id: string
            date: { seconds: number; nanoseconds: number }
            // newDate: Date
          }> = []
          querySnapshot.forEach(doc =>
            idArr.push({
              id: doc.id,
              date: doc.data().dateModified,
            })
          )
          return idArr
        })
        .catch(() => {
          console.log('unable to retrieve action plans')
        })
    }
  }

  /**
   * finds all action plans for coach and their selected teacher
   * @param {string} teacherId
   */
  getAllTeacherActionPlans = async (
    teacherId: string
  ): Promise<Array<{
    id: string
    date: { seconds: number; nanoseconds: number }
    practice: string
    achieveBy: firebase.firestore.Timestamp
  }> | void> => {
    if (this.auth.currentUser) {
      this.query = this.db
        .collection('actionPlans')
        .where('coach', '==', this.auth.currentUser.uid)
        .where('teacher', '==', teacherId)
      return this.query
        .get()
        .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
          const idArr: Array<{
            id: string
            date: { seconds: number; nanoseconds: number }
            practice: string
            achieveBy: firebase.firestore.Timestamp
          }> = []
          querySnapshot.forEach(doc => {
            idArr.push({
              id: doc.id,
              date: doc.data().dateModified,
              practice: doc.data().tool,
              achieveBy: doc.data().goalTimeline,
            })
          })
          return idArr
        })
        .catch(() => {
          console.log('unable to retrieve action plans')
        })
    }
  }
// Added this function because a lot of these timestamp values
// are often stored as empty strings or null in the db
  /*
  * takes an object and, if it's a firestore timestamp,
  * converts it to a JS Date.  Returns null for other values.
  * @param {any} timestamp
  */
  convertFirestoreTimestamp = (timestamp: any): Date | null => {
    return timestamp?.toDate ? timestamp.toDate() : null
  }

  getActionStepsForExport = async (actionPlanId: string) => {
    return await this.db.collection('actionPlans')
      .doc(actionPlanId)
      .collection('actionSteps')
      .get()
      .then(res => {
        return res.docs.map(doc => {
          return {
            step: doc.data().step || null,
            person: doc.data().person || null,
            timeline: this.convertFirestoreTimestamp(doc.data().timeline)
          }
        })
      })
  }

  getNotesForExport = async () => {

    let arr = []
    this.query = this.db.collection('observations');
    const collection = await this.query.get();

    Promise.all(collection.docs.map(async (obs) => {
      const { activitySetting, checklist, completed, end, observedBy, start, teacher, timezone, type} = obs.data();
      const docId = obs.id;
      this.query = this.db.collection('observations').doc(obs.id).collection('notes');
      const subCollection = await this.query.get();
      Promise.all(subCollection.docs.map(async (notes) => {
        const { Note, Timestamp } = notes.data();
        const noteId = notes.id;
        arr.push({
          observationId: docId,
          coachId: observedBy,
          teacherId: teacher,
          dateModified: this.convertFirestoreTimestamp(start),
          tool: type,
          noteId: noteId,
          timestamp: this.convertFirestoreTimestamp(Timestamp),
          content: Note,
        })
      }))
    }))

    return await arr
  }

  getEmailForExport = async () =>  {
    this.query = this.db.collection('emailList');
    const collection = await this.query.get();

    return Promise.all(collection.docs.map(async (doc) => {
      const {email, timestamp} = doc.data()
      return {
        email: email,
        timestamp: this.convertFirestoreTimestamp(timestamp),
      }
    }))

  }

  getActionPlansForExport = async (coachId: string | undefined = undefined, from, to) => {
    if (!await this.userIsLeader()) {
      throw new Error('Not authorized to Perform this action')
    }

    var fromDate = new Date(from);
    var toDate = new Date(to);

    // Set the date objects to make it the very beginning of the day (12am)
    fromDate = new Date( fromDate.getTime() - fromDate.getTimezoneOffset() * -60000 );
    toDate = new Date( toDate.getTime() - toDate.getTimezoneOffset() * -60000 );

    // Set the to date so it's the beginning of the next day (a.k.a end of current day)
    toDate.setDate(toDate.getDate() + 1);

    this.query = this.db
      .collection('actionPlans').orderBy('dateModified', 'desc')
    if (coachId) {
      this.query = this.query.where('coach', '==', coachId)
    }
    this.query = this.query.where('dateModified', '>', fromDate).where('dateModified', '<', toDate)

    const actionPlans = await this.query.get();
    return Promise.all(actionPlans.docs.map(async (doc) => {
      const {coach, benefit, dateCreated, dateModified, goal, goalTimeline, teacher, tool} = doc.data()
      return {
        coachId: coach,
        teacherId: teacher,
        benefit: benefit ?? '',
        goal: goal ?? '',
        tool: tool ?? '',
        dateModified: this.convertFirestoreTimestamp(dateModified),
        goalTimeline: this.convertFirestoreTimestamp(goalTimeline),
        dateCreated: this.convertFirestoreTimestamp(dateCreated),
        steps: await this.getActionStepsForExport(doc.id)
      }
    }))
  }

  getConferencePlansForExport = async (coachId: string | undefined = undefined, from, to) => {
    if (!await this.userIsAdmin()) {
      throw new Error('Not authorized to Perform this action')
    }

    // Convert to date objects
    var fromDate = new Date(from);
    var toDate = new Date(to);

    // Set the date objects to make it the very beginning of the day (12am)
    fromDate = new Date( fromDate.getTime() - fromDate.getTimezoneOffset() * -60000 );
    toDate = new Date( toDate.getTime() - toDate.getTimezoneOffset() * -60000 );

    // Set the to date so it's the beginning of the next day (a.k.a end of current day)
    toDate.setDate(toDate.getDate() + 1);


    this.query = this.db
      .collection('conferencePlans').orderBy('dateModified', 'desc')
    if (coachId) {
      this.query = this.query.where('coach', '==', coachId)
    }
    this.query = this.query.where('dateModified', '>', fromDate).where('dateModified', '<', toDate)

    const conferencePlans = await this.query.get();
    return Promise.all(conferencePlans.docs.map(async (doc) => {
      const {coach, dateCreated, dateModified, feedback, notes, questions, teacher, addedQuestions, tool} = doc.data()
      return {
        coachId: coach,
        teacherId: teacher,
        tool: tool ?? '',
        dateModified: this.convertFirestoreTimestamp(dateModified),
        dateCreated: this.convertFirestoreTimestamp(dateCreated),
        feedback,
        questions: questions.concat(addedQuestions), // flip the order here to put canned questions first
        notes
      }
    }))

  }

  /**
   * finds all observations for coach and their selected teacher
   * @param {string} teacherId
   */
  getAllTeacherObservations = async (
    teacherId: string
  ): Promise<Array<{
    id: string
    date: firebase.firestore.Timestamp
    practice: string
    literacyType?: string
  }> | void> => {
    if (this.auth.currentUser) {
      this.query = this.db
        .collection('observations')
        .where('observedBy', '==', '/user/' + this.auth.currentUser.uid)
        .where('teacher', '==', '/user/' + teacherId)
        .orderBy('start', 'desc')
        .limit(100)
      return this.query
        .get()
        .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
          const idArr: Array<{
            id: string
            date: firebase.firestore.Timestamp
            practice: string
            literacyType: string
          }> = []
          querySnapshot.forEach(doc => {
            if (doc.data().end > doc.data().start) {
              // check that session was completed
              idArr.push({
                id: doc.id,
                date: doc.data().start,
                practice: doc.data().type,
                literacyType:
                  doc.data().type === 'LI' ? doc.data().checklist : '',
              })
            }
          })
          return idArr
        })
        .catch(error => {
          console.log('unable to retrieve observations', error)
        })
    }
  }

  /**
   * gets first name of teacher
   * @param {string} teacherId
   */
  getTeacherFirstName = async (teacherId: string): Promise<string | void> => {
    return this.db
      .collection('users')
      .doc(teacherId)
      .get()
      .then((doc: firebase.firestore.DocumentData) => doc.data().firstName)
      .catch((error: Error) =>
        console.error('Error getting cached document:', error)
      )
  }

  /**
   * gets last name of teacher
   * @param {string} teacherId
   */
  getTeacherLastName = async (teacherId: string): Promise<string | void> => {
    return this.db
      .collection('users')
      .doc(teacherId)
      .get()
      .then((doc: firebase.firestore.DocumentData) => doc.data().lastName)
      .catch((error: Error) =>
        console.error('Error getting cached document:', error)
      )
  }

  /**
   * gets action plan data
   * @param {string} actionPlanId
   */
  getAPInfo = async (
    actionPlanId: string
  ): Promise<firebase.firestore.DocumentData | void> => {
    return this.db
      .collection('actionPlans')
      .doc(actionPlanId)
      .get()
      .then((doc: firebase.firestore.DocumentSnapshot) => {
        if (doc.exists) {
          console.log('doc data', doc.data())
          return doc.data()
        } else {
          console.log('Doc does not exist')
          return {}
        }
      })
      .catch((error: Error) =>
        console.error('Error occurred when getting document:', error)
      )
  }

  /**
   * gets action steps
   * @param {string} actionPlanId
   */
  getActionSteps = async (
    actionPlanId: string
  ): Promise<Array<{
    step: string
    person: string
    timeline: firebase.firestore.Timestamp
  }> | void> => {
    this.query = this.db
      .collection('actionPlans')
      .doc(actionPlanId)
      .collection('actionSteps')
    return this.query
      .get()
      .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
        const actionStepsArr: Array<{
          step: string
          person: string
          timeline: firebase.firestore.Timestamp
        }> = []
        querySnapshot.forEach(doc =>
          actionStepsArr.push({
            step: doc.data().step,
            person: doc.data().person,
            timeline: doc.data().timeline,
          })
        )
        return actionStepsArr
      })
      .catch(() => {
        console.log('error retrieving action steps')
      })
  }

  /**
   * saves action plan data
   * @param {string} actionPlanId
   * @param {string} goal
   * @param {Date | null} goalTimeline
   * @param {string} benefit
   */
  saveActionPlan = async (
    actionPlanId: string,
    goal: string,
    goalTimeline: Date | null,
    benefit: string
  ): Promise<void> => {
    const actionPlanRef = this.db.collection('actionPlans').doc(actionPlanId)
    return actionPlanRef
      .update({
        goal: goal,
        goalTimeline: goalTimeline
          ? firebase.firestore.Timestamp.fromDate(goalTimeline)
          : null,
        benefit: benefit,
        dateModified: firebase.firestore.Timestamp.now(),
      })
      .then(() => {
        console.log('Action plan updated successfully!')
      })
      .catch((error: Error) => {
        console.error('Error updating action plan: ', error)
      })
  }

  /**
   * saves action steps
   * @param {string} actionPlanId
   * @param {string} index
   * @param {string} step
   * @param {string} person
   * @param {Date | null} timeline
   */
  saveActionStep = async (
    actionPlanId: string,
    index: string,
    step: string,
    person: string,
    timeline: Date | null
  ): Promise<void> => {
    const actionStepsRef = this.db
      .collection('actionPlans')
      .doc(actionPlanId)
      .collection('actionSteps')
      .doc(index)
    return actionStepsRef
      .update({
        step: step,
        person: person,
        timeline: timeline
          ? firebase.firestore.Timestamp.fromDate(timeline)
          : null,
      })
      .then(() => {
        console.log('Action step updated successfully!')
      })
      .catch((error: Error) => {
        console.error('Error updating action plan: ', error)
      })
  }

  /**
   * creates conference plan in cloud firestore
   * @param {string} teacherId
   * @param {string} sessionId
   * @param {string} magic8
   * @param {Array<string>} feedback
   * @param {Array<string>} questions
   * @param {Array<string>} addedQuestions
   * @param {Array<string>} notes
   */
  createConferencePlan = async (
    teacherId: string,
    sessionId: string,
    magic8: string,
    feedback?: Array<string>,
    questions?: Array<string>,
    addedQuestions?: Array<string>,
    notes?: Array<string>
  ): Promise<string | void> => {
    const data = Object.assign(
      {},
      {
        sessionId: sessionId,
        coach: this.auth.currentUser ? this.auth.currentUser.uid : 'unknown',
        teacher: teacherId,
        tool: magic8,
        dateCreated: firebase.firestore.Timestamp.now(),
        dateModified: firebase.firestore.Timestamp.now(),
        feedback: feedback ? feedback : [''],
        questions: questions ? questions : [''],
        addedQuestions: addedQuestions ? addedQuestions : [],
        notes: notes ? notes : [''],
      }
    )
    const conferencePlansRef = firebase
      .firestore()
      .collection('conferencePlans')
      .doc()
    conferencePlansRef
      .set(data)
      .then(() => {
        console.log('conference plan created')
      })
      .catch(() => {
        console.log('error creating conference plan')
      })
  }

  /**
   * gets data in conference plan
   * @param {string} sessionId
   */
  getConferencePlan = async (
    sessionId: string
  ): Promise<Array<{
    id: string
    feedback: Array<string>
    questions: Array<string>
    addedQuestions: Array<string>
    notes: Array<string>
    date: { seconds: number; nanoseconds: number }
  }> | void> => {
    this.query = this.db
      .collection('conferencePlans')
      .where('sessionId', '==', sessionId)
    return this.query
      .get()
      .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
        const idArr: Array<{
          id: string
          feedback: Array<string>
          questions: Array<string>
          addedQuestions: Array<string>
          notes: Array<string>
          date: { seconds: number; nanoseconds: number }
        }> = []
        querySnapshot.forEach(doc =>
          idArr.push({
            id: doc.id,
            feedback: doc.data().feedback,
            questions: doc.data().questions,
            addedQuestions: doc.data().addedQuestions,
            notes: doc.data().notes,
            date: doc.data().dateCreated,
          })
        )
        return idArr
      })
      .catch(() => {
        console.log('unable to retrieve conference plan')
      })
  }

  /**
   * finds all conference plans for coach and all their teachers
   */
  getCoachConferencePlans = async (): Promise<Array<{
    id: string
    teacherId: string
    date: { seconds: number; nanoseconds: number }
    sessionId: string
    practice: string
    teacherFirstName: string
    teacherLastName: string
  }> | void> => {
    if (this.auth.currentUser) {
      this.query = this.db
        .collection('conferencePlans')
        .where('coach', '==', this.auth.currentUser.uid)
      return this.query
        .get()
        .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
          const idArr: Array<{
            id: string
            teacherId: string
            date: { seconds: number; nanoseconds: number }
            sessionId: string
            practice: string
            teacherFirstName: string
            teacherLastName: string
          }> = []
          querySnapshot.forEach(doc =>
            idArr.push({
              id: doc.id,
              teacherId: doc.data().teacher,
              teacherFirstName: '',
              teacherLastName: '',
              sessionId: doc.data().sessionId,
              practice: doc.data().tool,
              date: doc.data().dateModified,
            })
          )
          return idArr
        })
        .catch(() => {
          console.log('unable to retrieve conference plan info')
        })
    }
  }

  /**
   * gets observation date for conference plan
   * @param {string} sessionId
   */
  getObservationDate = async (
    sessionId: string
  ): Promise<{ seconds: number; nanoseconds: number } | void> => {
    return this.db
      .collection('observations')
      .doc(sessionId)
      .get()
      .then((doc: firebase.firestore.DocumentData) => doc.data().start)
      .catch((error: Error) =>
        console.error('Error getting cached document:', error)
      )
  }

  /**
   * @param {string} conferencePlanId
   * @param {Array<string>} feedback
   * @param {Array<string>} questions
   * @param {Array<string>} addedQuestions
   * @param {Array<string>} notes
   */
  saveConferencePlan = async (
    conferencePlanId: string,
    feedback: Array<string>,
    questions: Array<string>,
    addedQuestions: Array<string>,
    notes: Array<string>
  ): Promise<void> => {
    const conferencePlanRef = this.db
      .collection('conferencePlans')
      .doc(conferencePlanId)
    return conferencePlanRef
      .update({
        feedback: feedback,
        questions: questions,
        addedQuestions: addedQuestions,
        notes: notes,
        dateModified: firebase.firestore.Timestamp.now(),
      })
      .then(() => {
        console.log('Action plan updated successfully!')
      })
      .catch((error: Error) => {
        console.error('Error updating action plan: ', error)
      })
  }

  /**
   * adds note from observation to conference plan
   * @param {string} conferencePlanId
   * @param {string} note
   */
  addNoteToConferencePlan = async (
    conferencePlanId: string,
    note: string
  ): Promise<void> => {
    return this.db
      .collection('conferencePlans')
      .doc(conferencePlanId)
      .update({
        // does not add if it has already been added
        notes: firebase.firestore.FieldValue.arrayUnion(note),
      })
      .catch((error: Error) =>
        console.error('Error adding note to conference plan: ', error)
      )
  }

  /**
   * adds coaching question to conference plan
   * @param {string} sessionId
   * @param {string} questionText
   */
  saveConferencePlanQuestion = async (
    sessionId: string,
    questionText: string
  ): Promise<void> => {
    const conferencePlanRef = this.db
      .collection('conferencePlans')
      .where('sessionId', '==', sessionId)
    conferencePlanRef
      .get()
      .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
        const conferencePlanId: Array<string> = []
        querySnapshot.forEach(doc => conferencePlanId.push(doc.id))
        return this.db
          .collection('conferencePlans')
          .doc(conferencePlanId[0])
          .update({
            addedQuestions: firebase.firestore.FieldValue.arrayUnion(
              questionText
            ),
            dateModified: firebase.firestore.Timestamp.now(),
          })
      })
  }

  /**
   * saves email in firestore
   * @param {string} email
   * @param {string} subject
   * @param {object} recipient
   * @param {string} emailId
   */
  saveEmail = async (
    email?: string,
    subject?: string,
    recipient?: {
      id: string
      firstName: string
      name: string
      email: string
    },
    emailId?: string
  ): Promise<MessagingTypes.Email | void> => {
    if (this.auth.currentUser) {
      if (emailId) {
        const data: MessagingTypes.Email = {
          id: emailId,
          emailContent: email ? email : '',
          subject: subject ? subject : '',
          recipientId: recipient ? recipient.id : '',
          recipientFirstName: recipient ? recipient.firstName : '',
          recipientName: recipient ? recipient.name : '',
          recipientEmail: recipient ? recipient.email : '',
          dateModified: firebase.firestore.Timestamp.now(),
          user: this.auth.currentUser.uid,
          type: 'draft',
        }
        return this.db
          .collection('emails')
          .doc(emailId)
          .update(data)
          .then(() => {
            return data
          })
          .catch((error: Error) =>
            console.error("Couldn't update email", error)
          )
      } else {
        const emailRef: firebase.firestore.DocumentReference = this.db
          .collection('emails')
          .doc()
        const data: MessagingTypes.Email = {
          emailContent: email ? email : '',
          subject: subject ? subject : '',
          recipientId: recipient ? recipient.id : '',
          recipientFirstName: recipient.firstName ? recipient.firstName : '',
          recipientName: recipient ? recipient.name : '',
          recipientEmail: recipient ? recipient.email : '',
          dateCreated: firebase.firestore.Timestamp.now(),
          dateModified: firebase.firestore.Timestamp.now(),
          type: 'draft',
          user: this.auth.currentUser.uid,
          id: emailRef.id,
        }
        emailRef.set(data)
        return data
      }
    }
  }

  /**
   * saves email attachment
   * @param {string} emailId
   * @param {object} attachment
   */
  saveAttachment = async (
    emailId: string,
    attachment: {
      content: string
      filename: string
      type: string
      disposition: string
      id: string
      teacherId: string
      actionPlan: boolean
      result: boolean
      summary?: boolean
      details?: boolean
      trends?: boolean
      practice?: string
      date?: Date
    }
  ): Promise<void> => {
    const attachmentRef = this.db
      .collection('emails')
      .doc(emailId)
      .collection('attachments')
      .doc(attachment.id)
    return attachmentRef
      .set({
        content: attachment.content,
        filename: attachment.filename,
        type: attachment.type,
        disposition: attachment.disposition,
        id: attachment.id,
        teacherId: attachment.teacherId,
        actionPlan: attachment.actionPlan,
        result: attachment.result,
        summary: attachment.summary ? attachment.summary : false,
        details: attachment.details ? attachment.details : false,
        trends: attachment.trends ? attachment.trends : false,
        practice: attachment.practice ? attachment.practice : '',
        date: attachment.date ? attachment.date : {},
      })
      .then(() => {
        console.log('Attachment saved successfully!')
      })
      .catch((error: Error) => {
        console.error('Error saving attachment: ', error)
      })
  }

  /**
   * deletes draft email from database
   * @param {string} emailId
   */
  deleteEmail = async (
    emailId?: string
  ): Promise<MessagingTypes.Email | void> => {
    if (this.auth.currentUser) {
      return this.db
        .collection('emails')
        .doc(emailId)
        .delete()
        .then(() => console.log('Draft deleted.'))
        .catch((error: Error) =>
          console.error('An error occurred when deleting the draft', error)
        )
    }
  }

  /**
   * deletes email attachment from database
   * @param {string} emailId
   * @param {string} attachmentId
   */
  deleteAttachment = async (
    emailId: string,
    attachmentId: string
  ): Promise<MessagingTypes.Email | void> => {
    if (this.auth.currentUser) {
      if (
        this.db.collection('emails').doc(emailId) &&
        this.db
          .collection('emails')
          .doc(emailId)
          .collection('attachments')
          .doc(attachmentId)
      ) {
        return this.db
          .collection('emails')
          .doc(emailId)
          .collection('attachments')
          .doc(attachmentId)
          .delete()
          .then(() => console.log('Attachment deleted.'))
          .catch((error: Error) =>
            console.error('An error occurred when deleting the draft', error)
          )
      } else {
        return
      }
    }
  }

  /**
   * deletes draft email from database
   * @param {string} emailId
   */
  changeDraftToSent = async (emailId: string): Promise<void> => {
    const emailRef = this.db.collection('emails').doc(emailId)
    return emailRef
      .update({
        type: 'sent',
      })
      .then(function () {
        console.log('Document successfully updated!')
      })
      .catch(function (error) {
        console.error('Error updating document: ', error)
      })
  }

  getEmail = async (): Promise<string> => {
    return this.db
      .collection('emails')
      .doc('AJHQApd9yei87yfsZgsG')
      .get()
      .then((doc: firebase.firestore.DocumentData) => doc.data().emailContent)
      .catch((error: Error) =>
        console.error('Error getting cached document:', error)
      )
  }

  getEmail2 = async (): Promise<{
    emailContent: string
    id: string
  } | void> => {
    return this.db
      .collection('emails')
      .doc('AJHQApd9yei87yfsZgsG')
      .get()
      .then((doc: firebase.firestore.DocumentData) => {
        const email = {
          id: doc.id,
          emailContent: doc.data().emailContent,
        }
        return email
      })
      .catch((error: Error) =>
        console.error('Error getting cached document:', error)
      )
  }

  /**
   * finds all emails (draft and sent) for particular user
   */
  getAllEmails = async (): Promise<Array<MessagingTypes.Email> | void> => {
    if (this.auth.currentUser) {
      this.query = this.db
        .collection('emails')
        .where('user', '==', this.auth.currentUser.uid)
      return this.query
        .get()
        .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
          const emailArray: Array<MessagingTypes.Email> = []
          querySnapshot.forEach(doc =>
            emailArray.push({
              id: doc.data().id,
              emailContent: doc.data().emailContent,
              subject: doc.data().subject,
              recipientId: doc.data().recipientId,
              recipientFirstName: doc.data().recipientFirstName
                ? doc.data().recipientFirstName
                : doc.data().recipientName,
              recipientName: doc.data().recipientName,
              recipientEmail: doc.data().recipientEmail,
              type: doc.data().type,
              user: doc.data().user,
              dateCreated: doc.data().dateCreated,
              dateModified: doc.data().dateModified,
            })
          )
          return emailArray
        })
        .catch(() => {
          console.log('unable to find drafts')
        })
    }
  }

  /**
   * gets email's attachments
   * @param {string} emailId
   */
  getAttachments = async (
    emailId: string
  ): Promise<Array<MessagingTypes.Attachment> | void> => {
    this.query = this.db
      .collection('emails')
      .doc(emailId)
      .collection('attachments')
    return this.query
      .get()
      .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
        const attachmentArray: Array<MessagingTypes.Attachment> = []
        querySnapshot.forEach(doc =>
          attachmentArray.push({
            content: doc.data().content,
            filename: doc.data().filename,
            type: doc.data().type,
            disposition: doc.data().disposition,
            id: doc.data().id,
            teacherId: doc.data().teacherId,
            actionPlan: doc.data().actionPlan,
            result: doc.data().result,
            summary: doc.data().summary,
            details: doc.data().details,
            trends: doc.data().trends,
            practice: doc.data().practice,
            date: doc.data().date,
          })
        )
        return attachmentArray
      })
      .catch(() => {
        console.log('error retrieving action steps')
      })
  }

  /**
   * finds all action plan events for my teachers calendar
   */
  getActionPlanEvents = async (): Promise<Array<Types.CalendarEvent> | void> => {
    if (this.auth.currentUser) {
      this.query = this.db
        .collection('actionPlans')
        .where('coach', '==', this.auth.currentUser.uid)
      return this.query
        .get()
        .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
          const actionPlanEventsArray: Array<Types.CalendarEvent> = []
          querySnapshot.forEach(doc => {
            // if (doc.data().teacher !== 'rJxNhJmzjRZP7xg29Ko6') {
            actionPlanEventsArray.push({
              title: 'Action Plan',
              start: doc.data().dateModified.toDate(),
              end: doc.data().dateModified.toDate(),
              allDay: false,
              resource: doc.data().teacher,
              type:
                doc.data().tool === 'Transition Time'
                  ? 'TT'
                  : doc.data().tool === 'Classroom Climate'
                    ? 'CC'
                    : doc.data().tool === 'Math Instruction'
                      ? 'MI'
                      : doc.data().tool === 'Level of Instruction'
                        ? 'IN'
                        : doc.data().tool === 'Student Engagement'
                          ? 'SE'
                          : doc.data().tool === 'Listening to Children'
                            ? 'LC'
                            : doc.data().tool === 'Sequential Activities'
                              ? 'SA'
                              : doc.data().tool === 'Literacy Instruction'
                                ? 'LI'
                                : 'AC',
              id: doc.id,
            })
            // }
          })
          return actionPlanEventsArray
        })
        .catch(() => {
          console.log('unable to find action plans')
        })
    }
  }

  /**
   * finds all conference plan events for my teachers calendar
   */
  getConferencePlanEvents = async (): Promise<Array<Types.CalendarEvent> | void> => {
    if (this.auth.currentUser) {
      this.query = this.db
        .collection('conferencePlans')
        .where('coach', '==', this.auth.currentUser.uid)
      return this.query
        .get()
        .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
          const conferencePlanEventsArray: Array<Types.CalendarEvent> = []
          querySnapshot.forEach(doc => {
            // if (doc.data().teacher !== 'rJxNhJmzjRZP7xg29Ko6') {
            conferencePlanEventsArray.push({
              title: 'Conference Plan',
              start: doc.data().dateModified.toDate(),
              end: doc.data().dateModified.toDate(),
              allDay: false,
              resource: doc.data().teacher,
              type:
                doc.data().tool === 'Transition Time'
                  ? 'TT'
                  : doc.data().tool === 'Classroom Climate'
                    ? 'CC'
                    : doc.data().tool === 'Math Instruction'
                      ? 'MI'
                      : doc.data().tool === 'Level of Instruction'
                        ? 'IN'
                        : doc.data().tool === 'Student Engagement'
                          ? 'SE'
                          : doc.data().tool === 'Listening to Children'
                            ? 'LC'
                            : doc.data().tool === 'Sequential Activities'
                              ? 'SA'
                              : doc.data().tool === 'Literacy Instruction'
                                ? 'LI'
                                : 'AC',
              id: doc.id,
              conferencePlanSessionId: doc.data().sessionId,
            })
            // }
          })
          return conferencePlanEventsArray
        })
        .catch(() => {
          console.log('unable to find conference plans')
        })
    }
  }

  /**
   * finds all action plan events for my teachers calendar
   */
  getAppointments = async (): Promise<Array<Types.CalendarEvent> | void> => {
    if (this.auth.currentUser) {
      this.query = this.db
        .collection('appointments')
        .where('coach', '==', this.auth.currentUser.uid)
      return this.query
        .get()
        .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
          const appointmentsArray: Array<Types.CalendarEvent> = []
          querySnapshot.forEach(doc => {
            if (!doc.data().completed && !doc.data().removed) {
              appointmentsArray.push({
                title: doc.data().type,
                start: doc.data().date.toDate(),
                end: doc.data().date.toDate(),
                allDay: false,
                resource: doc.data().teacherID,
                type: doc.data().tool,
                id: doc.id,
                appointment: true,
              })
            }
          })
          return appointmentsArray
        })
        .catch(() => {
          console.log('unable to find appointments')
        })
    }
  }

  /**
   * creates appointment in cloud firestore
   * @param {string} teacherId
   * @param {Date} date
   * @param {string} tool
   * @param {string} type
   */
  createAppointment = async (
    teacherId: string,
    date: Date,
    tool: string,
    type: string
  ): Promise<string | void> => {
    const data = Object.assign(
      {},
      {
        coach: this.auth.currentUser ? this.auth.currentUser.uid : 'unknown',
        teacherID: teacherId,
        tool: tool,
        type: type,
        date: date,
        completed: false,
        removed: false,
      }
    )
    const appointmentRef = firebase
      .firestore()
      .collection('appointments')
      .doc()
    return appointmentRef
      .set(data)
      .then(() => {
        return appointmentRef.id
      })
      .catch(() => {
        console.log('error creating conference plan')
      })
  }

  /**
   * saves appointment in cloud firestore
   * @param {string} id
   * @param {string} teacherId
   * @param {Date} date
   * @param {string} tool
   * @param {string} type
   */
  saveAppointment = async (
    id: string,
    teacherId: string,
    date: Date,
    tool: string,
    type: string
  ): Promise<string | void> => {
    if (this.auth.currentUser) {
      return this.db
        .collection('appointments')
        .doc(id)
        .update({
          teacherID: teacherId,
          tool: tool,
          type: type,
          date: date,
        })
        .catch((error: Error) =>
          console.error('Error occurred saving appointment: ', error)
        )
    }
  }

  /**
   * marks appointment in cloud firestore as 'removed'
   * keep record but don't show on user's calendar
   * @param {string} id
   */
  removeAppointment = async (id: string): Promise<string | void> => {
    if (this.auth.currentUser) {
      return this.db
        .collection('appointments')
        .doc(id)
        .update({
          removed: true,
        })
        .catch((error: Error) =>
          console.error('Error occurred removing appointment: ', error)
        )
    }
  }


  fetchSiteCoaches = async (siteId: string) => {
    this.query = this.db.collection('users').where('role', '==', 'coach').where('sites', 'array-contains', siteId);
    const collection = await this.query.get();

    return Promise.all(collection.docs.map(async doc => {
      return {
        name: doc.data().lastName + ', ' + doc.data().firstName,
        id: doc.id
      };
    }));
  }

  fetchSitesForCoach = async (coachId: string) => {
    let result = []
    if(coachId) {
      const document = await this.db.collection('users').doc(coachId).get();
      const sites = document.data().sites;

      this.query = this.db.collection('sites');
      const collection = await this.query.get()

      Promise.all(collection.docs.map(async doc => {
        if (sites.includes(doc.id)) {
          result.push({
            name: doc.data().name,
            id: doc.id
          })
        }
      }))
    }
    return result;
  }

  getTeacherBySiteName = async (siteName: string) => {
    this.query = this.db.collection('users').where('school', '==', siteName);
    const collection = await this.query.get();

    return Promise.all(collection.docs.map(async doc => {
      return{
      firstName: doc.data().firstName,
      lastName: doc.data().lastName,
      id: doc.id
      }
    }))
  }

  getAllCoachesPartners = async () => {
    let result = []
    this.query = this.db.collection('users').where('role', '==', 'coach');
    const collection = await this.query.get();

    await Promise.all(collection.docs.map(async coach => {
      let docSnapshot = await this.db.collection('users').doc(coach.id).get()
      if(docSnapshot.exists)
      {
        const subCollection = await this.db.collection('users').doc(coach.id).collection('partners').get();
        let draft = {
          id: coach.id,
          firstName: coach.data().firstName,
          lastName: coach.data().lastName,
          archived: coach.data().archived ? coach.data().archived : false,
          sites: coach.data().sites,
          teachers: [],
          email: coach.data().email
        }
        await Promise.all(subCollection.docs.map(async teachers => {
          if (teachers.id === "rJxNhJmzjRZP7xg29Ko6") {} else {
          draft['teachers'].push(teachers.id)
          }
        }))
        result.push(draft)
      }
    }))
    return result
  }

  getAllTeachers = async () => {
    let result = []
    this.query = this.db.collection('users').where('role', '==', 'teacher');
    const allTeachers = await this.query.get()

    await Promise.all(allTeachers.docs.map(async teacher => {
      let docSnapshot = await this.db.collection('users').doc(teacher.id).get();
      console.log("docSnapshot Data: ", docSnapshot.data());

      if (teacher.id === "rJxNhJmzjRZP7xg29Ko6" && docSnapshot.exists) {} else {
        result.push({
          site: teacher.data().school,
          id: teacher.id,
          firstName: teacher.data().firstName,
          lastName: teacher.data().lastName,
          archived: teacher.data().archived ? teacher.data().archived : false,
          email: teacher.data().email
        })
      }
    }))

    return result
  }

  getTeacherData = async () => {
    let arr = []
    let seen = []

    this.query = this.db.collection('users').where('role', '==', 'coach');
    const collection = await this.query.get();

    this.query = this.db.collection('users').where('role', '==', 'teacher');
    const allTeachers = await this.query.get()



    await Promise.all(collection.docs.map(async (coach) => {
      this.query = this.db.collection('users').doc(coach.id).collection('partners');
      const subCollection = await this.query.get();
      await Promise.all(subCollection.docs.map(async (teacher) => {
        let docSnapshot = await this.db.collection('users').doc(teacher.id).get()
        if (docSnapshot.exists) {
        const teacherResult = await this.db.collection('users').doc(teacher.id).get();
        if (teacher.id !== "rJxNhJmzjRZP7xg29Ko6" && teacherResult.data()) {
          seen.push(teacher.id)
          arr.push({
            coachId: coach.id,
            coachFirstName: coach.data().firstName,
            coachLastName: coach.data().lastName,
            siteName: teacherResult.data().school ? teacherResult.data().school : "",
            teacherId: teacher.id,
            teacherFirstName: await teacherResult.data().firstName,
            teacherLastName: await teacherResult.data().lastName,
            archived: await teacherResult.data().archived ? await teacherResult.data().archived : false
          })
        }
      }}))
    }))

    Promise.all(allTeachers.docs.map(async teacher => {
      if (seen.includes(teacher.id) || teacher.id === "rJxNhJmzjRZP7xg29Ko6") {} else {
        arr.push({
          coachId: "",
          coachFirstName: "",
          coachLastName: "",
          siteName: teacher.data().school,
          teacherId: teacher.id,
          teacherFirstName: teacher.data().firstName,
          teacherLastName: teacher.data().lastName,
          archived: teacher.data().archived ? teacher.data().archived : false
        })
      }
    }))
    return arr
  }

  editUserName = async (id: string, changeFirst: string, changeLast: string, changeEmail: string, role: string, archives?: boolean) => {
    if (role === "teacher" || (role === "coach" && archives === false)) {
      this.db.collection("users").doc(id).update({firstName: changeFirst, lastName: changeLast, email: changeEmail})
      .catch((error: Error) => {
        console.error(
          "Error occurred when editing user: ",
          error
        )
      })
    }
    if (role === "coach" && archives === true) {
      this.db.collection("users").doc("archived" + id).update({firstName: changeFirst, lastName: changeLast, email: changeEmail})
      .catch((error: Error) => {
        console.error(
          "Error occurred when editing user: ",
          error
        )
      })
    }

    if (archives) {
      this.db.collection("archives").doc(id).update({firstName: changeFirst, lastName: changeLast, email: changeEmail})
      .catch((error: Error) => {
        console.error(
          "Error occurred when editing user archive: ",
          error
        )
      })
    }
  }

  transferTeacher = async (teacherId: string, originalCoach: string, newCoach: string, siteName: string, programId: string ) => {
    if(originalCoach !== "") {
      this.db.collection("users").doc(originalCoach).collection("partners").doc(teacherId).delete()
      .catch((error: Error) => {
        console.error("Error occurred when deleting teacher from coach's partner list: ", error)
      })
    }
    this.db.collection("users").doc(teacherId).update({school: siteName, programId: programId})
    .catch((error: Error) => {
      console.error("Error occurred when updating teacher school: ", error)
    })
    return this.db.collection("users").doc(newCoach).collection("partners").doc(teacherId).set({})
    .then(() => teacherId)
    .catch((error: Error) => {
      console.error("Error occurred when adding teacher to coach's partner list: ", error)
    })

  }


  /*
   * We need to log whenever a teacher, coach, or site is transferred sowe can keep track of what data to include in the reports
   *
   * These logs will be kept in a subcollection of the program, site, or coach document that they are transferring in or out of
   */
  addToTransferLog = async (
    data: {
      docType: string, // What type of doc are we adding logs to? program, site, or coach
      docId: string, // The id of the doc to update
      inOrOut: string, // in or out
      transferId: string, // The id of the teacher, coach, or site that is being transferred
    }
  ) => {

    console.log("DATA => ", data);


    // Get the collection that holds the document we need to update
    var collectionToUpdate;
    var transferType;
    switch (data.docType) {
      case "program":
        collectionToUpdate = "programs";
        transferType = "site";
        break;
      case "site":
        collectionToUpdate = "sites";
        transferType = "coach";
        break;
      case "coach":
        collectionToUpdate = "users";
        transferType = "teacher";
        break;
      default:
        break;
    }

    var docId = data.docId;
    var inOrOut = data.inOrOut;
    var transferId = data.transferId;

    var timeStamp = new Date();

    this.db.collection(collectionToUpdate).doc(docId).collection("transferLogs").doc().set(
      {
        type: transferType,
        id: transferId,
        inOrOut: inOrOut,
        time: timeStamp,
      }
    )
    .then(data => {console.log("Transfer data : ", data);})
    .catch((error: Error) => {
      console.error("Error occurred when updating " + docType + "'s transfer logs.", error)
    })
  }

  archiveCoach = async (coachId: string, firstName: string, lastName: string, programName: string, programId: string, email: string, userSites, archiveSites) => {
    const collection = await this.db.collection('users').doc(coachId).collection('partners').get()
    let partners: Array<string> = []

    collection.docs.map(item => {
      partners.push(item.id)
    })

    let userData: Record<string, any> = {
      email:  email,
      firstName: firstName,
      lastName: lastName,
      role: "coach",
      id:  coachId,
      sites: userSites,
      archived: true
    };

    const docRef = firebase.firestore().collection("users").doc("archived" + coachId);
    await docRef.set(userData).then(() => {
      for (let partnerIndex = 0; partnerIndex < partners.length; partnerIndex++) {
        docRef.collection("partners").doc(partners[partnerIndex]).set({});
      }
    }).catch((error: Error) => {
      console.error(
        "Error occurred when creating archived coach doc: ",
        error
      )
    })

    //Create archive
    await this.db.collection('archives').doc(coachId).set({
      firstName: firstName,
      lastName: lastName,
      role: "coach",
      sites: archiveSites,
      programName: programName,
      programId: programId,
      id: coachId,
      email: email
    }).catch((error: Error) => {
      console.error(
        "Error occurred when creating coach in archives: ",
        error
      )
    })

    //Delete original document
    for (let i = 0; i < partners.length; i++) {
      await this.db.collection('users').doc(coachId).collection('partners').doc(partners[i]).delete()
    }
    await this.db.collection('users').doc(coachId).delete().catch((error: Error) => {
      console.error(
        "Error occurred when deleting original coach doc: ",
        error
      )
    })

  }

  unarchiveCoach = async (coachId: string) => {
    this.db.collection("archives").doc(coachId).delete()
    .catch((error: Error) => {
      console.error("Error occurred when deleting coach from archives: ", error)
    })
    const document = await this.db.collection('users').doc("archived" + coachId).get()
    const {email, firstName, lastName, id, sites} = document.data()
    let userData: Record<string, any> = {
      email:  email,
      firstName: firstName,
      lastName: lastName,
      role: "coach",
      id:  id,
      sites: sites,
      archived: false
    };
    const collection = await this.db.collection('users').doc("archived" + coachId).collection('partners').get()
    let partners: Array<string> = []

    collection.docs.map(item => {
      partners.push(item.id)
    })

    let docRef = firebase.firestore().collection("users").doc(userData.id);
    await docRef.set(userData).then(() => {
      // for (let partnerIndex = 0; partnerIndex < partners.length; partnerIndex++) {
      //   docRef.collection("partners").doc(partners[partnerIndex]).set({});
      // }
    }).catch((error: Error) => {
      console.error(
        "Error occurred when creating archived coach doc: ",
        error
      )
    })
    for (let i = 0; i < partners.length; i++) {
      await this.db.collection('users').doc("archived" + coachId).collection('partners').doc(partners[i]).delete()
    }
    await this.db.collection("users").doc("archived" + coachId).delete()
    .catch((error: Error) => {
      console.error("Error occurred when deleting coach: ", error)
    })

  }

  archiveTeacher = async (teacherId: string, coachId: string, firstName: string, lastName: string, siteName: string, programName: string, siteId: string, programId: string) => {
    if (coachId !== "") {
      this.db.collection("users").doc(coachId).collection("partners").doc(teacherId).delete()
      .catch((error: Error) => {
        console.error("Error occurred when deleting teacher from coach's partner list: ", error)
      })
    }
    this.db.collection("users").doc(teacherId).update({archived: true})
    .catch((error: Error) => {
      console.error(
        "Error occurred when setting archive on teacher: ",
        error
      )
    })
    return this.db.collection("archives").doc(teacherId).set({
      firstName: firstName,
      lastName: lastName,
      role: "teacher",
      site: siteName,
      siteId: siteId,
      program: programName,
      programId: programId,
      coach: coachId,
      id: teacherId
    })
    .catch((error: Error) => {
      console.error("Error occurred when adding teacher to coach's partner list: ", error)
    })

  }

  unarchiveTeacher = async (teacherId: string, coachId: string) => {
    this.db.collection("archives").doc(teacherId).delete()
    .catch((error: Error) => {
      console.error("Error occurred when deleting teacher from coach's partner list: ", error)
    })
    this.db.collection("users").doc(teacherId).update({archived: false})
    .catch((error: Error) => {
      console.error(
        "Error occurred when setting archive on teacher: ",
        error
      )
    })
    if(coachId !== "") {
      return this.db.collection("users").doc(coachId).collection("partners").doc(teacherId).set({})
      .then(() => teacherId)
      .catch((error: Error) => {
        console.error("Error occurred when adding teacher to coach's partner list: ", error)
      })
    }
  }

  getArchives = async () => {
    let archives = await this.db.collection('archives').get();

    if(archives.docs.length > 0) {
    return Promise.all(archives.docs.map(async doc => {
      let docSnapshot = await this.db.collection('archives').doc(doc.id).get()
      if (docSnapshot.exists)
        return doc.data()
    }));
    }
    else return [{
      coach: "",
      firstName: "",
      id: "",
      lastName: "",
      program: "",
      ProgramId: "",
      role: "",
      site: "",
      siteId: "",
    }];
  }

  /*
   * Get a all sites
   */
  getSites = async () => {
    if (this.auth.currentUser) {
      const collection = await this.db.collection('sites').get()
      return Promise.all(collection.docs.map(async (doc) => {
        let docSnapshot = await this.db.collection('sites').doc(doc.id).get()
        if (docSnapshot.exists) {
          return {
            name: doc.data().name,
            id: doc.data().id,
            siteLeaderId: doc.data().siteLeaderId,
            coaches: doc.data().coaches
          }
        }
      }))
    }

    // if(this.auth.currentUser) {
    //   return this.db
    //     .collection('sites')
    //     .get()
    //     .then((querySnapshot) => {
    //       let sitesArray: Array<Types.Site> = []
    //       querySnapshot.forEach((doc) => {

    //           sitesArray.push({
    //             name: doc.data().name,
    //             id: doc.data().id,
    //             siteLeaderId: doc.data().siteLeaderId,
    //             coaches: doc.data().coaches
    //           })

    //       });

    //       // Filter out cached items
    //       return this.filterUserSiteProgramArray({dataList: sitesArray, dataType: "sites"}).then( (sites) => {
    //         sitesArray = sites;

    //         return sitesArray;
    //       });
    //     })
    //     .catch((error: Error) =>
    //       console.error('Error retrieving list of site', error)
    //     )
    // }
  }

  /*
   * Get all programs
   */
  getPrograms = async () => {
    if (this.auth.currentUser) {
      const collection = await this.db.collection('programs').get()
      return Promise.all(collection.docs.map(async (doc) => {
        let docSnapshot = await this.db.collection('programs').doc(doc.id).get()
        if (docSnapshot.exists) {
          return {
            name: doc.data().name,
            id: doc.data().id,
            sites: doc.data().sites,
          }
        }
      }))
    }

    // if(this.auth.currentUser) {
    //   return this.db
    //     .collection('programs')
    //     .get()
    //     .then((querySnapshot) => {
    //       let programsArray: Array<Types.Site> = []
    //       querySnapshot.forEach((doc) => {

    //           programsArray.push({
    //             name: doc.data().name,
    //             id: doc.data().id,
    //             sites: doc.data().sites,
    //           })

    //       });

    //       // Filter out cached items
    //       return this.filterUserSiteProgramArray({dataList: programsArray, dataType: "programs"}).then( (programs) => {
    //         programsArray = programs;

    //         return programsArray;
    //       });

    //     })
    //     .catch((error: Error) =>
    //       console.error('Error retrieving list of programs', error)
    //     )
    // }
  }

  /*
   * Get one program
   */
  getProgram = async (
    data: {
      programId: string
    }
  ): Promise<void> => {

    if(this.auth.currentUser) {
      var programDoc = this.db.collection('programs').doc(data.programId);

      return programDoc.get().then((doc) => {
        if (doc.exists)
        {
          return doc.data();
        }
      }).catch((e) => {
        console.error("Can't find document!")
      });
    }
  }

  /*
   * Get all programs for a specific user
   *
   * If user is set to "user" then return programs of current user.
   */
  getProgramsForUser = async (
    data: {
      userId: string
    }
  ): Promise<void> => {

    if(this.auth.currentUser) {
      var userId = data.userId;

      // If user id is set to "user" we want to use the current user
      if(userId == "user")
      {
        userId = this.auth.currentUser.uid;
      }

      // Grab the user's document
      var userDoc = this.db.collection('users').doc(userId);

      // Grab the data from the user's document
      return userDoc.get().then( async (doc) => {

        // Initialize the list of program's to return
        var programRes = [];

        // Make sure the document exists
        if (doc.exists)
        {
          var docData = doc.data();

          // Make sure this user has an array of program ids
          if(docData.programs)
          {
            var programIds = docData.programs;

            // Go through each program ID in the list
            for(let programId of programIds)
            {
              // Get the program for this program ID
              var tempProgram = await this.getProgram({programId: programId});

              // There's a problem with the array being filled with deleted information,
              //  so we have to check to make sure the data is there
              //  The problem is most likely a local firestore issue but it couldn't hurt
              if (tempProgram.id && tempProgram.id !== "")
              {
                // Add the program data to the list to return
                programRes.push(tempProgram);
              }

            };
          }
        }

        return programRes;
      }).catch((e) => {
        console.error("There was a problem getting the user's document!", e);
      });

    }
  }

  /*
   * Get all users with role 'programLeader'
   */
  getProgramLeaders = async (): Promise<void> => {
    if(this.auth.currentUser) {

      return this.db
      .collection('users')
      .where('role', '==', 'programLeader')
      .get({ source: 'server' })
      .then(async (querySnapshot) => {
        let docSnapshot = await this.db.collection('users').doc(querySnapshot.data().id).get()
        if(docSnapshot.exists)
        {
          const leadersArray = []
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
            console.log(doc);


              leadersArray.push({
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                id: doc.data().id,
                role: doc.data().role,
                programs: doc.data().programs,
                sites: doc.data().sites
              })

          });
        }

        return leadersArray;
      });
    }
  }


  /*
   * Gets all users that are leaders of a particular program
   */
   getLeadersFromProgram = async (
     data: {
       programId: string
     }
   ): Promise<void> => {
     if(this.auth.currentUser) {

       const programId = data.programId;

       // Get the program's document
       var programDoc = this.db.collection('programs').doc(programId);

       // Fetch data from the program's document
       return programDoc.get().then( async (doc) => {
         if (doc.exists)
         {
           const docData = doc.data();

           // Get the leaders that are saved in the document
           const leaderIds = docData.leaders;
           let leadersResults = [];

           // Go through each leader in the list
           for(var leader in leaderIds)
           {
             let leaderId = leaderIds[leader];

             // Get the user's information from their id
             let tempLeader;
             tempLeader = await this.getUserProgramOrSite({userId: leaderId}).then((user) => {
               return user;
             });

             // Put that info in the results list
             leadersResults.push(tempLeader);
           }

           return leadersResults;

         }
         else
         {
           console.error("Program with ID " + programId + " does not exist");
         }
       }).catch((e) => {
         console.error("There was an error retrieving the program.", e);
       });

     }
   }

  /*
   * Gets a user from their ID
   */
   getUserProgramOrSite = async (
     data: {
       userId: string,
       programId: string,
       siteId: string
     }
   ): Promise<void> => {
     if(this.auth.currentUser) {

       var programDoc, docType, docId;

       // If we're getting a user
       if(data.userId)
       {
         docType = "User";
         docId = data.userId;
         programDoc = this.db.collection('users').doc(data.userId);
       }
       // If we're getting a program
       if(data.programId)
       {
         docType = "Program";
         docId = data.programId;
         programDoc = this.db.collection('programs').doc(data.programId);
       }
       // If we're getting a program
       if(data.siteId)
       {
         docType = "Site";
         docId = data.siteId;
         programDoc = this.db.collection('sites').doc(data.siteId);
       }


       return programDoc.get().then((doc) => {
         if (doc.exists)
         {
           const docData = doc.data();
           return docData;
         }
         else
         {
           console.error(docType + " document with ID " + docId + " does not exist");
         }
       }).catch((e) => {
         console.error("There was an error retrieving the user.", e);
       });

     }
   }



   /*
    * Gets multiple users, programs, or sites from an array that contains all IDs
    */
    getMultipleUserProgramOrSite = async (
      data: {
        userIds: string,
        programIds: string,
        siteIds: string
      }
    ): Promise<void> => {
      if(this.auth.currentUser) {

        var programDoc, docType, docIds;

        // If we're getting a user
        if(data.userIds)
        {
          docType = "User";
          docIds = data.userIds;
          programDoc = this.db.collection('users');
        }
        // If we're getting a program
        if(data.programIds)
        {
          docType = "Program";
          docIds = data.programIds;
          programDoc = this.db.collection('programs');
        }
        // If we're getting a program
        if(data.siteIds)
        {
          docType = "Site";
          docIds = data.siteIds;
          programDoc = this.db.collection('sites');
        }

        var results = [];


        // don't run if there aren't any ids or a path for the collection
        if (!docIds || !docIds.length) return [];

        //const collectionPath = db.collection(path);
        const batches = [];

        while (docIds.length) {
          // firestore limits batches to 10
          const batch = docIds.splice(0, 10);

          // add the batch request to to a queue
          batches.push(
            programDoc
              .where(
                firebase.firestore.FieldPath.documentId(),
                'in',
                [...batch]
              )
              .get()
              .then(results => results.docs.map(result => ({ /* id: result.id, */ ...result.data() }) ))
          )
        }

        // after all of the data is fetched, return it
        return Promise.all(batches)
          .then(content => content.flat());

        /*
        return programDoc.where("id", "in", docIds).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {

            if (doc.exists)
            {
              results.push(doc.data());
            }
            else
            {
              console.error(docType + " documents with ID " + docIds + " does not exist");
            }

          });

          return results;

        }).catch((e) => {
          console.error("There was an error retrieving the document.", e);
        });
        */


      }
    }



  /*
   * Get all users with role 'siteLeader'
   */
  getSiteLeaders = async (): Promise<void> => {
    if(this.auth.currentUser) {

      return this.db
      .collection('users')
      .where('role', '==', 'siteLeader')
      .get({ source: 'server' })
      .then((querySnapshot) => {
        const leadersArray: Array<Types.User> = []
        querySnapshot.forEach(async (doc) => {
          let docSnapshot = await this.db.collection('users').doc(doc.data().id).get()
          if(docSnapshot.exists)
          {
            console.log(doc.data());


            leadersArray.push({
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
              id: doc.data().id,
              role: doc.data().role,
              programs: doc.data().programs,
              sites: doc.data().sites
            })
          }
        });

        return leadersArray;
      });
    }
  }


  /*
   * Get all leaders (users with role 'programLeader' or 'siteLeader' or 'admin')
   */
   getAllLeaders = async (): Promise<void> => {
     if(this.auth.currentUser) {
       return this.db
       .collection('users')
       .where('role', '==', 'admin')
       .get({ source: 'server' })
       .then((querySnapshot) => {
         let leadersArray: Array<Types.User> = []
         querySnapshot.forEach((doc) => {
           console.log(doc.data());


             leadersArray.push({
               firstName: doc.data().firstName,
               lastName: doc.data().lastName,
               id: doc.data().id,
               role: doc.data().role,
               programs: doc.data().programs,
               sites: doc.data().sites
             })

         });
         // Filter out cached items
         return this.filterUserSiteProgramArray({dataList: leadersArray, dataType: "users"}).then( (leaders) => {
           leadersArray = leaders;

           // Add program leaders
           return this.getProgramLeaders().then((programLeaders) => {
             leadersArray = leadersArray.concat(programLeaders);

             // Add site leaders
             return this.getSiteLeaders().then((siteLeaders) => {
               leadersArray = leadersArray.concat(siteLeaders);

                 // Sort list by last name alphabetically
                 leadersArray = leadersArray.sort((a, b) => {
                    if (a.lastName < b.lastName) {
                        return -1;
                    }
                    if (a.lastName > b.lastName) {
                        return 1;
                    }
                    return 0;
                 });

                 return leadersArray;
               });


           });
         });



       });
     }
   }




  /*
   * Save New Program
   */
   createProgram = async (

     programData: {
       programName: string,
       selectedSites: Array<string>
     }
   ): Promise<void> => {
     // Create New document for program
     return this.db.collection('programs').add({
        name: programData.programName,
        sites: programData.selectedSites,
      })
        .then( (data) => {
          console.log("Successfully written document " + data.id);

          // Add the id to list of user's programs
          this.assignProgramToUser({ userId: "user", programId: data.id})

          // Add the id to the document
          var programDoc = this.db.collection('programs').doc(data.id);
          var addIdToDoc = programDoc.set({
            id: data.id,
            leaders: [this.auth.currentUser.uid]
          }, {merge: true})
          .then(() => {
              console.log("ID successfully written!");
          })
          .catch((error) => {
              console.error("Error writing document: ", error);
          });

          return data;
        });

   }

   /*
    * Assign a program to a user
    *
    * @param userId: set to "user" to assign the program to the current user
    */
   assignProgramToUser = async (
     data: {
       userId: string,
       programId: string
      }
   ): Promise<void> => {

     var userId = data.userId;
     var programId = data.programId;

     // If the userId is set to "user" we want to use the current user
     if(userId == "user")
     {
       userId = this.auth.currentUser.uid;
     }

     // Get the user's document
     var userDoc = this.db.collection('users').doc(userId);

     userDoc.get().then((doc) => {
       if (doc.exists)
       {
         var docData = doc.data();
         var programsArr = [];

         // Check if list of programs already exist
         if(docData.programs)
         {
           programsArr = docData.programs;
         }

         // Add program id if it's not already in there
         if(!programsArr.includes(programId))
         {
           programsArr.push(programId);
         }

         // Remove any duplicates
         programsArr = programsArr.filter((item,index)=>{
            return (programsArr.indexOf(item) == index)
         })

         // Push programs array to the document
         var addIdToDoc = userDoc.set({
           programs: programsArr
         }, {merge: true})
         .then(() => {
             console.log("Program successfully written to user!");
         })
         .catch((error) => {
             console.error("Error writing document: ", error);
         });
      }
      else {
        console.log("User's document doesn't exist!");
      }
     }).catch((error) => {
          console.log("Error getting user document:", error);
      });

   }


   /*
    * Assign a site to a user
    *
    * @param userId: set to "user" to assign the program to the current user
    * @param bulkSiteIds: an array of site ID's in case we want to add a bunch of sites together
    */
   assignSiteToUser = async (
     data: {
       userId: string,
       siteId: string,
       bulkSiteIds?: Array<string>
      }
   ): Promise<void> => {

     var userId = data.userId;

     // If we're just adding one site
     var siteId;
     if(data.siteId)
     {
       siteId = data.siteId;
     }

     // If we're adding multiple sites at once
     var bulkSiteIds = [];
     if(data.bulkSiteIds)
     {
       bulkSiteIds = data.bulkSiteIds;
     }

     // If the userId is set to "user" we want to use the current user
     if(userId == "user")
     {
       userId = this.auth.currentUser.uid;
     }

     // Get the user's document
     var userDoc = this.db.collection('users').doc(userId);

     userDoc.get().then((doc) => {
       if (doc.exists)
       {
         var docData = doc.data();
         var sitesArr = [];

         // Check if list of programs already exist
         if(docData.sites)
         {
           sitesArr = docData.sites;
         }

         // If we're adding in bulk, then we just merge the arrays
         if(bulkSiteIds.length > 0)
         {
           sitesArr = sitesArr.concat(bulkSiteIds);
         }
         else
         {
           sitesArr.push(siteId);
         }

         // Remove any duplicates
         sitesArr = sitesArr.filter((item,index)=>{
            return (sitesArr.indexOf(item) == index)
         })


         // Push programs array to the document
         var addIdToDoc = userDoc.set({
           sites: sitesArr
         }, {merge: true})
         .then(() => {
             console.log("Site successfully written to user!");
         })
         .catch((error) => {
             console.error("Error writing document: ", error);
         });
      }
      else {
        console.log("User's document doesn't exist!");
      }
     }).catch((error) => {
          console.log("Error getting user document:", error);
      });

   }


   /*
    * Completely replace all sites in a User's firestore document.
    */
   replaceSitesForUser = async (
     data: {
      siteIds: Array<string>,
      userId: string,
     }
   ): Promise<void> => {
     var userId = data.userId;
     var siteIds = data.siteIds;

     // Get the user's document
     var userDoc = this.db.collection('users').doc(userId);

     userDoc.get().then((doc) => {
       if (doc.exists)
       {
         // Push programs array to the document
         var addIdToDoc = userDoc.set({
           sites: siteIds
         }, {merge: true})
         .then(() => {
             console.log("Site successfully written to user!");
         })
         .catch((error) => {
             console.error("Error writing document: ", error);
         });
      }
      else {
        console.log("User's document doesn't exist!");
      }
     }).catch((error) => {
          console.log("Error getting user document:", error);
      });

   }


   /*
    * Assign a user to a site or program
    *
    * @param userId: set to "user" that you want to add the program or site to this user
    * @param bulkUserIds: an array of user ID's in case we want to add a bunch of users to the site or program all at once
    */
   assignUserToSiteOrProgram = async (
     data: {
       siteId?: string,
       programId?: string,
       userId?: string,
       bulkUserIds?: Array<string>
      }
   ): Promise<void> => {


     // If we're just adding one user
     var userId;
     if(data.userId)
     {
       var userId = data.userId;

       // If the userId is set to "user" we want to use the current user
       if(userId == "user")
       {
         userId = this.auth.currentUser.uid;
       }
     }

     // If we're adding multiple users at once
     var bulkUserIds = [];
     if(data.bulkUserIds)
     {
       bulkUserIds = data.bulkUserIds;
     }

     var documentToAddTo;
     // If we're just adding to a site
     var docId;
     if(data.siteId)
     {
       docId = data.siteId;
       // Get the site's document
       documentToAddTo = this.db.collection('sites').doc(docId);
     }

     // If we're just adding to a program
     if(data.programId)
     {
       docId = data.programId;
       // Get the programs's document
       documentToAddTo = this.db.collection('programs').doc(docId);

     }



     documentToAddTo.get().then((doc) => {
       if (doc.exists)
       {
         var docData = doc.data();
         var leadersArr = [];

         // Check if list of programs already exist
         if(docData.leaders)
         {
           leadersArr = docData.leaders;
         }

         // If we're adding in bulk, then we just merge the arrays
         if(bulkUserIds.length > 0)
         {
           leadersArr = leadersArr.concat(bulkUserIds);
         }
         else
         {
           leadersArr.push(userId);
         }

         // Remove any duplicates
         leadersArr = leadersArr.filter((item,index)=>{
            return (leadersArr.indexOf(item) == index)
         })


         // Push programs array to the document
         var addIdToDoc = documentToAddTo.set({
           leaders: leadersArr
         }, {merge: true})
         .then(() => {
             console.log("User(s) successfully added.");
         })
         .catch((error) => {
             console.error("Error writing document: ", error);
         });
      }
      else {
        console.log("Site and/or Program " + docId + "document doesn't exist!");
      }
     }).catch((error) => {
          console.log("Error getting Site and/or Program document:", error);
      });

   }

   /*
    * Assign a site to a program
    *
    * @param userId: set to "user" to assign the program to the current user
    * @param bulkSiteIds: an array of site ID's in case we want to add a bunch of sites together
    */
   assignSiteToProgram = async (
     data: {
       programId: string,
       siteId: string,
       bulkSiteIds: Array<string>
      }
   ): Promise<void> => {

     var programId = data.programId;

     // If we're just adding one site
     var siteId;
     if(data.siteId)
     {
       siteId = data.siteId;
     }

     // If we're adding multiple sites at once
     var bulkSiteIds = [];
     if(data.bulkSiteIds)
     {
       bulkSiteIds = data.bulkSiteIds;
     }


     // Get the user's document
     var programDoc = this.db.collection('programs').doc(programId);

     programDoc.get().then((doc) => {
       if (doc.exists)
       {
         var docData = doc.data();
         var sitesArr = [];

         // Check if list of programs already exist
         if(docData.sites)
         {
           sitesArr = docData.sites;
         }
         // If we're adding in bulk, then we just merge the arrays
         if(bulkSiteIds.length > 0)
         {
           sitesArr = sitesArr.concat(bulkSiteIds);
         }
         else
         {
           sitesArr.push(siteId);
         }
         // Remove any duplicates
         sitesArr = sitesArr.filter((item,index)=>{
            return (sitesArr.indexOf(item) == index)
         })

         // Push programs array to the document
         var addIdToDoc = programDoc.set({
           sites: sitesArr
         }, {merge: true})
         .then(() => {
             console.log("Site successfully saved to program!");
         })
         .catch((error) => {
             console.error("Error writing document: ", error);
         });
      }
      else {
        console.log("Program's document doesn't exist!");
      }
     }).catch((error) => {
          console.log("Error getting program document:", error);
      });

   }

   /*
    * Assign a program to a site
    *
    * @param userId: set to "user" to assign the program to the current user
    * @param bulkProgramIds: an array of program ID's in case we want to add a bunch of programs together
    */
   assignProgramToSite = async (
     data: {
       siteId: string,
       programId: string,
       bulkProgramIds: Array<string>
      }
   ): Promise<void> => {

     var siteId = data.siteId;

     // If we're just adding one site
     var programId;
     if(data.programId)
     {
       programId = data.programId;
     }

     // If we're adding multiple sites at once
     var bulkProgramIds = [];
     if(data.bulkProgramIds)
     {
       bulkProgramIds = data.bulkProgramIds;
     }


     // Get the user's document
     var siteDoc = this.db.collection('sites').doc(siteId);

     siteDoc.get().then((doc) => {
       if (doc.exists)
       {
         var docData = doc.data();
         var programsArr = [];

         // Check if list of programs already exist
         if(docData.programs)
         {
           programsArr = docData.programs;
         }
         // If we're adding in bulk, then we just merge the arrays
         if(bulkProgramIds.length > 0)
         {
           programsArr = programsArr.concat(bulkProgramIds);
         }
         else
         {
           programsArr.push(programId);
         }
         // Remove any duplicates
         programsArr = programsArr.filter((item,index)=>{
            return (programsArr.indexOf(item) == index)
         })

         // Push programs array to the document
         var addIdToDoc = siteDoc.set({
           programs: programsArr
         }, {merge: true})
         .then(() => {
             console.log("Program successfully saved to site : " + siteId);
         })
         .catch((error) => {
             console.error("Error writing document: " + siteId, error);
         });
      }
      else {
        console.log("Site document " + siteId + " doesn't exist!");
      }
     }).catch((error) => {
          console.log("Error getting site document: " + siteId, error);
      });

   }

  /*
   * Save New Site
   */
   createSite = async (

     siteData: {
       siteName: string,
       selectedProgram: string
     }
   ): Promise<void> => {
     // Create New document for program
     return this.db.collection('sites').add({
        name: siteData.siteName,
        programs: siteData.selectedProgram,
      })
        .then( (data) => {
          console.log("Successfully written site document " + data.id);

          // Add site to program
          this.assignSiteToProgram({ programId: siteData.selectedProgram, siteId: data.id}).then(data => {console.log("Site added to program " + siteData.selectedProgram);});

          var siteDoc = this.db.collection('sites').doc(data.id);
          var addIdToDoc = siteDoc.set({
            id: data.id
          }, {merge: true})
          .then(() => {
              console.log("ID successfully written!");
          })
          .catch((error) => {
              console.error("Error writing site document: ", error);
          });

          return data;
        });

   }



   setProgram = async (
     programId: string,
     edits: ProgramInfo
   ): Promise<void> => {

     const {name, leaders, sites} = edits

     // Remove program from user documents that were deselected
     // First get the user documents that currently have this program saved
     this.db
       .collection('users')
       .where('programs', 'array-contains-any', [programId])
       .get()
       .then( async (querySnapshot) => {
         let coachesArray = {};

         querySnapshot.forEach( async (doc) => {
           // If this user isn't in the selected list of program leaders, remove the program
           if( !leaders.includes(doc.data().id) )
           {
             this.removeItemFromArray({programToRemove: programId, userToRemoveFrom: doc.data().id});
           }
         });

         return coachesArray;
       });

     // If they are selected for the program, add the program to their doc
     for(var userIndex in leaders)
     {
       this.assignProgramToUser({userId: leaders[userIndex], programId: programId});
     }


     // Save program document
     return this.db
       .collection('programs')
       .doc(programId)
       .set(
         {
           name: name,
           leaders: leaders,
           sites: sites
         },
         {merge: true}
       )
       .catch((error: Error) =>
         console.error('Error occurred when writing document:', error)
       )

   }



   /**
    * Remove site or progrm
    */
   removeSiteOrProgram = async (
     data: {
       siteId: string,
       programId: string
     }): Promise<void> => {

       var document, itemType, itemId;

       // If we're deleting a site
       if(data.siteId)
       {
         itemType = "Site";
         itemId = data.siteId;
         document =  this.db.collection('sites').doc(data.siteId);
       }

       // If we're deleting a program
       if(data.programId)
       {

         itemType = "Program";
         itemId = data.programId;
         document = this.db.collection('programs').doc(data.programId);
       }

       if (this.auth.currentUser) {


         // Need to remove this program/site from all programs/sites/users that hold this.
         await document.get().then( async doc => {
           if (doc.exists)
           {
             var docData = doc.data();

             var tempArray = [];
             // If it has programs
             if(docData.programs)
             {
               tempArray = docData.programs;

               // Go through each program and remove this site from its list
               for(var tempItemIndex in tempArray )
               {
                 var tempItemId = tempArray[tempItemIndex];
                 await this.removeItemFromArray({siteToRemove: itemId, programToRemoveFrom: tempItemId})
               }

             }

             // If it has sites
             if(docData.sites)
             {
               tempArray = docData.sites;

               // Go through each site and remove this program from its list
               for(var tempItemIndex in tempArray )
               {
                 var tempItemId = tempArray[tempItemIndex];
                 await this.removeItemFromArray({programToRemove: itemId, siteToRemoveFrom: tempItemId})
               }
             }

             // If it has leaders
             if(docData.leaders)
             {
               tempArray = docData.leaders;

               // Go through each leader and remove this program from its list
               for(var tempItemIndex in tempArray )
               {
                 var tempItemId = tempArray[tempItemIndex];
                 if(itemType == "Program")
                 {
                   await this.removeItemFromArray({programToRemove: itemId, userToRemoveFrom: tempItemId})
                 }
                 if(itemType == "Site")
                 {
                   await this.removeItemFromArray({siteToRemove: itemId, userToRemoveFrom: tempItemId})
                 }
               }
             }

           }
         });

         // Actually delete the document
         return document
           .delete()
           .then(() =>
             console.log(itemType + ' with id, ' + itemId + ', successfully removed!')
           )
           .catch((error: Error) =>
             console.error(
               'There was a problem removing ' + itemType + ' with id, ' + itemId,
               error
             )
           )

     }
   }


   /*
    * Removes a teacher from a coach's collection
    */

    removeTeacherFromCoach = async (
      data: {
        coachId: string,

        teacherId: string,
        bulkTeacherIds: Array<string>
      }
    ) => {

      // If we're only deleting a single teacher
      if(data.teacherId)
      {
        this.db.collection("users").doc(data.coachId).collection("partners").doc(data.teacherId).delete()
        .catch((error: Error) => {
          console.error("Error occurred when deleting teacher from coach's partner list: ", error)
        })
      }

      // If we're deleting in bulk
      if(data.bulkTeacherIds)
      {
        var batch = this.db.batch();

        for (var idIndex in data.bulkTeacherIds) {
            var id = data.bulkTeacherIds[idIndex];

            var ref = this.db.collection("users").doc(data.coachId).collection("partners").doc(id);
            batch.delete(ref);
        }

        batch.commit();
      }


    }




   /*
    * Removes a User, Program, or Site from a User, Program, or Site
    *
    * @param userId: set to "user" to assign the program to the current user
    * @param bulkProgramIds: an array of program ID's in case we want to add a bunch of programs together
    */
   removeItemFromArray = async (
     data: {
       userToRemove: string,
       siteToRemove: string,
       programToRemove: string,

       userToRemoveFrom: string,
       siteToRemoveFrom: string,
       programToRemoveFrom: string,
      }
   ): Promise<void> => {

     var siteId = data.siteId;

     // Decide what we are removing
     var toRemove, toRemoveType;
     if(data.userToRemove)
     {
       toRemove = data.userToRemove;
       toRemoveType = "users";
     }
     else if(data.siteToRemove)
     {
       toRemove = data.siteToRemove;
       toRemoveType = "sites";
     }
     else if(data.programToRemove)
     {
       toRemove = data.programToRemove;
       toRemoveType = "programs";
     }

     // Decide where we are removing from
     var removeFrom, toRemoveFromType;
     if(data.userToRemoveFrom)
     {
       removeFrom = data.userToRemoveFrom;
       toRemoveFromType = "users";
     }
     else if(data.siteToRemoveFrom)
     {
       removeFrom = data.siteToRemoveFrom;
       toRemoveFromType = "sites";
     }
     else if(data.programToRemoveFrom)
     {
       removeFrom = data.programToRemoveFrom;
       toRemoveFromType = "programs";
     }


     // Get the document to delete from
     var removeFromDoc = this.db.collection(toRemoveFromType).doc(removeFrom);

     removeFromDoc.get().then((doc) => {
       if (doc.exists)
       {
         var docData = doc.data();
         var tempArray = [];

         // Get the list to remove from if it already exists
         switch(toRemoveType){
          case "users":
            tempArray = docData.leaders;
            break;
          case "sites":
            tempArray = docData.sites;
            break;
          case "programs":
            tempArray = docData.programs;
            break;
         }


          // Remove Item from array
          var indexToRemove = tempArray.indexOf(toRemove);
          tempArray.splice(indexToRemove, 1);


         // Push new array to the document
         var removeResults;
         switch(toRemoveType){
          case "users":
            removeResults = removeFromDoc.set({
              leaders: tempArray
            }, {merge: true})
            .then(() => {
                console.log("Program successfully saved to site : " + siteId);
            })
            .catch((error) => {
                console.error("Error writing document: " + siteId, error);
            });
            break;
          case "sites":
            removeResults = removeFromDoc.set({
              sites: tempArray
            }, {merge: true})
            .then(() => {
                console.log("Program successfully saved to site : " + siteId);
            })
            .catch((error) => {
                console.error("Error writing document: " + siteId, error);
            });
            break;
          case "programs":
            removeResults = removeFromDoc.set({
              programs: tempArray
            }, {merge: true})
            .then(() => {
                console.log("Program successfully saved to site : " + siteId);
            })
            .catch((error) => {
                console.error("Error writing document: " + siteId, error);
            });
            break;
         }



      }
      else {
        console.log("Site document " + siteId + " doesn't exist!");
      }
     }).catch((error) => {
          console.log("Error getting site document: " + siteId, error);
      });

   }


   /**
    * Listening to Children cloud function
    */
   fetchSiteProfileAverages = async (
     data: {
       type: string,
       startDate: string,
       endDate: string,
       teacherIds: string
     }
   ): Promise<void> => {

     const fetchSiteProfileAverages = this.functions.httpsCallable(
       'fetchSiteProfileAverages'
     )
     return fetchSiteProfileAverages({type: data.type, startDate: data.startDate, endDate: data.endDate, teacherIds: data.teacherIds})
       .then(
         (result) => {
           console.log("Result: " + result.data[0][0]);
           return result.data[0];
         }
       )
       .catch((error: Error) =>
         console.error('Error occurred getting site profile averages : ', error)
       )
   }





    /**
     * Grabs data for Coach profile
     *
     */
    fetchCoachProfileData = async (
      data: {
        startDate: string,
        endDate: string,
        teacherIds: string,
        coachId: string
      }
    ): Promise<void> => {

      const fetchCoachProfile = this.functions.httpsCallable(
        'fetchCoachProfile'
      )
      return fetchCoachProfile({startDate: data.startDate, endDate: data.endDate, teacherIds: data.teacherIds, coachId: data.coachId})
        .then(
          (result) => {
            console.log("Result: " + result.data[0][0]);
            return result.data[0];
          }
        )
        .catch((error: Error) =>
          console.error('Error occurred getting site profile averages : ', error)
        )
    }


    /**
     * Grabs data for teacher profile
     */
    fetchTeacherProfileData = async (
      data: {
        startDate: string,
        endDate: string,
        teacherIds: string
      }
    ): Promise<void> => {

      const fetchTeacherProfileData = this.functions.httpsCallable(
        'fetchTeacherProfileData'
      )
      return fetchTeacherProfileData({startDate: data.startDate, endDate: data.endDate, teacherIds: data.teacherIds})
        .then(
          (result) => {
            console.log("Result:", result.data);
            return result.data;
          }
        )
        .catch((error: Error) =>
          console.error('Error occurred getting teacher profile averages : ', error)
        )
    }


    /**
     * Get data for the teacher profile page
     */
    fetchTeacherProfileReadingTrend = async (
      teacherId,
      who,
      startDate,
      endDate
    ): Promise<Array<{
      startDate: { value: string }
      literacy1: number
      literacy2: number
      literacy3: number
      literacy4: number
      literacy5: number
      literacy6: number
      literacy7: number
      literacy8: number
      literacy9: number
      literacy10: number
      total: number
      activitySetting: string
    }> | void> => {
      const fetchTeacherProfileReadingTrendFirebaseFunction = this.functions.httpsCallable(
        'fetchTeacherProfileReadingTrend'
      )
      return fetchTeacherProfileReadingTrendFirebaseFunction({
        teacherId: teacherId,
        who: who,
        startDate: startDate,
        endDate: endDate,
      })
        .then(
          (result: {
            data: Array<Array<{
              startDate: { value: string }
              literacy1: number
              literacy2: number
              literacy3: number
              literacy4: number
              literacy5: number
              literacy6: number
              literacy7: number
              literacy8: number
              literacy9: number
              literacy10: number
              total: number
              activitySetting: string
            }>>
          }) => result.data[0]
        )
        .catch((error: Error) =>
          console.error('Error occurred getting listening trend: ', error)
        )
    }


       /**
        * Get averages data for Teacher Profile
        */
       fetchTeacherProfileAverages = async (
         data: {
           type: string,
           startDate: string,
           endDate: string,
           teacherId: string
         }
       ): Promise<void> => {

         const fetchTeacherProfileAverages = this.functions.httpsCallable(
           'fetchTeacherProfileAverages'
         )
         return fetchTeacherProfileAverages({type: data.type, startDate: data.startDate, endDate: data.endDate, teacherId: data.teacherId})
           .then(
             (result) => {
               console.log("Result: ", result.data);

               var results = result.data[0];

               for(var i = 1; i < result.data.length; i++)
               {
                  results = results.concat(result.data[i]);
               }

               return results;
             }
           )
           .catch((error: Error) =>
             console.error('Error occurred getting site profile averages : ', error)
           )
       }


   /**
    * Returns list of Coaches that are associated with a program
    */
   fetchProgramTeachers = async (
     data: {
       programId: string,
       programInfo: string
     }
   ): Promise<void> => {

     // Initialize results object that'll hold all the sites and their teachersIdList
     var results = {};

      var programInfo;
      if(data.programInfo)
      {
        programInfo = data.programInfo;
      }
      else
      {
        programInfo = await this.getUserProgramOrSite({programId: data.programId});
      }

      // Go through all this sites in this program to get their coaches
      for(var siteIndex in programInfo.sites)
      {
        var siteId = programInfo.sites[siteIndex];
        var site = await this.getUserProgramOrSite({siteId: siteId});

        // If site doesn't exist, just move on
        if(!site)
        {
          continue;
        }


        var siteTeachers = [];

        // Initialize this site in the results
        results[siteId] = [];

        // Go through all the coaches in this site to get the teachers
        var siteCoaches = [];
        if(site.coaches)
        {
          siteCoaches = site.coaches;
        }

        for(var coachIndex in siteCoaches)
        {
          var coachId = siteCoaches[coachIndex];

          // Get this coaches teachers and add it to the list
           var teachers = await this.getTeacherListFromUser({userId: coachId});

          // If this site doesn't have any data in results object, add the whole array
          results[siteId] = results[siteId].concat(teachers);

        }

        // Let's get all the teachers by the site name as well just in case we missed any
        var teachers2 = await this.getTeacherBySiteName(site.name);
        results[siteId] = results[siteId].concat(teachers2);

        // Remove all duplicates
        results[siteId] = results[siteId].filter((v,i,a)=>a.findIndex(v2=>(v2 === v ))===i)

      }

      return results;


    }



   /**
    * Removes any items from an array that is no longer in the firestore (We're having issues with this for some reason)
    *
    * @param dataList : the array of data to filter out
    * @param dataType : the type of data (users, programs, or sites)
    */
   filterUserSiteProgramArray = async (
     data: {
       dataList: Array<Types.User>,
       dataType: String
     }
   ): Promise<void> => {

     var results = [];

      for(var dataIndex in data.dataList)
      {
        // Get the id. The list is either a list of id's or a list of objects with ids
        var dataId;
        if(data.dataList[dataIndex].id)
        {
          dataId = data.dataList[dataIndex].id
        }
        else
        {
          dataId = data.dataList[dataIndex];
        }

        // Fetch from firestore
        var tempItem = await this.db.collection(data.dataType).doc(dataId).get()
          .catch((error: Error) =>
            console.error('Document doesnt exist', error)
          )

        if(tempItem)
        {
          results.push(data.dataList[dataIndex]);
        }
        else
        {
          console.log("Removing cached item " + dataId + " from " + data.dataType);
        }

      }

      return results;

     }


     /*
      * Send a 'reset password' link to newly created coaches
      */
    sendEmailToNewUser = async (email) => {
      const secondFirebase = firebase.initializeApp(config, 'secondary');

      if (process.env.USE_LOCAL_AUTH) {
        console.log('using local Auth');
        secondFirebase.auth().useEmulator("http://localhost:9099");
      }

      secondFirebase.auth().sendPasswordResetEmail(email)
        .then((res) => {
          // Password reset email sent!
          // ..
          console.log("email sent to " + email, res);

        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
        })
        .finally( () => {
          secondFirebase.delete()
        }
        )

    }


  /**
   * Updates played training videos URL list
   */
  updatePlayedVideos = async (videoUrl: string): Promise<void> => {
    if (this.auth.currentUser) {
      const userDocument = await this.db
        .collection('users')
        .doc(this.auth.currentUser.uid)
        .get()
        .catch((error: Error) =>
          console.error('Error getting user document', error)
        )

      if (!userDocument) {
        return
      }

      const playedVideos: Array<string> =
        userDocument.data()?.playedVideos ?? []

      const newPlayedVideos = [...new Set([...playedVideos, videoUrl.trim()])]

      return this.db
        .collection('users')
        .doc(this.auth.currentUser.uid)
        .update({
          playedVideos: newPlayedVideos,
        })
        .catch((error: Error) =>
          console.error('Error updating played videos list', error)
        )
    }


  }

  emailExists = async (email) => {
    this.query = this.db.collection('users').where("email", "==", email)
    let collection = await this.query.get()
    if (collection.docs.length > 0) {
      return true
    }
    return false
  }



  /**
   * gets list of all Transfer logs for a site or coach
   */
  getTransferLogs = async (type, objectId) => {
      return this.db
        .collection(type)
        .doc(objectId)
        .collection('transferLogs')
        .get()
        .then( async (logs) => {
          const logList = []


          logs.forEach(log =>{
            logList.push(log.data());
          }
          )




          /* START CACHE REMOVAL (for development)
          logs.forEach(log =>{

            console.log("TRANSFER LOG DATA =====> ", log.id);

            //var tempItem = await this.db.collection(data.dataType).doc(dataId).get()
            var tempItem = this.db.collection(type)
              .doc(objectId)
              .collection('transferLogs')
              .doc(log.id)
              .get()
              .then( logItem => {
                if(logItem.exists)
                {
                  console.log("Temp TRANSFER DATA => ", log.data());

                  logList.push(log.data());
                }
                else
                {
                  console.log("Removing cached item " + dataId + " from " + data.dataType);
                }
              })
              .catch((error: Error) =>
                console.error('Document doesnt exist', error)
              )



            //logList.push(log.data());
          }
          )
          /* END CACHE REMOVAL */


          console.log('log list', logList)
          return logList;
        })
        .catch((error: Error) =>
          console.error('Error getting partner list: ', error)
        )
  }



  //REMOVE AFTER DEVELOPMENT

  populateUser = async () => {
    const user = this.auth.currentUser ? this.auth.currentUser.uid : '';
    //Create KnowledgeChecks
    const answerIndex: Array<number> = [0, 3, 1, 2, 4];
    console.log(`Completing knowledge check for ${user}...`)
    for (let i = 0; i < 5; i++) {
      await firebase.firestore().collection("knowledgeChecks").doc().set({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        type: "climate",
        isCorrect: true,
        answeredBy: user,
        questionIndex: i,
        answerIndex: answerIndex[i]
      });
    }
    await this.db.collection('users').doc(user).update({unlocked: [2]})

    //for testing begin
    // let teacherInfo = {
    //   firstName: "Elizabeth",
    //   lastName: "Bathory",
    //   school: "Wichita Stars",
    //   email: "bathory@email.com",
    //   notes: "",
    //   phone: "",
    //   id: "bathory",
    //   role: "teacher",
    //   // sites: teacherSites[i]
    // };
    // await firebase.firestore().collection("users").doc(teacherInfo.id).set(teacherInfo);
    //for testing end


    console.log("Adding partner...")
    await this.db.collection('users').doc(user).collection('partners').doc("bathory").set({});
    console.log(`Creating Classroom Climate observation for ${user} observing bathory...`)
    const behaviorResponse: Array<string> = ["nonspecificapproval", "disapproval", "specificapproval", "redirection"];
    const entryNumber: number = Math.floor(Math.random() * 10);
    const observationInfo = {
        start: firebase.firestore.FieldValue.serverTimestamp(),
        end: firebase.firestore.FieldValue.serverTimestamp(),
        type: "climate",
        activitySetting: null,
        checklist: null,
        completed: true,
        observedBy: "/user/" + user,
        teacher: "/user/bathory",
        timezone: "America/New_York"
      };
    this.sessionRef = this.db.collection('observations').doc('demo');
    let entryCollection = this.sessionRef.collection('entries')
    for (let entryIndex = 0; entryIndex < entryNumber; entryIndex++) {
      entryCollection.add({
        Timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        Type: "climate",
        BehaviorResponse: behaviorResponse[Math.floor(Math.random() * 4)]
      });
    }
    this.sessionRef.set(observationInfo)
    this.sessionRef = null;

    //Create ActionPlan
    console.log("Creating Action Plan...")
    let date = new Date();
    date.setMonth(date.getMonth()+3)
    let actionPlanInfo = {
      benefit: "A positive classroom climate feels safe, respectful, welcoming, and supportive of student learning.",
      coach: user,
      dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
      dateModified: firebase.firestore.FieldValue.serverTimestamp(),
      goal: "Improve the intellectual, social, emotional, and physical environments in which our students learn.",
      goalTimeline: date,
      planNum: 1,
      status: "Active",
      teacher: "bathory",
      tool: "Classroom Climate"
    }
    this.sessionRef = this.db.collection('actionPlans').doc();
    let actionSteps = this.sessionRef.collection('actionSteps');
    date.setMonth(date.getMonth()-2)
    actionSteps.add({
      person: "Elizabeth Bathory",
      step: "Increase the sense of responsibility of students for what happens in the classroom.",
      timeline: date
    })
    date.setMonth(date.getMonth()+1)
    actionSteps.add({
      person: "Elizabeth Bathory",
      step: "Provide opportunities for students to assume leadership roles",
      timeline: date
    })
    await this.sessionRef.set(actionPlanInfo)
    this.sessionRef = null

    //Add Favorite Questions
    console.log("Adding favorite questions...")
    await this.db.collection('users').doc(user).update({favoriteQuestions: [
      "Classroom Climate: Does the room feel safe and comforting?",
      "Classroom Climate: How is the room divided?",
      "Classroom Climate: Do the materials and activities encourage learning?"
    ]})

    //Create Conference Plan
    console.log("Creating Conference Plan...")
    let conferencePlanInfo = {
      addedQuestions: ["Does the room feel safe and comforting?", "Are there any redirections you give to children that you feel are repetitive?"],
      coach: user,
      dateModified: firebase.firestore.FieldValue.serverTimestamp(),
      dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
      feedback: ["Great at redirecting children into learning activities."],
      notes: ["Elizabeth gives unsettling disapprovals but they are usually followed by appropriate redirections."],
      questions: ["Do you use downtime, snack time, before, and after school to ask questions and play quick games with the children to break the ice?"],
      sessionId: "demo",
      teacher: "bathory",
      tool: "Classroom Climate"
    }
    await this.db.collection('conferencePlans').doc().set(conferencePlanInfo).then(() =>
      window.location.reload()
    )

  }

  populateFirebase = async () => {
    const secondFirebase = firebase.initializeApp(config, 'secondary')
    // Added emulators for local testing
    if (process.env.USE_LOCAL_AUTH) {
      console.log('using local Auth');
      secondFirebase.auth().useEmulator("http://localhost:9099");
    }
    if (process.env.use_LOCAL_FIRESTORE) {
      secondFirebase.firestore().settings({
        host: 'localhost:8080',
        ssl: false,
      });
    }

    console.log("Creating authorized users...")
    //Create authenticated users
    const authEmail: Array<string> = [
      "manson@program1.com",             //Beginning of programLeaders
      "carter@program2.com",
      "gein@site1.com",                 //Beginning of siteLeaders
      "lee@site2.com",
      "lopez@site3.com",
      "lawrence@site4.com",
      "columbus@site5.com",
      "mann@coach1.com",              //Beginning of coaches
      "brown@coach2.com",
      "james@coach3.com",
      "swift@coach4.com",
      "anthony@coach5.com",
      'neutron@coach6.com'
    ];

    const password: Array<string> = Array(authEmail.length).fill("password");
    const authFirstName: Array<string> = [
      "Charles",                       //Beginning of programLeaders
      "Jimmy",
      "Edward",                         //Beginning of siteLeaders
      "Yan",
      "Jennifer",
      "Martin",
      "Christopher",
      "Tiffany",                        //Beginning of coaches
      "James",
      "Richard",
      "Taylor",
      "Susan",
      "James"
    ];
    const authLastName: Array<string> = [
      "Manson",                          //Beginning of programLeaders
      "Carter",
      "Gein",                           //Beginning of siteLeaders
      "Lee",
      "Lopez",
      "Lawrence",
      "Columbus",
      "Mann",                         //Beginning of coaches
      "Brown",
      "James",
      "Swift",
      "Anthony",
      "Neutron"
    ];
    const programLeadersNumber: number = 2;
    const siteLeadersNumber: number = 5;
    const coachNumber: number = 6;
    let authRole: Array<string> = Array(programLeadersNumber).fill("programLeader");
    authRole.push(...Array(siteLeadersNumber).fill("siteLeader"));
    authRole.push(...Array(coachNumber).fill("coach"));

    let coaches: Array<Object> = [];
    let leaders: Array<Object> = [];

    for (let i = 0; i < authEmail.length; i++) {
      const userInfo = await secondFirebase.auth().createUserWithEmailAndPassword(authEmail[i], password[i]);
      if (userInfo.user) {
        let userData: Record<string, any> = {
          email:  authEmail[i],
          firstName: authFirstName[i],
          lastName: authLastName[i],
          role: authRole[i],
          id: userInfo ? userInfo.user.uid : ""
        };
        if (userData.email.includes("coach")) {
          let partners: Array<string> = []
          if (userData.email.includes("coach1")) {
            userData.sites =  ["site1", "site2"]
            const docRef = firebase.firestore().collection("users").doc(userInfo.user.uid);
            await docRef.set(userData).then(() => {
              docRef.collection("partners").doc("bathory").set({});
              docRef.collection("partners").doc("gacy").set({});
              docRef.collection("partners").doc("bundy").set({});
              docRef.collection("partners").doc("monroe").set({});
              docRef.collection("partners").doc("bellucci").set({});
              docRef.collection("partners").doc("hewitt").set({});
              docRef.collection("partners").doc("rJxNhJmzjRZP7xg29Ko6").set({});
            })
            partners.push("bathory", "gacy", "bundy", "monroe", "bellucci", "hewitt");
          }else if (userData.email.includes("coach2")) {
            userData.sites =  ["site1"]
            const docRef = firebase.firestore().collection("users").doc(userInfo.user.uid);
            await docRef.set(userData).then(() => {
              docRef.collection("partners").doc("rJxNhJmzjRZP7xg29Ko6").set({});
            })
          }else if (userData.email.includes("coach3")) {
            userData.sites =  ["site2"]
            const docRef = firebase.firestore().collection("users").doc(userInfo.user.uid);
            await docRef.set(userData).then(() => {
              docRef.collection("partners").doc("flinstone").set({});
              docRef.collection("partners").doc("rubble").set({});
              docRef.collection("partners").doc("rJxNhJmzjRZP7xg29Ko6").set({});
            })
            partners.push("flinstone", "rubble");
          }else if (userData.email.includes("coach4")) {
            userData.sites =  ["site3"]
            const docRef = firebase.firestore().collection("users").doc(userInfo.user.uid);
            await docRef.set(userData).then(() => {
              docRef.collection("partners").doc("potter").set({});
              docRef.collection("partners").doc("bozeman").set({});
              docRef.collection("partners").doc("slaughter").set({});
              docRef.collection("partners").doc("darlas").set({});
              docRef.collection("partners").doc("davis").set({});
              docRef.collection("partners").doc("rJxNhJmzjRZP7xg29Ko6").set({});
            })
            partners.push("potter", "bozeman", "slaughter", "darlas", "davis");
          }else if (userData.email.includes("coach5")) {
            userData.sites =  ["site4"]
            const docRef = firebase.firestore().collection("users").doc(userInfo.user.uid);
            await docRef.set(userData).then(() => {
              docRef.collection("partners").doc("laframboise").set({});
              docRef.collection("partners").doc("rJxNhJmzjRZP7xg29Ko6").set({});
            })
            partners.push("laframboise");
          }else if (userData.email.includes("coach6")) {
            userData.sites =  ["site5"]
            const docRef = firebase.firestore().collection("users").doc(userInfo.user.uid);
            await docRef.set(userData).then(() => {
              docRef.collection("partners").doc("sawyer").set({});
              docRef.collection("partners").doc("rJxNhJmzjRZP7xg29Ko6").set({});
            })
            partners.push("sawyer")
          } else {
            userData.sites =  []
            const docRef = firebase.firestore().collection("users").doc(userInfo.user.uid);
            await docRef.set(userData).then(() => {
              docRef.collection("partners").doc("rJxNhJmzjRZP7xg29Ko6").set({});
            })
          }
          coaches.push({
            email: userData.email,
            id: userData.id,
            teachers: partners
          });
        } else {
          if (userData.email.includes("program1")) {
            userData.programs = ["program1"]
          }else if (userData.email.includes("program2")) {
            userData.programs = ["program2"]
          }else if (userData.email.includes("site1")) {
            userData.sites = ["site1"]
          }else if (userData.email.includes("site2")) {
            userData.sites = ["site2"]
          }else if (userData.email.includes("site3")) {
            userData.sites = ["site3"]
          }else if (userData.email.includes("site4")) {
            userData.sites = ["site4"]
            const docRef = firebase.firestore().collection("users").doc(userInfo.user.uid);
            await docRef.set(userData).then(() => {
            docRef.collection("partners").doc("olatunji").set({});
            })
          }else if (userData.email.includes("site5")) {
            userData.sites = ["site5"]
            const docRef = firebase.firestore().collection("users").doc(userInfo.user.uid);
            await docRef.set(userData).then(() => {
            docRef.collection("partners").doc("perez").set({});
            })
          } else {}
          await firebase.firestore().collection("users").doc(userInfo.user.uid).set(userData);
          leaders.push({
            email: userData.email,
            id: userData.id
          });
        }
      }
    }

    console.log("Creating teachers...")
    //Create Teachers
    const teacherFirstName: Array<string> = [
      "Elizabeth",
      "Jonathan",
      "Theodore",
      "Marilyn",
      "Monica",
      "Bubba",
      "Fred",
      "Barney",
      "Harry",
      "Phillip",
      "Chelsea",
      "Kimberly",
      "Mariah",
      "Ashley",
      "Bernadette",
      "Babatunde",
      "Isabella",
      "Practice"
    ];
    const teacherLastName: Array<string> = [
      "Bathory",
      "Gacy",
      "Bundy",
      "Monroe",
      "Bellucci",
      "Hewitt",
      "Flinstone",
      "Rubble",
      "Potter",
      "Bozeman",
      "Slaughter",
      "Darlas",
      "Davis",
      "Laframboise",
      "Sawyer",
      "Olatunji",
      "Perez",
      "Teacher"
    ];
    const teacherSchool: Array<string> = [
      "Ecsed Horizons",
      "Ecsed Horizons",
      "Ecsed Horizons",
      "Ecsed Horizons",
      "Ecsed Horizons",
      "Wichita Stars",
      "Wichita Stars",
      "Wichita Stars",
      "Leeds Learning",
      "Leeds Learning",
      "Leeds Learning",
      "Leeds Learning",
      "Leeds Learning",
      "First Steps",
      "Little Learners",
      "First Steps",
      "Little Learners",
      "Elum Entaree School"
    ];
    const teacherEmail: Array<string> = [
      "bathory@email.com",
      "gacy@email.com",
      "bundy@email.com",
      "monroe@email.com",
      "bellucci@email.com",
      "hewitt@email.com",
      "flinstone@email.com",
      "rubble@email.com",
      "potter@email.com",
      "bozeman@email.com",
      "slaughter@email.com",
      "darlas@email.com",
      "davis@email.com",
      "laframboise@email.com",
      "sawyer@email.com",
      "olatunji@email.com",
      "perez@email.com",
      "practice@teacher.edu"
    ];
    const teacherId: Array<string> = [
      "bathory",
      "gacy",
      "bundy",
      "monroe",
      "bellucci",
      "hewitt",
      "flinstone",
      "rubble",
      "potter",
      "bozeman",
      "slaughter",
      "darlas",
      "davis",
      "laframboise",
      "sawyer",
      "olatunji",
      "perez",
      "rJxNhJmzjRZP7xg29Ko6"
    ];
    const teacherSites: Array<Array<string>> = [
      ["site1"],
      ["site1"],
      ["site1"],
      ["site1"],
      ["site1"],
      ["site2"],
      ["site2"],
      ["site2"],
      ["site3"],
      ["site3"],
      ["site3"],
      ["site3"],
      ["site3"],
      ["site4"],
      ["site5"],
      ["site4"],
      ["site5"],
      ["Elum Entaree School"]
    ];

    for (let i = 0; i < teacherFirstName.length; i++) {
      let teacherInfo = {
        firstName: teacherFirstName[i],
        lastName: teacherLastName[i],
        school: teacherSchool[i],
        email: teacherEmail[i],
        notes: "",
        phone: "",
        id: teacherId[i],
        role: "teacher",
        sites: teacherSites[i]
      };
      await firebase.firestore().collection("users").doc(teacherInfo.id).set(teacherInfo);
    }

    console.log("Creating programs...")
    //Create Programs
    const programId: Array<string> = ["program1", "program2"];
    const pLeaders: Array<Array<string>> =  [
      [leaders.filter(leader => {return leader.email.includes("program1")})[0].id],
      [leaders.filter(leader => {return leader.email.includes("program2")})[0].id]
    ];
    const programName: Array<string> = ["Reading For Success", "Writing Rainbows"];
    const sites: Array<Array<string>> = [["site1", "site2", "site3"], ["site4", "site5"]];

    for (let i = 0; i < programId.length; i++) {
      let programInfo: Record<string, any> = {
        id: programId[i],
        leaders: pLeaders[i],
        name: programName[i],
        sites: sites[i]
      };
      await firebase.firestore().collection("programs").doc(programInfo.id).set(programInfo);
    }

    console.log("Creating sites...")
    //Create Sites
    const siteId: Array<string> = ["site1", "site2", "site3", "site4", "site5", "site6"];
    const sLeaders: Array<Array<string>> =  [
      [leaders.filter(leader => {return leader.email.includes("site1")})[0].id],
      [leaders.filter(leader => {return leader.email.includes("site2")})[0].id],
      [leaders.filter(leader => {return leader.email.includes("site3")})[0].id],
      [leaders.filter(leader => {return leader.email.includes("site4")})[0].id],
      [leaders.filter(leader => {return leader.email.includes("site5")})[0].id],
      [leaders.filter(leader => {return leader.email.includes("site5")})[0].id],
    ];
    const siteName: Array<string> = ["Ecsed Horizons", "Wichita Stars", "Leeds Learning", "First Steps", "Little Learners", "Fairlawn"];
    const siteProgram: Array<string> = ["program1", "program1", "program1", "program2", "program2", "program2"];

    for (let i = 0; i < siteId.length; i++) {
      let programInfo: Record<string, any> = {
        id: siteId[i],
        leaders: sLeaders[i],
        name: siteName[i],
        programs: siteProgram[i]
      };
     await firebase.firestore().collection("sites").doc(programInfo.id).set(programInfo);
   }

  console.log("Creating LI: Book Reading and Classroom Climate observations...")
  //Create Observations
  const behaviorResponse: Array<string> = ["nonspecificapproval", "disapproval", "specificapproval", "redirection"];
  const readingActivity: Array<string> = [
    "All",
    "Fiction",
    "Nonfiction/Informational",
    "Rhyming",
    "Predictable",
    "Poem",
    "Alphabet/Counting",
    "Class-Made Book"
  ]

  for (let coachIndex in coaches) {
    let coach = coaches[coachIndex];
    if (coach.teachers.length > 0) {
    for (let teacherIndex = 0; teacherIndex < coach.teachers.length; teacherIndex++) {
      for (let month = 0; month < 10; month++) {
        if (![2, 3, 4].includes(month)) {
          const documents: number = Math.floor(Math.random() * 3);;
          for (let documentIndex = 0; documentIndex < documents; documentIndex++) {
            let date = new Date();
            date.setMonth(date.getMonth()-month)
            const entryNumber: number = Math.floor(Math.random() * 10);
            const observationInfo = {
                start: firebase.firestore.Timestamp.fromDate(date),
                end: firebase.firestore.Timestamp.fromDate(date),
                type: "climate",
                activitySetting: null,
                checklist: null,
                completed: true,
                observedBy: "/user/" + coach.id,
                teacher: "/user/" + coach.teachers[teacherIndex],
                timezone: "America/New_York"
              };
            this.sessionRef = this.db.collection('observations').doc();
            let entryCollection = this.sessionRef.collection('entries')
            for (let entryIndex = 0; entryIndex < entryNumber; entryIndex++) {
              entryCollection.add({
                Timestamp: firebase.firestore.Timestamp.fromDate(date),
                Type: "climate",
                BehaviorResponse: behaviorResponse[Math.floor(Math.random() * 4)]
              });
            }
            this.sessionRef.set(observationInfo)
            this.sessionRef = null;

          }
        }
      }
    }
    for (let teacherIndex = 0; teacherIndex < coach.teachers.length; teacherIndex++) {
      for (let month = 0; month < 10; month++) {
        if (![2, 3, 4].includes(month)) {
          const documents: number = Math.floor(Math.random() * 3);;
          for (let documentIndex = 0; documentIndex < documents; documentIndex++) {
            let date = new Date();
            date.setMonth(date.getMonth()-month)
            const entryNumber: number = Math.floor(Math.random() * 10);
            const observationInfo = {
                start: firebase.firestore.Timestamp.fromDate(date),
                end: firebase.firestore.Timestamp.fromDate(date),
                type: "LI",
                activitySetting: readingActivity[Math.floor(Math.random() * 8)],
                checklist: "ReadingTeacher",
                completed: true,
                observedBy: "/user/" + coach.id,
                teacher: "/user/" + coach.teachers[teacherIndex],
                timezone: "America/New_York"
              };
            this.sessionRef = this.db.collection('observations').doc();
            let entryCollection = this.sessionRef.collection('entries')
            for (let entryIndex = 0; entryIndex < entryNumber; entryIndex++) {
              const maxLen: number = Math.floor(Math.random() * 10)
              let choices: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
              let checked: Array<number> = maxLen === 0 ? [11] : []

              for(let choice = 0; choice < maxLen; choice++) {
                let num: number = choices[Math.floor(Math.random() * choices.length)];
                checked.push(num)
                choices.splice(choices.indexOf(num), 1)
              }
              entryCollection.add({
                Timestamp: firebase.firestore.Timestamp.fromDate(date),
                Checked: checked
              });
            }
            this.sessionRef.set(observationInfo)
            this.sessionRef = null;

          }
        }
      }

    }
  }
  }


    secondFirebase.delete() // Frees resources for any subsequent users created
  }


}

export default Firebase
