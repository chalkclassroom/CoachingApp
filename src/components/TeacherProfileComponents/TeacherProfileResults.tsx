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
  Slider,
  TextField,
  Checkbox,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Tab,
  Tabs,
  Radio,
  RadioGroup,
} from '@material-ui/core'

import { createTheme, ThemeProvider } from '@material-ui/core/styles';


import CalendarIcon from '../../assets/icons/CalendarIcon.png'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import * as React from 'react'
import { Component } from 'react'
import Firebase, { FirebaseContext } from '../../components/Firebase'

import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

import TeacherProfileBarDetails from './TeacherProfileBarDetails'
import GraphHeader from '../LayoutComponents/GraphLayouts/GraphHeader'
import BarChartLegend from '../LayoutComponents/GraphLayouts/BarChartLegend'

import AveragesChart from './ResultsComponents/AveragesChart'
import ReadingTrendsTable from './ResultsComponents/ReadingTrendsTable'

import { Line } from 'react-chartjs-2'
import TwoTabbedSwitch from '../LayoutComponents/TwoTabbedSwitch'
import TabBarWrapper from '../LayoutComponents/TabBarWrapper'
import CHALKLogoGIF from '../../assets/images/CHALKLogoGIF.gif'

import AveragesData from './DataRetrieval/Averages'
import TrendData from './DataRetrieval/Trends'
import RadioSets from './RadioSets'

const centerRow = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 8,
}
const startRow = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginBottom: 8,
}
const endRow = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginBottom: 8,
}

const startColumn = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  marginBottom: 8,
}

const centerColumn = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginBottom: 8,
}

const switcherButton = {
  padding: '20px 30px',
  fontSize: 20,
  background: '#f3f3f3',
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
  transitionTime: 'Transition Time',
  classroomClimate: 'Classroom Climate',
  mathInstruction: 'Math Instruction',
  levelOfInstruction: 'Level of Instruction',
  studentEngagement: 'Student Engagement',
  listeningToChildren: 'Listening to Children',
  sequentialActivities: 'Sequential Activities',
  foundationSkills: 'Foundation Skills',
  writing: 'Writing',
  bookReading: 'Book Reading',
  languageEnvironment: 'Language Environment',
  associativeAndCooperative: 'Associative and Cooperative',
}

// Array used to match the default radio value based on the type
const radioValueArr = {
  transitionTime: 'line',
  classroomClimate: 'nonspecificapproval',
  mathInstruction: 'mathVocabulary',
  levelOfInstruction: 'hlq',
  studentEngagement: 'offTask',
  listeningToChildren: 'eyeLevel',
  sequentialActivities: 'sequentialActivities',
  foundationSkills: 'foundationalSkills',
  writing: 'writingSkills',
  bookReading: 'bookReading',
  languageEnvironment: 'languageEnvironment',
  associativeAndCooperative: 'childrensPlay',
}

// Set array so we can edit the label on top of the Chart based on type
const chartTitleArr = {
  lineAverage: 'Waiting in Line',
  travelingAverage: 'Traveling',
  waitingAverage: 'Children Waiting',
  routinesAverage: 'Classroom Routines',
  behaviorManagementAverage: 'Behavior Management',
  otherAverage: 'Traveling',
  travelingAverage: 'Other',

  nonspecificapprovalAverage: 'General Approval',
  specificapprovalAverage: 'Specific Approval',
  disapprovalAverage: 'Disapproval',
  redirectionAverage: 'Redirection',

  mathVocabularyAverage: 'Using Math Vocabulary',
  askingQuestionsAverage: 'Asking Questions About Math Concepts',
  mathConceptsAverage: 'Demonstrating Math Concepts',
  helpingChildrenAverage: 'Helping Children Use Math to Problem Solve',
  notAtCenterAverage: 'Teacher Not at Center',
  noSupportAverage: 'No Support',
  supportAverage: 'Teacher Support',
  totalInstructionsAverage: 'Total Instruction',

  hlqAverage: 'Teacher Asks High-Level Question',
  hlqResponseAverage: 'Child Answers High-Level Question',
  llqAverage: 'Teacher Asks Low-Level Question',
  llqResponseAverage: 'Child Answers Low-Level Question',

  offTaskAverage: 'Off Task',
  mildlyEngagedAverage: 'Mildly Engaged',
  engagedAverage: 'Engaged',
  highlyEngagedAverage: 'Highly Engaged',

  eyeLevelAverage: 'At Eye Level',
  positiveExpressionAverage:
    'Uses positive or interested expression to encourage child talk',
  repeatsAverage: 'Repeats or clarifies',
  openEndedQuestionsAverage: 'Asks open-ended questions',
  extendsPlayAverage: "Expands on children's play or talk",
  encouragesPeerTalkAverage: 'Encourages peer talk',
  encouragingAverage: 'Listening/Encouraging',
  noBehaviorsAverage: 'No Target Behaviors Observed',

  sequentialActivitiesAverage:
    'Helping children do sequential activities with manipulatives or toys',
  drawImagesAverage:
    'Supporting children as they draw images or write messages',
  demonstrateStepsAverage: 'Demonstrating the steps to an activity or game',
  actOutAverage:
    'Supporting children as they act out a dramatic play scenario or book',
  supportAverage: 'Teacher Support for Sequential Activities',
  noSupportAverage: 'Teacher Present, No Support',
  notAtCenterAverage: 'Teacher Not at Center',

  foundationalSkillsAverage: 'Literacy Instruction - Total Instruction',
  phonologicalAverage: 'Phonological awareness or the sounds of language',
  alphabeticAverage: 'The alphabetic principle and print concepts',
  openEndedQuestionsAverage: 'Open-ended questions or prompts',
  realisticReadingAverage: 'Realistic reading and writing',
  multimodalInstructionAverage: 'Multimodal Instruction',

  writingSkillsAverage: 'Writing Instruction - Total Instruction',
  meaningAverage: 'The content or meaning of the writing',
  printProcessesAverage: 'Print processes',

  bookReadingAverage: 'Book Reading: Total Instruction',
  vocabFocusAverage: 'Focuses on Vocabulary',
  languageConnectionsAverage: 'Reading: Makes Connections',
  childrenSupportAverage: "Support Children's Speaking",
  fairnessDiscussionsAverage: 'Facilitate Discussions',
  multimodalInstructionAverage: 'Use Multimodal Instruction',

  languageEnvironmentAverage: 'Language Environment - Total Instruction',
  talkAverage: 'Talk with children about vocabulary or social-emotional topics',
  encourageChildrenAverage: 'Encourage children to talk',
  respondChildrenAverage: 'Respond to children',

  childrensPlayAverage: "Participating in children's play",
  askingQuestionsAverage: "Asking questions to extend children's thinking",
  encouragingChildrenAverage: 'Encouraging children to share',
  helpingChildrenAverage: 'Helping children find the words to communicate',
  supportAverage:
    "Supported children's associative and cooperative interactions",
  noSupportAverage:
    'Was present in the center but did not support associative and cooperative interactions',
  notAtCenterAverage: 'Was not present in the centers observed',
}

// Set the colors for the trends line graph
const barColorChoices = {
  "classroomClimate" : {
    "Specific Approval": "#0988EC",
    "General Approval": "#094492",
    "Redirection": "#FFA812",
    "Disapproval": "#FF7F00",
  },
  "transitionTime" : {
    "Waiting in Line": "#AED581",
    "Traveling": "#FFA726",
    "Children Waiting": "#FF7043",
    "Classroom Routines": "#64B5F6",
    "Behavior Management": "#FF5252",
    "Other": "#536DFE",
  },
  "mathInstruction" : {
    "useForAll": "#459AEB",
  },
  "levelOfInstruction" : {
    "Teacher Asks High-Level Question": "#38761D",
    "Child Answers High-Level Question": "#38761D",
    "Teacher Asks Low-Level Question": "#1155CC",
    "Child Answers Low-Level Question": "#1155CC",
  },
}


class TeacherProfileResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lineGraphData: {},
      tabState: 0,
      reportDate: new Date(),
      siteCoaches: [],
      teacherInfo: [],
      teacherNames: [],
      radioValue: '',
      BQData: [],
      averagesClass: new AveragesData(),
      trendsClass: new TrendData(),
      chosenAveragesData: [],
      averages: [],
      trends: [],
      trendsDataSet: [
        {
          label: 'Dataset 1',
          data: [2, 7, 3, 5, 4, 6, 8, 2, 7, 8, 9, 1],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
      usingTime: false,
      lineColors: [],
      teacherTrends: [],
      widenTable: false,
      observationTime: '',

      showErrorMessage: false,
      errorMessage: '',
    }
  }

  componentDidMount(): void {
    const firebase = this.context

    // Get data from BQ
    this.getResultsFromBQ(this.props.selectedTeacherId)

    if (this.props.observationType == 'bookReading') {
      firebase
        .fetchTeacherProfileReadingTrend(
          this.props.selectedTeacherId,
          'Teacher',
          this.props.startDate,
          this.props.endDate
        )
        .then(trends => {
          this.setState({
            teacherTrends: trends,
          })
        })
    }
  }

  /*
   * Get all the Results data from this teacher between the two given dates
   */
  getResultsFromBQ = teacherId => {
    const firebase = this.context

    // Grab results data
    firebase
      .fetchTeacherProfileAverages({
        type: this.props.observationType,
        startDate: this.props.startDate,
        endDate: this.props.endDate,
        teacherId: teacherId,
      })
      .then(data => {
        this.setState({ BQData: data })

        // Check if there is data, need to show message if not
        if (data.length <= 0) {
          this.setState({
            showErrorMessage: true,
            errorMessage: `No reports available for ${
              practicesArr[this.props.observationType]
            }`,
          })
        } else {
          this.calculateResultsForCharts(data, teacherId)
        }
        console.log('DATA => ', data)
      })
  }

  /*
   * Calculate results for the charts using the rows of data from BQ results
   */
  calculateResultsForCharts = async (data, teacherId) => {
    const firebase = this.context

    // Get all the info for the teacher
    var teacher = await firebase.getUserProgramOrSite({ userId: teacherId })
    this.setState({ teacherInfo: teacher })

    // Excute function based on observation type
    var averages, trends
    var usingTime = false
    switch (this.props.observationType) {
      case 'transitionTime':
        averages = this.state.averagesClass.calculateTransitionAverage(
          data,
          teacher
        )
        trends = this.state.trendsClass.calculateTransitionTrends(
          data,
          teacher,
          this.props.startDate,
          this.props.endDate
        )
        usingTime = true
        break
      case 'classroomClimate':
        averages = this.state.averagesClass.calculateClimateAverage(
          data,
          teacher
        )
        trends = this.state.trendsClass.calculateClimateTrends(
          data,
          teacher,
          this.props.startDate,
          this.props.endDate
        )
        break
      case 'mathInstruction':
        averages = this.state.averagesClass.calculateMathAverages(data, teacher)
        trends = this.state.trendsClass.calculateMathTrends(
          data,
          teacher,
          this.props.startDate,
          this.props.endDate
        )
        break
      case 'levelOfInstruction':
        averages = this.state.averagesClass.calculateLevelInstructionAverages(
          data,
          teacher
        )
        trends = this.state.trendsClass.calculateLevelInstructionTrends(
          data,
          teacher,
          this.props.startDate,
          this.props.endDate
        )
        break
      case 'studentEngagement':
        averages = this.state.averagesClass.calculateStudentEngagementAverages(
          data,
          teacher
        )
        trends = this.state.trendsClass.calculateStudentEngagementTrends(
          data,
          teacher,
          this.props.startDate,
          this.props.endDate
        )
        break
      case 'listeningToChildren':
        averages = this.state.averagesClass.calculateListeningToChildrenAverages(
          data,
          teacher
        )
        trends = this.state.trendsClass.calculateListeningToChildrenTrends(
          data,
          teacher,
          this.props.startDate,
          this.props.endDate
        )
        break
      case 'sequentialActivities':
        averages = this.state.averagesClass.calculateSequentialActivitiesAverages(
          data,
          teacher
        )
        trends = this.state.trendsClass.calculateSequentialActivitiesTrends(
          data,
          teacher,
          this.props.startDate,
          this.props.endDate
        )
        break
      case 'foundationSkills':
        averages = this.state.averagesClass.calculateFoundationalSkillsAverages(
          data,
          teacher
        )
        trends = this.state.trendsClass.calculateFoundationalSkillsTrends(
          data,
          teacher,
          this.props.startDate,
          this.props.endDate
        )
        break
      case 'writing':
        averages = this.state.averagesClass.calculateWritingSkillsAverages(
          data,
          teacher
        )
        trends = this.state.trendsClass.calculateWritingSkillsTrends(
          data,
          teacher,
          this.props.startDate,
          this.props.endDate
        )
        break
      case 'bookReading':
        averages = this.state.averagesClass.calculateBookReadingAverages(
          data,
          teacher
        )
        trends = this.state.trendsClass.calculateBookReadingTrends(
          data,
          teacher,
          this.props.startDate,
          this.props.endDate
        )
        break
      case 'languageEnvironment':
        averages = this.state.averagesClass.calculateLanguageEnvironmentAverages(
          data,
          teacher
        )
        trends = this.state.trendsClass.calculateLanguageEnvironmentTrends(
          data,
          teacher,
          this.props.startDate,
          this.props.endDate
        )
        break
      case 'associativeAndCooperative':
        averages = this.state.averagesClass.calculateACAverages(data, teacher)
        trends = this.state.trendsClass.calculateACTrends(
          data,
          teacher,
          this.props.startDate,
          this.props.endDate
        )
        break

      default:
        break
    }

    if (averages[teacherId].totalTime) {
      var observationTime = this.convertMillisecondsToMinutes(
        averages[teacherId].totalTime
      )
      this.setState({ observationTime: observationTime })
    }

    this.setState({ averages: averages, trends: trends, usingTime: usingTime })

    // Build data for line graph
    this.setLineGraphData(teacher, this.state.radioValue)
  }

  // Set Line Graph data
  setLineGraphData = (teacher, type) => {
    var trends = this.state.trends

    var tempDataSet = []
    var lineColors = this.state.lineColors
    var i = 0

    // Go through each trends and save the averages in the dataset so there's a line for each answer type
    var teachersTrends = trends[teacher.id]

    // Get the number of lines we're going to make
    var lineLength = 0;
    for (var trendIndex in teachersTrends) {
      // Make sure we're only grabbing the averages, also not the data that was used for calculations
      if (trendIndex.includes('Average')) {
        lineLength++;
      }
    }

    // Check if this observation type has individual colors for each answer type or the same for all
    var useColorForAll = false;
    var colorToUse = "#AAAAAA";
    if(barColorChoices[this.props.observationType]["useForAll"])
    {
      useColorForAll = true;
      colorToUse = barColorChoices[this.props.observationType]["useForAll"];
    }

    for (var trendIndex in teachersTrends) {
      // Make sure we're only grabbing the averages, also not the data that was used for calculations
      if (
        !trendIndex.includes('Average') ||
        trendIndex === 'totalObservedAverage' ||
        trendIndex === 'totalInstructionsAverage'
      ) {
        continue
      }

      var trendData = trends[teacher.id][trendIndex]

      // Round off all the numbers
      trendData = trendData.map(function(each_element) {
        return Math.round((each_element + Number.EPSILON) * 100) / 100
      })

      var trendLabel = chartTitleArr[trendIndex] ? chartTitleArr[trendIndex] : trendIndex

      // If there isn't a color set for this teacher, set it
      if (!lineColors[i]) {
        // If there isn't a single color to use for all of them
        if(!useColorForAll)
        {
          lineColors[i] = barColorChoices[this.props.observationType][trendLabel]
        }
        else
        {
          lineColors[i] = colorToUse;
        }
        //lineColors[i] = barColorChoices[this.props.observationType][i % lineLength]
      }
      var tempData = {
        label: trendLabel,
        data: trendData,
        borderColor: lineColors[i],
        fill: false,
        tension: 0.0,
        borderDash: (trendIndex === "hlqResponseAverage" || trendIndex === "llqResponseAverage") ? [5,5] : [0,0]
      }

      tempDataSet.push(tempData)
      i++
    }

    const labels = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const lineData = {
      labels,
      datasets: tempDataSet,
    }

    console.log('Line Data => ', lineData)

    this.setState({ lineGraphData: lineData, lineColors: lineColors })
  }

  // Handle downloading the PDF
  downloadPDF = () => {
    console.log('Downloading!')

    var tableWrap = document.getElementById('tableWrap')

    if (tableWrap) {
      tableWrap.style.maxWidth = 'none'
    }

    const input = document.getElementById('TeacherProfileResultsContainer')
    html2canvas(input)
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png')
        const imgWidth = 190
        const pageHeight = 265
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        let heightLeft = imgHeight
        const pdf = new jsPDF('p', 'mm', 'a4', true) // true compresses the pdf
        let position = 10
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight
          pdf.addPage()
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
          heightLeft -= pageHeight
        }

        const currDate = new Date()

        pdf.save('Site_Teacher_Results_' + currDate.getMonth() + '_' + currDate.getDate() + '_' + currDate.getFullYear() + '.pdf'
        )
      })
      .then(() => {
        if (tableWrap) {
          tableWrap.style.maxWidth = '75vw'
        }
      })
  }

  convertMillisecondsToMinutes(millis) {
    var minutes = Math.floor(millis / 60000)
    var seconds = ((millis % 60000) / 1000).toFixed(0)
    return minutes + 'm ' + (seconds < 10 ? '0' : '') + seconds + 's'
  }

  /*
   * When any of the radio buttons are selected
   */
  handleRadioChange = (event: SelectChangeEvent) => {
    this.setState({ radioValue: event.target.value })

    this.setLineGraphData(this.state.teacherInfo, event.target.value)
  }

  // When any of the date dropdowns are changed
  handleDateChange = (event: SelectChangeEvent) => {
    const dateVal = new Date(event.target.value)
    this.setState({ [event.target.name]: dateVal })
  }

  // When any of the date dropdowns are changed
  handleTabChange = (event: React.SyntheticEvent<{}>, newValue: any) => {
    this.setState({ tabState: newValue })
  }

  randomRgbColor = () => {
    return ('rgba(' + this.randomInteger(255) + ', ' + this.randomInteger(255) + ', ' + this.randomInteger(255) + ')')
  }

  randomInteger = max => {
    return Math.floor(Math.random() * (max + 1))
  }



  render() {

    const tempTheme = createTheme({
      overrides: {
        // Style sheet name ⚛️
        MuiSlider: {
          // Name of the rule
          track: {
            // Some CSS
            backgroundColor: '#FF8E53',
          },
        },
      },
    })

    /*
     * List of which observation types will display a bar graph
     */
    const barGraphObservationTypes = [
      "classroomClimate",
      "studentEngagement",
      "mathInstruction",
      "levelOfInstruction",
    ]

    return (
      <div id="TeacherProfileResultsContainer">
        <Grid
          container
          style={{
            paddingLeft: '30px',
            paddingRight: '30px',
            marginBottom: '30px',
          }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              style={{ paddingTop: 12 }}
              onClick={() => this.props.handlePageChange(1)}
            >
              <span>&#12296; Back to Report Criteria</span>
            </Grid>

            <Grid item xs={12}>
              <h2>Teacher Profile</h2>
            </Grid>

            {/*
                  Profile information section
                */}
            <Grid container item xs={12} style={startColumn}>
              <Grid style={startRow}>
                Teacher: {this.props.selectedTeacherName}
              </Grid>
              <Grid style={startRow}>
                CHALK Practice: {practicesArr[this.props.selectedPractices]}
              </Grid>
              <Grid style={startRow}>
                Report Period:{' '}
                {this.props.startDate.toLocaleString('en-US', {
                  month: 'long',
                  year: 'numeric',
                  day: 'numeric',
                  timeZone: 'UTC',
                })}{' '}
                -{' '}
                {this.props.endDate.toLocaleString('en-US', {
                  month: 'long',
                  year: 'numeric',
                  day: 'numeric',
                  timeZone: 'UTC',
                })}
              </Grid>
              <Grid style={startRow}>
                Generated on:{' '}
                {this.state.reportDate.toLocaleString('en-US', {
                  month: 'long',
                  year: 'numeric',
                  day: 'numeric',
                  timeZone: 'UTC',
                })}
              </Grid>
            </Grid>

            {/*
                    The checklists
                */}
                {/*
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={this.state.radioValue}
              onChange={this.handleRadioChange}
              style={{ width: '100%' }}
            >
              <RadioSets type={this.props.observationType} />
            </RadioGroup>
            */}

            {/*
                    The chart switcher
                */}
            <Grid container style={centerRow}>
              <Grid xs={8}>
                <TabBarWrapper
                  handleChange={this.handleTabChange}
                  tabOneLabel={'Averages'}
                  tabTwoLabel={'Trends'}
                  value={this.state.tabState}
                />
              </Grid>
            </Grid>

            {/*
                  The "averages" bar graph and "trends" line graph
                */}
            <Grid item xs={12} style={centerColumn}>
              {/* Show loading logo */}
              {Object.keys(this.state.averages).length <= 0 && !this.state.showErrorMessage ? (
                <img src={CHALKLogoGIF} alt="Loading" width="60%" />
              ) : null}

              {/* Show message if there are no observation data */}
              {Object.keys(this.state.averages).length >= 0 &&
              this.state.showErrorMessage ? (
                <h1>{this.state.errorMessage}</h1>
              ) : null}

              {/* Show trends line graph if trends tab is clicked and it's not book reading type */}
              {this.state.tabState == 1 &&
              this.props.observationType !== 'bookReading' &&
              Object.keys(this.state.averages).length > 0 &&
              !this.state.showErrorMessage ? (
                <Grid
                  container
                  justify={'center'}
                  direction={'column'}
                  style={{ height: 500 }}
                >
                  <Line
                    data={this.state.lineGraphData}
                    options={LineGraphOptions}
                  />
                </Grid>
              ) : this.state.tabState == 1 &&
                Object.keys(this.state.averages).length > 0 &&
                this.props.observationType == 'bookReading' &&
                !this.state.showErrorMessage ? (
                <Grid
                  container
                  justify={'center'}
                  direction={'column'}
                  style={{ flexWrap: 'nowrap', padding: '30px 0px' }}
                >
                  {/* Show trends line graph if trends tab is clicked and it IS not book reading type */}
                  <ReadingTrendsTable
                    data={this.state.teacherTrends}
                    who={'Teacher'}
                    widenTable={this.state.widenTable}
                  />
                </Grid>
              ) : this.state.tabState == 0 &&
                Object.keys(this.state.averages).length > 0 &&
                !this.state.showErrorMessage ? (
                <Grid
                  container
                  justify={'center'}
                  direction={'column'}
                  style={{
                    height: 450,
                    flexWrap: 'nowrap',
                    padding: '30px 0px',
                  }}
                >
                  {/* Show averages pie chart */}
                  {/*
                  <AveragesChart
                    data={this.state.averages}
                    type={this.state.radioValue}
                    teacherId={this.props.selectedTeacherId}
                    usingTime={this.state.usingTime}
                  />
                  */}
              {barGraphObservationTypes.includes(this.props.observationType) ? (
                  <TeacherProfileBarDetails
                    totalVisits={10}
                    labels={this.state.teacherNames}
                    data={this.state.averages}
                    type={this.state.radioValue}
                    barColors={this.state.lineColors}
                    observationType={this.props.selectedPractices}
                    teacherId={this.props.selectedTeacherId}
                  />
                ) : null}

                </Grid>
              ) : null}
            </Grid>

            {/*
                  Total Length of Observation
                */}
                {/*
            <Grid item xs={12} style={centerColumn}>
              {this.state.observationTime !== '' ? (
                <span style={{ fontSize: '24px', marginBottom: '20px' }}>
                  Total Length of Observation: {this.state.observationTime}
                </span>
              ) : null}
            </Grid>
            */}

            {/*
              The tone rating slider
              */}
            {this.props.observationType == "classroomClimate" ? (
              <Grid style={{display: 'flex', flexWrap: 'no-wrap', justifyContent: 'center', width: '100%', paddingTop: '20px'}}>
                <h3 style={{whiteSpace: 'no-wrap', marginRight: '20px'}}>Teacher Tone</h3>
                <Slider
                  defaultValue={3}
                  aria-labelledby="discrete-slider-always"
                  step={1}
                  max={5}
                  style={{width: '300px',}}
                  marks={[
                    {
                      value: 0,
                      label: '0',
                    },
                    {
                      value: 1,
                      label: '1',
                    },
                    {
                      value: 2,
                      label: '2',
                    },
                    {
                      value: 3,
                      label: '3',
                    },
                    {
                      value: 4,
                      label: '4',
                    },
                    {
                      value: 5,
                      label: '5',
                    },
                  ]}
                  getAriaValueText={(string) => {return string + 'AYYE'}}
                  valueLabelDisplay="on"
                  disabled={true}
                  theme={tempTheme}
                />
              </Grid>
            ) : null}



            {/*
                  Download PDF button
                  */}
            <Grid item xs={12} style={centerRow}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.downloadPDF()}
                disabled={
                  this.state.showErrorMessage &&
                  Object.keys(this.state.averages).length <= 0 &&
                  this.state.BQData <= 0
                    ? true
                    : false
                }
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

export default TeacherProfileResults
