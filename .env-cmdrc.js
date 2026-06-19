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
  REACT_APP_USE_LOCAL_FIRESTORE: false,
  REACT_APP_USE_LOCAL_FUNCTIONS: false,
  REACT_APP_USE_LOCAL_AUTH: false,
  BQ_PROJECT_ID: 'cqrefpwa',
  BQ_DATASET: 'observations'
},
  "development": {
    // Same Environment as staging; emulators will capture firestore / functions
    "REACT_APP_FIREBASE_CONFIG": `{
  "apiKey": "AIzaSyAdl6szTzbtdD3iq8VoS86ZsMWSxUFtaJ4",
  "authDomain": "chalk-dev-c6a5d.firebaseapp.com",
  "projectId": "chalk-dev-c6a5d",
  "storageBucket": "chalk-dev-c6a5d.appspot.com",
  "messagingSenderId": "602770325418",
  "appId": "1:602770325418:web:9a2724b5619afe295cf5d3"
}`,
    REACT_APP_USE_LOCAL_FIRESTORE : true,
    REACT_APP_USE_LOCAL_FUNCTIONS: true,
    REACT_APP_USE_LOCAL_AUTH: true,
    BQ_PROJECT_ID: 'chalk-dev-c6a5d',
    BQ_DATASET: 'observations_dev'
  },
  "staging": {
    "REACT_APP_FIREBASE_CONFIG": `{
  "apiKey": "AIzaSyAdl6szTzbtdD3iq8VoS86ZsMWSxUFtaJ4",
  "authDomain": "chalk-dev-c6a5d.firebaseapp.com",
  "projectId": "chalk-dev-c6a5d",
  "storageBucket": "chalk-dev-c6a5d.appspot.com",
  "messagingSenderId": "602770325418",
  "appId": "1:602770325418:web:9a2724b5619afe295cf5d3"
}`,
    REACT_APP_USE_LOCAL_FIRESTORE: false,
    REACT_APP_USE_LOCAL_FUNCTIONS: false,
    REACT_APP_USE_LOCAL_AUTH: false,
    BQ_PROJECT_ID: 'chalk-dev-c6a5d',
    BQ_DATASET: 'observations',
  }
}