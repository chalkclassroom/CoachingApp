import { resetWarningCache } from "prop-types";
import { ResourceCardSkeleton } from "../../../views/protected/CoachingResourcesViews/Common";

// Array used to match the name of a practice to the teacher Column name
const teacherColumnArr = {
  "transitionTime": "siteIndex",
  "classroomClimate": "teacher",
  "mathInstruction": "siteIndex",
  "levelOfInstruction": "siteIndex",
  "studentEngagement": "teacher",
  "listeningToChildren": "teacher",
  "sequentialActivities": "siteIndex",
  "foundationSkills": "siteIndex",
  "writing": "teachId",
  "bookReading": "siteIndex",
  "languageEnvironment": "siteIndex",
  "associativeSndCooperative": "siteIndex",
}

class AveragesData {

  constructor() {

  }

  /*
   * Will return an object that holds data for all of the trends data for Book Reading
   */
  calculateTransitionAverage = (data, sites, names) => {
    var results = {};

    // Initialize sites
    for(var siteIndex in sites)
    {

      results[siteIndex] = {
        name: names[siteIndex].name,
        ids: [],
        /*
        total: 0,
        line: 0,
        traveling: 0,
        waiting: 0,
        routines: 0,
        behaviorManagement: 0,
        other: 0,
        */
        //totalTransitionCount: 0,
        totalTransitionTime: 0,
        sessionTotal: 0,
      };

    }



    // Go through each site
    for(var siteIndex in sites)
    {
      // Go through each
      for(var rowIndex in sites[siteIndex])
      {
        var row = sites[siteIndex][rowIndex];

        // Add to behavior types

        /*
        results[siteIndex].line += row.line
        results[siteIndex].traveling += row.traveling
        results[siteIndex].waiting += row.waiting
        results[siteIndex].routines += row.routines
        results[siteIndex].behaviorManagement += row.behaviorManagement
        results[siteIndex].other += row.other
        */


        results[siteIndex]

        // Check to see if we already counted the session total for this observation
        if (!results[siteIndex].ids.includes(row.id)) {
          results[siteIndex].ids.push(row.id)
          results[siteIndex].sessionTotal += row.sessionTotal
        }

        results[siteIndex].totalTransitionTime += row.total

      }
    }

    let programBar = {
      name: 'Program Average',
      total: 0,
      transitionTimeAverageTotal: 0,
      learningActivityAverage: 0,
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for(var resultsIndex in results)
    {
      var result = results[resultsIndex];

      /*
      programBar.sequentialActivities += result.sequentialActivities
      programBar.childNonSequential += result.childNonSequential
      programBar.support += result.support
      programBar.noSupport += result.noSupport
      programBar.totalInstructions += result.totalInstructions
      programBar.totalSupport += result.totalSupport;
      */

      if (result.sessionTotal > 0)
      {
        result.transitionTimeAverage = (result.totalTransitionTime / result.sessionTotal).toFixed(2) * 100;
        result.learningActivityAverage = 100 - result.transitionTimeAverage;

        // Gather data for the programBar
        programBar.transitionTimeAverageTotal += result.transitionTimeAverage
        programBar.total++;
      }
      else
      {
        result.transitionTimeAverage = 0;
        result.learningActivityAverage = 0;
      }

      /*
      result.transitionTimeAverage = result.total > 0
        ? (result.totalTransitionTime / result.total).toFixed(2) * 100
        : 0
      result.learningActivityAverage =
      result.totalTransitionTime > 0 ? 100 - result.transitionTimeAverage : 0
      */


    }

    // Calculate program bar averages
    if(programBar.total > 0 )
    {
      programBar.transitionTimeAverage = Math.round(programBar.transitionTimeAverageTotal / programBar.total);
      programBar.learningActivityAverage = 100 - programBar.transitionTimeAverage;
    }




  results.programBar = programBar

  console.log(results)

  return results;

  }

  /*
   * Classroom Climate
   */
  calculateClimateAverage = (data, sites, names) => {

    // Initialize the array that will hold all the data
    var results = {};

    // Add each teacher to the object
    for(var siteIndex in sites)
    {

      results[siteIndex] = {
        name: names[siteIndex]['name'],
        total: 0,
        nonspecificapproval: 0,
        specificapproval: 0,
        disapproval: 0,
        redirection: 0,
        toneTotal: 0,
        toneCount: 0,
      };

    }

    for(var siteIndex in sites)
    {
      // Get number of instances for each type of data
      for(var rowIndex in sites[siteIndex])
      {
        var row = sites[siteIndex][rowIndex];

        // Add to behavior types
        // There's a problem where an extra row is being saved where the behaviorResponse is being saved as a number. No idea why but we have to make sure we don't use that row
        if (
          row.behaviorResponse === 'nonspecificapproval' ||
          row.behaviorResponse === 'specificapproval' ||
          row.behaviorResponse === 'disapproval' ||
          row.behaviorResponse === 'redirection'
        ) {
          results[siteIndex][row.behaviorResponse] += row.count
          results[siteIndex].total += row.count
        }

        // Get tone rating
        if (row.toneRating !== null) {
          results[siteIndex].toneTotal += row.toneRating
          results[siteIndex].toneCount++
        }
      }
    }

    var programBar = {
      name: 'Program Average',

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
    for(var resultsIndex in results)
    {
      var result = results[resultsIndex];

      var tempTotalInstructions = result.total;

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
      programBar.nonspecificapproval += result.nonspecificapprovalAverage
      programBar.specificapproval += result.specificapprovalAverage
      programBar.disapproval += result.disapprovalAverage
      programBar.redirection += result.redirectionAverage

      programBar.toneCount += result.toneCount
      programBar.toneTotal += result.toneTotal

      programBar.total += result.total

      if(result.total > 0)
      {
        numberOfTeachersWithData++;
      }
    }

    programBar.nonspecificapprovalAverage =
      programBar.nonspecificapproval > 0
        ? Math.round(
            parseFloat(
              (
                programBar.nonspecificapproval / numberOfTeachersWithData
              ).toFixed(2)
            )
          )
        : 0
    programBar.specificapprovalAverage =
      programBar.specificapproval > 0
        ? Math.round(
            parseFloat(
              (programBar.specificapproval / numberOfTeachersWithData).toFixed(
                2
              )
            )
          )
        : 0
    programBar.disapprovalAverage =
      programBar.disapproval > 0
        ? Math.round(
            parseFloat(
              (programBar.disapproval / numberOfTeachersWithData).toFixed(2)
            )
          )
        : 0
    programBar.redirectionAverage =
      programBar.redirection > 0
        ? Math.round(
            parseFloat(
              (programBar.redirection / numberOfTeachersWithData).toFixed(2)
            )
          )
        : 0

    programBar.toneAverage =
      programBar.toneCount > 0
        ? (programBar.toneTotal / programBar.toneCount).toFixed(1)
        : 0

    results.programBar = programBar
    return results;

  }


  /*
   * Math Instructions
   */
  calculateMathAverages = (data, sites, names) => {

    // Initialize the array that will hold all the data
    var results = {};

    var totalIntervals = 0;

    // Add each site to the object
    for(var siteIndex in sites)
    {
      results[siteIndex] = {
        name: names[siteIndex]['name'],
        teacherDenominator: 0,
        childDenominator: 0,
        support: 0,
        noSupport: 0,
        engaged: 0,
        noInteraction: 0,
        totalInstructions: 0
      };
    }

    // Get number of instances for each type of data
    for(var siteIndex in sites)
    {
      for(var rowIndex in sites[siteIndex])
      {
        var row = sites[siteIndex][rowIndex];

        results[siteIndex].totalInstructions++
      if (row.peopletype === 1 || row.peopletype === 2 || row.peopletype === 3) {
        results[siteIndex].engaged += (row.total - row.childOther)
        results[siteIndex].noInteraction += row.childOther
        results[siteIndex].childDenominator += row.total
      }
      if (row.peopletype === 3) {
        results[siteIndex].support += row.support
        results[siteIndex].noSupport += row.noSupport
        results[siteIndex].teacherDenominator += row.support + row.noSupport
      }
      }
    }
    
    let programBar = {
      td: 0,
      cd: 0,
      noSupport: 0,
      noInteraction: 0,
      support: 0,
      engaged: 0
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for(var resultsIndex in results)
    {
      var result = results[resultsIndex];

      if (result.teacherDenominator > 0) {
        result.support = (result.support/result.teacherDenominator) * 100
        result.noSupport = (result.noSupport/result.teacherDenominator) * 100
        programBar.noSupport += result.noSupport
        programBar.support += result.support
        // programBar.td += programBar.noSupport + programBar.support
        programBar.td += result.noSupport + result.support
      } else {
        result.support = 0
        result.noSupport = 0
      }
      if (result.childDenominator > 0) {
        result.engaged = (result.engaged/result.childDenominator) * 100
        result.noInteraction = (result.noInteraction/result.childDenominator) * 100
        programBar.noInteraction += result.noInteraction
        programBar.engaged += result.engaged
        // programBar.cd += programBar.noInteraction + programBar.engaged
        programBar.cd += result.noInteraction + result.engaged
      } else {
        result.engaged = 0
        result.noInteraction = 0
      }
    }

    programBar.noSupport = programBar.td > 0 ? (programBar.noSupport / programBar.td) * 100 : 0
    programBar.support = programBar.td > 0 ? (programBar.support / programBar.td) * 100 : 0
    programBar.noInteraction = programBar.cd > 0 ? (programBar.noInteraction / programBar.cd) * 100 : 0
    programBar.engaged = programBar.td > 0 ? (programBar.engaged / programBar.td) * 100 : 0

    results.programBar = programBar;
    console.log(results)
    return results;
  }



  /*
   * Level of Instructions
   */
  calculateLevelInstructionAverages = (data, sites, names) => {
    console.log(sites, names)
    // Initialize the array that will hold all the data
    var results = {};

    var totalIntervals = 0;

    // Add each teacher to the object
    var tempName = "";
    for(var siteIndex in sites)
    {

      results[siteIndex] = {
        name: names[siteIndex].name,
        totalInstructions: 0,
        hlq: 0,
        hlqResponse: 0,
        llq: 0,
        llqResponse: 0,
      };

    }

    // Get number of instances for each type of data
    for(var siteIndex in sites)
    {
      for(var rowIndex in sites[siteIndex])
      {
        var row = sites[siteIndex][rowIndex];


        // Add to total # of intervals
        results[siteIndex].totalInstructions += row.count;

        // Add to behavior types
        results[siteIndex][row.instructionType] += row.count;
      }
    }

    var programBar = {
      name: 'Program Average',

      total: 0,

      hlq: 0,
      hlqResponse: 0,
      llq: 0,
      llqResponse: 0,
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for(var resultsIndex in results)
    {
      var result = results[resultsIndex];

      var tempTotalInstructions = result.totalInstructions;

      result.hlqAverage = result.hlq > 0 ? (result.hlq / tempTotalInstructions).toFixed(2) * 100 : 0;
      result.hlqResponseAverage = result.hlqResponse > 0 ? (result.hlqResponse / tempTotalInstructions).toFixed(2) * 100 : 0;
      result.llqAverage = result.llq > 0 ? (result.llq / tempTotalInstructions).toFixed(2) * 100 : 0;
      result.llqResponseAverage = result.llqResponse > 0 ? (result.llqResponse / tempTotalInstructions).toFixed(2) * 100 : 0;

      // Gather info for the site bar
      programBar.hlq += result.hlqAverage
      programBar.hlqResponse += result.hlqResponseAverage
      programBar.llq += result.llqAverage
      programBar.llqResponse += result.llqResponseAverage

      programBar.total += result.hlqAverage + result.hlqResponseAverage + result.llqAverage + result.llqResponseAverage
    }

    // Calculate the site bar averages
    programBar.hlqAverage =
      programBar.hlq > 0
        ? parseFloat((programBar.hlq / programBar.total).toFixed(2)) * 100
        : 0
    programBar.hlqResponseAverage =
      programBar.hlqResponse > 0
        ? parseFloat(
              (programBar.hlqResponse / programBar.total).toFixed(2)) * 100
        : 0
    programBar.llqAverage =
      programBar.llq > 0
        ? parseFloat((programBar.llq / programBar.total).toFixed(2)) * 100
        : 0
    programBar.llqResponseAverage =
      programBar.llqResponse > 0
        ? parseFloat(
              (programBar.llqResponse / programBar.total).toFixed(2)) * 100
        : 0

    results.programBar = programBar

    console.log(results)
    return results;

  }


  /*
   * Student Engagement
   */
  calculateStudentEngagementAverages = (data, sites, names) => {

    // Initialize the array that will hold all the data
    var results = {};

    var totalIntervals = 0;

    // Add each teacher to the object
    for(var siteIndex in sites)
    {

      results[siteIndex] = {
        name: names[siteIndex]['name'],
        totalInstructions: 0,
        offTask: 0,
        mildlyEngaged: 0,
        engaged: 0,
        highlyEngaged: 0,
        totalPoints: 0
      };

    }

    // Get number of instances for each type of data
    for(var siteIndex in sites)
    {
      for(var rowIndex in sites[siteIndex])
      {
        var row = sites[siteIndex][rowIndex];

        // Add to behavior types
        switch (row.point) {
          case 0:
            results[siteIndex].offTask += row.count;
            break;
          case 1:
            results[siteIndex].mildlyEngaged += row.count;
            break;
          case 2:
            results[siteIndex].engaged += row.count;
            break;
          case 3:
            results[siteIndex].highlyEngaged += row.count;
            break;
          default:
            break;
        }

        results[siteIndex].totalPoints += row.point * row.count

        // Calculate the total Number of instructions
        results[siteIndex].totalInstructions += row.count;
      }
    }

    var programBar = {
      name: 'Program Average',

      total: 0,

      totalPoints: 0,

      totalInstructions: 0
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for(var resultsIndex in results)
    {
      var result = results[resultsIndex];

      var tempTotalInstructions = result.totalInstructions;

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

    programBar.totalPoints += result.totalPoints
    programBar.totalInstructions += result.totalInstructions
  }

    programBar.totalPointsAverage =
      programBar.totalPoints > 0
        ? (programBar.totalPoints / programBar.totalInstructions).toFixed(2)
        : 0

    results.programBar = programBar
    return results;

  }



  /*
   * Listening To Children
   */
  calculateListeningToChildrenAverages = (data, sites, names) => {

    // Initialize the array that will hold all the data
    var results = {};

    var totalIntervals = 0;

    // Add each teacher to the object
    for(var siteIndex in sites)
    {

      results[siteIndex] = {
        name: names[siteIndex]['name'],
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
      };

    }

    // Get number of instances for each type of data
    for(var siteIndex in sites)
    {
      for(var rowIndex in sites[siteIndex])
      {
        var row = sites[siteIndex][rowIndex];

        // Add to behavior types
        results[siteIndex].eyeLevel += row.listening1;
        results[siteIndex].positiveExpression += row.listening2;
        results[siteIndex].repeats += row.listening3;
        results[siteIndex].openEndedQuestions += row.listening4;
        results[siteIndex].extendsPlay += row.listening5;
        results[siteIndex].encouragesPeerTalk += row.listening6;

        results[siteIndex].noBehaviors += row.listening7;
        results[siteIndex].encouraging += row.count - row.listening7;

        // Calculate the total Number of instructions
        results[siteIndex].totalInstructions += row.listening1 + row.listening2 + row.listening3 + row.listening4 + row.listening5 + row.listening6 + row.listening7;

        results[siteIndex].totalObserved += row.count;
      }
    }


    let programBar = {
      name: "Program Average",
      nb: 0,
      e: 0,
      t: 0
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for(var resultsIndex in results)
    {
      var result = results[resultsIndex];

      var tempTotalInstructions = result.totalInstructions;
      var tempTotalObserved = result.totalObserved;

      result.eyeLevelAverage = result.eyeLevel > 0 ? (result.eyeLevel / tempTotalObserved).toFixed(2) * 100 : 0;
      result.positiveExpressionAverage = result.positiveExpression > 0 ? (result.positiveExpression / tempTotalObserved).toFixed(2) * 100 : 0;
      result.repeatsAverage = result.repeats > 0 ? (result.repeats / tempTotalObserved).toFixed(2) * 100 : 0;
      result.openEndedQuestionsAverage = result.openEndedQuestions > 0 ? (result.openEndedQuestions / tempTotalObserved).toFixed(2) * 100 : 0;
      result.extendsPlayAverage = result.extendsPlay > 0 ? (result.extendsPlay / tempTotalObserved).toFixed(2) * 100 : 0;
      result.encouragesPeerTalkAverage = result.encouragesPeerTalk > 0 ? (result.encouragesPeerTalk / tempTotalObserved).toFixed(2) * 100 : 0;

      result.noBehaviorsAverage = tempTotalObserved > 0 ? (result.noBehaviors / tempTotalObserved).toFixed(2) * 100 : 0;
      result.encouragingAverage = tempTotalObserved > 0 ? (result.encouraging / tempTotalObserved).toFixed(2) * 100 : 0;

      programBar.nb += result.noBehaviorsAverage
      programBar.e += result.encouragingAverage
      programBar.t += result.noBehaviorsAverage + result.encouragingAverage

    }

    programBar.nb = programBar.t > 0 ? (programBar.nb / programBar.t) * 100 : 0
    programBar.e = programBar.t > 0 ? (programBar.e / programBar.t) * 100 : 0


    results.programBar = programBar
    console.log(results)
    return results;

  }



    /*
     * Sequential Activities
     */
    calculateSequentialActivitiesAverages = (data, sites, names) => {

      // Initialize the array that will hold all the data
      var results = {};

      var totalIntervals = 0;

      // Add each teacher to the object
      for(var siteIndex in sites)
      {

        results[siteIndex] = {
          name: names[siteIndex].name,
          engaged: 0,
          noInteraction: 0,
          noSupport: 0,
          support: 0,
          childDenominator: 0,
          teacherDenominator: 0
        };

      }

        for(var siteIndex in sites)
      {
        for(var rowIndex in sites[siteIndex])
        {
          var row = sites[siteIndex][rowIndex];
          if (row.peopletype === 1 || row.peopletype === 2 || row.peopletype === 3) {
            results[siteIndex].engaged += (row.total - row.childNonSequential)
            results[siteIndex].noInteraction += row.childNonSequential
            results[siteIndex].childDenominator += row.total
          }
          if (row.peopletype === 3) {
            results[siteIndex].support += row.support
            results[siteIndex].noSupport += row.noSupport
            results[siteIndex].teacherDenominator += row.support + row.noSupport
          }
        }
      }

      let programBar = {
        name: 'Program Average',
        engaged: 0,
        noInteraction: 0,
        noSupport: 0,
        support: 0,
        childDenominator: 0,
        teacherDenominator: 0
      }

      // Calculate the averages in percentages
      // Go through each teacher
      for(var resultsIndex in results)
      {
        var result = results[resultsIndex];
        
        if (result.teacherDenominator > 0) {
          result.support = result.support/result.teacherDenominator * 100
          result.noSupport = result.noSupport/result.teacherDenominator * 100
          programBar.support += result.support;
          programBar.noSupport += result.noSupport;
          programBar.teacherDenominator += result.support + result.noSupport;
        } else {
          result.support = 0
          result.noSupport = 0
        }
        if (result.childDenominator > 0) {
          result.engaged = result.engaged/result.childDenominator * 100
          result.noInteraction = result.noInteraction/result.childDenominator * 100
          programBar.engaged += result.engaged;
          programBar.noInteraction += result.noInteraction;
          programBar.childDenominator += result.engaged + result.noInteraction;
        } else {
          result.engaged = 0
          result.noInteraction = 0
        }
      }

      programBar.noSupport = programBar.teacherDenominator > 0 ? programBar.noSupport / programBar.teacherDenominator * 100 : 0
      programBar.support = programBar.teacherDenominator > 0 ? programBar.support / programBar.teacherDenominator * 100 : 0

      programBar.noInteraction = programBar.childDenominator > 0 ? programBar.noInteraction / programBar.childDenominator * 100 : 0
      programBar.engaged = programBar.childDenominator > 0 ? programBar.engaged / programBar.childDenominator * 100 : 0

  

    results.programBar = programBar

    console.log(results)

    return results;

    }



  /*
  * Foundational Skills
  */
  calculateFoundationalSkillsAverages = (data, sites, names) => {
    let results = {};
    for (let siteIndex in sites) {
        results[siteIndex] = {
        name: names[siteIndex].name,
        totalIntervals: 0,
        totalInstruction: 0,
        noBehaviors: 0
      };
    }

    let programBar = {
      name: "Program Average",
      total: 0,
      totalInstruction: 0,
      noBehaviors: 0,
    }

    console.log(data)

    for (let siteIndex in sites) {
      for (let rowIndex in sites[siteIndex]) {
        let row = sites[siteIndex][rowIndex];

        results[siteIndex].totalIntervals++;
        if (row.foundational11) {
          results[siteIndex].noBehaviors++;
        } else {
          results[siteIndex].totalInstruction++;
        }
      }
    }

    for (let resultsIndex in results) {
      let result = results[resultsIndex];

      result.totalInstruction = result.totalIntervals > 0 ? (result.totalInstruction / result.totalIntervals).toFixed(2) * 100 : 0;
      result.noBehaviors = result.totalIntervals > 0 ? (result.noBehaviors / result.totalIntervals).toFixed(2) * 100 : 0;

      programBar.totalInstruction += result.totalInstruction;
      programBar.noBehaviors += result.noBehaviors;
      programBar.total += result.totalInstruction + result.noBehaviors;
    }

    programBar.totalInstruction = programBar.total > 0 ? parseFloat((programBar.totalInstruction / programBar.total).toFixed(2)) * 100 : 0;
    programBar.noBehaviors = programBar.total > 0 ? parseFloat((programBar.noBehaviors / programBar.total).toFixed(2)) * 100 : 0;
    results.programBar = programBar;

    return results;

  }



  /*
  * Writing
  */
  calculateWritingSkillsAverages = (data, sites, names) => {
    let results = {};
    for (let siteIndex in sites) {
        results[siteIndex] = {
        name: names[siteIndex].name,
        totalIntervals: 0,
        totalInstruction: 0,
        noBehaviors: 0
      };
    }

    let programBar = {
      name: "Program Average",
      total: 0,
      totalInstruction: 0,
      noBehaviors: 0,
    }

    console.log(data)

    for (let siteIndex in sites) {
      for (let rowIndex in sites[siteIndex]) {
        let row = sites[siteIndex][rowIndex];

        results[siteIndex].totalIntervals++;
        if (row.writing9) {
          results[siteIndex].noBehaviors++;
        } else {
          results[siteIndex].totalInstruction++;
        }
      }
    }

    for (let resultsIndex in results) {
      let result = results[resultsIndex];

      result.totalInstruction = result.totalIntervals > 0 ? (result.totalInstruction / result.totalIntervals).toFixed(2) * 100 : 0;
      result.noBehaviors = result.totalIntervals > 0 ? (result.noBehaviors / result.totalIntervals).toFixed(2) * 100 : 0;

      programBar.totalInstruction += result.totalInstruction;
      programBar.noBehaviors += result.noBehaviors;
      programBar.total += result.totalInstruction + result.noBehaviors;
    }

    programBar.totalInstruction = programBar.total > 0 ? parseFloat((programBar.totalInstruction / programBar.total).toFixed(2)) * 100 : 0;
    programBar.noBehaviors = programBar.total > 0 ? parseFloat((programBar.noBehaviors / programBar.total).toFixed(2)) * 100 : 0;
    results.programBar = programBar;

    return results;
  }



  /*
   * Book Reading
   */
  calculateBookReadingAverages = (data, sites, names) => {
    let results = {};
    for (let siteIndex in sites) {
        results[siteIndex] = {
        name: names[siteIndex].name,
        totalIntervals: 0,
        totalInstruction: 0,
        noBehaviors: 0
      };
    }

    let programBar = {
      name: "Program Average",
      total: 0,
      totalInstruction: 0,
      noBehaviors: 0,
    }

    console.log(data)

    for (let siteIndex in sites) {
      for (let rowIndex in sites[siteIndex]) {
        let row = sites[siteIndex][rowIndex];

        results[siteIndex].totalIntervals++;
        if (row.literacy11) {
          results[siteIndex].noBehaviors++;
        } else {
          results[siteIndex].totalInstruction++;
        }
      }
    }

    for (let resultsIndex in results) {
      let result = results[resultsIndex];

      result.totalInstruction = result.totalIntervals > 0 ? (result.totalInstruction / result.totalIntervals).toFixed(2) * 100 : 0;
      result.noBehaviors = result.totalIntervals > 0 ? (result.noBehaviors / result.totalIntervals).toFixed(2) * 100 : 0;

      programBar.totalInstruction += result.totalInstruction;
      programBar.noBehaviors += result.noBehaviors;
      programBar.total += result.totalInstruction + result.noBehaviors;
    }

    programBar.totalInstruction = programBar.total > 0 ? parseFloat((programBar.totalInstruction / programBar.total).toFixed(2)) * 100 : 0;
    programBar.noBehaviors = programBar.total > 0 ? parseFloat((programBar.noBehaviors / programBar.total).toFixed(2)) * 100 : 0;
    results.programBar = programBar;

    return results;
  }



  /*
   * Language Environment
   */
  calculateLanguageEnvironmentAverages = (data, sites, names) => {
    let results = {};
    for (let siteIndex in sites) {
        results[siteIndex] = {
        name: names[siteIndex].name,
        totalIntervals: 0,
        totalInstruction: 0,
        noBehaviors: 0
      };
    }

    let programBar = {
      name: "Program Average",
      total: 0,
      totalInstruction: 0,
      noBehaviors: 0,
    }

    console.log(data)

    for (let siteIndex in sites) {
      for (let rowIndex in sites[siteIndex]) {
        let row = sites[siteIndex][rowIndex];

        results[siteIndex].totalIntervals++;
        if (row.literacy9) {
          results[siteIndex].noBehaviors++;
        } else {
          results[siteIndex].totalInstruction++;
        }
      }
    }

    for (let resultsIndex in results) {
      let result = results[resultsIndex];

      result.totalInstruction = result.totalIntervals > 0 ? (result.totalInstruction / result.totalIntervals).toFixed(2) * 100 : 0;
      result.noBehaviors = result.totalIntervals > 0 ? (result.noBehaviors / result.totalIntervals).toFixed(2) * 100 : 0;

      programBar.totalInstruction += result.totalInstruction;
      programBar.noBehaviors += result.noBehaviors;
      programBar.total += result.totalInstruction + result.noBehaviors;
    }


    programBar.totalInstruction = programBar.total > 0 ? parseFloat((programBar.totalInstruction / programBar.total).toFixed(2)) * 100 : 0;
    programBar.noBehaviors = programBar.total > 0 ? parseFloat((programBar.noBehaviors / programBar.total).toFixed(2)) * 100 : 0;
    results.programBar = programBar;

    return results;
  }


  /*
   * Associative Cooperative
   */
  calculateACAverages = (data, sites, names) => {

    // Initialize the array that will hold all the data
    var results = {};

    var totalIntervals = 0;

    // Add each teacher to the object
    for(var siteIndex in sites)
    {

      results[siteIndex] = {
        name: names[siteIndex]['name'],
        teacherDenominator: 0,
        childDenominator: 0,
        support: 0,
        noSupport: 0,
        engaged: 0,
        noInteraction: 0,
        totalInstructions: 0
      };

    }

    // Get number of instances for each type of data
    for(var siteIndex in sites)
    {
      for(var rowIndex in sites[siteIndex])
      {
        var row = sites[siteIndex][rowIndex];
        results[siteIndex].totalInstructions++
        if (row.peopleType === 2 || row.peopleType === 3) {
          if (row.child1 || row.child2 || row.child3 || row.child4) {
            results[siteIndex].engaged++
          } else if (row.child1 === 0 && row.child2 === 0 && row.child3 === 0 && row.child4 === 0) {
            results[siteIndex].noInteraction++
          }
          results[siteIndex].childDenominator++
        }
        if (row.peopleType === 3) {
          if (row.teacher1 || row.teacher2 || row.teacher3 || row.teacher4) {
            results[siteIndex].support++
          } else if (row.teacher1 === 0 && row.teacher2 === 0 && row.teacher3 === 0 && row.teacher4 === 0) {
            results[siteIndex].noSupport++
          }
          results[siteIndex].teacherDenominator++
        }
      }
    }

    let pb = {
      name: "Program Average",
      cd: 0,
      td: 0,
      ni: 0,
      e: 0,
      ns: 0,
      s: 0
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for(var resultsIndex in results)
    {

      var result = results[resultsIndex];

      if (result.teacherDenominator > 0) {
        result.support = result.support/result.teacherDenominator * 100
        result.noSupport = result.noSupport/result.teacherDenominator * 100
        pb.ns += result.noSupport;
        pb.s += result.support;
        pb.td += result.noSupport + result.support;
      } else {
        result.support = 0
        result.noSupport = 0
      }
      if (result.childDenominator > 0) {
        result.engaged = result.engaged/result.childDenominator * 100
        result.noInteraction = result.noInteraction/result.childDenominator * 100
        pb.ni += result.noInteraction;
        pb.e += result.engaged
        pb.cd += result.noInteraction + result.engaged;
      } else {
        result.engaged = 0
        result.noInteraction = 0
      }

    }
    
    pb.ni = pb.cd > 0 ? (pb.ni/pb.cd) * 100 : 0
    pb.ns = pb.td > 0 ? (pb.ns/pb.td) * 100 : 0
    pb.e = pb.cd > 0 ? (pb.e/pb.cd) * 100 : 0
    pb.s = pb.td > 0 ? (pb.s/pb.td) * 100 : 0


    results.pb = pb
    return results;
  }



}


export default AveragesData;
