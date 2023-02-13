// Array used to match the name of a practice to the teacher Column name
const teacherColumnArr = {
  transitionTime: 'teacherId',
  classroomClimate: 'teacher',
  mathInstruction: 'teacherId',
  levelOfInstruction: 'teacherId',
  studentEngagement: 'teacher',
  listeningToChildren: 'teacher',
  sequentialActivities: 'teacherId',
  foundationSkills: 'teacherId',
  writing: 'teachId',
  bookReading: 'teacherId',
  languageEnvironment: 'teacherId',
  associativeSndCooperative: 'teacherId',
}

class AveragesData {
  constructor() {}

  /*
   * Will return an object that holds data for all of the trends data for Book Reading
   */
  calculateTransitionAverage = (data, teachers) => {
    // Initialize the array that will hold all the data
    var results = {}

    // Add each teacher to the object
    var tempName = ''
    for (var teacherIndex in teachers) {
      tempName =
        teachers[teacherIndex].firstName + ' ' + teachers[teacherIndex].lastName

      results[teachers[teacherIndex].id] = {
        name: tempName,
        total: 0,
        line: 0,
        traveling: 0,
        waiting: 0,
        routines: 0,
        behaviorManagement: 0,
        other: 0,
        totalTransitionTime: 0,
        totalTransitionCount: 0,
        sessionTotal: 0,
      }
    }

    // Get number of instances for each type of data
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = row.teacher.split('/')[2]

      // Add to behavior types
      results[teacherId].line += row.line
      results[teacherId].traveling += row.traveling
      results[teacherId].waiting += row.waiting
      results[teacherId].routines += row.routines
      results[teacherId].behaviorManagement += row.behaviorManagement
      results[teacherId].other += row.other

      // Calculate the total Number of instructions
      results[teacherId].total += row.sessionTotal
      results[teacherId].totalTransitionTime += row.total
    }

    var siteBar = {
      name: 'Site Average',
      total: 0,
      transitionTimeAverage: 0,
      learningActivityAverage: 0,
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      var tempTotalInstructions = result.totalInstructions

      result.transitionTimeAverage =
        result.total > 0
          ? (result.totalTransitionTime / result.total).toFixed(2) * 100
          : 0
      result.learningActivityAverage =
        result.totalTransitionTime > 0 ? 100 - result.transitionTimeAverage : 0

      // Gather info for the site bar
      siteBar.transitionTimeAverage += result.transitionTimeAverage
      siteBar.learningActivityAverage += result.learningActivityAverage
    }

    // Calculate the site bar averages
    // siteBar.hlqAverage = siteBar.hlq > 0 ? (siteBar.hlq / siteBar.total).toFixed(2) * 100 : 0;
    // siteBar.hlqResponseAverage = siteBar.hlqResponse > 0 ? (siteBar.hlqResponse / siteBar.total).toFixed(2) * 100 : 0;
    // siteBar.llqAverage = siteBar.llq > 0 ? (siteBar.llq / siteBar.total).toFixed(2) * 100 : 0;
    // siteBar.llqResponseAverage = siteBar.llqResponse > 0 ? (siteBar.llqResponse / siteBar.total).toFixed(2) * 100 : 0;

    // Calculate the site bar averages
    // siteBar.transitionTimeAverage =
    //   siteBar.transitionTimeAverage > 0
    //     ? Math.round(
    //         parseFloat(
    //           (
    //             siteBar.transitionTimeAverage / Object.keys(results).length
    //           ).toFixed(2)
    //         )
    //       )
    //     : 0
    // siteBar.learningActivityAverage =
    //   siteBar.learningActivityAverage > 0
    //     ? Math.round(
    //         parseFloat(
    //           (
    //             siteBar.learningActivityAverage / Object.keys(results).length
    //           ).toFixed(2)
    //         )
    //       )
    //     : 0

    results.siteBar = siteBar

    console.log('RESULTS ======>>> ', results)

    return results
  }

  /*
   * Classroom Climate
   */
  calculateClimateAverage = (data, teachers) => {
    // Initialize the array that will hold all the data
    var results = {}

    // Add each teacher to the object
    var tempName = ''
    for (var teacherIndex in teachers) {
      tempName =
        teachers[teacherIndex].firstName + ' ' + teachers[teacherIndex].lastName

      results[teachers[teacherIndex].id] = {
        name: tempName,
        total: 0,
        nonspecificapproval: 0,
        specificapproval: 0,
        disapproval: 0,
        redirection: 0,
        toneTotal: 0,
        toneCount: 0,
      }
    }

    // Get number of instances for each type of data
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = row.teacher.split('/')[2]

      // Add to behavior types
      // There's a problem where an extra row is being saved where the behaviorResponse is being saved as a number. No idea why but we have to make sure we don't use that row
      if (
        row.behaviorResponse === 'nonspecificapproval' ||
        row.behaviorResponse === 'specificapproval' ||
        row.behaviorResponse === 'disapproval' ||
        row.behaviorResponse === 'redirection'
      ) {
        results[teacherId][row.behaviorResponse] += row.count
        results[teacherId].total += row.count
      }

      // Get tone rating
      if (row.toneRating !== null) {
        results[teacherId].toneTotal += row.toneRating
        results[teacherId].toneCount++
      }
    }

    // We're going to have a bar for site's total averages lets gather info for that
    var siteBar = {
      name: 'Site Average',

      total: 0,

      nonspecificapproval: 0,
      specificapproval: 0,
      disapproval: 0,
      redirection: 0,

      toneTotal: 0,
      toneCount: 0,
    }

    // Calculate the averages in percentages
    // Go through each teacher
    let numberOfTeachersWithData = 0;
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      var tempTotalInstructions = result.total

      result.nonspecificapprovalAverage =
        result.nonspecificapproval > 0
          ? (result.nonspecificapproval / tempTotalInstructions).toFixed(2) *
            100
          : 0
      result.specificapprovalAverage =
        result.specificapproval > 0
          ? (result.specificapproval / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.disapprovalAverage =
        result.disapproval > 0
          ? (result.disapproval / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.redirectionAverage =
        result.redirection > 0
          ? (result.redirection / tempTotalInstructions).toFixed(2) * 100
          : 0

      result.toneAverage =
        result.toneCount > 0
          ? (result.toneTotal / result.toneCount).toFixed(1)
          : 0

      // Gather info for the site bar
      siteBar.nonspecificapproval += result.nonspecificapprovalAverage
      siteBar.specificapproval += result.specificapprovalAverage
      siteBar.disapproval += result.disapprovalAverage
      siteBar.redirection += result.redirectionAverage

      siteBar.toneCount += result.toneCount
      siteBar.toneTotal += result.toneTotal

      siteBar.total += result.total

      if(result.total > 0)
      {
        numberOfTeachersWithData++;
      }
    }

    // Calculate the site bar averages
    //siteBar.nonspecificapprovalAverage = siteBar.nonspecificapproval > 0 ? (siteBar.nonspecificapproval / siteBar.total).toFixed(2) * 100 : 0;
    //siteBar.specificapprovalAverage = siteBar.specificapproval > 0 ? (siteBar.specificapproval / siteBar.total).toFixed(2) * 100 : 0;
    //siteBar.disapprovalAverage = siteBar.disapproval > 0 ? (siteBar.disapproval / siteBar.total).toFixed(2) * 100 : 0;
    //siteBar.redirectionAverage = siteBar.redirection > 0 ? (siteBar.redirection / siteBar.total).toFixed(2) * 100 : 0;

    siteBar.nonspecificapprovalAverage =
      siteBar.nonspecificapproval > 0
        ? Math.round(
            parseFloat(
              (
                siteBar.nonspecificapproval / numberOfTeachersWithData
              ).toFixed(2)
            )
          )
        : 0
    siteBar.specificapprovalAverage =
      siteBar.specificapproval > 0
        ? Math.round(
            parseFloat(
              (siteBar.specificapproval / numberOfTeachersWithData).toFixed(
                2
              )
            )
          )
        : 0
    siteBar.disapprovalAverage =
      siteBar.disapproval > 0
        ? Math.round(
            parseFloat(
              (siteBar.disapproval / numberOfTeachersWithData).toFixed(2)
            )
          )
        : 0
    siteBar.redirectionAverage =
      siteBar.redirection > 0
        ? Math.round(
            parseFloat(
              (siteBar.redirection / numberOfTeachersWithData).toFixed(2)
            )
          )
        : 0

    siteBar.toneAverage =
      siteBar.toneCount > 0
        ? (siteBar.toneTotal / siteBar.toneCount).toFixed(1)
        : 0

    results.siteBar = siteBar

    console.log('RESULTS ======>>> ', results)

    return results
  }

  /*
   * Math Instructions
   */
  calculateMathAverages = (data, teachers) => {
    // Initialize the array that will hold all the data
    var results = {}

    var totalIntervals = 0

    // Add each teacher to the object
    var tempName = ''
    for (var teacherIndex in teachers) {
      tempName =
        teachers[teacherIndex].firstName + ' ' + teachers[teacherIndex].lastName

      results[teachers[teacherIndex].id] = {
        name: tempName,
        totalInstructions: 0,
        totalInstructionsChild: 0,
        mathVocabulary: 0,
        askingQuestions: 0,
        mathConcepts: 0,
        helpingChildren: 0,
        notAtCenter: 0,
        noSupport: 0,
        support: 0,
        counting: 0,
        shapes: 0,
        patterns: 0,
        measurement: 0,
        childMathTotal:0,
        childOtherTotal:0,
      }
    }

    // Get number of instances for each type of data
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = row.teacher.split('/')[2]

      // Add to behavior types
      results[teacherId].mathVocabulary += row.mathVocabulary
      results[teacherId].askingQuestions += row.askingQuestions
      results[teacherId].mathConcepts += row.mathConcepts
      results[teacherId].helpingChildren += row.helpingChildren

      results[teacherId].counting += row.counting
      results[teacherId].shapes += row.shapes
      results[teacherId].patterns += row.patterns
      results[teacherId].measurement += row.measurement

      results[teacherId].notAtCenter += row.noOpportunity
      results[teacherId].support += row.support
      results[teacherId].noSupport += row.noSupport

      results[teacherId].childOtherTotal += row.childOther;

      // Calculate the total Number of instructions
      results[teacherId].totalInstructions += row.noSupport + row.support

      var tempTotal = row.noSupport + row.noOpportunity + row.support;
      results[teacherId].totalInstructionsChild += tempTotal;

      results[teacherId].childMathTotal += tempTotal - row.childOther;
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      var tempTotalInstructions = result.totalInstructions

      result.mathVocabularyAverage =
        result.mathVocabulary > 0
          ? (result.mathVocabulary / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.askingQuestionsAverage =
        result.askingQuestions > 0
          ? (result.askingQuestions / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.mathConceptsAverage =
        result.mathConcepts > 0
          ? (result.mathConcepts / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.helpingChildrenAverage =
        result.helpingChildren > 0
          ? (result.helpingChildren / tempTotalInstructions).toFixed(2) * 100
          : 0

      result.countingAverage =
        result.counting > 0
          ? (result.counting / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.shapesAverage =
        result.shapes > 0
          ? (result.shapes / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.patternsAverage =
        result.patterns > 0
          ? (result.patterns / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.measurementAverage =
        result.measurement > 0
          ? (result.measurement / tempTotalInstructions).toFixed(2) * 100
          : 0

      result.notAtCenterAverage =
        result.notAtCenter > 0
          ? (result.notAtCenter / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.supportAverage =
        result.support > 0
          ? (result.support / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.noSupportAverage =
        result.noSupport > 0
          ? (result.noSupport / tempTotalInstructions).toFixed(2) * 100
          : 0

      result.childOtherAverage = result.childOtherTotal > 0 ? (result.childOtherTotal / result.totalInstructionsChild).toFixed(2) * 100 : 0;
      //result.childMathAverage = result.childMathTotal > 0 ? (result.childMathTotal / result.totalInstructionsChild).toFixed(2) * 100 : 0;
      result.childMathAverage = 100 - result.childOtherAverage
    }

    return results
  }

  /*
   * Level of Instructions
   */
  calculateLevelInstructionAverages = (data, teachers) => {
    // Initialize the array that will hold all the data
    var results = {}

    var totalIntervals = 0

    // Add each teacher to the object
    var tempName = ''
    for (var teacherIndex in teachers) {
      tempName =
        teachers[teacherIndex].firstName + ' ' + teachers[teacherIndex].lastName

      results[teachers[teacherIndex].id] = {
        name: tempName,
        totalInstructions: 0,
        hlq: 0,
        hlqResponse: 0,
        llq: 0,
        llqResponse: 0,
      }
    }

    // Get number of instances for each type of data
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = row.teacher.split('/')[2]

      // Add to total # of intervals
      results[teacherId].totalInstructions += row.count

      // Add to behavior types
      results[teacherId][row.instructionType] += row.count
    }

    // We're going to have a bar for site's total averages lets gather info for that
    var siteBar = {
      name: 'Site Average',

      total: 0,

      hlq: 0,
      hlqResponse: 0,
      llq: 0,
      llqResponse: 0,
    }

    // Calculate the averages in percentages
    // Go through each teacher
    let numberOfTeachersWithData = 0;
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      var tempTotalInstructions = result.totalInstructions

      result.hlqAverage =
        result.hlq > 0
          ? (result.hlq / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.hlqResponseAverage =
        result.hlqResponse > 0
          ? (result.hlqResponse / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.llqAverage =
        result.llq > 0
          ? (result.llq / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.llqResponseAverage =
        result.llqResponse > 0
          ? (result.llqResponse / tempTotalInstructions).toFixed(2) * 100
          : 0

      // Gather info for the site bar
      siteBar.hlq += result.hlqAverage
      siteBar.hlqResponse += result.hlqResponseAverage
      siteBar.llq += result.llqAverage
      siteBar.llqResponse += result.llqResponseAverage

      siteBar.total += tempTotalInstructions

      // Get number of teachers with data to use for siteBar calculateiong
      if(tempTotalInstructions > 0)
      {
        numberOfTeachersWithData++;
      }

    }

    // Calculate the site bar averages
    // siteBar.hlqAverage = siteBar.hlq > 0 ? (siteBar.hlq / siteBar.total).toFixed(2) * 100 : 0;
    // siteBar.hlqResponseAverage = siteBar.hlqResponse > 0 ? (siteBar.hlqResponse / siteBar.total).toFixed(2) * 100 : 0;
    // siteBar.llqAverage = siteBar.llq > 0 ? (siteBar.llq / siteBar.total).toFixed(2) * 100 : 0;
    // siteBar.llqResponseAverage = siteBar.llqResponse > 0 ? (siteBar.llqResponse / siteBar.total).toFixed(2) * 100 : 0;

    // Calculate the site bar averages
    siteBar.hlqAverage =
      siteBar.hlq > 0
        ? Math.round(
            parseFloat((siteBar.hlq / numberOfTeachersWithData).toFixed(2))
          )
        : 0
    siteBar.hlqResponseAverage =
      siteBar.hlqResponse > 0
        ? Math.round(
            parseFloat(
              (siteBar.hlqResponse / numberOfTeachersWithData).toFixed(2)
            )
          )
        : 0
    siteBar.llqAverage =
      siteBar.llq > 0
        ? Math.round(
            parseFloat((siteBar.llq / numberOfTeachersWithData).toFixed(2))
          )
        : 0
    siteBar.llqResponseAverage =
      siteBar.llqResponse > 0
        ? Math.round(
            parseFloat(
              (siteBar.llqResponse / numberOfTeachersWithData).toFixed(2)
            )
          )
        : 0

    results.siteBar = siteBar

    return results
  }

  /*
   * Student Engagement
   */
  calculateStudentEngagementAverages = (data, teachers) => {
    // Initialize the array that will hold all the data
    var results = {}

    var totalIntervals = 0

    // Add each teacher to the object
    var tempName = ''
    for (var teacherIndex in teachers) {
      tempName =
        teachers[teacherIndex].firstName + ' ' + teachers[teacherIndex].lastName

      results[teachers[teacherIndex].id] = {
        name: tempName,
        totalInstructions: 0,
        offTask: 0,
        mildlyEngaged: 0,
        engaged: 0,
        highlyEngaged: 0,
        totalPoints: 0,
      }
    }

    // Get number of instances for each type of data
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = row.teacher.split('/')[2]

      // Add to behavior types
      switch (row.point) {
        case 0:
          results[teacherId].offTask += row.count
          break
        case 1:
          results[teacherId].mildlyEngaged += row.count
          break
        case 2:
          results[teacherId].engaged += row.count
          break
        case 3:
          results[teacherId].highlyEngaged += row.count
          break
        default:
          break
      }

      // Calculate the total score
      results[teacherId].totalPoints += row.point * row.count

      // Calculate the total Number of instructions
      results[teacherId].totalInstructions += row.count
    }

    // We're going to have a bar for site's total averages lets gather info for that
    var siteBar = {
      name: 'Site Average',

      total: 0,

      totalPoints: 0,

      totalInstructions: 0
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      var tempTotalInstructions = result.totalInstructions

      result.offTaskAverage =
        result.offTask > 0
          ? (result.offTask / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.mildlyEngagedAverage =
        result.mildlyEngaged > 0
          ? (result.mildlyEngaged / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.engagedAverage =
        result.engaged > 0
          ? (result.engaged / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.highlyEngagedAverage =
        result.highlyEngaged > 0
          ? (result.highlyEngaged / tempTotalInstructions).toFixed(2) * 100
          : 0

      result.totalPointsAverage =
        result.totalPoints > 0
          ? (result.totalPoints / tempTotalInstructions).toFixed(2)
          : 0

      siteBar.totalPoints += result.totalPoints
      siteBar.totalInstructions += result.totalInstructions
    }

    siteBar.totalPointsAverage =
      siteBar.totalPoints > 0
        ? (siteBar.totalPoints / siteBar.totalInstructions).toFixed(2)
        : 0

    results.siteBar = siteBar

    return results
  }

  /*
   * Listening To Children
   */
  calculateListeningToChildrenAverages = (data, teachers) => {
    // Initialize the array that will hold all the data
    var results = {}

    var totalIntervals = 0

    // Add each teacher to the object
    var tempName = ''
    for (var teacherIndex in teachers) {
      tempName =
        teachers[teacherIndex].firstName + ' ' + teachers[teacherIndex].lastName

      results[teachers[teacherIndex].id] = {
        name: tempName,
        totalInstructions: 0,
        eyeLevel: 0,
        positiveExpression: 0,
        repeats: 0,
        openEndedQuestions: 0,
        extendsPlay: 0,
        encouragesPeerTalk: 0,
        encouraging: 0,
        noBehaviors: 0,
        totalObserved: 0,
      }
    }

    // Get number of instances for each type of data
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = row.teacher.split('/')[2]

      // Add to behavior types
      results[teacherId].eyeLevel += row.listening1
      results[teacherId].positiveExpression += row.listening2
      results[teacherId].repeats += row.listening3
      results[teacherId].openEndedQuestions += row.listening4
      results[teacherId].extendsPlay += row.listening5
      results[teacherId].encouragesPeerTalk += row.listening6

      results[teacherId].noBehaviors += row.listening7
      results[teacherId].encouraging += row.count - row.listening7

      // Calculate the total Number of instructions
      results[teacherId].totalInstructions +=
        row.listening1 +
        row.listening2 +
        row.listening3 +
        row.listening4 +
        row.listening5 +
        row.listening6 +
        row.listening7

      results[teacherId].totalObserved += row.count
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      var tempTotalInstructions = result.totalInstructions
      var tempTotalObserved = result.totalObserved

      result.eyeLevelAverage =
        result.eyeLevel > 0
          ? (result.eyeLevel / tempTotalObserved).toFixed(2) * 100
          : 0
      result.positiveExpressionAverage =
        result.positiveExpression > 0
          ? (result.positiveExpression / tempTotalObserved).toFixed(2) * 100
          : 0
      result.repeatsAverage =
        result.repeats > 0
          ? (result.repeats / tempTotalObserved).toFixed(2) * 100
          : 0
      result.openEndedQuestionsAverage =
        result.openEndedQuestions > 0
          ? (result.openEndedQuestions / tempTotalObserved).toFixed(2) * 100
          : 0
      result.extendsPlayAverage =
        result.extendsPlay > 0
          ? (result.extendsPlay / tempTotalObserved).toFixed(2) * 100
          : 0
      result.encouragesPeerTalkAverage =
        result.encouragesPeerTalk > 0
          ? (result.encouragesPeerTalk / tempTotalObserved).toFixed(2) * 100
          : 0

      result.noBehaviorsAverage =
        result.noBehaviors > 0
          ? (result.noBehaviors / tempTotalObserved).toFixed(2) * 100
          : 0
      result.encouragingAverage =
        result.encouraging > 0
          ? (result.encouraging / tempTotalObserved).toFixed(2) * 100
          : 0
    }

    return results
  }

  /*
   * Sequential Activities
   */
  calculateSequentialActivitiesAverages = (data, teachers) => {
    // Initialize the array that will hold all the data
    var results = {}

    var totalIntervals = 0

    // Add each teacher to the object
    var tempName = ''
    for (var teacherIndex in teachers) {
      tempName =
        teachers[teacherIndex].firstName + ' ' + teachers[teacherIndex].lastName

      results[teachers[teacherIndex].id] = {
        name: tempName,
        totalInstructions: 0,
        sequentialActivities: 0,
        drawImages: 0,
        demonstrateSteps: 0,
        actOut: 0,
        notAtCenter: 0,
        noSupport: 0,
        support: 0,
        materials: 0,
        drawing: 0,
        playing: 0,
        speaking: 0,
        childNonSequential:0,
        totalChildInstructions:0,
      }
    }

    // Get number of instances for each type of data
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = row.teacher.split('/')[2]

      // Add to behavior types
      results[teacherId].sequentialActivities += row.sequentialActivities
      results[teacherId].drawImages += row.drawImages
      results[teacherId].actOut += row.actOut
      results[teacherId].demonstrateSteps += row.demonstrateSteps

      results[teacherId].materials += row.materials
      results[teacherId].drawing += row.drawing
      results[teacherId].playing += row.playing
      results[teacherId].speaking += row.speaking

      results[teacherId].notAtCenter += row.notAtCenter
      results[teacherId].support += row.support
      results[teacherId].noSupport += row.noSupport

      results[teacherId].childNonSequential += row.childNonSequential;

      // Calculate the total Number of instructions
      //results[teacherId].totalInstructions += row.noSupport + row.notAtCenter + row.support
      results[teacherId].totalInstructions += row.noSupport + row.support;
      results[teacherId].totalChildInstructions += row.notAtCenter + row.noSupport + row.support;

    }

    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      var tempTotalInstructions = result.totalInstructions

      result.sequentialActivitiesAverage =
        result.sequentialActivities > 0
          ? (result.sequentialActivities / tempTotalInstructions).toFixed(2) *
            100
          : 0
      result.drawImagesAverage =
        result.drawImages > 0
          ? (result.drawImages / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.actOutAverage =
        result.actOut > 0
          ? (result.actOut / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.demonstrateStepsAverage =
        result.demonstrateSteps > 0
          ? (result.demonstrateSteps / tempTotalInstructions).toFixed(2) * 100
          : 0

      result.materialsAverage =
        result.materials > 0
          ? (result.materials / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.drawingAverage =
        result.drawing > 0
          ? (result.drawing / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.playingAverage =
        result.playing > 0
          ? (result.playing / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.speakingAverage =
        result.speaking > 0
          ? (result.speaking / tempTotalInstructions).toFixed(2) * 100
          : 0

      result.notAtCenterAverage =
        result.notAtCenter > 0
          ? (result.notAtCenter / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.supportAverage =
        result.support > 0
          ? (result.support / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.noSupportAverage =
        result.noSupport > 0
          ? (result.noSupport / tempTotalInstructions).toFixed(2) * 100
          : 0

        result.childNonSequentialAverage = result.childNonSequential > 0 ? (result.childNonSequential / result.totalChildInstructions).toFixed(2) * 100 : 0;
    }

    return results
  }

  /*
  * Foundational Skills
  */
  calculateFoundationalSkillsAverages = (data, teachers) => {
    let results = {};
    for (let teacherIndex in teachers) {
      results[teachers[teacherIndex].id] = {
        name: `${teachers[teacherIndex].firstName} ${teachers[teacherIndex].lastName}`,
        totalIntervals: 0,
        totalInstruction: 0,
        noBehaviors: 0
      };
    }

    let siteBar = {
      name: "Site Average",
      total: 0,
      totalInstruction: 0,
      noBehaviors: 0,
    }

    console.log(data)

    for (let rowIndex in data) {
      let row = data[rowIndex];
      let teacherId = row.teacher.split("/")[2];
      results[teacherId].totalIntervals++;
      if (row.foundational11) {
        results[teacherId].noBehaviors++;
      } else {
        results[teacherId].totalInstruction++;
      }
    }

    for (let resultsIndex in results) {
      let result = results[resultsIndex];

      siteBar.totalInstruction += result.totalInstruction;
      siteBar.noBehaviors += result.noBehaviors;

      result.totalInstruction = result.totalInstruction > 0 ? (result.totalInstruction / result.totalIntervals).toFixed(2) * 100 : 0;
      result.noBehaviors = result.noBehaviors > 0 ? (result.noBehaviors / result.totalIntervals).toFixed(2) * 100 : 0;
    }

    siteBar.total = siteBar.totalInstruction + siteBar.noBehaviors;

    siteBar.totalInstruction = siteBar.totalInstruction > 0 ? parseFloat((siteBar.totalInstruction / siteBar.total).toFixed(2)) * 100 : 0;
    siteBar.noBehaviors = siteBar.noBehaviors > 0 ? parseFloat((siteBar.noBehaviors / siteBar.total).toFixed(2)) * 100 : 0;
    results.siteBar = siteBar;

    return results;
  }



  /*
  * Writing
  */
  calculateWritingSkillsAverages = (data, teachers) => {
    let results = {};
    for (let teacherIndex in teachers) {
      results[teachers[teacherIndex].id] = {
        name: `${teachers[teacherIndex].firstName} ${teachers[teacherIndex].lastName}`,
        totalIntervals: 0,
        totalInstruction: 0,
        noBehaviors: 0
      };
    }

    let siteBar = {
      name: "Site Average",
      total: 0,
      totalInstruction: 0,
      noBehaviors: 0,
    }


    for (let rowIndex in data) {
      let row = data[rowIndex];
      let teacherId = row.teacher.split("/")[2];
      results[teacherId].totalIntervals++;
      if (row.writing9) {
        results[teacherId].noBehaviors++;
      } else {
        results[teacherId].totalInstruction++;
      }
    }

    for (let resultsIndex in results) {
      let result = results[resultsIndex];

      siteBar.totalInstruction += result.totalInstruction;
      siteBar.noBehaviors += result.noBehaviors;

      result.totalInstruction = result.totalInstruction > 0 ? (result.totalInstruction / result.totalIntervals).toFixed(2) * 100 : 0;
      result.noBehaviors = result.noBehaviors > 0 ? (result.noBehaviors / result.totalIntervals).toFixed(2) * 100 : 0;
    }

    siteBar.total = siteBar.totalInstruction + siteBar.noBehaviors;

    siteBar.totalInstruction = siteBar.totalInstruction > 0 ? parseFloat((siteBar.totalInstruction / siteBar.total).toFixed(2)) * 100 : 0;
    siteBar.noBehaviors = siteBar.noBehaviors > 0 ? parseFloat((siteBar.noBehaviors / siteBar.total).toFixed(2)) * 100 : 0;
    results.siteBar = siteBar;

    return results;
  }



  /*
   * Book Reading
   */
  calculateBookReadingAverages = (data, teachers) => {
    let results = {};
    for (let teacherIndex in teachers) {
      results[teachers[teacherIndex].id] = {
        name: `${teachers[teacherIndex].firstName} ${teachers[teacherIndex].lastName}`,
        totalIntervals: 0,
        totalInstruction: 0,
        noBehaviors: 0
      };
    }

    let siteBar = {
      name: "Site Average",
      total: 0,
      totalInstruction: 0,
      noBehaviors: 0,
    }


    for (let rowIndex in data) {
      let row = data[rowIndex];
      let teacherId = row.teacher.split("/")[2];
      results[teacherId].totalIntervals++;
      if (row.literacy11) {
        results[teacherId].noBehaviors++;
      } else {
        results[teacherId].totalInstruction++;
      }
    }

    for (let resultsIndex in results) {
      let result = results[resultsIndex];

      siteBar.totalInstruction += result.totalInstruction;
      siteBar.noBehaviors += result.noBehaviors;

      result.totalInstruction = result.totalInstruction > 0 ? (result.totalInstruction / result.totalIntervals).toFixed(2) * 100 : 0;
      result.noBehaviors = result.noBehaviors > 0 ? (result.noBehaviors / result.totalIntervals).toFixed(2) * 100 : 0;
    }

    siteBar.total = siteBar.totalInstruction + siteBar.noBehaviors;

    siteBar.totalInstruction = siteBar.totalInstruction > 0 ? parseFloat((siteBar.totalInstruction / siteBar.total).toFixed(2)) * 100 : 0;
    siteBar.noBehaviors = siteBar.noBehaviors > 0 ? parseFloat((siteBar.noBehaviors / siteBar.total).toFixed(2)) * 100 : 0;
    results.siteBar = siteBar;

    return results;
  }



  /*
   * Language Environment
   */
  calculateLanguageEnvironmentAverages = (data, teachers) => {
    let results = {};
    for (let teacherIndex in teachers) {
      results[teachers[teacherIndex].id] = {
        name: `${teachers[teacherIndex].firstName} ${teachers[teacherIndex].lastName}`,
        totalIntervals: 0,
        totalInstruction: 0,
        noBehaviors: 0
      };
    }

    let siteBar = {
      name: "Site Average",
      total: 0,
      totalInstruction: 0,
      noBehaviors: 0,
    }


    for (let rowIndex in data) {
      let row = data[rowIndex];
      let teacherId = row.teacher.split("/")[2];
      results[teacherId].totalIntervals++;
      if (row.literacy9) {
        results[teacherId].noBehaviors++;
      } else {
        results[teacherId].totalInstruction++;
      }
    }

    for (let resultsIndex in results) {
      let result = results[resultsIndex];

      siteBar.totalInstruction += result.totalInstruction;
      siteBar.noBehaviors += result.noBehaviors;

      result.totalInstruction = result.totalInstruction > 0 ? (result.totalInstruction / result.totalIntervals).toFixed(2) * 100 : 0;
      result.noBehaviors = result.noBehaviors > 0 ? (result.noBehaviors / result.totalIntervals).toFixed(2) * 100 : 0;
    }

    siteBar.total = siteBar.totalInstruction + siteBar.noBehaviors;

    siteBar.totalInstruction = siteBar.totalInstruction > 0 ? parseFloat((siteBar.totalInstruction / siteBar.total).toFixed(2)) * 100 : 0;
    siteBar.noBehaviors = siteBar.noBehaviors > 0 ? parseFloat((siteBar.noBehaviors / siteBar.total).toFixed(2)) * 100 : 0;
    results.siteBar = siteBar;

    return results;
  }

  /*
   * Associative Cooperative
   */
  calculateACAverages = (data, teachers) => {
    // Initialize the array that will hold all the data
    var results = {}

    var totalIntervals = 0

    // Add each teacher to the object
    var tempName = ''
    for (var teacherIndex in teachers) {
      tempName =
        teachers[teacherIndex].firstName + ' ' + teachers[teacherIndex].lastName

      results[teachers[teacherIndex].id] = {
        name: tempName,
        totalIntervals: 0,
        totalInstructions: 0,

        childrensPlay: 0,
        askingQuestions: 0,
        encouragingChildren: 0,
        helpingChildren: 0,

        noSequence: 0,
        formalRules: 0,
        sequence: 0,

        support: 0,
        noSupport: 0,
        notAtCenter: 0,

        childNoInteraction: 0,
      }
    }

    // Get number of instances for each type of data
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = row.teacher.split('/')[2]

      // Add to total # of intervals
      //results[teacherId].totalIntervals += row.total;
      results[teacherId].totalIntervals++

      // Add to behavior types

      // Calculate the total Number of instructions
      results[teacherId].totalInstructions +=
        row.teacher1 + row.teacher2 + row.teacher3 + row.teacher4

      // If there were any "Participating in children's play" in this observation
      if (row.teacher1) {
        results[teacherId].childrensPlay++
      }
      // If there were any "Asking questions to extend children's thinking about their shared activity" answers in this observation
      if (row.teacher2) {
        results[teacherId].askingQuestions++
      }
      // If there were any "Encouraging children to share, work, or interact with each other" answers in this observation
      if (row.teacher3) {
        results[teacherId].encouragingChildren++
      }
      // If there were any "Encouraging children to share, work, or interact with each other" answers in this observation
      if (row.teacher4) {
        results[teacherId].helpingChildren++
      }
      if (row.child2) {
        results[teacherId].noSequence++
      }
      if (row.child3) {
        results[teacherId].formalRules++
      }
      if (row.child4) {
        results[teacherId].sequence++
      }
      if( row.childNoInteraction )
      {
        results[teacherId].childNoInteraction++;
      }

      // Check for act types
      // If teacher was there
      if (row.peopleType == 3) {
        // Check for support
        if (row.teacher1 || row.teacher2 || row.teacher3 || row.teacher4) {
          results[teacherId].support++
        }
        // If there was no support
        else {
          results[teacherId].noSupport++
        }
      }
      // Teacher not there
      else {
        results[teacherId].notAtCenter++
      }
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      var tempTotalInstructions = result.totalInstructions
      var tempTotalIntervals = result.totalIntervals

      let tempTotalIntervalsTeacherPresent = result.totalIntervals - result.notAtCenter;

      result.childrensPlayAverage =
        result.childrensPlay > 0
          ? (result.childrensPlay / tempTotalIntervalsTeacherPresent).toFixed(2) * 100
          : 0
      result.askingQuestionsAverage =
        result.askingQuestions > 0
          ? (result.askingQuestions / tempTotalIntervalsTeacherPresent).toFixed(2) * 100
          : 0
      result.encouragingChildrenAverage =
        result.encouraging > 0
          ? (result.encouraging / tempTotalIntervalsTeacherPresent).toFixed(2) * 100
          : 0
      result.helpingChildrenAverage =
        result.helpingChildren > 0
          ? (result.helpingChildren / tempTotalIntervalsTeacherPresent).toFixed(2) * 100
          : 0

      result.noSequenceAverage =
        result.noSequence > 0
          ? (result.noSequence / tempTotalIntervalsTeacherPresent).toFixed(2) * 100
          : 0
      result.formalRulesAverage =
        result.formalRules > 0
          ? (result.formalRules / tempTotalIntervalsTeacherPresent).toFixed(2) * 100
          : 0
      result.sequenceAverage =
        result.sequence > 0
          ? (result.sequence / tempTotalIntervalsTeacherPresent).toFixed(2) * 100
          : 0

      result.supportAverage =
        result.support > 0
          ? (result.support / tempTotalIntervalsTeacherPresent).toFixed(2) * 100
          : 0
      result.noSupportAverage =
        result.noSupport > 0
          ? (result.noSupport / tempTotalIntervalsTeacherPresent).toFixed(2) * 100
          : 0
      result.notAtCenterAverage =
        result.notAtCenter > 0
          ? (result.notAtCenter / tempTotalIntervalsTeacherPresent).toFixed(2) * 100
          : 0

      result.childNoInteractionAverage = result.childNoInteraction > 0 ? (result.childNoInteraction / tempTotalIntervals).toFixed(2) * 100 : 0;
    }

    return results
  }
}

export default AveragesData
