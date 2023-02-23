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
         name: tempName,
         total: new Array(monthsCount).fill(0),
         sessionTotal: new Array(monthsCount).fill(0),
         lineChartLabels: months
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
         results[siteIndex].total[rowMonth] = row.total; //transition time
         results[siteIndex].sessionTotal[rowMonth] = row.sessionTotal; //activity time
       }
     }

     let programBar = {
      name: "Program Average",
      total: new Array(monthsCount).fill(0),
      sessionTotal: new Array(monthsCount).fill(0),
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
         var tempTotalInstructions = result.total[i];

         result.total[i] = result.total[i] / result.sessionTotal[i];
        result.sessionTotal[i] = 100 - result.total[i];
        if (isNaN(result.total[i])) {
          result.total[i] = 0
        } 
        if (isNaN(result.sessionTotal[i])) {
          result.sessionTotal[i] = 0
        } 
        programBar.total[i] = programBar.total[i] + result.total[i];
        programBar.sessionTotal[i] = programBar.sessionTotal[i] + result.sessionTotal[i];
        if (isNaN(programBar.total[i])) {
          programBar.total[i] = 0
        } 
        if (isNaN(programBar.sessionTotal[i])) {
          programBar.sessionTotal[i] = 0
        } 
       }
     }

     for (let i = 0; i < monthsCount; i++) {
      programBar.total[i] = programBar.total[i] / programBar.sessionTotal[i];
      programBar.sessionTotal[i] = 100 - programBar.total[i];
      if (isNaN(programBar.total[i])) {
        programBar.total[i] = 0
      }
      if (isNaN(programBar.sessionTotal[i])) {
        programBar.sessionTotal[i] = 0
      }
    }

    results.programBar = programBar;
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
         tone: new Array(monthsCount).fill(0),
         toneCount: new Array(monthsCount).fill(0),

         nonspecificapprovalAverage: new Array(monthsCount).fill(0),
         specificapprovalAverage: new Array(monthsCount).fill(0),
         disapprovalAverage: new Array(monthsCount).fill(0),
         redirectionAverage: new Array(monthsCount).fill(0),
         toneAverage: new Array(monthsCount).fill(0),

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
         
         if(row.behaviorResponse === "nonspecificapproval" || row.behaviorResponse === "specificapproval" || row.behaviorResponse === "disapproval" || row.behaviorResponse === "redirection")
         {
           results[siteIndex][row.behaviorResponse][rowMonth] +=  row.count;
           results[siteIndex].total[rowMonth] += row.count;
         }
         else
         {
           console.log("Tone Rating : ", row);
  
           results[siteIndex].tone[rowMonth] +=  row.toneRating;
           results[siteIndex].toneCount[rowMonth]++;
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

        result.toneAverage[i] = result.toneCount[i] > 0 ? (result.tone[i] / result.toneCount[i]) : 0;
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
        totalSupport: new Array(monthsCount).fill(0),
        totalIntervals: new Array(monthsCount).fill(0),
        teacherSupport: new Array(monthsCount).fill(0),
        math: new Array(monthsCount).fill(0),
        noSupport: new Array(monthsCount).fill(0),
        otherActivities: new Array(monthsCount).fill(0),
        lineChartLabels: months
      };

    }

    for(var siteIndex in sites)
    {
      for(var rowIndex in sites[siteIndex])
      {
        var row = sites[siteIndex][rowIndex];

        //var rowMonth = new Date(row.timestamp).getMonth();
        var rowMonth = months.indexOf(new Date(row.timestamp).toLocaleDateString('en-us', {year:"numeric", month:"short"}) );
        if (row.peopletype === 2 || row.peopletype === 3) {
          results[siteIndex].math[rowMonth] += Math.max(row.counting, row.shapes, row.patterns, row.measurement)
          results[siteIndex].otherActivities[rowMonth] += row.childOther
          results[siteIndex].totalIntervals[rowMonth] += Math.max(row.counting, row.shapes, row.patterns, row.measurement) + row.childOther
        }
        if (row.peopletype === 3) {
          results[siteIndex].teacherSupport[rowMonth] += row.support
          results[siteIndex].noSupport[rowMonth] += row.noSupport
          results[siteIndex].totalSupport[rowMonth] += row.support + row.noSupport
        };
      }
    }

    let programBar = {
      name: "Program Average",
      totalSupport: new Array(monthsCount).fill(0),
      totalIntervals: new Array(monthsCount).fill(0),
      teacherSupport: new Array(monthsCount).fill(0),
      math: new Array(monthsCount).fill(0),
      noSupport: new Array(monthsCount).fill(0),
      otherActivities: new Array(monthsCount).fill(0),
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
        programBar.teacherSupport[i] += result.teacherSupport[i]
        programBar.noSupport[i] += result.noSupport[i]
        programBar.math[i] += result.math[i]
        programBar.otherActivities[i] += result.otherActivities[i]

        result.teacherSupport[i] = parseFloat((result.teacherSupport[i] / result.totalSupport[i]).toFixed(2)) * 100;
        result.math[i] = parseFloat((result.math[i] / result.totalIntervals[i]).toFixed(2)) * 100;
        result.noSupport[i] = parseFloat((result.noSupport[i] / result.totalSupport[i]).toFixed(2)) * 100; 
        result.otherActivities[i] = parseFloat((result.otherActivities[i] / result.totalIntervals[i]).toFixed(2)) * 100;
  
        if (isNaN(result.teacherSupport[i])) {
          result.teacherSupport[i] = 0
        } 
        if (isNaN(result.noSupport[i])) {
          result.noSupport[i] = 0
        } 
        if (isNaN(result.math[i])) {
          result.math[i] = 0
        } 
        if (isNaN(result.otherActivities[i])) {
          result.otherActivities[i] = 0
        } 
        programBar.totalIntervals[i] += result.totalIntervals[i]
        programBar.totalSupport[i] += result.totalSupport[i]
      }
    }

    for (let i = 0; i < monthsCount; i++) {
      programBar.teacherSupport[i] = parseFloat((programBar.teacherSupport[i] / programBar.totalSupport[i]).toFixed(2)) * 100;
      programBar.math[i] = parseFloat((programBar.math[i] / programBar.totalIntervals[i]).toFixed(2)) * 100;
      programBar.noSupport[i] = parseFloat((programBar.noSupport[i] / programBar.totalSupport[i]).toFixed(2)) * 100; 
      programBar.otherActivities[i] = parseFloat((programBar.otherActivities[i] / programBar.totalIntervals[i]).toFixed(2)) * 100;
  
      if (isNaN(programBar.teacherSupport[i])) {
        programBar.teacherSupport[i] = 0
      } 
      if (isNaN(programBar.noSupport[i])) {
        programBar.noSupport[i] = 0
      } 
      if (isNaN(programBar.math[i])) {
        programBar.math[i] = 0
      } 
      if (isNaN(programBar.otherActivities[i])) {
        programBar.otherActivities[i] = 0
      } 
    }
  
    results.programBar = programBar;
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
       totalPoints: new Array(monthsCount).fill(0),
        totalIntervals: new Array(monthsCount).fill(0),
        dailyAverage: new Array(monthsCount).fill(0),

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
        results[siteIndex].totalPoints[rowMonth] += row.point * row.count
        results[siteIndex].totalIntervals[rowMonth] += row.count 
     }
   }

   var programBar = {
    name: "program Average",

    dailyAverage: new Array(monthsCount).fill(0),

    totalPoints: new Array(monthsCount).fill(0),
    totalIntervals: new Array(monthsCount).fill(0),

    lineChartLabels: months,
  }

   // Calculate the averages in percentages
   // Go through each teacher
   for(var resultsIndex in results)
   {
     var result = results[resultsIndex];

     // Go through the months
     for(var i = 0; i < monthsCount; i++)
     {
      result.dailyAverage[i] = (result.totalPoints[i] / result.totalIntervals[i])

      console.log(result.dailyAverage[i])
      if (isNaN(result.dailyAverage[i])) {
        result.dailyAverage[i] = 0
      }

      programBar.totalPoints[i] += result.totalPoints[i];
      programBar.totalIntervals[i] += result.totalIntervals[i];

     }
   }

   for(var i = 0; i < monthsCount; i++)
   {
    programBar.dailyAverage[i] = programBar.totalPoints[i] / programBar.totalIntervals[i];
    if (isNaN(programBar.dailyAverage[i])) {
      programBar.dailyAverage[i] = 0
    }
   }

   results.programBar = programBar;
   return results;
 }




  /*
   * Listening to Children
   */
 calculateListeningToChildrenTrends = (data, sites, startDate, endDate) => {

   // Initialize the array that will hold all the data
   var results = {};

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
       totalIntervals: new Array(monthsCount).fill(0),
       listeningInstruction: new Array(monthsCount).fill(0),
       noBehaviors: new Array(monthsCount).fill(0),
       lineChartLabels: months
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
       results[siteIndex].totalIntervals[rowMonth] += row.count
       if (row.listening7) {
         results[siteIndex].noBehaviors[rowMonth] += row.listening7;
       }
       if (row.listening1 || row.listening2 || row.listening3 || row.listening4 || row.listening5 || row.listening6) {
         results[siteIndex].listeningInstruction[rowMonth] += Math.max(row.listening1, row.listening2, row.listening3, row.listening4, row.listening5, row.listening6)
       }
     }
   }

   let programBar = {
    name: "Program Average",
    totalIntervals: new Array(monthsCount).fill(0),
    listeningInstruction: new Array(monthsCount).fill(0),
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
        programBar.listeningInstruction[i] += result.listeningInstruction[i];
        programBar.noBehaviors[i] += result.noBehaviors[i];

        result.listeningInstruction[i] = parseFloat((result.listeningInstruction[i] / result.totalIntervals[i]).toFixed(2)) * 100;
        result.noBehaviors[i] = parseFloat((result.noBehaviors[i] / result.totalIntervals[i]).toFixed(2)) * 100;

        if (isNaN(result.listeningInstruction[i])) {
          result.listeningInstruction[i] = 0
        }
        if (isNaN(result.noBehaviors[i])) {
          result.noBehaviors[i] = 0
        }
        programBar.totalIntervals[i] = programBar.listeningInstruction[i] + programBar.noBehaviors[i];
     }
   }

   for (let i = 0; i < monthsCount; i++) {
    programBar.listeningInstruction[i] = parseFloat((programBar.listeningInstruction[i] / programBar.totalIntervals[i]).toFixed(2)) * 100;
    programBar.noBehaviors[i] = parseFloat((programBar.noBehaviors[i] / programBar.totalIntervals[i]).toFixed(2)) * 100;

    if (isNaN(programBar.listeningInstruction[i])) {
      programBar.listeningInstruction[i] = 0
    }
    if (isNaN(programBar.noBehaviors[i])) {
      programBar.noBehaviors[i] = 0
    }
  }

  console.log(results)
  results.programBar = programBar;
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
      totalSupport: new Array(monthsCount).fill(0),
      totalIntervals: new Array(monthsCount).fill(0),
      support: new Array(monthsCount).fill(0),
      sequentialActivities: new Array(monthsCount).fill(0),
      noSupport: new Array(monthsCount).fill(0),
      childNonSequential: new Array(monthsCount).fill(0),
      lineChartLabels: months
    };
  }

  let programBar = {
    name: "Program Average",
    totalSupport: new Array(monthsCount).fill(0),
    totalIntervals: new Array(monthsCount).fill(0),
    support: new Array(monthsCount).fill(0),
    sequentialActivities: new Array(monthsCount).fill(0),
    noSupport: new Array(monthsCount).fill(0),
    childNonSequential: new Array(monthsCount).fill(0),
    lineChartLabels: months
  }

  console.log(results)
  for (let siteIndex in sites) {
    for (let rowIndex in sites[siteIndex]) {
      let row = sites[siteIndex][rowIndex];
      let rowMonth = months.indexOf(new Date(row.startDate).toLocaleDateString('en-us', {year: "numeric", month: "short"}));
      if (row.peopletype === 1 || row.peopletype === 2 || row.peopletype === 3) {
        results[siteIndex].sequentialActivities[rowMonth] += (row.total - row.childNonSequential)
        results[siteIndex].childNonSequential[rowMonth] += row.childNonSequential
        results[siteIndex].totalIntervals[rowMonth] += row.total
      }
      if (row.peopletype === 3) {
        results[siteIndex].support[rowMonth] += row.support
        results[siteIndex].noSupport[rowMonth] += row.noSupport
        results[siteIndex].totalSupport[rowMonth] += row.support + row.noSupport
      }
    }
  }
  // Calculate the averages in percentages
  // Go through each teacher
  for (let resultsIndex in results) {
    let result = results[resultsIndex];

    for (let i = 0; i < monthsCount; i++) {
      programBar.support[i] += result.support[i]
      programBar.noSupport[i] += result.noSupport[i]
      programBar.sequentialActivities[i] += result.sequentialActivities[i]
      programBar.childNonSequential[i] += result.childNonSequential[i]

      result.support[i] = parseFloat((result.support[i] / result.totalSupport[i]).toFixed(2)) * 100;
      result.sequentialActivities[i] = parseFloat((result.sequentialActivities[i] / result.totalIntervals[i]).toFixed(2)) * 100;
      result.noSupport[i] = parseFloat((result.noSupport[i] / result.totalSupport[i]).toFixed(2)) * 100; 
      result.childNonSequential[i] = parseFloat((result.childNonSequential[i] / result.totalIntervals[i]).toFixed(2)) * 100;

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
      programBar.totalIntervals[i] += result.totalIntervals[i]
      programBar.totalSupport[i] += result.totalSupport[i]
    }
  }

  for (let i = 0; i < monthsCount; i++) {
    programBar.support[i] = parseFloat((programBar.support[i] / programBar.totalSupport[i]).toFixed(2)) * 100;
    programBar.sequentialActivities[i] = parseFloat((programBar.sequentialActivities[i] / programBar.totalIntervals[i]).toFixed(2)) * 100;
    programBar.noSupport[i] = parseFloat((programBar.noSupport[i] / programBar.totalSupport[i]).toFixed(2)) * 100; 
    programBar.childNonSequential[i] = parseFloat((programBar.childNonSequential[i] / programBar.totalIntervals[i]).toFixed(2)) * 100;

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
