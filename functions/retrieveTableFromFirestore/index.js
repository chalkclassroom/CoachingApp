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
    const sqlQuery = `SELECT * FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.literacyReadingTeacher `;
    const options = {
        query: sqlQuery,
        location: 'US',
    };

    const [job] = await bigquery.createQueryJob(options);

    const results = await job.getQueryResults();

    let rows = []
    return firestore.collection(COLLECTION_NAME).where("checklist", "==", "ReadingTeacher").where("completed", "==", true).get()
    .then(querySnapshot => {
        if (querySnapshot.docs.length == 0) {
            console.log("RETURN=>Snapshot contains zero documents")
            return
        }
        querySnapshot.forEach(async doc => {
            if (typeof doc.data().start == "undefined"
            || typeof doc.data().end == "undefined"
            || typeof doc.data().teacher == "undefined"
            || typeof doc.data().observedBy == "undefined"
            || typeof doc.data().activitySetting == "undefined" ) {
                console.log(`SKIPPED=>${doc.id}Docoument is missing required fields`)
                return
            }
            this.sessionRef = await firestore.collection(COLLECTION_NAME).doc(doc.id).collection("entries").orderBy('Timestamp').get()
            .then(entries => {
                if (entries.docs.length == 0) {
                    console.log(`SKIPPED=>${doc.id}Document does not contain entries subcollection`)
                    return
                }
                entries.forEach(async entry => {
                    if (typeof entry.data().Checked == "undefined" || typeof entry.data().Timestamp == "undefined") {
                        console.log(`SKIPPED=>${doc.id}::Entry does not contain required fields`)
                        return
                    }
                    let entryData = entry.data();
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
                
                    const duplicates = results[0].filter((result) => {
                        return result.id == row.json.id &&
                        result.teacher == row.json.teacher &&
                        result.observedBy == row.json.observedBy &&
                        result.activitySetting == row.json.activitySetting &&
                        result.checklist.item1 == row.json.checklist.item1 &&
                        result.checklist.item2 == row.json.checklist.item2 &&
                        result.checklist.item3 == row.json.checklist.item3 &&
                        result.checklist.item4 == row.json.checklist.item4 &&
                        result.checklist.item5 == row.json.checklist.item5 &&
                        result.checklist.item6 == row.json.checklist.item6 &&
                        result.checklist.item7 == row.json.checklist.item7 &&
                        result.checklist.item8 == row.json.checklist.item8 &&
                        result.checklist.item9 == row.json.checklist.item9 &&
                        result.checklist.item10 == row.json.checklist.item10 &&
                        result.checklist.item11 == row.json.checklist.item11
                    });

                    if (duplicates.length > 0) {
                        console.log(`DUPLICATE=>${doc.id}::TS=>${row.json.time} Insert prevented!`)
                        return
                    }
                    console.log(`INSERT=>${doc.id}::TS=>${row.json.time} into rows.`)
                    rows.push(row)
                });
                table.insert(rows, { raw: true, skipInvalidRows: true }).catch(err => {
                    console.error(`table.insert: ${JSON.stringify(err)}`);
                    console.log(err)
                });
                console.log(`INSERT=>rows into ${tableName}.`)
            });
        });
      })
      .catch(error => {
        console.log("Error getting documents: ", error);
      });

})
