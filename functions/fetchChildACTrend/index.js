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
exports.fetchChildACTrend = async (req, res) => {
  //let message = req.query.message || req.body.message || 'Hello World!';

  // The SQL query to run fin avg tone rating for specific session id /observation id
  const sqlQuery = `SELECT DATE(sessionStart) AS startDate,
  COUNT(CASE WHEN acType = 'noOpportunity' AND (peopleType = 1) THEN 'noOpportunity' ELSE NULL END) AS noOpportunity,
  COUNT(CASE WHEN acType = 'ac' AND (peopleType = 2 OR peopleType = 3 OR peopleType = 4) AND (checked = 1 OR checked = 2 OR checked = 3 OR checked = 4 OR checked = 5 OR checked = 6 OR checked = 7 OR checked = 8) THEN 'ac' ELSE NULL END) AS ac,
  COUNT(CASE WHEN acType = 'noac' AND (peopleType = 2 OR peopleType = 3 OR peopleType = 4) AND checked = 0 THEN 'noac' ELSE NULL END) as noac
FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.ac
WHERE teacher = '`+req.query.teacher+`'
GROUP BY startDate
ORDER BY startDate ASC;`;

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

