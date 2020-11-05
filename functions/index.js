const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


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

exports.funcACDetails = require('./funcACDetails').funcACDetails;
exports.funcAvgToneRating = require('./funcAvgToneRating').funcAvgToneRating;
exports.funcBehaviourTrend = require('./funcBehaviourTrend').funcBehaviourTrend;
exports.funcBehaviourTypeCount = require('./funcBehaviourTypeCount').funcBehaviourTypeCount;
exports.funcChildACSummary = require('./funcChildACSummary').funcChildACSummary;
exports.funcChildACTrend = require('./funcChildACTrend').funcChildACTrend;
exports.funcChildMathSummary = require('./funcChildMathSummary').funcChildMathSummary;
exports.funcChildMathTred = require('./funcChildMathTrend').funcChildMathTrend;
exports.funcChildSeqSummary = require('./funcChildSeqSummary').funcChildSeqSummary;
exports.funcChildSeqTrend = require('./funcChildSeqTrend').funcChildSeqTrend;
exports.funcEngagementAvgSummary = require('./funcEngagementAvgSummary').funcEngagementAvgSummary;
exports.funcEngagementDetails = require('./funcEngagementDetails').funcEngagementDetails;
exports.funcEngagementPieSummary = require('./funcEngagementPieSummary').funcEngagementPieSummary;
exports.funcEnagementTrend = require('./funcEngagementTrend').funcEngagementTrend;
exports.funcInstructionTrend = require('./funcInstructionTrend').funcInstructionTrend;
exports.funcInstructionTypeCount = require('./funcInstructionTypeCount').funcInstructionTypeCount;
exports.funcListeningDetails = require('./funcListeningDetails').funcListeningDetails;
exports.funcListeningSummary = require('./funcListeningSummary').funcListeningSummary;
exports.funcListeningTrend = require('./funcListeningTrend').funcListeningTrend;
exports.funcMathDetails = require('./funcMathDetails').funcMathDetails;
exports.funcSendEmail = require('./funcSendEmail').funcSendEmail;
exports.funcSeqDetails = require('./funcSeqDetails').funcSeqDetails;
exports.funcSessionDates = require('./funcSessionDates').funcSessionDates;
exports.funcSessionDatesTransition = require('./funcSessionDatesTransition').funcSessionDatesTransition;
exports.funcTeacherACSummary = require('./funcTeacherACSummary').funcTeacherACSummary;
exports.funcTeacherACTrend = require('./funcTeacherACTrend').funcTeacherACTrend;
exports.funcTeacherMathTrend = require('./funcTeacherMathTrend').funcTeacherMathTrend;
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
exports.observationsToBQ = require('./observationToBQ').observationsToBQ;
