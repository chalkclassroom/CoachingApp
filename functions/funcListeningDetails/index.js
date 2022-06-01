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

exports.funcListeningDetails = functions.https.onCall(async(data, context) => {
    //SQL query to get number of checks for each item on checklist
    if (!await canAccessObservation(data.sessionId, context.auth.uid)){
        return [];
    }else{
        console.log(`User ${context.auth.uid} can access observation ${data.sessionId}`)
    }
    const sqlQuery = `SELECT
                    COUNT(CASE WHEN (checklist.teacher1) THEN 'listening1' ELSE NULL END) AS listening1,
                    COUNT(CASE WHEN (checklist.teacher2) THEN 'listening2' ELSE NULL END) AS listening2,
                    COUNT(CASE WHEN (checklist.teacher3) THEN 'listening3' ELSE NULL END) AS listening3,
                    COUNT(CASE WHEN (checklist.teacher4) THEN 'listening4' ELSE NULL END) AS listening4,
					          COUNT(CASE WHEN (checklist.teacher5) THEN 'listening5' ELSE NULL END) AS listening5,
                    COUNT(CASE WHEN (checklist.teacher6) THEN 'listening6' ELSE NULL END) AS listening6,
                    FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.listening
                    WHERE id ='${data.sessionId}'`;

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
