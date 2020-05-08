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
exports.fetchTeacherSeqSummary = async (req, res) => {
  //let message = req.query.message || req.body.message || 'Hello World!';
  
  // The SQL query to run fin avg tone rating for specific session id /observation id
  const sqlQuery = `SELECT
  COUNT(CASE WHEN (peopleType = 3 OR peopleType = 4) AND (checked = 0 OR checked = 1 OR checked = 2 OR checked = 3 OR checked = 4 OR checked = 5 OR checked = 6 OR checked = 7 OR checked = 8) THEN 'support' ELSE NULL END) AS support,
  COUNT(CASE WHEN peopleType = 1 OR ((peopleType = 2) AND (checked = 0 OR checked = 1 OR checked = 2 OR checked = 3 OR checked = 4)) THEN 'noSupport' ELSE NULL END) AS noSupport
FROM cqrefpwa.observations.sequential
WHERE id = `+req.query.id;
  
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

