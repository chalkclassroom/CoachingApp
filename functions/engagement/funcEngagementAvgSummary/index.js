// Imports the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');
const functions = require("firebase-functions");

// Creates a client
const bigquery = new BigQuery();

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

exports.funcEngagementAvgSummary = functions.https.onCall(async(data, context) => {
  const sqlQuery = `SELECT AVG(point) AS average FROM cqrefpwa.observations.engagement WHERE id = '`+req.query.id+`' AND point = 0 OR point = 1 OR point = 2 OR point = 3`;

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