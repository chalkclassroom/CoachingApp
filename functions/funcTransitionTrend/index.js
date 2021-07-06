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
exports.funcBehaviourTrend = functions.https.onCall(async (data, context) => {
  //let message = req.query.message || req.body.message || 'Hello World!';
  console.log(context.auth.uid);
  console.log(data.teacherId);
  if (!await canAccessTeacher(data.teacherId, context.auth.uid)){
    return [];
  }else{
    console.log(`User ${context.auth.uid} can access teacher ${data.teacherId}`)
  }
  // The SQL query to run
  const sqlQuery = `SELECT DATE(sessionStart) AS startDate,
      SUM(CASE WHEN type = 'inside' THEN TIMESTAMP_DIFF(transitionEnd ,transitionStart, millisecond) ELSE 0 END) AS inside,
      SUM(CASE WHEN type = 'outside' THEN TIMESTAMP_DIFF(transitionEnd ,transitionStart, millisecond) ELSE 0 END) AS outside,
      SUM(TIMESTAMP_DIFF(transitionEnd ,transitionStart, millisecond)) AS total,
      SUM(TIMESTAMP_DIFF(sessionEnd ,sessionStart, millisecond)) AS sessionTotal
      FROM cqrefpwa.observations.transition
      WHERE teacher = '/user/${data.teacherId}' AND observedBy = '/user/${context.auth.uid}'
      GROUP BY startDate
      ORDER BY startDate ASC
	  LIMIT 100;`;

  console.log(sqlQuery);

  const options = {
    query: sqlQuery,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
  };

  // Runs the query
  return await bigquery.query(options)
});
