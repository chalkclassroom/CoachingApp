const functions = require("firebase-functions");
const { BigQuery } = require("@google-cloud/bigquery");

const Firestore = require("@google-cloud/firestore");
const PROJECTID = "cqrefpwa";
const COLLECTION_NAME = "observations";
const firestore = new Firestore({
    projectId: PROJECTID
});

exports.observationsToBQ = functions.firestore
    .document("/observations/{observationID}")
    .onUpdate((change, context) => {
        // Get an object representing the document
        // e.g. {'name': 'Marie', 'age': 66}
        const newValue = change.after.data();

        // ...or the previous value before this update
        const previousValue = change.before.data();

        console.log('newValue', newValue);
        console.log('previousValue', previousValue)

        // access a particular field as you would any JS property
        if (newValue.end !== previousValue.end) {
            console.log("Session Finished");
            console.log(newValue);

            // perform desired operations ...
            let datasetName = "observations";
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
            console.log(session);

            if (session.type.toLowerCase() === "climate") {
                let rows=[]
                return firestore.collection(COLLECTION_NAME).doc(SESSION_ID).collection("entries").orderBy('Timestamp').get()
                    .then(entries => {
                        entries.forEach(entry => {
                            console.log(entry.id, "=>", entry.data());

                            let entryData = entry.data();
                            if( entryData.Type === "UNDO"){
                                rows.pop();
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
            } else if (session.type === "LI" && session.checklist === "FoundationalChild") {
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
                                        item10: entryData.Checked.includes(10)
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
                                console.log('SESSION START IS', session.start, 'as date', session.start.toDate());
                                console.log('SESSION END IS', session.end, 'as date', session.end.toDate());
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
        }
    });
