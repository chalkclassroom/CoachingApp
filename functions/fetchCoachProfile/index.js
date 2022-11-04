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
exports.fetchCoachProfile = functions.https.onCall(async (data, context) => {
  var teacherLists = data.teacherIds;
  var startDate = data.startDate;
  var endDate = data.endDate;
  var coachId = data.coachId;

  // Make sure to include every teacher in the site
  // We're using this function for multiple profile pages. The pages save teacher data in different ways. So we have to check for it
  var teacherSqlQuery = "";
  console.log("TEACHER IDS ", teacherLists);
  for(var i = 0; i < teacherLists.length; i++)
  {
    console.log("Teacher Id : " + teacherLists[i] );
    teacherSqlQuery += `teacher = '/user/${teacherLists[i]}' `;
    if(i < (teacherLists.length - 1)){
      teacherSqlQuery += 'or ';
    }
  }

  console.log("teacherSqlQuery : " + teacherSqlQuery);

      /*
       * Note: we're using millisecond for the totaltime because we need unique values for date_diff for the times to be accurate
       *        There might be a way to get it in seconds or minutes without discounting duplicates but I can't figure out how
       */

      sqlQuery = `SELECT
                    'ac' AS type,
                    COUNT(DISTINCT id) AS count,
                    teacher as teacher,
                    SUM(DISTINCT date_diff(sessionEnd, sessionStart, MILLISECOND)) as totalTime
                    FROM  ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.ac
                    WHERE (${teacherSqlQuery}) and observedBy = '/user/${coachId}' and sessionStart <= '${endDate}' and sessionStart >= '${startDate}'
                    GROUP BY teacher
                    UNION ALL

                    SELECT
                    'climate' AS type,
                    COUNT(DISTINCT id) AS count,
                    teacher as teacher,
                    SUM(DISTINCT date_diff(sessionEnd, sessionStart, MILLISECOND)) as totalTime
                    FROM  ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.climate
                    WHERE (${teacherSqlQuery}) and observedBy = '/user/${coachId}' and sessionStart <= '${endDate}' and sessionStart >= '${startDate}'
                    GROUP BY teacher
                    UNION ALL

                    SELECT
                    'engagement' AS type,
                    COUNT(DISTINCT id) AS count,
                    teacher as teacher,
                    SUM(DISTINCT date_diff(sessionEnd, sessionStart, MILLISECOND)) as totalTime
                    FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.engagement
                    WHERE (${teacherSqlQuery}) and observedBy = '/user/${coachId}' and sessionStart <= '${endDate}' and sessionStart >= '${startDate}'
                    GROUP BY teacher
                    UNION ALL

                    SELECT
                    'level' AS type,
                    COUNT(DISTINCT id) AS count,
                    teacher as teacher,
                    SUM(DISTINCT date_diff(sessionEnd, sessionStart, MILLISECOND)) as totalTime
                    FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.level
                    WHERE (${teacherSqlQuery}) and observedBy = '/user/${coachId}' and sessionStart <= '${endDate}' and sessionStart >= '${startDate}'
                    GROUP BY teacher
                    UNION ALL

                    SELECT
                    'listening' AS type,
                    COUNT(DISTINCT id) AS count,
                    teacher as teacher,
                    SUM(DISTINCT date_diff(sessionEnd, sessionStart, MILLISECOND)) as totalTime
                    FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.listening
                    WHERE (${teacherSqlQuery}) and observedBy = '/user/${coachId}' and sessionStart <= '${endDate}' and sessionStart >= '${startDate}'
                    GROUP BY teacher
                    UNION ALL

                    SELECT
                    'literacyFoundationalChild' AS type,
                    COUNT(DISTINCT id) AS count,
                    teacher as teacher,
                    SUM(DISTINCT date_diff(sessionEnd, sessionStart, MILLISECOND)) as totalTime
                    FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.literacyFoundationalChild
                    WHERE (${teacherSqlQuery}) and observedBy = '/user/${coachId}' and sessionStart <= '${endDate}' and sessionStart >= '${startDate}'
                    GROUP BY teacher
                    UNION ALL

                    SELECT
                    'literacyFoundationalTeacher' AS type,
                    COUNT(DISTINCT id) AS count,
                    teacher as teacher,
                    SUM(DISTINCT date_diff(sessionEnd, sessionStart, MILLISECOND)) as totalTime
                    FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.literacyFoundationalTeacher
                    WHERE (${teacherSqlQuery}) and observedBy = '/user/${coachId}' and sessionStart <= '${endDate}' and sessionStart >= '${startDate}'
                    GROUP BY teacher
                    UNION ALL

                    SELECT
                    'literacyLanguageTeacher' AS type,
                    COUNT(DISTINCT id) AS count,
                    teacher as teacher,
                    SUM(DISTINCT date_diff(sessionEnd, sessionStart, MILLISECOND)) as totalTime
                    FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.literacyLanguageTeacher
                    WHERE (${teacherSqlQuery}) and observedBy = '/user/${coachId}' and sessionStart <= '${endDate}' and sessionStart >= '${startDate}'
                    GROUP BY teacher
                    UNION ALL

                    SELECT
                    'literacyReadingTeacher' AS type,
                    COUNT(DISTINCT id) AS count,
                    teacher as teacher,
                    SUM(DISTINCT date_diff(sessionEnd, sessionStart, MILLISECOND)) as totalTime
                    FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.literacyReadingTeacher
                    WHERE (${teacherSqlQuery}) and observedBy = '/user/${coachId}' and sessionStart <= '${endDate}' and sessionStart >= '${startDate}'
                    GROUP BY teacher
                    UNION ALL

                    SELECT
                    'literacyWritingChild' AS type,
                    COUNT(DISTINCT id) AS count,
                    teacher as teacher,
                    SUM(DISTINCT date_diff(sessionEnd, sessionStart, MILLISECOND)) as totalTime
                    FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.literacyWritingChild
                    WHERE (${teacherSqlQuery}) and observedBy = '/user/${coachId}' and sessionStart <= '${endDate}' and sessionStart >= '${startDate}'
                    GROUP BY teacher
                    UNION ALL

                    SELECT
                    'literacyWritingTeacher' AS type,
                    COUNT(DISTINCT id) AS count,
                    teacher as teacher,
                    SUM(DISTINCT date_diff(sessionEnd, sessionStart, MILLISECOND)) as totalTime
                    FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.literacyWritingTeacher
                    WHERE (${teacherSqlQuery}) and observedBy = '/user/${coachId}' and sessionStart <= '${endDate}' and sessionStart >= '${startDate}'
                    GROUP BY teacher
                    UNION ALL

                    SELECT
                    'math' AS type,
                    COUNT(DISTINCT id) AS count,
                    teacher as teacher,
                    SUM(DISTINCT date_diff(sessionEnd, sessionStart, MILLISECOND)) as totalTime
                    FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.math
                    WHERE (${teacherSqlQuery}) and observedBy = '/user/${coachId}' and sessionStart <= '${endDate}' and sessionStart >= '${startDate}'
                    GROUP BY teacher
                    UNION ALL

                    SELECT
                    'sequential' AS type,
                    COUNT(DISTINCT id) AS count,
                    teacher as teacher,
                    SUM(DISTINCT date_diff(sessionEnd, sessionStart, MILLISECOND)) as totalTime
                    FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.sequential
                    WHERE (${teacherSqlQuery}) and observedBy = '/user/${coachId}' and sessionStart <= '${endDate}' and sessionStart >= '${startDate}'
                    GROUP BY teacher
                    UNION ALL

                    SELECT
                    'transition' AS type,
                    COUNT(DISTINCT id) AS count,
                    teacher as teacher,
                    SUM(DISTINCT date_diff(sessionEnd, sessionStart, MILLISECOND)) as totalTime
                    FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.transition
                    WHERE (${teacherSqlQuery}) and observedBy = '/user/${coachId}' and sessionStart <= '${endDate}' and sessionStart >= '${startDate}'
                    GROUP BY teacher
                    `;


                    console.log(sqlQuery);

    const options = {
        query: sqlQuery,
        // Location must match that of the dataset(s) referenced in the query.
        location: 'US',
    };

    const [job] = await bigquery.createQueryJob(options);
    console.log(`Job ${job.id} started.`);
    const rows = await job.getQueryResults();
    //console.log(rows);
    return rows;
});
