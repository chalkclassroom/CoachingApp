import {
    Button,
    FormControl,
    FormHelperText,
    Grid,
    Item,
    Input,
    InputLabel,
    Typography,
    withStyles,
    MenuItem,
    Select,
    TextField,
    Checkbox,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Tab,
    Tabs,
    Radio,
    RadioGroup
} from '@material-ui/core'

import CalendarIcon from '../../assets/icons/CalendarIcon.png';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import * as React from 'react';
import { Component } from 'react';
import Firebase, { FirebaseContext } from '../../components/Firebase'

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import TeacherProfileBarDetails from './TeacherProfileBarDetails'
import GraphHeader from '../LayoutComponents/GraphLayouts/GraphHeader'
import BarChartLegend from '../LayoutComponents/GraphLayouts/BarChartLegend'

import AveragesChart from './ResultsComponents/AveragesChart'

import { Line } from 'react-chartjs-2'
import TwoTabbedSwitch from '../LayoutComponents/TwoTabbedSwitch'
import TabBarWrapper from '../LayoutComponents/TabBarWrapper'

import AveragesData from './DataRetrieval/Averages';
import TrendData from './DataRetrieval/Trends';
import RadioSets from './RadioSets';



const centerRow = {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    marginBottom: 8
}
const startRow = {
    display:'flex',
    alignItems:'center',
    justifyContent:'flex-start',
    marginBottom: 8
}
const endRow = {
    display:'flex',
    alignItems:'center',
    justifyContent:'flex-end',
    marginBottom: 8
}


const startColumn = {
  display:'flex',
  flexDirection: 'column',
  alignItems:'flex-start',
  justifyContent:'flex-start',
  marginBottom: 8
}

const centerColumn = {
  display:'flex',
  flexDirection: 'column',
  alignItems:'center',
  justifyContent:'flex-start',
  marginBottom: 8
}

const switcherButton = {
  padding: '20px 30px',
  fontSize: 20,
  background: '#f3f3f3'
}

const LineGraphOptions = {
  maintainAspectRatio: false,
  showScale: true,
  pointDot: true,
  showLines: true,
  tooltips: {
    mode: 'index',
    intersect: false,
  },
  hover: {
    mode: 'nearest',
    intersect: true,
  },
  scales: {
    xAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Date',
          fontFamily: 'Arimo',
          fontSize: 18,
          fontColor: 'black',
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 100,
          callback: function(value: number): string {
            return value + '%'
          },
        },
        scaleLabel: {
          display: true,
          labelString: '% of 1-minute Intervals',
          fontFamily: 'Arimo',
          fontSize: 18,
          fontColor: 'black',
        },
      },
    ],
  },
  plugins: {
    datalabels: {
      display: 'auto',
      color: 'gray',
      align: 'right',
      formatter: function(value: number): string {
        return value + '%'
      },
    },
  },
}

// Array used to match the name of a practice to the value that's saved
const practicesArr = {
  "transitionTime": "Transition Time",
  "classroomClimate": "Classroom Climate",
  "mathInstruction": "Math Instruction",
  "levelOfInstruction": "Level of Instruction",
  "studentEngagement": "Student Engagement",
  "listeningToChildren": "Listening to Children",
  "sequentialActivities": "Sequential Activities",
  "foundationSkills": "Foundation Skills",
  "writing": "Writing",
  "bookReading": "Book Reading",
  "languageEnvironment": "Language Environment",
  "associativeAndCooperative": "Associative and Cooperative",
}

// Array used to match the default radio value based on the type
const radioValueArr = {
  "transitionTime": "lineAverage",
  "classroomClimate": "nonspecificapprovalAverage",
  "mathInstruction": "mathVocabularyAverage",
  "levelOfInstruction": "hlqAverage",
  "studentEngagement": "offTaskAverage",
  "listeningToChildren": "eyeLevelAverage",
  "sequentialActivities": "sequentialActivitiesAverage",
  "foundationSkills": "foundationalSkillsAverage",
  "writing": "writingSkillsAverage",
  "bookReading": "bookReadingAverage",
  "languageEnvironment": "languageEnvironmentAverage",
  "associativeAndCooperative": "childrensPlayAverage",
}

// Set array so we can edit the label on top of the Chart based on type
const chartTitleArr = {
  bookReadingAverage: "Book Reading: Total Instruction",
  vocabFocusAverage: "Book Reading: Focuses on Vocabulary",
  languageConnectionsAverage: "Book Reading: Makes Connections",
  childrenSupportAverage: "Book Reading: Support Children's Speaking",
  fairnessDiscussionsAverage: "Book Reading: Facilitate Discussions",
  multimodalInstructionAverage: "Book Reading: Use Multimodal Instruction",
}

class TeacherProfileResults extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        lineGraphData: {},
        tabState: 0,
        reportDate: new Date(),
        siteCoaches: [],
        teacherInfo: [],
        teacherNames: [],
        radioValue: radioValueArr[this.props.observationType],
        BQData: [],
        averagesClass: new AveragesData(),
        trendsClass: new TrendData(),
        chosenAveragesData: [],
        averages: [],
        trends: [],
        trendsDataSet: [
          {
            label: 'Dataset 1',
            data: [2,7,3,5,4,6,8,2,7,8,9,1],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
        lineColors: [],
      }
  }

  componentDidMount(): void {
    const firebase = this.context;

    // Get a list of the coaches for the chosen site.
    firebase.getUserProgramOrSite({siteId: this.props.selectedSiteId}).then((data) => {

      // Save the teachers' information to the state.
      if(data.coaches)
      {
        this.getSitesTeachersInfo(data.coaches)
      }

    });

  }

  /*
   * Get the info of eache teacher in the site
   */
  getSitesTeachersInfo = async (coaches) => {
      const firebase = this.context;

      var coachIdsArr = coaches;
      this.setState({siteCoaches: coachIdsArr});

      // Gather information for each coach.
      var teacherResults = [];
      var teacherNames = [];

      // Go through each coach in the site
      for(var coachIndex in coachIdsArr)
      {
        var coachId = coachIdsArr[coachIndex];

        // Get the the coaches teacher
        var teachersIdList = await firebase.getTeacherListFromUser({userId: coachId});


        // Get all information for all the teachers
        var teachersList = await firebase.getMultipleUserProgramOrSite({userIds: teachersIdList});

        teacherResults = teacherResults.concat(teachersList);

        // Remove any duplicates from the teachers
        teacherResults = teacherResults.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i)

        // Set teachers names
        var tempTeacherNames = teachersList.map( (teacher, index) => {return teacher.firstName + " " + teacher.lastName});

        teacherNames = teacherNames.concat(tempTeacherNames);


      }



      this.setState({teacherInfo: teacherResults});
      this.setState({teacherNames: teacherNames});

      this.getResultsFromBQ(teacherResults);

  }

  /*
   * Get all the Results data from each of the teachers between the two given dates
   */
  getResultsFromBQ = (teachers) => {
    const firebase = this.context;

    // Grab results data
    firebase.fetchTeacherProfileAverages({type: this.props.observationType, startDate: this.props.startDate, endDate: this.props.endDate, teacherIds: teachers})
      .then( (data) => {
        this.setState({BQData: data});
        this.calculateResultsForCharts(data, teachers);
      });

  }


  /*
   * Calculate results for the charts using the rows of data from BQ results
   */
   calculateResultsForCharts = (data, teachers) => {

     // Excute function based on observation type
     var averages, trends;
     switch (this.props.observationType) {
       case "transitionTime":
         averages = this.state.averagesClass.calculateTransitionAverage(data, teachers);
         trends = this.state.trendsClass.calculateTransitionTrends(data, teachers, this.props.startDate, this.props.endDate);
         break;
       case "classroomClimate":
         averages = this.state.averagesClass.calculateClimateAverage(data, teachers);
         trends = this.state.trendsClass.calculateClimateTrends(data, teachers, this.props.startDate, this.props.endDate);
         break;
       case "mathInstruction":
         averages = this.state.averagesClass.calculateMathAverages(data, teachers);
         trends = this.state.trendsClass.calculateMathTrends(data, teachers, this.props.startDate, this.props.endDate);
         break;
       case "levelOfInstruction":
         averages = this.state.averagesClass.calculateLevelInstructionAverages(data, teachers);
         trends = this.state.trendsClass.calculateLevelInstructionTrends(data, teachers, this.props.startDate, this.props.endDate);
         break;
       case "studentEngagement":
         averages = this.state.averagesClass.calculateStudentEngagementAverages(data, teachers);
         trends = this.state.trendsClass.calculateStudentEngagementTrends(data, teachers, this.props.startDate, this.props.endDate);
         break;
       case "listeningToChildren":
         averages = this.state.averagesClass.calculateListeningToChildrenAverages(data, teachers);
         trends = this.state.trendsClass.calculateListeningToChildrenTrends(data, teachers, this.props.startDate, this.props.endDate);
         break;
       case "sequentialActivities":
         averages = this.state.averagesClass.calculateSequentialActivitiesAverages(data, teachers);
         trends = this.state.trendsClass.calculateSequentialActivitiesTrends(data, teachers, this.props.startDate, this.props.endDate);
         break;
       case "foundationSkills":
         averages = this.state.averagesClass.calculateFoundationalSkillsAverages(data, teachers);
         trends = this.state.trendsClass.calculateFoundationalSkillsTrends(data, teachers, this.props.startDate, this.props.endDate);
         break;
       case "writing":
         averages = this.state.averagesClass.calculateWritingSkillsAverages(data, teachers);
         trends = this.state.trendsClass.calculateWritingSkillsTrends(data, teachers, this.props.startDate, this.props.endDate);
         break;
       case "bookReading":
         averages = this.state.averagesClass.calculateBookReadingAverages(data, teachers);
         trends = this.state.trendsClass.calculateBookReadingTrends(data, teachers, this.props.startDate, this.props.endDate);
         break;
       case "languageEnvironment":
         averages = this.state.averagesClass.calculateLanguageEnvironmentAverages(data, teachers);
         trends = this.state.trendsClass.calculateLanguageEnvironmentTrends(data, teachers, this.props.startDate, this.props.endDate);
         break;
       case "associativeAndCooperative":
         averages = this.state.averagesClass.calculateACAverages(data, teachers);
         trends = this.state.trendsClass.calculateACTrends(data, teachers, this.props.startDate, this.props.endDate);
         break;

       default:
         break;
     }
     this.setState({averages: averages, trends: trends});

     // Build data for line graph
     this.setLineGraphData(teachers, this.state.radioValue)

   }


   // Set Line Graph data
   setLineGraphData = (teachers, type) => {

     var trends = this.state.trends;

     var tempDataSet = [];
     var lineColors = this.state.lineColors;
     var i = 0;
     for(var teacherIndex in teachers)
     {
       var teacher = teachers[teacherIndex];
       var fullName = teacher.firstName + " " + teacher.lastName;

       var chosenData = trends[teacher.id][type];

       // Round off all the numbers
        chosenData = chosenData.map(function(each_element){
         return Math.round((each_element + Number.EPSILON) * 100) / 100;
        });

       // If there isn't a color set for this teacher, set it
       if(!lineColors[i])
       {
         lineColors[i] = this.randomRgbColor();
       }
       var tempData = {
         label: fullName,
         data: chosenData,
         borderColor: lineColors[i],
       };

       tempDataSet.push(tempData);
       i++;
     }

     const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'];
     const lineData = {
       labels,
       datasets: tempDataSet
     };

     this.setState({lineGraphData: lineData, lineColors: lineColors});
   }

   // Handle downloading the PDF
   downloadPDF = () => {
     console.log("Downloading!");
     const input = document.getElementById('TeacherProfileResultsContainer');
      html2canvas(input)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = 190;
          const pageHeight = 265;
          const imgHeight = canvas.height * imgWidth / canvas.width;
          let heightLeft = imgHeight;
          const pdf = new jsPDF('p', 'mm', 'a4', true); // true compresses the pdf
          let position = 10;
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }

          const currDate = new Date();


          pdf.save("Site_Profile_Results_" + currDate.getMonth() + '_' + currDate.getDate() + "_" + currDate.getFullYear() + ".pdf");
        });
   }

  // When any of the checkboxes are checked or unchecked
  handleCheckboxChange = (event: SelectChangeEvent) => {

    // If we're checking it, add to array
    if(event.target.checked)
    {
      this.setState({checked:[...this.state.checked, event.target.name]});
    }
    // If we're unchecking it, we need to take it out of the array.
    else
    {
      this.setState({checked: this.state.checked.filter(function(item) {
        return item !== event.target.name;
      })});
    }

  };


  // When any of the radio buttons are selected
  handleRadioChange = (event: SelectChangeEvent) => {
      this.setState({radioValue: event.target.value});

      this.setLineGraphData(this.state.teacherInfo, event.target.value);
  };

  // When any of the date dropdowns are changed
  handleDateChange = (event: SelectChangeEvent) => {
    const dateVal = new Date(event.target.value);
    this.setState({[event.target.name]: dateVal});
  };

  // When any of the date dropdowns are changed
  handleTabChange = (event: React.SyntheticEvent<{}>, newValue: any) => {
    this.setState({tabState: newValue});
  }

  randomRgbColor = () => {
    return "rgba(" + this.randomInteger(255) + ", " + this.randomInteger(255) + ", " + this.randomInteger(255) + ")";
  }

  randomInteger = (max) => {
      return Math.floor(Math.random()*(max + 1));
  }


    render() {

      return (
        <div id="TeacherProfileResultsContainer">

        <Grid container style={{paddingLeft: '30px', paddingRight: '30px', marginBottom: '30px'}}>
            <Grid container>
                <Grid item xs={12} style={{paddingTop: 12}} onClick={() => this.props.handlePageChange(1)}>
                    <span>&#12296; Back to Report Criteria</span>
                </Grid>

                <Grid item xs={12}>
                    <h2>Teacher Profile</h2>
                </Grid>

                {/*
                  Profile information section
                */}
                <Grid container item xs={12} style={startColumn}>
                  <Grid style={startRow}>Teacher: {this.props.selectedTeacherName}</Grid>
                  <Grid style={startRow}>CHALK Practice: {practicesArr[this.props.selectedPractices]}</Grid>
                  <Grid style={startRow}>Report Period: {this.props.startDate.toLocaleString("en-US", {month: "long", year: "numeric", day: "numeric", timeZone: 'UTC'})} - {this.props.endDate.toLocaleString("en-US", {month: "long", year: "numeric", day: "numeric", timeZone: 'UTC'})}</Grid>
                  <Grid style={startRow}>Generated on: {this.state.reportDate.toLocaleString("en-US", {month: "long", year: "numeric", day: "numeric", timeZone: 'UTC'})}</Grid>
                </Grid>


                {/*
                    The checklists
                */}
                <RadioGroup aria-label="gender" name="gender1" value={this.state.radioValue} onChange={this.handleRadioChange} style={{width: '100%'}}>
                  <RadioSets type={this.props.observationType} />
                </RadioGroup>


                {/*
                    The chart switcher
                */}
                <Grid container style={centerRow}>
                  <Grid xs={8}>
                    <TabBarWrapper
                      handleChange={this.handleTabChange}
                      tabOneLabel={"Averages"}
                      tabTwoLabel={"Trends"}
                      value={this.state.tabState}
                    />
                  </Grid>
                </Grid>


                {/*
                  The "averages" bar graph and "trends" line graph
                */}
                <Grid item xs={12} style={centerColumn}>
                  {this.state.tabState == 1 ? (
                    <AveragesChart
                      lowLevel={this.state.chosenAveragesData}
                    />

                  ) : (this.state.tabState == 0 ? (

                    <Grid container justify={"center"} direction={"column"} style={{height: 450, flexWrap: 'nowrap', padding: "30px 0px"}}>
                      <GraphHeader graphTitle={chartTitleArr[this.state.radioValue]} />

                      <TeacherProfileBarDetails
                        totalVisits={10}
                        labels={this.state.teacherNames}
                        data={this.state.averages}
                        type={this.state.radioValue}
                      />
                    </Grid>
                  ) : null)}

                </Grid>

                {/*
                    The "averages" bar graph
                */}
                <Grid item xs={12} style={centerColumn}>

                </Grid>

                {/*
                  Download PDF button
                  */}
                <Grid item xs={12} style={centerRow}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.downloadPDF()}
                    >
                    Download as PDF
                  </Button>
                </Grid>
            </Grid>
        </Grid>
        </div>
        )
    }
  }

TeacherProfileResults.contextType = FirebaseContext

export default TeacherProfileResults;