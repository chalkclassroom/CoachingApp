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



exports.funcAddToTransferLogsOnUpdate = functions.firestore
    .document("/{collectionName}/{docId}")
    .onUpdate( async (change, context) => {
      console.log("================== funcAddToTransferLogsOnUpdate ==========================")

      const newValue = change.after.data();
      const previousValue = change.before.data();

      console.log("previousValue => ", previousValue);
      console.log("newValue => ", newValue);

      var collectionName = context.params.collectionName;

      var currDate = new Date();

      var docIdToUpdate;

      // If it's a coach, we are changing sites or programs
      if(newValue['role'] === "coach")
      {
        // Make sure we're changing sites or programs and nothing else
        var newSites, previousSites;
        if( !(newValue['sites']) || newValue['sites'].filter(x => x !== "") === previousValue['sites'])
        {
          return null;
        }
        else
        {
          newSites = newValue['sites'].filter(x => x !== ""); // Remove any empty ones
          previousSites = previousValue['sites'].filter(x => x !== "");
        }

        // Get the sites that we are being removed from (in the old values but not the new)
        var sitesToRemove = previousSites.filter(x => !(newSites.includes(x)) );

        // Get the sites that we are being added from (in the new values but not the old)
        var sitesToAdd = newSites.filter(x => !(previousSites.includes(x)) );


        // Add sites to the log
        for(var siteIndex in sitesToAdd)
        {
          var siteId = sitesToAdd[siteIndex];
          await addToTransferLog("sites", siteId, "coach", newValue['id'], "in", currDate);

        }
        for(var siteIndex in sitesToRemove)
        {
          var siteId = sitesToRemove[siteIndex];
          await addToTransferLog("sites", siteId, "coach", newValue['id'], "out", currDate);
        }

      }


      // If it's a teacher, we are changing teachers, sites (teacher will be handled in funcAddToTransferLogsOnPartnerCreate() )
      if(newValue['role'] === "teacher")
      {
        // Make sure we're changing site
        if( !(newValue['school']) || ( newValue['school'] === previousValue['school'] ) || !(newValue['programId']) || ( newValue['programId'] === previousValue['programId'] ))
        {
          return null;
        }

        // If we're changing site
        if(newValue['school'] ||  newValue['school'] !== previousValue['school'] )
        {
          var newSiteName = newValue['school'];
          var previousSiteName = previousValue['school'];

          // Set log in the site that we're joining
          await firestore.collection("sites").where('name', '==', newSiteName)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            addToTransferLog("sites", doc.data().id, "teacher", newValue['id'], "in", currDate);

                            // Add the previous site to the program's logs as well (so Program profile knows about them)
                            if(newValue['programId'])
                            {
                              addToTransferLog("programs", newValue['programId'], "teacherSite", doc.data().id, "in", currDate);
                            }
                        });
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });


          // Set log in the site that we're leaving
          await firestore.collection("sites").where('name', '==', previousSiteName)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            addToTransferLog("sites", doc.data().id, "teacher", previousValue['id'], "out", currDate);

                            // Add the previous site to the program's logs as well (so Program profile knows about them)
                            if(previousValue['programId'])
                            {
                              addToTransferLog("programs", previousValue['programId'], "teacherSite", doc.data().id, "out", currDate);
                            }

                        });
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });
        }


        // If we're changing Program
        if(newValue['programId'] || newValue['programId'] !== previousValue['programId'] )
        {
          console.log("PROGRAM ID");
          // Set log in the site that we're joining
          addToTransferLog("programs", newValue['programId'], "teacher", newValue['id'], "in", currDate);

          // Set log in the site that we're leaving
          if(previousValue['programId'])
          {
            console.log("THERE'S A PROGRAM ID : ", previousValue['programId']);
            addToTransferLog("programs", previousValue['programId'], "teacher", newValue['id'], "out", currDate);
          }
          else
          {
            console.log("NOPE : ", previousValue);
          }
        }

      }

      console.log("collectionName ", collectionName);
      console.log("role ", newValue['role']);
      console.log("============================================");

      return null;
    });


// Set logs when teacher is transfered.
exports.funcAddToTransferLogsOnPartnerCreate = functions.firestore
    .document("/users/{userId}/partners/{partnerId}")
    .onWrite( async (change, context) => {
      const newValue = change.after.data();
      const previousValue = change.before.data();

      // Check to see if we're adding or removing user from coach
      var inOrOut = "out";
      if(newValue)
      {
        inOrOut = "in";
      }

      var currDate = new Date();

      await addToTransferLog("users", context.params.userId, "teacher", context.params.partnerId, inOrOut, currDate)

      console.log("==================== funcAddToTransferLogsOnPartnerCreate ========================")
      console.log("New VALUE ", newValue);
      console.log("previousValue ", previousValue);
      console.log("userId : ", context.params.userId);
      console.log("partnerId : ", context.params.partnerId);
      console.log("============================================");

      return null;
    });




// Function to add log
const addToTransferLog = async (collectionToUpdate, docId, transferType, transferId, inOrOut, timeStamp) => {
  firestore.collection(collectionToUpdate).doc(docId).collection("transferLogs").doc().set(
    {
      type: transferType,
      id: transferId,
      inOrOut: inOrOut,
      time: timeStamp,
    }
  )
  .catch((error) => {
    console.error("Error occurred when updating " + docType + "'s transfer logs.", error)
  });
}
