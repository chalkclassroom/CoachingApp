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
  calculateTransitionAverage = (data, sites) => {

    // Initialize the array that will hold all the data
    var results = {};

    // Add each site to the object
    for(var siteIndex in sites)
    {

      results[siteIndex] = {
        name: "",
        total: 0,
        line: 0,
        traveling: 0,
        waiting: 0,
        routines: 0,
        behaviorManagement: 0,
        other: 0,
      };

    }

    // Get number of instances for each type of data
    for(var siteIndex in sites)
    {
      for(var rowIndex in data)
      {
        var row = data[rowIndex];

        // Add to behavior types
        results[siteIndex].line +=  row.line;
        results[siteIndex].traveling += row.traveling;
        results[siteIndex].waiting += row.waiting;
        results[siteIndex].routines += row.routines;
        results[siteIndex].behaviorManagement += row.behaviorManagement;
        results[siteIndex].other += row.other;

        // Calculate the total Number of instructions
        results[siteIndex].total += row.total;
      }
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for(var resultsIndex in results)
    {
      var result = results[resultsIndex];

      var tempTotalInstructions = result.total;

      result.lineAverage = result.line > 0 ? (result.line / tempTotalInstructions).toFixed(2) * 100 : 0;
      result.travelingAverage = result.traveling > 0 ? (result.traveling / tempTotalInstructions).toFixed(2) * 100 : 0;
      result.waitingAverage = result.waiting > 0 ? (result.waiting / tempTotalInstructions).toFixed(2) * 100 : 0;
      result.routinesAverage = result.routines > 0 ? (result.routines / tempTotalInstructions).toFixed(2) * 100 : 0;
      result.behaviorManagementAverage = result.behaviorManagement > 0 ? (result.behaviorManagement / tempTotalInstructions).toFixed(2) * 100 : 0;
      result.otherAverage = result.other > 0 ? (result.other / tempTotalInstructions).toFixed(2) * 100 : 0;
    }

    return results;

  }

  /*
   * Classroom Climate
   */
  calculateClimateAverage = (data, sites) => {

    // Initialize the array that will hold all the data
    var results = {};

    // Add each teacher to the object
    for(var siteIndex in sites)
    {

      results[siteIndex] = {
        name: "",
        total: 0,
        nonspecificapproval: 0,
        specificapproval: 0,
        disapproval: 0,
        redirection: 0,
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
        if(row.behaviorResponse === "nonspecificapproval" || row.behaviorResponse === "specificapproval" || row.behaviorResponse === "disapproval" || row.behaviorResponse === "redirection")
        {
          results[siteIndex][row.behaviorResponse] +=  row.count;
          results[siteIndex].total += row.count;
        }

      }
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for(var resultsIndex in results)
    {
      var result = results[resultsIndex];

      var tempTotalInstructions = result.total;

      result.nonspecificapprovalAverage = result.nonspecificapproval > 0 ? (result.nonspecificapproval / tempTotalInstructions).toFixed(2) * 100 : 0;
      result.specificapprovalAverage = result.specificapproval > 0 ? (result.specificapproval / tempTotalInstructions).toFixed(2) * 100 : 0;
      result.disapprovalAverage = result.disapproval > 0 ? (result.disapproval / tempTotalInstructions).toFixed(2) * 100 : 0;
      result.redirectionAverage = result.redirection > 0 ? (result.redirection / tempTotalInstructions).toFixed(2) * 100 : 0;
    }

    return results;

  }


  /*
   * Math Instructions
   */
  calculateMathAverages = (data, sites) => {

    // Initialize the array that will hold all the data
    var results = {};

    var totalIntervals = 0;

    // Add each site to the object
    for(var siteIndex in sites)
    {

      results[siteIndex] = {
        name: "",
        totalInstructions: 0,
        mathVocabulary: 0,
        askingQuestions: 0,
        mathConcepts: 0,
        helpingChildren: 0,
        notAtCenter: 0,
        noSupport: 0,
        support: 0
      };

    }

    // Get number of instances for each type of data
    for(var siteIndex in sites)
    {
      for(var rowIndex in data)
      {
        var row = data[rowIndex];

        // Add to behavior types
        results[siteIndex].mathVocabulary += row.mathVocabulary;
        results[siteIndex].askingQuestions += row.askingQuestions;
        results[siteIndex].mathConcepts += row.mathConcepts;
        results[siteIndex].helpingChildren += row.helpingChildren;

        results[siteIndex].notAtCenter += row.noOpportunity;
        results[siteIndex].support += row.support;
        results[siteIndex].noSupport += row.noSupport;

        // Calculate the total Number of instructions
        results[siteIndex].totalInstructions += row.noSupport + row.noOpportunity + row.support;
      }
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for(var resultsIndex in results)
    {
      var result = results[resultsIndex];

      var tempTotalInstructions = result.totalInstructions;

      result.mathVocabularyAverage = result.mathVocabulary > 0 ? (result.mathVocabulary / tempTotalInstructions).toFixed(2) * 100 : 0;
      result.askingQuestionsAverage = result.askingQuestions > 0 ? (result.askingQuestions / tempTotalInstructions).toFixed(2) * 100 : 0;
      result.mathConceptsAverage = result.mathConcepts > 0 ? (result.mathConcepts / tempTotalInstructions).toFixed(2) * 100 : 0;
      result.helpingChildrenAverage = result.helpingChildren > 0 ? (result.helpingChildren / tempTotalInstructions).toFixed(2) * 100 : 0;

      result.notAtCenterAverage = result.notAtCenter > 0 ? (result.notAtCenter / tempTotalInstructions).toFixed(2) * 100 : 0;
      result.supportAverage = result.support > 0 ? (result.support / tempTotalInstructions).toFixed(2) * 100 : 0;
      result.noSupportAverage = result.noSupport > 0 ? (result.noSupport / tempTotalInstructions).toFixed(2) * 100 : 0;

    }

    return results;

  }



  /*
   * Level of Instructions
   */
  calculateLevelInstructionAverages = (data, sites) => {

    // Initialize the array that will hold all the data
    var results = {};

    var totalIntervals = 0;

    // Add each teacher to the object
    var tempName = "";
    for(var siteIndex in sites)
    {

      results[siteIndex] = {
        name: "",
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
      for(var rowIndex in data)
      {
        var row = data[rowIndex];


        // Add to total # of intervals
        results[siteIndex].totalInstructions += row.count;

        // Add to behavior types
        results[siteIndex][row.instructionType] += row.count;
      }
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
    }

    return results;

  }


  /*
   * Student Engagement
   */
  calculateStudentEngagementAverages = (data, sites) => {

    // Initialize the array that will hold all the data
    var results = {};

    var totalIntervals = 0;

    // Add each teacher to the object
    for(var siteIndex in sites)
    {

      results[siteIndex] = {
        name: "",
        totalInstructions: 0,
        offTask: 0,
        mildlyEngaged: 0,
        engaged: 0,
        highlyEngaged: 0,
      };

    }

    // Get number of instances for each type of data
    for(var siteIndex in sites)
    {
      for(var rowIndex in data)
      {
        var row = data[rowIndex];

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

        // Calculate the total Number of instructions
        results[siteIndex].totalInstructions += row.count;
      }
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for(var resultsIndex in results)
    {
      var result = results[resultsIndex];

      var tempTotalInstructions = result.totalInstructions;

      result.offTaskAverage = result.offTask > 0 ? (result.offTask / tempTotalInstructions).toFixed(2) * 100 : 0;
      result.mildlyEngagedAverage = result.mildlyEngaged > 0 ? (result.mildlyEngaged / tempTotalInstructions).toFixed(2) * 100 : 0;
      result.engagedAverage = result.engaged > 0 ? (result.engaged / tempTotalInstructions).toFixed(2) * 100 : 0;
      result.highlyEngagedAverage = result.highlyEngaged > 0 ? (result.highlyEngaged / tempTotalInstructions).toFixed(2) * 100 : 0;

    }

    return results;

  }



  /*
   * Listening To Children
   */
  calculateListeningToChildrenAverages = (data, sites) => {

    // Initialize the array that will hold all the data
    var results = {};

    var totalIntervals = 0;

    // Add each teacher to the object
    for(var siteIndex in sites)
    {

      results[siteIndex] = {
        name: "",
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
      for(var rowIndex in data)
      {
        var row = data[rowIndex];

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


    // Calculate the averages in percentages
    // Go through each teacher
    for(var resultsIndex in results)
    {
      var result = results[resultsIndex];

      var tempTotalInstructions = result.totalInstructions;
      var tempTotalObserved = result.totalObserved;

      result.eyeLevelAverage = result.eyeLevel > 0 ? (result.eyeLevel / tempTotalInstructions).toFixed(2) * 100 : 0;
      result.positiveExpressionAverage = result.positiveExpression > 0 ? (result.positiveExpression / tempTotalInstructions).toFixed(2) * 100 : 0;
      result.repeatsAverage = result.repeats > 0 ? (result.repeats / tempTotalInstructions).toFixed(2) * 100 : 0;
      result.openEndedQuestionsAverage = result.openEndedQuestions > 0 ? (result.openEndedQuestions / tempTotalInstructions).toFixed(2) * 100 : 0;
      result.extendsPlayAverage = result.extendsPlay > 0 ? (result.extendsPlay / tempTotalInstructions).toFixed(2) * 100 : 0;
      result.encouragesPeerTalkAverage = result.encouragesPeerTalk > 0 ? (result.encouragesPeerTalk / tempTotalInstructions).toFixed(2) * 100 : 0;

      result.noBehaviorsAverage = result.noBehaviors > 0 ? (result.noBehaviors / tempTotalObserved).toFixed(2) * 100 : 0;
      result.encouragingAverage = result.encouraging > 0 ? (result.encouraging / tempTotalObserved).toFixed(2) * 100 : 0;

    }

    return results;

  }



    /*
     * Sequential Activities
     */
    calculateSequentialActivitiesAverages = (data, sites) => {

      // Initialize the array that will hold all the data
      var results = {};

      var totalIntervals = 0;

      // Add each teacher to the object
      for(var siteIndex in sites)
      {

        results[siteIndex] = {
          name: tempName,
          totalInstructions: 0,
          sequentialActivities: 0,
          drawImages: 0,
          demonstrateSteps: 0,
          actOut: 0,
          notAtCenter: 0,
          noSupport: 0,
          support: 0
        };

      }

      // Get number of instances for each type of data
      for(var siteIndex in sites)
      {
        for(var rowIndex in data)
        {
          var row = data[rowIndex];

          // Add to behavior types
          results[siteIndex].sequentialActivities += row.sequentialActivities;
          results[siteIndex].drawImages += row.drawImages;
          results[siteIndex].actOut += row.actOut;
          results[siteIndex].demonstrateSteps += row.demonstrateSteps;

          results[siteIndex].notAtCenter += row.notAtCenter;
          results[siteIndex].support += row.support;
          results[siteIndex].noSupport += row.noSupport;

          // Calculate the total Number of instructions
          results[siteIndex].totalInstructions += row.noSupport + row.notAtCenter + row.support;
        }
      }

      // Calculate the averages in percentages
      // Go through each teacher
      for(var resultsIndex in results)
      {
        var result = results[resultsIndex];

        var tempTotalInstructions = result.totalInstructions;

        result.sequentialActivitiesAverage = result.sequentialActivities > 0 ? (result.sequentialActivities / tempTotalInstructions).toFixed(2) * 100 : 0;
        result.drawImagesAverage = result.drawImages > 0 ? (result.drawImages / tempTotalInstructions).toFixed(2) * 100 : 0;
        result.actOutAverage = result.actOut > 0 ? (result.actOut / tempTotalInstructions).toFixed(2) * 100 : 0;
        result.demonstrateStepsAverage = result.demonstrateSteps > 0 ? (result.demonstrateSteps / tempTotalInstructions).toFixed(2) * 100 : 0;

        result.notAtCenterAverage = result.notAtCenter > 0 ? (result.notAtCenter / tempTotalInstructions).toFixed(2) * 100 : 0;
        result.supportAverage = result.support > 0 ? (result.support / tempTotalInstructions).toFixed(2) * 100 : 0;
        result.noSupportAverage = result.noSupport > 0 ? (result.noSupport / tempTotalInstructions).toFixed(2) * 100 : 0;

      }

      return results;

    }



  /*
  * Foundational Skills
  */
  calculateFoundationalSkillsAverages = (data, sites) => {

    // Initialize the array that will hold all the data
    var results = {};

    var totalIntervals = 0;

    // Add each teacher to the object
    for(var siteIndex in sites)
    {

      results[sites[siteIndex].id] = {
        name: "",
        totalIntervals: 0,
        totalInstructions: 0,
        phonological: 0,
        alphabetic: 0,
        openEndedQuestions: 0,
        realisticReading: 0,
        multimodalInstruction: 0,
        foundationalSkills: 0
      };

    }

    // Get number of instances for each type of data
    for(var siteIndex in sites)
    {
      for(var rowIndex in data)
      {
        var row = data[rowIndex];

        // Add to total # of intervals
        //results[siteIndex].totalIntervals += row.total;
        results[siteIndex].totalIntervals++;

        // Add to behavior types

        // If this observation has a phonal answer.
        if(row.foundational1 || row.foundational2)
        {
          results[siteIndex].phonological++;
        }
        // If this observation has a alphabetic answer
        if(row.foundational3 || row.foundational4 || row.foundational5 || row.foundational6 || row.foundational7)
        {
          results[siteIndex].alphabetic++;
        }
        // If this observation has a open ended question
        if(row.foundational8)
        {
          results[siteIndex].openEndedQuestions++;
        }
        // If this observation has a realistic Reading
        if(row.foundational9)
        {
          results[siteIndex].realisticReading++;
        }
        // If this observation has a Multi Modal
        if(row.foundational10)
        {
          results[siteIndex].multimodalInstruction++;
        }
        // If this observation has anything
        if(!row.foundational11)
        {
          results[siteIndex].foundationalSkills++;
        }

        // Calculate the total Number of instructions
        results[siteIndex].totalInstructions += row.foundational1 + row.foundational2 + row.foundational3 + row.foundational4 + row.foundational5 + row.foundational6 + row.foundational7 + row.foundational8 + row.foundational9 + row.foundational10;
      }
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for(var resultsIndex in results)
    {
      var result = results[resultsIndex];

      var tempTotalInstructions = result.totalInstructions;
      var tempTotalIntervals = result.totalIntervals;

      result.phonologicalAverage = result.phonological > 0 ? (result.phonological / tempTotalIntervals).toFixed(2) * 100 : 0;
      result.alphabeticAverage = result.alphabetic > 0 ? (result.alphabetic / tempTotalIntervals).toFixed(2) * 100 : 0;
      result.openEndedQuestionsAverage = result.openEndedQuestions > 0 ? (result.openEndedQuestions / tempTotalIntervals).toFixed(2) * 100 : 0;
      result.realisticReadingAverage = result.realisticReading > 0 ? (result.realisticReading / tempTotalIntervals).toFixed(2) * 100 : 0;
      result.multimodalInstructionAverage = result.multimodalInstruction > 0 ? (result.multimodalInstruction / tempTotalIntervals).toFixed(2) * 100 : 0;

      // THIS ONE ISN'T RIGHT FOR NOW
      result.foundationalSkillsAverage = result.foundationalSkills > 0 ? (result.foundationalSkills / tempTotalIntervals).toFixed(2) * 100 : 0;
    }

    return results;

  }



  /*
  * Writing
  */
  calculateWritingSkillsAverages = (data, sites) => {

    // Initialize the array that will hold all the data
    var results = {};

    var totalIntervals = 0;

    // Add each teacher to the object
    for(var siteIndex in sites)
    {

      results[siteIndex] = {
        name: "",
        totalIntervals: 0,
        totalInstructions: 0,
        writingSkills: 0,
        meaning: 0,
        printProcesses: 0,
      };

    }

    // Get number of instances for each type of data
    for(var siteIndex in sites)
    {
      for(var rowIndex in data)
      {
        var row = data[rowIndex];

        // Add to total # of intervals
        //results[siteIndex].totalIntervals += row.total;
        results[siteIndex].totalIntervals++;

        // Add to behavior types
        // Count each observation interval that has a meaning in it.
        if(row.writing1 || row.writing2)
        {
          results[siteIndex].meaning++;
        }
        // Count each observation interval that has a Print Process in it
        if(row.writing3 || row.writing4 || row.writing5 || row.writing6 || row.writing7 || row.writing8)
        {
          results[siteIndex].printProcesses++;
        }

        // Count each observation interval that has anything in it
        if(!row.writing9)
        {
          results[siteIndex].writingSkills++;
        }

        // Calculate the total Number of instructions
        results[siteIndex].totalInstructions += row.writing1 + row.writing2 + row.writing3 + row.writing4 + row.writing5 + row.writing6 + row.writing7 + row.writing8;
      }
    }


    // Calculate the averages in percentages
    // Go through each teacher
    for(var resultsIndex in results)
    {
      var result = results[resultsIndex];

      var tempTotalInstructions = result.totalInstructions;
      var tempTotalIntervals = result.totalIntervals;

      result.meaningAverage = result.meaning > 0 ? (result.meaning / tempTotalIntervals).toFixed(2) * 100 : 0;
      result.printProcessesAverage = result.printProcesses > 0 ? (result.printProcesses / tempTotalIntervals).toFixed(2) * 100 : 0;

      // THIS ONE ISN'T RIGHT FOR NOW
      result.writingSkillsAverage = result.writingSkills > 0 ? (result.writingSkills / tempTotalIntervals).toFixed(2) * 100 : 0;
    }

    return results;

  }



  /*
   * Book Reading
   */
  calculateBookReadingAverages = (data, sites) => {

    // Initialize the array that will hold all the data
    var results = {};

    var totalIntervals = 0;

    // Add each teacher to the object
    for(var siteIndex in sites)
    {

      results[sites[siteIndex].id] = {
        name: "",
        totalIntervals: 0,
        totalInstructions: 0,
        bookReading: 0,
        vocabFocus: 0,
        languageConnections: 0,
        childrenSupport: 0,
        fairnessDiscussions: 0,
        multimodalInstruction: 0
      };

    }

    // Get number of instances for each type of data
    for(var siteIndex in sites)
    {
      for(var rowIndex in data)
      {
        var row = data[rowIndex];

        // Add to total # of intervals
        //results[siteIndex].totalIntervals += row.total;
        results[siteIndex].totalIntervals++;

        // Add to behavior types
        // Calculate the total Number of instructions
        results[siteIndex].totalInstructions += row.literacy1 + row.literacy2 + row.literacy3 + row.literacy4 + row.literacy5 + row.literacy6 + row.literacy7 + row.literacy8 + row.literacy9 + row.literacy10;

        // If there were any vocabanswers in this observation
        if( row.literacy1 || row.literacy2 || row.literacy3 )
        {
          results[siteIndex].vocabFocus++;
        }
        // If there were any Language Connection answers in this observation
        if( row.literacy4 || row.literacy5 )
        {
          results[siteIndex].languageConnections++;
        }
        // If there were any Children Support answers in this observation
        if( row.literacy6 || row.literacy7 || row.literacy8 )
        {
          results[siteIndex].childrenSupport++;
        }
        // If there were any Fairness Discussion answers in this observation
        if( row.literacy9 )
        {
          results[siteIndex].fairnessDiscussions++;
        }
        // If there were any Fairness Discussion answers in this observation
        if( row.literacy10 )
        {
          results[siteIndex].multimodalInstruction++;
        }
        // If there were any answers in this observation
        if( !row.literacy11 )
        {
          results[siteIndex].bookReading++;
        }

      }
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for(var resultsIndex in results)
    {

      var result = results[resultsIndex];

      var tempTotalInstructions = result.totalInstructions;
      var tempTotalIntervals = result.totalIntervals;

      result.vocabFocusAverage = result.vocabFocus > 0 ? (result.vocabFocus / tempTotalIntervals).toFixed(2) * 100 : 0;
      result.languageConnectionsAverage = result.languageConnections > 0 ? (result.languageConnections / tempTotalIntervals).toFixed(2) * 100 : 0;
      result.childrenSupportAverage = result.childrenSupport > 0 ? (result.childrenSupport / tempTotalIntervals).toFixed(2) * 100 : 0;
      result.fairnessDiscussionsAverage = result.fairnessDiscussions > 0 ? (result.fairnessDiscussions / tempTotalIntervals).toFixed(2) * 100 : 0;
      result.multimodalInstructionAverage = result.multimodalInstruction > 0 ? (result.multimodalInstruction / tempTotalIntervals).toFixed(2) * 100 : 0;

      result.bookReadingAverage = result.bookReading > 0 ? (result.bookReading / tempTotalIntervals).toFixed(2) * 100 : 0;

    }

    return results;



  }



  /*
   * Language Environment
   */
  calculateLanguageEnvironmentAverages = (data, sites) => {

    // Initialize the array that will hold all the data
    var results = {};

    var totalIntervals = 0;

    // Add each teacher to the object
    for(var siteIndex in sites)
    {

      results[siteIndex] = {
        name: "",
        totalIntervals: 0,
        totalInstructions: 0,
        languageEnvironment: 0,
        talk: 0,
        encourageChildren: 0,
        respondChildren: 0,
      };

    }

    // Get number of instances for each type of data
    for(var siteIndex in sites)
    {
      for(var rowIndex in data)
      {
        var row = data[rowIndex];


        // Add to total # of intervals
        //results[siteIndex].totalIntervals += row.total;
        results[siteIndex].totalIntervals++;

        // Add to behavior types

        // Calculate the total Number of instructions
        results[siteIndex].totalInstructions += row.literacy1 + row.literacy2 + row.literacy3 + row.literacy4 + row.literacy5 + row.literacy6 + row.literacy7 + row.literacy8;

        // If there were any "Talk with children about vocabulary or social-emotional topics" in this observation
        if( row.literacy1 || row.literacy2)
        {
          results[siteIndex].talk++;
        }
        // If there were any "Encourage Children to talk" answers in this observation
        if( row.literacy3 || row.literacy4 || row.literacy5 )
        {
          results[siteIndex].encourageChildren++;
        }
        // If there were any "Respond to children" answers in this observation
        if( row.literacy6 || row.literacy7 || row.literacy8 )
        {
          results[siteIndex].respondChildren++;
        }

        // If there were any answers in this observation
        if( !row.literacy9 )
        {
          results[siteIndex].languageEnvironment++;
        }

      }
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for(var resultsIndex in results)
    {

      var result = results[resultsIndex];

      var tempTotalInstructions = result.totalInstructions;
      var tempTotalIntervals = result.totalIntervals;

      result.talkAverage = result.talk > 0 ? (result.talk / tempTotalIntervals).toFixed(2) * 100 : 0;
      result.encourageChildrenAverage = result.encourageChildren > 0 ? (result.encourageChildren / tempTotalIntervals).toFixed(2) * 100 : 0;
      result.respondChildrenAverage = result.respondChildren > 0 ? (result.respondChildren / tempTotalIntervals).toFixed(2) * 100 : 0;

      result.languageEnvironmentAverage = result.languageEnvironment > 0 ? (result.languageEnvironment / tempTotalIntervals).toFixed(2) * 100 : 0;

    }

    return results;



  }


  /*
   * Associative Cooperative
   */
  calculateACAverages = (data, sites) => {

    // Initialize the array that will hold all the data
    var results = {};

    var totalIntervals = 0;

    // Add each teacher to the object
    for(var siteIndex in sites)
    {

      results[siteIndex] = {
        name: "",
        totalIntervals: 0,
        totalInstructions: 0,

        childrensPlay: 0,
        askingQuestions: 0,
        encouragingChildren: 0,
        helpingChildren: 0,

        support: 0,
        noSupport: 0,
        notAtCenter: 0,
      };

    }

    // Get number of instances for each type of data
    for(var siteIndex in sites)
    {
      for(var rowIndex in data)
      {
        var row = data[rowIndex];

        // Add to total # of intervals
        results[siteIndex].totalIntervals++;

        // Add to behavior types
        // Calculate the total Number of instructions
        results[siteIndex].totalInstructions += row.teacher1 + row.teacher2 + row.teacher3 + row.teacher4;

        // If there were any "Participating in children's play" in this observation
        if( row.teacher1 )
        {
          results[siteIndex].childrensPlay++;
        }
        // If there were any "Asking questions to extend children's thinking about their shared activity" answers in this observation
        if( row.teacher2 )
        {
          results[siteIndex].askingQuestions++;
        }
        // If there were any "Encouraging children to share, work, or interact with each other" answers in this observation
        if( row.teacher3 )
        {
          results[siteIndex].encouragingChildren++;
        }
        // If there were any "Encouraging children to share, work, or interact with each other" answers in this observation
        if( row.teacher4 )
        {
          results[siteIndex].helpingChildren++;
        }

        // Check for act types
        // If teacher was there
        if(row.peopleType == 3)
        {
          // Check for support
          if(row.teacher1 || row.teacher2 || row.teacher3 || row.teacher4)
          {
            results[siteIndex].support++;
          }
          // If there was no support
          else
          {
            results[siteIndex].noSupport++;
          }
        }
        // Teacher not there
        else
        {
          results[siteIndex].notAtCenter++;
        }

      }
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for(var resultsIndex in results)
    {

      var result = results[resultsIndex];

      var tempTotalInstructions = result.totalInstructions;
      var tempTotalIntervals = result.totalIntervals;

      result.childrensPlayAverage = result.childrensPlay > 0 ? (result.childrensPlay / tempTotalIntervals).toFixed(2) * 100 : 0;
      result.askingQuestionsAverage = result.askingQuestions > 0 ? (result.askingQuestions / tempTotalIntervals).toFixed(2) * 100 : 0;
      result.encouragingChildrenAverage = result.encouraging > 0 ? (result.encouraging / tempTotalIntervals).toFixed(2) * 100 : 0;
      result.helpingChildrenAverage = result.helpingChildren > 0 ? (result.helpingChildren / tempTotalIntervals).toFixed(2) * 100 : 0;

      result.supportAverage = result.support > 0 ? (result.support / tempTotalIntervals).toFixed(2) * 100 : 0;
      result.noSupportAverage = result.noSupport > 0 ? (result.noSupport / tempTotalIntervals).toFixed(2) * 100 : 0;
      result.notAtCenterAverage = result.notAtCenter > 0 ? (result.notAtCenter / tempTotalIntervals).toFixed(2) * 100 : 0;

    }

    return results;



  }



}


export default AveragesData;
