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
exports.funcEngagementTrends = functions.https.onCall(async(data, context) => {
  //SQL query to get engagement trends for AC
  const sqlQuery = `SELECT DATE(sessionStart) AS startDate,
  COUNT(CASE WHEN (point = 0) THEN 'offTask' ELSE NULL END) AS offTask,
  COUNT(CASE WHEN (point = 1) THEN 'mildlyEngaged' ELSE NULL END) AS mildlyEngaged,
  COUNT(CASE WHEN (point = 2) THEN 'engaged' ELSE NULL END) AS engaged,
  COUNT(CASE WHEN (point = 3) THEN 'highlyEngaged' ELSE NULL END) AS highlyEngaged,
  FROM cqrefpwa.observations.engagement
  WHERE teacher = '`+req.query.id+`'
  GROUP BY startDate
  ORDER BY startDate ASC`;
  
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