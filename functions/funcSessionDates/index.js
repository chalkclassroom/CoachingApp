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
exports.funcSessionDates = functions.https.onCall(async (data, context) => {
  //let message = req.query.message || req.body.message || 'Hello World!';
  console.log(context.auth.uid);
  console.log(data.teacherId);
  if (!await canAccessTeacher(data.teacherId, context.auth.uid)){
    console.log('cant access teacher')
    return [];
  }else{
    console.log(`User ${context.auth.uid} can access teacher ${data.teacherId}`)
  }
  // The SQL query to run
  const sqlQuery = `SELECT DISTINCT id, sessionStart FROM 
${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.${data.type} WHERE observedBy = '/user/${context.auth.uid}' 
AND teacher = '/user/${data.teacherId}' ORDER BY sessionStart DESC LIMIT 100;`;

  console.log(sqlQuery);

  const options = {
    query: sqlQuery,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
  };

  const [job] = await bigquery.createQueryJob(options);
  console.log(`Job ${job.id} started.`);
  const rows = await job.getQueryResults();
  console.log('dates', rows);
  return rows;
});

