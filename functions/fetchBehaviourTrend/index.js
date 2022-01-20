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
exports.fetchBehaviourTrend = async (req, res) => {
  //let message = req.query.message || req.body.message || 'Hello World!';

  // The SQL query to run fin avg tone rating for specific session id /observation id
  const sqlQuery = `SELECT 
                    DATE(start) AS dayOfEvent, 
                    COUNT(CASE WHEN behaviorResponse = 'specificapproval' THEN 'positive' WHEN behaviorResponse = 'nonspecificapproval' THEN 'positive' ELSE NULL END) AS positive, 
                    COUNT(CASE WHEN behaviorResponse = 'redirection' THEN 'negative' WHEN behaviorResponse = 'disapproval' THEN 'negative' ELSE NULL END) AS negative
                  FROM ${process.env.BQ_PROJECT_ID}.${process.env.BQ_DATASET}.climate
                  WHERE teacher = '`+req.query.teacher+`' AND (type = 'transition' OR type = 'instruction')
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
