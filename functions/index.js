const functions = require("firebase-functions")
const BigQuery = require("@google-cloud/bigquery")

exports.observationsToBQ = functions.firestore
    .document("/observations/{observationID}")
    .onCreate(event => {
        console.log(`new create event for document ID: ${event.data.id}`)
        console.log(`new create event for document ID: ${event.data.type}`)


        // Set via: firebase functions:config:set centiment.{dataset,table}
        let config = functions.config()
        let datasetName = config.observation.dataset || "observations"
        let tableName = config.observation.table || "TransitionType"
        let bigquery = new BigQuery()

        let dataset = bigquery.dataset(datasetName)
        dataset.exists().catch(err => {
            console.error(
                `dataset.exists: dataset ${datasetName} does not exist: ${JSON.stringify(
                    err
                )}`
            )
            return err
        })

        let table = dataset.table(tableName)
        table.exists().catch(err => {
            console.error(
                `table.exists: table ${tableName} does not exist: ${JSON.stringify(
                    err
                )}`
            )
            return err
        })

        let document = event.data.data()
        document.id = event.data.id

        let row = {
            insertId: event.data.id,
            json: {
                id: event.data.id,
                count: document.count,
                fetchedAt: document.fetchedAt,
                lastSeenID: document.lastSeenID,
                score: document.score,
                variance: document.variance,
                stdDev: document.stdDev,
                searchTerm: document.searchTerm,
                query: document.query,
                topic: document.topic,
            },
        }

        return table.insert(row, { raw: true }).catch(err => {
            console.error(`table.insert: ${JSON.stringify(err)}`)
            return err
        })
    })