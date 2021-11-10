const { BigQuery } = require('@google-cloud/bigquery')
const functions = require('firebase-functions')
const Firestore = require('@google-cloud/firestore')
const PROJECTID = 'cqrefpwa'
const COLLECTION_NAME = 'observations'
const firestore = new Firestore({
  projectId: PROJECTID,
})

const bigquery = new BigQuery()

JSON.flatten = function(data) {
  let result = {}

  function recurse(cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur
    } else if (Array.isArray(cur)) {
      let l = cur.length
      for (let i = 0; i < l; i++)
        recurse(cur[i], prop ? prop + '.' + i : '' + i)
      if (l === 0)
        result[prop] = []
    } else {
      let isEmpty = true
      for (let p in cur) {
        isEmpty = false
        if (p === 'value') {
          result[prop] = cur[p]
        } else {
          recurse(cur[p], prop ? prop + '.' + p : p)
        }
      }
      if (isEmpty)
        result[prop] = {}
    }
  }

  recurse(data, '')
  return result
}
const calculateKeyLength = obj => {
  if (typeof obj !== 'object') {
    return 0
  }
  let keys = Object.keys(obj)
  return keys.map(k => calculateKeyLength(obj[k]))
    .reduce((prev, cur) => prev + cur, keys.length)
}

const tables = {
  'ac': 'ac',
  'climate': 'climate',
  'engagement': 'engagement',
  'level': 'level',
  'listening': 'listening',
  'math': 'math',
  'sequential': 'sequential',
  'transition': 'transition',
  'literacyFoundationalChild': 'literacyFoundationalChild',
  'literacyWritingChild': 'literacyWritingChild',
  'literacyFoundationalTeacher': 'literacyFoundationalTeacher',
  'literacyLanguageTeacher': 'literacyLanguageTeacher',
  'literacyReadingTeacher': 'literacyReadingTeacher',
  'literacyWritingTeacher': 'literacyWritingTeacher',

}

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

exports.exportBqData = functions.https.onCall(async (data, context) => {
  const role = await firestore.collection('users')
    .doc(context.auth.uid)
    .get()
    .then(doc => doc.data().role)
    .catch(error => console.error('Error getting cached document:', error))

  if (role !== 'admin') {
    console.log(`User ${context.auth.uid} has role ${role} which is not admin`)
    return ''
  }

  //use lookup table to support dynamic/parameterized table name, but
  //sanitize the input. AFAIK you can't use 'params' for table names
  const table = tables[data.tableName]
  if (!table) {
    return ''
  }



  const sqlQuery = `select * from cqrefpwa.observations.${table} where sessionStart > @from and sessionEnd < @to `

  const options = {
    query: sqlQuery,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
    params: {
      from: data.from,
      to: data.to,
    },
  }

  const [job] = await bigquery.createQueryJob(options)
  console.log(`Job ${job.id} started.`)

  //returns [[{result}, {result},etc...]]
  const rows = await job.getQueryResults()
  if (rows.length === 0 || rows[0].length === 0) {
    return ''
  }
  const result = rows[0].map(r => JSON.flatten(r))
  const headers = Object.keys(result[0])

  let csv = `${headers.join(',')}\n`
  csv += result.map(r => Object.keys(r).map(k => `${r[k]}`).join(',')).join('\n')
  return csv
})