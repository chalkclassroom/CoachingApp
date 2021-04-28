// Imports the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');
const functions = require("firebase-functions");
const { canAccessTeacher } = require('../common/accessUtils')

// Creates a client
const bigquery = new BigQuery();

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.funcEngagementTrend = functions.https.onCall(async(data, context) => {
  //SQL query to get engagement trends
  if (!await canAccessTeacher(data.teacherId, context.auth.uid)){
    return [];
  }else{
    console.log(`User ${context.auth.uid} can access teacher ${data.teacherId}`)
  }
  const sqlQuery = `SELECT DATE(sessionStart) AS startDate,
  AVG(point) AS average  
  FROM cqrefpwa.observations.engagement
  WHERE (teacher = '/user/${data.teacherId}'
  AND observedBy = '/user/${context.auth.uid}')
  AND (point =0 OR point = 1 OR point = 2 OR point = 3)
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
