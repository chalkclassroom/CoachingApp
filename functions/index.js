const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

/*
* In order for these functions to work correctly,
* the Cloud Functions Invoker role must be set for allUsers.
* For functions missing this permission,
* follow the instructions in the temp fix mentioned here:
* https://github.com/firebase/firebase-functions/issues/646#issuecomment-606044335
*
* If any additional environments are created, the Browser API key should be
* restricted based on HTTP referrers as outlined here
* https://cloud.google.com/docs/authentication/api-keys?hl=en&visit_id=637801009870730225-1967615930&rd=1#api_key_restrictions
* */

exports.fetchACDetails = require('./fetchACDetails').fetchACDetails;
exports.fetchAvgToneRating = require('./fetchAvgToneRating').fetchAvgToneRating;
exports.fetchBehaviourTrend = require('./fetchBehaviourTrend').fetchBehaviourTrend;
exports.fetchBehaviourTypeCount = require('./fetchBehaviourTypeCount').fetchBehaviourTypeCount;
exports.fetchChildACSummary = require('./fetchChildACSummary').fetchChildACSummary;
exports.fetchChildACTrend = require('./fetchChildACTrend').fetchChildACTrend;
exports.fetchChildSeqSummary = require('./fetchChildSeqSummary').fetchChildSeqSummary;
exports.fetchChildSeqTrend = require('./fetchChildSeqTrend').fetchChildSeqTrend;
exports.fetchInstructionTrend = require('./fetchInstructionTrend').fetchInstructionTrend;
exports.fetchInstructionTypeCount = require('./fetchInstructionTypeCount').fetchInstructionTypeCount;
exports.fetchSeqDetails = require('./fetchSeqDetails').fetchSeqDetails;
exports.fetchSessionDates = require('./fetchSessionDates').fetchSessionDates;
exports.fetchTeacherACSummary = require('./fetchTeacherACSummary').fetchTeacherACSummary;
exports.fetchTeacherACTrend = require('./fetchTeacherACTrend').fetchTeacherACTrend;
exports.fetchTeacherSeqSummary = require('./fetchTeacherSeqSummary').fetchTeacherSeqSummary;
exports.fetchTeacherSeqTrend = require('./fetchTeacherSeqTrend').fetchTeacherSeqTrend;
exports.fetchTransitionLog = require('./fetchTransitionLog').fetchTransitionLog;
exports.fetchTransitionsTrend = require('./fetchTransitionsTrend').fetchTransitionsTrend;
exports.fetchSiteProfileAverages = require('./fetchSiteProfileAverages').fetchSiteProfileAverages;
exports.fetchTeacherProfileAverages = require('./fetchTeacherProfileAverages').fetchTeacherProfileAverages;
exports.fetchTeacherProfileReadingTrend = require('./fetchTeacherProfileReadingTrend').fetchTeacherProfileReadingTrend;
exports.fetchCoachProfile = require('./fetchCoachProfile').fetchCoachProfile;

exports.funcACDetails = require('./funcACDetails').funcACDetails;
exports.funcAvgToneRating = require('./funcAvgToneRating').funcAvgToneRating;
exports.funcBehaviourTrend = require('./funcBehaviourTrend').funcBehaviourTrend;
exports.funcBehaviourTypeCount = require('./funcBehaviourTypeCount').funcBehaviourTypeCount;
exports.funcChildACSummary = require('./funcChildACSummary').funcChildACSummary;
exports.funcChildACTrend = require('./funcChildACTrend').funcChildACTrend;
exports.funcChildMathSummary = require('./funcChildMathSummary').funcChildMathSummary;
exports.funcChildMathTrend = require('./funcChildMathTrend').funcChildMathTrend;
exports.funcChildSeqSummary = require('./funcChildSeqSummary').funcChildSeqSummary;
exports.funcChildSeqTrend = require('./funcChildSeqTrend').funcChildSeqTrend;
exports.funcEngagementAvgSummary = require('./funcEngagementAvgSummary').funcEngagementAvgSummary;
exports.funcEngagementDetails = require('./funcEngagementDetails').funcEngagementDetails;
exports.funcEngagementPieSummary = require('./funcEngagementPieSummary').funcEngagementPieSummary;
exports.funcEngagementTrend = require('./funcEngagementTrend').funcEngagementTrend;
exports.funcInstructionTrend = require('./funcInstructionTrend').funcInstructionTrend;
exports.funcInstructionTypeCount = require('./funcInstructionTypeCount').funcInstructionTypeCount;
exports.funcListeningDetails = require('./funcListeningDetails').funcListeningDetails;
exports.funcListeningSummary = require('./funcListeningSummary').funcListeningSummary;
exports.funcListeningTrend = require('./funcListeningTrend').funcListeningTrend;
exports.funcLiteracyDetailsFoundational = require('./funcLiteracyDetailsFoundational').funcLiteracyDetailsFoundational;
exports.funcLiteracyDetailsWriting = require('./funcLiteracyDetailsWriting').funcLiteracyDetailsWriting;
exports.funcLiteracyDetailsReading = require('./funcLiteracyDetailsReading').funcLiteracyDetailsReading;
exports.funcLiteracyDetailsLanguage = require('./funcLiteracyDetailsLanguage').funcLiteracyDetailsLanguage;
exports.funcLiteracySessionDates = require('./funcLiteracySessionDates').funcLiteracySessionDates;
exports.funcLiteracySummaryFoundational = require('./funcLiteracySummaryFoundational').funcLiteracySummaryFoundational;
exports.funcLiteracySummaryWriting = require('./funcLiteracySummaryWriting').funcLiteracySummaryWriting;
exports.funcLiteracySummaryReading = require('./funcLiteracySummaryReading').funcLiteracySummaryReading;
exports.funcLiteracySummaryLanguage = require('./funcLiteracySummaryLanguage').funcLiteracySummaryLanguage;
exports.funcLiteracyTrendFoundationalTeacher = require('./funcLiteracyTrendFoundationalTeacher').funcLiteracyTrendFoundationalTeacher;
exports.funcLiteracyTrendFoundationalChild = require('./funcLiteracyTrendFoundationalChild').funcLiteracyTrendFoundationalChild;
exports.funcLiteracyTrendWriting = require('./funcLiteracyTrendWriting').funcLiteracyTrendWriting;
exports.funcLiteracyTrendReading = require('./funcLiteracyTrendReading').funcLiteracyTrendReading;
exports.funcLiteracyTrendLanguage = require('./funcLiteracyTrendLanguage').funcLiteracyTrendLanguage;
exports.funcMathDetails = require('./funcMathDetails').funcMathDetails;
exports.funcRecentObservations = require('./funcRecentObservations').funcRecentObservations;
exports.funcSendEmail = require('./funcSendEmail').funcSendEmail;
exports.funcSendMLE = require('./funcSendMLE').funcSendMLE;
exports.funcSeqDetails = require('./funcSeqDetails').funcSeqDetails;
exports.funcSessionDates = require('./funcSessionDates').funcSessionDates;
exports.funcSessionDatesTransition = require('./funcSessionDatesTransition').funcSessionDatesTransition;
exports.funcTeacherACSummary = require('./funcTeacherACSummary').funcTeacherACSummary;
exports.funcTeacherACTrend = require('./funcTeacherACTrend').funcTeacherACTrend;
exports.funcTeacherMathTrend = require('./funcTeacherMathTrend').funcTeacherMathTrend;
exports.funcTeacherMathSummary = require('./funcTeacherMathSummary').funcTeacherMathSummary;
exports.funcTeacherSeqSummary = require('./funcTeacherSeqSummary').funcTeacherSeqSummary;
exports.funcTeacherSeqTrend = require('./funcTeacherSeqTrend').funcTeacherSeqTrend;
exports.funcTransitionLog = require('./funcTransitionLog').funcBehaviourTrend;
exports.funcTransitionLogNew = require('./funcTransitionLogNew').funcTransitionLogNew;
exports.funcTransitionSessionDates = require('./funcTransitionSessionDates').funcTransitionSessionDates;
exports.funcTransitionSessionSummary = require('./funcTransitionSessionSummary').funcTransitionSessionSummary;
exports.funcTransitionTrend = require('./funcTransitionTrend').funcBehaviourTrend;
exports.funcTransitionTrend2 = require('./funcTransitionTrend2').funcBehaviourTrend;
exports.funcTransitionTrendNew = require('./funcTransitionTrendNew').funcTransitionTrendNew;
exports.funcTransitionTypeSummary = require('./funcTransitionTypeSummary').funcTransitionTypeSummary;
exports.funcUpdateCoach = require('./funcUpdateCoach').funcUpdateCoach;
exports.observationsToBQ = require('./observationToBQ').observationsToBQ;
exports.exportBqData = require('./exportBqData').exportBqData;

exports.funcAddToTransferLogsOnUpdate = require('./funcAddToTransferLogs').funcAddToTransferLogsOnUpdate;
exports.funcAddToTransferLogsOnPartnerCreate = require('./funcAddToTransferLogs').funcAddToTransferLogsOnPartnerCreate;
exports.retrieveTableFromFirestore = require('./retrieveTableFromFirestore').retrieveTableFromFirestore;
