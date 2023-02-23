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
        startDate: [],
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
      if (!results[teacherId].startDate.includes(row.sessionStart)) {
        results[teacherId].startDate.push(row.sessionStart)
        results[teacherId].total += row.sessionTotal
      }

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

    for (let teacherIndex in teachers) {
      results[teachers[teacherIndex].id] = {
        name: `${teachers[teacherIndex]. firstName} ${teachers[teacherIndex].lastName}`,
        teacherDenominator: 0,
        childDenominator: 0,
        support: 0,
        noSupport: 0,
        engaged: 0,
        noInteraction: 0,
        totalInstructions: 0
      }
    }

    for (let rowIndex in data) {
      let row = data[rowIndex]
      let teacherId = row.teacher.split('/')[2]
      results[teacherId].totalInstructions++
      if (row.peopletype === 2 || row.peopletype === 3) {
        results[teacherId].engaged += Math.max(row.counting, row.shapes, row.patterns, row.measurement)
        results[teacherId].noInteraction += row.childOther
        results[teacherId].childDenominator += Math.max(row.counting, row.shapes, row.patterns, row.measurement) + row.childOther
      }
      if (row.peopletype === 3) {
        results[teacherId].support += row.support
        results[teacherId].noSupport += row.noSupport
        results[teacherId].teacherDenominator += row.support + row.noSupport
      }
    }

    for (let resultsIndex in results) {
      let result = results[resultsIndex]
      
      if (result.teacherDenominator > 0) {
        result.support = result.support/result.teacherDenominator * 100
        result.noSupport = result.noSupport/result.teacherDenominator * 100
      } else {
        result.support = 0
        result.noSupport = 0
      }
      if (result.childDenominator > 0) {
        result.engaged = result.engaged/result.childDenominator * 100
        result.noInteraction = result.noInteraction/result.childDenominator * 100
      } else {
        result.engaged = 0
        result.noInteraction = 0
      }
    }
    console.log(results)
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

      result.highLevel = tempTotalInstructions > 0 ? ((result.hlq + result.hlqResponse) / tempTotalInstructions) * 100 : 0

      result.llqAverage =
        result.llq > 0
          ? (result.llq / tempTotalInstructions).toFixed(2) * 100
          : 0
      result.llqResponseAverage =
        result.llqResponse > 0
          ? (result.llqResponse / tempTotalInstructions).toFixed(2) * 100
          : 0

      result.lowLevel = tempTotalInstructions > 0 ? ((result.llq + result.llqResponse) / tempTotalInstructions) : 0

      // Gather info for the site bar
      siteBar.hlq += result.hlq
      siteBar.hlqResponse += result.hlqResponse
      siteBar.llq += result.llq
      siteBar.llqResponse += result.llqResponse

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

    siteBar.highLevel = siteBar.total > 0 ? ((siteBar.hlq + siteBar.hlqResponse) / siteBar.total) * 100 : 0
    
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

    siteBar.lowLevel = siteBar.total > 0 ? ((siteBar.llq + siteBar.llqResponse) / siteBar.total) : 0
    

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

    for (let teacherIndex in teachers) {
      results[teachers[teacherIndex].id] = {
        name: `${teachers[teacherIndex]. firstName} ${teachers[teacherIndex].lastName}`,
        teacherDenominator: 0,
        childDenominator: 0,
        support: 0,
        noSupport: 0,
        engaged: 0,
        noInteraction: 0,
        totalInstructions: 0
      }
    }

    for (let rowIndex in data) {
      let row = data[rowIndex]
      let teacherId = row.teacher.split('/')[2]
      results[teacherId].totalInstructions++
      if (row.peopletype === 1 || row.peopletype === 2 || row.peopletype === 3) {
        results[teacherId].engaged += (row.total - row.childNonSequential)
        results[teacherId].noInteraction += row.childNonSequential
        results[teacherId].childDenominator += row.total
      }
      if (row.peopletype === 3) {
        results[teacherId].support += row.support
        results[teacherId].noSupport += row.noSupport
        results[teacherId].teacherDenominator += row.support + row.noSupport
      }
    }

    let siteBar = {
      name: "Site Average",
      teacherDenominator: 0,
      childDenominator: 0,
      support: 0,
      noSupport: 0,
      engaged: 0,
      noInteraction: 0,
      totalInstructions: 0
    }

    for (let resultsIndex in results) {
      let result = results[resultsIndex]

      siteBar.support += result.support;
      siteBar.noSupport += result.noSupport;
      siteBar.engaged += result.engaged;
      siteBar.noInteraction += result.noInteraction;
      siteBar.teacherDenominator += result.teacherDenominator;
      siteBar.childDenominator += result.childDenominator;
      
      if (result.teacherDenominator > 0) {
        result.support = result.support/result.teacherDenominator * 100
        result.noSupport = result.noSupport/result.teacherDenominator * 100
      } else {
        result.support = 0
        result.noSupport = 0
      }
      if (result.childDenominator > 0) {
        result.engaged = result.engaged/result.childDenominator * 100
        result.noInteraction = result.noInteraction/result.childDenominator * 100
      } else {
        result.engaged = 0
        result.noInteraction = 0
      }
    }

    siteBar.noSupport = siteBar.teacherDenominator > 0 ? siteBar.noSupport / siteBar.teacherDenominator * 100 : 0
    siteBar.noInteraction = siteBar.childDenominator > 0 ? siteBar.noInteraction / siteBar.childDenominator * 100 : 0
    
    results.siteBar = siteBar
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
    console.log(data)
    var results = {}

    for (let teacherIndex in teachers) {
      results[teachers[teacherIndex].id] = {
        name: `${teachers[teacherIndex]. firstName} ${teachers[teacherIndex].lastName}`,
        teacherDenominator: 0,
        childDenominator: 0,
        support: 0,
        noSupport: 0,
        engaged: 0,
        noInteraction: 0,
        totalInstructions: 0
      }
    }

    for (let rowIndex in data) {
      let row = data[rowIndex]
      let teacherId = row.teacher.split('/')[2]
      results[teacherId].totalInstructions++
      if (row.peopleType === 2 || row.peopleType === 3) {
        if (row.child1 || row.child2 || row.child3 || row.child4) {
          results[teacherId].engaged++
        } else if (row.child1 === 0 && row.child2 === 0 && row.child3 === 0 && row.child4 === 0) {
          results[teacherId].noInteraction++
        }
        results[teacherId].childDenominator++
      }
      if (row.peopleType === 3) {
        if (row.teacher1 || row.teacher2 || row.teacher3 || row.teacher4) {
          results[teacherId].support++
        } else if (row.teacher1 === 0 && row.teacher2 === 0 && row.teacher3 === 0 && row.teacher4 === 0) {
          results[teacherId].noSupport++
        }
        results[teacherId].teacherDenominator++
      }
    }

    for (let resultsIndex in results) {
      let result = results[resultsIndex]
      
      if (result.teacherDenominator > 0) {
        result.support = result.support/result.teacherDenominator * 100
        result.noSupport = result.noSupport/result.teacherDenominator * 100
      } else {
        result.support = 0
        result.noSupport = 0
      }
      if (result.childDenominator > 0) {
        result.engaged = result.engaged/result.childDenominator * 100
        result.noInteraction = result.noInteraction/result.childDenominator * 100
      } else {
        result.engaged = 0
        result.noInteraction = 0
      }
    }
    
    return results
  }
}

export default AveragesData
