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
  const sqlQuery = `SELECT ac.teacher AS teacherAC, ac.sessionStart AS sessionStartAC, ac.id AS idAC,
          sequential.sessionStart AS sessionStartSA, sequential.id AS idSA, sequential.teacher AS teacherSA,
          climate.teacher as teacherCC, climate.sessionStart AS sessionStartCC, climate.id AS idCC
        FROM (cqrefpwa.observations.sequential AS sequential FULL OUTER JOIN cqrefpwa.observations.ac
          AS ac ON ac.id = sequential.id AND ac.teacher = sequential.teacher)
          FULL OUTER JOIN cqrefpwa.observations.climate AS climate ON ac.id = climate.id AND ac.teacher = climate.teacher
        WHERE (ac.observedBy = '/user/`+context.auth.uid+`' AND ac.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
          OR (sequential.observedBy = '/user/`+context.auth.uid+`' AND sequential.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
          OR (climate.observedBy = '/user/`+context.auth.uid+`' AND climate.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
        GROUP BY ac.id, ac.teacher, ac.sessionStart,
          sequential.id, sequential.teacher, sequential.sessionStart,
          climate.id, climate.teacher, climate.sessionStart
        ORDER BY sessionStartAC, sessionStartSA, sessionStartCC`;

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
