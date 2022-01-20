// Imports the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');
const functions = require("firebase-functions");
const { canAccessTeacher } = require('../common/accessUtils');

// Creates a client
const bigquery = new BigQuery();

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.funcLiteracyTrendFoundationalChild = functions.https.onCall(async(data, context) => {
    if (!await canAccessTeacher(data.teacherId, context.auth.uid)){
        return [];
    }else{
        console.log(`User ${context.auth.uid} can access observation ${data.sessionId}`)
    }
    const sqlQuery = `SELECT FORMAT_TIMESTAMP('%m/%d/%Y', DATE(sessionStart)) AS startDate,
                    activitySetting,
                    COUNT(CASE WHEN (checklist.item1) THEN 'literacy1' ELSE NULL END) AS literacy1,
                    COUNT(CASE WHEN (checklist.item2) THEN 'literacy2' ELSE NULL END) AS literacy2,
                    COUNT(CASE WHEN (checklist.item3) THEN 'literacy3' ELSE NULL END) AS literacy3,
                    COUNT(CASE WHEN (checklist.item4) THEN 'literacy4' ELSE NULL END) AS literacy4,
                    COUNT(CASE WHEN (checklist.item5) THEN 'literacy5' ELSE NULL END) AS literacy5,
                    COUNT(CASE WHEN (checklist.item6) THEN 'literacy6' ELSE NULL END) AS literacy6,
                    COUNT(CASE WHEN (checklist.item7) THEN 'literacy7' ELSE NULL END) AS literacy7,
                    COUNT(CASE WHEN (checklist.item8) THEN 'literacy8' ELSE NULL END) AS literacy8,
                    COUNT(CASE WHEN (checklist.item9) THEN 'literacy9' ELSE NULL END) AS literacy9,
                    COUNT (sessionStart) AS total,
                    FROM ${process.env.BQ_PROJECT_ID}.${process.env.BQ_DATASET}.literacyFoundationalChild
                    WHERE teacher = @teacher AND observedBy = @coach
                    GROUP BY startDate, activitySetting
                    ORDER BY startDate ASC;`;

    console.log(sqlQuery);

    const options = {
        query: sqlQuery,
        // Location must match that of the dataset(s) referenced in the query.
        location: 'US',
        params: {coach: '/user/' + context.auth.uid, teacher: '/user/' + data.teacherId}
    };

    const [job] = await bigquery.createQueryJob(options);
    console.log(`Job ${job.id} started.`);

    const rows = await job.getQueryResults();
    console.log(rows);
    return rows;
});
