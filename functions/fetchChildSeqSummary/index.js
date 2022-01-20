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

exports.fetchChildSeqSummary = async(req, res) => {
  //SQL query to get number of checks for each item on checklist
  const sqlQuery = `SELECT
  COUNT(CASE WHEN (peopleType = 1) THEN 'noOpp' ELSE NULL END) AS noOpportunity,
  COUNT(CASE WHEN (peopleType = 2 OR peopleType = 3 OR peopleType = 4) AND (checked = 1 OR checked = 2 OR checked = 3 OR checked = 4 OR checked = 5 OR checked = 6 OR checked = 7 OR checked = 8) THEN 'sequential' ELSE NULL END) AS sequential,
  COUNT(CASE WHEN (peopleType = 2 OR peopleType = 3 OR peopleType = 4) AND checked = 0 THEN 'sequential' ELSE NULL END) AS nonSequential
FROM ${process.env.BQ_PROJECT_ID}.${process.env.BQ_DATASET}.sequential
WHERE id =` + req.query.id;

  const options = {
    query: sqlQuery,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
  };

  // Runs the query
  const [rows] = await bigquery.query(options);

  res.status(200).send(rows);
};

