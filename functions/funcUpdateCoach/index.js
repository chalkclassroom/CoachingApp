const functions = require("firebase-functions");
const { BigQuery } = require("@google-cloud/bigquery");

const Firestore = require("@google-cloud/firestore");
const PROJECTID = functions.config().env.bq_project
const COLLECTION_NAME = "observations";
const admin = require('firebase-admin');


var firestore;
// If we're not in local development, we want to retrieve the firestore remotely using @google-cloud/firestore package
if(!process.env.REACT_APP_USE_LOCAL_FIRESTORE)
{
  firestore = new Firestore({
      projectId: PROJECTID
  });
}
// If we are in local development, we want to retrieve our local firestore using firebase-admin
else
{
  firestore = admin.firestore();
}

if (admin.apps.length === 0) {
  admin.initializeApp();
}

exports.funcUpdateCoach = functions.firestore
    .document("/users/{docId}")
    .onUpdate( async (change, context) => {

        const newValue = change.after.data();
        const previousValue = change.before.data();

        const prevEmail = previousValue.email;
        const newEmail = newValue.email;


        if(newValue['role'] === "admin" || newValue['role'] === "coach" || newValue['role'] === "programLeader" || newValue['role'] === "siteLeader")
        {

          admin.auth()
            .getUserByEmail(prevEmail)
            .then((user) => {
              if(newEmail !== prevEmail)
              {
                admin.auth().updateUser(user.uid, {
                  email: newEmail
                })
              }
            })


        }


      });
