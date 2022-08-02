const functions = require("firebase-functions");
const { BigQuery } = require("@google-cloud/bigquery");

const Firestore = require("@google-cloud/firestore");
const PROJECTID = functions.config().env.bq_project
const COLLECTION_NAME = "observations";



var firestore;
if(!process.env.REACT_APP_USE_LOCAL_FIRESTORE)
{
  firestore = new Firestore({
      projectId: PROJECTID
  });
}
else
{
  const admin = require('firebase-admin');
  if (admin.apps.length === 0) {
    admin.initializeApp();
  }
  firestore = admin.firestore();
}




var today= new Date().toLocaleString('en-US', { timeZone: 'UTC' });
console.log("TESTTTTTTTTTTTTTT " + today);
console.log("TESTTTTTTTTTTTTTT " + today);
console.log("TESTTTTTTTTTTTTTT " + today);
console.log("Planet : " + process.env.PLANET);
console.log("PROJECTID : " + PROJECTID);
console.log("Firebase Config : " + process.env.REACT_APP_FIREBASE_CONFIG);
console.log("Use local firestore : " + process.env.REACT_APP_USE_LOCAL_FIRESTORE);

const findLastIndex = (array, fn ) => {
  for(let i = array.length - 1; i >= 0; i--) {
    if (fn(array[i], i)) {
      return i
    }
  }
  return -1
}

exports.observationsToBQ = functions.firestore
    .document("/observations/{observationID}")
    .onCreate((snapshot, context) => {
        // Get an object representing the document
        // e.g. {'name': 'Marie', 'age': 66}
        const newValue = snapshot.data();

        // ...or the previous value before this update
        // const previousValue = change.before.data();

        // access a particular field as you would any JS property
            console.log("Session Finished");
            console.log(`New value is ${JSON.stringify(newValue)}`);

            // perform desired operations ...
            let datasetName = functions.config().env.bq_dataset;
            let tableName = newValue.type.toLowerCase();
            if (newValue.type === 'LI') {
              tableName = 'literacy' + newValue.checklist;
            }
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
            console.log(`Storing observation ${SESSION_ID} in BQ`);
            if (session.type.toLowerCase() === "climate") {
                let rows=[]
                return firestore.collection(COLLECTION_NAME).doc(SESSION_ID).collection("entries").orderBy('Timestamp').get()
                    .then(entries => {
                        entries.forEach(entry => {
                            console.log(entry.id, "=>", entry.data());
                            let entryData = entry.data();
                            if( entryData.Type === "UNDO"){
                              // Will only remove climate entries, not tone.
                              const lastClimateIndex = findLastIndex(rows, (entry, idx) => entry.json.type === 'climate')
                              if(lastClimateIndex !== -1) {
                                rows.splice(lastClimateIndex, 1)
                              }
                            } else if( entryData.Type === "Rat"){
                                let row = {
                                    insertId: entry.id,
                                    json: {
                                        id: context.params.observationID,
                                        sessionStart: Math.floor(session.start.toDate() / 1000),
                                        sessionEnd: Math.floor(session.end.toDate() / 1000),
                                        teacher: session.teacher,
                                        observedBy: session.observedBy,
                                        codedTime: Math.floor(entryData.Timestamp.toDate() / 1000),
                                        behaviorResponse: entryData.BehaviorResponse,
                                        toneRating: parseInt(entryData.BehaviorResponse),
                                        type: (entryData.Type+'').toLowerCase()
                                    }
                                };

                                console.log(row);
                                rows.push(row);

                            } else if (entryData.Type === "climate"){
                                let row = {
                                    insertId: entry.id,
                                    json: {
                                        id: context.params.observationID,
                                        sessionStart: Math.floor(session.start.toDate() / 1000),
                                        sessionEnd: Math.floor(session.end.toDate() / 1000),
                                        teacher: session.teacher,
                                        observedBy: session.observedBy,
                                        codedTime: Math.floor(entryData.Timestamp.toDate() / 1000),
                                        behaviorResponse: entryData.BehaviorResponse,
                                        type: (entryData.Type+'').toLowerCase()
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
            } else if (session.type.toLowerCase() === "level"){
                let rows=[]
                return firestore.collection(COLLECTION_NAME).doc(SESSION_ID).collection("entries").orderBy('Timestamp').get()
                    .then(entries => {
                        entries.forEach(entry => {
                            console.log(entry.id, "=>", entry.data());
                            let entryData = entry.data();
                            if( entryData.instructionType === "UNDO"){
                                rows.pop();
                            }else {
                                let row = {
                                    insertId: entry.id,
                                    json: {
                                        id: context.params.observationID,
                                        sessionStart: Math.floor(session.start.toDate() / 1000),
                                        sessionEnd: Math.floor(session.end.toDate() / 1000),
                                        teacher: session.teacher,
                                        observedBy: session.observedBy,
                                        codedTime: Math.floor(entryData.Timestamp.toDate() / 1000),
                                        instructionType: entryData.instructionType
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
            else if (session.type.toLowerCase() === "engagement"){
                let rows=[]
                return firestore.collection(COLLECTION_NAME).doc(SESSION_ID).collection("entries").orderBy('Timestamp').get()
                    .then(entries => {
                        entries.forEach(entry => {
                            console.log(entry.id, "=>", entry.data());
                            let entryData = entry.data();
                            if( entryData.Type === "UNDO"){
                                rows.pop();
                            }else {
                                let row = {
                                    insertId: entry.id,
                                    json: {
                                        id: context.params.observationID,
                                        sessionStart: Math.floor(session.start.toDate() / 1000),
                                        sessionEnd: Math.floor(session.end.toDate() / 1000),
                                        teacher: session.teacher,
                                        observedBy: session.observedBy,
                                        codedTime: Math.floor(entryData.Timestamp.toDate() / 1000),
                                        point: entryData.point,
                                        studentId: entryData.studentId,
                                        entryType: (entryData.entryType+'').toLowerCase().trim()
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
            else if (session.type.toLowerCase() === "transition"){
                let rows=[]
                return firestore.collection(COLLECTION_NAME).doc(SESSION_ID).collection("entries").orderBy('Timestamp').get()
                    .then(entries => {
                        entries.forEach(entry => {
                            console.log(entry.id, "=>", entry.data());
                            let entryData = entry.data();
                            if( entryData.Type === "UNDO"){
                                rows.pop();
                            }else {
                                let row = {
                                    insertId: entry.id,
                                    json: {
                                        id: context.params.observationID,
                                        sessionStart: Math.floor(session.start.toDate() / 1000),
                                        sessionEnd: Math.floor(session.end.toDate() / 1000),
                                        teacher: session.teacher,
                                        observedBy: session.observedBy,
                                        transitionStart: entryData.TrnStart,
                                        transitionEnd: entryData.TrnEnd,
                                        type: (entryData.TrnType+'').toLowerCase()
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
            } else if (session.type.toLowerCase() === "ac") {
                let rows=[]
                return firestore.collection(COLLECTION_NAME).doc(SESSION_ID).collection("entries").orderBy('Timestamp').get()
                    .then(entries => {
                        entries.forEach(entry => {
                            console.log(entry.id, "=>", entry.data());
                            let entryData = entry.data();
                            console.log(entryData.Checked);
                            console.log(entryData.PeopleType);
                            if (entryData.Type === "UNDO") {
                                rows.pop();
                            } else {
                                let row = {
                                    insertId: entry.id,
                                    json: {
                                        id: context.params.observationID,
                                        sessionStart: Math.floor(session.start.toDate() / 1000),
                                        sessionEnd: Math.floor(session.end.toDate() / 1000),
                                        teacher: session.teacher,
                                        observedBy: session.observedBy,
                                        checklist: {
                                            child1: entryData.Checked.includes(1),
                                            child2: entryData.Checked.includes(2),
                                            child3: entryData.Checked.includes(3),
                                            child4: entryData.Checked.includes(4),
                                            child5: entryData.Checked.includes(5),
                                            teacher1: entryData.Checked.includes(6),
                                            teacher2: entryData.Checked.includes(7),
                                            teacher3: entryData.Checked.includes(8),
                                            teacher4: entryData.Checked.includes(9),
                                            teacher5: entryData.Checked.includes(10),
                                        },
                                        peopleType: entryData.PeopleType,
                                        timestamp: Math.floor(entryData.Timestamp.toDate() / 1000),
                                        acType: (entryData.acType+'').toLowerCase(),
                                        type: (entryData.type+'').toLowerCase()
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
            } else if (session.type.toLowerCase() === "sequential") {
                let rows=[]
                return firestore.collection(COLLECTION_NAME).doc(SESSION_ID).collection("entries").orderBy('Timestamp').get()
                    .then(entries => {
                        entries.forEach(entry => {
                            console.log(entry.id, "=>", entry.data());
                            let entryData = entry.data();
                            console.log(entryData.Checked);
                            console.log(entryData.PeopleType);
                            if (entryData.Type === "UNDO") {
                                rows.pop();
                            } else {
                                let row = {
                                    insertId: entry.id,
                                    json: {
                                        id: context.params.observationID,
                                        sessionStart: Math.floor(session.start.toDate() / 1000),
                                        sessionEnd: Math.floor(session.end.toDate() / 1000),
                                        teacher: session.teacher,
                                        observedBy: session.observedBy,
                                        checklist: {
                                            child1: entryData.Checked.includes(1),
                                            child2: entryData.Checked.includes(2),
                                            child3: entryData.Checked.includes(3),
                                            child4: entryData.Checked.includes(4),
                                            child5: entryData.Checked.includes(5),
                                            teacher1: entryData.Checked.includes(6),
                                            teacher2: entryData.Checked.includes(7),
                                            teacher3: entryData.Checked.includes(8),
                                            teacher4: entryData.Checked.includes(9),
                                            teacher5: entryData.Checked.includes(10),
                                        },
                                        peopleType: entryData.PeopleType,
                                        timestamp: Math.floor(entryData.Timestamp.toDate() / 1000),
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
            } else if (session.type.toLowerCase() === "listening") {
                let rows=[]
                return firestore.collection(COLLECTION_NAME).doc(SESSION_ID).collection("entries").orderBy('Timestamp').get()
                    .then(entries => {
                        entries.forEach(entry => {
                            console.log(entry.id, "=>", entry.data());
                            let entryData = entry.data();
                            console.log(entryData.Checked);
                            let row = {
                                insertId: entry.id,
                                json: {
                                    id: context.params.observationID,
                                    sessionStart: Math.floor(session.start.toDate() / 1000),
                                    sessionEnd: Math.floor(session.end.toDate() / 1000),
                                    teacher: session.teacher,
                                    observedBy: session.observedBy,
                                    checklist: {
                                        teacher1: entryData.Checked.includes(1),
                                        teacher2: entryData.Checked.includes(2),
                                        teacher3: entryData.Checked.includes(3),
                                        teacher4: entryData.Checked.includes(4),
                                        teacher5: entryData.Checked.includes(5),
                                        teacher6: entryData.Checked.includes(6),
                                        teacher7: entryData.Checked.includes(7)
                                    },
                                    timestamp: Math.floor(entryData.Timestamp.toDate() / 1000),
                                }
                            };
                            console.log(row);
                            rows.push(row);
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
            } else if (session.type.toLowerCase() === "math") {
                let rows=[]
                return firestore.collection(COLLECTION_NAME).doc(SESSION_ID).collection("entries").orderBy('Timestamp').get()
                    .then(entries => {
                        entries.forEach(entry => {
                            console.log(entry.id, "=>", entry.data());
                            let entryData = entry.data();
                            console.log(entryData.Checked);
                            console.log(entryData.PeopleType);
                            if (entryData.Type === "UNDO") {
                                rows.pop();
                            } else {
                                let row = {
                                    insertId: entry.id,
                                    json: {
                                        id: context.params.observationID,
                                        sessionStart: Math.floor(session.start.toDate() / 1000),
                                        sessionEnd: Math.floor(session.end.toDate() / 1000),
                                        teacher: session.teacher,
                                        observedBy: session.observedBy,
                                        checklist: {
                                            child1: entryData.Checked.includes(1),
                                            child2: entryData.Checked.includes(2),
                                            child3: entryData.Checked.includes(3),
                                            child4: entryData.Checked.includes(4),
                                            child5: entryData.Checked.includes(5),
                                            teacher1: entryData.Checked.includes(6),
                                            teacher2: entryData.Checked.includes(7),
                                            teacher3: entryData.Checked.includes(8),
                                            teacher4: entryData.Checked.includes(9),
                                            teacher5: entryData.Checked.includes(10)
                                        },
                                        peopleType: entryData.PeopleType,
                                        timestamp: Math.floor(entryData.Timestamp.toDate() / 1000),
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
            } else if (session.type === "LI" && session.checklist === "FoundationalTeacher") {
              let rows=[];
              console.log(`Processing a foundational teacher literacy instruction observation`);
              return firestore.collection(COLLECTION_NAME).doc(SESSION_ID).collection("entries").orderBy('Timestamp').get()
                  .then(entries => {
                      console.log(`Found ${JSON.stringify(entries.size)} observations to process`);
                      entries.forEach(entry => {
                          console.log(entry.id, "=>", entry.data());
                          let entryData = entry.data();
                          if (entryData.Type === "UNDO") {
                              rows.pop();
                          } else {
                              let row = {
                                  insertId: entry.id,
                                  json: {
                                      id: context.params.observationID,
                                      sessionStart: Math.floor(session.start.toDate() / 1000),
                                      sessionEnd: Math.floor(session.end.toDate() / 1000),
                                      teacher: session.teacher,
                                      observedBy: session.observedBy,
                                      activitySetting: session.activitySetting,
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
                              console.log(row);
                              rows.push(row);
                          }
                      });
                      console.log(rows);

                      return table.insert(rows, { raw: true, skipInvalidRows: true }).catch(err => {
                          console.error(`foundational teacher literacy insert failed: ${JSON.stringify(err)}`);
                      });
                  })
                  .catch(err => {
                      console.log("Error getting documents", err);
                      return err;
                  });
            } else if (session.type === "LI" && session.checklist === "FoundationalChild") {
              let rows=[]
              return firestore.collection(COLLECTION_NAME).doc(SESSION_ID).collection("entries").orderBy('Timestamp').get()
                  .then(entries => {
                      entries.forEach(entry => {
                          console.log(`Entry is ${JSON.stringify(entry.data())}`);
                          let entryData = entry.data();
                          if (entryData.Type === "UNDO") {
                              rows.pop();
                          } else {
                              let row = {
                                  insertId: entry.id,
                                  json: {
                                      id: context.params.observationID,
                                      sessionStart: Math.floor(session.start.toDate() / 1000),
                                      sessionEnd: Math.floor(session.end.toDate() / 1000),
                                      teacher: session.teacher,
                                      observedBy: session.observedBy,
                                      activitySetting: session.activitySetting,
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
                                        item10: entryData.Checked.includes(10)
                                      },
                                      time: Math.floor(entryData.Timestamp.toDate() / 1000),
                                  }
                              };
                              console.log(`Adding row ${JSON.stringify(row)}`);
                              rows.push(row);
                          }
                      });
                      console.log(`Inserting ${rows.length} rows`);

                      return table.insert(rows, { raw: true, skipInvalidRows: true }).catch(err => {
                          console.error(`foundational child insert failed: ${JSON.stringify(err)}`);
                      });
                  })
                  .catch(err => {
                      console.log("Error getting documents", err);
                      return err;
                  });
            } else if (session.type === "LI" && session.checklist === "WritingTeacher") {
                let rows=[]
                return firestore.collection(COLLECTION_NAME).doc(SESSION_ID).collection("entries").orderBy('Timestamp').get()
                    .then(entries => {
                        entries.forEach(entry => {
                            console.log(entry.id, "=>", entry.data());
                            let entryData = entry.data();
                            if (entryData.Type === "UNDO") {
                                rows.pop();
                            } else {
                                let row = {
                                    insertId: entry.id,
                                    json: {
                                        id: context.params.observationID,
                                        sessionStart: Math.floor(session.start.toDate() / 1000),
                                        sessionEnd: Math.floor(session.end.toDate() / 1000),
                                        teacher: session.teacher,
                                        observedBy: session.observedBy,
                                        activitySetting: session.activitySetting,
                                        checklist: {
                                          item1: entryData.Checked.includes(1),
                                          item2: entryData.Checked.includes(2),
                                          item3: entryData.Checked.includes(3),
                                          item4: entryData.Checked.includes(4),
                                          item5: entryData.Checked.includes(5),
                                          item6: entryData.Checked.includes(6),
                                          item7: entryData.Checked.includes(7),
                                          item8: entryData.Checked.includes(8),
                                          item9: entryData.Checked.includes(9)
                                        },
                                        time: Math.floor(entryData.Timestamp.toDate() / 1000),
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
              } else if (session.type === "LI" && session.checklist === "WritingChild") {
                let rows=[]
                return firestore.collection(COLLECTION_NAME).doc(SESSION_ID).collection("entries").orderBy('Timestamp').get()
                    .then(entries => {
                        entries.forEach(entry => {
                            console.log(entry.id, "=>", entry.data());
                            let entryData = entry.data();
                            if (entryData.Type === "UNDO") {
                                rows.pop();
                            } else {
                                let row = {
                                    insertId: entry.id,
                                    json: {
                                        id: context.params.observationID,
                                        sessionStart: Math.floor(session.start.toDate() / 1000),
                                        sessionEnd: Math.floor(session.end.toDate() / 1000),
                                        teacher: session.teacher,
                                        observedBy: session.observedBy,
                                        activitySetting: session.activitySetting,
                                        checklist: {
                                          item1: entryData.Checked.includes(1),
                                          item2: entryData.Checked.includes(2),
                                          item3: entryData.Checked.includes(3),
                                          item4: entryData.Checked.includes(4),
                                          item5: entryData.Checked.includes(5),
                                          item6: entryData.Checked.includes(6),
                                          item7: entryData.Checked.includes(7),
                                          item8: entryData.Checked.includes(8),
                                          item9: entryData.Checked.includes(9)
                                        },
                                        time: Math.floor(entryData.Timestamp.toDate() / 1000),
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
              } else if (session.type === "LI" && session.checklist === "LanguageTeacher") {
                let rows=[]
                return firestore.collection(COLLECTION_NAME).doc(SESSION_ID).collection("entries").orderBy('Timestamp').get()
                    .then(entries => {
                        entries.forEach(entry => {
                            console.log(entry.id, "=>", entry.data());
                            let entryData = entry.data();
                            if (entryData.Type === "UNDO") {
                                rows.pop();
                            } else {
                                let row = {
                                    insertId: entry.id,
                                    json: {
                                        id: context.params.observationID,
                                        sessionStart: Math.floor(session.start.toDate() / 1000),
                                        sessionEnd: Math.floor(session.end.toDate() / 1000),
                                        teacher: session.teacher,
                                        observedBy: session.observedBy,
                                        activitySetting: session.activitySetting,
                                        checklist: {
                                          item1: entryData.Checked.includes(1),
                                          item2: entryData.Checked.includes(2),
                                          item3: entryData.Checked.includes(3),
                                          item4: entryData.Checked.includes(4),
                                          item5: entryData.Checked.includes(5),
                                          item6: entryData.Checked.includes(6),
                                          item7: entryData.Checked.includes(7),
                                          item8: entryData.Checked.includes(8),
                                          item9: entryData.Checked.includes(9)
                                        },
                                        time: Math.floor(entryData.Timestamp.toDate() / 1000),
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
              } else if (session.type === "LI" && session.checklist === "ReadingTeacher") {
                let rows=[]
                return firestore.collection(COLLECTION_NAME).doc(SESSION_ID).collection("entries").orderBy('Timestamp').get()
                    .then(entries => {
                        entries.forEach(entry => {
                            console.log(entry.id, "=>", entry.data());
                            let entryData = entry.data();
                            if (entryData.Type === "UNDO") {
                                rows.pop();
                            } else {
                                let row = {
                                    insertId: entry.id,
                                    json: {
                                        id: context.params.observationID,
                                        sessionStart: Math.floor(session.start.toDate() / 1000),
                                        sessionEnd: Math.floor(session.end.toDate() / 1000),
                                        teacher: session.teacher,
                                        observedBy: session.observedBy,
                                        activitySetting: session.activitySetting,
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
              } else {
                console.log("Next Magic 8 will be filled");
            }
    });
