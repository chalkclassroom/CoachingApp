const { BigQuery } = require('@google-cloud/bigquery')
const functions = require('firebase-functions')



const bigquery = new BigQuery()


/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

exports.createTables = functions.https.onCall(async (data, context) => {

  console.log('============= CREATE TABLES ===============');

  const datasetId = functions.config().env.bq_dataset;

  let schema = {
    ac_results: [
      {
          "name": "id",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "sessionStart",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "sessionEnd",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "observedBy",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "teacherId",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "type",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "child",
          "type": "INTEGER",
          "mode": "NULLABLE",
          "fields": [
              {
                  "name": "ac",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "noAc",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "noChildOpp",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              }
          ]
      },
      {
          "name": "teacher",
          "type": "INTEGER",
          "mode": "NULLABLE",
          "fields": [
              {
                  "name": "ac",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "noAc",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "notThere",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              }
          ]
      },
      {
          "name": "checklist",
          "type": "INTEGER",
          "mode": "NULLABLE",
          "fields": [
              {
                  "name": "child1",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "child2",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "child3",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "teacher1",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "teacher2",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "teacher3",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "teacher4",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
          ]
      },
      {
          "name": "timestamp",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "acType",
          "type": "STRING",
          "mode": "NULLABLE"
      },
    ],
    climate_results: [
      {
          "name": "id",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "sessionStart",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "sessionEnd",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "observedBy",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "teacher",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "timestamp",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "approval",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "redirection_disapproval",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "specific_approval",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "general_approval",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "redirection",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "disapproval",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "tone",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },

    ],
    engagement_results: [
      {
          "name": "id",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "sessionStart",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "sessionEnd",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "observedBy",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "teacher",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "timestamp",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "engaged",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "off_task",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "small_group",
          "type": "INTEGER",
          "mode": "NULLABLE",
          "fields": [
              {
                  "name": "off_task",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "mildly_engaged",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "engaged",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "highly_engaged",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
          ]
      },
      {
          "name": "whole_group",
          "type": "INTEGER",
          "mode": "NULLABLE",
          "fields": [
              {
                  "name": "off_task",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "mildly_engaged",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "engaged",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "highly_engaged",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
          ]
      },
      {
          "name": "centers",
          "type": "INTEGER",
          "mode": "NULLABLE",
          "fields": [
              {
                  "name": "off_task",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "mildly_engaged",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "engaged",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "highly_engaged",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
          ]
      },
      {
          "name": "transition",
          "type": "INTEGER",
          "mode": "NULLABLE",
          "fields": [
              {
                  "name": "off_task",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "mildly_engaged",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "engaged",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "highly_engaged",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
          ]
      },

    ],
    level_results: [
      {
          "name": "id",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "sessionStart",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "sessionEnd",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "observedBy",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "teacherId",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "timestamp",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "low_level_instruction",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "high_level_instruction",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "teacher",
          "type": "INTEGER",
          "mode": "NULLABLE",
          "fields": [
              {
                  "name": "low",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "high",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
          ]
      },
      {
          "name": "child",
          "type": "INTEGER",
          "mode": "NULLABLE",
          "fields": [
              {
                  "name": "low",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "high",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
          ]
      },


    ],
    listening_results: [
      {
          "name": "id",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "sessionStart",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "sessionEnd",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "observedBy",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "teacher",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "timestamp",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "listen_encouraging",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "no_behaviors",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "eye_level",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "positive_expression",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "repeats_clarifies",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "open_questions",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "expands_talk",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "encourage_talk",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },

    ],
    literacyFoundationalChild_results: [
      {
          "name": "id",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "sessionStart",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "sessionEnd",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "observedBy",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "teacherId",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "timestamp",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "foundational_skills",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "no_behaviors",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "rhyming",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "individual_sounds",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "alphabet",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "letter_sound",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "supporting_children",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "print_concepts",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "matching_spoken_words",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "realistic_reading",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "open_ended_questions",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "activity_setting",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "behavior_type",
          "type": "INTEGER",
          "mode": "NULLABLE",
          "fields": [
              {
                  "name": "awareness",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "alphabetic",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "open_ended",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "realistic_reading",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "multimodal",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
          ]
      },

    ],
    literacyFoundationalTeacher_results: [
      {
          "name": "id",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "sessionStart",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "sessionEnd",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "observedBy",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "teacherId",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "timestamp",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "foundational_skills",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "no_behaviors",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "rhyming",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "individual_sounds",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "alphabet",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "letter_sound",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "supporting_children",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "print_concepts",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "matching_spoken_words",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "realistic_reading",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "open_ended_questions",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "activity_setting",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "behavior_type",
          "type": "INTEGER",
          "mode": "NULLABLE",
          "fields": [
              {
                  "name": "awareness",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "alphabetic",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "open_ended",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "realistic_reading",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "multimodal",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
          ]
      },
      {
          "name": "multi_modal_instruction",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },

    ],
    literacyLanguageTeacher_results: [
      {
          "name": "id",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "sessionStart",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "sessionEnd",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "observedBy",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "teacherId",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "timestamp",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "activity_setting",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "interval_total",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "supporting_development",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "no_behaviors",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "behavior_type",
          "type": "INTEGER",
          "mode": "NULLABLE",
          "fields": [
              {
                  "name": "vocab_social",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "encourage_talk",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "respond",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
          ]
      },
      {
          "name": "discussing_vocab",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "converse_emotions",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "encouraging_storytelling",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "encouraging_listening",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "asking_open_questions",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "enter_childrens_activity",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "clarifying_comments",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "follow_up_questions",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },

    ],
    literacyReadingTeacher_results: [
      {
          "name": "id",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "sessionStart",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "sessionEnd",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "observedBy",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "teacherId",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "timestamp",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "interval_total",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "activity_setting",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "reading_instruction",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "other_behaviors",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "behavior_type",
          "type": "INTEGER",
          "mode": "NULLABLE",
          "fields": [
              {
                  "name": "vocab_focus",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "language_connections",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "children_support",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "fairness_discussions",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "multimodal_instruction",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
          ]
      },
      {
          "name": "discussing_vocab",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "discussing_text_concepts",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "encourage_summarizing",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "relating_books",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "language_connections",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "open_ended_questions",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "follow_up_questions",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "encourage_listening",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "discussing_fairness",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "using_multimodal_instruction",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "activity_setting2",
          "type": "STRING",
          "mode": "NULLABLE"
      },

    ],
    literacyWritingChild_results: [
      {
          "name": "id",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "sessionStart",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "sessionEnd",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "observedBy",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "teachId",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "timestamp",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "activity_setting",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "interval_total",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "supported_writing",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "other_behaviors",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "behavior_type",
          "type": "INTEGER",
          "mode": "NULLABLE",
          "fields": [
              {
                  "name": "writing_content",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "print_process",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
          ]
      },
      {
          "name": "talks_content_meaning",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "draws_meaning",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "makes_forms",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "says_message_aloud",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "writes_name_letters",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "uses_alphabet_knowledge",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "spellings",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "reads_message",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },

    ],
    literacyWritingTeacher_results: [
      {
          "name": "id",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "sessionStart",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "sessionEnd",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "observedBy",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "teachId",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "timestamp",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "activity_setting",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "interval_total",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "supported_writing",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "other_behaviors",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "behavior_type",
          "type": "INTEGER",
          "mode": "NULLABLE",
          "fields": [
              {
                  "name": "writing_content",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "print_process",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
          ]
      },
      {
          "name": "talks_about_content",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "invites_writing_message",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "writes_meaningful_message",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "demonstrates_print_process",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "invites_writing_name",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "positive_response_writing",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "supports_inventive_spelling",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "invites_reading_message",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },

    ],
    math_results: [
      {
          "name": "id",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "sessionStart",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "sessionEnd",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "observedBy",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "teacherId",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "timestamp",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "total_visits",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "child",
          "type": "INTEGER",
          "mode": "NULLABLE",
          "fields": [
              {
                  "name": "math",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "noMath",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "noChildOpp",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
          ]
      },
      {
          "name": "teacher",
          "type": "INTEGER",
          "mode": "NULLABLE",
          "fields": [
              {
                  "name": "math",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "noMath",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "notThere",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
          ]
      },
      {
          "name": "checklist",
          "type": "INTEGER",
          "mode": "NULLABLE",
          "fields": [
              {
                  "name": "child1",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "child2",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "child3",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "child4",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "teacher1",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "teacher2",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "teacher3",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "teacher4",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
          ]
      },

    ],
    sequential_results: [
      {
          "name": "id",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "sessionStart",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "sessionEnd",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "observedBy",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "teacherId",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "timestamp",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "total_visits",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "child",
          "type": "INTEGER",
          "mode": "NULLABLE",
          "fields": [
              {
                  "name": "seq",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "noSeq",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "noChildOpp",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
          ]
      },
      {
          "name": "teacher",
          "type": "INTEGER",
          "mode": "NULLABLE",
          "fields": [
              {
                  "name": "seq",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "noSeq",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "noChildOpp",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
          ]
      },

      {
          "name": "checklist",
          "type": "INTEGER",
          "mode": "NULLABLE",
          "fields": [
              {
                  "name": "child1",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "child2",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "child3",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "child4",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "teacher1",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "teacher2",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "teacher3",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
              {
                  "name": "teacher4",
                  "type": "INTEGER",
                  "mode": "NULLABLE"
              },
          ]
      },



    ],
    transition_results: [
      {
          "name": "id",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "sessionStart",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "sessionEnd",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "observedBy",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "teacherId",
          "type": "STRING",
          "mode": "NULLABLE"
      },
      {
          "name": "timestamp",
          "type": "TIMESTAMP",
          "mode": "NULLABLE"
      },
      {
          "name": "transition_total",
          "type": "INTEGER",
          "mode": "NULLABLE"
      },
      {
          "name": "transition_time",
          "type": "FLOAT",
          "mode": "NULLABLE"
      },
      {
          "name": "learning_activity",
          "type": "FLOAT",
          "mode": "NULLABLE"
      },
      {
          "name": "transition_type",
          "type": "FLOAT",
          "mode": "NULLABLE",
          "fields": [
              {
                  "name": "waiting_in_line",
                  "type": "FLOAT",
                  "mode": "NULLABLE"
              },
              {
                  "name": "traveling",
                  "type": "FLOAT",
                  "mode": "NULLABLE"
              },
              {
                  "name": "children_waiting",
                  "type": "FLOAT",
                  "mode": "NULLABLE"
              },
              {
                  "name": "classroom_routines",
                  "type": "FLOAT",
                  "mode": "NULLABLE"
              },
              {
                  "name": "behavior_management",
                  "type": "FLOAT",
                  "mode": "NULLABLE"
              },
              {
                  "name": "other",
                  "type": "FLOAT",
                  "mode": "NULLABLE"
              },
          ]
      },

    ],
  };


  Object.entries(schema).forEach(async(entry) => {
    const [key, value] = entry;

    let table_options = {
      schema: value,
      location: 'US',
    };

    // Create a new table in the dataset
    try{
      const [table] = await bigquery
        .dataset(datasetId)
        .createTable(key, table_options);

      console.log(`---------- Table ${table.id} created. ------------`);
    } catch(e)
    {
      console.error("[Error] => " + e);
    }

  });

  console.log('============= END TABLE CREATION ===============');

})
