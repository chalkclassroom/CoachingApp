const functions = require("firebase-functions");
const { BigQuery } = require("@google-cloud/bigquery");

const Firestore = require("@google-cloud/firestore");
const PROJECTID = functions.config().env.bq_project
const COLLECTION_NAME = "observations";



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
  const admin = require('firebase-admin');
  if (admin.apps.length === 0) {
    admin.initializeApp();
  }
  firestore = admin.firestore();
}



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

            // Get the results table
            let resultsTableName = tableName + "_results";
            let resultsTable = dataset.table(resultsTableName);
            resultsTable.exists().catch(err => {
                console.error(
                    `table.exists: table ${resultsTableName} does not exist: ${JSON.stringify(
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
                        // Initialize Results
                        var approval = 0, redirection_disapproval = 0, specific_approval = 0, general_approval = 0, redirection = 0, disapproval = 0;
                        var timeStamp, tone;
                        entries.forEach(entry => {
                            console.log(entry.id, "=>", entry.data());
                            let entryData = entry.data();
                            timeStamp = Math.floor(entryData.Timestamp.toDate() / 1000);
                            tone = parseInt(entryData.BehaviorResponse);
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

                                console.log("============================RAT");

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

                            // Calculate results
                            switch(entryData.BehaviorResponse) {
                              case 'specificapproval':
                                approval++;
                                specific_approval++;
                                break;
                              case 'nonspecificapproval':
                                approval++;
                                general_approval++;
                                break;
                              case 'disapproval':
                                disapproval++;
                                redirection_disapproval++;
                                break;
                              case 'redirection':
                                redirection++;
                                redirection_disapproval++;
                                break;
                            }



                        });

                        // We need to calculate the results and insert them into
                        let resultsRow = {
                          insertId: context.params.observationID,
                          json: {
                              id: context.params.observationID,
                              sessionStart: Math.floor(session.start.toDate() / 1000),
                              sessionEnd: Math.floor(session.end.toDate() / 1000),
                              teacher: session.teacher,
                              observedBy: session.observedBy,
                              timestamp: timeStamp,
                              approval: approval,
                              redirection_disapproval: redirection_disapproval,
                              specific_approval: specific_approval,
                              general_approval: general_approval,
                              redirection: redirection,
                              disapproval: disapproval,
                              tone: tone,

                          }
                        }


                        resultsTable.insert(resultsRow, { raw: true, skipInvalidRows: true }).catch(err => {
                            console.error(`table.insert: ${JSON.stringify(err)}`);
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

                        // More info about the results database schema and how it relates with the observation results can be found here: https://docs.google.com/document/d/1nM7ZccAGqlPWA-h3rnVtbsBXRD7CheC-msPEHZsEiS0/edit?usp=sharing
                        // Holds the calculated results of the children (0: child.ac; 1: child.noAc; 2: child.noChildOpp)
                        let childResults = Array(3).fill(0);
                        // Holds the calculated results of the teacher (0: teacher.ac; 1: teacher.noAc; 2: teacher.notThere)
                        let teacherResults = Array(3).fill(0);
                        // Holds the calculated results of the checklist selections (0: child1; 1: child2; 2: child3; 3: teacher1; 4: teacher2' 5: teacher3; 6: teacher4)
                        let checklistResults = Array(7).fill(0);
                        // Hold entry id
                        let entryId;
                        let entryData

                        entries.forEach(entry => {
                            console.log(entry.id, "=>", entry.data());
                            entryData = entry.data();
                            entryId = entry.id;
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

                            // Modify results data
                            // Update child results
                            if(entryData.Checked.includes(2) || entryData.Checked.includes(3) || entryData.Checked.includes(4)){childResults[0]++;} // If any of the child check boxes are selected
                            else{
                              if(entryData.PeopleType == 1){childResults[2]++;} // If the single child option is selected
                              else{childResults[1]++;} // If the single child option is not selected and there's nothing checked under child
                            }

                            // Update Teacher Results
                            if(entryData.Checked.includes(6) || entryData.Checked.includes(7) || entryData.Checked.includes(8) || entryData.Checked.includes(9)){teacherResults[0]++;} // If any of the teacher check boxes are selected
                            else{
                              if(entryData.PeopleType == 1 || entryData.PeopleType == 2){teacherResults[2]++;} // If the teacher isn't there (1st or 2nd type option is selected)
                              else{teacherResults[1]++;}
                            }

                            // Update checklistResults
                            if(entryData.Checked.includes(2)){checklistResults[0]++;}
                            if(entryData.Checked.includes(3)){checklistResults[1]++;}
                            if(entryData.Checked.includes(4)){checklistResults[2]++;}
                            if(entryData.Checked.includes(6)){checklistResults[3]++;}
                            if(entryData.Checked.includes(7)){checklistResults[4]++;}
                            if(entryData.Checked.includes(8)){checklistResults[5]++;}
                            if(entryData.Checked.includes(9)){checklistResults[6]++;}
                        });
                        console.log(rows);


                        // We need to calculate the results and insert them into
                        let resultsRow = {
                          insertId: entryId,
                          json: {
                              id: context.params.observationID,
                              sessionStart: Math.floor(session.start.toDate() / 1000),
                              sessionEnd: Math.floor(session.end.toDate() / 1000),
                              teacherId: session.teacher,
                              observedBy: session.observedBy,
                              type: entryData.PeopleType,
                              child: {
                                ac: childResults[0],
                                noAc: childResults[1],
                                noChildOpp: childResults[2],
                              },
                              teacher: {
                                ac: teacherResults[0],
                                noAc: teacherResults[1],
                                notThere: teacherResults[2],
                              },
                              checklist: {
                                  child1: checklistResults[0],
                                  child2: checklistResults[1],
                                  child3: checklistResults[2],
                                  teacher1: checklistResults[3],
                                  teacher2: checklistResults[4],
                                  teacher3: checklistResults[5],
                                  teacher4: checklistResults[6],
                              },
                              timestamp: Math.floor(entryData.Timestamp.toDate() / 1000),
                              acType: (entryData.acType+'').toLowerCase()

                          }
                        }


                        resultsTable.insert(resultsRow, { raw: true, skipInvalidRows: true }).catch(err => {
                            console.error(`table.insert: ${JSON.stringify(err)}`);
                        });



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


    function getCountOfEntries(collection, document, value, obj) {
        // Sum the count of each shard in the subcollection
        console.log("Test 1");
        obj.value = "cmon";
        return firestore.collection(collection).doc(document).collection("entries").where("Checked", "array-contains", value).get()
          .then((snapshot) => {
              let total_count = 0;
              console.log("Test 2");
              snapshot.forEach((doc) => {
                console.log("Test 3");
                  total_count++;;
              });
              console.log("Totale count : " + total_count);
              obj.value = total_count;
              return total_count;
        });
    }
