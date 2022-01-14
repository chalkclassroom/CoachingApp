module.exports = {
"production": {
  "REACT_APP_FIREBASE_CONFIG": `{
    "apiKey": "AIzaSyB7IUNOBelyA5-rMBSM4PtADvlvUOqe6NU",
    "authDomain": "cqrefpwa.firebaseapp.com",
    "databaseURL": "https://cqrefpwa.firebaseio.com",
    "projectId": "cqrefpwa",
    "storageBucket": "cqrefpwa.appspot.com",
    "messagingSenderId": "353838544707",
    "measurementId": "G-S797QZ8L3N"
  }`,
},
  "development": {
    /*
    TODO: Replace with different environment? this is currently the production config with the emulator suite
     */
    "REACT_APP_FIREBASE_CONFIG": `{
    "apiKey": "AIzaSyB7IUNOBelyA5-rMBSM4PtADvlvUOqe6NU",
    "authDomain": "cqrefpwa.firebaseapp.com",
    "databaseURL": "https://cqrefpwa.firebaseio.com",
    "projectId": "cqrefpwa",
    "storageBucket": "cqrefpwa.appspot.com",
    "messagingSenderId": "353838544707",
    "measurementId": "G-S797QZ8L3N"
  }`,
    REACT_APP_USE_LOCAL_FIREBASE : true,
    REACT_APP_USE_LOCAL_FUNCTIONS: true,
  },
  "staging": {
    // TODO: Get new QA Firebase environment for testing
  }
}