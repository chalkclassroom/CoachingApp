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
  /* const sqlQuery = `SELECT ac.teacher AS teacherAC, ac.sessionStart AS sessionStartAC, ac.id AS idAC,
          sequential.sessionStart AS sessionStartSA, sequential.id AS idSA, sequential.teacher AS teacherSA,
          climate.teacher AS teacherCC, climate.sessionStart AS sessionStartCC, climate.id AS idCC,
          transition.teacher AS teacherTT, transition.sessionStart AS sessionStartTT, transition.id AS idTT,
          listening.teacher AS teacherLC, listening.sessionStart AS sessionStartLC, listening.id AS idLC,
          math.teacher AS teacherMI, math.sessionStart AS sessionStartMI, math.id AS idMI,
          instruction.teacher AS teacherIN, instruction.sessionStart AS sessionStartIN, instruction.id AS idIN,
          engagement.teacher AS teacherSE, engagement.sessionStart AS sessionStartSE, engagement.id AS idSE,
          CASE
            WHEN transition.id IS NOT NULL THEN 'TT'
            WHEN climate.id IS NOT NULL THEN 'CC'
            WHEN math.id IS NOT NULL THEN 'MI'
            WHEN instruction.id IS NOT NULL THEN 'IN'
            WHEN engagement.id IS NOT NULL THEN 'SE'
            WHEN listening.id IS NOT NULL THEN 'LC'
            WHEN sequential.id IS NOT NULL THEN 'SA'
            WHEN ac.id IS NOT NULL THEN 'AC'
              ELSE 'LI'
            END as type
        FROM (cqrefpwa.observations.sequential AS sequential FULL OUTER JOIN cqrefpwa.observations.ac
          AS ac ON ac.id = sequential.id AND ac.teacher = sequential.teacher)
          FULL OUTER JOIN cqrefpwa.observations.climate AS climate ON ac.id = climate.id AND ac.teacher = climate.teacher
          FULL OUTER JOIN cqrefpwa.observations.transition AS transition ON transition.id = climate.id
          FULL OUTER JOIN cqrefpwa.observations.listening AS listening ON listening.id = transition.id
          FULL OUTER JOIN cqrefpwa.observations.math AS math ON math.id = listening.id
          FULL OUTER JOIN cqrefpwa.observations.level AS instruction ON instruction.id = math.id
          FULL OUTER JOIN cqrefpwa.observations.engagement AS engagement ON engagement.id = instruction.id
        WHERE (ac.observedBy = '/user/`+context.auth.uid+`' AND ac.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
          OR (sequential.observedBy = '/user/`+context.auth.uid+`' AND sequential.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
          OR (climate.observedBy = '/user/`+context.auth.uid+`' AND climate.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
          OR (transition.observedBy = '/user/`+context.auth.uid+`' AND transition.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
          OR (listening.observedBy = '/user/`+context.auth.uid+`' AND listening.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
          OR (math.observedBy = '/user/`+context.auth.uid+`' AND math.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
          OR (instruction.observedBy = '/user/`+context.auth.uid+`' AND instruction.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
          OR (engagement.observedBy = '/user/`+context.auth.uid+`' AND engagement.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
        GROUP BY
          idAC, teacherAC, sessionStartAC,
          idSA, teacherSA, sessionStartSA,
          idCC, teacherCC, sessionStartCC,
          idTT, teacherTT, sessionStartTT,
          idLC, teacherLC, sessionStartLC,
          idMI, teacherMI, sessionStartMI,
          idIN, teacherIN, sessionStartIN,
          idSE, teacherSE, sessionStartSE
        ORDER BY sessionStartAC, sessionStartSA, sessionStartCC, sessionStartTT, sessionStartLC, sessionStartMI, sessionStartIN, sessionStartSE`; */

  const sqlQuery = `SELECT id, teacher, sessionStart, 'AC' as type from cqrefpwa.observations.ac AS ac
    WHERE (ac.observedBy = '/user/4CPhcZa4VhOelWHk56xmN2BTwJO2' AND ac.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, 'SA' as type FROM cqrefpwa.observations.sequential AS sequential
    WHERE (sequential.observedBy = '/user/4CPhcZa4VhOelWHk56xmN2BTwJO2' AND sequential.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, 'CC' as type FROM cqrefpwa.observations.climate AS climate
    WHERE (climate.observedBy = '/user/4CPhcZa4VhOelWHk56xmN2BTwJO2' AND climate.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, 'TT' as type FROM cqrefpwa.observations.transition AS transition
    WHERE (transition.observedBy = '/user/4CPhcZa4VhOelWHk56xmN2BTwJO2' AND transition.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, 'MI' as type FROM cqrefpwa.observations.math AS math
    WHERE (math.observedBy = '/user/4CPhcZa4VhOelWHk56xmN2BTwJO2' AND math.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, 'IN' as type FROM cqrefpwa.observations.level AS instruction
    WHERE (instruction.observedBy = '/user/4CPhcZa4VhOelWHk56xmN2BTwJO2' AND instruction.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, 'LC' as type FROM cqrefpwa.observations.listening AS listening
    WHERE (listening.observedBy = '/user/4CPhcZa4VhOelWHk56xmN2BTwJO2' AND listening.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
    UNION DISTINCT SELECT id, teacher, sessionStart, 'SE' as type FROM cqrefpwa.observations.engagement AS engagement
    WHERE (engagement.observedBy = '/user/4CPhcZa4VhOelWHk56xmN2BTwJO2' AND engagement.teacher != '/user/rJxNhJmzjRZP7xg29Ko6')
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
