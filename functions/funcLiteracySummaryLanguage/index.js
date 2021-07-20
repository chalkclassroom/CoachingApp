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

exports.funcLiteracySummaryLanguage = functions.https.onCall(async (data, context) => {

    //SQL query to get number of checks for each item on checklist
    const tableType = data.type + data.who;
    const sqlQuery = `SELECT
                      COUNT(CASE WHEN (checklist.item1 OR checklist.item2 OR checklist.item3 OR checklist.item4 OR checklist.item5 OR checklist.item6 OR checklist.item7 OR checklist.item8) THEN 'literacy' ELSE NULL END) AS literacy,
                      COUNT(CASE WHEN (checklist.item9) THEN 'noLiteracy' ELSE NULL END) AS noLiteracy 
                      FROM cqrefpwa.observations.literacy${tableType}
                      WHERE id = @id`;

    console.log(sqlQuery);

    const options = {
        query: sqlQuery,
        // Location must match that of the dataset(s) referenced in the query.
        location: 'US',
        params: {id: data.sessionId}
    };

    const [job] = await bigquery.createQueryJob(options);
    console.log(`Job ${job.id} started.`);

    const rows = await job.getQueryResults();
    console.log(rows);
    return rows;
});


