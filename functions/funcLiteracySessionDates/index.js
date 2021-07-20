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
exports.funcLiteracySessionDates = functions.https.onCall(async (data, context) => {
  //let message = req.query.message || req.body.message || 'Hello World!';
  console.log(context.auth.uid);
  console.log(data.teacherId);
  // The SQL query to run
  let sqlQuery = ``;
  if (data.type === 'Foundational' || data.type === 'Writing') {
    sqlQuery = `SELECT DISTINCT id, sessionStart, who FROM (SELECT DISTINCT id, sessionStart, observedBy, teacher, 'Teacher' AS who FROM cqrefpwa.observations.literacy${data.type}Teacher
    UNION ALL SELECT DISTINCT id, sessionStart, observedBy, teacher, 'Child' as who FROM cqrefpwa.observations.literacy${data.type}Child)
    WHERE observedBy = @coach AND teacher = @teacher 
    ORDER BY sessionStart DESC LIMIT 100;`
  } else {
    sqlQuery = `SELECT DISTINCT id, sessionStart, observedBy, teacher, 'Teacher' AS who FROM cqrefpwa.observations.literacy${data.type}Teacher
    WHERE observedBy = @coach AND teacher = @teacher 
    ORDER BY sessionStart DESC LIMIT 100;`
  }

  console.log(sqlQuery);

  const options = {
    query: sqlQuery,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
    params: {coach: '/user/' + context.auth.uid, teacher: '/user/' + data.teacherId}
  };

  const [job] = await bigquery.createQueryJob(options);
  console.log(`Job ${job.id} started.`);
  const rows = await job.getQueryResults();
  console.log(rows);
  return rows;
});