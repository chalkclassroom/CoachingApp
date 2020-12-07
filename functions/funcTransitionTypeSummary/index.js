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
exports.funcTransitionTypeSummary = functions.https.onCall(async (data, context) => {
  //let message = req.query.message || req.body.message || 'Hello World!';
  console.log(context.auth.uid);
  console.log(data.teacherId);
  // The SQL query to run
  const sqlQuery =
        `SELECT
      SUM(CASE WHEN type = 'waiting' THEN TIMESTAMP_DIFF(transitionEnd ,transitionStart, millisecond) ELSE 0 END) AS line,
      SUM(CASE WHEN type = 'traveling' THEN TIMESTAMP_DIFF(transitionEnd ,transitionStart, millisecond) ELSE 0 END) AS traveling,
      SUM(CASE WHEN type = 'child waiting' THEN TIMESTAMP_DIFF(transitionEnd ,transitionStart, millisecond) ELSE 0 END) AS waiting,
      SUM(CASE WHEN type = 'classroom routines' THEN TIMESTAMP_DIFF(transitionEnd ,transitionStart, millisecond) ELSE 0 END) AS routines,
      SUM(CASE WHEN type = 'behavior management disruption' THEN TIMESTAMP_DIFF(transitionEnd ,transitionStart, millisecond) ELSE 0 END) AS behaviorManagement,
      SUM(CASE WHEN type = 'other' THEN TIMESTAMP_DIFF(transitionEnd ,transitionStart, millisecond) ELSE 0 END) AS other,
	  SUM(TIMESTAMP_DIFF(transitionEnd, transitionStart, millisecond)) AS total,
      FROM cqrefpwa.observations.transition
      WHERE id = '`+data.sessionId+`'
	  LIMIT 100;`;

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

