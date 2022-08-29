import firebase from 'firebase'
import {FirebaseFunctions} from '@firebase/functions-types'
import * as Constants from '../../constants/Constants'
import * as MessagingTypes from '../MessagingComponents/MessagingTypes'
import * as Types from '../../constants/Types'
import {v4 as uuidv4} from 'uuid'
import DateFnsUtils from "@date-io/date-fns";

const config = process.env.FIREBASE_CONFIG

interface TeacherInfo {
  firstName: string
  lastName: string
  school: string
  email: string
  phone: string
  notes: string
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
    })
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
    site: string
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
        }
        if( hasProgram ) {
          this.assignProgramToUser({userId: data.id, programId: program }).then((res) => {
            console.log("Program " + program + "added to user " + data.id);
          }).catch(e => console.error("error =>", e));
        }

        if ( hasSite ) {
          this.assignSiteToUser({userId: data.id, siteId: site , bulkSiteIds: []}).then((res) => {
            console.log("Site " + site + "added to user " + data.id);
          }).catch(e => console.error("error =>", e));
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
      .catch((error: Error) => console.error('Error signing in: ', error))
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

  /**
   * adds action plan entry to database
   * @param {string} teacherId
   * @param {string} magic8
   */
  createActionPlan = async (
    teacherId: string,
    magic8: string
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

  getActionPlansForExport = async (coachId: string | undefined = undefined) => {
    if (!await this.userIsAdmin()) {
      throw new Error('Not authorized to Perform this action')
    }
    this.query = this.db
      .collection('actionPlans').orderBy('dateModified', 'desc')
    if (coachId) {
      this.query = this.query.where('coach', '==', coachId)
    }
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

  getConferencePlansForExport = async (coachId: string | undefined = undefined) => {
    if (!await this.userIsAdmin()) {
      throw new Error('Not authorized to Perform this action')
    }

    this.query = this.db
      .collection('conferencePlans').orderBy('dateModified', 'desc')
    if (coachId) {
      this.query = this.query.where('coach', '==', coachId)
    }
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


  /*
   * Get a all sites
   */
  getSites = async (): Promise<void> => {
    if(this.auth.currentUser) {
      return this.db
        .collection('sites')
        .get()
        .then((querySnapshot) => {
          const sitesArray: Array<Types.Site> = []
          querySnapshot.forEach((doc) => {

              sitesArray.push({
                name: doc.data().name,
                id: doc.data().id,
                siteLeaderId: doc.data().siteLeaderId,
                coaches: doc.data().coaches
              })

          });

          return sitesArray;

        })
        .catch((error: Error) =>
          console.error('Error retrieving list of site', error)
        )
    }
  }

  /*
   * Get all programs
   */
  getPrograms = async (): Promise<void> => {
    if(this.auth.currentUser) {
      return this.db
        .collection('programs')
        .get()
        .then((querySnapshot) => {
          const programsArray: Array<Types.Site> = []
          querySnapshot.forEach((doc) => {

              programsArray.push({
                name: doc.data().name,
                id: doc.data().id,
                sites: doc.data().sites,
              })

          });

          return programsArray;

        })
        .catch((error: Error) =>
          console.error('Error retrieving list of programs', error)
        )
    }
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

              // Add the program data to the list to return
              programRes.push(tempProgram);
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
      .get()
      .then((querySnapshot) => {
        const leadersArray: Array<Types.User> = []
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

        return leadersArray;
      });
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
      .get()
      .then((querySnapshot) => {
        const leadersArray: Array<Types.User> = []
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
       .get()
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
            id: data.id
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
       bulkSiteIds: Array<string>
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
    * Assign a user to a site or program
    *
    * @param userId: set to "user" that you want to add the program or site to
    * @param bulkUserIds: an array of user ID's in case we want to add a bunch of users to the site or program all at once
    */
   assignUserToSiteOrProgram = async (
     data: {
       siteId: string,
       programId: string,
       userId: string,
       bulkUserIds: Array<string>
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
       console.log("SITE ID : " + docId );
     }

     // If we're just adding to a program
     if(data.programId)
     {
       docId = data.programId;
       // Get the programs's document
       documentToAddTo = this.db.collection('programs').doc(docId);
       console.log("PROGRAM ID : " + docId );

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
         if(docData.sites)
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
           programsArr.push(siteId);
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

          // Add the id to the document
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
}

export default Firebase
