// Imports the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');

// Creates a client
const bigquery = new BigQuery();

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.fetchInstructionTrend = async (req, res) => {
    //let message = req.query.message || req.body.message || 'Hello World!';

    // The SQL query to run fin avg tone rating for specific session id /observation id
    const sqlQuery = `SELECT 
                    DATE(start) AS dayOfEvent, 
                     COUNT(CASE WHEN instructionType = 'highLevel' THEN 'inferential' WHEN instructionType = 'followUp' THEN 'inferential' ELSE NULL END) AS inferential, 
 					 COUNT(CASE WHEN instructionType = 'lowLevel' THEN 'basicSkills' WHEN instructionType = 'specificSkill' THEN 'basicSkills' ELSE NULL END) AS basicSkills
                  FROM cqrefpwa.observations.level
                  WHERE teacher = '`+req.query.teacher+`'
                  GROUP BY dayofEvent
                  ORDER BY dayofEvent ASC
                  LIMIT 100;`;


    const options = {
        query: sqlQuery,
        // Location must match that of the dataset(s) referenced in the query.
        location: 'US',
    };

    // Runs the query
    const [rows] = await bigquery.query(options);

    console.log('Query Results:');
    //rows.forEach(row => {
    //  const url = row['url'];
    //  const viewCount = row['view_count'];
    //  console.log(`url: ${url}, ${viewCount} views`);
    //});

    res.status(200).send(rows);
};

