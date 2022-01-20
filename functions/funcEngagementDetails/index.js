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

exports.funcEngagementDetails = functions.https.onCall(async(data, context) => {
  //SQL query to get number of checks for each item on checklist
  if (!await canAccessObservation(data.sessionId, context.auth.uid)){
    return [];
  }else{
    console.log(`User ${context.auth.uid} can access observation ${data.sessionId}`)
  }
  const sqlQuery = `SELECT
  COUNT(CASE WHEN (point = 0 AND entryType='small')  THEN 'offTask' ELSE NULL END) AS offTask0,
  COUNT(CASE WHEN (point = 0 AND entryType='whole')  THEN 'offTask' ELSE NULL END) AS offTask1,
  COUNT(CASE WHEN (point = 0 AND entryType='transition')  THEN 'offTask' ELSE NULL END) AS offTask2,
  COUNT(CASE WHEN (point = 0 AND entryType='centers') THEN 'offTask' ELSE NULL END) AS offTask3,
  COUNT(CASE WHEN (point = 1 AND entryType='small')  THEN 'offTask' ELSE NULL END) AS mildlyEngaged0,
  COUNT(CASE WHEN (point = 1 AND entryType='whole')  THEN 'offTask' ELSE NULL END) AS mildlyEngaged1,
  COUNT(CASE WHEN (point = 1 AND entryType='transition')  THEN 'offTask' ELSE NULL END) AS mildlyEngaged2,
  COUNT(CASE WHEN (point = 1 AND entryType='centers') THEN 'offTask' ELSE NULL END) AS mildlyEngaged3,
  COUNT(CASE WHEN (point = 2 AND entryType='small')  THEN 'offTask' ELSE NULL END) AS engaged0,
  COUNT(CASE WHEN (point = 2 AND entryType='whole')  THEN 'offTask' ELSE NULL END) AS engaged1,
  COUNT(CASE WHEN (point = 2 AND entryType='transition')  THEN 'offTask' ELSE NULL END) AS engaged2,
  COUNT(CASE WHEN (point = 2 AND entryType='centers') THEN 'offTask' ELSE NULL END) AS engaged3,
  COUNT(CASE WHEN (point = 3 AND entryType='small')  THEN 'offTask' ELSE NULL END) AS highlyEngaged0,
  COUNT(CASE WHEN (point = 3 AND entryType='whole')  THEN 'offTask' ELSE NULL END) AS highlyEngaged1,
  COUNT(CASE WHEN (point = 3 AND entryType='transition')  THEN 'offTask' ELSE NULL END) AS highlyEngaged2,
  COUNT(CASE WHEN (point = 3 AND entryType='centers')  THEN 'offTask' ELSE NULL END) AS highlyEngaged3,
  FROM ${process.env.BQ_PROJECT_ID}.observations.engagement
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
