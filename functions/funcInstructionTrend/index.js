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
exports.funcInstructionTrend = functions.https.onCall(async (data, context) => {
    //let message = req.query.message || req.body.message || 'Hello World!';
    console.log(context.auth.uid);
    console.log(data.teacherId);
    if (!await canAccessTeacher(data.teacherId, context.auth.uid)){
        return [];
    }else{
        console.log(`User ${context.auth.uid} can access observation ${data.sessionId}`)
    }
    // The SQL query to run
    const sqlQuery = `SELECT 
                    DATE(sessionStart) AS dayOfEvent, 
                    COUNT(CASE WHEN instructionType = 'highLevel' OR instructionType = 'hlq' THEN 'hlq' ELSE NULL END) AS hlq, 
                    COUNT(CASE WHEN instructionType = 'followUp' OR instructionType = 'hlqResponse' THEN 'hlqResponse' ELSE NULL END) AS hlqResponse,
                    COUNT(CASE WHEN instructionType = 'lowLevel' OR instructionType = 'llq' THEN 'llq' ELSE NULL END) AS llq,
                    COUNT(CASE WHEN instructionType = 'specificSkill' OR instructionType = 'llqResponse' THEN 'llqResponse' ELSE NULL END) AS llqResponse,
                  FROM ${process.env.BQ_PROJECT_ID}.${process.env.BQ_DATASET}.level
                  WHERE teacher = '/user/${data.teacherId}' AND observedBy = '/user/${context.auth.uid}'
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
