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
  calculateTransitionAverage = (data, teacher) => {
    // Initialize the array that will hold all the data
    var results = {}

    // Add each teacher to the object
    var tempName = teacher.firstName + ' ' + teacher.lastName

    results[teacher.id] = {
      name: tempName,
      total: 0,
      line: 0,
      traveling: 0,
      waiting: 0,
      routines: 0,
      behaviorManagement: 0,
      other: 0,
      totalTime: 0,
    }

    // Get number of instances for each type of data
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = teacher.id

      // Add to behavior types
      results[teacherId].line += row.line
      results[teacherId].traveling += row.traveling
      results[teacherId].waiting += row.waiting
      results[teacherId].routines += row.routines
      results[teacherId].behaviorManagement += row.behaviorManagement
      results[teacherId].other += row.other

      // Calculate the total Number of instructions
      //results[teacherId].total += row.total;
      results[teacherId].total += row.total
      results[teacherId].totalTime += row.observationTotalTime
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      var tempTotalInstructions = result.total

      result.lineAverage =
        result.line > 0
          ? (result.line / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.travelingAverage =
        result.traveling > 0
          ? (result.traveling / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.waitingAverage =
        result.waiting > 0
          ? (result.waiting / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.routinesAverage =
        result.routines > 0
          ? (result.routines / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.behaviorManagementAverage =
        result.behaviorManagement > 0
          ? (result.behaviorManagement / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.otherAverage =
        result.other > 0
          ? (result.other / tempTotalInstructions).toFixed(2) * 100
          : 0
    }

    return results
  }

  /*
   * Classroom Climate
   */
  calculateClimateAverage = (data, teacher) => {
    // Initialize the array that will hold all the data
    var results = {}

    // Add each teacher to the object
    var tempName = ''

    tempName = teacher.firstName + ' ' + teacher.lastName

    results[teacher.id] = {
      name: tempName,
      total: 0,
      nonspecificapproval: 0,
      specificapproval: 0,
      disapproval: 0,
      redirection: 0,
      toneTotal: 0,
      toneCount: 0,
    }

    // Get number of instances for each type of data
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = teacher.id

      // Add to behavior types
      // Need to make sure we're not counting the rows with tone rating.
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

    // Calculate the averages in percentages
    // Go through each teacher

    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      var tempDataArray = data
        .filter(o => o.behaviorResponse === 'nonspecificapproval')
        .map(o => {
          return o.count
        })
      result.nonspecificapprovalAverage =
        tempDataArray.length === 0
          ? 0
          : tempDataArray.reduce((a, b) => a + b) / tempDataArray.length
      result.nonspecificapprovalAverage = Math.round(
        result.nonspecificapprovalAverage
      )

      tempDataArray = data
        .filter(o => o.behaviorResponse === 'specificapproval')
        .map(o => {
          return o.count
        })
      result.specificapprovalAverage =
        tempDataArray.length === 0
          ? 0
          : tempDataArray.reduce((a, b) => a + b) / tempDataArray.length
      result.specificapprovalAverage = Math.round(
        result.specificapprovalAverage
      )

      tempDataArray = data
        .filter(o => o.behaviorResponse === 'disapproval')
        .map(o => {
          return o.count
        })
      result.disapprovalAverage =
        tempDataArray.length === 0
          ? 0
          : tempDataArray.reduce((a, b) => a + b) / tempDataArray.length
      result.disapprovalAverage = Math.round(result.disapprovalAverage)

      tempDataArray = data
        .filter(o => o.behaviorResponse === 'redirection')
        .map(o => {
          return o.count
        })
      result.redirectionAverage =
        tempDataArray.length === 0
          ? 0
          : tempDataArray.reduce((a, b) => a + b) / tempDataArray.length
      result.redirectionAverage = Math.round(result.redirectionAverage)

      result.toneAverage =
        result.toneCount > 0
          ? Math.round(result.toneTotal / result.toneCount)
          : -1

    }

    return results
  }

  /*
   * Math Instructions
   */
  calculateMathAverages = (data, teacher) => {
    // Initialize the array that will hold all the data
    var results = {}

    var totalIntervals = 0

    // Add each teacher to the object
    var tempName = teacher.firstName + ' ' + teacher.lastName

    results[teacher.id] = {
      name: tempName,
      total: 0,
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

      teacherObservationIds: [],
      allObservationIds: [],
    }

    // Get number of instances for each type of data
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = teacher.id

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

      // Calculate the total Number of instructions
      //results[teacherId].total += row.noSupport + row.noOpportunity + row.support;
      results[teacherId].total += row.count

      /*
       * We need to keep track of all the observations that a teacher participated in, so we know what to use as the demominator during calculations of teacher behaviors
       */
      if (!results[teacherId].teacherObservationIds.includes(row.id) && row.peopletype == 3) {
        results[teacherId].teacherObservationIds.push(row.id)
      }

      /*
       * Keep track of all the observations for other calculations if needed
       */
       if ( !results[teacherId].allObservationIds.includes(row.id) ) {
         results[teacherId].allObservationIds.push(row.id)
       }

    }

    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      //var tempTotalInstructions = result.total;
      var tempTotalInstructions = data.length

      let teacherObservationsCount = result.teacherObservationIds.length > 0 ? result.teacherObservationIds.length : 1; // If there are no observations of this type we need to set it to 1 to prevent dividing by zero
      let allObservationsCount = result.allObservationIds.length

      result.mathVocabularyAverage =
        result.mathVocabulary > 0
          ? Math.round(result.mathVocabulary / teacherObservationsCount)
          : 0
      result.askingQuestionsAverage =
        result.askingQuestions > 0
          ? Math.round(result.askingQuestions / teacherObservationsCount)
          : 0
      result.mathConceptsAverage =
        result.mathConcepts > 0
          ? Math.round(result.mathConcepts / teacherObservationsCount)
          : 0
      result.helpingChildrenAverage =
        result.helpingChildren > 0
          ? Math.round(result.helpingChildren / teacherObservationsCount)
          : 0

      result.countingAverage =
        result.counting > 0
          ? Math.round(result.counting / allObservationsCount)
          : 0
      result.shapesAverage =
        result.shapes > 0 ? Math.round(result.shapes / allObservationsCount) : 0
      result.patternsAverage =
        result.patterns > 0
          ? Math.round(result.patterns / allObservationsCount)
          : 0
      result.measurementAverage =
        result.measurement > 0
          ? Math.round(result.measurement / allObservationsCount)
          : 0

      result.notAtCenterAverage =
        result.notAtCenter > 0
          ? Math.round(result.notAtCenter / allObservationsCount)
          : 0
      result.supportAverage =
        result.support > 0 ? Math.round(result.support / allObservationsCount) : 0
      result.noSupportAverage =
        result.noSupport > 0
          ? Math.round(result.noSupport / allObservationsCount)
          : 0
    }

    console.log(results)
    return results
  }

  /*
   * Level of Instructions
   */
  calculateLevelInstructionAverages = (data, teacher) => {
    // Initialize the array that will hold all the data
    var results = {}

    results[teacher.id] = {
      name: teacher.firstName + ' ' + teacher.lastName,
      total: 0,
      hlq: 0,
      hlqResponse: 0,
      llq: 0,
      llqResponse: 0,
      observation: [data[0].id],
    }

    // Get number of instances for each type of data
    for (var rowIndex in data) {
      var row = data[rowIndex]
      var teacherId = teacher.id

      // Add to total # of intervals
      results[teacherId].total += row.count

      // Add to behavior types
      results[teacherId][row.instructionType] += row.count

      if (!results[teacherId].observation.includes(row.id)) {
        results[teacherId].observation.push(row.id)
      }
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]
      let observations_count = result.observation.length

      result.hlq =
        result.hlq > 0 ? Math.round(result.hlq / observations_count) : 0
      result.hlqResponse =
        result.hlqResponse > 0
          ? Math.round(result.hlqResponse / observations_count)
          : 0
      result.llq =
        result.llq > 0 ? Math.round(result.llq / observations_count) : 0
      result.llqResponse =
        result.llqResponse > 0
          ? Math.round(result.llqResponse / observations_count)
          : 0
    }

    console.log(results)
    return results
  }

  /*
   * Student Engagement
   */
  calculateStudentEngagementAverages = (data, teacher) => {
    // Initialize the array that will hold all the data
    var results = {}

    var totalIntervals = 0

    // Add each teacher to the object
    var tempName = teacher.firstName + ' ' + teacher.lastName

    results[teacher.id] = {
      name: tempName,
      smallRows: 0,
      wholeRows: 0,
      transitionRows: 0,
      centersRows: 0,
      smallGroup: 0,
      wholeGroup: 0,
      transitionGroup: 0,
      centersGroup: 0,
      totalPoints: 0,
      totalObservations: 0,
      totalInstructions: 0,
    }

    // Get number of instances for each type of data
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = teacher.id

      //these conditionals calculate the points for each observation type, each score given, and keeps track of the toal amount of observations

      if (row.entryType === 'small' && row.point === 0) {
        results[teacherId].smallGroup += 0 * row.count
        results[teacherId].smallRows += row.count
        results[teacherId].totalPoints += 0 * row.count
        results[teacherId].totalObservations += 1
      }
      if (row.entryType === 'small' && row.point === 1) {
        results[teacherId].smallGroup += 1 * row.count
        results[teacherId].smallRows += row.count
        results[teacherId].totalPoints += 1 * row.count
        results[teacherId].totalObservations += 1
      }
      if (row.entryType === 'small' && row.point === 2) {
        results[teacherId].smallGroup += 2 * row.count
        results[teacherId].smallRows += row.count
        results[teacherId].totalPoints += 2 * row.count
        results[teacherId].totalObservations += 1
      }
      if (row.entryType === 'small' && row.point === 3) {
        results[teacherId].smallGroup += 3 * row.count
        results[teacherId].smallRows += row.count
        results[teacherId].totalPoints += 3 * row.count
        results[teacherId].totalObservations += 1
      }
      if (row.entryType === 'whole' && row.point === 0) {
        results[teacherId].wholeGroup += 0 * row.count
        results[teacherId].wholeRows += row.count
        results[teacherId].totalPoints += 0 * row.count
        results[teacherId].totalObservations += 1
      }
      if (row.entryType === 'whole' && row.point === 1) {
        results[teacherId].wholeGroup += 1 * row.count
        results[teacherId].wholeRows += row.count
        results[teacherId].totalPoints += 1 * row.count
        results[teacherId].totalObservations += 1
      }
      if (row.entryType === 'whole' && row.point === 2) {
        results[teacherId].wholeGroup += 2 * row.count
        results[teacherId].wholeRows += row.count
        results[teacherId].totalPoints += 2 * row.count
        results[teacherId].totalObservations += 1
      }
      if (row.entryType === 'whole' && row.point === 3) {
        results[teacherId].wholeGroup += 3 * row.count
        results[teacherId].wholeRows += row.count
        results[teacherId].totalPoints += 3 * row.count
        results[teacherId].totalObservations += 1
      }
      if (row.entryType === 'transition' && row.point === 0) {
        results[teacherId].transitionGroup += 0 * row.count
        results[teacherId].transitionRows += row.count
        results[teacherId].totalPoints += 0 * row.count
        results[teacherId].totalObservations += 1
      }
      if (row.entryType === 'transition' && row.point === 1) {
        results[teacherId].transitionGroup += 1 * row.count
        results[teacherId].transitionRows += row.count
        results[teacherId].totalPoints += 1 * row.count
        results[teacherId].totalObservations += 1
      }
      if (row.entryType === 'transition' && row.point === 2) {
        results[teacherId].transitionGroup += 2 * row.count
        results[teacherId].transitionRows += row.count
        results[teacherId].totalPoints += 2 * row.count
        results[teacherId].totalObservations += 1
      }
      if (row.entryType === 'transition' && row.point === 3) {
        results[teacherId].transitionGroup += 3 * row.count
        results[teacherId].transitionRows += row.count
        results[teacherId].totalPoints += 3 * row.count
        results[teacherId].totalObservations += 1
      }
      if (row.entryType === 'centers' && row.point === 0) {
        results[teacherId].centersGroup += 0 * row.count
        results[teacherId].centersRows += row.count
        results[teacherId].totalPoints += 0 * row.count
        results[teacherId].totalObservations += 1
      }

      if (row.entryType === 'centers' && row.point === 1) {
        results[teacherId].centersGroup += 1 * row.count
        results[teacherId].centersRows += row.count
        results[teacherId].totalPoints += 1 * row.count
        results[teacherId].totalObservations += 1
      }
      if (row.entryType === 'centers' && row.point === 2) {
        results[teacherId].centersGroup += 2 * row.count
        results[teacherId].centersRows += row.count
        results[teacherId].totalPoints += 2 * row.count
        results[teacherId].totalObservations += 1
      }
      if (row.entryType === 'centers' && row.point === 3) {
        results[teacherId].centersGroup += 3 * row.count
        results[teacherId].centersRows += row.count
        results[teacherId].totalPoints += 3 * row.count
        results[teacherId].totalObservations += 1
      }

      results[teacherId].totalInstructions += row.count
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      var tempTotalInstructions = result.totalInstructions

      //calculates the averages for each observation type

      result.smallGroupAverage =
        result.smallGroup > 0 ? result.smallGroup / result.smallRows : 0
      result.wholeGroupAverage =
        result.wholeGroup > 0 ? result.wholeGroup / result.wholeRows : 0
      result.transitionGroupAverage =
        result.transitionGroup > 0
          ? result.transitionGroup / result.transitionRows
          : 0
      result.centersGroupAverage =
        result.centersGroup > 0 ? result.centersGroup / result.centersRows : 0

      //calculates the total average for the teacher for the standalone bar graph at the bottom of the page
      result.totalAverage = result.totalPoints / result.totalInstructions
    }

    return results
  }

  /*
   * Listening To Children
   */
  calculateListeningToChildrenAverages = (data, teacher) => {
    // Initialize the array that will hold all the data
    var results = {}

    var totalIntervals = 0

    // Add each teacher to the object
    var tempName = teacher + ' ' + teacher.lastName

    results[teacher.id] = {
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

    // Get number of instances for each type of data
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = teacher.id

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
      //results[teacherId].totalInstructions += row.listening1 + row.listening2 + row.listening3 + row.listening4 + row.listening5 + row.listening6 + row.listening7;
      results[teacherId].totalInstructions += row.count

      // Calculate the total number of observations by getting all the unique observation ids and counting them
      results[teacherId].totalObserved = [...new Set(data.map(item => item.id))].length
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      var tempTotalInstructions = result.totalInstructions
      var tempTotalObserved = result.totalObserved

      result.eyeLevelAverage =
        result.eyeLevel > 0
          ? Math.round(result.eyeLevel / tempTotalObserved)
          : 0
      result.positiveExpressionAverage =
        result.positiveExpression > 0
          ? Math.round(result.positiveExpression / tempTotalObserved)
          : 0
      result.repeatsAverage =
        result.repeats > 0
          ? Math.round(result.repeats / tempTotalObserved)
          : 0
      result.openEndedQuestionsAverage =
        result.openEndedQuestions > 0
          ? Math.round(result.openEndedQuestions / tempTotalObserved)
          : 0
      result.extendsPlayAverage =
        result.extendsPlay > 0
          ? Math.round(result.extendsPlay / tempTotalObserved)
          : 0
      result.encouragesPeerTalkAverage =
        result.encouragesPeerTalk > 0
          ? Math.round(result.encouragesPeerTalk / tempTotalObserved)
          : 0

      result.noBehaviorsAverage =
        result.noBehaviors > 0
          ? Math.round(result.noBehaviors / tempTotalObserved)
          : 0
      result.encouragingAverage =
        result.encouraging > 0
          ? Math.round(result.encouraging / tempTotalObserved)
          : 0
    }

    return results
  }

  /*
   * Sequential Activities
   */
  calculateSequentialActivitiesAverages = (data, teacher) => {
    // Initialize the array that will hold all the data
    var results = {}

    var totalIntervals = 0

    // Add each teacher to the object
    var tempName = teacher.firstName + ' ' + teacher.lastName

    results[teacher.id] = {
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
      allObservationIds: [data[0].id],
      teacherObservationIds: [],
    }

    // Get number of instances for each type of data
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = teacher.id

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

      // Calculate the total Number of instructions
      results[teacherId].totalInstructions +=
        row.noSupport + row.notAtCenter + row.support

      /*
       * We need to keep track of all the observations that a teacher participated in, so we know what to use as the demominator during calculations of teacher behaviors
       */
      if (!results[teacherId].teacherObservationIds.includes(row.id) && row.peopletype == 3) {
        results[teacherId].teacherObservationIds.push(row.id)
      }

      /*
       * Keep track of all the observations for other calculations if needed
       */
       if ( !results[teacherId].allObservationIds.includes(row.id) ) {
         results[teacherId].allObservationIds.push(row.id)
       }

    }

    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      //var tempTotalInstructions = result.totalInstructions
      var allObservationsCount = result.allObservationIds.length
      var teacherObservationsCount = result.teacherObservationIds.length

      result.sequentialActivitiesAverage =
        result.sequentialActivities > 0
          ? Math.round(result.sequentialActivities / teacherObservationsCount)
          : 0
      result.drawImagesAverage =
        result.drawImages > 0
          ? Math.round(result.drawImages / teacherObservationsCount)
          : 0
      result.actOutAverage =
        result.actOut > 0
          ? Math.round(result.actOut / teacherObservationsCount)
          : 0
      result.demonstrateStepsAverage =
        result.demonstrateSteps > 0
          ? Math.round(result.demonstrateSteps / teacherObservationsCount)
          : 0

      result.materialsAverage =
        result.materials > 0
          ? Math.round(result.materials / allObservationsCount)
          : 0
      result.drawingAverage =
        result.drawing > 0
          ? Math.round(result.drawing / allObservationsCount)
          : 0
      result.playingAverage =
        result.playing > 0
          ? Math.round(result.playing / allObservationsCount)
          : 0
      result.speakingAverage =
        result.speaking > 0
          ? Math.round(result.speaking / allObservationsCount)
          : 0

      result.notAtCenterAverage =
        result.notAtCenter > 0
          ? Math.round(result.notAtCenter / allObservationsCount)
          : 0
      result.supportAverage =
        result.support > 0
          ? Math.round(result.support / allObservationsCount)
          : 0
      result.noSupportAverage =
        result.noSupport > 0
          ? Math.round(result.noSupport / allObservationsCount)
          : 0
    }

    console.log(results)
    return results
  }

  /*
   * Foundational Skills
   */
  calculateFoundationalSkillsAverages = (data, teacher) => {
    // Initialize the array that will hold all the data
    var results = {}

    var totalIntervals = 0

    // Add each teacher to the object
    var tempName = teacher.firstName + ' ' + teacher.lastName

    results[teacher.id] = {
      name: tempName,
      totalIntervals: 0,
      totalChildIntervals: 0,
      //totalInstructions: 0,
      phonological: 0,
      alphabetic: 0,
      openEndedQuestions: 0,
      realisticReading: 0,
      multimodalInstruction: 0,
      foundationalSkills: 0,
      childFoundationalSkills: 0,
    }

    // Get number of instances for each type of data
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = teacher.id

      // Add to total # of intervals

      // If this is a child observation
      if(row.isChild)
      {
        results[teacherId].totalChildIntervals++;

        if(!row.foundational10)
        {
          results[teacherId].childFoundationalSkills++;
        }
      }

      // If this is a teacher observation
      else
      {
        results[teacherId].totalIntervals++

        // Add to behavior types

        // If this observation has a phonal answer.
        if (row.foundational1 || row.foundational2) {
          results[teacherId].phonological++
        }
        // If this observation has a alphabetic answer
        if (
          row.foundational3 ||
          row.foundational4 ||
          row.foundational5 ||
          row.foundational6 ||
          row.foundational7
        ) {
          results[teacherId].alphabetic++
        }
        // If this observation has a open ended question
        if (row.foundational8) {
          results[teacherId].openEndedQuestions++
        }
        // If this observation has a realistic Reading
        if (row.foundational9) {
          results[teacherId].realisticReading++
        }
        // If this observation has a Multi Modal
        if (row.foundational10) {
          results[teacherId].multimodalInstruction++
        }
        // If this observation has anything
        if (!row.foundational11) {
          results[teacherId].foundationalSkills++
        }
      }


    }

    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      var tempTotalIntervals = result.totalIntervals

      result.phonologicalAverage =
        result.phonological > 0
          ? (result.phonological / tempTotalIntervals).toFixed(2) * 100
          : 0
      result.alphabeticAverage =
        result.alphabetic > 0
          ? (result.alphabetic / tempTotalIntervals).toFixed(2) * 100
          : 0
      result.openEndedQuestionsAverage =
        result.openEndedQuestions > 0
          ? (result.openEndedQuestions / tempTotalIntervals).toFixed(2) * 100
          : 0
      result.realisticReadingAverage =
        result.realisticReading > 0
          ? (result.realisticReading / tempTotalIntervals).toFixed(2) * 100
          : 0
      result.multimodalInstructionAverage =
        result.multimodalInstruction > 0
          ? (result.multimodalInstruction / tempTotalIntervals).toFixed(2) * 100
          : 0

      result.teacherAverage =
        result.foundationalSkills > 0
          ? (result.foundationalSkills / tempTotalIntervals).toFixed(2) * 100
          : 0

      result.childAverage =
        result.childFoundationalSkills > 0
          ? (result.childFoundationalSkills / result.totalChildIntervals).toFixed(2) * 100
          : 0
    }

    return results
  }

  /*
   * Writing
   */
  calculateWritingSkillsAverages = (data, teacher) => {
    // Initialize the array that will hold all the data
    var results = {}

    // Add each teacher to the object
    var tempName = teacher.firstName + ' ' + teacher.lastName

    results[teacher.id] = {
      name: tempName,
      totalIntervals: 0,
      writingSkills: 0,
      meaning: 0,
      printProcesses: 0,
      totalChildIntervals: 0,
      childWritingSkills: 0,
    }

    // Get number of instances for each type of data
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = teacher.id

      // If this is a child observation
      if(row.isChild)
      {
        results[teacherId].totalChildIntervals++;

        if(!row.writingChild9)
        {
          results[teacherId].childWritingSkills++;
        }
      }

      // If this is a teacher observation
      else
      {
        // Add to total # of intervals
        results[teacherId].totalIntervals++

        // Add to behavior types
        // Count each observation interval that has a meaning in it.
        if (row.writing1 || row.writing2) {
          results[teacherId].meaning++
        }
        // Count each observation interval that has a Print Process in it
        if (
          row.writing3 ||
          row.writing4 ||
          row.writing5 ||
          row.writing6 ||
          row.writing7 ||
          row.writing8
        ) {
          results[teacherId].printProcesses++
        }

        // Count each observation interval that has anything in it
        if (!row.writing9) {
          results[teacherId].writingSkills++
        }
      }
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      var tempTotalIntervals = result.totalIntervals

      result.meaningAverage =
        result.meaning > 0
          ? (result.meaning / tempTotalIntervals).toFixed(2) * 100
          : 0
      result.printProcessesAverage =
        result.printProcesses > 0
          ? (result.printProcesses / tempTotalIntervals).toFixed(2) * 100
          : 0

      result.teacherAverage =
        result.writingSkills > 0
          ? (result.writingSkills / tempTotalIntervals).toFixed(2) * 100
          : 0

      result.childAverage =
        result.childWritingSkills > 0
          ? (result.childWritingSkills / result.totalChildIntervals).toFixed(2) * 100
          : 0
    }

    return results
  }

  /*
   * Book Reading
   */
  calculateBookReadingAverages = (data, teacher) => {
    // Initialize the array that will hold all the data
    var results = {}

    var totalIntervals = 0

    // Add each teacher to the object
    var tempName = ''

    tempName = teacher.firstName + ' ' + teacher.lastName

    results[teacher.id] = {
      name: tempName,
      totalIntervals: 0,
      totalInstructions: 0,
      bookReading: 0,
      vocabFocus: 0,
      languageConnections: 0,
      childrenSupport: 0,
      fairnessDiscussions: 0,
      multimodalInstruction: 0,
      totalTime: 0,
    }

    // Get number of instances for each type of data
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = teacher.id

      // Add to total # of intervals
      results[teacherId].totalIntervals += row.total

      // Add to behavior types
      // Calculate the total Number of instructions
      results[teacherId].totalInstructions +=
        row.literacy1 +
        row.literacy2 +
        row.literacy3 +
        row.literacy4 +
        row.literacy5 +
        row.literacy6 +
        row.literacy7 +
        row.literacy8 +
        row.literacy9 +
        row.literacy10

      // If there were any vocabanswers in this observation
      results[teacherId].vocabFocus += row.vocab
      results[teacherId].languageConnections += row.makeConnection
      results[teacherId].childrenSupport += row.support
      results[teacherId].fairnessDiscussions += row.discussions
      results[teacherId].multimodalInstruction += row.multimodal

      results[teacherId].bookReading += row.total - row.literacy11

      results[teacherId].totalTime += row.observationTotalTime
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      var tempTotalInstructions = result.totalInstructions
      var tempTotalIntervals = result.totalIntervals

      result.vocabFocusAverage =
        result.vocabFocus > 0
          ? (result.vocabFocus / tempTotalIntervals).toFixed(2) * 100
          : 0
      result.languageConnectionsAverage =
        result.languageConnections > 0
          ? (result.languageConnections / tempTotalIntervals).toFixed(2) * 100
          : 0
      result.childrenSupportAverage =
        result.childrenSupport > 0
          ? (result.childrenSupport / tempTotalIntervals).toFixed(2) * 100
          : 0
      result.fairnessDiscussionsAverage =
        result.fairnessDiscussions > 0
          ? (result.fairnessDiscussions / tempTotalIntervals).toFixed(2) * 100
          : 0
      result.multimodalInstructionAverage =
        result.multimodalInstruction > 0
          ? (result.multimodalInstruction / tempTotalIntervals).toFixed(2) * 100
          : 0

      result.teacherAverage =
        result.bookReading > 0
          ? (result.bookReading / tempTotalIntervals).toFixed(2) * 100
          : 0
    }

    return results
  }

  /*
   * Language Environment
   */
  calculateLanguageEnvironmentAverages = (data, teacher) => {
    // Initialize the array that will hold all the data
    var results = {}

    var totalIntervals = 0

    // Add each teacher to the object
    var tempName = teacher.firstName + ' ' + teacher.lastName

    results[teacher.id] = {
      name: tempName,
      totalIntervals: 0,
      totalInstructions: 0,
      languageEnvironment: 0,
      talk: 0,
      encourageChildren: 0,
      respondChildren: 0,
    }

    // Get number of instances for each type of data
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = teacher.id

      // Add to total # of intervals
      results[teacherId].totalIntervals += row.total

      // Add to behavior types

      // Calculate the total Number of instructions
      results[teacherId].totalInstructions +=
        row.literacy1 +
        row.literacy2 +
        row.literacy3 +
        row.literacy4 +
        row.literacy5 +
        row.literacy6 +
        row.literacy7 +
        row.literacy8

      // If there were any "Talk with children about vocabulary or social-emotional topics" in this observation
      if (row.literacy1 || row.literacy2) {
        results[teacherId].talk++
      }
      // If there were any "Encourage Children to talk" answers in this observation
      if (row.literacy3 || row.literacy4 || row.literacy5) {
        results[teacherId].encourageChildren++
      }
      // If there were any "Respond to children" answers in this observation
      if (row.literacy6 || row.literacy7 || row.literacy8) {
        results[teacherId].respondChildren++
      }

      // If there were any answers in this observation
      if (!row.literacy9) {
        results[teacherId].languageEnvironment++
      }
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      var tempTotalInstructions = result.totalInstructions
      var tempTotalIntervals = result.totalIntervals

      result.talkAverage =
        result.talk > 0
          ? (result.talk / tempTotalIntervals).toFixed(2) * 100
          : 0
      result.encourageChildrenAverage =
        result.encourageChildren > 0
          ? (result.encourageChildren / tempTotalIntervals).toFixed(2) * 100
          : 0
      result.respondChildrenAverage =
        result.respondChildren > 0
          ? (result.respondChildren / tempTotalIntervals).toFixed(2) * 100
          : 0

      result.teacherAverage =
        result.languageEnvironment > 0
          ? (result.languageEnvironment / tempTotalIntervals).toFixed(2) * 100
          : 0
    }

    return results
  }

  /*
   * Associative Cooperative
   */
  calculateACAverages = (data, teacher) => {
    // Initialize the array that will hold all the data
    var results = {}

    var totalIntervals = 0

    // Add each teacher to the object
    var tempName = teacher.firstName + ' ' + teacher.lastName

    results[teacher.id] = {
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

      teacherObservationIds: [],
      childObservationIds: [],
      allObservationIds: [],

    }

    // Get number of instances for each type of data
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = teacher.id

      // Add to total # of intervals
      results[teacherId].totalIntervals += row.total
      //results[teacherId].totalIntervals++;

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

      /*
       * We need to keep track of all the observations that a teacher participated in, so we know what to use as the demominator during calculations of teacher behaviors
       */
      if (!results[teacherId].teacherObservationIds.includes(row.id) && row.peopleType == 3) {
        results[teacherId].teacherObservationIds.push(row.id)
      }

      /*
       * We need to keep track of all the observations where a teacher wasn't alone, so we know what to use as the demominator during calculations of child behaviors
       */
       if ( !results[teacherId].childObservationIds.includes(row.id) && (row.peopleType == 3 || row.peopleType == 2) ) {
         results[teacherId].childObservationIds.push(row.id)
       }

      /*
       * We need to keep track of all the observations where a teacher wasn't alone, so we know what to use as the demominator during calculations of child behaviors
       */
       if ( !results[teacherId].allObservationIds.includes(row.id) ) {
         results[teacherId].allObservationIds.push(row.id)
       }

    }



    // Calculate the averages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      var tempTotalInstructions = result.totalInstructions
      var tempTotalIntervals = result.totalIntervals

      let teacherObservationsCount = result.teacherObservationIds.length > 0 ? result.teacherObservationIds.length : 1; // If there are no observations of this type we need to set it to 1 to prevent dividing by zero
      let childObservationsCount = result.childObservationIds.length > 0 ? result.childObservationIds.length : 1; // If there are no observations of this type we need to set it to 1 to prevent dividing by zero
      let allObservationsCount = result.allObservationIds.length

      result.childrensPlayAverage =
        result.childrensPlay > 0
          ? Math.round(result.childrensPlay / teacherObservationsCount)
          : 0
      result.askingQuestionsAverage =
        result.askingQuestions > 0
          ? Math.round(result.askingQuestions / teacherObservationsCount)
          : 0
      result.encouragingChildrenAverage =
        result.encouragingChildren > 0
          ? Math.round(result.encouragingChildren / teacherObservationsCount)
          : 0
      result.helpingChildrenAverage =
        result.helpingChildren > 0
          ? Math.round(result.helpingChildren / teacherObservationsCount)
          : 0

      result.noSequenceAverage =
        result.noSequence > 0
          ? Math.round(result.noSequence / childObservationsCount)
          : 0
      result.formalRulesAverage =
        result.formalRules > 0
          ? Math.round(result.formalRules / childObservationsCount)
          : 0
      result.sequenceAverage =
        result.sequence > 0
          ? Math.round(result.sequence / childObservationsCount)
          : 0

      result.supportAverage =
        result.support > 0
          ? (result.support / tempTotalIntervals).toFixed(2) * 100
          : 0
      result.noSupportAverage =
        result.noSupport > 0
          ? (result.noSupport / tempTotalIntervals).toFixed(2) * 100
          : 0
      result.notAtCenterAverage =
        result.notAtCenter > 0
          ? (result.notAtCenter / tempTotalIntervals).toFixed(2) * 100
          : 0
    }

    console.log(results)

    return results
  }
}

export default AveragesData
