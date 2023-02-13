const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

class TrendData {

  constructor() {

  }

  /*
   * Will return an object that holds data for all of the trends data for Book Reading
   */
  calculateTransitionTrends = (data, teachers, startDate, endDate) => {
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
    for (let teacherIndex in teachers) {
      results[teachers[teacherIndex].id] = {
        name: `${teachers[teacherIndex].firstName} ${teachers[teacherIndex].lastName}`,
        total: new Array(monthsCount).fill(0),
        sessionTotal: new Array(monthsCount).fill(0),
        lineChartLabels: months
      };
    }

    console.log(results)

    for (let rowIndex in data) {
      let row = data[rowIndex];
      let teacherId = row.teacher.split("/")[2];
      let rowMonth = months.indexOf(new Date(row.startDate.value).toLocaleDateString('en-us', {year: "numeric", month: "short"}));
      results[teacherId].total[rowMonth] = row.total; //transition time
      results[teacherId].sessionTotal[rowMonth] = row.sessionTotal; //activity time
    }

    let siteBar = {
      name: "Site Average",
      total: new Array(monthsCount).fill(0),
      sessionTotal: new Array(monthsCount).fill(0),
      lineChartLabels: months
    }

    for (let resultsIndex in results) {
      let result = results[resultsIndex];

      for (let i = 0; i < monthsCount; i++) {
        result.total[i] = result.total[i] / result.sessionTotal[i];
        result.sessionTotal[i] = 100 - result.total[i];
        if (isNaN(result.total[i])) {
          result.total[i] = 0
        } 
        if (isNaN(result.sessionTotal[i])) {
          result.sessionTotal[i] = 0
        } 
        siteBar.total[i] = siteBar.total[i] + result.total[i];
        console.log(siteBar)
        console.log(result)
        siteBar.sessionTotal[i] = siteBar.sessionTotal[i] + result.sessionTotal[i];
        if (isNaN(siteBar.total[i])) {
          siteBar.total[i] = 0
        } 
        if (isNaN(siteBar.sessionTotal[i])) {
          siteBar.sessionTotal[i] = 0
        } 
      }
    }

    for (let i = 0; i < monthsCount; i++) {
      siteBar.total[i] = siteBar.total[i] / siteBar.sessionTotal[i];
      siteBar.sessionTotal[i] = 100 - siteBar.total[i];
    }

    results.siteBar = siteBar;
    console.log(results)
    return results;
   }
   /*
    * Classroom Climate
    */
   calculateClimateTrends = (data, teachers, startDate, endDate) => {

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
     for(var teacherIndex in teachers)
     {

       tempName = teachers[teacherIndex].firstName + " " + teachers[teacherIndex].lastName;

       results[teachers[teacherIndex].id] = {
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

     for(var rowIndex in data)
     {
       var row = data[rowIndex];

       var teacherId = row.teacher.split("/")[2];

       //rowMonth = new Date(row.startDate.value).getMonth();
       rowMonth = months.indexOf(new Date(row.startDate.value).toLocaleDateString('en-us', {year:"numeric", month:"short"}) );

       // Add to behavior types
       // There's a row for the tone. We need to make sure we don't use that one
       if(row.behaviorResponse === "nonspecificapproval" || row.behaviorResponse === "specificapproval" || row.behaviorResponse === "disapproval" || row.behaviorResponse === "redirection")
       {
         results[teacherId][row.behaviorResponse][rowMonth] +=  row.count;
         results[teacherId].total[rowMonth] += row.count;
       }
       else
       {
         console.log("Tone Rating : ", row);

         results[teacherId].tone[rowMonth] +=  row.toneRating;
         results[teacherId].toneCount[rowMonth]++;
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
  calculateMathTrends = (data, teachers, startDate, endDate) => {
    console.log(data)
    let results = {};
    let tempDate = startDate.toLocaleDateString('enm-us', {year: "numeric", month: "short"});
    let endDatePlusOneMonth = new Date(endDate.setMonth(endDate.getMonth() + 1)).toLocaleDateString('en-us', {year: "numeric", month: "short"});
    let months = [];
    while (tempDate !== endDatePlusOneMonth) {
      months.push(tempDate);
      tempDate = new Date(tempDate);
      tempDate = new Date(tempDate.setMonth(tempDate.getMonth() + 1)).toLocaleDateString('en-us', {year: "numeric", month: "short"});
    }
  
    let monthsCount = months.length;
    for (let teacherIndex in teachers) {
      results[teachers[teacherIndex].id] = {
        name: `${teachers[teacherIndex].firstName} ${teachers[teacherIndex].lastName}`,
        totalSupport: new Array(monthsCount).fill(0),
        totalIntervals: new Array(monthsCount).fill(0),
        teacherSupport: new Array(monthsCount).fill(0),
        math: new Array(monthsCount).fill(0),
        noSupport: new Array(monthsCount).fill(0),
        otherActivities: new Array(monthsCount).fill(0),
        lineChartLabels: months
      };
    }
  
    for (let rowIndex in data) {
      let row = data[rowIndex];
      let teacherId = row.teacher.split("/")[2];
      let rowMonth = months.indexOf(new Date(row.startDate).toLocaleDateString('en-us', {year: "numeric", month: "short"}));      
      results[teacherId].totalIntervals[rowMonth]++;
      if (row.mathVocabulary || row.askingQuestions || row.mathConcepts || row.helpingChildren) {
        results[teacherId].teacherSupport[rowMonth]++
        results[teacherId].totalSupport[rowMonth]++
      } else if (row.mathVocabulary === 0 && row.askingQuestions === 0 && row.mathConcepts === 0 && row.helpingChildren === 0) {
        results[teacherId].noSupport[rowMonth]++
        results[teacherId].totalSupport[rowMonth]++
      }
      if (row.counting || row.shapes || row.patterns || row.measurement) {
        results[teacherId].math[rowMonth]++
      } else if (row.counting === 0 && row.shapes === 0 && row.patterns === 0 && row.measurement === 0) {
        results[teacherId].otherActivities[rowMonth]++
      }
      
    }
  
    let siteBar = {
      name: "Site Average",
      totalSupport: new Array(monthsCount).fill(0),
      totalIntervals: new Array(monthsCount).fill(0),
      teacherSupport: new Array(monthsCount).fill(0),
      math: new Array(monthsCount).fill(0),
      noSupport: new Array(monthsCount).fill(0),
      otherActivities: new Array(monthsCount).fill(0),
      lineChartLabels: months
    }
  
    console.log(results)
    for (let resultsIndex in results) {
      let result = results[resultsIndex];
  
      for (let i = 0; i < monthsCount; i++) {
        siteBar.teacherSupport[i] += result.teacherSupport[i]
        siteBar.noSupport[i] += result.noSupport[i]
        siteBar.math[i] += result.math[i]
        siteBar.otherActivities[i] += result.otherActivities[i]

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
        siteBar.totalIntervals[i] += result.totalIntervals[i]
        siteBar.totalSupport[i] += result.totalSupport[i]
      }
    }
  
    for (let i = 0; i < monthsCount; i++) {
      siteBar.teacherSupport[i] = parseFloat((siteBar.teacherSupport[i] / siteBar.totalSupport[i]).toFixed(2)) * 100;
      siteBar.math[i] = parseFloat((siteBar.math[i] / siteBar.totalIntervals[i]).toFixed(2)) * 100;
      siteBar.noSupport[i] = parseFloat((siteBar.noSupport[i] / siteBar.totalSupport[i]).toFixed(2)) * 100; 
      siteBar.otherActivities[i] = parseFloat((siteBar.otherActivities[i] / siteBar.totalIntervals[i]).toFixed(2)) * 100;
  
      if (isNaN(siteBar.teacherSupport[i])) {
        siteBar.teacherSupport[i] = 0
      } 
      if (isNaN(siteBar.noSupport[i])) {
        siteBar.noSupport[i] = 0
      } 
      if (isNaN(siteBar.math[i])) {
        siteBar.math[i] = 0
      } 
      if (isNaN(siteBar.otherActivities[i])) {
        siteBar.otherActivities[i] = 0
      } 
    }
  
    results.siteBar = siteBar;
    console.log(results)
    return results;
    // // Initialize the array that will hold all the data
    // var results = {};

    // var totalIntervals = 0;

    // // Get start month and year
    // const startMonth = startDate.getMonth();

    // const endMonth = endDate.getMonth();


    // // Build list of month between start date and end date
    // var tempDate = startDate.toLocaleDateString('en-us', {year:"numeric", month:"short"});

    // // Set the month after the end date, formatted like Nov 21, 2022
    // var endDatePlusOneMonth = new Date(endDate.setMonth(endDate.getMonth() + 1)).toLocaleDateString('en-us', {year:"numeric", month:"short"});
    // var months = [];
    // while(tempDate !== endDatePlusOneMonth)
    // {
    //   months.push(tempDate);
    //   tempDate = new Date(tempDate);
    //   tempDate = new Date(tempDate.setMonth(tempDate.getMonth() + 1)).toLocaleDateString('en-us', {year:"numeric", month:"short"});
    // }

    // var monthsCount = months.length;

    // // Add each teacher to the object
    // var tempName = "";
    // for(var teacherIndex in teachers)
    // {

    //   tempName = teachers[teacherIndex].firstName + " " + teachers[teacherIndex].lastName;

    //   results[teachers[teacherIndex].id] = {
    //     name: tempName,
    //     totalInstructions: new Array(monthsCount).fill(0),
    //     mathVocabulary: new Array(monthsCount).fill(0),
    //     askingQuestions: new Array(monthsCount).fill(0),
    //     mathConcepts: new Array(monthsCount).fill(0),
    //     helpingChildren: new Array(monthsCount).fill(0),

    //     notAtCenter: new Array(monthsCount).fill(0),
    //     noSupport: new Array(monthsCount).fill(0),
    //     support: new Array(monthsCount).fill(0),

    //     totalInstructionsAverage: new Array(monthsCount).fill(0),
    //     mathVocabularyAverage: new Array(monthsCount).fill(0),
    //     askingQuestionsAverage: new Array(monthsCount).fill(0),
    //     mathConceptsAverage: new Array(monthsCount).fill(0),
    //     helpingChildrenAverage: new Array(monthsCount).fill(0),

    //     notAtCenterAverage: new Array(monthsCount).fill(0),
    //     noSupportAverage: new Array(monthsCount).fill(0),
    //     supportAverage: new Array(monthsCount).fill(0),

    //     lineChartLabels: months,
    //   };

    // }


    // // Get number of instances for each type of data
    // var tempIntervalData = 0;
    // //var rowMonth = startMonth;
    // for(var rowIndex in data)
    // {
    //   var row = data[rowIndex];

    //   var teacherId = row.teacher.split("/")[2];

    //   var rowMonth = months.indexOf(new Date(row.timestamp).toLocaleDateString('en-us', {year:"numeric", month:"short"}) );

    //   // Add to total # of intervals
    //   results[teacherId].totalInstructions[rowMonth] += row.noOpportunity + row.support + row.noSupport;

    //   // Add to behavior types
    //   results[teacherId].mathVocabulary[rowMonth] += row.mathVocabulary;
    //   results[teacherId].askingQuestions[rowMonth] += row.askingQuestions;
    //   results[teacherId].mathConcepts[rowMonth] += row.mathConcepts;
    //   results[teacherId].helpingChildren[rowMonth] += row.helpingChildren;

    //   results[teacherId].notAtCenter[rowMonth] += row.noOpportunity;
    //   results[teacherId].support[rowMonth] += row.support;
    //   results[teacherId].noSupport[rowMonth] += row.noSupport;
    // }

    // // Calculate the averages in percentages
    // // Go through each teacher
    // for(var resultsIndex in results)
    // {
    //   var result = results[resultsIndex];

    //   // Go through the months
    //   for(var i = 0; i < monthsCount; i++)
    //   {
    //     var tempTotalInstructions = result.totalInstructions[i];

    //     result.mathVocabularyAverage[i] = result.mathVocabulary[i] > 0 ? (result.mathVocabulary[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
    //     result.askingQuestionsAverage[i] = result.askingQuestions[i] > 0 ? (result.askingQuestions[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
    //     result.mathConceptsAverage[i] = result.mathConcepts[i] > 0 ? (result.mathConcepts[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
    //     result.helpingChildrenAverage[i] = result.helpingChildren[i] > 0 ? (result.helpingChildren[i] / tempTotalInstructions).toFixed(2) * 100 : 0;

    //     result.notAtCenterAverage[i] = result.notAtCenter[i] > 0 ? (result.notAtCenter[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
    //     result.supportAverage[i] = result.support[i] > 0 ? (result.support[i] / tempTotalInstructions).toFixed(2) * 100 : 0;
    //     result.noSupportAverage[i] = result.noSupport[i] > 0 ? (result.noSupport[i] / tempTotalInstructions).toFixed(2) * 100 : 0;

    //   }
    // }

    // return results;

  }

   /*
    * Level of Instructions
    */
  calculateLevelInstructionTrends = (data, teachers, startDate, endDate) => {
    console.log(data)
    let results = {};
    let tempDate = startDate.toLocaleDateString('enm-us', {year: "numeric", month: "short"});
    let endDatePlusOneMonth = new Date(endDate.setMonth(endDate.getMonth() + 1)).toLocaleDateString('en-us', {year: "numeric", month: "short"});
    let months = [];
    while (tempDate !== endDatePlusOneMonth) {
      months.push(tempDate);
      tempDate = new Date(tempDate);
      tempDate = new Date(tempDate.setMonth(tempDate.getMonth() + 1)).toLocaleDateString('en-us', {year: "numeric", month: "short"});
    }

    let monthsCount = months.length;
    for (let teacherIndex in teachers) {
      results[teachers[teacherIndex].id] = {
        name: `${teachers[teacherIndex].firstName} ${teachers[teacherIndex].lastName}`,
        totalInstructions: new Array(monthsCount).fill(0),
        highLevel: new Array(monthsCount).fill(0),
        lowLevel: new Array(monthsCount).fill(0),
        lineChartLabels: months
      };
    }

    for (let rowIndex in data) {
      let row = data[rowIndex];
      let teacherId = row.teacher.split("/")[2];
      let rowMonth = months.indexOf(new Date(row.startDate.value).toLocaleDateString('en-us', {year: "numeric", month: "short"}));
      results[teacherId].totalInstructions[rowMonth] += row.count;
      if (["hlq", "hlqResonse"].includes(row.instructionType)) {
        results[teacherId].highLevel[rowMonth] += row.count;
      } else {
        results[teacherId].lowLevel[rowMonth] += row.count;
      }
    }

    let siteBar = {
      name: "Site Average",
      totalInstructions: new Array(monthsCount).fill(0),
      highLevel: new Array(monthsCount).fill(0),
      lowLevel: new Array(monthsCount).fill(0),
      lineChartLabels: months
    }

    for (let resultsIndex in results) {
      let result = results[resultsIndex];

      for (let i = 0; i < monthsCount; i++) {
        siteBar.highLevel[i] += result.highLevel[i]
        siteBar.lowLevel[i] += result.lowLevel[i]
        result.highLevel[i] = parseFloat((result.highLevel[i]/result.totalInstructions[i]).toFixed(2)) * 100
        result.lowLevel[i] = parseFloat((result.lowLevel[i]/result.totalInstructions[i]).toFixed(2)) * 100
        if (isNaN(result.highLevel[i])) {
          result.highLevel[i] = 0
        }
        if (isNaN(result.lowLevel[i])) {
          result.lowLevel[i] = 0
        }
        siteBar.totalInstructions[i] = siteBar.highLevel[i] + siteBar.lowLevel[i]
      }
    }

    for (let i = 0; i < monthsCount; i++) {
      siteBar.highLevel[i] = siteBar.highLevel[i] > 0 ? parseFloat((siteBar.highLevel[i] / siteBar.totalInstructions[i]).toFixed(2)) * 100 : 0;
      siteBar.lowLevel[i] = siteBar.lowLevel[i] > 0 ? parseFloat((siteBar.lowLevel[i] / siteBar.totalInstructions[i]).toFixed(2)) * 100 : 0;
    }

    results.siteBar = siteBar;
    console.log(results)
    return results;
  }

  /*
   * Student Engagement
   */
 calculateStudentEngagementTrends = (data, teachers, startDate, endDate) => {

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
      console.log(tempDate)
      months.push(tempDate);
      tempDate = new Date(tempDate);
      tempDate = new Date(tempDate.setMonth(tempDate.getMonth() + 1)).toLocaleDateString('en-us', {year:"numeric", month:"short"});
    }

    var monthsCount = months.length;



   // Add each teacher to the object
   var tempName = "";
   for(var teacherIndex in teachers)
   {

     tempName = teachers[teacherIndex].firstName + " " + teachers[teacherIndex].lastName;

     results[teachers[teacherIndex].id] = {
        name: tempName,
        totalPoints: new Array(monthsCount).fill(0),
        totalIntervals: new Array(monthsCount).fill(0),
        dailyAverage: new Array(monthsCount).fill(0),

        lineChartLabels: months,
      };

   }

   console.log(months)

   // Get number of instances for each type of data
   var tempIntervalData = 0;
   //var rowMonth = startMonth;
   for(var rowIndex in data)
   {
    var row = data[rowIndex];

    var teacherId = row.teacher.split("/")[2];

    //var rowMonth = new Date(row.startDate).getMonth();
    var rowMonth = months.indexOf(new Date(row.startDate).toLocaleDateString('en-us', {year:"numeric", month:"short"}) );

    results[teacherId].totalPoints[rowMonth] += row.point
    results[teacherId].totalIntervals[rowMonth] += row.count

   }

   var siteBar = {
    name: "Site Average",

    dailyAverage: new Array(monthsCount).fill(0),

    totalPoints: new Array(monthsCount).fill(0),

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

      siteBar.totalPoints[i] = result.dailyAverage[i] > 0 ? siteBar.totalPoints[i] + result.dailyAverage[i] : siteBar.totalPoints[i]

     }
   }

   for(var i = 0; i < monthsCount; i++)
   {
    siteBar.dailyAverage[i] = siteBar.totalPoints[i] > 0 ? parseFloat((siteBar.totalPoints[i] / Object.keys(results).length).toFixed(2)) : 0;
   }

   results.siteBar = siteBar;

   console.log(results)

   return results;

 }




  /*
   * Listening to Children
   */
 calculateListeningToChildrenTrends = (data, teachers, startDate, endDate) => {
  let results = {};
  let tempDate = startDate.toLocaleDateString('enm-us', {year: "numeric", month: "short"});
  let endDatePlusOneMonth = new Date(endDate.setMonth(endDate.getMonth() + 1)).toLocaleDateString('en-us', {year: "numeric", month: "short"});
  let months = [];
  while (tempDate !== endDatePlusOneMonth) {
    months.push(tempDate);
    tempDate = new Date(tempDate);
    tempDate = new Date(tempDate.setMonth(tempDate.getMonth() + 1)).toLocaleDateString('en-us', {year: "numeric", month: "short"});
  }

  let monthsCount = months.length;
  for (let teacherIndex in teachers) {
    results[teachers[teacherIndex].id] = {
      name: `${teachers[teacherIndex].firstName} ${teachers[teacherIndex].lastName}`,
      totalIntervals: new Array(monthsCount).fill(0),
      listeningInstruction: new Array(monthsCount).fill(0),
      noBehaviors: new Array(monthsCount).fill(0),
      lineChartLabels: months
    };
  }

  for (let rowIndex in data) {
    let row = data[rowIndex];
    let teacherId = row.teacher.split("/")[2];
    let rowMonth = months.indexOf(new Date(row.startDate).toLocaleDateString('en-us', {year: "numeric", month: "short"}));

    console.log(new Date(row.startDate).toLocaleDateString('en-us', {year: "numeric", month: "short"}))
    results[teacherId].totalIntervals[rowMonth] = row.count
    if (row.listening7) {
      results[teacherId].noBehaviors[rowMonth]++;
    }
    if (row.listening1 || row.listening2 || row.listening3 || row.listening4 || row.listening5 || row.listening6) {
      results[teacherId].listeningInstruction[rowMonth] = Math.max(row.listening1, row.listening2, row.listening3, row.listening4, row.listening5, row.listening6)
    }
  }

  let siteBar = {
    name: "Site Average",
    totalIntervals: new Array(monthsCount).fill(0),
    listeningInstruction: new Array(monthsCount).fill(0),
    noBehaviors: new Array(monthsCount).fill(0),
    lineChartLabels: months
  }

  console.log(results)
  for (let resultsIndex in results) {
    let result = results[resultsIndex];

    for (let i = 0; i < monthsCount; i++) {
      siteBar.listeningInstruction[i] += result.listeningInstruction[i];
      siteBar.noBehaviors[i] += result.noBehaviors[i];

      result.listeningInstruction[i] = parseFloat((result.listeningInstruction[i] / result.totalIntervals[i]).toFixed(2)) * 100;
      result.noBehaviors[i] = parseFloat((result.noBehaviors[i] / result.totalIntervals[i]).toFixed(2)) * 100;

      if (isNaN(result.listeningInstruction[i])) {
        result.listeningInstruction[i] = 0
      }
      if (isNaN(result.noBehaviors[i])) {
        result.noBehaviors[i] = 0
      }
      siteBar.totalIntervals[i] = siteBar.listeningInstruction[i] + siteBar.noBehaviors[i];
    }
  }

  for (let i = 0; i < monthsCount; i++) {
    siteBar.listeningInstruction[i] = parseFloat((siteBar.listeningInstruction[i] / siteBar.totalIntervals[i]).toFixed(2)) * 100;
    siteBar.noBehaviors[i] = parseFloat((siteBar.noBehaviors[i] / siteBar.totalIntervals[i]).toFixed(2)) * 100;

    if (isNaN(siteBar.listeningInstruction[i])) {
      siteBar.listeningInstruction[i] = 0
    }
    if (isNaN(siteBar.noBehaviors[i])) {
      siteBar.noBehaviors[i] = 0
    }
  }

  results.siteBar = siteBar;
  console.log(results)
  return results;
 }



 /*
  * Sequential Activities
  */
calculateSequentialActivitiesTrends = (data, teachers, startDate, endDate) => {
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
  for (let teacherIndex in teachers) {
    results[teachers[teacherIndex].id] = {
      name: `${teachers[teacherIndex].firstName} ${teachers[teacherIndex].lastName}`,
      support: new Array(monthsCount).fill(0),
      noSupport: new Array(monthsCount).fill(0),
      sequentialActivities: new Array(monthsCount).fill(0),
      childNonSequential: new Array(monthsCount).fill(0),
      total: new Array(monthsCount).fill(0),
      lineChartLabels: months
    };
  }

  console.log(results)

  for (let rowIndex in data) {
    let row = data[rowIndex];
    let teacherId = row.teacher.split("/")[2];
    let rowMonth = months.indexOf(new Date(row.startDate.value).toLocaleDateString('en-us', {year: "numeric", month: "short"}));
    results[teacherId].support[rowMonth] = row.support; //transition time
    results[teacherId].noSupport[rowMonth] = row.noSupport;
    results[teacherId].sequentialActivities[rowMonth] = row.sequentialActivities; //transition time
    results[teacherId].childNonSequential[rowMonth] = row.childNonSequential;
    results[teacherId].total[rowMonth] = row.total;
  }
  let siteBar = {
    name: "Site Average",
    total: new Array(monthsCount).fill(0),
    support: new Array(monthsCount).fill(0),
    noSupport: new Array(monthsCount).fill(0),
    sequentialActivities: new Array(monthsCount).fill(0),
    childNonSequential: new Array(monthsCount).fill(0),
  }

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

      siteBar.support[i] = siteBar.support[i] + result.support[i];
      siteBar.noSupport[i] = siteBar.noSupport[i] + result.noSupport[i]
      siteBar.sequentialActivities[i] = siteBar.sequentialActivities[i] + result.sequentialActivities[i];
      siteBar.noSupport[i] = siteBar.childNonSequential[i] + result.childNonSequential[i]
      siteBar.total[i] += result.total[i];

      if (isNaN(siteBar.support[i])) {
        siteBar.support[i] = 0
      } 
      if (isNaN(siteBar.noSupport[i])) {
        siteBar.noSupport[i] = 0
      } 
      if (isNaN(siteBar.sequentialActivities[i])) {
        siteBar.sequentialActivities[i] = 0
      } 
      if (isNaN(siteBar.childNonSequential[i])) {
        siteBar.childNonSequential[i] = 0
      } 
    }
  }

  for (let i = 0; i < monthsCount; i++) {
    siteBar.support[i] = siteBar.support[i] / siteBar.total[i];
    siteBar.noSupport[i] = 100 - siteBar.support[i];
    siteBar.sequentialActivities[i] = siteBar.sequentialActivities[i] / siteBar.total[i];
    siteBar.childNonSequential[i] = 100 - siteBar.sequentialActivities[i];
  }


  results.siteBar = siteBar;
  console.log(results)
  return results;

}




/*
 * Foundational Skills
 */
calculateFoundationalSkillsTrends = (data, teachers, startDate, endDate) => {
  let results = {};
  let tempDate = startDate.toLocaleDateString('enm-us', {year: "numeric", month: "short"});
  let endDatePlusOneMonth = new Date(endDate.setMonth(endDate.getMonth() + 1)).toLocaleDateString('en-us', {year: "numeric", month: "short"});
  let months = [];
  while (tempDate !== endDatePlusOneMonth) {
    months.push(tempDate);
    tempDate = new Date(tempDate);
    tempDate = new Date(tempDate.setMonth(tempDate.getMonth() + 1)).toLocaleDateString('en-us', {year: "numeric", month: "short"});
  }

  let monthsCount = months.length;
  for (let teacherIndex in teachers) {
    results[teachers[teacherIndex].id] = {
      name: `${teachers[teacherIndex].firstName} ${teachers[teacherIndex].lastName}`,
      totalIntervals: new Array(monthsCount).fill(0),
      literacyInstruction: new Array(monthsCount).fill(0),
      noBehaviors: new Array(monthsCount).fill(0),
      lineChartLabels: months
    };
  }

  for (let rowIndex in data) {
    let row = data[rowIndex];
    let teacherId = row.teacher.split("/")[2];
    let rowMonth = months.indexOf(new Date(row.startDate).toLocaleDateString('en-us', {year: "numeric", month: "short"}));
    results[teacherId].totalIntervals[rowMonth]++;
    if (row.foundational11) {
      results[teacherId].noBehaviors[rowMonth]++;
    } else {
      results[teacherId].literacyInstruction[rowMonth]++;
    }
  }

  let siteBar = {
    name: "Site Average",
    total: new Array(monthsCount).fill(0),
    literacyInstruction: new Array(monthsCount).fill(0),
    noBehaviors: new Array(monthsCount).fill(0),
    lineChartLabels: months
  }

  for (let resultsIndex in results) {
    let result = results[resultsIndex];

    for (let i = 0; i < monthsCount; i++) {
      siteBar.literacyInstruction[i] = result.literacyInstruction[i] > 0 ? siteBar.literacyInstruction[i] + result.literacyInstruction[i] : siteBar.literacyInstruction[i]
      siteBar.noBehaviors[i] = result.noBehaviors[i] > 0 ? siteBar.noBehaviors[i] + result.noBehaviors[i] : siteBar.noBehaviors[i]
      result.literacyInstruction[i] = parseFloat((result.literacyInstruction[i] / result.totalIntervals[i]).toFixed(2)) * 100;
      result.noBehaviors[i] = parseFloat((result.noBehaviors[i] / result.totalIntervals[i]).toFixed(2)) * 100;

      if (isNaN(result.literacyInstruction[i])) {
        result.literacyInstruction[i] = 0
      }
      if (isNaN(result.noBehaviors[i])) {
        result.noBehaviors[i] = 0
      }
      siteBar.total[i] = siteBar.literacyInstruction[i] + siteBar.noBehaviors[i];
    }
  }

  for (let i = 0; i < monthsCount; i++) {
    siteBar.literacyInstruction[i] = siteBar.literacyInstruction[i] > 0 ? parseFloat((siteBar.literacyInstruction[i] / siteBar.total[i]).toFixed(2)) * 100 : 0;
    siteBar.noBehaviors[i] = siteBar.noBehaviors[i] > 0 ? parseFloat((siteBar.noBehaviors[i] / siteBar.total[i]).toFixed(2)) * 100 : 0;
  }

  results.siteBar = siteBar;
  console.log(results)
  return results;
}




/*
 * Writing Skills
 */
calculateWritingSkillsTrends = (data, teachers, startDate, endDate) => {
  let results = {};
  let tempDate = startDate.toLocaleDateString('enm-us', {year: "numeric", month: "short"});
  let endDatePlusOneMonth = new Date(endDate.setMonth(endDate.getMonth() + 1)).toLocaleDateString('en-us', {year: "numeric", month: "short"});
  let months = [];
  while (tempDate !== endDatePlusOneMonth) {
    months.push(tempDate);
    tempDate = new Date(tempDate);
    tempDate = new Date(tempDate.setMonth(tempDate.getMonth() + 1)).toLocaleDateString('en-us', {year: "numeric", month: "short"});
  }

  let monthsCount = months.length;
  for (let teacherIndex in teachers) {
    results[teachers[teacherIndex].id] = {
      name: `${teachers[teacherIndex].firstName} ${teachers[teacherIndex].lastName}`,
      totalIntervals: new Array(monthsCount).fill(0),
      literacyInstruction: new Array(monthsCount).fill(0),
      noBehaviors: new Array(monthsCount).fill(0),
      lineChartLabels: months
    };
  }

  for (let rowIndex in data) {
    let row = data[rowIndex];
    let teacherId = row.teacher.split("/")[2];
    let rowMonth = months.indexOf(new Date(row.startDate).toLocaleDateString('en-us', {year: "numeric", month: "short"}));
    results[teacherId].totalIntervals[rowMonth]++;
    if (row.writing9) {
      results[teacherId].noBehaviors[rowMonth]++;
    } else {
      results[teacherId].literacyInstruction[rowMonth]++;
    }
  }

  let siteBar = {
    name: "Site Average",
    total: new Array(monthsCount).fill(0),
    literacyInstruction: new Array(monthsCount).fill(0),
    noBehaviors: new Array(monthsCount).fill(0),
    lineChartLabels: months
  }

  for (let resultsIndex in results) {
    let result = results[resultsIndex];

    for (let i = 0; i < monthsCount; i++) {
      siteBar.literacyInstruction[i] = result.literacyInstruction[i] > 0 ? siteBar.literacyInstruction[i] + result.literacyInstruction[i] : siteBar.literacyInstruction[i]
      siteBar.noBehaviors[i] = result.noBehaviors[i] > 0 ? siteBar.noBehaviors[i] + result.noBehaviors[i] : siteBar.noBehaviors[i]
      result.literacyInstruction[i] = parseFloat((result.literacyInstruction[i] / result.totalIntervals[i]).toFixed(2)) * 100;
      result.noBehaviors[i] = parseFloat((result.noBehaviors[i] / result.totalIntervals[i]).toFixed(2)) * 100;

      if (isNaN(result.literacyInstruction[i])) {
        result.literacyInstruction[i] = 0
      }
      if (isNaN(result.noBehaviors[i])) {
        result.noBehaviors[i] = 0
      }
      siteBar.total[i] = siteBar.literacyInstruction[i] + siteBar.noBehaviors[i];
    }
  }

  for (let i = 0; i < monthsCount; i++) {
    siteBar.literacyInstruction[i] = siteBar.literacyInstruction[i] > 0 ? parseFloat((siteBar.literacyInstruction[i] / siteBar.total[i]).toFixed(2)) * 100 : 0;
    siteBar.noBehaviors[i] = siteBar.noBehaviors[i] > 0 ? parseFloat((siteBar.noBehaviors[i] / siteBar.total[i]).toFixed(2)) * 100 : 0;
  }

  results.siteBar = siteBar;
  console.log(results)
  return results;
}



  /*
   * Book Reading
   */
  calculateBookReadingTrends = (data, teachers, startDate, endDate) => {
    let results = {};
    let tempDate = startDate.toLocaleDateString('enm-us', {year: "numeric", month: "short"});
    let endDatePlusOneMonth = new Date(endDate.setMonth(endDate.getMonth() + 1)).toLocaleDateString('en-us', {year: "numeric", month: "short"});
    let months = [];
    while (tempDate !== endDatePlusOneMonth) {
      months.push(tempDate);
      tempDate = new Date(tempDate);
      tempDate = new Date(tempDate.setMonth(tempDate.getMonth() + 1)).toLocaleDateString('en-us', {year: "numeric", month: "short"});
    }

    let monthsCount = months.length;
    for (let teacherIndex in teachers) {
      results[teachers[teacherIndex].id] = {
        name: `${teachers[teacherIndex].firstName} ${teachers[teacherIndex].lastName}`,
        totalIntervals: new Array(monthsCount).fill(0),
        literacyInstruction: new Array(monthsCount).fill(0),
        noBehaviors: new Array(monthsCount).fill(0),
        lineChartLabels: months
      };
    }

    for (let rowIndex in data) {
      let row = data[rowIndex];
      let teacherId = row.teacher.split("/")[2];
      let rowMonth = months.indexOf(new Date(row.startDate).toLocaleDateString('en-us', {year: "numeric", month: "short"}));
      results[teacherId].totalIntervals[rowMonth]++;
      if (row.literacy11) {
        results[teacherId].noBehaviors[rowMonth]++;
      } else {
        results[teacherId].literacyInstruction[rowMonth]++;
      }
    }

    let siteBar = {
      name: "Site Average",
      total: new Array(monthsCount).fill(0),
      literacyInstruction: new Array(monthsCount).fill(0),
      noBehaviors: new Array(monthsCount).fill(0),
      lineChartLabels: months
    }

    for (let resultsIndex in results) {
      let result = results[resultsIndex];

      for (let i = 0; i < monthsCount; i++) {
        siteBar.literacyInstruction[i] = result.literacyInstruction[i] > 0 ? siteBar.literacyInstruction[i] + result.literacyInstruction[i] : siteBar.literacyInstruction[i]
        siteBar.noBehaviors[i] = result.noBehaviors[i] > 0 ? siteBar.noBehaviors[i] + result.noBehaviors[i] : siteBar.noBehaviors[i]
        result.literacyInstruction[i] = parseFloat((result.literacyInstruction[i] / result.totalIntervals[i]).toFixed(2)) * 100;
        result.noBehaviors[i] = parseFloat((result.noBehaviors[i] / result.totalIntervals[i]).toFixed(2)) * 100;

        if (isNaN(result.literacyInstruction[i])) {
          result.literacyInstruction[i] = 0
        }
        if (isNaN(result.noBehaviors[i])) {
          result.noBehaviors[i] = 0
        }
        siteBar.total[i] = siteBar.literacyInstruction[i] + siteBar.noBehaviors[i];
      }
    }

    for (let i = 0; i < monthsCount; i++) {
      siteBar.literacyInstruction[i] = siteBar.literacyInstruction[i] > 0 ? parseFloat((siteBar.literacyInstruction[i] / siteBar.total[i]).toFixed(2)) * 100 : 0;
      siteBar.noBehaviors[i] = siteBar.noBehaviors[i] > 0 ? parseFloat((siteBar.noBehaviors[i] / siteBar.total[i]).toFixed(2)) * 100 : 0;
    }

    results.siteBar = siteBar;
    console.log(results)
    return results;
  }



  /*
   * Language Environment
   */
  calculateLanguageEnvironmentTrends = (data, teachers, startDate, endDate) => {
    let results = {};
    let tempDate = startDate.toLocaleDateString('enm-us', {year: "numeric", month: "short"});
    let endDatePlusOneMonth = new Date(endDate.setMonth(endDate.getMonth() + 1)).toLocaleDateString('en-us', {year: "numeric", month: "short"});
    let months = [];
    while (tempDate !== endDatePlusOneMonth) {
      months.push(tempDate);
      tempDate = new Date(tempDate);
      tempDate = new Date(tempDate.setMonth(tempDate.getMonth() + 1)).toLocaleDateString('en-us', {year: "numeric", month: "short"});
    }

    let monthsCount = months.length;
    for (let teacherIndex in teachers) {
      results[teachers[teacherIndex].id] = {
        name: `${teachers[teacherIndex].firstName} ${teachers[teacherIndex].lastName}`,
        totalIntervals: new Array(monthsCount).fill(0),
        literacyInstruction: new Array(monthsCount).fill(0),
        noBehaviors: new Array(monthsCount).fill(0),
        lineChartLabels: months
      };
    }

    for (let rowIndex in data) {
      let row = data[rowIndex];
      let teacherId = row.teacher.split("/")[2];
      let rowMonth = months.indexOf(new Date(row.startDate).toLocaleDateString('en-us', {year: "numeric", month: "short"}));
      results[teacherId].totalIntervals[rowMonth]++;
      if (row.literacy9) {
        results[teacherId].noBehaviors[rowMonth]++;
      } else {
        results[teacherId].literacyInstruction[rowMonth]++;
      }
    }

    let siteBar = {
      name: "Site Average",
      total: new Array(monthsCount).fill(0),
      literacyInstruction: new Array(monthsCount).fill(0),
      noBehaviors: new Array(monthsCount).fill(0),
      lineChartLabels: months
    }

    for (let resultsIndex in results) {
      let result = results[resultsIndex];

      for (let i = 0; i < monthsCount; i++) {
        siteBar.literacyInstruction[i] = result.literacyInstruction[i] > 0 ? siteBar.literacyInstruction[i] + result.literacyInstruction[i] : siteBar.literacyInstruction[i]
        siteBar.noBehaviors[i] = result.noBehaviors[i] > 0 ? siteBar.noBehaviors[i] + result.noBehaviors[i] : siteBar.noBehaviors[i]
        result.literacyInstruction[i] = parseFloat((result.literacyInstruction[i] / result.totalIntervals[i]).toFixed(2)) * 100;
        result.noBehaviors[i] = parseFloat((result.noBehaviors[i] / result.totalIntervals[i]).toFixed(2)) * 100;

        if (isNaN(result.literacyInstruction[i])) {
          result.literacyInstruction[i] = 0
        }
        if (isNaN(result.noBehaviors[i])) {
          result.noBehaviors[i] = 0
        }
        siteBar.total[i] = siteBar.literacyInstruction[i] + siteBar.noBehaviors[i];
      }
    }

    for (let i = 0; i < monthsCount; i++) {
      siteBar.literacyInstruction[i] = siteBar.literacyInstruction[i] > 0 ? parseFloat((siteBar.literacyInstruction[i] / siteBar.total[i]).toFixed(2)) * 100 : 0;
      siteBar.noBehaviors[i] = siteBar.noBehaviors[i] > 0 ? parseFloat((siteBar.noBehaviors[i] / siteBar.total[i]).toFixed(2)) * 100 : 0;
    }

    results.siteBar = siteBar;
    console.log(results)
    return results;
  }


  /*
   * Language Environment
   */
  calculateACTrends = (data, teachers, startDate, endDate) => {
    console.log(data)
    let results = {};
    let tempDate = startDate.toLocaleDateString('enm-us', {year: "numeric", month: "short"});
    let endDatePlusOneMonth = new Date(endDate.setMonth(endDate.getMonth() + 1)).toLocaleDateString('en-us', {year: "numeric", month: "short"});
    let months = [];
    while (tempDate !== endDatePlusOneMonth) {
      months.push(tempDate);
      tempDate = new Date(tempDate);
      tempDate = new Date(tempDate.setMonth(tempDate.getMonth() + 1)).toLocaleDateString('en-us', {year: "numeric", month: "short"});
    }
  
    let monthsCount = months.length;
    for (let teacherIndex in teachers) {
      results[teachers[teacherIndex].id] = {
        name: `${teachers[teacherIndex].firstName} ${teachers[teacherIndex].lastName}`,
        totalSupport: new Array(monthsCount).fill(0),
        totalIntervals: new Array(monthsCount).fill(0),
        teacherSupport: new Array(monthsCount).fill(0),
        ac: new Array(monthsCount).fill(0),
        noSupport: new Array(monthsCount).fill(0),
        noAC: new Array(monthsCount).fill(0),
        lineChartLabels: months
      };
    }
  
    for (let rowIndex in data) {
      let row = data[rowIndex];
      let teacherId = row.teacher.split("/")[2];
      let rowMonth = months.indexOf(new Date(row.startDate).toLocaleDateString('en-us', {year: "numeric", month: "short"}));
      console.log(new Date(row.startDate).toLocaleDateString('en-us', {year: "numeric", month: "short"}))

      results[teacherId].totalIntervals[rowMonth]++;
      if (row.teacher1 || row.teacher2 || row.teacher3 || row.teacher4) {
        results[teacherId].teacherSupport[rowMonth]++
        results[teacherId].totalSupport[rowMonth]++
      } else if (row.teacher1 === 0 && row.teacher2 === 0 && row.teacher3 === 0 && row.teacher4 === 0) {
        results[teacherId].noSupport[rowMonth]++
        results[teacherId].totalSupport[rowMonth]++
      }
      if (row.child1 || row.child2 || row.child3 || row.child4) {
        results[teacherId].ac[rowMonth]++
      } else if (row.child1 === 0 && row.child2 === 0 && row.child3 === 0 && row.child4 === 0) {
        results[teacherId].noAC[rowMonth]++
      }
      
    }
  
    let siteBar = {
      name: "Site Average",
      totalSupport: new Array(monthsCount).fill(0),
      totalIntervals: new Array(monthsCount).fill(0),
      teacherSupport: new Array(monthsCount).fill(0),
      ac: new Array(monthsCount).fill(0),
      noSupport: new Array(monthsCount).fill(0),
      noAC: new Array(monthsCount).fill(0),
      lineChartLabels: months
    }
  
    console.log(results)
    for (let resultsIndex in results) {
      let result = results[resultsIndex];
  
      for (let i = 0; i < monthsCount; i++) {
        siteBar.teacherSupport[i] += result.teacherSupport[i]
        siteBar.noSupport[i] += result.noSupport[i]
        siteBar.ac[i] += result.ac[i]
        siteBar.noAC[i] += result.noAC[i]

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
        siteBar.totalIntervals[i] += result.totalIntervals[i]
        siteBar.totalSupport[i] += result.totalSupport[i]
      }
    }
  
    for (let i = 0; i < monthsCount; i++) {
      siteBar.teacherSupport[i] = parseFloat((siteBar.teacherSupport[i] / siteBar.totalSupport[i]).toFixed(2)) * 100;
      siteBar.ac[i] = parseFloat((siteBar.ac[i] / siteBar.totalIntervals[i]).toFixed(2)) * 100;
      siteBar.noSupport[i] = parseFloat((siteBar.noSupport[i] / siteBar.totalSupport[i]).toFixed(2)) * 100; 
      siteBar.noAC[i] = parseFloat((siteBar.noAC[i] / siteBar.totalIntervals[i]).toFixed(2)) * 100;
  
      if (isNaN(siteBar.teacherSupport[i])) {
        siteBar.teacherSupport[i] = 0
      } 
      if (isNaN(siteBar.noSupport[i])) {
        siteBar.noSupport[i] = 0
      } 
      if (isNaN(siteBar.ac[i])) {
        siteBar.ac[i] = 0
      } 
      if (isNaN(siteBar.noAC[i])) {
        siteBar.noAC[i] = 0
      } 
    }
  
    results.siteBar = siteBar;
    console.log(results)
    return results;
  }




}


export default TrendData;
