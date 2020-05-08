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
exports.funcTransitionSessionSummary = functions.https.onCall(async (data, context) => {
  //let message = req.query.message || req.body.message || 'Hello World!';
  console.log(context.auth.uid);  
  console.log(data.teacherId);
  // The SQL query to run
  const sqlQuery = `SELECT DATE(sessionStart) AS startDate,
                      SUM(CASE WHEN (TIMESTAMP_DIFF(transitionEnd, transitionStart, millisecond) >= 60000) THEN (TIMESTAMP_DIFF(transitionEnd ,transitionStart, millisecond)) ELSE 0 END) AS total,
                      MAX(TIMESTAMP_DIFF(sessionEnd ,sessionStart, millisecond)) AS sessionTotal
                    FROM cqrefpwa.observations.transition
                    WHERE id = '`+data.sessionId+`'
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
