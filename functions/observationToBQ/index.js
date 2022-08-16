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

                        // Initialize variables to hold data for the results table
                        // More info about the results database schema and how it relates with the observation results can be found here: https://docs.google.com/document/d/1nM7ZccAGqlPWA-h3rnVtbsBXRD7CheC-msPEHZsEiS0/edit?usp=sharing
                        // Saves number of low-level instructions
                        var lowLevelCount = 0;
                        // Saves number of high-level instructions
                        var highLevelCount = 0;
                        // Holds teacher results [0] = low level; [1] = high level;
                        let teacher = Array(2).fill(0);
                        // Holds child results. [0] = low level; [1] = high level;
                        let child = Array(2).fill(0);


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

                            // Generate results data
                            switch(entryData.instructionType){
                              case "llq":
                                lowLevelCount++;
                                teacher[0]++;
                                break;
                              case "hlq":
                                highLevelCount++;
                                teacher[1]++;
                                break;
                              case "llqResponse":
                                lowLevelCount++;
                                child[0]++;
                                break;
                              case "hlqResponse":
                                highLevelCount++;
                                child[1]++;
                                break;
                            }
                        });
                        console.log(rows);

                        // Build results data and push to engagement_results table
                        let resultsRow = {
                          insertId: context.params.observationID,
                          json: {
                              id: context.params.observationID,
                              sessionStart: Math.floor(session.start.toDate() / 1000),
                              sessionEnd: Math.floor(session.end.toDate() / 1000),
                              teacherId: session.teacher,
                              observedBy: session.observedBy,
                              timestamp: Math.floor(session.end.toDate() / 1000),
                              low_level_instruction: lowLevelCount,
                              high_level_instruction: highLevelCount,
                              teacher: {
                                low: teacher[0],
                                high: teacher[1],
                              },
                              child: {
                                low: child[0],
                                high: child[1],
                              }

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
            }
            else if (session.type.toLowerCase() === "engagement"){
                let rows=[]
                return firestore.collection(COLLECTION_NAME).doc(SESSION_ID).collection("entries").orderBy('Timestamp').get()
                    .then(entries => {


                      // More info about the results database schema and how it relates with the observation results can be found here: https://docs.google.com/document/d/1nM7ZccAGqlPWA-h3rnVtbsBXRD7CheC-msPEHZsEiS0/edit?usp=sharing
                      // All arrays below allocate 4 indexes to hold the number of times each of these were selected: [0]="Off Task", [1]="Mildly Engaged", [2]="Engaged", [3]="Highly Engaged";
                      // Holds the calculated results of the Small Group observation results
                      let smallGroup = Array(4).fill(0);
                      // Holds the calculated results of the Whole Group observations results
                      let wholeGroup = Array(4).fill(0);
                      // Holds the calculated results of the Center observations results
                      let centers = Array(4).fill(0);
                      // Holds the calculated results of the Transition observations results
                      let transition = Array(4).fill(0);

                      // Holds the number of times "Off Task" was selected
                      let offTask = 0;
                      // Holds the number of times "Off Task" WASN'T selected
                      let engaged = 0;



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

                                // Generate results
                                switch( (entryData.entryType+'').toLowerCase().trim() ) {
                                  case "small" :
                                    smallGroup[entryData.point]++;
                                    break;
                                  case "whole" :
                                    wholeGroup[entryData.point]++;
                                    break;
                                  case "centers" :
                                    centers[entryData.point]++;
                                    break;
                                  case "transition" :
                                    transition[entryData.point]++;
                                    break;
                                }

                                if(entryData.point == 0){offTask++;}
                                else{engaged++;}

                            }
                        });

                        // Build results data and push to engagement_results table
                        let resultsRow = {
                          insertId: context.params.observationID,
                          json: {
                              id: context.params.observationID,
                              sessionStart: Math.floor(session.start.toDate() / 1000),
                              sessionEnd: Math.floor(session.end.toDate() / 1000),
                              teacher: session.teacher,
                              observedBy: session.observedBy,
                              timestamp: Math.floor(session.end.toDate() / 1000),
                              engaged: engaged,
                              off_task: offTask,
                              small_group: {
                                off_task: smallGroup[0],
                                mildly_engaged: smallGroup[1],
                                engaged: smallGroup[2],
                                highly_engaged: smallGroup[3],
                              },
                              whole_group: {
                                off_task: wholeGroup[0],
                                mildly_engaged: wholeGroup[1],
                                engaged: wholeGroup[2],
                                highly_engaged: wholeGroup[3],
                              },
                              centers: {
                                off_task: centers[0],
                                mildly_engaged: centers[1],
                                engaged: centers[2],
                                highly_engaged: centers[3],
                              },
                              transition: {
                                off_task: transition[0],
                                mildly_engaged: transition[1],
                                engaged: transition[2],
                                highly_engaged: transition[3],
                              },

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
            }
            else if (session.type.toLowerCase() === "transition"){
                let rows=[]
                return firestore.collection(COLLECTION_NAME).doc(SESSION_ID).collection("entries").orderBy('Timestamp').get()
                    .then(entries => {
                        // Holds the calculated results of the Center observations results
                        let transitionType = Array(6).fill(0);
                        var transitionTotal = 0, totalTransitionTime = 0.0, learningActivity = 0.0;
                        var totalTime, totalTimeSeconds, totalTimeRemainingSeconds, totalTimeMinutes;
                        var transitionTimeSeconds, transitionTimeMinutes, transitionTimeRemainingSeconds;
                        var tempTotalTransitionTime, tempStartDate, tempEndDate;

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

                                // Number of transition observed
                                transitionTotal++;

                                // Grab the date object for the start and end of this transition
                                tempStartDate = new Date(entryData.TrnStart);
                                tempEndDate = new Date(entryData.TrnEnd);

                                // Get how many seconds this transition lasted
                                transitionTimeSeconds = Math.floor( ( tempEndDate.getTime() - tempStartDate.getTime() ) / 1000 );

                                // Calculate the how the remaining amount of seconds without minutes (ex: if the time was 1:46, it'll return 46)
                                transitionTimeRemainingSeconds = transitionTimeSeconds % 60;

                                // Calculate how many minutes
                                transitionTimeMinutes = Math.floor(  transitionTimeSeconds / 60 );

                                // Calculate the total amount of this time in Double format (ex: if the time was 1:46, this saves 1.46)
                                tempTotalTransitionTime = transitionTimeMinutes + (transitionTimeRemainingSeconds / 100);

                                // Update the total amount of time used by all transitions
                                totalTransitionTime += tempTotalTransitionTime;

                                // Update the time taken for each type of transition
                                switch( (entryData.TrnType+'').toLowerCase() ){
                                  case "waiting":
                                    transitionType[0] += tempTotalTransitionTime;
                                    break;
                                  case "traveling":
                                    transitionType[1] += tempTotalTransitionTime;
                                    break;
                                  case "child waiting":
                                    transitionType[2] += tempTotalTransitionTime;
                                    break;
                                  case "classroom routines":
                                    transitionType[3] += tempTotalTransitionTime;
                                    break;
                                  case "behavior management disruption":
                                    transitionType[4] += tempTotalTransitionTime;
                                    break;
                                  case "other":
                                    transitionType[5] += tempTotalTransitionTime;
                                    break;
                                }
                            }
                        });
                        console.log(rows);

                        // Calculate how many minutes was spent total

                        console.log("=============== TEST ================================");
                        console.log("=============== TEST ================================");
                        console.log("=============== TEST ================================");

                        totalTimeSeconds = Math.floor( ( session.end.toDate().getTime() - session.start.toDate().getTime() ) / 1000 );

                        totalTimeRemainingSeconds = totalTimeSeconds % 60;   // Need to dive by 1000 because it returns in ms.
                        totalTimeMinutes = Math.floor( totalTimeSeconds / 60 );

                        totalTime = totalTimeMinutes + (totalTimeRemainingSeconds / 100);

                        learningActivity = totalTime - totalTransitionTime;


                        console.log('totalTimeRemainingSeconds: ' + totalTimeRemainingSeconds + 's');
                        console.log('totalTimeMinutes: ' + totalTimeMinutes + 's');
                        console.log('Total Time: ' + totalTime + 's');
                        console.log('totalTimeSeconds: ' + totalTimeSeconds + 's');

                        console.log("=============== TEST ================================");
                        console.log("=============== TEST ================================");
                        console.log("=============== TEST ================================");

                        // Build results data and push to engagement_results table
                        let resultsRow = {
                          insertId: context.params.observationID,
                          json: {
                              id: context.params.observationID,
                              sessionStart: Math.floor(session.start.toDate() / 1000),
                              sessionEnd: Math.floor(session.end.toDate() / 1000),
                              teacherId: session.teacher,
                              observedBy: session.observedBy,
                              timestamp: Math.floor(session.end.toDate() / 1000),
                              transition_total: totalTimeSeconds,
                              transition_time: totalTransitionTime,
                              learning_activity: learningActivity,
                              transition_type: {
                                waiting_in_line: transitionType[0],
                                traveling: transitionType[1],
                                children_waiting: transitionType[2],
                                classroom_routines: transitionType[3],
                                behavior_management: transitionType[4],
                                other: transitionType[5]
                              }

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

                            }

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
                        // Initialize variables to hold data for the results table
                        // More info about the results database schema and how it relates with the observation results can be found here: https://docs.google.com/document/d/1nM7ZccAGqlPWA-h3rnVtbsBXRD7CheC-msPEHZsEiS0/edit?usp=sharing
                        // Holds teacher results [0] = math; [1] = noMath; [2] = notThere;
                        let teacher = Array(3).fill(0);
                        // Holds child results. [0] = math; [1] = noMath; [2] = noChildOpp;
                        let child = Array(3).fill(0);
                        // Holds results for which checkboxes were clicked [0-3] = child checkboxes; [4-7] = teacher checkboxes;
                        let checklistResults = Array(8).fill(0);
                        var totalVisits = 0;

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
                                        teacherId: session.teacher,
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

                                totalVisits++;

                                // Calculate data for the results table
                                // If no children checkboxes were selected
                                if(entryData.Checked.includes(5))
                                {
                                  // If the first people type is selected
                                  if(entryData.PeopleType == 1){ child[2]++; }
                                  else{ child[1]++; }
                                }
                                else{ child[0]++; }

                                // If no teacher checkboxes were selected
                                if(entryData.Checked.includes(10))
                                {
                                  // If the third people type is selected
                                  if(entryData.PeopleType == 3){ teacher[1]++; }
                                  else{ teacher[2]++; }
                                }
                                else{ teacher[0]++; }

                                if(entryData.Checked.includes(1)){checklistResults[0]++;}
                                if(entryData.Checked.includes(2)){checklistResults[1]++;}
                                if(entryData.Checked.includes(3)){checklistResults[2]++;}
                                if(entryData.Checked.includes(4)){checklistResults[3]++;}
                                if(entryData.Checked.includes(6)){checklistResults[4]++;}
                                if(entryData.Checked.includes(7)){checklistResults[5]++;}
                                if(entryData.Checked.includes(8)){checklistResults[6]++;}
                                if(entryData.Checked.includes(9)){checklistResults[7]++;}


                            }
                        });
                        console.log(rows);

                        // We need to calculate the results and insert them into
                        let resultsRow = {
                          insertId: context.params.observationID,
                          json: {
                              id: context.params.observationID,
                              sessionStart: Math.floor(session.start.toDate() / 1000),
                              sessionEnd: Math.floor(session.end.toDate() / 1000),
                              teacher: session.teacher,
                              observedBy: session.observedBy,
                              timestamp: Math.floor(session.start.toDate() / 1000),
                              total_visits: totalVisits,
                              child: {
                                seq: child[0],
                                noSeq: child[1],
                                noChildOpp: child[2]
                              },
                              teacher: {
                                seq: teacher[0],
                                noSeq: teacher[1],
                                notThere: teacher[2]
                              },
                              checklist: {
                                child1: checklistResults[0],
                                child2: checklistResults[1],
                                child3: checklistResults[2],
                                child4: checklistResults[3],
                                teacher1: checklistResults[4],
                                teacher2: checklistResults[5],
                                teacher3: checklistResults[6],
                                teacher4: checklistResults[7],
                              }

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
            } else if (session.type.toLowerCase() === "listening") {
                let rows=[]
                return firestore.collection(COLLECTION_NAME).doc(SESSION_ID).collection("entries").orderBy('Timestamp').get()
                    .then(entries => {
                        // Initialize variables that will hold data for the results
                        // More info about the results database schema and how it relates with the observation results can be found here: https://docs.google.com/document/d/1nM7ZccAGqlPWA-h3rnVtbsBXRD7CheC-msPEHZsEiS0/edit?usp=sharing
                        let listeningEncouraging = 0, noBehaviors = 0, eyeLevel = 0, positiveExpression = 0, repeatsClarifies = 0, openQuestions = 0, expandsTalk = 0, encourageTalk = 0;
                        let entryId;
                        entries.forEach(entry => {
                            entryId = entry.id;
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

                            // Calculate Results
                            // If nothing was checked
                            if(entryData.Checked.includes(7)){noBehaviors++;}
                            else{listeningEncouraging++;}
                            if(entryData.Checked.includes(1)){eyeLevel++;}
                            if(entryData.Checked.includes(2)){positiveExpression++;}
                            if(entryData.Checked.includes(3)){repeatsClarifies++;}
                            if(entryData.Checked.includes(4)){openQuestions++;}
                            if(entryData.Checked.includes(5)){expandsTalk++;}
                            if(entryData.Checked.includes(6)){encourageTalk++;}
                        });
                        console.log(rows);

                        // We need to calculate the results and insert them into
                        let resultsRow = {
                          insertId: entryId,
                          json: {
                              id: context.params.observationID,
                              sessionStart: Math.floor(session.start.toDate() / 1000),
                              sessionEnd: Math.floor(session.end.toDate() / 1000),
                              teacher: session.teacher,
                              observedBy: session.observedBy,
                              timestamp: Math.floor(session.start.toDate() / 1000),
                              listen_encouraging: listeningEncouraging,
                              no_behaviors: noBehaviors,
                              eye_level: eyeLevel,
                              positive_expression: positiveExpression,
                              repeats_clarifies: repeatsClarifies,
                              open_questions: openQuestions,
                              expands_talk: expandsTalk,
                              encourage_talk: encourageTalk

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
            } else if (session.type.toLowerCase() === "math") {
                let rows=[]
                return firestore.collection(COLLECTION_NAME).doc(SESSION_ID).collection("entries").orderBy('Timestamp').get()
                    .then(entries => {
                        // Initialize variables to hold data for the results table
                        // More info about the results database schema and how it relates with the observation results can be found here: https://docs.google.com/document/d/1nM7ZccAGqlPWA-h3rnVtbsBXRD7CheC-msPEHZsEiS0/edit?usp=sharing
                        // Holds teacher results [0] = math; [1] = noMath; [2] = notThere;
                        let teacher = Array(3).fill(0);
                        // Holds child results. [0] = math; [1] = noMath; [2] = noChildOpp;
                        let child = Array(3).fill(0);
                        // Holds results for which checkboxes were clicked [0-3] = child checkboxes; [4-7] = teacher checkboxes;
                        let checklistResults = Array(8).fill(0);
                        var totalVisits = 0;

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
                                        teacherId: session.teacher,
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

                                totalVisits++;

                                // Calculate data for the results table
                                // If no children checkboxes were selected
                                if(entryData.Checked.includes(5))
                                {
                                  // If the first people type is selected
                                  if(entryData.PeopleType == 1){ child[2]++; }
                                  else{ child[1]++; }
                                }
                                else{ child[0]++; }

                                // If no teacher checkboxes were selected
                                if(entryData.Checked.includes(10))
                                {
                                  // If the third people type is selected
                                  if(entryData.PeopleType == 3){ teacher[1]++; }
                                  else{ teacher[2]++; }
                                }
                                else{ teacher[0]++; }

                                if(entryData.Checked.includes(1)){checklistResults[0]++;}
                                if(entryData.Checked.includes(2)){checklistResults[1]++;}
                                if(entryData.Checked.includes(3)){checklistResults[2]++;}
                                if(entryData.Checked.includes(4)){checklistResults[3]++;}
                                if(entryData.Checked.includes(6)){checklistResults[4]++;}
                                if(entryData.Checked.includes(7)){checklistResults[5]++;}
                                if(entryData.Checked.includes(8)){checklistResults[6]++;}
                                if(entryData.Checked.includes(9)){checklistResults[7]++;}
                            }
                        });
                        console.log(rows);

                        // We need to calculate the results and insert them into
                        let resultsRow = {
                          insertId: context.params.observationID,
                          json: {
                              id: context.params.observationID,
                              sessionStart: Math.floor(session.start.toDate() / 1000),
                              sessionEnd: Math.floor(session.end.toDate() / 1000),
                              teacher: session.teacher,
                              observedBy: session.observedBy,
                              timestamp: Math.floor(session.start.toDate() / 1000),
                              total_visits: totalVisits,
                              child: {
                                math: child[0],
                                noMath: child[1],
                                noChildOpp: child[2]
                              },
                              teacher: {
                                math: teacher[0],
                                noMath: teacher[1],
                                notThere: teacher[2]
                              },
                              checklist: {
                                child1: checklistResults[0],
                                child2: checklistResults[1],
                                child3: checklistResults[2],
                                child4: checklistResults[3],
                                teacher1: checklistResults[4],
                                teacher2: checklistResults[5],
                                teacher3: checklistResults[6],
                                teacher4: checklistResults[7],
                              }

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
            } else if (session.type === "LI" && session.checklist === "FoundationalTeacher") {
              let rows=[];
              console.log(`Processing a foundational teacher literacy instruction observation`);
              return firestore.collection(COLLECTION_NAME).doc(SESSION_ID).collection("entries").orderBy('Timestamp').get()
                  .then(entries => {
                      // Initialize variables to hold data for results table
                      var foundationalSkills = 0, noBehaviors = 0, rhyming = 0, individualSounds = 0, alphabet = 0, letterSound = 0, supportingChildren = 0, printConcepts = 0, matchingSpokenWords = 0, realisticReading = 0, openEndedQuestions = 0, awareness = 0, alphabetic = 0, openEnded = 0, realisticReadingBehavior = 0, multimodal = 0, multiModalInstruction = 0;

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

                          // Calculate data for results table
                          // If nothing was checked
                          if(entryData.Checked.includes(11)){noBehaviors++;}
                          else{foundationalSkills++;}
                          if(entryData.Checked.includes(1)){rhyming++; awareness++;}
                          if(entryData.Checked.includes(2)){individualSounds++; awareness++;}
                          if(entryData.Checked.includes(3)){alphabet++; alphabetic++;}
                          if(entryData.Checked.includes(4)){letterSound++; alphabetic++;}
                          if(entryData.Checked.includes(5)){supportingChildren++; alphabetic++;}
                          if(entryData.Checked.includes(6)){printConcepts++; alphabetic++;}
                          if(entryData.Checked.includes(7)){matchingSpokenWords++; alphabetic++;}
                          if(entryData.Checked.includes(8)){realisticReading++; openEnded++;}
                          if(entryData.Checked.includes(9)){openEndedQuestions++; realisticReadingBehavior++;}
                          if(entryData.Checked.includes(10)){multiModalInstruction++; multimodal++;}

                      });
                      console.log(rows);

                      // We need to insert results into table
                      let resultsRow = {
                        insertId: context.params.observationID,
                        json: {
                            id: context.params.observationID,
                            sessionStart: Math.floor(session.start.toDate() / 1000),
                            sessionEnd: Math.floor(session.end.toDate() / 1000),
                            teacherId: session.teacher,
                            observedBy: session.observedBy,
                            timestamp: Math.floor(session.start.toDate() / 1000),
                            foundational_skills: foundationalSkills,
                            no_behaviors: noBehaviors,
                            rhyming: rhyming,
                            individual_sounds: individualSounds,
                            alphabet: alphabet,
                            letter_sound: letterSound,
                            supporting_children: supportingChildren,
                            print_concepts: printConcepts,
                            matching_spoken_words: matchingSpokenWords,
                            realistic_reading: realisticReading,
                            open_ended_questions: openEndedQuestions,
                            activity_setting: session.activitySetting,
                            multi_modal_instruction: multiModalInstruction,
                            behavior_type: {
                              awareness: awareness,
                              alphabetic: alphabetic,
                              open_ended: openEnded,
                              realistic_reading: realisticReadingBehavior,
                              multimodal: multimodal,
                            }

                        }
                      }


                      resultsTable.insert(resultsRow, { raw: true, skipInvalidRows: true }).catch(err => {
                          console.error(`table.insert: ${JSON.stringify(err)}`);
                      });

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
                      // Initialize variables to hold data for results table
                      var foundationalSkills = 0, noBehaviors = 0, rhyming = 0, individualSounds = 0, alphabet = 0, letterSound = 0, supportingChildren = 0, printConcepts = 0, matchingSpokenWords = 0, realisticReading = 0, openEndedQuestions = 0, awareness = 0, alphabetic = 0, openEnded = 0, realisticReadingBehavior = 0, multimodal = 0;

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

                              // Calculate data for results table
                              // If nothing was checked
                              if(entryData.Checked.includes(10)){noBehaviors++;}
                              else{foundationalSkills++;}
                              if(entryData.Checked.includes(1)){rhyming++; awareness++;}
                              if(entryData.Checked.includes(2)){individualSounds++; awareness++;}
                              if(entryData.Checked.includes(3)){alphabet++; alphabetic++;}
                              if(entryData.Checked.includes(4)){letterSound++; alphabetic++;}
                              if(entryData.Checked.includes(5)){supportingChildren++; alphabetic++;}
                              if(entryData.Checked.includes(6)){printConcepts++; alphabetic++;}
                              if(entryData.Checked.includes(7)){matchingSpokenWords++; alphabetic++;}
                              if(entryData.Checked.includes(8)){realisticReading++; openEnded++;}
                              if(entryData.Checked.includes(9)){openEndedQuestions++; realisticReadingBehavior++;}
                          }
                      });
                      console.log(`Inserting ${rows.length} rows`);

                      // We need to insert results into table
                      let resultsRow = {
                        insertId: context.params.observationID,
                        json: {
                            id: context.params.observationID,
                            sessionStart: Math.floor(session.start.toDate() / 1000),
                            sessionEnd: Math.floor(session.end.toDate() / 1000),
                            teacherId: session.teacher,
                            observedBy: session.observedBy,
                            timestamp: Math.floor(session.start.toDate() / 1000),
                            foundational_skills: foundationalSkills,
                            no_behaviors: noBehaviors,
                            rhyming: rhyming,
                            individual_sounds: individualSounds,
                            alphabet: alphabet,
                            letter_sound: letterSound,
                            supporting_children: supportingChildren,
                            print_concepts: printConcepts,
                            matching_spoken_words: matchingSpokenWords,
                            realistic_reading: realisticReading,
                            open_ended_questions: openEndedQuestions,
                            activity_setting: session.activitySetting,
                            behavior_type: {
                              awareness: awareness,
                              alphabetic: alphabetic,
                              open_ended: openEnded,
                              realistic_reading: realisticReadingBehavior,
                            }

                        }
                      }


                      resultsTable.insert(resultsRow, { raw: true, skipInvalidRows: true }).catch(err => {
                          console.error(`table.insert: ${JSON.stringify(err)}`);
                      });


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
                      var intervalTotal = 0, supportedWriting = 0, otherBehaviors = 0, writingContent = 0, printProcess = 0, talksAboutContent = 0, invitesWritingMessage = 0, writesMeaningfulMessage = 0, demonstratesPrintProcess = 0, invitesWritingName = 0, positiveResponseWriting = 0, supportsInventiveSpelling = 0, invitesReadingMessage = 0;

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
                                        teacherId: session.teacher,
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

                                // Update interval count
                                intervalTotal++;

                                // Calculate results data
                                // If nothing is checked
                                if(entryData.Checked.includes(9)){otherBehaviors++;}
                                else{supportedWriting++;}

                                if(entryData.Checked.includes(1)){talksAboutContent++; writingContent++;}
                                if(entryData.Checked.includes(2)){invitesWritingMessage++; writingContent++;}
                                if(entryData.Checked.includes(3)){writesMeaningfulMessage++; writingContent++;}
                                if(entryData.Checked.includes(4)){demonstratesPrintProcess++; printProcess++;}
                                if(entryData.Checked.includes(5)){invitesWritingName++; printProcess++;}
                                if(entryData.Checked.includes(6)){positiveResponseWriting++; printProcess++;}
                                if(entryData.Checked.includes(7)){supportsInventiveSpelling++; printProcess++;}
                                if(entryData.Checked.includes(8)){invitesReadingMessage++; printProcess++;}
                            }
                        });
                        console.log(rows);

                        // We need to insert results into table
                        let resultsRow = {
                          insertId: context.params.observationID,
                          json: {
                              id: context.params.observationID,
                              sessionStart: Math.floor(session.start.toDate() / 1000),
                              sessionEnd: Math.floor(session.end.toDate() / 1000),
                              teachId: session.teacher,
                              observedBy: session.observedBy,
                              timestamp: Math.floor(session.start.toDate() / 1000),
                              activity_setting: session.activitySetting,
                              interval_total: intervalTotal,
                              supported_writing: supportedWriting,
                              other_behaviors: otherBehaviors,
                              behavior_type: {
                                writing_content: writingContent,
                                print_process: printProcess
                              },
                              talks_about_content: talksAboutContent,
                              invites_writing_message: invitesWritingMessage,
                              writes_meaningful_message: writesMeaningfulMessage,
                              demonstrates_print_process: demonstratesPrintProcess,
                              invites_writing_name: invitesWritingName,
                              positive_response_writing: positiveResponseWriting,
                              supports_inventive_spelling: supportsInventiveSpelling,
                              invites_reading_message: invitesReadingMessage

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
              } else if (session.type === "LI" && session.checklist === "WritingChild") {
                let rows=[]
                return firestore.collection(COLLECTION_NAME).doc(SESSION_ID).collection("entries").orderBy('Timestamp').get()
                    .then(entries => {
                        // Initialize variables to hold data for results table
                        var intervalTotal = 0, supportedWriting = 0, otherBehaviors = 0, writingContent = 0, printProcess = 0, talksContentMeaning = 0, drawsMeaning = 0, makesForms = 0, saysMessageAloud = 0, writesNameLetters = 0, usesAlphabetKnowledge = 0, spellingsCount = 0, readsMessage = 0;

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

                                // Update interval count
                                intervalTotal++;

                                // Calculate results data
                                // If nothing is checked
                                if(entryData.Checked.includes(9)){otherBehaviors++;}
                                else{supportedWriting++;}

                                if(entryData.Checked.includes(1)){talksContentMeaning++; writingContent++;}
                                if(entryData.Checked.includes(2)){drawsMeaning++; writingContent++;}
                                if(entryData.Checked.includes(3)){makesForms++; writingContent++;}
                                if(entryData.Checked.includes(4)){saysMessageAloud++; printProcess++;}
                                if(entryData.Checked.includes(5)){writesNameLetters++; printProcess++;}
                                if(entryData.Checked.includes(6)){usesAlphabetKnowledge++; printProcess++;}
                                if(entryData.Checked.includes(7)){spellingsCount++; printProcess++;}
                                if(entryData.Checked.includes(8)){readsMessage++; printProcess++;}
                            }
                        });
                        console.log(rows);

                        // We need to insert results into table
                        let resultsRow = {
                          insertId: context.params.observationID,
                          json: {
                              id: context.params.observationID,
                              sessionStart: Math.floor(session.start.toDate() / 1000),
                              sessionEnd: Math.floor(session.end.toDate() / 1000),
                              teachId: session.teacher,
                              observedBy: session.observedBy,
                              timestamp: Math.floor(session.start.toDate() / 1000),
                              activity_setting: session.activitySetting,
                              interval_total: intervalTotal,
                              supported_writing: supportedWriting,
                              other_behaviors: otherBehaviors,
                              behavior_type: {
                                writing_content: writingContent,
                                print_process: printProcess
                              },
                              talks_content_meaning: talksContentMeaning,
                              draws_meaning: drawsMeaning,
                              makes_forms: makesForms,
                              says_message_aloud: saysMessageAloud,
                              writes_name_letters: writesNameLetters,
                              uses_alphabet_knowledge: usesAlphabetKnowledge,
                              spellings: spellingsCount,
                              reads_message: readsMessage

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
              } else if (session.type === "LI" && session.checklist === "LanguageTeacher") {
                let rows=[]
                return firestore.collection(COLLECTION_NAME).doc(SESSION_ID).collection("entries").orderBy('Timestamp').get()
                    .then(entries => {
                        var intervalTotal = 0, supportingDevelopment = 0, noBehaviors = 0, vocabSocial = 0, encourageTalk = 0, respondCount = 0, discussingVocab = 0, converseEmotions = 0, encouragingStorytelling = 0, encouragingListening = 0, askingOpenQuestions = 0, enterChildrensActivity = 0, clarifyingComments = 0, followUpQuestions = 0;
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

                                // Increase number of intervals
                                intervalTotal++;

                                // If nothing was selected
                                if(entryData.Checked.includes(9)){noBehaviors++;}
                                else {supportingDevelopment++;}

                                if(entryData.Checked.includes(1)){discussingVocab++; vocabSocial++;}
                                if(entryData.Checked.includes(2)){converseEmotions++; vocabSocial++;}
                                if(entryData.Checked.includes(3)){encouragingStorytelling++; encourageTalk++;}
                                if(entryData.Checked.includes(4)){encouragingListening++; encourageTalk++;}
                                if(entryData.Checked.includes(5)){askingOpenQuestions++; encourageTalk++;}
                                if(entryData.Checked.includes(6)){enterChildrensActivity++; respondCount++;}
                                if(entryData.Checked.includes(7)){clarifyingComments++; respondCount++;}
                                if(entryData.Checked.includes(8)){followUpQuestions++; respondCount++;}
                            }
                        });
                        console.log(rows);

                        // We need to insert results into table
                        let resultsRow = {
                          insertId: context.params.observationID,
                          json: {
                              id: context.params.observationID,
                              sessionStart: Math.floor(session.start.toDate() / 1000),
                              sessionEnd: Math.floor(session.end.toDate() / 1000),
                              teacherId: session.teacher,
                              observedBy: session.observedBy,
                              timestamp: Math.floor(session.start.toDate() / 1000),
                              activity_setting: session.activitySetting,
                              interval_total: intervalTotal,
                              supporting_development: supportingDevelopment,
                              no_behaviors: noBehaviors,
                              behavior_type: {
                                vocab_social: vocabSocial,
                                encourage_talk: encourageTalk,
                                respond: respondCount,
                              },
                              discussing_vocab: discussingVocab,
                              converse_emotions: converseEmotions,
                              encouraging_storytelling: encouragingStorytelling,
                              encouraging_listening: encouragingListening,
                              asking_open_questions: askingOpenQuestions,
                              enter_childrens_activity: enterChildrensActivity,
                              clarifying_comments: clarifyingComments,
                              follow_up_questions: followUpQuestions

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
              } else if (session.type === "LI" && session.checklist === "ReadingTeacher") {
                let rows=[]
                return firestore.collection(COLLECTION_NAME).doc(SESSION_ID).collection("entries").orderBy('Timestamp').get()
                    .then(entries => {
                        // Initialize variables to hold data for results table
                        var intervalTotal = 0, readingInstruction = 0, otherBehaviors = 0, vocabFocus = 0, languageConnections = 0, childrenSupport = 0, fairnessDiscussions = 0, multimodalInstruction = 0, discussingVocab = 0, discussingTextConcepts = 0, encourageSummarizing = 0, relatingBooks = 0, languageConnections = 0, openEndedQuestions = 0, followUpQuestions = 0, encourageListening = 0, discussingFairness = 0, usingMultimodalInstruction = 0;

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

                                // Calculate data that will go to the results table
                                // If there was nothing checked
                                if(entryData.Checked.includes(11)){otherBehaviors++;}
                                else{readingInstruction++;}

                                if(entryData.Checked.includes(1)){discussingVocab++; vocabFocus++;}
                                if(entryData.Checked.includes(2)){discussingTextConcepts++; vocabFocus++;}
                                if(entryData.Checked.includes(3)){encourageSummarizing++; vocabFocus++;}
                                if(entryData.Checked.includes(4)){relatingBooks++; languageConnections++;}
                                if(entryData.Checked.includes(5)){languageConnections++; languageConnections++;}
                                if(entryData.Checked.includes(6)){openEndedQuestions++; childrenSupport++;}
                                if(entryData.Checked.includes(7)){followUpQuestions++; childrenSupport++;}
                                if(entryData.Checked.includes(8)){encourageListening++; childrenSupport++;}
                                if(entryData.Checked.includes(9)){discussingDairness++; fairnessDiscussions++;}
                                if(entryData.Checked.includes(10)){usingMultimodalInstruction++; multimodalInstruction++;}
                            }

                            // Increase number of intervals
                            intervalTotal++;
                        });
                        console.log(rows);

                        // We need to insert results into table
                        let resultsRow = {
                          insertId: context.params.observationID,
                          json: {
                              id: context.params.observationID,
                              sessionStart: Math.floor(session.start.toDate() / 1000),
                              sessionEnd: Math.floor(session.end.toDate() / 1000),
                              teacherId: session.teacher,
                              observedBy: session.observedBy,
                              timestamp: Math.floor(session.start.toDate() / 1000),
                              interval_total: intervalTotal,
                              activity_setting: 2,
                              activity_setting2: session.activitySetting,
                              reading_instruction: readingInstruction,
                              other_behaviors: otherBehaviors,
                              behavior_type: {
                                vocab_focus: vocabFocus,
                                language_connections: languageConnections,
                                children_support: childrenSupport,
                                fairness_discussions: fairnessDiscussions,
                                multimodal_instruction: multimodalInstruction
                              },
                              discussing_vocab: discussingVocab,
                              discussing_text_concepts: discussingTextConcepts,
                              encourage_summarizing: encourageSummarizing,
                              relating_books: relatingBooks,
                              language_connections: languageConnections,
                              open_ended_questions: openEndedQuestions,
                              follow_up_questions: followUpQuestions,
                              encourage_listening: encourageListening,
                              discussing_fairness: discussingFairness,
                              using_multimodal_instruction: usingMultimodalInstruction

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
