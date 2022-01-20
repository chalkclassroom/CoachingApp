// Imports the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');
const functions = require("firebase-functions");
const { canAccessObservation } = require('../common/accessUtils')

// Creates a client
const bigquery = new BigQuery();

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

exports.funcChildACSummary = functions.https.onCall(async (data, context) => {
  //SQL query to get number of checks for each item on checklist
  if (!await canAccessObservation(data.sessionId, context.auth.uid)){
    return [];
  }else{
    console.log(`User ${context.auth.uid} can access observation ${data.sessionId}`)
  }
  const sqlQuery = `SELECT
                    COUNT(CASE WHEN (peopleType = 1) THEN 'noOpportunity' ELSE NULL END) AS noOpportunity,
                    COUNT(CASE WHEN (peopleType = 2 OR peopleType = 3 OR peopleType = 4) AND (checklist.child1 OR checklist.child2 OR checklist.child3 OR checklist.child4) THEN 'ac' ELSE NULL END) AS ac,
                    COUNT(CASE WHEN (peopleType = 2 OR peopleType = 3 OR peopleType = 4) AND (checklist.child5) THEN 'noac' ELSE NULL END) AS noac
                    FROM ${process.env.BQ_PROJECT_ID}.${process.env.BQ_DATASET}.ac
                    WHERE id ='`+data.sessionId+`'`;

  console.log(sqlQuery);

  const options = {
    query: sqlQuery,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
  };

  const [job] = await bigquery.createQueryJob(options);
  console.log(`Job ${job.id} started.`);

  const rows = await job.getQueryResults();
  console.log(rows);
  return rows;
});
