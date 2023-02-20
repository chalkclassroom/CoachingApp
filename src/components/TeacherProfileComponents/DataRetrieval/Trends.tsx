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

    // Get start month and year
    const startMonth = startDate.getMonth()

    const endMonth = endDate.getMonth()

    const tempName = teacher.firstName + ' ' + teacher.lastName


    /*
     * Build list of months between start date and end date
     */
    // Set the month after the end date, formatted like Nov 21, 2022
    var endDatePlusOneMonth = new Date(
      endDate.setMonth(endDate.getMonth() + 1)
    ).toLocaleDateString('en-us', { year: 'numeric', month: 'short' })

    var months = []

    /*
     * Note: whether or not we're displaying the year on the chart, we need to include it to make sure data goes in the right spot when the user selects a date range longer than a year
     */
    var tempDate = startDate.toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
    })

    while (tempDate !== endDatePlusOneMonth) {
      months.push(tempDate)
      tempDate = new Date(tempDate)
      tempDate = new Date(
        tempDate.setMonth(tempDate.getMonth() + 1)
      ).toLocaleDateString('en-us', { year: 'numeric', month: 'short' })
    }

    var monthsCount = months.length

    //var observationDatesSize = observationDates.length

    results[teacher.id] = {
      name: tempName,
      line: new Array(monthsCount).fill(0),
      traveling: new Array(monthsCount).fill(0),
      waiting: new Array(monthsCount).fill(0),
      routines: new Array(monthsCount).fill(0),
      behaviorManagement: new Array(monthsCount).fill(0),
      other: new Array(monthsCount).fill(0),
      total: new Array(monthsCount).fill(0),

      lineAverage: new Array(monthsCount).fill(0),
      travelingAverage: new Array(monthsCount).fill(0),
      waitingAverage: new Array(monthsCount).fill(0),
      routinesAverage: new Array(monthsCount).fill(0),
      behaviorManagementAverage: new Array(monthsCount).fill(0),
      otherAverage: new Array(monthsCount).fill(0),

      lineChartLabels: months,

      observationTotalTime: new Array(monthsCount).fill(0),

      transitionTimeAverage: new Array(monthsCount).fill(0),
    }

    console.log("Months => ", months);

    // Sort by date just in case
    data.sort(function(a, b) {
      return new Date(b.startDate.value) - new Date(a.startDate.value)
    })

    // Get number of instances for each type of data
    // rowMonth = startMonth
    var teacherId = teacher.id

    for (var rowIndex in data) {
      var row = data[rowIndex]

      // var rowMonth = new Date(row.startDate.value).getMonth();
      var rowMonth = months.indexOf(
        new Date(row.startDate.value).toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'short',
        })
      )
      console.log("row.startDate.value => ", row.startDate.value);


      //rowMonth = new Date(row.startDate.value).getMonth();
      /*
      rowMonth = months.indexOf(
        new Date(row.startDate.value).toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'short',
        })
      )
      */
      // Add to behavior types
      results[teacherId].line[rowMonth] += row.line

      results[teacherId].traveling[rowMonth] += row.traveling
      results[teacherId].waiting[rowMonth] += row.waiting
      results[teacherId].routines[rowMonth] += row.routines
      results[teacherId].behaviorManagement[rowMonth] += row.behaviorManagement
      results[teacherId].other[rowMonth] += row.other

      // Calculate the total Number of instructions
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

        result.lineAverage[i] =
          result.line[i] > 0
            ? (result.line[i] / tempTotalInstructions).toFixed(2) * 100
            : 0
        result.travelingAverage[i] =
          result.traveling[i] > 0
            ? (result.traveling[i] / tempTotalInstructions).toFixed(2) * 100
            : 0
        result.waitingAverage[i] =
          result.waiting[i] > 0
            ? (result.waiting[i] / tempTotalInstructions).toFixed(2) * 100
            : 0
        result.routinesAverage[i] =
          result.routines[i] > 0
            ? (result.routines[i] / tempTotalInstructions).toFixed(2) * 100
            : 0
        result.behaviorManagementAverage[i] =
          result.behaviorManagement[i] > 0
            ? (result.behaviorManagement[i] / tempTotalInstructions).toFixed(
                2
              ) * 100
            : 0
        result.otherAverage[i] =
          result.other[i] > 0
            ? (result.other[i] / tempTotalInstructions).toFixed(2) * 100
            : 0

        result.transitionTimeAverage[i] =
          result.total[i] > 0
            ? (result.total[i] / result.observationTotalTime[i]).toFixed(2) * 100
            : null

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

    // Get start month and year
    const startMonth = startDate.getMonth()

    const endMonth = endDate.getMonth()

    // Build list of month between start date and end date
    var tempDate = startDate.toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
    })


    // Set the month after the end date, formatted like Nov 21, 2022
    var endDatePlusOneMonth = new Date(
      endDate.setMonth(endDate.getMonth() + 1)
    ).toLocaleDateString('en-us', { year: 'numeric', month: 'short' })
    var months = []

    while (tempDate !== endDatePlusOneMonth) {
      months.push(tempDate)
      tempDate = new Date(tempDate)
      tempDate = new Date(
        tempDate.setMonth(tempDate.getMonth() + 1)
      ).toLocaleDateString('en-us', { year: 'numeric', month: 'short' })
    }

    var monthsCount = months.length

    var tempName = teacher.firstName + ' ' + teacher.lastName

    results[teacher.id] = {
      name: tempName,
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

      lineChartLabels: months,
    }

    // Get number of instances for each type of data
    var prevMonth = 0,
      rowMonth = startMonth

    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = teacher.id

      //rowMonth = months.indexOf(new Date(row.startDate.value).getMonth());
      rowMonth = months.indexOf(
        new Date(row.startDate.value).toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'short',
        })
      )

      // Add to behavior types
      // There's a problem where an extra row is being saved where the behaviorResponse is being saved as a number. No idea why but we have to make sure we don't use that row
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

    var totalIntervals = 0

    // Get start month and year
    const startMonth = startDate.getMonth()

    const endMonth = endDate.getMonth()

    // Add each teacher to the object
    var tempName = teacher.firstName + ' ' + teacher.lastName

    // Get all the dates that had an observation
    var observationDates = [...new Set(data.map(item => item.timestamp))]

    // Sort by date just in case
    // observationDates.sort(function(a,b){
    //   return new Date(a) - new Date(b);
    // });

    var observationDatesFormatted = observationDates.map(o => {
      return new Date(o).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    })

    console.log(
      'Observatoin Dates : ',
      observationDates,
      observationDatesFormatted
    )

    var arraySize = observationDates.length
    console.log(arraySize)

    results[teacher.id] = {
      name: tempName,
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

    var observationDates = [
      ...new Set(
        data.map(item => {
          return item.startDate.value
        })
      ),
    ]



    data.map(i => console.log(i.startDate))
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

    var totalIntervals = 0

    // Get start month and year
    const startMonth = startDate.getMonth()

    const endMonth = endDate.getMonth()

    /*
     * Build list of months between start date and end date
     */
    // Set the month after the end date, formatted like Nov 21, 2022
    var endDatePlusOneMonth = new Date(
      endDate.setMonth(endDate.getMonth() + 1)
    ).toLocaleDateString('en-us', { year: 'numeric', month: 'short' })

    var months = []

    /*
     * Note: whether or not we're displaying the year on the chart, we need to include it to make sure data goes in the right spot when the user selects a date range longer than a year
     */
    var tempDate = startDate.toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
    })

    while (tempDate !== endDatePlusOneMonth) {
      months.push(tempDate)
      tempDate = new Date(tempDate)
      tempDate = new Date(
        tempDate.setMonth(tempDate.getMonth() + 1)
      ).toLocaleDateString('en-us', { year: 'numeric', month: 'short' })
    }

    var monthsCount = months.length

    // Add each teacher to the object
    var tempName = teacher.firstName + ' ' + teacher.lastName

    results[teacher.id] = {
      name: tempName,
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

      lineChartLabels: months,
    }

    // Get number of instances for each type of data
    var tempIntervalData = 0
    //var rowMonth = startMonth;
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = teacher.id

      //var rowMonth = new Date(row.startDate).getMonth();
      var rowMonth = months.indexOf(
        new Date(row.startDate).toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'short',
        })
      )

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
      //results[teacherId].totalInstructions[rowMonth] += row.listening1 + row.listening2 + row.listening3 + row.listening4 + row.listening5 + row.listening6 + row.listening7;
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
            : null
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

    var totalIntervals = 0

    // Get start month and year
    const startMonth = startDate.getMonth()

    const endMonth = endDate.getMonth()

    // Build list of month between start date and end date
    var tempDate = startDate.toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
    })

    // Set the month after the end date, formatted like Nov 21, 2022
    var endDatePlusOneMonth = new Date(
      endDate.setMonth(endDate.getMonth() + 1)
    ).toLocaleDateString('en-us', { year: 'numeric', month: 'short' })
    var months = []
    while (tempDate !== endDatePlusOneMonth) {
      months.push(tempDate)
      tempDate = new Date(tempDate)
      tempDate = new Date(
        tempDate.setMonth(tempDate.getMonth() + 1)
      ).toLocaleDateString('en-us', { year: 'numeric', month: 'short' })
    }

    var monthsCount = months.length

    // Add each teacher to the object
    var tempName = teacher.firstName + ' ' + teacher.lastName

    results[teacher.id] = {
      name: tempName,
      totalInstructions: new Array(monthsCount).fill(0),
      totalTeacherInstructions: new Array(monthsCount).fill(0),
      sequentialActivities: new Array(monthsCount).fill(0),
      drawImages: new Array(monthsCount).fill(0),
      demonstrateSteps: new Array(monthsCount).fill(0),
      actOut: new Array(monthsCount).fill(0),

      notAtCenter: new Array(monthsCount).fill(0),
      noSupport: new Array(monthsCount).fill(0),
      support: new Array(monthsCount).fill(0),

      totalInstructionsAverage: new Array(monthsCount).fill(0),
      sequentialActivitiesAverage: new Array(monthsCount).fill(0),
      drawImagesAverage: new Array(monthsCount).fill(0),
      demonstrateStepsAverage: new Array(monthsCount).fill(0),
      actOutAverage: new Array(monthsCount).fill(0),

      childNonSequentialActivities: new Array(monthsCount).fill(0),
      childNonSequentialActivitiesAverage: new Array(monthsCount).fill(0),

      notAtCenterAverage: new Array(monthsCount).fill(0),
      noSupportAverage: new Array(monthsCount).fill(0),
      supportAverage: new Array(monthsCount).fill(0),

      lineChartLabels: months,
    }

    // Get number of instances for each type of data
    var tempIntervalData = 0
    //var rowMonth = startMonth;
    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = teacher.id

      //var rowMonth = new Date(row.timestamp).getMonth();
      var rowMonth = months.indexOf(
        new Date(row.timestamp).toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'short',
        })
      )

      // Add to total # of intervals
      results[teacherId].totalInstructions[rowMonth] +=
        row.notAtCenter + row.support + row.noSupport
      results[teacherId].totalTeacherInstructions[rowMonth] +=
        row.support + row.noSupport

      // Add to behavior types
      results[teacherId].sequentialActivities[rowMonth] +=
        row.sequentialActivities
      results[teacherId].drawImages[rowMonth] += row.drawImages
      results[teacherId].demonstrateSteps[rowMonth] += row.demonstrateSteps
      results[teacherId].actOut[rowMonth] += row.actOut

      results[teacherId].notAtCenter[rowMonth] += row.notAtCenter
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

        result.sequentialActivitiesAverage[i] =
          result.sequentialActivities[i] > 0
            ? (result.sequentialActivities[i] / tempTotalInstructions).toFixed(
                2
              ) * 100
            : 0
        result.drawImagesAverage[i] =
          result.drawImages[i] > 0
            ? (result.drawImages[i] / tempTotalInstructions).toFixed(2) * 100
            : 0
        result.demonstrateStepsAverage[i] =
          result.demonstrateSteps[i] > 0
            ? (result.demonstrateSteps[i] / tempTotalInstructions).toFixed(2) *
              100
            : 0
        result.actOutAverage[i] =
          result.actOut[i] > 0
            ? (result.actOut[i] / tempTotalInstructions).toFixed(2) * 100
            : 0

        result.notAtCenterAverage[i] =
          result.notAtCenter[i] > 0
            ? (result.notAtCenter[i] / tempTotalInstructions).toFixed(2) * 100
            : 0
        result.supportAverage[i] =
          result.support[i] > 0
            ? (result.support[i] / tempTotalInstructions).toFixed(2) * 100
            : 0
        result.noSupportAverage[i] =
          (result.noSupport[i] > 0 || result.support[i] > 0) && tempTeacherInstructions > 0
            ? (result.noSupport[i] / tempTeacherInstructions).toFixed(2) * 100
            : null

        // If there are any instructions for this month at all, then there will be child data.
        result.childNonSequentialActivitiesAverage[i] =
          tempTotalInstructions > 0
            ? (result.childNonSequentialActivities[i] / tempTotalInstructions).toFixed(2) * 100
            : null
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

    var totalIntervals = 0

    // Get start month and year
    const startMonth = startDate.getMonth()

    const endMonth = endDate.getMonth()

    // Build list of month between start date and end date
    var tempDate = startDate.toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
    })

    // Set the month after the end date, formatted like Nov 21, 2022
    var endDatePlusOneMonth = new Date(
      endDate.setMonth(endDate.getMonth() + 1)
    ).toLocaleDateString('en-us', { year: 'numeric', month: 'short' })
    var months = []
    while (tempDate !== endDatePlusOneMonth) {
      months.push(tempDate)
      tempDate = new Date(tempDate)
      tempDate = new Date(
        tempDate.setMonth(tempDate.getMonth() + 1)
      ).toLocaleDateString('en-us', { year: 'numeric', month: 'short' })
    }

    var monthsCount = months.length

    // Add each teacher to the object
    var tempName = teacher.firstName + ' ' + teacher.lastName

    results[teacher.id] = {
      name: tempName,
      totalIntervals: new Array(monthsCount).fill(0),
      totalChildIntervals: new Array(monthsCount).fill(0),
      totalInstructions: new Array(monthsCount).fill(0),
      phonological: new Array(monthsCount).fill(0),
      alphabetic: new Array(monthsCount).fill(0),
      openEndedQuestions: new Array(monthsCount).fill(0),
      realisticReading: new Array(monthsCount).fill(0),
      multimodalInstruction: new Array(monthsCount).fill(0),
      foundationalSkills: new Array(monthsCount).fill(0),
      childFoundationalSkills: new Array(monthsCount).fill(0),

      phonologicalAverage: new Array(monthsCount).fill(0),
      alphabeticAverage: new Array(monthsCount).fill(0),
      openEndedQuestionsAverage: new Array(monthsCount).fill(0),
      realisticReadingAverage: new Array(monthsCount).fill(0),
      multimodalInstructionAverage: new Array(monthsCount).fill(0),
      foundationalSkillsAverage: new Array(monthsCount).fill(0),
      childEngagedAverage: new Array(monthsCount).fill(0),

      lineChartLabels: months,
    }

    // Sort by date just in case
    data.sort(function(a, b) {
      return new Date(b.GroupDate.value) - new Date(a.GroupDate.value)
    })

    // Get number of instances for each type of data
    var tempIntervalData = 0
    var prevMonth = 0,
      rowMonth = startMonth

    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = teacher.id

      //rowMonth = new Date(row.GroupDate.value).getMonth();
      rowMonth = months.indexOf(
        new Date(row.GroupDate.value).toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'short',
        })
      )

      if(row.isChild)
      {
        results[teacherId].totalChildIntervals[rowMonth]++;

        if(!row.foundational10)
        {
          results[teacherId].childFoundationalSkills[rowMonth]++;
        }
      }
      else
      {

        // Add to total # of intervals
        // results[teacherId].totalIntervals[rowMonth] += row.total;
        results[teacherId].totalIntervals[rowMonth]++

        // Add to behavior types
        // If this observation has a phonal answer.
        if (row.foundational1 || row.foundational2) {
          results[teacherId].phonological[rowMonth]++
        }
        // If this observation has a alphabetic answer
        if (
          row.foundational3 ||
          row.foundational4 ||
          row.foundational5 ||
          row.foundational6 ||
          row.foundational7
        ) {
          results[teacherId].alphabetic[rowMonth]++
        }
        // If this observation has a open ended question
        if (row.foundational8) {
          results[teacherId].openEndedQuestions[rowMonth]++
        }
        // If this observation has a realistic Reading
        if (row.foundational9) {
          results[teacherId].realisticReading[rowMonth]++
        }
        // If this observation has a Multi Modal
        if (row.foundational10) {
          results[teacherId].multimodalInstruction[rowMonth]++
        }
        // If this observation has anything
        if (!row.foundational11) {
          results[teacherId].foundationalSkills[rowMonth]++
        }

        // Calculate the total Number of instructions
        results[teacherId].totalInstructions[rowMonth] +=
          row.foundational1 +
          row.foundational2 +
          row.foundational3 +
          row.foundational4 +
          row.foundational5 +
          row.foundational6 +
          row.foundational7 +
          row.foundational8 +
          row.foundational9 +
          row.foundational10
      }
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      // Go through the months
      for (var i = 0; i < monthsCount; i++) {
        var tempTotalInstructions = result.totalInstructions[i]
        var tempTotalIntervals = result.totalIntervals[i]

        result.phonologicalAverage[i] =
          result.phonological[i] > 0
            ? (result.phonological[i] / tempTotalIntervals).toFixed(2) * 100
            : 0
        result.alphabeticAverage[i] =
          result.alphabetic[i] > 0
            ? (result.alphabetic[i] / tempTotalIntervals).toFixed(2) * 100
            : 0
        result.openEndedQuestionsAverage[i] =
          result.openEndedQuestions[i] > 0
            ? (result.openEndedQuestions[i] / tempTotalIntervals).toFixed(2) *
              100
            : 0
        result.realisticReadingAverage[i] =
          result.realisticReading[i] > 0
            ? (result.realisticReading[i] / tempTotalIntervals).toFixed(2) * 100
            : 0
        result.multimodalInstructionAverage[i] =
          result.multimodalInstruction[i] > 0
            ? (result.multimodalInstruction[i] / tempTotalIntervals).toFixed(
                2
              ) * 100
            : 0

        result.foundationalSkillsAverage[i] =
          result.foundationalSkills[i] > 0
            ? (result.foundationalSkills[i] / tempTotalIntervals).toFixed(2) *
              100
            : null

        result.childEngagedAverage[i] =
          result.childFoundationalSkills[i] > 0
            ? (result.childFoundationalSkills[i] / result.totalChildIntervals[i]).toFixed(2) * 100
            : null
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

    // Get start month and year
    const startMonth = startDate.getMonth()

    const endMonth = endDate.getMonth()

    // Build list of month between start date and end date
    var tempDate = startDate.toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
    })

    // Set the month after the end date, formatted like Nov 21, 2022
    var endDatePlusOneMonth = new Date(
      endDate.setMonth(endDate.getMonth() + 1)
    ).toLocaleDateString('en-us', { year: 'numeric', month: 'short' })
    var months = []
    while (tempDate !== endDatePlusOneMonth) {
      months.push(tempDate)
      tempDate = new Date(tempDate)
      tempDate = new Date(
        tempDate.setMonth(tempDate.getMonth() + 1)
      ).toLocaleDateString('en-us', { year: 'numeric', month: 'short' })
    }

    var monthsCount = months.length

    // Add each teacher to the object
    var tempName = teacher.firstName + ' ' + teacher.lastName

    results[teacher.id] = {
      name: tempName,
      totalIntervals: new Array(monthsCount).fill(0),
      writingSkills: new Array(monthsCount).fill(0),
      meaning: new Array(monthsCount).fill(0),
      printProcesses: new Array(monthsCount).fill(0),

      writingSkillsAverage: new Array(monthsCount).fill(0),
      meaningAverage: new Array(monthsCount).fill(0),
      printProcessesAverage: new Array(monthsCount).fill(0),

      lineChartLabels: months,
    }

    // Sort by date just in case
    data.sort(function(a, b) {
      return new Date(b.GroupDate.value) - new Date(a.GroupDate.value)
    })

    // Get number of instances for each type of data
    var tempIntervalData = 0
    var prevMonth = 0,
      rowMonth = startMonth

    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = teacher.id

      //rowMonth = new Date(row.GroupDate.value).getMonth();
      rowMonth = months.indexOf(
        new Date(row.GroupDate.value).toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'short',
        })
      )

      // Add to total # of intervals
      results[teacherId].totalIntervals[rowMonth]++

      // Add to behavior types
      // Count each observation interval that has a meaning in it.
      if (row.writing1 || row.writing2) {
        results[teacherId].meaning[rowMonth]++
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
        results[teacherId].printProcesses[rowMonth]++
      }

      // Count each observation interval that has anything in it
      if (!row.writing9) {
        results[teacherId].writingSkills[rowMonth]++
      }
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      // Go through the months
      for (var i = 0; i < monthsCount; i++) {
        var tempTotalIntervals = result.totalIntervals[i]

        result.meaningAverage[i] =
          result.meaning[i] > 0
            ? (result.meaning[i] / tempTotalIntervals).toFixed(2) * 100
            : 0
        result.printProcessesAverage[i] =
          result.printProcesses[i] > 0
            ? (result.printProcesses[i] / tempTotalIntervals).toFixed(2) * 100
            : 0

        // THIS ONE ISN'T RIGHT FOR NOW
        result.writingSkillsAverage[i] =
          result.writingSkills[i] > 0
            ? (result.writingSkills[i] / tempTotalIntervals).toFixed(2) * 100
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

      // If there were any vocabanswers in this observation
      /*
      if( row.literacy1 || row.literacy2 || row.literacy3 )
      {
        results[teacherId].vocabFocus[rowMonth]++;
      }
      // If there were any Language Connection answers in this observation
      if( row.literacy4 || row.literacy5 )
      {
        results[teacherId].languageConnections[rowMonth]++;
      }
      // If there were any Children Support answers in this observation
      if( row.literacy6 || row.literacy7 || row.literacy8 )
      {
        results[teacherId].childrenSupport[rowMonth]++;
      }
      // If there were any Fairness Discussion answers in this observation
      if( row.literacy9 )
      {
        results[teacherId].fairnessDiscussions[rowMonth]++;
      }
      // If there were any Fairness Discussion answers in this observation
      if( row.literacy10 )
      {
        results[teacherId].multimodalInstruction[rowMonth]++;
      }
      // If there were any answers in this observation
      if( !row.literacy11 )
      {
        results[teacherId].bookReading[rowMonth]++;
      }
      */
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

    var totalIntervals = 0

    // Get start month and year
    const startMonth = startDate.getMonth()

    const endMonth = endDate.getMonth()

    // Build list of month between start date and end date
    var tempDate = startDate.toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
    })

    // Set the month after the end date, formatted like Nov 21, 2022
    var endDatePlusOneMonth = new Date(
      endDate.setMonth(endDate.getMonth() + 1)
    ).toLocaleDateString('en-us', { year: 'numeric', month: 'short' })
    var months = []
    while (tempDate !== endDatePlusOneMonth) {
      months.push(tempDate)
      tempDate = new Date(tempDate)
      tempDate = new Date(
        tempDate.setMonth(tempDate.getMonth() + 1)
      ).toLocaleDateString('en-us', { year: 'numeric', month: 'short' })
    }

    var monthsCount = months.length

    // Add each teacher to the object
    var tempName = teacher.firstName + ' ' + teacher.lastName

    results[teacher.id] = {
      name: tempName,
      totalIntervals: new Array(monthsCount).fill(0),
      totalInstructions: new Array(monthsCount).fill(0),
      languageEnvironment: new Array(monthsCount).fill(0),
      talk: new Array(monthsCount).fill(0),
      encourageChildren: new Array(monthsCount).fill(0),
      respondChildren: new Array(monthsCount).fill(0),

      languageEnvironmentAverage: new Array(monthsCount).fill(0),
      talkAverage: new Array(monthsCount).fill(0),
      encourageChildrenAverage: new Array(monthsCount).fill(0),
      respondChildrenAverage: new Array(monthsCount).fill(0),

      lineChartLabels: months,
    }

    // Sort by date just in case
    data.sort(function(a, b) {
      return new Date(b.GroupDate.value) - new Date(a.GroupDate.value)
    })

    // Get number of instances for each type of data
    var tempIntervalData = 0
    var prevMonth = 0,
      rowMonth = startMonth

    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = teacher.id

      //rowMonth = new Date(row.GroupDate.value).getMonth();
      rowMonth = months.indexOf(
        new Date(row.GroupDate.value).toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'short',
        })
      )

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
        row.literacy7

      // If there were any "Talk with children about vocabulary or social-emotional topics" in this observation
      if (row.literacy1 || row.literacy2) {
        results[teacherId].talk[rowMonth]++
      }
      // If there were any "Encourage Children to talk" answers in this observation
      if (row.literacy3 || row.literacy4 || row.literacy5) {
        results[teacherId].encourageChildren[rowMonth]++
      }
      // If there were any "Respond to children" answers in this observation
      if (row.literacy6 || row.literacy7 || row.literacy8) {
        results[teacherId].respondChildren[rowMonth]++
      }

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
        var tempTotalInstructions = result.totalInstructions[i]
        var tempTotalIntervals = result.totalIntervals[i]

        result.talkAverage[i] =
          result.talk[i] > 0
            ? (result.talk[i] / tempTotalIntervals).toFixed(2) * 100
            : 0
        result.encourageChildrenAverage[i] =
          result.encourageChildren[i] > 0
            ? (result.encourageChildren[i] / tempTotalIntervals).toFixed(2) *
              100
            : 0
        result.respondChildrenAverage[i] =
          result.respondChildren[i] > 0
            ? (result.respondChildren[i] / tempTotalIntervals).toFixed(2) * 100
            : 0

        result.languageEnvironmentAverage[i] =
          result.languageEnvironment[i] > 0
            ? (result.languageEnvironment[i] / tempTotalIntervals).toFixed(2) *
              100
            : 0
      }
    }

    return results
  }

  /*
   * Language Environment
   */
  calculateACTrends = (data, teacher, startDate, endDate) => {
    // Initialize the array that will hold all the data
    var results = {}

    // Get start month and year
    const startMonth = startDate.getMonth()

    const endMonth = endDate.getMonth()

    // Build list of month between start date and end date
    var tempDate = startDate.toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
    })

    // Set the month after the end date, formatted like Nov 21, 2022
    var endDatePlusOneMonth = new Date(
      endDate.setMonth(endDate.getMonth() + 1)
    ).toLocaleDateString('en-us', { year: 'numeric', month: 'short' })
    var months = []
    while (tempDate !== endDatePlusOneMonth) {
      months.push(tempDate)
      tempDate = new Date(tempDate)
      tempDate = new Date(
        tempDate.setMonth(tempDate.getMonth() + 1)
      ).toLocaleDateString('en-us', { year: 'numeric', month: 'short' })
    }

    var monthsCount = months.length

    // Add each teacher to the object
    var tempName = teacher.firstName + ' ' + teacher.lastName

    results[teacher.id] = {
      name: tempName,
      totalIntervals: new Array(monthsCount).fill(0),
      totalInstructions: new Array(monthsCount).fill(0),

      childrensPlay: new Array(monthsCount).fill(0),
      askingQuestions: new Array(monthsCount).fill(0),
      encouragingChildren: new Array(monthsCount).fill(0),
      helpingChildren: new Array(monthsCount).fill(0),

      support: new Array(monthsCount).fill(0),
      noSupport: new Array(monthsCount).fill(0),
      notAtCenter: new Array(monthsCount).fill(0),

      childrensPlayAverage: new Array(monthsCount).fill(0),
      askingQuestionsAverage: new Array(monthsCount).fill(0),
      encouragingChildrenAverage: new Array(monthsCount).fill(0),
      helpingChildrenAverage: new Array(monthsCount).fill(0),

      supportAverage: new Array(monthsCount).fill(0),
      noSupportAverage: new Array(monthsCount).fill(0),
      notAtCenterAverage: new Array(monthsCount).fill(0),

      lineChartLabels: months,
    }

    // Sort by date just in case
    data.sort(function(a, b) {
      return new Date(b.GroupDate.value) - new Date(a.GroupDate.value)
    })

    // Get number of instances for each type of data
    var tempIntervalData = 0
    var prevMonth = 0,
      rowMonth = startMonth

    for (var rowIndex in data) {
      var row = data[rowIndex]

      var teacherId = teacher.id

      //rowMonth = new Date(row.GroupDate.value).getMonth();
      rowMonth = months.indexOf(
        new Date(row.GroupDate.value).toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'short',
        })
      )

      // Add to total # of intervals
      results[teacherId].totalIntervals[rowMonth] += row.total
      //results[teacherId].totalIntervals[rowMonth]++;

      // Add to behavior types

      // Calculate the total Number of instructions
      results[teacherId].totalInstructions[rowMonth] +=
        row.literacy1 +
        row.literacy2 +
        row.literacy3 +
        row.literacy4 +
        row.literacy5 +
        row.literacy6 +
        row.literacy7

      // If there were any "Participating in children's play" in this observation
      if (row.teacher1) {
        results[teacherId].childrensPlay[rowMonth]++
      }
      // If there were any "Asking questions to extend children's thinking about their shared activity" answers in this observation
      if (row.teacher2) {
        results[teacherId].askingQuestions[rowMonth]++
      }
      // If there were any "Encouraging children to share, work, or interact with each other" answers in this observation
      if (row.teacher3) {
        results[teacherId].encouragingChildren[rowMonth]++
      }
      // If there were any "Encouraging children to share, work, or interact with each other" answers in this observation
      if (row.teacher4) {
        results[teacherId].helpingChildren[rowMonth]++
      }

      // Check for act types
      // If teacher was there
      if (row.peopleType == 3) {
        // Check for support
        if (row.teacher1 || row.teacher2 || row.teacher3 || row.teacher4) {
          results[teacherId].support[rowMonth]++
        }
        // If there was no support
        else {
          results[teacherId].noSupport[rowMonth]++
        }
      }
      // Teacher not there
      else {
        results[teacherId].notAtCenter[rowMonth]++
      }
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for (var resultsIndex in results) {
      var result = results[resultsIndex]

      // Go through the months
      for (var i = 0; i < monthsCount; i++) {
        var tempTotalInstructions = result.totalInstructions[i]
        var tempTotalIntervals = result.totalIntervals[i]

        result.childrensPlayAverage[i] =
          result.childrensPlay[i] > 0
            ? (result.childrensPlay[i] / tempTotalIntervals).toFixed(2) * 100
            : 0
        result.askingQuestionsAverage[i] =
          result.askingQuestions[i] > 0
            ? (result.askingQuestions[i] / tempTotalIntervals).toFixed(2) * 100
            : 0
        result.encouragingChildrenAverage[i] =
          result.encouragingChildren[i] > 0
            ? (result.encouragingChildren[i] / tempTotalIntervals).toFixed(2) *
              100
            : 0
        result.helpingChildrenAverage[i] =
          result.helpingChildren[i] > 0
            ? (result.helpingChildren[i] / tempTotalIntervals).toFixed(2) * 100
            : 0

        result.supportAverage[i] =
          result.support[i] > 0
            ? (result.support[i] / tempTotalIntervals).toFixed(2) * 100
            : 0
        result.noSupportAverage[i] =
          result.noSupport[i] > 0
            ? (result.noSupport[i] / tempTotalIntervals).toFixed(2) * 100
            : 0
        result.notAtCenterAverage[i] =
          result.notAtCenter[i] > 0
            ? (result.notAtCenter[i] / tempTotalIntervals).toFixed(2) * 100
            : 0
      }
    }

    return results
  }
}

export default TrendData
