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
exports.funcTeacherMathTrend = functions.https.onCall(async(data, context) => {
  //SQL query to get child trends for AC
  const sqlQuery = `SELECT DATE(sessionStart) AS startDate,
                    COUNT(CASE WHEN (peopleType = 1 OR peopleType = 2) THEN 'noOpportunity' ELSE NULL END) AS noOpportunity,
                    COUNT(CASE WHEN (peopleType = 3) AND (checklist.teacher5) THEN 'noSupport' ELSE NULL END) AS noSupport,
                    COUNT(CASE WHEN (peopleType = 3) AND (checklist.teacher1 OR checklist.teacher2 OR checklist.teacher3 OR checklist.teacher4) THEN 'support' ELSE NULL END) AS support
                    FROM cqrefpwa.observations.math
                    WHERE teacher = '/user/`+data.teacherId+`' AND observedBy = '/user/`+context.auth.uid+`'
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
