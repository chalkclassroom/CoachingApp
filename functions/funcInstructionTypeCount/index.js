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
exports.funcInstructionTypeCount = functions.https.onCall(async (data, context) => {
    //let message = req.query.message || req.body.message || 'Hello World!';
    console.log(context.auth.uid);
    console.log(data.sessionId);
    if (!await canAccessObservation(data.sessionId, context.auth.uid)){
        return [];
    }else{
        console.log(`User ${context.auth.uid} can access observation ${data.sessionId}`)
    }
    // The SQL query to run
    const sqlQuery = `SELECT instructionType, COUNT(instructionType) AS count FROM ${process.env.BQ_PROJECT_ID}.${process.env.BQ_DATASET}.level 
  WHERE id = '${data.sessionId}' GROUP BY instructionType`;
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
