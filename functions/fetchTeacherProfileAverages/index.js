// Imports the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');
const functions = require("firebase-functions");
const { canAccessTeacher } = require('../common/accessUtils')

// Creates a client
const bigquery = new BigQuery();

// Array used to match the name of a practice to the value that's saved in BQ
const practicesArr = {
  "transitionTime": "transition",
  "classroomClimate": "climate",
  "mathInstruction": "math",
  "levelOfInstruction": "level",
  "studentEngagement": "engagement",
  "listeningToChildren": "listening",
  "sequentialActivities": "sequential",
  "foundationSkills": "literacyFoundationalTeacher",
  "writing": "literacyWritingTeacher",
  "bookReading": "literacyReadingTeacher",
  "languageEnvironment": "literacyLanguageTeacher",
  "associativeAndCooperative": "ac",
}

// Array used to match the name of a practice to the teacher Column name
const teacherColumnArr = {
  "transitionTime": "teacherId",
  "classroomClimate": "teacher",
  "mathInstruction": "teacherId",
  "levelOfInstruction": "teacherId",
  "studentEngagement": "teacher",
  "listeningToChildren": "teacher",
  "sequentialActivities": "teacherId",
  "foundationSkills": "teacherId",
  "writing": "teachId",
  "bookReading": "teacherId",
  "languageEnvironment": "teacherId",
  "associativeAndCooperative": "teacherId",
}


/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.fetchTeacherProfileAverages = functions.https.onCall(async (data, context) => {
    //let message = req.query.message || req.body.message || 'Hello World!';
    console.log(context.auth.uid);
    console.log(data.teacherId);

    console.log("DATA => ", data);

    console.log("Data Type : " + data.type);
    console.log("Data teacherId : " + data.teacherId);
    console.log("Data endDate : " + data.endDate);
    console.log("Data startDate : " + data.startDate);

    var observationType = practicesArr[data.type];
    var startDate = data.startDate;
    var endDate = data.endDate;
    var teacherId = '/user/' + data.teacherId;
    var teacherColumnName = teacherColumnArr[data.type];

    console.log("OBSERVATION TYPE : " + observationType);

    console.log("Start Query");
    // The SQL query to run



    /*
     * Transition Time
     */
    if(observationType == "transition")
    {
      sqlQuery = `SELECT
                      DATE(sessionStart) AS startDate,
                      SUM(CASE WHEN type = 'waiting' THEN TIMESTAMP_DIFF(transitionEnd ,transitionStart, millisecond) ELSE 0 END) AS line,
                      SUM(CASE WHEN type = 'traveling' THEN TIMESTAMP_DIFF(transitionEnd ,transitionStart, millisecond) ELSE 0 END) AS traveling,
                      SUM(CASE WHEN type = 'child waiting' THEN TIMESTAMP_DIFF(transitionEnd ,transitionStart, millisecond) ELSE 0 END) AS waiting,
                      SUM(CASE WHEN type = 'classroom routines' THEN TIMESTAMP_DIFF(transitionEnd ,transitionStart, millisecond) ELSE 0 END) AS routines,
                      SUM(CASE WHEN type = 'behavior management disruption' THEN TIMESTAMP_DIFF(transitionEnd ,transitionStart, millisecond) ELSE 0 END) AS behaviorManagement,
                      SUM(CASE WHEN type = 'other' THEN TIMESTAMP_DIFF(transitionEnd ,transitionStart, millisecond) ELSE 0 END) AS other,
                  	  SUM(TIMESTAMP_DIFF(transitionEnd, transitionStart, millisecond)) AS total,
                      TIMESTAMP_DIFF(sessionEnd, sessionStart, millisecond) AS observationTotalTime,
                      teacher
                      FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.${observationType}
                      where teacher = '${teacherId}' and sessionStart <= '${endDate}' and sessionStart >= '${startDate}'
                      GROUP BY startDate, teacher, observationTotalTime
                      ORDER BY startDate ASC;`;
    }


    /*
     * Classroom Climate
     */
    if(observationType == "climate")
    {
      sqlQuery = `SELECT
                      behaviorResponse, COUNT(behaviorResponse) AS count, teacher, toneRating,
                      EXTRACT(DATE FROM sessionStart) as startDate,
                      FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.${observationType}
                      where teacher = '${teacherId}' and sessionStart <= '${endDate}' and sessionStart >= '${startDate}'
                      GROUP BY behaviorResponse, teacher, startDate, toneRating
                      ORDER BY startDate ASC;`;
    }


    /*
     * Math Instruction
     */
    if(observationType == "math")
    {
      sqlQuery = `SELECT
                      id,
                      COUNT(id) as count,
                      COUNT(CASE WHEN (peopleType = 1 OR peopleType = 2) THEN 'noOpportunity' ELSE NULL END) AS noOpportunity,
                      COUNT(CASE WHEN (peopleType = 3) AND (checklist.teacher1 OR checklist.teacher2 OR checklist.teacher3 OR checklist.teacher4) THEN 'support' ELSE NULL END) AS support,
                      COUNT(CASE WHEN (peopleType = 3) AND (checklist.teacher5) THEN 'noSupport' ELSE NULL END) AS noSupport,
                      COUNT(CASE WHEN (checklist.teacher1) THEN 'mathVocabulary' ELSE NULL END) AS mathVocabulary,
                      COUNT(CASE WHEN (checklist.teacher2) THEN 'askingQuestions' ELSE NULL END) AS askingQuestions,
                      COUNT(CASE WHEN (checklist.teacher3) THEN 'mathConcepts' ELSE NULL END) AS mathConcepts,
                      COUNT(CASE WHEN (checklist.teacher4) THEN 'helpingChildren' ELSE NULL END) AS helpingChildren,
                      COUNT(CASE WHEN (checklist.child1) THEN 'math1' ELSE NULL END) AS counting,
                      COUNT(CASE WHEN (checklist.child2) THEN 'math2' ELSE NULL END) AS shapes,
                      COUNT(CASE WHEN (checklist.child3) THEN 'math3' ELSE NULL END) AS patterns,
                      COUNT(CASE WHEN (checklist.child4) THEN 'math4' ELSE NULL END) AS measurement,
                      COUNT(CASE WHEN (checklist.child5) THEN 'math5' ELSE NULL END) AS noMath,
                      teacher,
                      peopletype,
                      FORMAT_DATETIME("%b-%d-%Y", timestamp) as timestamp
                      FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.${observationType}
                      where teacher = '${teacherId}' and sessionStart <= '${endDate}' and sessionStart >= '${startDate}'
                      GROUP BY teacher, timestamp, peopletype, id
                      ORDER BY timestamp ASC;`;
    }


    /*
     * Level of Instructions
     */
    if(observationType == "level")
    {
      sqlQuery = `SELECT
                      id,
                      instructionType, COUNT(instructionType) AS count, teacher,
                      EXTRACT(DATE FROM sessionStart) as startDate,
                      FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.${observationType}
                      where teacher = '${teacherId}' and sessionStart <= '${endDate}' and sessionStart >= '${startDate}'
                      GROUP BY instructionType, startDate, teacher, id
                      ORDER BY startDate ASC;`;
    }



    /*
     * Student Engagement
     */
    if(observationType == "engagement")
    {
      sqlQuery = `SELECT
                      entryType,
                      COUNT(entryType) as count,
                      point,
                      teacher,
                      FORMAT_DATE('%D', DATE(sessionStart)) AS startDate,
                      FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.${observationType}
                      where teacher = '${teacherId}' and sessionStart <= '${endDate}' and sessionStart >= '${startDate}'
                      GROUP BY startDate, teacher, entryType, point
                      ORDER BY startDate ASC;`;
    }



    /*
     * Listening to Children
     */
    if(observationType == "listening")
    {
      sqlQuery = `SELECT
                      id,
                      FORMAT_DATE('%D', DATE(sessionStart)) AS startDate,
                      DATE(timestamp) as GroupDate,
                      COUNT(CASE WHEN (checklist.teacher1) THEN 'listening1' ELSE NULL END) AS listening1,
                      COUNT(CASE WHEN (checklist.teacher2) THEN 'listening2' ELSE NULL END) AS listening2,
                      COUNT(CASE WHEN (checklist.teacher3) THEN 'listening3' ELSE NULL END) AS listening3,
                      COUNT(CASE WHEN (checklist.teacher4) THEN 'listening4' ELSE NULL END) AS listening4,
                      COUNT(CASE WHEN (checklist.teacher5) THEN 'listening5' ELSE NULL END) AS listening5,
                      COUNT(CASE WHEN (checklist.teacher6) THEN 'listening6' ELSE NULL END) AS listening6,
                      COUNT(CASE WHEN (checklist.teacher7) THEN 'listening7' ELSE NULL END) AS listening7,
                      teacher,
                      COUNT(timestamp) as count,
                      FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.${observationType}
                      where teacher = '${teacherId}' and timestamp <= '${endDate}' and timestamp >= '${startDate}'
                      GROUP BY startDate, teacher, GroupDate, id
                      ORDER BY startDate ASC;`;
    }



    /*
     * Sequential Activities
     */
    if(observationType == "sequential")
    {
      sqlQuery = `SELECT
                      id,
                      COUNT(CASE WHEN (peopleType = 1 OR peopleType = 2) THEN 'notAtCenter' ELSE NULL END) AS notAtCenter,
                      COUNT(CASE WHEN (peopleType = 3) AND (checklist.teacher1 OR checklist.teacher2 OR checklist.teacher3 OR checklist.teacher4) THEN 'support' ELSE NULL END) AS support,
                      COUNT(CASE WHEN (peopleType = 3) AND (checklist.teacher5) THEN 'noSupport' ELSE NULL END) AS noSupport,
                      COUNT(CASE WHEN (checklist.teacher1) THEN 'sequentialActivities' ELSE NULL END) AS sequentialActivities,
                      COUNT(CASE WHEN (checklist.teacher2) THEN 'drawImages' ELSE NULL END) AS drawImages,
                      COUNT(CASE WHEN (checklist.teacher3) THEN 'demonstrateSteps' ELSE NULL END) AS demonstrateSteps,
                      COUNT(CASE WHEN (checklist.teacher4) THEN 'actOut' ELSE NULL END) AS actOut,
                      COUNT(CASE WHEN (checklist.child1) THEN 'sequential1' ELSE NULL END) AS materials,
                      COUNT(CASE WHEN (checklist.child2) THEN 'sequential2' ELSE NULL END) AS drawing,
                      COUNT(CASE WHEN (checklist.child3) THEN 'sequential3' ELSE NULL END) AS playing,
                      COUNT(CASE WHEN (checklist.child4) THEN 'sequential4' ELSE NULL END) AS speaking,
                      COUNT(CASE WHEN (checklist.child5) THEN 'sequential5' ELSE NULL END) AS childNonSequentialActivities,
                      teacher,
                      peopletype,
                      COUNT (sessionStart) AS total,
                      FORMAT_DATETIME("%b-%Y", timestamp) as timestamp  FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.${observationType}
                      where teacher = '${teacherId}' and sessionStart <= '${endDate}' and sessionStart >= '${startDate}'
                      GROUP BY teacher, timestamp, peopletype, id
                      ORDER BY timestamp ASC;`;
    }



    /*
     * Foundational Skills
     */
    if(observationType == "literacyFoundationalTeacher")
    {
      sqlQuery = `SELECT FORMAT_DATE('%D', DATE(sessionStart)) AS startDate,
                      DATE(sessionStart) as GroupDate,
                      COUNT(CASE WHEN (checklist.item1) THEN 'foundational1' ELSE NULL END) AS foundational1,
                      COUNT(CASE WHEN (checklist.item2) THEN 'foundational2' ELSE NULL END) AS foundational2,
                      COUNT(CASE WHEN (checklist.item3) THEN 'foundational3' ELSE NULL END) AS foundational3,
                      COUNT(CASE WHEN (checklist.item4) THEN 'foundational4' ELSE NULL END) AS foundational4,
                      COUNT(CASE WHEN (checklist.item5) THEN 'foundational5' ELSE NULL END) AS foundational5,
                      COUNT(CASE WHEN (checklist.item6) THEN 'foundational6' ELSE NULL END) AS foundational6,
                      COUNT(CASE WHEN (checklist.item7) THEN 'foundational7' ELSE NULL END) AS foundational7,
                      COUNT(CASE WHEN (checklist.item8) THEN 'foundational8' ELSE NULL END) AS foundational8,
                      COUNT(CASE WHEN (checklist.item9) THEN 'foundational9' ELSE NULL END) AS foundational9,
                      COUNT(CASE WHEN (checklist.item10) THEN 'foundational0' ELSE NULL END) AS foundational10,
                      COUNT(CASE WHEN (checklist.item11) THEN 'foundational1' ELSE NULL END) AS foundational11,
                      COUNT (sessionStart) AS total,
                      teacher,
                      time
                      FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.${observationType}
                      where teacher = '${teacherId}' and time <= '${endDate}' and time >= '${startDate}'
                      GROUP BY time, GroupDate, startDate, teacher
                      ORDER BY GroupDate ASC;`;

                      console.log("QUERY: ", sqlQuery);

                      let options = {
                          query: sqlQuery,
                          // Location must match that of the dataset(s) referenced in the query.
                          location: 'US',
                      };

                      let [job] = await bigquery.createQueryJob(options);
                      console.log(`Job ${job.id} started.`);
                      let teacher = await job.getQueryResults();

      sqlQuery = `SELECT FORMAT_DATE('%D', DATE(sessionStart)) AS startDate,
                      DATE(sessionStart) as GroupDate,
                      COUNT(CASE WHEN (checklist.item1) THEN 'foundational1' ELSE NULL END) AS foundational1,
                      COUNT(CASE WHEN (checklist.item2) THEN 'foundational2' ELSE NULL END) AS foundational2,
                      COUNT(CASE WHEN (checklist.item3) THEN 'foundational3' ELSE NULL END) AS foundational3,
                      COUNT(CASE WHEN (checklist.item4) THEN 'foundational4' ELSE NULL END) AS foundational4,
                      COUNT(CASE WHEN (checklist.item5) THEN 'foundational5' ELSE NULL END) AS foundational5,
                      COUNT(CASE WHEN (checklist.item6) THEN 'foundational6' ELSE NULL END) AS foundational6,
                      COUNT(CASE WHEN (checklist.item7) THEN 'foundational7' ELSE NULL END) AS foundational7,
                      COUNT(CASE WHEN (checklist.item8) THEN 'foundational8' ELSE NULL END) AS foundational8,
                      COUNT(CASE WHEN (checklist.item9) THEN 'foundational9' ELSE NULL END) AS foundational9,
                      COUNT(CASE WHEN (checklist.item10) THEN 'foundational0' ELSE NULL END) AS foundational10,
                      COUNT (sessionStart) AS total,
                      teacher,
                      time
                      FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.literacyFoundationalChild
                      where teacher = '${teacherId}' and time <= '${endDate}' and time >= '${startDate}'
                      GROUP BY time, GroupDate, startDate, teacher
                      ORDER BY GroupDate ASC;`;

                      console.log("QUERY: ", sqlQuery);

                      options = {
                          query: sqlQuery,
                          // Location must match that of the dataset(s) referenced in the query.
                          location: 'US',
                      };

                      [job] = await bigquery.createQueryJob(options);
                      console.log(`Job ${job.id} started.`);
                      child = await job.getQueryResults();

                      for(var childIndex in child[0])
                      {
                        let tempChild = child[0][childIndex];
                        tempChild.isChild = true;
                      }

                      console.log("Child => ", child);

                      //console.log(teacher, child)

                      const rows = teacher.concat(child)

                      //console.log(rows)

                      return rows
    }


    /*
     * Writing
     */
    if(observationType == "literacyWritingTeacher")
    {
      sqlQuery = `SELECT FORMAT_DATE('%D', DATE(sessionStart)) AS startDate,
                      DATE(sessionStart) as GroupDate,
                      COUNT(CASE WHEN (checklist.item1) THEN 'writing1' ELSE NULL END) AS writing1,
                      COUNT(CASE WHEN (checklist.item2) THEN 'writing2' ELSE NULL END) AS writing2,
                      COUNT(CASE WHEN (checklist.item3) THEN 'writing3' ELSE NULL END) AS writing3,
                      COUNT(CASE WHEN (checklist.item4) THEN 'writing4' ELSE NULL END) AS writing4,
                      COUNT(CASE WHEN (checklist.item5) THEN 'writing5' ELSE NULL END) AS writing5,
                      COUNT(CASE WHEN (checklist.item6) THEN 'writing6' ELSE NULL END) AS writing6,
                      COUNT(CASE WHEN (checklist.item7) THEN 'writing7' ELSE NULL END) AS writing7,
                      COUNT(CASE WHEN (checklist.item8) THEN 'writing8' ELSE NULL END) AS writing8,
                      COUNT(CASE WHEN (checklist.item9) THEN 'writing9' ELSE NULL END) AS writing9,
                      COUNT (sessionStart) AS total,
                      teacher,
                      time
                      FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.${observationType}
                      where teacher = '${teacherId}' and time <= '${endDate}' and time >= '${startDate}'
                      GROUP BY time, GroupDate, startDate, teacher
                      ORDER BY GroupDate ASC;`;

                      console.log("QUERY: ", sqlQuery);

                      let options = {
                          query: sqlQuery,
                          // Location must match that of the dataset(s) referenced in the query.
                          location: 'US',
                      };

                      let [job] = await bigquery.createQueryJob(options);
                      console.log(`Job ${job.id} started.`);
                      let teacher = await job.getQueryResults();

                      for(var teacherIndex in teacher[0])
                      {
                        let tempTeacher = teacher[0][teacherIndex];
                        tempTeacher.isChild = false;
                      }


      sqlQuery = `SELECT FORMAT_DATE('%D', DATE(sessionStart)) AS startDate,
                      DATE(sessionStart) as GroupDate,
                      COUNT(CASE WHEN (checklist.item1) THEN 'writing1' ELSE NULL END) AS writingChild1,
                      COUNT(CASE WHEN (checklist.item2) THEN 'writing2' ELSE NULL END) AS writingChild2,
                      COUNT(CASE WHEN (checklist.item3) THEN 'writing3' ELSE NULL END) AS writingChild3,
                      COUNT(CASE WHEN (checklist.item4) THEN 'writing4' ELSE NULL END) AS writingChild4,
                      COUNT(CASE WHEN (checklist.item5) THEN 'writing5' ELSE NULL END) AS writingChild5,
                      COUNT(CASE WHEN (checklist.item6) THEN 'writing6' ELSE NULL END) AS writingChild6,
                      COUNT(CASE WHEN (checklist.item7) THEN 'writing7' ELSE NULL END) AS writingChild7,
                      COUNT(CASE WHEN (checklist.item8) THEN 'writing8' ELSE NULL END) AS writingChild8,
                      COUNT(CASE WHEN (checklist.item9) THEN 'writing9' ELSE NULL END) AS writingChild9,
                      COUNT (sessionStart) AS total,
                      teacher,
                      time
                      FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.literacyWritingChild
                      where teacher = '${teacherId}' and time <= '${endDate}' and time >= '${startDate}'
                      GROUP BY time, GroupDate, startDate, teacher
                      ORDER BY GroupDate ASC;`;

                      console.log("QUERY: ", sqlQuery);

                      options = {
                          query: sqlQuery,
                          // Location must match that of the dataset(s) referenced in the query.
                          location: 'US',
                      };

                      [job] = await bigquery.createQueryJob(options);
                      console.log(`Job ${job.id} started.`);
                      child = await job.getQueryResults();

                      for(var childIndex in child[0])
                      {
                        let tempChild = child[0][childIndex];
                        tempChild.isChild = true;
                      }

                      console.log(teacher, child)

                      const rows = teacher.concat(child)

                      console.log(rows)

                      return rows

    }

    /*
     * Book Reading
     */
    if(observationType == "literacyReadingTeacher")
    {
      sqlQuery = `SELECT FORMAT_DATE('%D', DATE(sessionStart)) AS startDate,
                      id,
                      SUM(DISTINCT date_diff(sessionEnd, sessionStart, MILLISECOND)) as totalTime,
                      COUNT(CASE WHEN (checklist.item1 or checklist.item2 or checklist.item3) THEN 'literacy1' ELSE NULL END) AS vocab,
                      COUNT(CASE WHEN (checklist.item4 or checklist.item5 ) THEN 'literacy4' ELSE NULL END) AS makeConnection,
                      COUNT(CASE WHEN (checklist.item6 or checklist.item7 or checklist.item8) THEN 'literacy6' ELSE NULL END) AS support,
                      COUNT(CASE WHEN (checklist.item9) THEN 'literacy9' ELSE NULL END) AS discussions,
                      COUNT(CASE WHEN (checklist.item10) THEN 'literacy10' ELSE NULL END) AS multimodal,
                      COUNT(CASE WHEN (checklist.item1) THEN 'literacy1' ELSE NULL END) AS literacy1,
                      COUNT(CASE WHEN (checklist.item2) THEN 'literacy2' ELSE NULL END) AS literacy2,
                      COUNT(CASE WHEN (checklist.item3) THEN 'literacy3' ELSE NULL END) AS literacy3,
                      COUNT(CASE WHEN (checklist.item4) THEN 'literacy4' ELSE NULL END) AS literacy4,
                      COUNT(CASE WHEN (checklist.item5) THEN 'literacy5' ELSE NULL END) AS literacy5,
                      COUNT(CASE WHEN (checklist.item6) THEN 'literacy6' ELSE NULL END) AS literacy6,
                      COUNT(CASE WHEN (checklist.item7) THEN 'literacy7' ELSE NULL END) AS literacy7,
                      COUNT(CASE WHEN (checklist.item8) THEN 'literacy8' ELSE NULL END) AS literacy8,
                      COUNT(CASE WHEN (checklist.item9) THEN 'literacy9' ELSE NULL END) AS literacy9,
                      COUNT(CASE WHEN (checklist.item10) THEN 'literacy10' ELSE NULL END) AS literacy10,
                      COUNT(CASE WHEN (checklist.item11) THEN 'literacy11' ELSE NULL END) AS literacy11,
                      COUNT (id) AS total,
                      TIMESTAMP_DIFF(sessionEnd, sessionStart, millisecond) AS observationTotalTime,
                      teacher,
                      sessionStart
                      FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.${observationType}
                      where teacher = '${teacherId}' and time <= '${endDate}' and time >= '${startDate}'
                      GROUP BY id, teacher, sessionStart, observationTotalTime
                      ORDER BY sessionStart desc;`;
    }

    /*
     * Language Environment
     */
    if(observationType == "literacyLanguageTeacher")
    {
      sqlQuery = `SELECT FORMAT_DATE('%D', DATE(sessionStart)) AS startDate,
                      DATE(sessionStart) as GroupDate,
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
                      teacher,
                      time
                      FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.${observationType}
                      where teacher = '${teacherId}' and time <= '${endDate}' and time >= '${startDate}'
                      GROUP BY time, GroupDate, startDate, teacher
                      ORDER BY GroupDate ASC;`;
    }



    /*
     * Associative Cooperation
     */
    if(observationType == "ac")
    {
      sqlQuery = `SELECT FORMAT_DATE('%D', DATE(sessionStart)) AS startDate,
                      id,
                      DATE(sessionStart) as GroupDate,
                      COUNT(id) as total,
                      COUNT(CASE WHEN (checklist.teacher1) THEN 'teacher1' ELSE NULL END) AS teacher1,
                      COUNT(CASE WHEN (checklist.teacher2) THEN 'teacher2' ELSE NULL END) AS teacher2,
                      COUNT(CASE WHEN (checklist.teacher3) THEN 'teacher3' ELSE NULL END) AS teacher3,
                      COUNT(CASE WHEN (checklist.teacher4) THEN 'teacher4' ELSE NULL END) AS teacher4,
                      COUNT(CASE WHEN (checklist.child1) THEN 'child1' ELSE NULL END) AS child1,
                      COUNT(CASE WHEN (checklist.child2) THEN 'child2' ELSE NULL END) AS child2,
                      COUNT(CASE WHEN (checklist.child3) THEN 'child3' ELSE NULL END) AS child3,
                      COUNT(CASE WHEN (checklist.child4) THEN 'child4' ELSE NULL END) AS child4,
                      COUNT(CASE WHEN (peopleType = 1 OR peopleType = 2) THEN 'noOpportunity' ELSE NULL END) AS noOpportunity,
                      COUNT(CASE WHEN (peopleType = 3 OR peopleType = 4) AND (checklist.teacher1 OR checklist.teacher2 OR checklist.teacher3 OR checklist.teacher4) THEN 'support' ELSE NULL END) AS support,
                      COUNT(CASE WHEN (peopleType = 3 OR peopleType = 4) AND (checklist.teacher5) THEN 'noSupport' ELSE NULL END) AS noSupport,
                      timestamp,
                      peopleType,
                      teacher,
                      FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.${observationType}
                      where teacher = '${teacherId}' and timestamp <= '${endDate}' and timestamp >= '${startDate}'
                      GROUP BY timestamp, GroupDate, peopleType, startDate, teacher, id
                      ORDER BY GroupDate DESC;`;
    }

    console.log("QUERY: ", sqlQuery);

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
