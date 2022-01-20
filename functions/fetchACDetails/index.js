// Imports the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');

const {canAccessTeacher} = require('../common/accessUtils')
// Creates a client
const bigquery = new BigQuery();

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

exports.fetchACDetails = async(req, res) => {
  //TODO this seems like it's not used?!
  //SQL query to get number of checks for each item on checklist
  const sqlQuery = `SELECT
                    COUNT(CASE WHEN (peopleType = 2 OR peopleType = 3 OR peopleType = 4) AND (checked = 1 OR checked = 2) THEN 'associative' ELSE NULL END) AS associative,
                    COUNT(CASE WHEN (peopleType = 2 OR peopleType = 3 OR peopleType = 4) AND (checked = 3 OR checked = 4) THEN 'cooperative' ELSE NULL END) AS cooperative,
                    COUNT(CASE WHEN (peopleType = 3 OR peopleType = 4) AND (checked = 5 OR checked = 6 OR checked = 7 OR checked = 8) THEN 'teacherBehavior' ELSE NULL END) AS teacherBehavior
                    FROM ${process.env.BQ_PROJECT_ID}.${process.env.BQ_DATASET}.ac
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
