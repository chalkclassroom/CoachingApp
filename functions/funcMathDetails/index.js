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

exports.funcMathDetails = functions.https.onCall(async(data, context) => {
    //SQL query to get number of checks for each item on checklist
    const sqlQuery = `SELECT
                    COUNT(CASE WHEN (checklist.child1) THEN 'math1' ELSE NULL END) AS math1,
                    COUNT(CASE WHEN (checklist.child2) THEN 'math2' ELSE NULL END) AS math2,
                    COUNT(CASE WHEN (checklist.child3) THEN 'math3' ELSE NULL END) AS math3,
                    COUNT(CASE WHEN (checklist.child4) THEN 'math4' ELSE NULL END) AS math4,
					COUNT(CASE WHEN (checklist.teacher1) THEN 'teacher1' ELSE NULL END) AS teacher1,
                    COUNT(CASE WHEN (checklist.teacher2) THEN 'teacher2' ELSE NULL END) AS teacher2,
                    COUNT(CASE WHEN (checklist.teacher3) THEN 'teacher3' ELSE NULL END) AS teacher3,
                    COUNT(CASE WHEN (checklist.teacher4) THEN 'teacher4' ELSE NULL END) AS teacher4,
                    FROM cqrefpwa.observations.math
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
