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

import ProgramProfileBarDetails from './ProgramProfileBarDetails'
import GraphHeader from '../LayoutComponents/GraphLayouts/GraphHeader'
import BarChartLegend from '../LayoutComponents/GraphLayouts/BarChartLegend'
import { BarWrapperDetails, LineWrapperTrends } from '../ResultsComponents/ChartWrappers'
import {  } from '../ResultsComponents/ChartWrappers'
import { Line } from 'react-chartjs-2'
import TwoTabbedSwitch from '../LayoutComponents/TwoTabbedSwitch'
import TabBarWrapper from '../LayoutComponents/TabBarWrapper'
import { GridWrapperDetails } from '../ResultsComponents/ChartWrappers'



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
  "associativeSndCooperative": "Associative and Cooperative",
}

class ProgramProfileResults extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        lineGraphData: {},
        tabState: 0,
        reportDate: new Date(),
        siteCoaches: [],
        teacherNames: [],
        radioValue: "total"
      }
  }

  componentDidMount(): void {
    const firebase = this.context;

    // Set the data for the line graph
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: [2,7,3,5,4,6,8,2,7,8,9,1],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Dataset 2',
          data: [5,2,5,7,1,6,8,3,1,2,7,6],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };

    this.setState({lineGraphData: data});

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
      for(var coachIndex in coachIdsArr)
      {
        var coachId = coachIdsArr[coachIndex];

        // Get the the coaches teacher
        var teachersIdList = await firebase.getTeacherListFromUser({userId: coachId});

        var teacherResults = [];
        var teacherNames = [];
        for(var teacherIndex in teachersIdList)
        {
          var teacherId = teachersIdList[teacherIndex];

          var tempTeacher = await firebase.getUserProgramOrSite({userId: teacherId});

          // Save all information
          teacherResults.push(tempTeacher);

          // Save just the names
          teacherNames.push(tempTeacher.firstName + " " + tempTeacher.lastName);
        }

        this.setState({teacherInfo: teacherResults});
        this.setState({teacherNames: teacherNames});

      }

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


  // When any of the checkboxes are checked or unchecked
  handleRadioChange = (event: SelectChangeEvent) => {
    // If we're checking it, add to array
      this.setState({radioValue: event.target.value});
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


    render() {

      return (
        <>

        <Grid container style={{paddingLeft: '30px', paddingRight: '30px'}}>
            <Grid container>
                <Grid item xs={12} style={{paddingTop: 12}} onClick={() => this.props.handlePageChange(1)}>
                    <span>&#12296; Back to Report Criteria</span>
                </Grid>

                <Grid item xs={12}>
                    <h2>Program Profile</h2>
                </Grid>

                {/*
                  Profile information section
                */}
                <Grid container item xs={12} style={startColumn}>
                  <Grid style={startRow}>Site: {this.props.selectedSiteName}</Grid>
                  <Grid style={startRow}>CHALK Practice: {this.props.selectedPractices.map((practiceId, i, arr) => { var practiceName = practicesArr[practiceId]; if (arr.length - 1 !== i) { practiceName += ", "}; return practiceName })}</Grid>
                  <Grid style={startRow}>Report Period: {this.props.startDate.toLocaleString("en-US", {month: "long", year: "numeric", day: "numeric", timeZone: 'UTC'})} - {this.props.endDate.toLocaleString("en-US", {month: "long", year: "numeric", day: "numeric", timeZone: 'UTC'})}</Grid>
                  <Grid style={startRow}>Generated on: {this.state.reportDate.toLocaleString("en-US", {month: "long", year: "numeric", day: "numeric", timeZone: 'UTC'})}</Grid>
                </Grid>


                {/*
                    The checklists
                */}
                <RadioGroup aria-label="gender" name="gender1" value={this.state.radioValue} onChange={this.handleRadioChange}>
                  <Grid container style={centerRow}>
                    <Grid item xs={6}>
                      <FormControl required error={this.state.error} component="fieldset" className={"checkboxesform"}>
                        <FormGroup>

                          <FormControlLabel
                            control={<Radio />}
                            label="Book Reading - Total Instruction"
                            value="total"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="Focus on vocabulary, concepts, or comprehension"
                            value="vocabulary"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="Make connections to children's language, cultural backgrounds, and experiences"
                            value="makeConnections"
                          />
                        </FormGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl required error={this.state.error} component="fieldset" className={"checkboxesform"}>
                        <FormGroup>
                          <FormControlLabel
                            control={<Radio />}
                            label="Support children's speaking and listening skills"
                            value="supportSpeaking"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="Facilitate discussions around equity and fairness"
                            value="facilitateDiscussions"
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="Use Multimodal Instruction"
                            value="multimodalInstruction"
                          />

                        </FormGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
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


                {/* The "averages" bar graph and "trends" line graph */}
                <Grid item xs={12} style={centerColumn}>
                  {this.state.tabState == 1 ? (
                    <Grid container justify="center" direction="column" alignItems="center" style={{height: 500}} >
                      <LineWrapperTrends>
                      <Line
                        data={this.state.lineGraphData}
                        options={LineGraphOptions}
                      />
                      </LineWrapperTrends>
                    </Grid>

                  ) : (this.state.tabState == 0 ? (

                    <Grid container justify="center" direction="column" alignItems="center" style={{height: 500, flexWrap: 'nowrap'}}>
                      <GraphHeader graphTitle={"Title"} />
                      <GridWrapperDetails>
                      <ProgramProfileBarDetails
                        math1={1}
                        math2={2}
                        math3={3}
                        math4={4}
                        totalVisits={10}
                        labels={this.state.teacherNames}
                      />
                      </GridWrapperDetails>
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
                    >
                    Download as PDF
                  </Button>
                </Grid>
            </Grid>
        </Grid>
        </>
        )
    }
  }

ProgramProfileResults.contextType = FirebaseContext

export default ProgramProfileResults;
