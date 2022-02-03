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
exports.fetchSessionDates = async (req, res) => {
  //let message = req.query.message || req.body.message || 'Hello World!';

  // The SQL query to run
  const sqlQuery = `SELECT DISTINCT id, start FROM ${functions.config().env.bq_project}.${functions.config().env.bq_dataset}.climate WHERE observedBy = '`+req.query.coach+`' AND teacher = '`+req.query.teacher+`' ORDER BY start DESC LIMIT 100`;

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
