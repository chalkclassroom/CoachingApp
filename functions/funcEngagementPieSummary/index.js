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

exports.funcEngagementPieSummary = functions.https.onCall(async(data, context) => {
    if (!await canAccessObservation(data.sessionId, context.auth.uid)){
        return [];
    }else{
        console.log(`User ${context.auth.uid} can access observation ${data.sessionId}`)
    }
    //SQL query to get number of checks for each item on checklist
    const sqlQuery = `SELECT
    COUNT(CASE WHEN (point = 0)  THEN 'offTask' ELSE NULL END) AS offTask,
    COUNT(CASE WHEN (point = 1 OR point = 2 OR point = 3) THEN 'engaged' ELSE NULL END) AS engaged,
    FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.engagement
    WHERE id ='`+data.sessionId+`'`;

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
