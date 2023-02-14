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

import ProgramProfileBarDetails from './ProgramProfileBarDetails'
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

import LevelOfInstructionBarDetails from './Charts/LevelOfInstructionBarDetails'
import SequentialActivitiesBarDetails from './Charts/SequentialActivitiesBarDetails'
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
  mathInstruction: 'mathVocabularyAverage',
  levelOfInstruction: 'hlqAverage',
  studentEngagement: 'offTaskAverage',
  listeningToChildren: 'eyeLevelAverage',
  sequentialActivities: 'teacherAverage',
  foundationSkills: 'foundationalSkillsAverage',
  writing: 'writingSkillsAverage',
  bookReading: 'bookReadingAverage',
  languageEnvironment: 'languageEnvironmentAverage',
  associativeAndCooperative: 'childrensPlayAverage',
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

class ProgramProfileResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lineGraphData: {},
      tabState: 0,
      reportDate: new Date(),
      programCoaches: [],
      sites: [],
      teacherInfo: {},
      siteNames: [],
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
      selectedSite: 'None',
      siteInfo: []
    }
  }

  /*
   * How we're fetching data for this page
   *
   *  1. Use firebase.fetchProgramTeachers() to get every site and teacher in this program
   *      It returns an array with each site as the key and an array of that site's teacher id's as the value
   *
   *  2. Pass that data to getResultsFromBQ.
   *
   *    2.1 Look through the program's tranfer logs to get any site that a teacher was a part of before they left this program
   *    2.2 Add that to the list of sites
   *    2.3 Go through each site
   *    2.4 Add any teachers that was transferred out of that site to the list
   *    2.3 Get data for each of the teachers within each of the sites
   */

  componentDidMount = async () => {
    const firebase = this.context

    // Get a list of sites for this program

    //var programInfo = await firebase.getUserProgramOrSite({programId: this.props.selectedProgramId});
    var programInfo = this.props.selectedProgramInfo

    var fullSitesList = {}

    var siteIds = []

    //var coaches = await firebase.fetchProgramTeachers({programId: this.props.selectedProgramId});

    // Get the teachers in this program
    firebase
      .fetchProgramTeachers({
        programId: this.props.selectedProgramId,
        programInfo: programInfo,
      })
      .then(data => {
        this.getResultsFromBQ(data)
      })

    this.setState({ sites: fullSitesList })
  }

  /*
   * Get all the Results data from each of the teachers between the two given dates
   */
  getResultsFromBQ = async sites => {
    const firebase = this.context

    // Need to add sites from teachers that transferred out of this program in case they're not included any more
    //    Note: These aren't sites that transferred programs, these are sites that a teacher was a part of before they transferred out of this program
    var transferLogs = await firebase.getTransferLogs(
      'programs',
      this.props.selectedProgramId
    )

    if (transferLogs && transferLogs.length > 1) {
      var transferredOutSites = transferLogs.filter(
        o => o.inOrOut === 'out' && o.type == 'teacherSite'
      )
      // We just need the ids
      transferredOutSites = transferredOutSites.map(o => {
        return o.id
      })
      // Add the sites to our current list of sites if they're not there
      for (var i = 0; i < transferredOutSites.length; i++) {
        if (!sites[transferredOutSites[i]]) {
          sites[transferredOutSites[i]] = []
        }
      }
    }

    // Grab results data
    var averagesList = {}
    var siteNames = {}
    let siteInfo = []

    // Go through each site
    for (var siteIndex in sites) {
      var teachers = sites[siteIndex]

      // Don't forget the teachers that were transferred out of the program in the past
      // We need to get the site's transfer logs
      var transferLogs = await firebase.getTransferLogs('sites', siteIndex)

      // We only want the one's involving teachers
      transferLogs = transferLogs.filter(o => o.type === 'teacher')

      var transferedTeachersIds = transferLogs.map(log => {
        return log.id
      })

      // Remove duplicates
      transferedTeachersIds = [...new Set(transferedTeachersIds)]

      teachers = teachers.concat(transferedTeachersIds)

      var transferredTeachersInfo = []
      // Add transferred teacher info to our list of teachers if they're not already there.
      for (var teacherIndex in transferedTeachersIds) {
        var tempId = transferedTeachersIds[teacherIndex]
        var teacherInfo = await firebase.getTeacherInfo(tempId)

        if (teacherInfo.id) {
          transferredTeachersInfo.push(teacherInfo)

          // Only add to teacher results if they're not already there
          if (!teachers.find(o => o.id === teacherInfo.id)) {
            teachers.push({
              firstName: teacherInfo.firstName,
              lastName: teacherInfo.lastName,
              id: tempId,
            })
            //teacherNames.push(teacherInfo.firstName + " " + teacherInfo.lastName);
          }
        }
      }

      // We need to get a list of dates to exclude for the transferred coaches
      var datesToExclude = await this.getExcludedDatesForTransferredTeachers(
        transferredTeachersInfo,
        transferLogs
      )

      // Remove cached users (they won't have names set) and Practice Teacher
      teachers = teachers.filter(
        o => o.firstName && o.id !== 'rJxNhJmzjRZP7xg29Ko6'
      )

      // Just skip if there are no teachers here
      if (teachers.length < 1) {
        continue
      }

      // Get the averages for this site
      averagesList[siteIndex] = await firebase.fetchSiteProfileAverages({
        type: this.props.observationType,
        startDate: this.props.startDate,
        endDate: this.props.endDate,
        teacherIds: teachers,
      })

      // We need to filter out data based on what's in excluded data (data from a teacher that wasn't a part of this site during a certain period)
      // Go through each exclude date item
      for (var excludeDateIndex in datesToExclude) {
        var excludeDateItem = datesToExclude[excludeDateIndex]

        var tempFromDate = new Date(excludeDateItem.fromDate)
        var tempToDate = new Date(excludeDateItem.toDate)
        var tempUserId = '/user/' + excludeDateItem.id

        // Remove all the dates that are in that date range for this particular user
        averagesList[siteIndex] = averagesList[siteIndex].filter(
          o =>
            (!(tempFromDate < new Date(o.startDate) && tempToDate > new Date(o.startDate)) && !(tempFromDate < new Date(o.startDate.value) && tempToDate > new Date(o.startDate.value)) && o.teacher === tempUserId) ||
            o.teacher !== tempUserId 
        )
      }
      // Set the site names
      var siteData = await firebase.getUserProgramOrSite({ siteId: siteIndex })

      siteNames[siteData.id] = { name: siteData.name }
      siteInfo.push({id: siteData.id, name:siteData.name})
    }

    this.setState({ BQData: averagesList })
    this.setState({ siteNames: siteNames, siteInfo: siteInfo })

    // If there are no sites in this program, we have to let them know
    if (Object.values(siteNames).length <= 0) {
      this.setState({
        showErrorMessage: true,
        errorMessage: 'There are no sites in this Program!',
      })
    }

    this.calculateResultsForCharts(averagesList, averagesList)
  }

  /*
   * Get list of date ranges where the teacher wasn't a part of a site
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
   * Calculate results for the charts using the rows of data from BQ results
   */
  calculateResultsForCharts = (data, teachers) => {
    // Need to get the endDate as a deep copy this way because using 'this.props.endDate' passes as a reference instead of a value. So it's getting manipulated by the setMonth() part of the following functions.
    var tempProps = JSON.parse(JSON.stringify(this.props));
    var endDate = new Date(tempProps.endDate);


    // Excute function based on observation type
    var averages, trends
    switch (this.props.observationType) {
      case 'transitionTime':
        averages = this.state.averagesClass.calculateTransitionAverage( data, teachers )
        trends = this.state.trendsClass.calculateTransitionTrends( data, teachers, this.props.startDate, endDate )
        break
      case 'classroomClimate':
        averages = this.state.averagesClass.calculateClimateAverage( data, teachers )
        trends = this.state.trendsClass.calculateClimateTrends( data, teachers, this.props.startDate, endDate )
        break
      case 'mathInstruction':
        averages = this.state.averagesClass.calculateMathAverages( data, teachers )
        trends = this.state.trendsClass.calculateMathTrends( data, teachers, this.props.startDate, endDate )
        break
      case 'levelOfInstruction':
        averages = this.state.averagesClass.calculateLevelInstructionAverages( data, teachers, this.state.siteNames )
        trends = this.state.trendsClass.calculateLevelInstructionTrends( data, teachers, this.props.startDate, endDate )
        break
      case 'studentEngagement':
        averages = this.state.averagesClass.calculateStudentEngagementAverages( data, teachers )
        trends = this.state.trendsClass.calculateStudentEngagementTrends( data, teachers, this.props.startDate, endDate )
        break
      case 'listeningToChildren':
        averages = this.state.averagesClass.calculateListeningToChildrenAverages( data, teachers )
        trends = this.state.trendsClass.calculateListeningToChildrenTrends( data, teachers, this.props.startDate, endDate )
        break
      case 'sequentialActivities':
        averages = this.state.averagesClass.calculateSequentialActivitiesAverages( data, teachers, this.state.siteNames )
        trends = this.state.trendsClass.calculateSequentialActivitiesTrends( data, teachers, this.props.startDate, endDate )
        break
      case 'foundationSkills':
        averages = this.state.averagesClass.calculateFoundationalSkillsAverages( data, teachers, this.state.siteNames )
        trends = this.state.trendsClass.calculateFoundationalSkillsTrends( data, teachers, this.props.startDate, endDate )
        break
      case 'writing':
        averages = this.state.averagesClass.calculateWritingSkillsAverages( data, teachers, this.state.siteNames )
        trends = this.state.trendsClass.calculateWritingSkillsTrends( data, teachers, this.props.startDate, endDate )
        break
      case 'bookReading':
        averages = this.state.averagesClass.calculateBookReadingAverages( data, teachers, this.state.siteNames )
        trends = this.state.trendsClass.calculateBookReadingTrends( data, teachers, this.props.startDate, endDate )
        break
      case 'languageEnvironment':
        averages = this.state.averagesClass.calculateLanguageEnvironmentAverages( data, teachers, this.state.siteNames )
        trends = this.state.trendsClass.calculateLanguageEnvironmentTrends( data, teachers, this.props.startDate, endDate )
        break
      case 'associativeAndCooperative':
        averages = this.state.averagesClass.calculateACAverages(data, teachers)
        trends = this.state.trendsClass.calculateACTrends( data, teachers, this.props.startDate, endDate )
        break

      default:
        break
    }
    this.setState({ averages: averages, trends: trends })

    if (this.state.selectedSite === 'None') {
      teachers = []
    }


    // Build data for line graph
    this.setLineGraphData(teachers, this.state.radioValue)
  }

  // Set Line Graph data
  setLineGraphData = (sites, type) => {
    console.log(sites)
    var trends = this.state.trends

    var tempDataSet = []
    var lineColors = this.state.lineColors
    var i = 0
    var tempLineChartLabels = [];
    for (var siteIndex in sites) {
      var site = sites[siteIndex]
      //var siteName = site.name
      var siteName = this.state.siteNames[siteIndex].name

      var chosenData = trends[siteIndex][type]

      // Round off all the numbers
      // chosenData = chosenData.map(function(each_element) {
      //   return Math.round((each_element + Number.EPSILON) * 100) / 100
      // })

      // If there isn't a color set for this teacher, set it
      if (!lineColors[i]) {
        lineColors[i] = this.randomRgbColor()
      }
      var tempData = {
        label: siteName,
        data: chosenData,
        borderColor: lineColors[i],
        fill: false,
        tension: 0.0,
      }

      // Get the labels for the Trends charts
      if(trends[siteIndex].lineChartLabels)
      {
        tempLineChartLabels = trends[siteIndex].lineChartLabels
      }

      tempDataSet.push(tempData)
      i++
    }

    var labels = [
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

    if(tempLineChartLabels.length > 0)
    {
      labels = tempLineChartLabels;
    }

    const lineData = {
      labels,
      datasets: tempDataSet,
    }

    this.setState({ lineGraphData: lineData, lineColors: lineColors })
  }

  // Handle downloading the PDF
  downloadPDF = () => {
    console.log('Downloading!')
    const input = document.getElementById('ProgramProfileResultsContainer')
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

      pdf.save(`Program_Profile_Results_${currDate.getMonth()+1}_${currDate.getDate()}_${currDate.getFullYear()}.pdf`)

    })
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

    this.setLineGraphData(this.state.siteNames, event.target.value)

    let modifiedInfo = Object.keys(this.state.BQData).filter(key =>
      key.includes(event.target.value)).reduce((obj, key) => {
        return Object.assign(obj, {
          [key]: this.state.BQData[key]
        })
      }, {})

    this.setLineGraphData(modifiedInfo, event.target.value)
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

  handleTrendsDropdown = (event: SelectChangeEvent) => {
    this.setState({ selectedSite: event.target.value })
    let modifiedInfo = Object.keys(this.state.BQData).filter(key =>
      key.includes(event.target.value)).reduce((obj, key) => {
        return Object.assign(obj, {
          [key]: this.state.BQData[key]
        })
      }, {})

    // let modifiedInfo = this.state.BQData.filter(site => {
    //   return site.id == event.target.value
    // })
    // if (this.props.observationType === "studentEngagement") {
    //   if (event.target.value != 'None') {
    //     LineGraphOptions.legend.display = true
    //     LineGraphOptions.legend.position = 'bottom'
    //   } else {
    //     LineGraphOptions.legend.display = false
    //   }
    // } else {
    //   LineGraphOptions.legend.display = true
    //   LineGraphOptions.legend.position = 'bottom'
    // }

    this.setLineGraphData(modifiedInfo, this.state.radioValue)
  }

  render() {

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
      <div id="ProgramProfileResultsContainer">
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
              <h2>Program Profile</h2>
            </Grid>

            {/*
                  Profile information section
                */}
            <Grid container item xs={12} style={startColumn}>
              <Grid style={startRow}>
                Program: {this.props.selectedProgramName}
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
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={this.state.radioValue}
              onChange={this.handleRadioChange}
              style={{ width: '100%' }}
            >
              <RadioSets type={this.props.observationType} />
            </RadioGroup>

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
              {(this.state.tabState == 1 &&
                Object.keys(this.state.averages).length > 0) == 1 ? (<>
                  <FormControl variant="outlined">
                  <StyledSelect
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.selectedSite}
                  onChange={this.handleTrendsDropdown}
                  name="selectedProgram"

                >
                  <MenuItem value="None">Select Site</MenuItem>
                  {this.state.siteInfo.map(
                            (site, index)=>{
                              return <MenuItem value={site.id} key={index}>
                                    {`${site.name}`}
                                  </MenuItem>
                              })}
                </StyledSelect>
                </FormControl>
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
              </>) : this.state.tabState == 0 &&
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
                  />{!customAveragesObservationTypes.includes(
                    this.props.observationType
                  ) ? (
                    <div style={{ padding: 30 }}>
                    <ProgramProfileBarDetails
                      totalVisits={10}
                      labels={this.state.siteNames}
                      data={this.state.averages}
                      type={this.state.radioValue}
                      barColors={this.state.lineColors}
                    />
                    </div>
                  ) : null}

                  {/* Classroom Climate Chart */}
                  {/* {this.props.observationType === 'classroomClimate' ? (
                    <ClassroomClimateBarDetails data={this.state.averages} />
                  ) : null} */}

                  {/* Level of Instruction Chart */}
                  {this.props.observationType === 'levelOfInstruction' ? (
                    <LevelOfInstructionBarDetails data={this.state.averages} />
                  ) : null}

                  {/* Student Engagement Chart */}
                  {/* {this.props.observationType === 'studentEngagement' ? (
                    <StudentEngagementBarDetails data={this.state.averages} />
                  ) : null} */}

                  {/* Math Instruction Chart */}
                  {/* {this.props.observationType === "mathInstruction" ? (
                    <MathInstructionBarDetails
                      data={this.state.averages}
                      type={this.state.radioValue}
                    />
                  ) : null} */}

                  {/* Listening to Children Chart */}
                  {/* {this.props.observationType === "listeningToChildren" ? (
                    <ListeningToChildrenBarDetails
                      data={this.state.averages}
                      type={this.state.radioValue}
                    />
                  ) : null} */}

                  {/* Sequesntial Activities Chart */}
                  {this.props.observationType === "sequentialActivities" ? (
                    <SequentialActivitiesBarDetails
                      data={this.state.averages}
                      type={this.state.radioValue}
                    />
                  ) : null}

                  {/* Associative and Cooperative Chart */}
                  {/* {this.props.observationType === "associativeAndCooperative" ? (
                    <ACBarDetails
                      data={this.state.averages}
                      type={this.state.radioValue}
                    />
                  ) : null} */}


                  {/* {this.props.observationType === 'transitionTime' ? (
                    <TransitionAverageBarDetails data={this.state.averages} />
                  ) : null} */}

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
                    The "averages" bar graph
                */}
            <Grid item xs={12} style={centerColumn}></Grid>

            {/*
                  Download PDF button
                  */}
            <Grid item xs={12} style={centerRow}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.downloadPDF()}
                disabled={
                  Object.keys(this.state.siteNames).length <= 0 ? true : false
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

ProgramProfileResults.contextType = FirebaseContext

export default ProgramProfileResults
