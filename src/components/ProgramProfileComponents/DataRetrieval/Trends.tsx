const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

class TrendData {

  constructor() {

  }

  /*
   * Will return an object that holds data for all of the trends data for Book Reading
   */
   calculateTransitionTrends = (data, sites, startDate, endDate) => {

     // Initialize the array that will hold all the data
     var results = {};

     var totalIntervals = 0;

     // Get start month and year
     const startMonth = startDate.getMonth();

     const endMonth = endDate.getMonth();

     // Build list of month between start date and end date
     var tempDate = startDate.toLocaleDateString('en-us', {year:"numeric", month:"short"});

     // Set the month after the end date, formatted like Nov 21, 2022
     var endDatePlusOneMonth = new Date(endDate.setMonth(endDate.getMonth() + 1)).toLocaleDateString('en-us', {year:"numeric", month:"short"});
     var months = [];
     while(tempDate !== endDatePlusOneMonth)
     {
       months.push(tempDate);
       tempDate = new Date(tempDate);
       tempDate = new Date(tempDate.setMonth(tempDate.getMonth() + 1)).toLocaleDateString('en-us', {year:"numeric", month:"short"});
     }

     var monthsCount = months.length;

     // Add each teacher to the object
     var tempName = "";
     for(var siteIndex in sites)
     {

       results[siteIndex] = {
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
       };

     }




     for(var siteIndex in sites)
     {

       // Sort by date just in case
       sites[siteIndex].sort(function(a,b){
         return new Date(b.startDate.value) - new Date(a.startDate.value);
       });

       // Get number of instances for each type of data
       var prevMonth = 0, rowMonth = startMonth;

       for(var rowIndex in sites[siteIndex])
       {
         var row = sites[siteIndex][rowIndex];

         //rowMonth = new Date(row.startDate.value).getMonth();
         rowMonth = months.indexOf(new Date(row.startDate.value).toLocaleDateString('en-us', {year:"numeric", month:"short"}) );

         // Add to behavior types
         results[siteIndex].line[rowMonth] +=  row.line;

         results[siteIndex].traveling[rowMonth] += row.traveling;
         results[siteIndex].waiting[rowMonth] += row.waiting;
         results[siteIndex].routines[rowMonth] += row.routines;
         results[siteIndex].behaviorManagement[rowMonth] += row.behaviorManagement;
         results[siteIndex].other[rowMonth] += row.other;

         // Calculate the total Number of instructions
         results[siteIndex].total[rowMonth] += row.total;
       }
     }

     // Calculate the averages in percentages
     // Go through each teacher
     for(var resultsIndex in results)
     {
       var result = results[resultsIndex];

       // Go through the months
       for(var i = 0; i < monthsCount; i++)
       {
         var tempTotalInstructions = result.total[i];

         result.lineAverage[i] = result.line[i] > 0 ? (result.line[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
         result.travelingAverage[i] = result.traveling[i] > 0 ? (result.traveling[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
         result.waitingAverage[i] = result.waiting[i] > 0 ? (result.waiting[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
         result.routinesAverage[i] = result.routines[i] > 0 ? (result.routines[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
         result.behaviorManagementAverage[i] = result.behaviorManagement[i] > 0 ? (result.behaviorManagement[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
         result.otherAverage[i] = result.other[i] > 0 ? (result.other[i] / tempTotalInstructions).toFixed(2) * 100 : 0;

       }
     }

     return results;

   }

   /*
    * Classroom Climate
    */
   calculateClimateTrends = (data, sites, startDate, endDate) => {

     // Initialize the array that will hold all the data
     var results = {};

     var totalIntervals = 0;

     // Get start month and year
     const startMonth = startDate.getMonth();

     const endMonth = endDate.getMonth();

     // Build list of month between start date and end date
     var tempDate = startDate.toLocaleDateString('en-us', {year:"numeric", month:"short"});

     // Set the month after the end date, formatted like Nov 21, 2022
     var endDatePlusOneMonth = new Date(endDate.setMonth(endDate.getMonth() + 1)).toLocaleDateString('en-us', {year:"numeric", month:"short"});
     var months = [];
     while(tempDate !== endDatePlusOneMonth)
     {
       months.push(tempDate);
       tempDate = new Date(tempDate);
       tempDate = new Date(tempDate.setMonth(tempDate.getMonth() + 1)).toLocaleDateString('en-us', {year:"numeric", month:"short"});
     }

     var monthsCount = months.length;

     // Add each teacher to the object
     var tempName = "";
     for(var siteIndex in sites)
     {

       results[siteIndex] = {
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

         lineChartLabels: months,
       };

     }


     // Get number of instances for each type of data
     var prevMonth = 0, rowMonth = startMonth;


     for(var siteIndex in sites)
     {

       for(var rowIndex in sites[siteIndex])
       {

         var row = sites[siteIndex][rowIndex];

         //rowMonth = new Date(row.startDate.value).getMonth();
         rowMonth = months.indexOf(new Date(row.startDate.value).toLocaleDateString('en-us', {year:"numeric", month:"short"}) );


         // Add to behavior types
         // There's a problem where an extra row is being saved where the behaviorResponse is being saved as a number. No idea why but we have to make sure we don't use that row
         if(row.behaviorResponse === "nonspecificapproval" || row.behaviorResponse === "specificapproval" || row.behaviorResponse === "disapproval" || row.behaviorResponse === "redirection")
         {
           results[siteIndex][row.behaviorResponse][rowMonth] +=  row.count;
           results[siteIndex].total[rowMonth] += row.count;
         }

       }
     }

     // Calculate the averages in percentages
     // Go through each teacher
     for(var resultsIndex in results)
     {
       var result = results[resultsIndex];

       // Go through the months
       for(var i = 0; i < monthsCount; i++)
       {
         var tempTotalInstructions = result.total[i];

         result.nonspecificapprovalAverage[i] = result.nonspecificapproval[i] > 0 ? (result.nonspecificapproval[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
         result.specificapprovalAverage[i] = result.specificapproval[i] > 0 ? (result.specificapproval[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
         result.disapprovalAverage[i] = result.disapproval[i] > 0 ? (result.disapproval[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
         result.redirectionAverage[i] = result.redirection[i] > 0 ? (result.redirection[i] / tempTotalInstructions).toFixed(2) * 100 : 0;

       }
     }

     return results;

   }

   /*
    * MATH INSTRUCTIONS
    */
  calculateMathTrends = (data, sites, startDate, endDate) => {

    // Initialize the array that will hold all the data
    var results = {};

    var totalIntervals = 0;

    // Get start month and year
    const startMonth = startDate.getMonth();

    const endMonth = endDate.getMonth();

    // Build list of month between start date and end date
    var tempDate = startDate.toLocaleDateString('en-us', {year:"numeric", month:"short"});

    // Set the month after the end date, formatted like Nov 21, 2022
    var endDatePlusOneMonth = new Date(endDate.setMonth(endDate.getMonth() + 1)).toLocaleDateString('en-us', {year:"numeric", month:"short"});
    var months = [];
    while(tempDate !== endDatePlusOneMonth)
    {
      months.push(tempDate);
      tempDate = new Date(tempDate);
      tempDate = new Date(tempDate.setMonth(tempDate.getMonth() + 1)).toLocaleDateString('en-us', {year:"numeric", month:"short"});
    }

    var monthsCount = months.length;

    // Add each teacher to the object
    var tempName = "";
    for(var siteIndex in sites)
    {

      tempName = "";

      results[siteIndex] = {
        name: tempName,
        totalInstructions: new Array(monthsCount).fill(0),
        mathVocabulary: new Array(monthsCount).fill(0),
        askingQuestions: new Array(monthsCount).fill(0),
        mathConcepts: new Array(monthsCount).fill(0),
        helpingChildren: new Array(monthsCount).fill(0),

        notAtCenter: new Array(monthsCount).fill(0),
        noSupport: new Array(monthsCount).fill(0),
        support: new Array(monthsCount).fill(0),

        counting: new Array(monthsCount).fill(0),
        shapes: new Array(monthsCount).fill(0),
        patterns: new Array(monthsCount).fill(0),
        measurement: new Array(monthsCount).fill(0),

        totalInstructionsAverage: new Array(monthsCount).fill(0),
        mathVocabularyAverage: new Array(monthsCount).fill(0),
        askingQuestionsAverage: new Array(monthsCount).fill(0),
        mathConceptsAverage: new Array(monthsCount).fill(0),
        helpingChildrenAverage: new Array(monthsCount).fill(0),

        notAtCenterAverage: new Array(monthsCount).fill(0),
        noSupportAverage: new Array(monthsCount).fill(0),
        supportAverage: new Array(monthsCount).fill(0),

        countingAverage: new Array(monthsCount).fill(0),
        shapesAverage: new Array(monthsCount).fill(0),
        patternsAverage: new Array(monthsCount).fill(0),
        measurementAverage: new Array(monthsCount).fill(0),

        lineChartLabels: months,
      };

    }


    // Get number of instances for each type of data
    var tempIntervalData = 0;

    for(var siteIndex in sites)
    {
      for(var rowIndex in sites[siteIndex])
      {
        var row = sites[siteIndex][rowIndex];

        //var rowMonth = new Date(row.timestamp).getMonth();
        var rowMonth = months.indexOf(new Date(row.timestamp).toLocaleDateString('en-us', {year:"numeric", month:"short"}) );

        // Add to total # of intervals
        results[siteIndex].totalInstructions[rowMonth] += row.noOpportunity + row.support + row.noSupport;

        // Add to behavior types
        results[siteIndex].mathVocabulary[rowMonth] += row.mathVocabulary;
        results[siteIndex].askingQuestions[rowMonth] += row.askingQuestions;
        results[siteIndex].mathConcepts[rowMonth] += row.mathConcepts;
        results[siteIndex].helpingChildren[rowMonth] += row.helpingChildren;

        results[siteIndex].counting[rowMonth] += row.counting;
        results[siteIndex].shapes[rowMonth] += row.shapes;
        results[siteIndex].patterns[rowMonth] += row.patterns;
        results[siteIndex].measurement[rowMonth] += row.measurement;

        results[siteIndex].notAtCenter[rowMonth] += row.noOpportunity;
        results[siteIndex].support[rowMonth] += row.support;
        results[siteIndex].noSupport[rowMonth] += row.noSupport;
      }
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for(var resultsIndex in results)
    {
      var result = results[resultsIndex];

      // Go through the months
      for(var i = 0; i < monthsCount; i++)
      {
        var tempTotalInstructions = result.totalInstructions[i];

        result.mathVocabularyAverage[i] = result.mathVocabulary[i] > 0 ? (result.mathVocabulary[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
        result.askingQuestionsAverage[i] = result.askingQuestions[i] > 0 ? (result.askingQuestions[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
        result.mathConceptsAverage[i] = result.mathConcepts[i] > 0 ? (result.mathConcepts[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
        result.helpingChildrenAverage[i] = result.helpingChildren[i] > 0 ? (result.helpingChildren[i] / tempTotalInstructions).toFixed(2) * 100 : 0;

        result.countingAverage = result.counting > 0 ? (result.counting / tempTotalInstructions).toFixed(2) * 100 : 0;
        result.shapesAverage = result.shapes > 0 ? (result.shapes / tempTotalInstructions).toFixed(2) * 100 : 0;
        result.patternsAverage = result.patterns > 0 ? (result.patterns / tempTotalInstructions).toFixed(2) * 100 : 0;
        result.measurementAverage = result.measurement > 0 ? (result.measurement / tempTotalInstructions).toFixed(2) * 100 : 0;


        result.notAtCenterAverage[i] = result.notAtCenter[i] > 0 ? (result.notAtCenter[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
        result.supportAverage[i] = result.support[i] > 0 ? (result.support[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
        result.noSupportAverage[i] = result.noSupport[i] > 0 ? (result.noSupport[i] / tempTotalInstructions).toFixed(2) * 100 : 0;

      }
    }

    return results;

  }

   /*
    * Level of Instructions
    */
  calculateLevelInstructionTrends = (data, sites, startDate, endDate) => {
    let results = {}
    let tempDate = startDate.toLocaleDateString('enm-us', {year: "numeric", month: "short"});
    let endDatePlusOneMonth = new Date(endDate.setMonth(endDate.getMonth() + 1)).toLocaleDateString('en-us', {year: "numeric", month: "short"});
    let months = [];
    while (tempDate !== endDatePlusOneMonth) {
      months.push(tempDate);
      tempDate = new Date(tempDate);
      tempDate = new Date(tempDate.setMonth(tempDate.getMonth() + 1)).toLocaleDateString('en-us', {year: "numeric", month: "short"});
    }
    let monthsCount = months.length;
    for (let siteIndex in sites) {
      results[siteIndex] = {
        name: '',
        totalInstructions: new Array(monthsCount).fill(0),
        highLevel: new Array(monthsCount).fill(0),
        lowLevel: new Array(monthsCount).fill(0),
        lineChartLabels: months,
      };
    }

    let programBar = {
      name: "Program Average",
      totalInstructions: new Array(monthsCount).fill(0),
      highLevel: new Array(monthsCount).fill(0),
      lowLevel: new Array(monthsCount).fill(0),
      lineChartLabels: months
    }

    for (let siteIndex in sites) {
      for(let rowIndex in sites[siteIndex]) {
        let row = sites[siteIndex][rowIndex];
        let rowMonth = months.indexOf(new Date(row.startDate.value).toLocaleDateString('en-us', {year:"numeric", month:"short"}) );
        results[siteIndex].totalInstructions[rowMonth] += row.count;
        if (["hlq", "hlqResonse"].includes(row.instructionType)) {
          results[siteIndex].highLevel[rowMonth] += row.count;
        } else {
          results[siteIndex].lowLevel[rowMonth] += row.count;
        }
      }
    }

    for (let resultsIndex in results) {
      let result = results[resultsIndex];
      for (let i = 0; i < monthsCount; i++) {

        programBar.highLevel[i] += result.highLevel[i]
        programBar.lowLevel[i] += result.lowLevel[i]
        result.highLevel[i] = parseFloat((result.highLevel[i]/result.totalInstructions[i]).toFixed(2)) * 100
        result.lowLevel[i] = parseFloat((result.lowLevel[i]/result.totalInstructions[i]).toFixed(2)) * 100
        if (isNaN(result.highLevel[i])) {
          result.highLevel[i] = 0
        }
        if (isNaN(result.lowLevel[i])) {
          result.lowLevel[i] = 0
        }
        programBar.totalInstructions[i] = programBar.highLevel[i] + programBar.lowLevel[i]

      }
    }

    for (let i = 0; i < monthsCount; i++) {
      programBar.highLevel[i] = programBar.highLevel[i] > 0 ? parseFloat((programBar.highLevel[i] / programBar.totalInstructions[i]).toFixed(2)) * 100 : 0;
      programBar.lowLevel[i] = programBar.lowLevel[i] > 0 ? parseFloat((programBar.lowLevel[i] / programBar.totalInstructions[i]).toFixed(2)) * 100 : 0;
    }

    results.programBar = programBar;
    return results;
  }

  /*
   * Student Engagement
   */
 calculateStudentEngagementTrends = (data, sites, startDate, endDate) => {

   // Initialize the array that will hold all the data
   var results = {};

   var totalIntervals = 0;

   // Get start month and year
   const startMonth = startDate.getMonth();

   const endMonth = endDate.getMonth();

   // Build list of month between start date and end date
   var tempDate = startDate.toLocaleDateString('en-us', {year:"numeric", month:"short"});

   // Set the month after the end date, formatted like Nov 21, 2022
   var endDatePlusOneMonth = new Date(endDate.setMonth(endDate.getMonth() + 1)).toLocaleDateString('en-us', {year:"numeric", month:"short"});
   var months = [];
   while(tempDate !== endDatePlusOneMonth)
   {
     months.push(tempDate);
     tempDate = new Date(tempDate);
     tempDate = new Date(tempDate.setMonth(tempDate.getMonth() + 1)).toLocaleDateString('en-us', {year:"numeric", month:"short"});
   }

   var monthsCount = months.length;

   // Add each teacher to the object
   var tempName = "";
   for(var siteIndex in sites)
   {

     tempName = "";

     results[siteIndex] = {
       name: tempName,
       totalInstructions: new Array(monthsCount).fill(0),
       offTask: new Array(monthsCount).fill(0),
       mildlyEngaged: new Array(monthsCount).fill(0),
       engaged: new Array(monthsCount).fill(0),
       highlyEngaged: new Array(monthsCount).fill(0),


       offTaskAverage: new Array(monthsCount).fill(0),
       mildlyEngagedAverage: new Array(monthsCount).fill(0),
       engagedAverage: new Array(monthsCount).fill(0),
       highlyEngagedAverage: new Array(monthsCount).fill(0),

       lineChartLabels: months,
     };

   }


   // Get number of instances for each type of data
   var tempIntervalData = 0;

   for(var siteIndex in sites)
   {
     for(var rowIndex in sites[siteIndex])
     {
       var row = sites[siteIndex][rowIndex];



       //var rowMonth = new Date(row.startDate).getMonth();
       var rowMonth = months.indexOf(new Date(row.startDate).toLocaleDateString('en-us', {year:"numeric", month:"short"}) );

       // Add to total # of intervals
       results[siteIndex].totalInstructions[rowMonth] += row.count;

       // Add to behavior types
       switch (row.point) {
         case 0:
           results[siteIndex].offTask[rowMonth] += row.count;
           break;
         case 1:
           results[siteIndex].mildlyEngaged[rowMonth] += row.count;
           break;
         case 2:
           results[siteIndex].engaged[rowMonth] += row.count;
           break;
         case 3:
           results[siteIndex].highlyEngaged[rowMonth] += row.count;
           break;
         default:
           break;
       }

     }
   }

   // Calculate the averages in percentages
   // Go through each teacher
   for(var resultsIndex in results)
   {
     var result = results[resultsIndex];

     // Go through the months
     for(var i = 0; i < monthsCount; i++)
     {
       var tempTotalInstructions = result.totalInstructions[i];

       result.offTaskAverage[i] = result.offTask[i] > 0 ? (result.offTask[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
       result.mildlyEngagedAverage[i] = result.mildlyEngaged[i] > 0 ? (result.mildlyEngaged[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
       result.engagedAverage[i] = result.engaged[i] > 0 ? (result.engaged[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
       result.highlyEngagedAverage[i] = result.highlyEngaged[i] > 0 ? (result.highlyEngaged[i] / tempTotalInstructions).toFixed(2) * 100 : 0;

     }
   }

   return results;

 }




  /*
   * Listening to Children
   */
 calculateListeningToChildrenTrends = (data, sites, startDate, endDate) => {

   // Initialize the array that will hold all the data
   var results = {};

   var totalIntervals = 0;

   // Get start month and year
   const startMonth = startDate.getMonth();

   const endMonth = endDate.getMonth();

   // Build list of month between start date and end date
   var tempDate = startDate.toLocaleDateString('en-us', {year:"numeric", month:"short"});

   // Set the month after the end date, formatted like Nov 21, 2022
   var endDatePlusOneMonth = new Date(endDate.setMonth(endDate.getMonth() + 1)).toLocaleDateString('en-us', {year:"numeric", month:"short"});
   var months = [];
   while(tempDate !== endDatePlusOneMonth)
   {
     months.push(tempDate);
     tempDate = new Date(tempDate);
     tempDate = new Date(tempDate.setMonth(tempDate.getMonth() + 1)).toLocaleDateString('en-us', {year:"numeric", month:"short"});
   }

   var monthsCount = months.length;

   // Add each teacher to the object
   var tempName = "";
   for(var siteIndex in sites)
   {

     tempName = "";

     results[siteIndex] = {
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
     };

   }


   // Get number of instances for each type of data
   var tempIntervalData = 0;

   for(var siteIndex in sites)
   {
     for(var rowIndex in sites[siteIndex])
     {
       var row = sites[siteIndex][rowIndex];



       //var rowMonth = new Date(row.startDate).getMonth();
       var rowMonth = months.indexOf(new Date(row.startDate).toLocaleDateString('en-us', {year:"numeric", month:"short"}) );

       // Add to behavior types
       results[siteIndex].eyeLevel[rowMonth] += row.listening1;
       results[siteIndex].positiveExpression[rowMonth] += row.listening2;
       results[siteIndex].repeats[rowMonth] += row.listening3;
       results[siteIndex].openEndedQuestions[rowMonth] += row.listening4;
       results[siteIndex].extendsPlay[rowMonth] += row.listening5;
       results[siteIndex].encouragesPeerTalk[rowMonth] += row.listening6;

       results[siteIndex].noBehaviors[rowMonth] += row.listening7;
       results[siteIndex].encouraging[rowMonth] += row.count - row.listening7;

       // Calculate the total Number of instructions
       results[siteIndex].totalInstructions[rowMonth] += row.listening1 + row.listening2 + row.listening3 + row.listening4 + row.listening5 + row.listening6 + row.listening7;

       // Calculate total number of observations
       results[siteIndex].totalObserved[rowMonth] += row.count;

     }
   }
   // Calculate the averages in percentages
   // Go through each teacher
   for(var resultsIndex in results)
   {
     var result = results[resultsIndex];

     // Go through the months
     for(var i = 0; i < monthsCount; i++)
     {
       var tempTotalInstructions = result.totalInstructions[i];
       var tempTotalObserved = result.totalObserved[i];

       result.eyeLevelAverage[i] = result.eyeLevel[i] > 0 ? (result.eyeLevel[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
       result.positiveExpressionAverage[i] = result.positiveExpression[i] > 0 ? (result.positiveExpression[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
       result.repeatsAverage[i] = result.repeats[i] > 0 ? (result.repeats[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
       result.openEndedQuestionsAverage[i] = result.openEndedQuestions[i] > 0 ? (result.openEndedQuestions[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
       result.extendsPlayAverage[i] = result.extendsPlay[i] > 0 ? (result.extendsPlay[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
       result.encouragesPeerTalkAverage[i] = result.encouragesPeerTalk[i] > 0 ? (result.encouragesPeerTalk[i] / tempTotalInstructions).toFixed(2) * 100 : 0;

       result.noBehaviorsAverage[i] = result.noBehaviors[i] > 0 ? (result.noBehaviors[i] / tempTotalObserved).toFixed(2) * 100 : 0;
       result.encouragingAverage[i] = result.encouraging[i] > 0 ? (result.encouraging[i] / tempTotalObserved).toFixed(2) * 100 : 0;

     }
   }

   return results;

 }



 /*
  * Sequential Activities
  */
 calculateSequentialActivitiesTrends = (data, sites, startDate, endDate) => {
  // support/noSupport
  // Initialize the array that will hold all the data
  let results = {};
  let tempDate = startDate.toLocaleDateString('enm-us', {year: "numeric", month: "short"});
  let endDatePlusOneMonth = new Date(endDate.setMonth(endDate.getMonth() + 1)).toLocaleDateString('en-us', {year: "numeric", month: "short"});
  let months = [];
  while (tempDate !== endDatePlusOneMonth) {
    months.push(tempDate);
    tempDate = new Date(tempDate);
    tempDate = new Date(tempDate.setMonth(tempDate.getMonth() + 1)).toLocaleDateString('en-us', {year: "numeric", month: "short"});
  }
  
  console.log(months)
  let monthsCount = months.length;
  for (let siteIndex in sites) {
    results[siteIndex] = {
      name: '',
      support: new Array(monthsCount).fill(0),
      noSupport: new Array(monthsCount).fill(0),
      sequentialActivities: new Array(monthsCount).fill(0),
      childNonSequential: new Array(monthsCount).fill(0),
      total: new Array(monthsCount).fill(0),
      lineChartLabels: months
    };
  }

  let programBar = {
    name: "Site Average",
    total: new Array(monthsCount).fill(0),
    support: new Array(monthsCount).fill(0),
    noSupport: new Array(monthsCount).fill(0),
    sequentialActivities: new Array(monthsCount).fill(0),
    childNonSequential: new Array(monthsCount).fill(0),
    lineChartLabels: months
  }

  console.log(results)
  for (let siteIndex in sites) {
    for (let rowIndex in sites[siteIndex]) {
      let row = sites[siteIndex][rowIndex];
      let rowMonth = months.indexOf(new Date(row.startDate).toLocaleDateString('en-us', {year: "numeric", month: "short"}));
      results[siteIndex].support[rowMonth] = row.support; //transition time
      results[siteIndex].noSupport[rowMonth] = row.noSupport;
      results[siteIndex].sequentialActivities[rowMonth] = row.sequentialActivities; //transition time
      results[siteIndex].childNonSequential[rowMonth] = row.childNonSequential;
      results[siteIndex].total[rowMonth] = row.total;
      console.log(row)
    }
  }
  console.log(results);
  // Calculate the averages in percentages
  // Go through each teacher
  for(var resultsIndex in results)
  {
    var result = results[resultsIndex];

    // Go through the months
    for(var i = 0; i < monthsCount; i++)
    {

      // result.sequentialActivitiesAverage[i] = result.sequentialActivities[i] > 0 ? (result.sequentialActivities[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
      // result.drawImagesAverage[i] = result.drawImages[i] > 0 ? (result.drawImages[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
      // result.demonstrateStepsAverage[i] = result.demonstrateSteps[i] > 0 ? (result.demonstrateSteps[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
      // result.actOutAverage[i] = result.actOut[i] > 0 ? (result.actOut[i] / tempTotalInstructions).toFixed(2) * 100 : 0;

      // result.notAtCenterAverage[i] = result.notAtCenter[i] > 0 ? (result.notAtCenter[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
      result.support[i] = result.support[i] > 0 ? (result.support[i] / result.total[i]) : 0;
      result.noSupport[i] = result.noSupport[i] > 0 ? (100 - result.support[i]) : 0;
      result.sequentialActivities[i] = result.sequentialActivities[i] > 0 ? (result.sequentialActivities[i] / result.total[i]) : 0;
      result.childNonSequential[i] = result.childNonSequential[i] > 0 ? (100 - result.sequentialActivities[i]) : 0;
      if (isNaN(result.support[i])) {
        result.support[i] = 0
      } 
      if (isNaN(result.noSupport[i])) {
        result.noSupport[i] = 0
      } 
      if (isNaN(result.sequentialActivities[i])) {
        result.sequentialActivities[i] = 0
      } 
      if (isNaN(result.childNonSequential[i])) {
        result.childNonSequential[i] = 0
      } 

      programBar.support[i] = programBar.support[i] + result.support[i];
      programBar.noSupport[i] = programBar.noSupport[i] + result.noSupport[i]
      programBar.sequentialActivities[i] = programBar.sequentialActivities[i] + result.sequentialActivities[i];
      programBar.noSupport[i] = programBar.childNonSequential[i] + result.childNonSequential[i]
      programBar.total[i] += result.total[i];

      if (isNaN(programBar.support[i])) {
        programBar.support[i] = 0
      } 
      if (isNaN(programBar.noSupport[i])) {
        programBar.noSupport[i] = 0
      } 
      if (isNaN(programBar.sequentialActivities[i])) {
        programBar.sequentialActivities[i] = 0
      } 
      if (isNaN(programBar.childNonSequential[i])) {
        programBar.childNonSequential[i] = 0
      } 
    }
  }

  for (let i = 0; i < monthsCount; i++) {
    programBar.support[i] = programBar.support[i] / programBar.total[i];
    programBar.noSupport[i] = 100 - programBar.support[i];
    programBar.sequentialActivities[i] = programBar.sequentialActivities[i] / programBar.total[i];
    programBar.childNonSequential[i] = 100 - programBar.sequentialActivities[i];
    if (isNaN(programBar.support[i])) {
      programBar.support[i] = 0
      } 
    if (isNaN(programBar.noSupport[i])) {
      programBar.noSupport[i] = 0
    } 
    if (isNaN(programBar.sequentialActivities[i])) {
      programBar.sequentialActivities[i] = 0
    } 
    if (isNaN(programBar.childNonSequential[i])) {
      programBar.childNonSequential[i] = 0
    } 
  }


  results.programBar = programBar;
  console.log(results)
  return results;

}




/*
 * Foundational Skills
 */
calculateFoundationalSkillsTrends = (data, sites, startDate, endDate) => {

  // Initialize the array that will hold all the data
  var results = {};
  // Get start month and year
  const startMonth = startDate.getMonth();
  // Build list of month between start date and end date
  var tempDate = startDate.toLocaleDateString('en-us', {year:"numeric", month:"short"});

  // Set the month after the end date, formatted like Nov 21, 2022
  var endDatePlusOneMonth = new Date(endDate.setMonth(endDate.getMonth() + 1)).toLocaleDateString('en-us', {year:"numeric", month:"short"});
  var months = [];
  while(tempDate !== endDatePlusOneMonth)
  {
    months.push(tempDate);
    tempDate = new Date(tempDate);
    tempDate = new Date(tempDate.setMonth(tempDate.getMonth() + 1)).toLocaleDateString('en-us', {year:"numeric", month:"short"});
  }

  var monthsCount = months.length;

  // Add each teacher to the object
  var tempName = "";
  for(var siteIndex in sites)
  {
    results[siteIndex] = {
      name: '',
      totalIntervals: new Array(monthsCount).fill(0),
      literacyInstruction: new Array(monthsCount).fill(0),
      noBehaviors: new Array(monthsCount).fill(0),
      lineChartLabels: months
    };

  }

  for(var siteIndex in sites)
  {
    for(var rowIndex in sites[siteIndex])
    {
      var row = sites[siteIndex][rowIndex];
      let rowMonth = months.indexOf(new Date(row.startDate).toLocaleDateString('en-us', {year: "numeric", month: "short"}));
      results[siteIndex].totalIntervals[rowMonth]++;
      if (row.foundational11) {
        results[siteIndex].noBehaviors[rowMonth]++;
      } else {
        results[siteIndex].literacyInstruction[rowMonth]++;
      }
    }
  }

  let programBar = {
    name: "Program Average",
    total: new Array(monthsCount).fill(0),
    literacyInstruction: new Array(monthsCount).fill(0),
    noBehaviors: new Array(monthsCount).fill(0),
    lineChartLabels: months
  }

  // Calculate the averages in percentages
  // Go through each teacher
  for(var resultsIndex in results)
  {
    var result = results[resultsIndex];

    // Go through the months
    for(var i = 0; i < monthsCount; i++)
    {
      programBar.literacyInstruction[i] = result.literacyInstruction[i] > 0 ? programBar.literacyInstruction[i] + result.literacyInstruction[i] : programBar.literacyInstruction[i]
      programBar.noBehaviors[i] = result.noBehaviors[i] > 0 ? programBar.noBehaviors[i] + result.noBehaviors[i] : programBar.noBehaviors[i]
      result.literacyInstruction[i] = parseFloat((result.literacyInstruction[i] / result.totalIntervals[i]).toFixed(2)) * 100;
      result.noBehaviors[i] = parseFloat((result.noBehaviors[i] / result.totalIntervals[i]).toFixed(2)) * 100;

      if (isNaN(result.literacyInstruction[i])) {
        result.literacyInstruction[i] = 0
      }
      if (isNaN(result.noBehaviors[i])) {
        result.noBehaviors[i] = 0
      }
      programBar.total[i] = programBar.literacyInstruction[i] + programBar.noBehaviors[i];
    }
  }

  for (let i = 0; i < monthsCount; i++) {
    programBar.literacyInstruction[i] = programBar.literacyInstruction[i] > 0 ? parseFloat((programBar.literacyInstruction[i] / programBar.total[i]).toFixed(2)) * 100 : 0;
    programBar.noBehaviors[i] = programBar.noBehaviors[i] > 0 ? parseFloat((programBar.noBehaviors[i] / programBar.total[i]).toFixed(2)) * 100 : 0;
  }

  results.programBar = programBar;

  return results;
}




/*
 * Writing Skills
 */
calculateWritingSkillsTrends = (data, sites, startDate, endDate) => {

  // Initialize the array that will hold all the data
  var results = {};
  // Get start month and year
  const startMonth = startDate.getMonth();
  // Build list of month between start date and end date
  var tempDate = startDate.toLocaleDateString('en-us', {year:"numeric", month:"short"});

  // Set the month after the end date, formatted like Nov 21, 2022
  var endDatePlusOneMonth = new Date(endDate.setMonth(endDate.getMonth() + 1)).toLocaleDateString('en-us', {year:"numeric", month:"short"});
  var months = [];
  while(tempDate !== endDatePlusOneMonth)
  {
    months.push(tempDate);
    tempDate = new Date(tempDate);
    tempDate = new Date(tempDate.setMonth(tempDate.getMonth() + 1)).toLocaleDateString('en-us', {year:"numeric", month:"short"});
  }

  var monthsCount = months.length;

  // Add each teacher to the object
  var tempName = "";
  for(var siteIndex in sites)
  {
    results[siteIndex] = {
      name: '',
      totalIntervals: new Array(monthsCount).fill(0),
      literacyInstruction: new Array(monthsCount).fill(0),
      noBehaviors: new Array(monthsCount).fill(0),
      lineChartLabels: months
    };

  }

  for(var siteIndex in sites)
  {
    for(var rowIndex in sites[siteIndex])
    {
      var row = sites[siteIndex][rowIndex];
      let rowMonth = months.indexOf(new Date(row.startDate).toLocaleDateString('en-us', {year: "numeric", month: "short"}));
      results[siteIndex].totalIntervals[rowMonth]++;
      if (row.writing9) {
        results[siteIndex].noBehaviors[rowMonth]++;
      } else {
        results[siteIndex].literacyInstruction[rowMonth]++;
      }
    }
  }

  let programBar = {
    name: "Program Average",
    total: new Array(monthsCount).fill(0),
    literacyInstruction: new Array(monthsCount).fill(0),
    noBehaviors: new Array(monthsCount).fill(0),
    lineChartLabels: months
  }

  // Calculate the averages in percentages
  // Go through each teacher
  for(var resultsIndex in results)
  {
    var result = results[resultsIndex];

    // Go through the months
    for(var i = 0; i < monthsCount; i++)
    {
      programBar.literacyInstruction[i] = result.literacyInstruction[i] > 0 ? programBar.literacyInstruction[i] + result.literacyInstruction[i] : programBar.literacyInstruction[i]
      programBar.noBehaviors[i] = result.noBehaviors[i] > 0 ? programBar.noBehaviors[i] + result.noBehaviors[i] : programBar.noBehaviors[i]
      result.literacyInstruction[i] = parseFloat((result.literacyInstruction[i] / result.totalIntervals[i]).toFixed(2)) * 100;
      result.noBehaviors[i] = parseFloat((result.noBehaviors[i] / result.totalIntervals[i]).toFixed(2)) * 100;

      if (isNaN(result.literacyInstruction[i])) {
        result.literacyInstruction[i] = 0
      }
      if (isNaN(result.noBehaviors[i])) {
        result.noBehaviors[i] = 0
      }
      programBar.total[i] = programBar.literacyInstruction[i] + programBar.noBehaviors[i];
    }
  }

  for (let i = 0; i < monthsCount; i++) {
    programBar.literacyInstruction[i] = programBar.literacyInstruction[i] > 0 ? parseFloat((programBar.literacyInstruction[i] / programBar.total[i]).toFixed(2)) * 100 : 0;
    programBar.noBehaviors[i] = programBar.noBehaviors[i] > 0 ? parseFloat((programBar.noBehaviors[i] / programBar.total[i]).toFixed(2)) * 100 : 0;
  }

  results.programBar = programBar;

  return results;
}



/*
 * Book Reading
 */
calculateBookReadingTrends = (data, sites, startDate, endDate) => {

  // Initialize the array that will hold all the data
  var results = {};
  // Get start month and year
  const startMonth = startDate.getMonth();
  // Build list of month between start date and end date
  var tempDate = startDate.toLocaleDateString('en-us', {year:"numeric", month:"short"});

  // Set the month after the end date, formatted like Nov 21, 2022
  var endDatePlusOneMonth = new Date(endDate.setMonth(endDate.getMonth() + 1)).toLocaleDateString('en-us', {year:"numeric", month:"short"});
  var months = [];
  while(tempDate !== endDatePlusOneMonth)
  {
    months.push(tempDate);
    tempDate = new Date(tempDate);
    tempDate = new Date(tempDate.setMonth(tempDate.getMonth() + 1)).toLocaleDateString('en-us', {year:"numeric", month:"short"});
  }

  var monthsCount = months.length;

  // Add each teacher to the object
  var tempName = "";
  for(var siteIndex in sites)
  {
    results[siteIndex] = {
      name: '',
      totalIntervals: new Array(monthsCount).fill(0),
      literacyInstruction: new Array(monthsCount).fill(0),
      noBehaviors: new Array(monthsCount).fill(0),
      lineChartLabels: months
    };

  }

  for(var siteIndex in sites)
  {
    for(var rowIndex in sites[siteIndex])
    {
      var row = sites[siteIndex][rowIndex];
      let rowMonth = months.indexOf(new Date(row.startDate).toLocaleDateString('en-us', {year: "numeric", month: "short"}));
      results[siteIndex].totalIntervals[rowMonth]++;
      if (row.literacy11) {
        results[siteIndex].noBehaviors[rowMonth]++;
      } else {
        results[siteIndex].literacyInstruction[rowMonth]++;
      }
    }
  }

  let programBar = {
    name: "Program Average",
    total: new Array(monthsCount).fill(0),
    literacyInstruction: new Array(monthsCount).fill(0),
    noBehaviors: new Array(monthsCount).fill(0),
    lineChartLabels: months
  }

  // Calculate the averages in percentages
  // Go through each teacher
  for(var resultsIndex in results)
  {
    var result = results[resultsIndex];

    // Go through the months
    for(var i = 0; i < monthsCount; i++)
    {
      programBar.literacyInstruction[i] = result.literacyInstruction[i] > 0 ? programBar.literacyInstruction[i] + result.literacyInstruction[i] : programBar.literacyInstruction[i]
      programBar.noBehaviors[i] = result.noBehaviors[i] > 0 ? programBar.noBehaviors[i] + result.noBehaviors[i] : programBar.noBehaviors[i]
      result.literacyInstruction[i] = parseFloat((result.literacyInstruction[i] / result.totalIntervals[i]).toFixed(2)) * 100;
      result.noBehaviors[i] = parseFloat((result.noBehaviors[i] / result.totalIntervals[i]).toFixed(2)) * 100;

      if (isNaN(result.literacyInstruction[i])) {
        result.literacyInstruction[i] = 0
      }
      if (isNaN(result.noBehaviors[i])) {
        result.noBehaviors[i] = 0
      }
      programBar.total[i] = programBar.literacyInstruction[i] + programBar.noBehaviors[i];
    }
  }

  for (let i = 0; i < monthsCount; i++) {
    programBar.literacyInstruction[i] = programBar.literacyInstruction[i] > 0 ? parseFloat((programBar.literacyInstruction[i] / programBar.total[i]).toFixed(2)) * 100 : 0;
    programBar.noBehaviors[i] = programBar.noBehaviors[i] > 0 ? parseFloat((programBar.noBehaviors[i] / programBar.total[i]).toFixed(2)) * 100 : 0;
  }

  results.programBar = programBar;

  return results;
}



  /*
   * Language Environment
   */
  calculateLanguageEnvironmentTrends = (data, sites, startDate, endDate) => {

  // Initialize the array that will hold all the data
  var results = {};
  // Get start month and year
  const startMonth = startDate.getMonth();
  // Build list of month between start date and end date
  var tempDate = startDate.toLocaleDateString('en-us', {year:"numeric", month:"short"});

  // Set the month after the end date, formatted like Nov 21, 2022
  var endDatePlusOneMonth = new Date(endDate.setMonth(endDate.getMonth() + 1)).toLocaleDateString('en-us', {year:"numeric", month:"short"});
  var months = [];
  while(tempDate !== endDatePlusOneMonth)
  {
    months.push(tempDate);
    tempDate = new Date(tempDate);
    tempDate = new Date(tempDate.setMonth(tempDate.getMonth() + 1)).toLocaleDateString('en-us', {year:"numeric", month:"short"});
  }

  var monthsCount = months.length;

  // Add each teacher to the object
  var tempName = "";
  for(var siteIndex in sites)
  {
    results[siteIndex] = {
      name: '',
      totalIntervals: new Array(monthsCount).fill(0),
      literacyInstruction: new Array(monthsCount).fill(0),
      noBehaviors: new Array(monthsCount).fill(0),
      lineChartLabels: months
    };

  }

  for(var siteIndex in sites)
  {
    for(var rowIndex in sites[siteIndex])
    {
      var row = sites[siteIndex][rowIndex];
      let rowMonth = months.indexOf(new Date(row.startDate).toLocaleDateString('en-us', {year: "numeric", month: "short"}));
      results[siteIndex].totalIntervals[rowMonth]++;
      if (row.literacy9) {
        results[siteIndex].noBehaviors[rowMonth]++;
      } else {
        results[siteIndex].literacyInstruction[rowMonth]++;
      }
    }
  }

  let programBar = {
    name: "Program Average",
    total: new Array(monthsCount).fill(0),
    literacyInstruction: new Array(monthsCount).fill(0),
    noBehaviors: new Array(monthsCount).fill(0),
    lineChartLabels: months
  }

  // Calculate the averages in percentages
  // Go through each teacher
  for(var resultsIndex in results)
  {
    var result = results[resultsIndex];

    // Go through the months
    for(var i = 0; i < monthsCount; i++)
    {
      programBar.literacyInstruction[i] = result.literacyInstruction[i] > 0 ? programBar.literacyInstruction[i] + result.literacyInstruction[i] : programBar.literacyInstruction[i]
      programBar.noBehaviors[i] = result.noBehaviors[i] > 0 ? programBar.noBehaviors[i] + result.noBehaviors[i] : programBar.noBehaviors[i]
      result.literacyInstruction[i] = parseFloat((result.literacyInstruction[i] / result.totalIntervals[i]).toFixed(2)) * 100;
      result.noBehaviors[i] = parseFloat((result.noBehaviors[i] / result.totalIntervals[i]).toFixed(2)) * 100;

      if (isNaN(result.literacyInstruction[i])) {
        result.literacyInstruction[i] = 0
      }
      if (isNaN(result.noBehaviors[i])) {
        result.noBehaviors[i] = 0
      }
      programBar.total[i] = programBar.literacyInstruction[i] + programBar.noBehaviors[i];
    }
  }

  for (let i = 0; i < monthsCount; i++) {
    programBar.literacyInstruction[i] = programBar.literacyInstruction[i] > 0 ? parseFloat((programBar.literacyInstruction[i] / programBar.total[i]).toFixed(2)) * 100 : 0;
    programBar.noBehaviors[i] = programBar.noBehaviors[i] > 0 ? parseFloat((programBar.noBehaviors[i] / programBar.total[i]).toFixed(2)) * 100 : 0;
  }

  results.programBar = programBar;

  return results;
  }


  /*
   * Language Environment
   */
  calculateACTrends = (data, sites, startDate, endDate) => {

    // Initialize the array that will hold all the data
    var results = {};

    // Get start month and year
    const startMonth = startDate.getMonth();

    // Build list of month between start date and end date
    var tempDate = startDate.toLocaleDateString('en-us', {year:"numeric", month:"short"});

    // Set the month after the end date, formatted like Nov 21, 2022
    var endDatePlusOneMonth = new Date(endDate.setMonth(endDate.getMonth() + 1)).toLocaleDateString('en-us', {year:"numeric", month:"short"});
    var months = [];
    while(tempDate !== endDatePlusOneMonth)
    {
      months.push(tempDate);
      tempDate = new Date(tempDate);
      tempDate = new Date(tempDate.setMonth(tempDate.getMonth() + 1)).toLocaleDateString('en-us', {year:"numeric", month:"short"});
    }

    var monthsCount = months.length;

    // Add each teacher to the object
    var tempName = "";
    for(var siteIndex in sites)
    {
      results[siteIndex] = {
        name: '',
        totalSupport: new Array(monthsCount).fill(0),
        totalIntervals: new Array(monthsCount).fill(0),
        teacherSupport: new Array(monthsCount).fill(0),
        ac: new Array(monthsCount).fill(0),
        noSupport: new Array(monthsCount).fill(0),
        noAC: new Array(monthsCount).fill(0),
        lineChartLabels: months
      };

    }

    for(var siteIndex in sites)
    {

      // Sort by date just in case
      sites[siteIndex].sort(function(a,b){
        return new Date(b.GroupDate.value) - new Date(a.GroupDate.value);
      });

      for(var rowIndex in sites[siteIndex])
      {
        var row = sites[siteIndex][rowIndex];
        let rowMonth = months.indexOf(new Date(row.startDate).toLocaleDateString('en-us', {year: "numeric", month: "short"}));
        console.log(new Date(row.startDate).toLocaleDateString('en-us', {year: "numeric", month: "short"}))
  
        if (row.peopleType === 3) {
          if (row.teacher1 || row.teacher2 || row.teacher3 || row.teacher4) {
            results[siteIndex].teacherSupport[rowMonth]++
          } else if (row.teacher1 === 0 && row.teacher2 === 0 && row.teacher3 === 0 && row.teacher4 === 0) {
            results[siteIndex].noSupport[rowMonth]++
          }
          results[siteIndex].totalSupport[rowMonth]++
        }
        if (row.peopleType === 2 || row.peopleType === 3) {
          if (row.child1 || row.child2 || row.child3 || row.child4) {
            results[siteIndex].ac[rowMonth]++
          } else if (row.child1 === 0 && row.child2 === 0 && row.child3 === 0 && row.child4 === 0) {
            results[siteIndex].noAC[rowMonth]++
          }
          results[siteIndex].totalIntervals[rowMonth]++
        }
      }
    }

    let programBar = {
      name: "Program Average",
      totalSupport: new Array(monthsCount).fill(0),
      totalIntervals: new Array(monthsCount).fill(0),
      teacherSupport: new Array(monthsCount).fill(0),
      ac: new Array(monthsCount).fill(0),
      noSupport: new Array(monthsCount).fill(0),
      noAC: new Array(monthsCount).fill(0),
      lineChartLabels: months
    }

    // Calculate the averages in percentages
    // Go through each teacher
    for(var resultsIndex in results)
    {
      var result = results[resultsIndex];

      // Go through the months
      for(var i = 0; i < 12; i++)
      {
        programBar.teacherSupport[i] += result.teacherSupport[i]
        programBar.noSupport[i] += result.noSupport[i]
        programBar.ac[i] += result.ac[i]
        programBar.noAC[i] += result.noAC[i]

        result.teacherSupport[i] = parseFloat((result.teacherSupport[i] / result.totalSupport[i]).toFixed(2)) * 100;
        result.ac[i] = parseFloat((result.ac[i] / result.totalIntervals[i]).toFixed(2)) * 100;
        result.noSupport[i] = parseFloat((result.noSupport[i] / result.totalSupport[i]).toFixed(2)) * 100; 
        result.noAC[i] = parseFloat((result.noAC[i] / result.totalIntervals[i]).toFixed(2)) * 100;
  
        if (isNaN(result.teacherSupport[i])) {
          result.teacherSupport[i] = 0
        } 
        if (isNaN(result.noSupport[i])) {
          result.noSupport[i] = 0
        } 
        if (isNaN(result.ac[i])) {
          result.ac[i] = 0
        } 
        if (isNaN(result.noAC[i])) {
          result.noAC[i] = 0
        } 
        programBar.totalIntervals[i] += result.totalIntervals[i]
        programBar.totalSupport[i] += result.totalSupport[i]
      }
    }

    for (let i = 0; i < monthsCount; i++) {
      programBar.teacherSupport[i] = parseFloat((programBar.teacherSupport[i] / programBar.totalSupport[i]).toFixed(2)) * 100;
      programBar.ac[i] = parseFloat((programBar.ac[i] / programBar.totalIntervals[i]).toFixed(2)) * 100;
      programBar.noSupport[i] = parseFloat((programBar.noSupport[i] / programBar.totalSupport[i]).toFixed(2)) * 100; 
      programBar.noAC[i] = parseFloat((programBar.noAC[i] / programBar.totalIntervals[i]).toFixed(2)) * 100;
  
      if (isNaN(programBar.teacherSupport[i])) {
        programBar.teacherSupport[i] = 0
      } 
      if (isNaN(programBar.noSupport[i])) {
        programBar.noSupport[i] = 0
      } 
      if (isNaN(programBar.ac[i])) {
        programBar.ac[i] = 0
      } 
      if (isNaN(programBar.noAC[i])) {
        programBar.noAC[i] = 0
      } 
    }
  
    results.programBar = programBar;
    return results;

  }




}


export default TrendData;
