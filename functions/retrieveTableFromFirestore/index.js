const functions = require("firebase-functions");
const { BigQuery } = require("@google-cloud/bigquery");

const Firestore = require("@google-cloud/firestore");
const PROJECTID = functions.config().env.bq_project
const COLLECTION_NAME = "observations";

const bigquery = new BigQuery();
const datasetName = functions.config().env.bq_dataset;

let dataset = bigquery.dataset(datasetName);
dataset.exists().catch(err => {
    console.error(
        `dataset.exists: dataset ${datasetName} does not exist: ${JSON.stringify(
            err
        )}`
    );
    return err;
});
let tableName = 'literacyReadingTeacher';
let table = dataset.table(tableName);
table.exists().catch(err => {
    console.error(
        `table.exists: table ${tableName} does not exist: ${JSON.stringify(
            err
        )}`
    );
    return err;
});

let firestore;
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
  const admin = require('firebase-admin');
  if (admin.apps.length === 0) {
    admin.initializeApp();
  }
  firestore = admin.firestore();
}



exports.retrieveTableFromFirestore = functions.https.onCall(async () => {
    return firestore.collection(COLLECTION_NAME).where("checklist", "==", "ReadingTeacher").get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {
            this.sessionRef = firestore.collection(COLLECTION_NAME).doc(doc.id).collection("entries").orderBy('Timestamp').get()
            .then(async entries => {
                await entries.forEach(async entry => {
                    let entryData = entry.data();
                    if (entryData.Type === "UNDO") {
                        rows.pop();
                    } else {
                        let row = {
                            insertId: entry.id,
                            json: {
                                id: doc.id,
                                sessionStart: Math.floor(doc.data().start.toDate() / 1000),
                                sessionEnd: Math.floor(doc.data().end.toDate() / 1000),
                                teacher: doc.data().teacher,
                                observedBy: doc.data().observedBy,
                                activitySetting: doc.data().activitySetting,
                                checklist: {
                                    item1: entryData.Checked.includes(1),
                                    item2: entryData.Checked.includes(2),
                                    item3: entryData.Checked.includes(3),
                                    item4: entryData.Checked.includes(4),
                                    item5: entryData.Checked.includes(5),
                                    item6: entryData.Checked.includes(6),
                                    item7: entryData.Checked.includes(7),
                                    item8: entryData.Checked.includes(8),
                                    item9: entryData.Checked.includes(9),
                                    item10: entryData.Checked.includes(10),
                                    item11: entryData.Checked.includes(11)
                                },
                                time: Math.floor(entryData.Timestamp.toDate() / 1000),
                            }
                        };
                        const sqlQuery = `SELECT COUNT(*) as count FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.literacyReadingTeacher WHERE id = '${row.json.id}' AND sessionStart = TIMESTAMP_SECONDS(${row.json.sessionStart}) AND sessionEnd = TIMESTAMP_SECONDS(${row.json.sessionEnd}) AND teacher = '${row.json.teacher}' AND observedBy = '${row.json.observedBy}' AND activitySetting = '${row.json.activitySetting}' AND checklist.item1 = ${row.json.checklist.item1} AND checklist.item2 = ${row.json.checklist.item2} AND checklist.item3 = ${row.json.checklist.item3} AND checklist.item4 = ${row.json.checklist.item4} AND checklist.item5 = ${row.json.checklist.item5} AND checklist.item6 = ${row.json.checklist.item6} AND checklist.item7 = ${row.json.checklist.item7} AND checklist.item8 = ${row.json.checklist.item8} AND checklist.item9 = ${row.json.checklist.item9} AND checklist.item10 = ${row.json.checklist.item10} AND checklist.item11 = ${row.json.checklist.item11} AND time = TIMESTAMP_SECONDS(${row.json.time})`;
                        const options = {
                            query: sqlQuery,
                            location: 'US',
                        };
                    
                        const [job] = await bigquery.createQueryJob(options);
                    
                        const duplicates = await job.getQueryResults();
                        if (duplicates[0][0].count < 1) {
                            console.log(`INSERT=>${doc.id}::TS=>${row.json.time} into table=>${tableName}.`)
                            table.insert(row, { raw: true, skipInvalidRows: true }).catch(err => {
                                console.error(`table.insert: ${JSON.stringify(err)}`);
                                console.log(err)
                            });
                        } else {
                            console.log(`DUPLICATE=>${doc.id}::TS=>${row.json.time} Insert prevented!`)
                        }
                    }
                });
            });
        });
      })
      .catch(error => {
        console.log("Error getting documents: ", error);
      });

})
