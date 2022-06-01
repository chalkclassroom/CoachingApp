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

exports.funcChildMathSummary = functions.https.onCall(async (data, context) => {
  //SQL query to get number of checks for each item on checklist
  if (!await canAccessObservation(data.sessionId, context.auth.uid)){
    return [];
  }else{
    console.log(`User ${context.auth.uid} can access observation ${data.sessionId}`)
  }
  const sqlQuery = `SELECT
                    COUNT(CASE WHEN (checklist.child1 OR checklist.child2 OR checklist.child3 OR checklist.child4) THEN 'math' ELSE NULL END) AS math,
                    COUNT(CASE WHEN (checklist.child5) THEN 'notMath' ELSE NULL END) AS notMath
                    FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.math
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

