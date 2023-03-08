const monthsArr = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
]

class TrendData {
  constructor() {}

  /*
   * Will return an object that holds data for all of the trends data for Book Reading
   */
  calculateTransitionTrends = (data, teacher, startDate, endDate) => {
    // Initialize the array that will hold all the data
    var results = {}

    var totalIntervals = 0

    const tempName = teacher.firstName + ' ' + teacher.lastName

    // Get all the dates that had an observation
    var observationDates = [...new Set(data.map(item => item.startDate.value))]

    // Format the dates
    var observationDatesFormatted = observationDates.map(o => {
      return new Date(o.replace(/-/g, '/')).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    });

    var monthsCount = observationDates.length;

    // Initialize the results
    results[teacher.id] = {
      name: tempName,

      total: new Array(monthsCount).fill(0),

      lineChartLabels: observationDatesFormatted,

      observationTotalTime: new Array(monthsCount).fill(0),

      transitionTimeAverage: new Array(monthsCount).fill(0),
    }


    // Sort by date just in case
    data.sort(function(a, b) {
      return new Date(b.startDate.value) - new Date(a.startDate.value)
    })

    var teacherId = teacher.id

    // Go through all the data from BQ
    for (var rowIndex in data) {
      var row = data[rowIndex]

      let formattedDate = new Date(row.startDate.value.replace(/-/g, '/')).toLocaleDateString('en-us', {year: 'numeric', month: 'short', day: 'numeric', })
      var rowMonth = observationDatesFormatted.indexOf(formattedDate)

      // Calculate the total amount of transition time
      results[teacherId].total[rowMonth] += row.total

      // Calculate the total amount of time for these observations
      results[teacherId].observationTotalTime[rowMonth] += row.observationTotalTime
    }


    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      // Go through the months
      for (var i = 0; i < monthsCount; i++) {
        var tempTotalInstructions = result.total[i]

        result.transitionTimeAverage[i] =
          result.total[i] > 0
            ? (result.total[i] / result.observationTotalTime[i]).toFixed(2) * 100
            : 0

      }
    }

    return results
  }

  /*
   * Classroom Climate
   */
  calculateClimateTrends = (data, teacher, startDate, endDate) => {
    // Initialize the array that will hold all the data
    var results = {}

    var totalIntervals = 0

    // Get all the dates that have data
    var observationDates = [...new Set(data.map(item => {return item.startDate.value}))];

    // Format the dates
    var observationDatesFormatted = observationDates.map(o => {
      return new Date(o.replace(/-/g, '/')).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    })

    const monthsCount = observationDates.length;

    results[teacher.id] = {
      name: teacher.firstName + ' ' + teacher.lastName,
      total: new Array(monthsCount).fill(0),
      nonspecificapproval: new Array(monthsCount).fill(0),
      specificapproval: new Array(monthsCount).fill(0),
      disapproval: new Array(monthsCount).fill(0),
      redirection: new Array(monthsCount).fill(0),

      nonspecificapprovalAverage: new Array(monthsCount).fill(0),
      specificapprovalAverage: new Array(monthsCount).fill(0),
      disapprovalAverage: new Array(monthsCount).fill(0),
      redirectionAverage: new Array(monthsCount).fill(0),

      toneTotal: new Array(monthsCount).fill(0),
      toneCount: new Array(monthsCount).fill(0),
      toneAverage: new Array(monthsCount).fill(0),

      lineChartLabels: observationDatesFormatted,
    }

    // Go through the data from BQ
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = teacher.id

      //rowMonth = months.indexOf(new Date(row.startDate.value).getMonth());
      let formattedDate = new Date(row.startDate.value.replace(/-/g, '/')).toLocaleDateString('en-us', {year: 'numeric', month: 'short', day: 'numeric', })

      let rowMonth = observationDatesFormatted.indexOf(formattedDate);

      // Add to behavior types
      // Make sure we're not reading the tone rows
      if (
        row.behaviorResponse === 'nonspecificapproval' ||
        row.behaviorResponse === 'specificapproval' ||
        row.behaviorResponse === 'disapproval' ||
        row.behaviorResponse === 'redirection'
      ) {
        results[teacherId][row.behaviorResponse][rowMonth] += row.count
        results[teacherId].total[rowMonth] += row.count
      }

      // Get tone rating
      if (row.toneRating !== null) {
        results[teacherId].toneTotal[rowMonth] += row.toneRating
        results[teacherId].toneCount[rowMonth]++
      }
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      // Go through the months
      for (var i = 0; i < monthsCount; i++) {
        var tempTotalInstructions = result.total[i]

        result.nonspecificapprovalAverage[i] =
          result.nonspecificapproval[i] > 0
            ? (result.nonspecificapproval[i] / tempTotalInstructions).toFixed(
                2
              ) * 100
            : 0
        result.specificapprovalAverage[i] =
          result.specificapproval[i] > 0
            ? (result.specificapproval[i] / tempTotalInstructions).toFixed(2) *
              100
            : 0
        result.disapprovalAverage[i] =
          result.disapproval[i] > 0
            ? (result.disapproval[i] / tempTotalInstructions).toFixed(2) * 100
            : 0
        result.redirectionAverage[i] =
          result.redirection[i] > 0
            ? (result.redirection[i] / tempTotalInstructions).toFixed(2) * 100
            : 0

        result.toneAverage[i] =
          result.toneCount[i] > 0
            ? Math.round(
                (result.toneTotal[i] / result.toneCount[i] + Number.EPSILON) *
                  100
              ) / 100
            : 0
      }
    }

    return results
  }

  /*
   * MATH INSTRUCTIONS
   */
  calculateMathTrends = (data, teacher, startDate, endDate) => {
    // Initialize the array that will hold all the data
    var results = {}

    // Seperate the teacher data so if 'teacher behaviors' is selected, it only shows dates where teacher observations were conducted
    var teacherData = data.filter(item => {return item.peopletype == 3});

    // Get all the dates that had an observation
    var observationDates = [...new Set(data.map(item => item.timestamp))]
    var teacherObservationDates = [...new Set(teacherData.map(item => item.timestamp))]

    // Format the dates
    var observationDatesFormatted = observationDates.map(o => {
      return new Date(o).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    })
    var teacherObservationDatesFormatted = teacherObservationDates.map(o => {
      return new Date(o).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    })


    var arraySize = observationDates.length
    console.log(arraySize)

    results[teacher.id] = {
      name: teacher.firstName + ' ' + teacher.lastName,
      totalInstructions: new Array(arraySize).fill(0),
      mathVocabulary: new Array(arraySize).fill(0),
      askingQuestions: new Array(arraySize).fill(0),
      mathConcepts: new Array(arraySize).fill(0),
      helpingChildren: new Array(arraySize).fill(0),

      notAtCenter: new Array(arraySize).fill(0),
      noSupport: new Array(arraySize).fill(0),
      support: new Array(arraySize).fill(0),

      childNonMath: new Array(arraySize).fill(0),
      childMath: new Array(arraySize).fill(0),

      totalInstructionsAverage: new Array(arraySize).fill(0),
      mathVocabularyAverage: new Array(arraySize).fill(0),
      askingQuestionsAverage: new Array(arraySize).fill(0),
      mathConceptsAverage: new Array(arraySize).fill(0),
      helpingChildrenAverage: new Array(arraySize).fill(0),

      notAtCenterMathAverage: new Array(arraySize).fill(0),
      noSupportMathAverage: new Array(arraySize).fill(0),
      supportMathAverage: new Array(arraySize).fill(0),

      childNonMathAverage: new Array(arraySize).fill(0),
      childMathAverage: new Array(arraySize).fill(0),

      lineChartLabels: observationDatesFormatted,
      teacherLineChartLabels: teacherObservationDatesFormatted,
    }

    // Get number of instances for each type of data
    var tempIntervalData = 0
    //var rowMonth = startMonth;
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = teacher.id

      // var rowMonth = new Date(row.timestamp).getMonth();
      var rowMonth = observationDates.indexOf(row.timestamp)

      // Add to total # of intervals
      //results[teacherId].totalInstructions[rowMonth] += row.noOpportunity + row.support + row.noSupport;
      results[teacherId].totalInstructions[rowMonth] += row.count

      // Add to behavior types
      results[teacherId].mathVocabulary[rowMonth] += row.mathVocabulary
      results[teacherId].askingQuestions[rowMonth] += row.askingQuestions
      results[teacherId].mathConcepts[rowMonth] += row.mathConcepts
      results[teacherId].helpingChildren[rowMonth] += row.helpingChildren

      results[teacherId].notAtCenter[rowMonth] += row.noOpportunity
      results[teacherId].support[rowMonth] += row.support
      results[teacherId].noSupport[rowMonth] += row.noSupport

      results[teacherId].childNonMath[rowMonth] += row.noMath
      results[teacherId].childMath[rowMonth] += row.count - row.noMath

    }

    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      // Go through the months
      for (var i = 0; i < arraySize; i++) {
        var tempTotalInstructions = result.totalInstructions[i]

        result.mathVocabularyAverage[i] =
          result.mathVocabulary[i] > 0
            ? (result.mathVocabulary[i] / tempTotalInstructions).toFixed(2) *
              100
            : 0
        result.askingQuestionsAverage[i] =
          result.askingQuestions[i] > 0
            ? (result.askingQuestions[i] / tempTotalInstructions).toFixed(2) *
              100
            : 0
        result.mathConceptsAverage[i] =
          result.mathConcepts[i] > 0
            ? (result.mathConcepts[i] / tempTotalInstructions).toFixed(2) * 100
            : 0
        result.helpingChildrenAverage[i] =
          result.helpingChildren[i] > 0
            ? (result.helpingChildren[i] / tempTotalInstructions).toFixed(2) *
              100
            : 0

        result.notAtCenterMathAverage[i] =
          result.notAtCenter[i] > 0
            ? (result.notAtCenter[i] / tempTotalInstructions).toFixed(2) * 100
            : 0
        result.supportMathAverage[i] =
          result.support[i] > 0
            ? (result.support[i] / tempTotalInstructions).toFixed(2) * 100
            : 0
        result.noSupportMathAverage[i] =
          result.noSupport[i] > 0
            ? (result.noSupport[i] / tempTotalInstructions).toFixed(2) * 100
            : 0

        result.childNonMathAverage[i] =
          result.childNonMath[i] > 0
            ? (result.childNonMath[i] / tempTotalInstructions).toFixed(2) * 100
            : 0
        result.childMathAverage[i] =
          result.childMath[i] > 0
            ? (result.childMath[i] / tempTotalInstructions).toFixed(2) * 100
            : 0
      }
    }

    console.log(results)

    return results
  }

  /*
   * Level of Instructions
   */
  calculateLevelInstructionTrends = (data, teacher, startDate, endDate) => {
    // Initialize the array that will hold all the data
    var results = {}

    var totalIntervals = 0

    // Get start month and year
    const startMonth = startDate.getMonth()

    const endMonth = endDate.getMonth()

    // Add each teacher to the object
    var tempName = teacher.firstName + ' ' + teacher.lastName

    // Get all the dates that have data
    var observationDates = [...new Set(data.map(item => { return item.startDate.value})),]

    // Format the dates
    var observationDatesFormatted = observationDates.map(o => {
      return new Date(o.replace(/-/g, '/')).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    })

    var arraySize = observationDates.length

    results[teacher.id] = {
      name: tempName,
      totalInstructions: new Array(arraySize).fill(0),
      hlq: new Array(arraySize).fill(0),
      hlqResponse: new Array(arraySize).fill(0),
      llq: new Array(arraySize).fill(0),
      llqResponse: new Array(arraySize).fill(0),

      hlqAverage: new Array(arraySize).fill(0),
      hlqResponseAverage: new Array(arraySize).fill(0),
      llqAverage: new Array(arraySize).fill(0),
      llqResponseAverage: new Array(arraySize).fill(0),

      lineChartLabels: observationDatesFormatted,
    }

    // Get number of instances for each type of data
    var tempIntervalData = 0
    //var rowMonth = startMonth;
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = teacher.id

      // var rowMonth = new Date(row.startDate.value).getMonth();
      var rowMonth = observationDates.indexOf(row.startDate.value)

      // Add to total # of intervals
      results[teacherId].totalInstructions[rowMonth] += row.count

      // Add to behavior types
      results[teacherId][row.instructionType][rowMonth] += row.count
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]
      var arraySize = observationDates.length

      // Go through the months
      for (var i = 0; i < arraySize; i++) {
        var tempTotalInstructions = result.totalInstructions[i]

        result.hlqAverage[i] =
          result.hlq[i] > 0
            ? (result.hlq[i] / tempTotalInstructions).toFixed(2) * 100
            : 0
        result.hlqResponseAverage[i] =
          result.hlqResponse[i] > 0
            ? (result.hlqResponse[i] / tempTotalInstructions).toFixed(2) * 100
            : 0
        result.llqAverage[i] =
          result.llq[i] > 0
            ? (result.llq[i] / tempTotalInstructions).toFixed(2) * 100
            : 0
        result.llqResponseAverage[i] =
          result.llqResponse[i] > 0
            ? (result.llqResponse[i] / tempTotalInstructions).toFixed(2) * 100
            : 0
      }
    }

    return results
  }

  /*
   * Student Engagement
   */
  calculateStudentEngagementTrends = (data, teacher, startDate, endDate) => {
    // Initialize the array that will hold all the data
    var results = {}

    var totalIntervals = 0

    // Get start month and year
    const startMonth = startDate.getMonth()

    const endMonth = endDate.getMonth()

    // Add each teacher to the object
    var tempName = teacher.firstName + ' ' + teacher.lastName

    var observationDates = [...new Set(data.map(item => item.startDate))]

    // Sort by date just in case
    observationDates.sort(function(a, b) {
      return new Date(a) - new Date(b)
    })

    //formats the observation dates

    var observationDatesFormatted = observationDates.map(o => {
      return new Date(o).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    })

    console.log('Observation Dates : ', observationDates)

    var arraySize = observationDates.length

    // keeps track of points and the amount of observations
    results[teacher.id] = {
      name: tempName,
      totalPoints: new Array(arraySize).fill(0),
      totalIntervals: new Array(arraySize).fill(0),
      dailyAverage: new Array(arraySize).fill(0),

      lineChartLabels: observationDatesFormatted,
    }

    // Get number of instances for each type of data
    var tempIntervalData = 0
    //var rowMonth = startMonth;
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = teacher.id

      var rowMonth = observationDates.indexOf(row.startDate)

      // Add to total # of interval

      // Add to behavior types
      results[teacherId].totalPoints[rowMonth] += row.point
      results[teacherId].totalIntervals[rowMonth] += row.count
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]
      var arraySize = observationDates.length

      // Go through the months
      for (var i = 0; i < arraySize; i++) {
        result.dailyAverage[i] =
          result.totalPoints[i] / result.totalIntervals[i]
      }
    }

    return results
  }

  /*
   * Listening to Children
   */
  calculateListeningToChildrenTrends = (data, teacher, startDate, endDate) => {
    // Initialize the array that will hold all the data
    var results = {}

    // Get all the dates that had an observation
    var observationDates = [...new Set(data.map(item => item.startDate))]

    // Format dates
    var observationDatesFormatted = observationDates.map(o => {
      return new Date(o).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    })

    var monthsCount = observationDates.length

    // Add each teacher to the object
    results[teacher.id] = {
      name: teacher.firstName + ' ' + teacher.lastName,
      eyeLevel: new Array(monthsCount).fill(0),
      positiveExpression: new Array(monthsCount).fill(0),
      repeats: new Array(monthsCount).fill(0),
      openEndedQuestions: new Array(monthsCount).fill(0),
      extendsPlay: new Array(monthsCount).fill(0),
      encouragesPeerTalk: new Array(monthsCount).fill(0),

      encouraging: new Array(monthsCount).fill(0),
      noBehaviors: new Array(monthsCount).fill(0),

      totalInstructions: new Array(monthsCount).fill(0),
      totalObserved: new Array(monthsCount).fill(0),

      eyeLevelAverage: new Array(monthsCount).fill(0),
      positiveExpressionAverage: new Array(monthsCount).fill(0),
      repeatsAverage: new Array(monthsCount).fill(0),
      openEndedQuestionsAverage: new Array(monthsCount).fill(0),
      extendsPlayAverage: new Array(monthsCount).fill(0),
      encouragesPeerTalkAverage: new Array(monthsCount).fill(0),

      encouragingAverage: new Array(monthsCount).fill(0),
      noBehaviorsAverage: new Array(monthsCount).fill(0),

      totalInstructionsAverage: new Array(monthsCount).fill(0),
      totalObservedAverage: new Array(monthsCount).fill(0),

      lineChartLabels: observationDatesFormatted,
    }

    // Get number of instances for each type of data
    var tempIntervalData = 0
    //var rowMonth = startMonth;
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = teacher.id

      //var rowMonth = new Date(row.startDate).getMonth();

      let formattedDate = new Date(row.startDate).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });

      var rowMonth = observationDatesFormatted.indexOf(formattedDate)

      // Add to behavior types
      results[teacherId].eyeLevel[rowMonth] += row.listening1
      results[teacherId].positiveExpression[rowMonth] += row.listening2
      results[teacherId].repeats[rowMonth] += row.listening3
      results[teacherId].openEndedQuestions[rowMonth] += row.listening4
      results[teacherId].extendsPlay[rowMonth] += row.listening5
      results[teacherId].encouragesPeerTalk[rowMonth] += row.listening6

      results[teacherId].noBehaviors[rowMonth] += row.listening7
      results[teacherId].encouraging[rowMonth] += row.count - row.listening7

      // Calculate the total Number of instructions
      results[teacherId].totalInstructions[rowMonth] += row.count

      // Calculate total number of observations
      results[teacherId].totalObserved[rowMonth] += row.count
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      // Go through the months
      for (var i = 0; i < monthsCount; i++) {
        var tempTotalInstructions = result.totalInstructions[i]
        var tempTotalObserved = result.totalObserved[i]

        result.eyeLevelAverage[i] =
          result.eyeLevel[i] > 0
            ? (result.eyeLevel[i] / tempTotalInstructions).toFixed(2) * 100
            : 0
        result.positiveExpressionAverage[i] =
          result.positiveExpression[i] > 0
            ? (result.positiveExpression[i] / tempTotalInstructions).toFixed(
                2
              ) * 100
            : 0
        result.repeatsAverage[i] =
          result.repeats[i] > 0
            ? (result.repeats[i] / tempTotalInstructions).toFixed(2) * 100
            : 0
        result.openEndedQuestionsAverage[i] =
          result.openEndedQuestions[i] > 0
            ? (result.openEndedQuestions[i] / tempTotalInstructions).toFixed(
                2
              ) * 100
            : 0
        result.extendsPlayAverage[i] =
          result.extendsPlay[i] > 0
            ? (result.extendsPlay[i] / tempTotalInstructions).toFixed(2) * 100
            : 0
        result.encouragesPeerTalkAverage[i] =
          result.encouragesPeerTalk[i] > 0
            ? (result.encouragesPeerTalk[i] / tempTotalInstructions).toFixed(
                2
              ) * 100
            : 0

        result.noBehaviorsAverage[i] =
          result.noBehaviors[i] > 0
            ? (result.noBehaviors[i] / tempTotalObserved).toFixed(2) * 100
            : 0
        result.encouragingAverage[i] =
          result.encouraging[i] > 0
            ? (result.encouraging[i] / tempTotalObserved).toFixed(2) * 100
            : 0
      }
    }

    return results
  }

  /*
   * Sequential Activities
   */
  calculateSequentialActivitiesTrends = (data, teacher, startDate, endDate) => {
    // Initialize the array that will hold all the data
    var results = {}

    // Seperate the teacher data so if 'teacher behaviors' is selected, it only shows dates where teacher observations were conducted
    var teacherData = data.filter(item => {return item.peopletype == 3});

    // Get all the dates that had an observation
    var observationDates = [...new Set(data.map(item => item.timestamp))]
    var teacherObservationDates = [...new Set(teacherData.map(item => item.timestamp))]

    // Format the dates
    var observationDatesFormatted = observationDates.map(o => {
      return new Date(o).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    })
    var teacherObservationDatesFormatted = teacherObservationDates.map(o => {
      return new Date(o).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    })

    console.log("Teacher dates : ", teacherObservationDatesFormatted);


    var monthsCount = observationDates.length

    // Add each teacher to the object
    results[teacher.id] = {
      name: teacher.firstName + ' ' + teacher.lastName,
      totalInstructions: new Array(monthsCount).fill(0),
      totalTeacherInstructions: new Array(monthsCount).fill(0),

      childNonSequentialActivities: new Array(monthsCount).fill(0),
      childNonSequentialActivitiesAverage: new Array(monthsCount).fill(0),

      support: new Array(monthsCount).fill(0),
      noSupport: new Array(monthsCount).fill(0),
      noSupportAverage: new Array(monthsCount).fill(0),

      lineChartLabels: observationDatesFormatted,
      teacherLineChartLabels: teacherObservationDatesFormatted,
    }

    // Get number of instances for each type of data
    var tempIntervalData = 0
    //var rowMonth = startMonth;
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = teacher.id

      var formattedDate = new Date(row.timestamp).toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })

      var rowMonth = observationDatesFormatted.indexOf(formattedDate)

      // Add to total # of intervals
      results[teacherId].totalInstructions[rowMonth] += row.notAtCenter + row.support + row.noSupport
      results[teacherId].totalTeacherInstructions[rowMonth] += row.support + row.noSupport

      // Add to behavior types
      results[teacherId].support[rowMonth] += row.support
      results[teacherId].noSupport[rowMonth] += row.noSupport

      results[teacherId].childNonSequentialActivities[rowMonth] += row.childNonSequentialActivities
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      // Go through the months
      for (var i = 0; i < monthsCount; i++) {
        var tempTotalInstructions = result.totalInstructions[i]
        var tempTeacherInstructions = result.totalTeacherInstructions[i]

        result.noSupportAverage[i] =
          (result.noSupport[i] > 0 || result.support[i] > 0) && tempTeacherInstructions > 0
            ? (result.noSupport[i] / tempTeacherInstructions).toFixed(2) * 100
            : 0

        // If there are any instructions for this month at all, then there will be child data.
        result.childNonSequentialActivitiesAverage[i] =
          tempTotalInstructions > 0
            ? (result.childNonSequentialActivities[i] / tempTotalInstructions).toFixed(2) * 100
            : 0
      }
    }

    return results
  }

  /*
   * Foundational Skills
   */
  calculateFoundationalSkillsTrends = (data, teacher, startDate, endDate) => {
    // Initialize the array that will hold all the data
    var results = {}

    // Seperate the teacher data from the children data so we can have correct months for each
    const teacherData = data.filter(item => {return !item.isChild});
    const childData = data.filter(item => {return item.isChild});

    // Get all the dates that had an observation
    var observationDates = [...new Set(teacherData.map(item => item.GroupDate.value))]
    var childObservationDates = [...new Set(childData.map(item => item.GroupDate.value))]

    // Format the dates
    var observationDatesFormatted = observationDates.map(o => {
      return new Date(o.replace(/-/g, '/')).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    })
    var childObservationDatesFormatted = childObservationDates.map(o => {
      return new Date(o.replace(/-/g, '/')).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    })

    var monthsCount = observationDates.length

    // Add each teacher to the object
    results[teacher.id] = {
      name: teacher.firstName + ' ' + teacher.lastName,
      totalIntervals: new Array(monthsCount).fill(0),
      totalChildIntervals: new Array(childObservationDatesFormatted.length).fill(0),

      foundationalSkills: new Array(monthsCount).fill(0),
      childFoundationalSkills: new Array(childObservationDatesFormatted.length).fill(0),

      foundationalSkillsAverage: new Array(monthsCount).fill(0),
      childEngagedAverage: new Array(childObservationDatesFormatted.length).fill(0),

      lineChartLabels: observationDatesFormatted,
      childLineChartLabels: childObservationDatesFormatted,
    }

    // Sort by date just in case
    data.sort(function(a, b) {
      return new Date(b.GroupDate.value) - new Date(a.GroupDate.value)
    })

    // Get number of instances for each type of data
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = teacher.id

      let formatDate = new Date(row.GroupDate.value.replace(/-/g, '/')).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })


      let rowMonth
      if(row.isChild)
      {
        rowMonth = childObservationDatesFormatted.indexOf(formatDate);

        results[teacherId].totalChildIntervals[rowMonth]++;

        if(!row.foundational10)
        {
          results[teacherId].childFoundationalSkills[rowMonth]++;
        }
      }
      else
      {
        rowMonth = observationDatesFormatted.indexOf(formatDate);
        // Add to total # of intervals
        results[teacherId].totalIntervals[rowMonth]++


        // If this observation has anything
        if (!row.foundational11) {
          results[teacherId].foundationalSkills[rowMonth]++
        }

      }
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      // Go through the teacher months
      for (var i = 0; i < monthsCount; i++) {
        //var tempTotalInstructions = result.totalInstructions[i]
        var tempTotalIntervals = result.totalIntervals[i]

        result.foundationalSkillsAverage[i] =
          result.foundationalSkills[i] > 0
            ? (result.foundationalSkills[i] / tempTotalIntervals).toFixed(2) *
              100
            : 0
      }

      // Go through the child months
      for (var i = 0; i < childObservationDatesFormatted.length; i++) {
        result.childEngagedAverage[i] =
          result.childFoundationalSkills[i] > 0
            ? (result.childFoundationalSkills[i] / result.totalChildIntervals[i]).toFixed(2) * 100
            : 0
      }

    }

    return results
  }

  /*
   * Writing Skills
   */
  calculateWritingSkillsTrends = (data, teacher, startDate, endDate) => {
    // Initialize the array that will hold all the data
    var results = {}

    // Seperate the teacher data from the children data so we can have correct months for each
    const teacherData = data.filter(item => {return !item.isChild});
    const childData = data.filter(item => {return item.isChild});

    // Get all the dates that had an observation
    var observationDates = [...new Set(teacherData.map(item => item.GroupDate.value))]
    var childObservationDates = [...new Set(childData.map(item => item.GroupDate.value))]

    // Format the dates
    var observationDatesFormatted = observationDates.map(o => {
      return new Date(o.replace(/-/g, '/')).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    })
    var childObservationDatesFormatted = childObservationDates.map(o => {
      return new Date(o.replace(/-/g, '/')).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    })


    var monthsCount = observationDates.length

    // Add each teacher to the object
    var tempName = teacher.firstName + ' ' + teacher.lastName

    results[teacher.id] = {
      name: tempName,
      totalTeacherIntervals: new Array(monthsCount).fill(0),
      totalChildIntervals: new Array(childObservationDatesFormatted.length).fill(0),
      writingSkills: new Array(monthsCount).fill(0),
      childWritingSkills: new Array(childObservationDatesFormatted.length).fill(0),

      writingSkillsAverage: new Array(monthsCount).fill(0),
      childWritingSkillsAverage: new Array(childObservationDatesFormatted.length).fill(0),

      lineChartLabels: observationDatesFormatted,
      childLineChartLabels: childObservationDatesFormatted,
    }



    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = teacher.id

      let formatDate = new Date(row.GroupDate.value.replace(/-/g, '/')).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })


      let rowMonth;
      // Count each teacher interval that has a writing instruction in it
      if (!row.isChild) {
        rowMonth = observationDatesFormatted.indexOf(formatDate);

        // Count total number of teacher intervalse
        results[teacherId].totalTeacherIntervals[rowMonth]++

        if(!row.writing9)
        {
          results[teacherId].writingSkills[rowMonth]++
        }
      }

      // Count each child interval that has a writing instruction in it
      if (row.isChild) {
        rowMonth = childObservationDatesFormatted.indexOf(formatDate);

        // Count total number of child intervalse
        results[teacherId].totalChildIntervals[rowMonth]++

        if(!row.writingChild9)
        {
          results[teacherId].childWritingSkills[rowMonth]++
        }
      }

    }



    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      // Go through the months
      for (var i = 0; i < monthsCount; i++) {
        var tempTotalTeacherIntervals = result.totalTeacherIntervals[i]

        result.writingSkillsAverage[i] =
          tempTotalTeacherIntervals > 0
            ? (result.writingSkills[i] / tempTotalTeacherIntervals).toFixed(2) * 100
            : 0

      }

      // Go through the child months
      for (var i = 0; i < childObservationDates.length; i++) {
        var tempTotalChildIntervals = result.totalChildIntervals[i];

        result.childWritingSkillsAverage[i] =
          tempTotalChildIntervals > 0
            ? (result.childWritingSkills[i] / tempTotalChildIntervals).toFixed(2) * 100
            : 0
      }

    }

    return results
  }

  /*
   * Book Reading
   */
  calculateBookReadingTrends = (data, teacher, startDate, endDate) => {
    // Initialize the array that will hold all the data
    var results = {}

    var totalIntervals = 0

    // Get start month and year
    const startMonth = startDate.getMonth()
    const endMonth = endDate.getMonth()

    // Initialize Teacher data object
    var tempName = teacher.firstName + ' ' + teacher.lastName

    results[teacher.id] = {
      name: tempName,
      totalIntervals: new Array(12).fill(0),
      totalInstructions: new Array(12).fill(0),
      bookReading: new Array(12).fill(0),
      vocabFocus: new Array(12).fill(0),
      languageConnections: new Array(12).fill(0),
      childrenSupport: new Array(12).fill(0),
      fairnessDiscussions: new Array(12).fill(0),
      multimodalInstruction: new Array(12).fill(0),

      vocabFocusAverage: new Array(12).fill(0),
      languageConnectionsAverage: new Array(12).fill(0),
      childrenSupportAverage: new Array(12).fill(0),
      fairnessDiscussionsAverage: new Array(12).fill(0),
      multimodalInstructionAverage: new Array(12).fill(0),
      bookReadingAverage: new Array(12).fill(0),
    }

    // Sort by date just in case
    data.sort(function(a, b) {
      return new Date(b.sessionStart.value) - new Date(a.sessionStart.value)
    })

    // Get number of instances for each type of data
    var tempIntervalData = 0
    var prevMonth = 0,
      rowMonth = startMonth

    var teacherId = teacher.id

    for (var rowIndex in data) {
      var row = data[rowIndex]

      rowMonth = new Date(row.sessionStart.value).getMonth()

      // Add to total # of intervals
      results[teacherId].totalIntervals[rowMonth] += row.total

      // Add to behavior types

      // Calculate the total Number of instructions
      results[teacherId].totalInstructions[rowMonth] +=
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

      results[teacherId].vocabFocus[rowMonth] += row.vocab
      results[teacherId].languageConnections[rowMonth] += row.makeConnection
      results[teacherId].childrenSupport[rowMonth] += row.support
      results[teacherId].fairnessDiscussions[rowMonth] += row.discussions
      results[teacherId].multimodalInstruction[rowMonth] += row.multimodal

      results[teacherId].bookReading[rowMonth] += row.total - row.literacy11
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      // Go through the months
      for (var i = 0; i < 12; i++) {
        var tempTotalInstructions = result.totalInstructions[i]
        var tempTotalIntervals = result.totalIntervals[i]

        result.vocabFocusAverage[i] =
          result.vocabFocus[i] > 0
            ? (result.vocabFocus[i] / tempTotalIntervals).toFixed(2) * 100
            : 0
        result.languageConnectionsAverage[i] =
          result.languageConnections[i] > 0
            ? (result.languageConnections[i] / tempTotalIntervals).toFixed(2) *
              100
            : 0
        result.childrenSupportAverage[i] =
          result.childrenSupport[i] > 0
            ? (result.childrenSupport[i] / tempTotalIntervals).toFixed(2) * 100
            : 0
        result.fairnessDiscussionsAverage[i] =
          result.fairnessDiscussions[i] > 0
            ? (result.fairnessDiscussions[i] / tempTotalIntervals).toFixed(2) *
              100
            : 0
        result.multimodalInstructionAverage[i] =
          result.multimodalInstruction[i] > 0
            ? (result.multimodalInstruction[i] / tempTotalIntervals).toFixed(
                2
              ) * 100
            : 0

        result.bookReadingAverage[i] =
          result.bookReading[i] > 0
            ? (result.bookReading[i] / tempTotalIntervals).toFixed(2) * 100
            : 0
      }
    }

    return results
  }

  /*
   * Language Environment
   */
  calculateLanguageEnvironmentTrends = (data, teacher, startDate, endDate) => {
    // Initialize the array that will hold all the data
    var results = {}

    // Get all the dates that had an observation
    var observationDates = [...new Set(data.map(item => item.GroupDate.value))];

    // Format the dates
    var observationDatesFormatted = observationDates.map(o => {
      return new Date(o.replace(/-/g, '/')).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    })

    var monthsCount = observationDates.length

    // Add each teacher to the object
    var tempName = teacher.firstName + ' ' + teacher.lastName

    results[teacher.id] = {
      name: tempName,
      totalIntervals: new Array(monthsCount).fill(0),
      languageEnvironment: new Array(monthsCount).fill(0),

      languageEnvironmentAverage: new Array(monthsCount).fill(0),

      lineChartLabels: observationDatesFormatted,
    }



    // Go through data from BQ
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = teacher.id

      let rowMonth = observationDatesFormatted.indexOf(
        new Date(row.GroupDate.value.replace(/-/g, '/')).toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      )

      // Add to total # of intervals
      results[teacherId].totalIntervals[rowMonth] += row.total

      // Add to behavior types

      // If there were any answers in this observation
      if (!row.literacy9) {
        results[teacherId].languageEnvironment[rowMonth]++
      }
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      // Go through the months
      for (var i = 0; i < monthsCount; i++) {
        var tempTotalIntervals = result.totalIntervals[i]

        result.languageEnvironmentAverage[i] =
          tempTotalIntervals > 0
            ? (result.languageEnvironment[i] / tempTotalIntervals).toFixed(2) *
              100
            : 0
      }
    }

    return results
  }

  /*
   * Associative and Cooperative
   */
  calculateACTrends = (data, teacher, startDate, endDate) => {
    let results = {};

    // Seperate the teacher data so if 'teacher behaviors' is selected, it only shows dates where teacher observations were conducted
    var teacherData = data.filter(item => {return item.peopleType == 3});
    var childData = data.filter(item => {return item.peopleType == 2 || item.peopleType == 3});

    // Get all the dates that had an observation
    var observationDates = [...new Set(childData.map(item => item.GroupDate.value))]
    var teacherObservationDates = [...new Set(teacherData.map(item => item.GroupDate.value))]

    // Format the dates
    var observationDatesFormatted = observationDates.map(o => {
      return new Date(o.replace(/-/g, '/')).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    })
    var teacherObservationDatesFormatted = teacherObservationDates.map(o => {
      return new Date(o.replace(/-/g, '/')).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    })


    let monthsCount = observationDates.length;
    results[teacher.id] = {
      name: `${teacher.firstName} ${teacher.lastName}`,
      totalSupport: new Array(monthsCount).fill(0),

      teacherIntervals: new Array(teacherObservationDates.length).fill(0),
      teacherSupport: new Array(teacherObservationDates.length).fill(0),
      teacherSupportAverage: new Array(teacherObservationDates.length).fill(0),

      childIntervals: new Array(monthsCount).fill(0),
      childSupport: new Array(monthsCount).fill(0),
      childSupportAverage: new Array(monthsCount).fill(0),

      lineChartLabels: observationDatesFormatted,
      teacherLineChartLabels: teacherObservationDatesFormatted
    };

    let rowMonth;
    for (let rowIndex in data) {
      let row = data[rowIndex];
      let teacherId = teacher.id;

      var formattedDate = new Date(row.GroupDate.value.replace(/-/g, '/')).toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })

      if (row.peopleType == 3)
      {
          rowMonth = teacherObservationDatesFormatted.indexOf(formattedDate);

          // Increment teacher interval count
          results[teacher.id].teacherIntervals[rowMonth]++;

          // If there is any data increment the support
          if(!row.teacher5)
          {
            results[teacher.id].teacherSupport[rowMonth]++;
          }

          // Switch to get the index of the child month
          rowMonth = observationDatesFormatted.indexOf(formattedDate);

          // Increment teacher interval count
          results[teacher.id].childIntervals[rowMonth]++

          // If there is any data increment the child support
          if(!row.child5)
          {
            results[teacher.id].childSupport[rowMonth]++;
          }
      }
      if (row.peopleType == 2)
      {
        rowMonth = observationDatesFormatted.indexOf(formattedDate);

        // Increment just child count
        results[teacher.id].childIntervals[rowMonth]++;

        // If there is any data increment the support
        if(!row.child5)
        {
          results[teacher.id].childSupport[rowMonth]++;
        }
      }

    }

    for (let resultsIndex in results) {
      let result = results[resultsIndex];

      // Calculate the teacher average for each month availabe
      for (let i = 0; i < teacherObservationDates.length; i++) {
        result.teacherSupportAverage[i] = parseFloat((result.teacherSupport[i] / result.teacherIntervals[i]).toFixed(2)) * 100;

      }

      // Calculate the child average for each month availabe
      for (let i = 0; i < monthsCount; i++)
      {
        result.childSupportAverage[i] = parseFloat((result.childSupport[i] / result.childIntervals[i]).toFixed(2)) * 100;
      }
    }

    console.log(results)
    return results;

  }
}

export default TrendData
