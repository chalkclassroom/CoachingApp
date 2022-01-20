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

exports.funcRecentObservations = functions.https.onCall(async(data, context) => {
  //SQL query to get number of checks for each item on checklist
  const userId = context.auth.uid
  const sqlQuery = `SELECT id, teacher, sessionStart, sessionEnd, 'AC' as type from ${process.env.BQ_PROJECT_ID}.observations.ac AS ac
    WHERE (ac.observedBy = '/user/${userId}' AND ac.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, sessionEnd, 'SA' as type FROM ${process.env.BQ_PROJECT_ID}.observations.sequential AS sequential
    WHERE (sequential.observedBy = '/user/${userId}' AND sequential.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, sessionEnd, 'CC' as type FROM ${process.env.BQ_PROJECT_ID}.observations.climate AS climate
    WHERE (climate.observedBy = '/user/${userId}' AND climate.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, sessionEnd, 'TT' as type FROM ${process.env.BQ_PROJECT_ID}.observations.transition AS transition
    WHERE (transition.observedBy = '/user/${userId}' AND transition.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, sessionEnd, 'MI' as type FROM ${process.env.BQ_PROJECT_ID}.observations.math AS math
    WHERE (math.observedBy = '/user/${userId}' AND math.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, sessionEnd, 'IN' as type FROM ${process.env.BQ_PROJECT_ID}.observations.level AS instruction
    WHERE (instruction.observedBy = '/user/${userId}' AND instruction.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, sessionEnd, 'LC' as type FROM ${process.env.BQ_PROJECT_ID}.observations.listening AS listening
    WHERE (listening.observedBy = '/user/${userId}' AND listening.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, sessionEnd, 'SE' as type FROM ${process.env.BQ_PROJECT_ID}.observations.engagement AS engagement
    WHERE (engagement.observedBy = '/user/${userId}' AND engagement.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, sessionEnd, 'LI' as type FROM ${process.env.BQ_PROJECT_ID}.observations.literacyFoundationalChild AS literacyFoundationalChild
    WHERE (literacyFoundationalChild.observedBy = '/user/${userId}' AND literacyFoundationalChild.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, sessionEnd, 'LI' as type FROM ${process.env.BQ_PROJECT_ID}.observations.literacyFoundationalTeacher AS literacyFoundationalTeacher
    WHERE (literacyFoundationalTeacher.observedBy = '/user/${userId}' AND literacyFoundationalTeacher.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, sessionEnd, 'LI' as type FROM ${process.env.BQ_PROJECT_ID}.observations.literacyWritingChild AS literacyWritingChild
    WHERE (literacyWritingChild.observedBy = '/user/${userId}' AND literacyWritingChild.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, sessionEnd, 'LI' as type FROM ${process.env.BQ_PROJECT_ID}.observations.literacyWritingTeacher AS literacyWritingTeacher
    WHERE (literacyWritingTeacher.observedBy = '/user/${userId}' AND literacyWritingTeacher.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, sessionEnd, 'LI' as type FROM ${process.env.BQ_PROJECT_ID}.observations.literacyReadingTeacher AS literacyReadingTeacher
    WHERE (literacyReadingTeacher.observedBy = '/user/${userId}' AND literacyReadingTeacher.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, sessionEnd, 'LI' as type FROM ${process.env.BQ_PROJECT_ID}.observations.literacyLanguageTeacher AS literacyLanguageTeacher
    WHERE (literacyLanguageTeacher.observedBy = '/user/${userId}' AND literacyLanguageTeacher.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    ORDER BY sessionStart desc`;

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
