import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button/Button";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import TabBar from '@material-ui/core/AppBar';
import Select from "@material-ui/core/Select";
import { ReactComponent as GenerateReportSVG } from "../../../assets/icons/generateReport.svg";
import TransitionTimeIcon from "../../../assets/icons/TransitionTime.svg";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import spreadsheetData from "../../../SPREADSHEET_SECRETS";
import FirebaseContext from "../../../components/Firebase/context";
import AppBar from "../../../components/AppBar";
import Typography from "@material-ui/core/Typography/Typography";
import { ImmortalDB } from "immortal-db";
import { VictoryPie } from "victory-pie";
import ListDetailTableTransitionResults from "../../../components/ResultsComponents/ListDetailTableTransitionResults.js";
import NotesListDetailTable from "../../../components/ResultsComponents/NotesListDetailTable";
import DataQuestions from "../../../components/ResultsComponents/DataQuestions";
import { Line } from "react-chartjs-2";
import 'chartjs-plugin-datalabels';
import TransitionTimePie from "../../../components/ResultsComponents/TransitionTimePie";
import TransitionTrendsGraph from "../../../components/ResultsComponents/TransitionTrendsGraph";
import moment from 'moment';
import { setConstantValue } from "typescript";
import ChildWaiting from "../../../assets/icons/ChildWaiting.svg"; 
import WaitinginLine from "../../../assets/icons/WaitinginLine.svg"; 
import Walking from "../../../assets/icons/Walking.svg"; 
import ClassroomRoutines from "../../../assets/icons/classroomRoutines.svg"; 
import bmi from "../../../assets/icons/BehaviorManagementDisruption.svg"; 
import { lightGreen, white, deepOrange, orange, blue, indigo } from '@material-ui/core/colors';
import { red } from '@material-ui/core/es/colors';
import CardContent from '@material-ui/core/CardContent';

const styles = {
  root: {
    flexGrow: 1,
    height: "100vh",
    flexDirection: "column"
  },
  main: {
    flex: 1,
    height: "90%",
    marginTop: "10vh"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  viewButtons: {
    minWidth: 150,
    textAlign: "center",
    color: "#094492",
    borderColor: "#094492",
  },
  viewButtonsSelected: {
    minWidth: 150,
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#094492"
  },
  buttonsList: {
    position: "relative",
    top: "3vh"
  },
  title: {
    position: "relative",
    left: "33%",
    top: "10%"
  },
  secondTitle: {
    position: "relative",
    left: "40%",
    top: "10%"
  },
  chart: {
    position: "relative",
    left: "7%",
    top: "5%"
  },
  generateReport: {
    position: "relative",
    right: "10%",
    top: "76%",
    left: "10%"
  },
  resultsContent: {
      position: "relative",
  },
  dashboardCard: {
    border: "3px solid #d9d9d9",
    borderRadius: 10,
    backgroundColor: "#fff",
    height: "100%",
    boxShadow: "5px",
    width: "90%",
    marginRight: "5%",
    marginLeft: "5%",
    flexDirection: "column",
    alignItems: "center",
    justify: "space-evenly",
    display: "flex",
    flex: "1",
    flexWrap: "nowrap"
  },
  buttonText: {
    fontSize: "12px",
    textAlign: "center" 
  },
  transitionTypeButton: {
    width: '70px',
    height: '70px'
  }
};

const raisedThemes = createMuiTheme({
  palette: {
    waitingColor: {
      backgroundColor: lightGreen[300], color:'#000',
      textColor: white,
      primaryTextColor: white,
      boxShadow: "4px 4px #a9a9a9",
    },
    travelingColor: {
      backgroundColor: orange[400], color: '#000',
      textColor: white, 
      primaryTextColor: white,
      boxShadow: "4px 4px #a9a9a9"
    },
    childWaitingColor: { 
      backgroundColor: deepOrange[400], color: '#000',
      textColor: white,
      primaryTextColor: white, 
      boxShadow: "4px 4px #a9a9a9"
    }, 
    classroomRoutinesColor: { 
      backgroundColor: blue[300], color: '#000',
      textColor: white,
      primaryTextColor: white, 
      boxShadow: "4px 4px #a9a9a9"
    }, 
    bmiColor: { 
      backgroundColor: red['A200'], color: '#000',
      textColor: white,
      primaryTextColor: white, 
      boxShadow: "4px 4px #a9a9a9"
    }, 
    otherColor: { 
      backgroundColor: indigo['A200'], color: '#000',
      textColor: white,
      primaryTextColor: white, 
      boxShadow: "4px 4px #a9a9a9"
    }
  }
})

const themes = createMuiTheme({
  palette: {
    waitingColor: { 
      backgroundColor: lightGreen[300], color: '#000',
      textColor: white, 
      primaryTextColor: white, 
    },
    travelingColor: { 
      backgroundColor: orange[400], color: '#000',
      textColor: white, 
      primaryTextColor: white,
    }, 
    childWaitingColor: { 
      backgroundColor: deepOrange[400], color: '#000',
      textColor: white,
      primaryTextColor: white, 
    }, 
    classroomRoutinesColor: { 
      backgroundColor: blue[300], color: '#000',
      textColor: white,
      primaryTextColor: white, 
    }, 
    bmiColor: { 
      backgroundColor: red['A200'], color: '#000',
      textColor: white,
      primaryTextColor: white, 
    }, 
    otherColor: { 
      backgroundColor: indigo['A200'], color: '#000',
      textColor: white,
      primaryTextColor: white, 
    }}, 
  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: 'white',
      },
      textColor: white, 
      primaryTextColor: white, 
    },
  }, 
})

const ViewEnum = {
  SUMMARY: 1,
  DETAILS: 2,
  TRENDS: 3,
  NOTES: 4,
  NEXT_STEPS: 5,
  COACH_PREP: 6,
  ACTION_PLAN: 7
};

const LineQuestions = [
  {name: "TransitionPanel1A", title: "Line-up Process", text: "How do you like to transition children from where they are in the classroom to the line-up area? Do you prefer to line them up individually or send them in groups? Talk about the differences in those approaches. What are the effects on the children?"},
  {name: "TransitionPanel1B", title: "Child Engagement", text: "Talk about any types of learning activities that have helped children transition during the line-up process. Are the children engaged during the activities? What are some successes or challenges? How do you all decide on what transition activities to do with children?"},
  {name: "TransitionPanel1C", title: "Causes for Waiting", text: "Talk about what children do when they get in line. Do they have designated spots on which to stand? Do certain children have more difficulty with the process? Are there any challenges that come up when they are lining up?"}
];

const TravelingQuestions = [
  {name: "TransitionPanel2A", title: "Travel Destinations", text: "Let's think about the transitions you make outside the classroom. What's outside of your control and what do you have some control over? (We have to walk to the playground on the other side of the building, but we could get creative about ways to reduce time spent on bathroom breaks in the hallway.)"},
  {name: "TransitionPanel2B", title: "Practice and Positive Reinforcement", text: "Talk about how you reinforce children's successes during transitions? What's the most effective way you've found to keep encouraging them?"},
  {name: "TransitionPanel2C", title: "Revisiting Routines and Expectations", text: "Talk about some of the transitions skills children may need to relearn or practice. What have you been noticing lately about their challenges during transitions outside the classroom?"},
  {name: "TransitionPanel2D", title: "Individualized Support", text: "What are some strategies that help children with challenging behavior during long transitions outside the classroom? What do children with challenging behavior need to be successful? What motivate them at other times during the day?"},
  {name: "TransitionPanel2E", title: "Child Engagement", text: "How does the teacher engage children during walks to other parts of the school building (e.g., pretending to walk like an animal)? Since you can't get around walking all that way to the playground, talk about strategies you've used in the past to keep the children engaged. What works?"},
]

const WaitingQuestions = [
  {name: "TransitionPanel3A", title: "Preparation of Materials", text: "Talk about the best time of the day that you've found for gathering materials for lessons and activities. Are there challenging times as well?"},
  {name: "TransitionPanel3B", title: "Teacher Teamwork", text: "How do you and your teaching assistant help each other with lesson prep and organization? What systems seem to work best in your experience? If you could try something new or change one of your routines around getting ready for a lesson, what would it be?"},
  {name: "TransitionPanel3C", title: "Child Engagement", text: "Talk about the times of the day that you feel the most organized and prepared. What are the differences in children's behavior when you feel prepared? Talk about the most chaotic or overwhelming times. Are there any tips you can take from those other parts of the day when you feel more calm and prepared? Talk about some things you've been wanting to try during those overwhelming parts of the day."},
  {name: "TransitionPanel3D", title: "Classroom Organization", text: "Talk about how the classroom environment and layout affect the flow of the day and children's waiting time. Where are materials for different activities stored and how quickly or not can children access materials?"},
]

const RoutinesQuestions = [
  {name: "TransitionPanel4A", title: "Types of Routines", text: "Talk about all the different classroom routines that happen each day. Which types are more challenging for children? Why might that be? (e.g., Do children do well transitioning from morning meeting to centers but face obstacles cleaning up after centers and transitioning to the read aloud?) Are there one or two classroom routines that have been on your mind or that you want to focus on? On a perfect day, what might that routine look like?"},
  {name: "TransitionPanel4B", title: "Classroom Organization", text: "Let's talk about the relationship between classroom environment/layout and children's transition time. Do you feel like children spend too much time cleaning up materials? What helps them know where to put materials? How does the amount of materials affect clean-up time? What visuals or other strategies help them during classroom routines?"},
  {name: "TransitionPanel4C", title: "Centers", text: "Let's talk about the routines and systems that  help children choose centers and move between centers. What's going well this year? How are children doing with a) choosing their first center, b) leaving one center and going to another one, c) sticking with an activity once they begin?"},
  {name: "TransitionPanel4D", title: "Teacher Teamwork", text: "Talk about how you and your teaching assistant work together to make transitions go smoothly. Do you have designated roles for transition times throughout the day?"},
  {name: "TransitionPanel4E", title: "Number of Transitions", text: "If you could get rid of one transition, what would it be? Is there a time of day when you feel like you're constantly reminding children where they should be? Let's look at the daily schedule for any transitions that could be changed/removed."},
]

const BehaviorQuestions = [
  {name: "TransitionPanel5A", title: "Communicating Expectations", text: "Talk about the types of strategies (verbal, visual, gesture) you like to use to communicate behavior expectations before, during, and/or after transitions? Do children know where to go and what to do during a transition? How do they know?"},
  {name: "TransitionPanel5B", title: "Individualized Support", text: "Talk about children who might benefit from individualized strategies to help them during transitions? What has worked in the past? What have you been thinking about trying?"},
  {name: "TransitionPanel5C", title: "Teacher Teamwork", text: "Let's talk about how you and the paraprofessional/teaching assistant work together to teach and reinforce behavior expectations during transitions. What has worked? What felt less effective? How do you decide which member of the teaching team leads the different transitions across the day?"},
  {name: "TransitionPanel5D", title: "Reinforcing Behaviors", text: "Talk about how you let children know when they do a transition well. What are you looking for so that you can give them positive reinforcement? How do you respond when they don't meet behavior expectations during transitions?"},
  {name: "TransitionPanel5E", title: "Consistency of Routines", text: "Talk about the challenges you and/or children experience during transitions. Which part of the transition is the most challenging for children? Why might that be? What have you been brainstorming in terms of strategies to help them? If you could improve one aspect of a tricky transition, what would it be?"},
]

class TransitionResults extends React.Component {
  constructor(props) {
    super(props);
    this.handleAppend = this.handleAppend.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  state = {
    auth: true,
    anchorEl: null,
    help: false,
    type: null,
    hex: "#FFFFFF",
    entries: [],
    dbCounter: 0, // @Hack @Temporary !!!
    view: ViewEnum.SUMMARY,
    categoryView: null,
    sessionId: null,
    sessionDates: [],
    notes: [],
    log: [],
    trendsDates: [],
    trendsInside:  [],
    trendsOutside: [],
    trendsTotal:  [],
    trendsTotalColor: "#0988EC",
    trendsInsideColor: "#E99C2E",
    trendsOutsideColor: "#E55529",
    insideTime: null,
    outsideTime: null,
    totalTime: null,
    sessionTotal: null,
    learningActivityTime: null,
    tabValue: 0,
    openPanel: null,
    addedToPrep: [],
  };

  componentDidMount() {
    console.log(this.props.location.state);
    console.log(this.context);
    let teacherId = this.props.location.state.teacher.id;
    this.handleTrendsFetch(teacherId);

    this.handleDateFetching(this.props.location.state.teacher.id);
  }

  handleAppend(entry) {
    let newEntries = this.state.entries;
    entry.type = this.state.type;
    newEntries.push(entry);
    this.setState({ entries: newEntries });

    this.handleSpreadsheetAppend(entry);

    this.handleDBinsert(entry);
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleTypeChange(newType) {
      this.setState({ type: newType });
      this.changeHex(newType);
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleHelpModal = () => {
    this.setState({ help: true });
  };

  handleClickAway = () => {
    this.setState({ help: false });
  };

  handleDBinsert = async entry => {
    // Once we integrate users, the user + some index will be the key for the DB.
    await ImmortalDB.set(
      JSON.stringify(this.state.dbCounter),
      JSON.stringify(entry)
    );

    this.setState({ dbCounter: this.state.dbCounter + 1 });
  };

  // handleSpreadsheetAppend = entry => {
  //   let url = new URL(spreadsheetData.scriptLink),
  //     params = {
  //       sheet: "TransitionTime",
  //       del: "false",
  //       TrnStart: entry.start,
  //       TrnEnd: entry.end,
  //       TrnDur: entry.duration,
  //       TrnType: entry.type,
  //       TeacherID: this.props.location.state.key.id
  //     };
  //   Object.keys(params).forEach(key =>
  //     url.searchParams.append(key, params[key])
  //   );
  //   fetch(url, {
  //     method: "POST",
  //     credentials: "include",
  //     mode: "no-cors",
  //     headers: {
  //       "content-type": "application/json"
  //     }
  //   })
  //     .then(response => console.log("Success"))
  //     .catch(error => console.error("Error:", error));
  // };


  handleTrendsFetch = (teacherId) => {
    let firebase = this.context;
    let dateArray = [];
    let insideArray = [];
    let outsideArray =[];
    let totalArray = [];
    let formattedTime;
    firebase.fetchTransitionTrend(teacherId).then(dataSet => {
        console.log("Trends dataSet", dataSet);
        dataSet.map( data => {
          formattedTime = this.handleTrendsFormatTime(data.total);
          dateArray.push([moment(data.startDate.value).format("MMM Do"), formattedTime]);
          insideArray.push(Math.floor(data.inside / data.sessionTotal * 100));
          outsideArray.push(Math.floor(data.outside / data.sessionTotal * 100));
          totalArray.push(Math.floor(data.total / data.sessionTotal * 100));
        });

        this.setState({
          trendsDates: dateArray,
          trendsInside: insideArray,
          trendsOutside: outsideArray,
          trendsTotal: totalArray
        });
        console.log("trends date array: ", this.state.trendsDates);
        console.log("trends inside array: ", this.state.trendsInside);
        console.log("trends outside array: ", this.state.trendsOutside);
        console.log("trends total array: ", this.state.trendsTotal);
        console.log("test");
    });
  };

  handleTrendsFormatTime = (totalTime) => {
    let seconds = Math.floor(totalTime / 1000 % 60);
    let minutes =  Math.floor(totalTime / 1000 / 60 % 60);
    let hours = Math.floor(totalTime / 1000 / 3600 % 60);
    let secondsString = "";
    let minutesString = "";

    if (seconds < 10) {
      secondsString = "0" + seconds.toString();
    } else {
      secondsString = seconds.toString();
    }

    if (minutes < 10) {
      minutesString = "0" + minutes.toString();
    } else {
      minutesString = minutes.toString();
    }

    let formattedTime = hours.toString() + ":" + minutesString + ":" + secondsString;
    console.log("formatted time is ", formattedTime);

    return formattedTime;
  };

  handleTrendsFormatData = () => {
    return {
      labels: this.state.trendsDates,
      datasets:  [
        {
          label: 'TOTAL',
          backgroundColor: this.state.trendsTotalColor,
          borderColor: this.state.trendsTotalColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsTotal,
        },
        {
          label: 'INSIDE',
          backgroundColor: this.state.trendsInsideColor,
          borderColor: this.state.trendsInsideColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsInside,
        },
        {
          label: 'OUTSIDE',
          backgroundColor: this.state.trendsOutsideColor,
          borderColor: this.state.trendsOutsideColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsOutside,
        }
      ]
    }
  };

  handleNotesFetching = (sessionId) => {
    let firebase = this.context;
    firebase.handleFetchNotesResults(sessionId).then(
      notesArr => {
        console.log(notesArr);
        let formattedNotesArr = [];
        notesArr.map(note => {
          let newTimestamp = new Date(note.timestamp.seconds*1000).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true
          });
          formattedNotesArr.push({id: note.id, content: note.content, timestamp: newTimestamp})
        });
        console.log(formattedNotesArr);
        this.setState({
          notes: formattedNotesArr,
        });
      }
    );
  };

  handleListDetailFetching = (sessionId) => {
    let firebase = this.context;
    firebase.fetchTransitionLog(sessionId).then(
      logArr => {
        console.log(logArr);
        let formattedLogArr = [];
        let newId = 0;
        logArr.map(log => {
          newId += 1;
          let startTime = new moment(log.transitionStart.value);
          let newStartTime = startTime.format("hh:mm A");
          let endTime = new moment(log.transitionEnd.value);
          console.log(newStartTime);
          let dur = moment.duration(endTime.diff(startTime));
          let newDuration = dur.minutes() + "m " + dur.seconds() + "s";
          formattedLogArr.push({id: newId, startTime: newStartTime, duration: newDuration, type: log.type.toUpperCase()});
        });
        console.log(formattedLogArr);
        this.setState({
          log: formattedLogArr,
        });
    }
  );
  };

  summaryClick = () => {
    if (this.state.view !== ViewEnum.SUMMARY) {
      this.setState({ view: ViewEnum.SUMMARY });
    }
  };

  listClick = () => {
    if (this.state.view !== ViewEnum.LIST) {
      this.setState({ view: ViewEnum.LIST });
    }
  };

  trendsClick = () => {
    if (this.state.view !== ViewEnum.TRENDS) {
      this.setState({ view: ViewEnum.TRENDS });
    }
  };

  notesClick = () => {
    if (this.state.view !== ViewEnum.NOTES) {
      this.setState({ view: ViewEnum.NOTES });
    }
  };

  coachPrepClick = () => {
    if (this.state.view !== ViewEnum.COACH_PREP) {
      this.setState({ view: ViewEnum.COACH_PREP });
    }
  };

  actionPlanClick = () => {
    if (this.state.view !== ViewEnum.ACTION_PLAN) {
      this.setState({ view: ViewEnum.ACTION_PLAN });
    }
  };

  lineClick = () => {
    if (this.state.categoryView !== "line") {
      this.setState({
        categoryView: "line",
        openPanel: null
      })
    }
  }

  /* travelingClick = () => {
    if (this.state.categoryView !== "traveling") {
      this.setState({openPanel: null},
        () => {this.setState({categoryView: "traveling"})
      })
    }
  }
 */
  travelingClick = () => {
    if (this.state.categoryView !== "traveling") {
      this.setState({
        categoryView: "traveling",
        openPanel: null
      })
    }
  }

  childrenWaitingClick = () => {
    if (this.state.categoryView !== "childrenWaiting") {
      this.setState({
        categoryView: "childrenWaiting",
        openPanel: null
      })
    }
  }

  routinesClick = () => {
    if (this.state.categoryView !== "routines") {
      this.setState({
        categoryView: "routines",
        openPanel: null
      })
    }
  }

  behaviorClick = () => {
    if (this.state.categoryView !== "behavior") {
      this.setState({
        categoryView: "behavior",
        openPanel: null
      })
    }
  }

  handleDateFetching = (teacherId) => {
    console.log("handle date fetching called");
    let firebase = this.context;
    firebase.fetchSessionDates(teacherId, 'transition').then(dates=>this.setState({
      sessionDates: dates
    }));

    console.log("Session Dates: " + this.state.sessionDates)

  };

  handleResults = () => {
    if (this.state.tabValue === 1) {
      this.setState({
        tabValue: 0
      })
    }
  };

  handleCoaching = () => {
    if (this.state.tabValue === 0) {
      this.setState({
        tabValue: 1
      })
    }
  };

  handlePanelChange = (panel) => {
    if (this.state.openPanel === panel) {
      this.setState({openPanel: null})
    } else {
      this.setState({openPanel: panel})
    }
  };

  handleAddToPlan = (panel) => {
    if (!this.state.addedToPrep.includes(panel)) {
      this.setState({addedToPrep: [...this.state.addedToPrep, panel]})
    }
  }

  changeSessionId = (event) => {
    console.log("sessionId",event.target.value);
    this.setState({
      sessionId: event.target.value,
    }, () => {
      this.handleNotesFetching(this.state.sessionId);
      this.handleListDetailFetching(this.state.sessionId);
      let firebase = this.context;

      //firebase.fetchTransitionSummary(this.state.sessionId).then(summary => console.log("summary time: ", summary[0].inside));

      // firebase.fetchTransitionSummary(this.state.sessionId).then(summary=>{
      //     this.setState({
      //       insideTime: summary[0].inside,
      //       outsideTime: summary[0].outside,
      //       totalTime: summary[0].total,
      //       sessionTotal: summary[0].sessionTotal,
      //       learningActivityTime: summary[0].sessionTotal - summary[0].total


      // })});
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {firebase => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <main style={{overflow: "hidden", flex: 1}}>
          <Grid container spacing={16} justify="center" direction="row" alignItems="center">
            <Grid item xs={3}>
              <Grid container 
                alignItems="center"
                justify="center"
                direction="column"
              >
                <Card className={classes.dashboardCard}>
                  <Grid container flexGrow={1} spacing={0} direction="column" justify="center" alignItems="center">
                    <Grid item style={{marginTop:"10px", marginBottom:"5px"}}>
                      <img src={TransitionTimeIcon} alt="Transition Time Icon" width="100vw" height="100vh"/>
                    </Grid>
                    <Grid item style={{marginTop: "10px"}}>
                      <TextField
                        select
                        className={classes.viewButtons}
                        label="Date"
                        value={this.state.sessionId}
                        onChange={this.changeSessionId}
                        InputLabelProps={{ shrink: true }}>
                        {this.state.sessionDates.map(date=> {return <MenuItem id={date.id} value={date.id}>
                          <em>{moment(date.sessionStart.value).format("MMM Do YY hh:mm A")}</em>
                          </MenuItem>})}
                      </TextField>
                    </Grid>
                    <Grid item style={{marginTop: "15px"}}>
                      <Button
                        size="large"
                        
                        variant={
                          this.state.view === ViewEnum.SUMMARY
                            ? "contained"
                            : "outlined"
                        }
                        className={this.state.view === ViewEnum.SUMMARY ? classes.viewButtonsSelected : classes.viewButtons}
                        onClick={this.summaryClick}
                      >
                        Summary
                      </Button>
                    </Grid>
                    <Grid item style={{marginTop: "15px"}}>
                      <Button
                        size="large"
                        color={"#094492"}
                        variant={
                          this.state.view === ViewEnum.LIST
                            ? "contained"
                            : "outlined"
                        }
                        className={this.state.view === ViewEnum.LIST ? classes.viewButtonsSelected : classes.viewButtons}
                        onClick={this.listClick}
                      >
                        List Detail
                      </Button>
                    </Grid>
                    <Grid item style={{marginTop: "15px"}}>
                      <Button
                        size="large"
                        color={"#094492"}
                        variant={
                          this.state.view === ViewEnum.TRENDS
                            ? "contained"
                            : "outlined"
                        }
                        className={this.state.view === ViewEnum.TRENDS ? classes.viewButtonsSelected : classes.viewButtons}
                        onClick={this.trendsClick}
                      >
                        Trends
                      </Button>
                    </Grid>
                    <Grid item style={{marginTop: "15px"}}>
                      <Button
                        size="large"
                        color={"#094492"}
                        variant={
                          this.state.view === ViewEnum.COACH_PREP
                            ? "contained"
                            : "outlined"
                        }
                        className={this.state.view === ViewEnum.COACH_PREP ? classes.viewButtonsSelected : classes.viewButtons}
                        onClick={this.coachPrepClick}
                      >
                        Coach Prep
                      </Button>
                    </Grid>
                    <Grid item style={{marginTop: "15px"}}>
                      <Button
                        size="large"
                        color={"primary"}
                        variant={
                          this.state.view === ViewEnum.ACTION_PLAN
                            ? "contained"
                            : "outlined"
                        }
                        className={this.state.view === ViewEnum.ACTION_PLAN ? classes.viewButtonsSelected : classes.viewButtons}
                        onClick={this.actionPlanClick}
                      >
                        Action Plan
                      </Button>
                    </Grid>
                    <Grid item style={{marginTop: "50px", marginBottom: "10px"}}>
                      <Button
                        size="large"
                        color={"primary"}
                        variant={
                          this.state.view === ViewEnum.NOTES
                            ? "contained"
                            : "outlined"
                        }
                        className={this.state.view === ViewEnum.NOTES ? classes.viewButtonsSelected : classes.viewButtons}
                        onClick={this.notesClick}
                      >
                        Notes
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
            <Grid container xs={8} justify="center" direction="column" alignItems="center">
              <TabBar position="static" color="default" style={{marginTop: "30px", marginBottom: "10px", height: "5%", width: "80%"}}>
                <Tabs 
                  value={this.state.tabValue}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                >
                  <Tab label="Results" onClick={this.handleResults}/>                      
                  <Tab label="Data-Driven Coaching" onClick={this.handleCoaching}/>
                </Tabs>
              </TabBar>
              <SwipeableViews index={this.state.tabValue} style={{width: "100%", height: "75vh"}}>
                <div>
                  {this.state.view === ViewEnum.SUMMARY ? (
                    <div className={classes.resultsContent}>
                      <Typography variant="h5" style={{padding: 15, textAlign: "center"}}>
                        Total Transition Time: {this.state.totalTime}
                      </Typography>
                      <TransitionTimePie
                        insideTime={this.state.insideTime}
                        outsideTime={this.state.outsideTime}
                        learningActivityTime={this.state.learningActivityTime} style={{overflow:"hidden"}}
                      />
                    </div>
                  ) : this.state.view === ViewEnum.LIST ? (
                    <div className={classes.resultsContent}>
                      <ListDetailTableTransitionResults
                        data={this.state.log} style={{overflow:"hidden"}}
                      />
                    </div>
                  ) : this.state.view === ViewEnum.TRENDS ? (
                    <div className={classes.resultsContent}
                    >
                      <TransitionTrendsGraph data={this.handleTrendsFormatData} style={{overflow:"hidden"}}/>
                    </div>
                  ) : this.state.view === ViewEnum.NOTES ? (
                    <div className={classes.resultsContent}
                    >
                      <NotesListDetailTable data={this.state.notes} style={{overflow:"hidden"}}/>
                    </div>
                  ) : this.state.view === ViewEnum.ACTION_PLAN ? (
                    <div className={classes.resultsContent} /> // replace this null with next steps content
                  ) : null}
                </div>
                <div>
                  {this.state.view === ViewEnum.LIST ? (
                    <div style={{alignContent: "center"}}>
                      <Grid container direction="column">
                        <Grid container direction="row" justify="center" alignItems="center">
                          <Typography variant="subtitle2">
                            In which type of transition did children spend the most amount of time?
                          </Typography>
                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center">
                          <Typography variant="subtitle2">
                            Select a transition type to view questions that will encourage reflection about teaching practices.
                          </Typography>
                        </Grid>
                        <Grid container direction="row" justify="space-around" alignItems="center" style={{marginTop: "10px"}}>
                          <Grid item>
                            <Button style={this.state.categoryView === "line" ? raisedThemes.palette.waitingColor : themes.palette.waitingColor} onClick={this.lineClick}>
                              <img src={WaitinginLine} className={classes.transitionTypeButton}/>
                            </Button>
                          </Grid>
                          <Grid item>
                           <Button style={this.state.categoryView === "traveling" ? raisedThemes.palette.travelingColor : themes.palette.travelingColor} onClick={this.travelingClick}>
                              <img src={Walking} className={classes.transitionTypeButton}/>
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button style={this.state.categoryView === "childrenWaiting" ? raisedThemes.palette.childWaitingColor : themes.palette.childWaitingColor} onClick={this.childrenWaitingClick}>
                              <img src={ChildWaiting} className={classes.transitionTypeButton}/>
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button style={this.state.categoryView === "routines" ? raisedThemes.palette.classroomRoutinesColor : themes.palette.classroomRoutinesColor} onClick={this.routinesClick}>
                              <img src={ClassroomRoutines} className={classes.transitionTypeButton}/>
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button style={this.state.categoryView === "behavior" ? raisedThemes.palette.bmiColor : themes.palette.bmiColor} onClick={this.behaviorClick}>
                              <img src={bmi} className={classes.transitionTypeButton}/>
                            </Button>
                          </Grid>
                        </Grid>
                        <Grid container direction="row" justify="space-around" alignItems="center" style={{marginTop: "5px"}}>
                          <Grid
                            item xs={2}
                            className = {classes.buttonText}
                            style={{fontWeight: this.state.categoryView === "line" ? "bold" : "normal"}}
                          >
                            Waiting in Line
                          </Grid>
                          <Grid
                            item xs={2}
                            className = {classes.buttonText}
                            style={{fontWeight: this.state.categoryView === "traveling" ? "bold" : "normal"}}
                          >
                            Traveling
                          </Grid>
                          <Grid
                            item xs={2}
                            className = {classes.buttonText}
                            style={{fontWeight: this.state.categoryView === "childrenWaiting" ? "bold" : "normal"}}
                          >
                            Children Waiting
                          </Grid>
                          <Grid
                            item xs={2}
                            className = {classes.buttonText}
                            style={{fontWeight: this.state.categoryView === "routines" ? "bold" : "normal"}}
                          >
                            Classroom Routines
                          </Grid>
                          <Grid
                            item xs={2}
                            className = {classes.buttonText}
                            style={{fontWeight: this.state.categoryView === "behavior" ? "bold" : "normal"}}
                          >
                            Behavior Management
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container direction="column" style={{marginTop: "10px"}}>
                        {this.state.categoryView === "line" ? (
                          <DataQuestions
                            questions={LineQuestions}
                            openPanel={this.state.openPanel}
                            handlePanelChange={this.handlePanelChange}
                            addedToPrep={this.state.addedToPrep}
                            handleAddToPlan={this.handleAddToPlan}
                          />
                        ) : this.state.categoryView === "traveling" ? (
                          <DataQuestions
                            questions={TravelingQuestions}
                            openPanel={this.state.openPanel}
                            handlePanelChange={this.handlePanelChange}
                            addedToPrep={this.state.addedToPrep}
                            handleAddToPlan={this.handleAddToPlan}
                          />
                        ) : this.state.categoryView === "childrenWaiting" ? (
                          <DataQuestions
                            questions={WaitingQuestions}
                            openPanel={this.state.openPanel}
                            handlePanelChange={this.handlePanelChange}
                            addedToPrep={this.state.addedToPrep}
                            handleAddToPlan={this.handleAddToPlan}
                          />
                        ) : this.state.categoryView === "routines" ? (
                          <DataQuestions
                            questions={RoutinesQuestions}
                            openPanel={this.state.openPanel}
                            handlePanelChange={this.handlePanelChange}
                            addedToPrep={this.state.addedToPrep}
                            handleAddToPlan={this.handleAddToPlan}
                          />
                        ) : this.state.categoryView === "behavior" ? (
                          <DataQuestions
                            questions={BehaviorQuestions}
                            openPanel={this.state.openPanel}
                            handlePanelChange={this.handlePanelChange}
                            addedToPrep={this.state.addedToPrep}
                            handleAddToPlan={this.handleAddToPlan}
                          />
                        ) : <div/>}
                      </Grid>
                    </div>
                  ) : this.state.view === ViewEnum.COACH_PREP ? (
                    <Grid>
                      <Card style={{width: "100%", height: "30vh"}}>
                        <CardContent>
                          <Typography>
                            Data Reflection
                          </Typography>
                          <TextField
                            placeholder="Choose questions from the Data-Driven Coaching tab of the Details section." 
                            fullWidth 
                            disabled
                          />
                          <TextField
                            placeholder="Or add your own questions here!"
                            fullWidth
                            multiline
                          />
                        </CardContent>
                      </Card>
                      <Card style={{width: "100%", height: "20vh"}}>
                        <CardContent>
                          <Typography>
                            Strengths-Based Feedback
                          </Typography>
                          <TextField
                            placeholder="Add your observations of positive things the teacher did."
                            fullWidth
                            multiline
                          />
                        </CardContent>
                      </Card>
                      <Card style={{width: "100%", height: "20vh"}}>
                        <CardContent>
                          <Typography>
                            Notes
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ) : this.state.view === ViewEnum.SUMMARY ? (
                    <Typography style={{textAlign: "center"}}>
                      Go to the Details tab to view the Data-Reflection Questions.
                    </Typography>
                  ) : this.state.view === ViewEnum.TRENDS ? (
                    <Typography style={{textAlign: "center"}}>
                      Go to the Details tab to view the Data-Reflection Questions.
                    </Typography>
                  ) : (
                    <div/>
                  )}
                </div>
              </SwipeableViews>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

TransitionResults.propTypes = {
  classes: PropTypes.object.isRequired
};
TransitionResults.contextType = FirebaseContext;
export default withStyles(styles)(TransitionResults);
