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
  BQ_PROJECT_ID: 'cqrefpwa'
},
  "development": {
    /*
    Same Environment as staging; emulators will capture firestore / functions
     */
    "REACT_APP_FIREBASE_CONFIG": `{
  apiKey: "AIzaSyAdl6szTzbtdD3iq8VoS86ZsMWSxUFtaJ4",
  authDomain: "chalk-dev-c6a5d.firebaseapp.com",
  projectId: "chalk-dev-c6a5d",
  storageBucket: "chalk-dev-c6a5d.appspot.com",
  messagingSenderId: "602770325418",
  appId: "1:602770325418:web:9a2724b5619afe295cf5d3"
}`,
    REACT_APP_USE_LOCAL_FIREBASE : true,
    REACT_APP_USE_LOCAL_FUNCTIONS: true,
    BQ_PROJECT_ID: 'chalk-dev-c6a5d-local'
  },
  "staging": {

    "REACT_APP_FIREBASE_CONFIG": `{
  apiKey: "AIzaSyAdl6szTzbtdD3iq8VoS86ZsMWSxUFtaJ4",
  authDomain: "chalk-dev-c6a5d.firebaseapp.com",
  projectId: "chalk-dev-c6a5d",
  storageBucket: "chalk-dev-c6a5d.appspot.com",
  messagingSenderId: "602770325418",
  appId: "1:602770325418:web:9a2724b5619afe295cf5d3"
}`,
    BQ_PROJECT_ID: 'chalk-dev-c6a5d'
  }
}