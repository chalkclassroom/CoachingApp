const functions = require("firebase-functions");
const { BigQuery } = require("@google-cloud/bigquery");

const Firestore = require("@google-cloud/firestore");
const PROJECTID = "cqrefpwa";
const COLLECTION_NAME = "observations";
const firestore = new Firestore({
  projectId: PROJECTID
});

const firebaseHelper = require("firebase-functions-helper");
const serviceAccount = require("./serviceAccountKey.json");
const databaseURL = "https://cqrefpwa.firebaseio.com";

// Initialize Firebase App
firebaseHelper.firebase.initializeApp(serviceAccount, databaseURL);

exports.observationsToBQ = functions.firestore
  .document("/observations/{observationID}")
  .onUpdate((change, context) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const newValue = change.after.data();

    // ...or the previous value before this update
    const previousValue = change.before.data();

    // access a particular field as you would any JS property
    if (newValue.end !== previousValue.end) {
      console.log("Session Finished");
      console.log(newValue);

      // perform desired operations ...
      let datasetName = "observations";
      let tableName = newValue.type;
      let bigquery = new BigQuery();

      let dataset = bigquery.dataset(datasetName);
      dataset.exists().catch(err => {
        console.error(
          `dataset.exists: dataset ${datasetName} does not exist: ${JSON.stringify(
            err
          )}`
        );
        return err;
      });

      let table = dataset.table(tableName);
      table.exists().catch(err => {
        console.error(
          `table.exists: table ${tableName} does not exist: ${JSON.stringify(
            err
          )}`
        );
        return err;
      });

      const SESSION_ID = context.params.observationID;

      let session = newValue;
      console.log(session);


      if (session.type === "climate") {
        let rows=[]
        return firestore.collection(COLLECTION_NAME).doc(SESSION_ID).collection("entries").orderBy('Timestamp').get()
          .then(entries => {
            entries.forEach(entry => {
              console.log(entry.id, "=>", entry.data());

              let entryData = entry.data();
              if( entryData.Type === "UNDO"){
                rows.pop();
              } else if( entryData.Type === "Rating"){
                let row = {
                  insertId: entry.id,
                  json: {
                    id: context.params.observationID,
                    start: Math.floor(session.start.toDate() / 1000),
                    end: Math.floor(session.end.toDate() / 1000),
                    teacher: session.teacher,
                    observedBy: session.observedBy,
                    codedTime: Math.floor(entryData.Timestamp.toDate() / 1000),
                    toneRating: parseInt(entryData.BehaviorResponse),
                    type: entryData.Type
                  }
                };

                console.log(row);
                rows.push(row);

              }else {
                let row = {
                  insertId: entry.id,
                  json: {
                    id: context.params.observationID,
                    start: Math.floor(session.start.toDate() / 1000),
                    end: Math.floor(session.end.toDate() / 1000),
                    teacher: session.teacher,
                    observedBy: session.observedBy,
                    codedTime: Math.floor(entryData.Timestamp.toDate() / 1000),
                    behaviorResponse: entryData.BehaviorResponse,
                    type: entryData.Type
                  }
                };

                console.log(row);
                rows.push(row);

              }

            });
            console.log(rows);

            return table.insert(rows, { raw: true, skipInvalidRows: true }).catch(err => {
              console.error(`table.insert: ${JSON.stringify(err)}`);
            });
          })
          .catch(err => {
            console.log("Error getting documents", err);
            return err;
          });
      }

    }
  });