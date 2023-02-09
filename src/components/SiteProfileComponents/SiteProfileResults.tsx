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
  RadioGroup,
} from '@material-ui/core'

import CalendarIcon from '../../assets/icons/CalendarIcon.png'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import * as React from 'react'
import { Component } from 'react'
import Firebase, { FirebaseContext } from '../../components/Firebase'

import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

import SiteProfileBarDetails from './SiteProfileBarDetails'

import GraphHeader from '../LayoutComponents/GraphLayouts/GraphHeader'
import BarChartLegend from '../LayoutComponents/GraphLayouts/BarChartLegend'
import {
  BarWrapperDetails,
  LineWrapperTrends,
} from '../ResultsComponents/ChartWrappers'
import {} from '../ResultsComponents/ChartWrappers'
import { Line } from 'react-chartjs-2'
import TwoTabbedSwitch from '../LayoutComponents/TwoTabbedSwitch'
import TabBarWrapper from '../LayoutComponents/TabBarWrapper'
import CHALKLogoGIF from '../../assets/images/CHALKLogoGIF.gif'

import AveragesData from './DataRetrieval/Averages'
import TrendData from './DataRetrieval/Trends'
import RadioSets from './RadioSets'

import ClassroomClimateBarDetails from './Charts/ClassroomClimateBarDetails'
import ClassroomClimateTrends from './Charts/ClassroomClimateTrends'
import LevelOfInstructionBarDetails from './Charts/LevelOfInstructionBarDetails'
import StudentEngagementBarDetails from './Charts/StudentEngagementBarDetails'
import MathInstructionBarDetails from './Charts/MathInstructionBarDetails'
import ListeningToChildrenBarDetails from './Charts/ListeningToChildrenBarDetails'
import SequentialActivitiesBarDetails from './Charts/SequentialActivitiesBarDetails'
import ACBarDetails from './Charts/ACBarDetails'
import TransitionAverageBarDetails from './Charts/TransitionAverageBarDetails'
import LiteracyInstructionBarDetails from './Charts/LiteracyInstructionBarDetails'

const StyledSelect = withStyles({
  root: {
    padding: '11px 14px',
    width: '200px',
  },
  disabled: {
    opacity: 0.3,
  },
})(Select)

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
  legend: {
    display: false,
    position: 'top',
  },
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
  transitionTime: 'lineAverage',
  classroomClimate: 'nonspecificapprovalAverage',
  mathInstruction: 'teacherAverage',
  levelOfInstruction: 'hlqAverage',
  studentEngagement: 'offTaskAverage',
  listeningToChildren: 'eyeLevelAverage',
  sequentialActivities: 'teacherAverage',
  foundationSkills: 'foundationalSkillsAverage',
  writing: 'writingSkillsAverage',
  bookReading: 'bookReadingAverage',
  languageEnvironment: 'languageEnvironmentAverage',
  associativeAndCooperative: 'teacherAverage',
}

// Set array so we can edit the label on top of the Chart based on type
const chartTitleArr = {
  bookReadingAverage: 'Book Reading: Total Instruction',
  vocabFocusAverage: 'Book Reading: Focuses on Vocabulary',
  languageConnectionsAverage: 'Book Reading: Makes Connections',
  childrenSupportAverage: "Book Reading: Support Children's Speaking",
  fairnessDiscussionsAverage: 'Book Reading: Facilitate Discussions',
  multimodalInstructionAverage: 'Book Reading: Use Multimodal Instruction',
}

// Different observation types are going to show different data. This will be used to tell the program which ones to show for each type
const trendsToShow = {
  mathInstruction: {
    teacherMathBehavior: {
      notAtCenterMathAverage: '#FFFFFF',
      noSupportMathAverage: '#EC2409',
      supportMathAverage: '#459AEB',
    },
    childMathBehavior: {
      childNonMathAverage: '#EC2409',
      childMathAverage: '#094492',
    },
    studentEngagement: {
      dailyAverage: '#FF7F00',
      totalIntervals: '#FF7F00',
      totalPoints: '#FF7F00',
    },
  },
}

// Set the colors for the trends line graph
const lineColorChoices = {
  classroomClimate: {
    'Specific Approval': '#0988EC',
    'General Approval': '#094492',
    Redirection: '#FFA812',
    Disapproval: '#FF7F00',
  },
  transitionTime: {
    'Waiting in Line': '#AED581',
    Traveling: '#FFA726',
    'Children Waiting': '#FF7043',
    'Classroom Routines': '#64B5F6',
    'Behavior Management': '#FF5252',
    Other: '#536DFE',
  },
  mathInstruction: {
    //"useForAll": "#459AEB",
    teacherMathBehavior: {
      'Teacher Not at Center': '#BABABA',
      'No Support': '#EC2409',
      'Teacher Support': '#459AEB',
    },
    childMathBehavior: {
      'Non-Math Activities': '#EC2409',
      Math: '#094492',
    },
  },
  levelOfInstruction: {
    'Teacher Asks High-Level Question': '#38761D',
    'Child Answers High-Level Question': '#38761D',
    'Teacher Asks Low-Level Question': '#1155CC',
    'Child Answers Low-Level Question': '#1155CC',
  },
  studentEngagement: {
    'Daily Average': '#FF7F00',
  },
}

const AVERAGES_SUBPAGE = 0
const TRENDS_SUBPAGE = 1

class SiteProfileResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lineGraphData: {},
      tabState: 0,
      reportDate: new Date(),
      siteCoaches: [],
      teacherInfo: [],
      teacherNames: [],
      selectedTeacher: 'None',
      radioValue: radioValueArr[this.props.observationType] ? radioValueArr[this.props.observationType] : '',
      BQData: [],
      averagesClass: new AveragesData(),
      trendsClass: new TrendData(),
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
      lineColors: [],

      showErrorMessage: false,
      errorMessage: '',

      toneCount: 0,
      toneAverage: 0,
    }
  }

  componentDidMount = async () => {
    const firebase = this.context

    // Get a list of the coaches for the chosen site.
    // Get all coaches that has this site in their document
    var siteCoachIds = []
    var tempCoaches = await firebase.fetchSiteCoaches(this.props.selectedSiteId)

    if (tempCoaches) {
      siteCoachIds = tempCoaches.map(coach => {
        return coach.id
      })
    }

    // Add all the coaches this site has listed. (fetchSiteCoaches only grabs users with the role of 'coach'. This is a minor failsafe in case we need more than that)
    if (this.props.selectedSiteInfo.coaches) {
      siteCoachIds = siteCoachIds.concat(this.props.selectedSiteInfo.coaches)
    }

    // Remove any duplicates
    siteCoachIds = siteCoachIds.filter(
      (v, i, a) => a.findIndex(v2 => v2 === v) === i
    )

    await this.getSitesTeachersInfo(siteCoachIds)

    // Get a list of the coaches for the chosen site.
    /*
    firebase.fetchSiteCoaches(this.props.selectedSiteId).then( (data) => {

      if(data)
      {
        this.getSitesTeachersInfo(data)
      }

    });
    */
  }

  /*
   * Get the info of eache teacher in the site
   */
  getSitesTeachersInfo = async coaches => {
    const firebase = this.context

    var coachIdsArr = coaches
    this.setState({ siteCoaches: coachIdsArr })

    // Gather information for each coach.
    //var teacherResults = [];
    //var teacherNames = [];

    var teacherResults = await firebase.getTeacherBySiteName(
      this.props.selectedSiteName
    )

    console.log(teacherResults)
    // Remove proactice teacher
    teacherResults = teacherResults.filter(o => o.id !== 'rJxNhJmzjRZP7xg29Ko6')

    var teacherNames = teacherResults.map(teacher => {
      return teacher.firstName + ' ' + teacher.lastName
    })

    // We need to get the site's transfer logs
    var transferLogs = await firebase.getTransferLogs(
      'sites',
      this.props.selectedSiteId
    )

    // We only want the one's involving teachers
    transferLogs = transferLogs.filter(o => o.type === 'teacher')

    var transferedTeachersIds = transferLogs.map(log => {
      return log.id
    })

    // Remove duplicates
    transferedTeachersIds = [...new Set(transferedTeachersIds)]

    // Take out the transferred id's that are already located in teacher results
    //transferedTeachersIds = transferedTeachersIds.filter(teacherId => !( teacherResults.find(o => o.id === teacherId) ) )

    var transferredTeachersInfo = []
    // Add transferred teacher info to our list of teachers if they're not already there.
    for (var teacherIndex in transferedTeachersIds) {
      var tempId = transferedTeachersIds[teacherIndex]
      var teacherInfo = await firebase.getTeacherInfo(tempId)

      if (teacherInfo.id) {
        transferredTeachersInfo.push(teacherInfo)

        // Only add to teacher results if they're not already there
        if (!teacherResults.find(o => o.id === teacherInfo.id)) {
          teacherResults.push({
            firstName: teacherInfo.firstName,
            lastName: teacherInfo.lastName,
            id: tempId,
          })
          teacherNames.push(teacherInfo.firstName + ' ' + teacherInfo.lastName)
        }
      }
    }

    // We need to get a list of dates to exclude for the transferred coaches
    var datesToExclude = await this.getExcludedDatesForTransferredTeachers(
      transferredTeachersInfo,
      transferLogs
    )

    this.setState({ teacherInfo: teacherResults })
    this.setState({ teacherNames: teacherNames })

    // If there are no teachers in this site, notify the user
    if (teacherResults.length > 0) {
      this.getResultsFromBQ(teacherResults, datesToExclude)
    } else {
      this.setState({
        showErrorMessage: true,
        errorMessage: 'There are no teachers in this site!',
      })
    }
  }

  /*
   * Get list of date ranges where the teacher wasn't a part of this site
   *
   * @returns Array< Object {teacherId, fromDate (2022-10-06), toDate (2022-10-06) } >
   */
  getExcludedDatesForTransferredTeachers = async (
    teachersInfo,
    transferredLogs
  ) => {
    var excludedDatesResults = []

    // Go through each teacher that has been transferred in this site.
    for (var teacherIndex in teachersInfo) {
      var tempTeacherInfo = teachersInfo[teacherIndex]

      // Get the logs for the teacher involved
      var tempTeacherLogs = transferredLogs.filter(
        o => o.id === tempTeacherInfo.id
      )

      // If there aren't any transfer logs for some reason, just keep going
      if (!tempTeacherLogs || tempTeacherLogs.length < 1) {
        continue
      }
      // Let's sort the logs by date (oldest first)
      tempTeacherLogs.sort((a, b) => {
        return a.time.toDate().getTime() - b.time.toDate().getTime()
      })

      // Ideally the transfer logs should already alternate (in, out, in, out, etc.) but we don't trust things to work, so let's remove any that don't alternate just in case
      var previousInOrOut = ''
      for (var i = 0; i < tempTeacherLogs.length; i++) {
        var tempLog = tempTeacherLogs[i]

        // If we have a new value, mark it
        if (previousInOrOut !== tempLog.inOrOut) {
          previousInOrOut = tempLog.inOrOut
          continue
        }
        // If it's not a new value, remove it from the array
        else {
          tempTeacherLogs.splice(i, 1)
        }
      }

      // Go through the logs and build the excluded date ranges
      for (var i = 0; i < tempTeacherLogs.length; i++) {
        var tempLog = tempTeacherLogs[i]

        var inOrOut = tempLog.inOrOut
        var logDate = tempLog.time
          .toDate()
          .toISOString()
          .split('T')[0]

        var fromDate = '',
          toDate = ''

        if (inOrOut === 'in') {
          // If the first one is in, we want to exclude everything from before that date
          if (i === 0) {
            fromDate = new Date(2000, 11, 24, 10, 33, 30, 0)
              .toISOString()
              .split('T')[0]
            toDate = logDate
          }
          // If it's an 'in' that's not the first one, we don't care
          else {
            continue
          }
        } else if (inOrOut === 'out') {
          fromDate = logDate
          // If the last one is out, we want to exclude everything after that date
          if (i === tempTeacherLogs.length - 1) {
            toDate = new Date(2122, 11, 24, 10, 33, 30, 0)
              .toISOString()
              .split('T')[0]
          }
          // If it's an out date that's not the last one, we need to find the next in date to get the 'toDate'
          else {
            toDate = tempTeacherLogs[i + 1].time
              .toDate()
              .toISOString()
              .split('T')[0]
          }
        } else {
          continue
        }

        excludedDatesResults.push({
          id: tempLog.id,
          fromDate: fromDate,
          toDate: toDate,
        })
      }
    }

    return excludedDatesResults
  }

  /*
   * Get all the Results data from each of the teachers between the two given dates
   */
  getResultsFromBQ = (teachers, datesToExclude) => {
    const firebase = this.context

    // Grab results data
    firebase
      .fetchSiteProfileAverages({
        type: this.props.observationType,
        startDate: this.props.startDate,
        endDate: this.props.endDate,
        teacherIds: teachers,
      })
      .then(data => {
        this.setState({ BQData: data })

        // We need to filter out data based on what's in excluded data (data from a teacher that wasn't a part of this site during a certain period)
        // Go through each exclude date item
        for (var excludeDateIndex in datesToExclude) {
          var excludeDateItem = datesToExclude[excludeDateIndex]

          var tempFromDate = new Date(excludeDateItem.fromDate)
          var tempToDate = new Date(excludeDateItem.toDate)
          var tempUserId = '/user/' + excludeDateItem.id

          // Remove all the dates that are in that date range for this particular user
          data = data.filter(
            o =>
              (!(
                tempFromDate < new Date(o.startDate.value) &&
                tempToDate > new Date(o.startDate.value)
              ) &&
                o.teacher === tempUserId) ||
              o.teacher !== tempUserId
          )
        }

        this.calculateResultsForCharts(data, teachers)
      })
  }

  /*
   * Calculate results for the charts using the rows of data from BQ results
   */
  calculateResultsForCharts = (data, teachers) => {
    // Excute function based on observation type
    var averages, trends

    // Need to get the endDate as a deep copy this way because using 'this.props.endDate' passes as a reference instead of a value. So it's getting manipulated by the setMonth() part of the following functions.
    var tempProps = JSON.parse(JSON.stringify(this.props))
    var endDate = new Date(tempProps.endDate)

    switch (this.props.observationType) {
      case 'transitionTime':
        averages = this.state.averagesClass.calculateTransitionAverage(
          data,
          teachers
        )
        trends = this.state.trendsClass.calculateTransitionTrends(
          data,
          teachers,
          this.props.startDate,
          endDate
        )
        break
      case 'classroomClimate':
        averages = this.state.averagesClass.calculateClimateAverage(
          data,
          teachers
        )
        trends = this.state.trendsClass.calculateClimateTrends(
          data,
          teachers,
          this.props.startDate,
          endDate
        )
        break
      case 'mathInstruction':
        averages = this.state.averagesClass.calculateMathAverages(
          data,
          teachers
        )
        trends = this.state.trendsClass.calculateMathTrends(
          data,
          teachers,
          this.props.startDate,
          endDate
        )
        break
      case 'levelOfInstruction':
        averages = this.state.averagesClass.calculateLevelInstructionAverages(
          data,
          teachers
        )
        trends = this.state.trendsClass.calculateLevelInstructionTrends(
          data,
          teachers,
          this.props.startDate,
          endDate
        )
        break
      case 'studentEngagement':
        averages = this.state.averagesClass.calculateStudentEngagementAverages(
          data,
          teachers
        )
        trends = this.state.trendsClass.calculateStudentEngagementTrends(
          data,
          teachers,
          this.props.startDate,
          endDate
        )
        break
      case 'listeningToChildren':
        averages = this.state.averagesClass.calculateListeningToChildrenAverages(
          data,
          teachers
        )
        trends = this.state.trendsClass.calculateListeningToChildrenTrends(
          data,
          teachers,
          this.props.startDate,
          endDate
        )
        break
      case 'sequentialActivities':
        averages = this.state.averagesClass.calculateSequentialActivitiesAverages(
          data,
          teachers
        )
        trends = this.state.trendsClass.calculateSequentialActivitiesTrends(
          data,
          teachers,
          this.props.startDate,
          endDate
        )
        break
      case 'foundationSkills':
        averages = this.state.averagesClass.calculateFoundationalSkillsAverages(
          data,
          teachers
        )
        trends = this.state.trendsClass.calculateFoundationalSkillsTrends(
          data,
          teachers,
          this.props.startDate,
          endDate
        )
        break
      case 'writing':
        averages = this.state.averagesClass.calculateWritingSkillsAverages(
          data,
          teachers
        )
        trends = this.state.trendsClass.calculateWritingSkillsTrends(
          data,
          teachers,
          this.props.startDate,
          endDate
        )
        break
      case 'bookReading':
        averages = this.state.averagesClass.calculateBookReadingAverages(
          data,
          teachers
        )
        trends = this.state.trendsClass.calculateBookReadingTrends(
          data,
          teachers,
          this.props.startDate,
          endDate
        )
        break
      case 'languageEnvironment':
        averages = this.state.averagesClass.calculateLanguageEnvironmentAverages(
          data,
          teachers
        )
        trends = this.state.trendsClass.calculateLanguageEnvironmentTrends(
          data,
          teachers,
          this.props.startDate,
          endDate
        )
        break
      case 'associativeAndCooperative':
        averages = this.state.averagesClass.calculateACAverages(data, teachers)
        trends = this.state.trendsClass.calculateACTrends(
          data,
          teachers,
          this.props.startDate,
          endDate
        )
        break

      default:
        break
    }

    // Set the tones for averages
    /*
    if(averages[this.props.selectedTeacherId].toneCount)
    {
      this.setState({toneCount: averages[this.props.selectedTeacherId].toneCount, toneAverage: averages[this.props.selectedTeacherId].toneAverage})
    }

    // Set the tones for trends
    if(trends[this.props.selectedTeacherId].toneCount)
    {
      this.setState({toneCountTrend: trends[this.props.selectedTeacherId].toneCount, toneAverageTrend: trends[this.props.selectedTeacherId].toneAverage})
    }
    */

    console.log(trends)

    this.setState({ averages: averages, trends: trends })

    if (this.state.selectedTeacher === 'None') {
      teachers = []
    }

    // Build data for line graph
    this.setLineGraphData(teachers, this.state.radioValue)
  }

  // Set Line Graph data

  setLineGraphData = (teachers, type) => {
    let oneType = ["studentEngagement"];
    let twoType = ["foundationSkills", "writing", "bookReading", "languageEnvironment", "transitionTime", "levelOfInstruction"];
    let type2 = "";
    let label1 = "";
    let label2 = "";
    let color1 = "";
    let color2 = "";

    var trends = this.state.trends
    console.log(trends)

    var tempDataSet = []
    var lineColors = this.state.lineColors
    var i = 0
    var tempMonths = [];

    /** CHANGE YOUR ATTRIBUTES HERE */
    if (this.props.observationType === "studentEngagement") {
      type = "dailyAverage"
      color1 = "#FF7F00"
      label1 = "Daily Average"
    }
    if (["foundationSkills", "writing", "bookReading", "languageEnvironment"].includes(this.props.observationType)) {
      type = "literacyInstruction"
      type2 = "noBehaviors"
      label1 = "Literacy Instruction"
      label2 = "No Target Behaviors Observed"
      color1 = "#C4395A"
      color2 = "#E5E5E5"
    }
    if (this.props.observationType === "transitionTime") {
      type = "total"
      type2 = "sessionTotal"
      label1 = "Literacy Instruction"
      label2 = "No Target Behaviors Observed"
      color1 = "#C4395A"
      color2 = "#E5E5E5"
    }
    if (this.props.observationType === "levelOfInstruction") {
      type = "highLevel"
      type2 = "lowLevel"
      label1 = "High-Level Instruction"
      label2 = "Low-Level Instruction"
      color1 = "#C4395A"
      color2 = "#E5E5E5"
    }


    for (var teacherIndex in teachers) {
      var teacher = teachers[teacherIndex]
      var fullName = teacher.firstName + ' ' + teacher.lastName

      var chosenData = trends[teacher.id][type]

      // Round off all the numbers
      chosenData = chosenData.map(function(each_element) {
        return Math.round((each_element + Number.EPSILON) * 100) / 100
      })

      // If there isn't a color set for this teacher, set it
      if (color1 === "") {
        color1 = this.randomRgbColor()
      }

      var tempData = {
        label: `${fullName} ${label1}`,
        data: chosenData,
        borderColor: color1,
        fill: false,
        tension: 0.0,
      }

      // Add the months so we can set the right labels for the trends chart
      if(trends[teacher.id].lineChartLabels)
      {
        tempMonths = trends[teacher.id].lineChartLabels;
      }

      tempDataSet.push(tempData)
      i++
    }

    if (twoType.includes(this.props.observationType)) {
      for (var teacherIndex in teachers) {
        var teacher = teachers[teacherIndex]
        var fullName = teacher.firstName + ' ' + teacher.lastName

        var chosenData = trends[teacher.id][type2]

        // Round off all the numbers
        chosenData = chosenData.map(function(each_element) {
          return Math.round((each_element + Number.EPSILON) * 100) / 100
        })

        // If there isn't a color set for this teacher, set it
        if (color2 === "") {
          color2 = this.randomRgbColor()
        }

        var tempData = {
          label: `${fullName} ${label2}`,
          data: chosenData,
          borderColor: color2,
          fill: false,
          tension: 0.0,
        }

        // Add the months so we can set the right labels for the trends chart
        if(trends[teacher.id].lineChartLabels)
        {
          tempMonths = trends[teacher.id].lineChartLabels;
        }

        tempDataSet.push(tempData)
        i++
      }
    }

    chosenData = trends["siteBar"][type]
    // Round off all the numbers
    chosenData = chosenData.map(function(each_element) {
    return Math.round((each_element + Number.EPSILON) * 100) / 100
    })

    var tempData = {
      label: `Site Average ${label1}`,
      data: chosenData,
      borderColor: color1,
      borderDash: [10,5],
      fill: false,
      tension: 0.0,
    }

    tempDataSet.push(tempData)

    if (twoType.includes(this.props.observationType)) {
      chosenData = trends["siteBar"][type2]

      // Round off all the numbers
      chosenData = chosenData.map(function(each_element) {
        return Math.round((each_element + Number.EPSILON) * 100) / 100
      })

      // If there isn't a color set for this teacher, set it
      //// ADD YOUR SECOND COLOR HERE
      if (color2 === "") {
        color2 = this.randomRgbColor()
      }

      var tempData = {
        label: `Site Average ${label2}`,
        data: chosenData,
        borderColor: color2,
        borderDash: [10,5],
        fill: false,
        tension: 0.0,
      }

      tempDataSet.push(tempData)
    }

    // Add the months so we can set the right labels for the trends chart
    if(trends["siteBar"].lineChartLabels)
    {
      tempMonths = trends["siteBar"].lineChartLabels;
    }
    // Get the months from the data
    const monthOptions = [
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


    var labels = monthOptions;
    if(tempMonths.length > 0)
    {
      labels = tempMonths
    }


    const lineData = {
      labels,
      datasets: tempDataSet,
    }

    console.log(lineData)

    this.setState({ lineGraphData: lineData, lineColors: lineColors })
  }

  /*
   * Calculate total averages for the 'Site Average' bar.
   */
  setAverageBar = () => {
    var averageData = this.state.averages
    var type = this.state.radioValue

    var totalData = 0
    var averageTotal = 0

    for (var dataIndex in averageData) {
      var teacher = averageData[dataIndex]

      totalData++
      averageTotal += teacher[type]
    }

    var average = averageTotal / totalData
  }

  // Handle downloading the PDF
  downloadPDF = () => {
    console.log('Downloading!')
    const input = document.getElementById('siteProfileResultsContainer')
    html2canvas(input).then(canvas => {
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

      pdf.save(
        `Site_Profile_Results_${currDate.getMonth() +
          1}_${currDate.getDate()}_${currDate.getFullYear()}.pdf`
      )
    })
  }

  handleTrendsDropdown = (event: SelectChangeEvent) => {
    this.setState({ selectedTeacher: event.target.value })
    let modifiedInfo = this.state.teacherInfo.filter(teacher => {
      return teacher.id == event.target.value
    })
    if (event.target.value != 'None') {
      LineGraphOptions.legend.display = true
      LineGraphOptions.legend.position = 'bottom'
    } else {
      LineGraphOptions.legend.display = false
    }

    this.setLineGraphData(modifiedInfo, this.state.radioValue)
  }

  // When any of the checkboxes are checked or unchecked
  handleCheckboxChange = (event: SelectChangeEvent) => {
    // If we're checking it, add to array
    if (event.target.checked) {
      this.setState({ checked: [...this.state.checked, event.target.name] })
    }
    // If we're unchecking it, we need to take it out of the array.
    else {
      this.setState({
        checked: this.state.checked.filter(function(item) {
          return item !== event.target.name
        }),
      })
    }
  }

  // When any of the radio buttons are selected
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
    return (
      'rgba(' +
      this.randomInteger(255) +
      ', ' +
      this.randomInteger(255) +
      ', ' +
      this.randomInteger(255) +
      ')'
    )
  }

  randomInteger = max => {
    return Math.floor(Math.random() * (max + 1))
  }

  render() {
    /*
     * List of which observation types will display the radio buttons
     */
    const radioObservationTypes = [
      'mathInstruction',
      'sequentialActivities',
      'associativeAndCooperative',
    ]

    /*
     * List of observation types that have their own custom average chart
     */
    const customAveragesObservationTypes = [
      'classroomClimate',
      'levelOfInstruction',
      "studentEngagement",
      'mathInstruction',
      'listeningToChildren',
      'sequentialActivities',
      'associativeAndCooperative',
      'transitionTime',
      'foundationSkills',
      'writing',
      'bookReading',
      'languageEnvironment',
    ]

    if (this.props.observationType === 'studentEngagement') {
      LineGraphOptions.plugins.datalabels = {
        display: 'auto',
        align: 'top',
        anchor: 'end',
        color: '#444',
        font: {
          size: 14,
          weight: 'bold',
        },
      }
      LineGraphOptions.scales.yAxes[0].scaleLabel.display = false
      LineGraphOptions.scales.yAxes[0].ticks.min = 0
      LineGraphOptions.scales.yAxes[0].ticks.max = 3
      LineGraphOptions.scales.yAxes[0].ticks.stepSize = 1
      LineGraphOptions.scales.yAxes[0].ticks.callback = function(
        value: number
      ): string {
        if (value == 0) {
          return 'Off Task  0  '
        }
        if (value == 1) {
          return 'Mildly Engaged  1  '
        }
        if (value == 2) {
          return 'Engaged  2  '
        }
        if (value == 3) {
          return 'Highly Engaged  3  '
        }
      }
    } else {
      LineGraphOptions.scales.yAxes[0].ticks.min = 0
      LineGraphOptions.scales.yAxes[0].ticks.max = 100
      LineGraphOptions.scales.yAxes[0].ticks.stepSize = 10
      LineGraphOptions.scales.yAxes[0].ticks.callback = function(
        value: number
      ): string {
        return value + '%'
      }
    }

    return (
      <div id="siteProfileResultsContainer">
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
              <h2>Site Profile</h2>
            </Grid>

            {/*
                  Profile information section
                */}
            <Grid container item xs={12} style={startColumn}>
              <Grid style={startRow}>Site: {this.props.selectedSiteName}</Grid>
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
            {radioObservationTypes.includes(this.props.observationType) ? (
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={this.state.radioValue}
                onChange={this.handleRadioChange}
                style={{ width: '100%' }}
              >
                <RadioSets type={this.props.observationType} />
              </RadioGroup>
            ) : null}

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
              {Object.keys(this.state.averages).length <= 0 &&
              !this.state.showErrorMessage ? (
                <img src={CHALKLogoGIF} alt="Loading" width="60%" />
              ) : null}
              {this.state.showErrorMessage ? (
                <h1>{this.state.errorMessage}</h1>
              ) : null}

              {/*
                The "trends" line graph
              */}
              {this.state.tabState == 1 &&  Object.keys(this.state.averages).length > 0 ? ( <>
                <FormControl variant="outlined">
                  <StyledSelect
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.selectedTeacher}
                  onChange={this.handleTrendsDropdown}
                  name="selectedProgram"

                >
                  <MenuItem value="None">Select Teacher</MenuItem>
                  {this.state.teacherInfo.map(
                            (teacher, index)=>{
                              return <MenuItem value={teacher.id} key={index}>
                                    {`${teacher.firstName} ${teacher.lastName}`}
                                  </MenuItem>
                              })}
                </StyledSelect>
                </FormControl>
                <Grid
                  container
                  justify={'center'}
                  direction={'column'}
                  style={{ minHeight: 500 }}
                >
                  {this.props.observationType !== "classroomClimate" ? (
                    <Line
                      data={this.state.lineGraphData}
                      options={LineGraphOptions}
                    />
                  ) : null}
                  {/* Classroom Climate Trends */}
                  {this.props.observationType === "classroomClimate" ? (
                    <ClassroomClimateTrends
                      data={this.state.trends}
                      options={LineGraphOptions}
                      selectedTeacher={this.state.selectedTeacher}
                    />
                  ) : null}

                </Grid>



              </>) : null }


              {/*
                The "averages" bar graph
              */}
              {this.state.tabState == 0 &&
              Object.keys(this.state.averages).length > 0 ? (
                <Grid
                  container
                  justify={'center'}
                  direction={'column'}
                  style={{
                    width: '85%',
                    minHeight: 500,
                    flexWrap: 'nowrap',
                    padding: '0px',
                    position: 'relative',
                    border: 'solid 2px #eee',
                    marginTop: 20,
                  }}
                >
                  <GraphHeader
                    graphTitle={chartTitleArr[this.state.radioValue]}
                  />

                  {/*
                    The Averages Charts
                  */}

                  {/* Generic chart if there is no custom chart built for this observation type */}
                  {!customAveragesObservationTypes.includes(
                    this.props.observationType
                  ) ? (
                    <div style={{ padding: 30 }}>
                      <SiteProfileBarDetails
                        totalVisits={10}
                        labels={this.state.teacherNames}
                        data={this.state.averages}
                        type={this.state.radioValue}
                        barColors={this.state.lineColors}
                      />
                    </div>
                  ) : null}

                  {/* Classroom Climate Chart */}
                  {this.props.observationType === 'classroomClimate' ? (
                    <ClassroomClimateBarDetails data={this.state.averages} />
                  ) : null}

                  {/* Level of Instruction Chart */}
                  {this.props.observationType === 'levelOfInstruction' ? (
                    <LevelOfInstructionBarDetails data={this.state.averages} />
                  ) : null}

                  {/* Student Engagement Chart */}
                  {this.props.observationType === 'studentEngagement' ? (
                    <StudentEngagementBarDetails data={this.state.averages} />
                  ) : null}

                  {/* Math Instruction Chart */}
                  {this.props.observationType === "mathInstruction" ? (
                    <MathInstructionBarDetails
                      data={this.state.averages}
                      type={this.state.radioValue}
                    />
                  ) : null}

                  {/* Listening to Children Chart */}
                  {this.props.observationType === "listeningToChildren" ? (
                    <ListeningToChildrenBarDetails
                      data={this.state.averages}
                      type={this.state.radioValue}
                    />
                  ) : null}

                  {/* Sequesntial Activities Chart */}
                  {this.props.observationType === "sequentialActivities" ? (
                    <SequentialActivitiesBarDetails
                      data={this.state.averages}
                      type={this.state.radioValue}
                    />
                  ) : null}

                  {/* Associative and Cooperative Chart */}
                  {this.props.observationType === "associativeAndCooperative" ? (
                    <ACBarDetails
                      data={this.state.averages}
                      type={this.state.radioValue}
                    />
                  ) : null}


                  {this.props.observationType === 'transitionTime' ? (
                    <TransitionAverageBarDetails data={this.state.averages} />
                  ) : null}

                  {/* Literacy Instruction Charts */}
                  {["foundationSkills", "writing", "bookReading", "languageEnvironment"].includes(this.props.observationType) ? (
                    <LiteracyInstructionBarDetails
                      data={this.state.averages}
                      LI={this.props.observationType}
                    />
                  ) : null}
                  
                </Grid>
              ) : null}
            </Grid>

            {/*
              The tone rating slider for the classroom climate observations
            */}
            {this.props.observationType == 'classroomClimate' &&
            Object.keys(this.state.averages).length > 0 &&
            this.state.tabState == AVERAGES_SUBPAGE ? (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  position: 'relative',
                  justifyContent: 'center',
                  marginBottom: 30,
                }}
              >
                <div style={{ position: 'absolute', left: '-40px' }}>
                  <h4>Teacher Tone</h4>
                </div>
                <div
                  style={{
                    width: 'calc(81% - 35px)',
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  {Object.values(this.state.averages).map((value, index) => {
                    return (
                      <div style={{ flex: '1', alignItems: 'center' }}>
                        <h4
                          style={{
                            color: '#094492',
                            textAlign: 'center',
                            fontWeight: '400',
                          }}
                        >
                          {value['toneAverage']}
                        </h4>
                      </div>
                    )
                  })}
                </div>
              </div>
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
                  Object.keys(this.state.teacherNames).length <= 0
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

SiteProfileResults.contextType = FirebaseContext

export default SiteProfileResults
