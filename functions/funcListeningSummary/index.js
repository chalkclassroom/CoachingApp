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

exports.funcListeningSummary = functions.https.onCall(async (data, context) => {
    //SQL query to get number of checks for each item on checklist
    const sqlQuery = `SELECT
                    COUNT(CASE WHEN (checklist.teacher1 OR checklist.teacher2 OR checklist.teacher3 OR checklist.teacher4 OR checklist.teacher5 OR checklist.teacher6) THEN 'listening' ELSE NULL END) AS listening,
                    COUNT(CASE WHEN (checklist.teacher7) THEN 'notListening' ELSE NULL END) AS notListening
                    FROM cqrefpwa.observations.listening
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


