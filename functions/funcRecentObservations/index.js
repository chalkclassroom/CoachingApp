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
  const sqlQuery = `SELECT id, teacher, sessionStart, sessionEnd, 'AC' as type from cqrefpwa.observations.ac AS ac
    WHERE (ac.observedBy = '/user/4CPhcZa4VhOelWHk56xmN2BTwJO2' AND ac.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, sessionEnd, 'SA' as type FROM cqrefpwa.observations.sequential AS sequential
    WHERE (sequential.observedBy = '/user/4CPhcZa4VhOelWHk56xmN2BTwJO2' AND sequential.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, sessionEnd, 'CC' as type FROM cqrefpwa.observations.climate AS climate
    WHERE (climate.observedBy = '/user/4CPhcZa4VhOelWHk56xmN2BTwJO2' AND climate.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, sessionEnd, 'TT' as type FROM cqrefpwa.observations.transition AS transition
    WHERE (transition.observedBy = '/user/4CPhcZa4VhOelWHk56xmN2BTwJO2' AND transition.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, sessionEnd, 'MI' as type FROM cqrefpwa.observations.math AS math
    WHERE (math.observedBy = '/user/4CPhcZa4VhOelWHk56xmN2BTwJO2' AND math.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, sessionEnd, 'IN' as type FROM cqrefpwa.observations.level AS instruction
    WHERE (instruction.observedBy = '/user/4CPhcZa4VhOelWHk56xmN2BTwJO2' AND instruction.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, sessionEnd, 'LC' as type FROM cqrefpwa.observations.listening AS listening
    WHERE (listening.observedBy = '/user/4CPhcZa4VhOelWHk56xmN2BTwJO2' AND listening.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, sessionEnd, 'SE' as type FROM cqrefpwa.observations.engagement AS engagement
    WHERE (engagement.observedBy = '/user/4CPhcZa4VhOelWHk56xmN2BTwJO2' AND engagement.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, sessionEnd, 'LI' as type FROM cqrefpwa.observations.literacyFoundationalChild AS literacyFoundationalChild
    WHERE (literacyFoundationalChild.observedBy = '/user/4CPhcZa4VhOelWHk56xmN2BTwJO2' AND literacyFoundationalChild.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, sessionEnd, 'LI' as type FROM cqrefpwa.observations.literacyFoundationalTeacher AS literacyFoundationalTeacher
    WHERE (literacyFoundationalTeacher.observedBy = '/user/4CPhcZa4VhOelWHk56xmN2BTwJO2' AND literacyFoundationalTeacher.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, sessionEnd, 'LI' as type FROM cqrefpwa.observations.literacyWritingChild AS literacyWritingChild
    WHERE (literacyWritingChild.observedBy = '/user/4CPhcZa4VhOelWHk56xmN2BTwJO2' AND literacyWritingChild.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, sessionEnd, 'LI' as type FROM cqrefpwa.observations.literacyWritingTeacher AS literacyWritingTeacher
    WHERE (literacyWritingTeacher.observedBy = '/user/4CPhcZa4VhOelWHk56xmN2BTwJO2' AND literacyWritingTeacher.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, sessionEnd, 'LI' as type FROM cqrefpwa.observations.literacyReadingTeacher AS literacyReadingTeacher
    WHERE (literacyReadingTeacher.observedBy = '/user/4CPhcZa4VhOelWHk56xmN2BTwJO2' AND literacyReadingTeacher.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, sessionEnd, 'LI' as type FROM cqrefpwa.observations.literacyLanguageTeacher AS literacyLanguageTeacher
    WHERE (literacyLanguageTeacher.observedBy = '/user/4CPhcZa4VhOelWHk56xmN2BTwJO2' AND literacyLanguageTeacher.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
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
