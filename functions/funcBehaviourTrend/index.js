// Imports the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');
const functions = require("firebase-functions");
const { canAccessObservation } = require('../common/accessUtils')

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

  if (!await canAccessObservation(data.sessionId, context.auth.uid)){
    return [];
  }else{
    console.log(`User ${context.auth.uid} can access observation ${data.sessionId}`)
  }
  // The SQL query to run
  const sqlQuery = `SELECT 
                    DATE(sessionStart) AS dayOfEvent, 
                    COUNT(CASE WHEN behaviorResponse = 'specificapproval' THEN 'positive' WHEN behaviorResponse = 'nonspecificapproval' THEN 'positive' ELSE NULL END) AS positive, 
                    COUNT(CASE WHEN behaviorResponse = 'redirection' THEN 'negative' WHEN behaviorResponse = 'disapproval' THEN 'negative' ELSE NULL END) AS negative
                  FROM cqrefpwa.observations.climate
                  WHERE teacher = '/user/`+data.teacherId+`' AND observedBy = '/user/`+context.auth.uid+`' AND (type = 'climate')
                  GROUP BY dayOfEvent
                  ORDER BY dayOfEvent ASC
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
