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

exports.funcTeacherSeqSummary = functions.https.onCall(async(data, context) => {
  //SQL query to return count of teacher summary
  if (!await canAccessObservation(data.sessionId, context.auth.uid)){
    return [];
  }else{
    console.log(`User ${context.auth.uid} can access observation ${data.sessionId}`)
  }
  const sqlQuery = `SELECT
					COUNT(CASE WHEN (peopleType = 1 OR peopleType = 2) THEN 'noOpportunity' ELSE NULL END) AS noOpportunity,
                    COUNT(CASE WHEN (peopleType = 3) AND (checklist.teacher1 OR checklist.teacher2 OR checklist.teacher3 OR checklist.teacher4) THEN 'support' ELSE NULL END) AS support,
                    COUNT(CASE WHEN (peopleType = 3) AND (checklist.teacher5) THEN 'noSupport' ELSE NULL END) AS noSupport
                    FROM cqrefpwa.observations.sequential
                    WHERE id ='${data.sessionId}'`;

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
