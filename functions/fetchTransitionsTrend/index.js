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
exports.fetchTransitionsTrend = async (req, res) => {
  //let message = req.query.message || req.body.message || 'Hello World!';

  // The SQL query to run
  const sqlQuery = `SELECT DATE(sessionStart) AS startDate,
      SUM(CASE WHEN type = 'inside' THEN TIMESTAMP_DIFF(transitionEnd ,transitionStart, millisecond) ELSE 0 END) AS inside,
      SUM(CASE WHEN type = 'outside' THEN TIMESTAMP_DIFF(transitionEnd ,transitionStart, millisecond) ELSE 0 END) AS outside,
      SUM(TIMESTAMP_DIFF(transitionEnd ,transitionStart, millisecond)) AS total,
      SUM(TIMESTAMP_DIFF(sessionEnd ,sessionStart, millisecond)) AS sessionTotal
      FROM cqrefpwa.observations.transition
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

