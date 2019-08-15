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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Select from "@material-ui/core/Select";
import { ReactComponent as GenerateReportSVG } from "../../../assets/icons/generateReport.svg";
import TransitionTimeIcon from "../../../assets/icons/TransitionTime.svg";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
//import spreadsheetData from "../../../SPREADSHEET_SECRETS";
import FirebaseContext from "../../../components/Firebase/context";
import AppBar from "../../../components/AppBar";
import Typography from "@material-ui/core/Typography/Typography";
import { ImmortalDB } from "immortal-db";
import { VictoryPie } from "victory-pie";
import ListDetailTableTransitionResults from "../../../components/ResultsComponents/ListDetailTableTransitionResults.js";
import NotesListDetailTable from "../../../components/ResultsComponents/NotesListDetailTable";
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
      //height: "60vh",
      position: "relative",
      //top: "8vh"
  },
  expansionPanel: {
    overflow: "hidden"
  },
  expansionPanelTitle: {
    variant: "subtitle2",
    fontWeight: "bold"
  },
  expansionPanelText: {
    variant: "body2"
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
  }
};

const raisedThemes = createMuiTheme({
  palette: {
    waitingColor: {
      backgroundColor: lightGreen[300], color:'#000',
      textColor: white,
      primaryTextColor: white,
      boxShadow: "4px 4px #a9a9a9"
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

  nextStepsClick = () => {
    if (this.state.view !== ViewEnum.NEXT_STEPS) {
      this.setState({ view: ViewEnum.NEXT_STEPS });
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
          <Grid container spacing={16} justify="center" direction={"row"} alignItems={"center"}>
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
                        //onClick={this.trendsClick}
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
                        //onClick={this.trendsClick}
                      >
                        Action Plan
                      </Button>
                    </Grid>
                    <Grid item style={{marginTop: "10px", marginBottom: "10px"}}>
                    </Grid>
                    <Grid item style={{marginTop: "15px", marginBottom: "10px"}}>
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
              {/* <List className={classes.buttonsList}>
              <ListItem>
                <img src={TransitionTimeIcon} style={{width:"15vw", height:"10vh", position:"center"}} />
              </ListItem>
              <ListItem>
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
              </ListItem>
                <ListItem>
                  <Button
                    size="large"
                    color={"primary"}
                    variant={
                      this.state.view === ViewEnum.SUMMARY
                        ? "contained"
                        : "outlined"
                    }
                    className={classes.viewButtons}
                    onClick={this.summaryClick}
                  >
                    Summary
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    size="large"
                    color={"primary"}
                    variant={
                      this.state.view === ViewEnum.LIST
                        ? "contained"
                        : "outlined"
                    }
                    className={classes.viewButtons}
                    onClick={this.listClick}
                  >
                    List Detail
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    size="large"
                    color={"primary"}
                    variant={
                      this.state.view === ViewEnum.TRENDS
                        ? "contained"
                        : "outlined"
                    }
                    className={classes.viewButtons}
                    onClick={this.trendsClick}
                  >
                    Trends
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    size="large"
                    color={"primary"}
                    variant={
                      this.state.view === ViewEnum.NOTES
                        ? "contained"
                        : "outlined"
                    }
                    className={classes.viewButtons}
                    onClick={this.notesClick}
                  >
                    Notes
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    size="large"
                    color= {"primary"}
                    variant={
                      this.state.view === ViewEnum.NEXT_STEPS
                        ? "contained"
                        : "outlined"
                    }
                    className={classes.viewButtons}
                    onClick={this.nextStepsClick}
                  >
                    Next Steps
                  </Button>
                </ListItem>
                <ListItem>
                  <IconButton className={classes.generateReport}>
                    <GenerateReportSVG
                      style={{
                        height: "10vh",
                        width: "10vh"
                      }}
                    />
                  </IconButton>
                </ListItem>
              </List> */}
            </Grid>
            <Grid container item xs={8} justify="flex-start" direction="column" alignItems="center">
                  {/* <Typography variant={"h4"} alignItems={"center"} justify={"center"}>
                    Transition Time Results
                  </Typography> */}
                  
                  <TabBar position="static" color="default" style={{marginTop: "10px", marginBottom: "10px", height: "5%", width: "80%"}}>
                    <Tabs 
                      value={this.state.tabValue}
                      //onChange={this.handleTabChange}
                      indicatorColor="primary"
                      textColor="primary"
                      variant="fullWidth"
                    >
                      <Tab label="Results" onClick={this.handleResults}/>                      
                      <Tab label="Data-Driven Coaching" onClick={this.handleCoaching}/>
                    </Tabs>
                  </TabBar>
                  
                  {/*
                <Grid item xs={12} alignItems={"center"} justify={"center"}>
                  {/* <Typography variant={"h7"} style={{ marginLeft: "20vw" }}>
                    Total Transition Time: {this.state.totalTime}
                  </Typography> */}
                {/* </Grid>  */}
                <SwipeableViews index={this.state.tabValue} style={{width: "100%", height: "75vh"}}>
                {/* <div> */}
                  <div>
                    {this.state.view === ViewEnum.SUMMARY ? (
                      <div className={classes.resultsContent}>
                        { <TransitionTimePie
                            insideTime={this.state.insideTime}
                            outsideTime={this.state.outsideTime}
                            learningActivityTime={this.state.learningActivityTime} style={{overflow:"hidden"}}/> }
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
                    ) : this.state.view === ViewEnum.NEXT_STEPS ? (
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
                              <Typography variant="subtitle2">
                                Select a transition type to view questions that will encourage reflection about teaching practices.
                              </Typography>
                            </Grid>
                            <Grid container direction="row" justify="space-around" alignItems="center" style={{marginTop: "10px"}}>
                              <Grid item>
                                <Button style={this.state.categoryView === "line" ? raisedThemes.palette.waitingColor : themes.palette.waitingColor} onClick={this.lineClick}>
                                  <img src={WaitinginLine} width='70' height='70'/>
                                </Button>
                              </Grid>
                              <Grid item>
                                <Button style={this.state.categoryView === "traveling" ? raisedThemes.palette.travelingColor : themes.palette.travelingColor} onClick={this.travelingClick}>
                                  <img src={Walking} width='70' height='70'/>
                                </Button>
                              </Grid>
                              <Grid item>
                                <Button style={this.state.categoryView === "childrenWaiting" ? raisedThemes.palette.childWaitingColor : themes.palette.childWaitingColor} onClick={this.childrenWaitingClick}>
                                  <img src={ChildWaiting} width='70' height='70'/>
                                </Button>
                              </Grid>
                              <Grid item>
                                <Button style={this.state.categoryView === "routines" ? raisedThemes.palette.classroomRoutinesColor : themes.palette.classroomRoutinesColor} onClick={this.routinesClick}>
                                  <img src={ClassroomRoutines} width='70' height='70'/>
                                </Button>
                              </Grid>
                              <Grid item>
                                <Button style={this.state.categoryView === "behavior" ? raisedThemes.palette.bmiColor : themes.palette.bmiColor} onClick={this.behaviorClick}>
                                  <img src={bmi} width='70' height='70'/>
                                </Button>
                              </Grid>
                            </Grid>
                            <Grid container direction="row" justify="space-around" alignItems="center" style={{marginTop: "5px"}}>
                              <Grid item xs={2} alignSelf="center" style={{fontSize: "12px", textAlign: "center", fontWeight: this.state.categoryView === "line" ? "bold" : "normal"}}>
                                Waiting in Line
                              </Grid>
                              <Grid item xs={2} style={{fontSize: "12px", textAlign: "center", fontWeight: this.state.categoryView === "traveling" ? "bold" : "normal"}}>
                                Traveling
                              </Grid>
                              <Grid item xs={2} style={{fontSize: "12px", textAlign: "center", fontWeight: this.state.categoryView === "childrenWaiting" ? "bold" : "normal"}}>
                                Children Waiting
                              </Grid>
                              <Grid item xs={2} style={{fontSize: "12px", textAlign: "center", fontWeight: this.state.categoryView === "routines" ? "bold" : "normal"}}>
                                Classroom Routines
                              </Grid>
                              <Grid item xs={2} style={{fontSize: "12px", textAlign: "center", fontWeight: this.state.categoryView === "behavior" ? "bold" : "normal"}}>
                                Behavior Management
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid direction="column" style={{marginTop: "10px"}}>
                            {this.state.categoryView === "line" ? (
                              <div>
                                <ExpansionPanel
                                  expanded={this.state.openPanel === 'TransitionPanel1A'}
                                  onChange={this.handlePanelChange.bind(this,'TransitionPanel1A')}
                                  className={classes.expansionPanel}
                                >
                                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.expansionPanelTitle}>Line-up Process</Typography>
                                  </ExpansionPanelSummary>
                                  <ExpansionPanelDetails>
                                    <Typography className={classes.expansionPanelText}>
                                      How do you like to transition children from where they are in the classroom to the line-up area?
                                      Do you prefer to line them up individually or send them in groups?
                                      Talk about the differences in those approaches. What are the effects on the children?
                                    </Typography>
                                  </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel
                                  expanded={this.state.openPanel === 'TransitionPanel1B'}
                                  onChange={this.handlePanelChange.bind(this,'TransitionPanel1B')}
                                  className={classes.expansionPanel}
                                >
                                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.expansionPanelTitle}>Child Engagement</Typography>
                                  </ExpansionPanelSummary>
                                  <ExpansionPanelDetails>
                                    <Typography className={classes.expansionPanelText}>
                                      Talk about any types of learning activities that have helped children transition during the line-up process.
                                      Are the children engaged during the activities? What are some successes or challenges?
                                      How do you all decide on what transition activities to do with children?
                                    </Typography>
                                  </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel
                                  expanded={this.state.openPanel === 'TransitionPanel1C'}
                                  onChange={this.handlePanelChange.bind(this,'TransitionPanel1C')}
                                  className={classes.expansionPanel}
                                >
                                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.expansionPanelTitle}>Causes for Waiting</Typography>
                                  </ExpansionPanelSummary>
                                  <ExpansionPanelDetails>
                                    <Typography className={classes.expansionPanelText}>
                                      Talk about what children do when they get in line. Do they have designated spots on which to stand?
                                      Do certain children have more difficulty with the process? Are there any challenges that come up when they are lining up?
                                    </Typography>
                                  </ExpansionPanelDetails>
                                </ExpansionPanel>
                              </div>
                            ) : this.state.categoryView === "traveling" ? (
                              <div>
                                <ExpansionPanel
                                  expanded={this.state.openPanel === 'TransitionPanel2A'}
                                  onChange={this.handlePanelChange.bind(this,'TransitionPanel2A')}
                                  className={classes.expansionPanel}
                                >
                                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.expansionPanelTitle}>Travel Destinations</Typography>
                                  </ExpansionPanelSummary>
                                  <ExpansionPanelDetails>
                                    <Typography className={classes.expansionPanelText}>
                                      Let's think about the transitions you make outside the classroom. What's outside of your control and what do you have
                                      some control over? (We have to walk to the playground on the other side of the building, but we could get creative about 
                                      ways to reduce time spent on bathroom breaks in the hallway.)
                                    </Typography>
                                  </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel
                                  expanded={this.state.openPanel === 'TransitionPanel2B'}
                                  onChange={this.handlePanelChange.bind(this,'TransitionPanel2B')}
                                  className={classes.expansionPanel}
                                >
                                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.expansionPanelTitle}>Practice and Positive Reinforcement</Typography>
                                  </ExpansionPanelSummary>
                                  <ExpansionPanelDetails>
                                    <Typography className={classes.expansionPanelText}>
                                      Talk about how you reinforce children's successes during transitions? What's the most effective way you've found to keep encouraging them?
                                    </Typography>
                                  </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel
                                  expanded={this.state.openPanel === 'TransitionPanel2C'}
                                  onChange={this.handlePanelChange.bind(this,'TransitionPanel2C')}
                                  className={classes.expansionPanel}
                                >
                                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.expansionPanelTitle}>Revisiting Routines and Expectations</Typography>
                                  </ExpansionPanelSummary>
                                  <ExpansionPanelDetails>
                                    <Typography className={classes.expansionPanelText}>
                                      Talk about some of the transitions skills children may need to relearn or practice. What have you been noticing lately about their challenges
                                      during transitions outside the classroom?
                                    </Typography>
                                  </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel
                                  expanded={this.state.openPanel === 'TransitionPanel2D'}
                                  onChange={this.handlePanelChange.bind(this,'TransitionPanel2D')}
                                  className={classes.expansionPanel}
                                >
                                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.expansionPanelTitle}>Individualized Support</Typography>
                                  </ExpansionPanelSummary>
                                  <ExpansionPanelDetails>
                                    <Typography className={classes.expansionPanelText}>
                                      What are some strategies that help children with challenging behavior during long transitions outside the classroom?
                                      What do children with challenging behavior need to be successful? What motivate them at other times during the day?
                                    </Typography>
                                  </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel
                                  expanded={this.state.openPanel === 'TransitionPanel2E'}
                                  onChange={this.handlePanelChange.bind(this,'TransitionPanel2E')}
                                  className={classes.expansionPanel}
                                >
                                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.expansionPanelTitle}>Child Engagement</Typography>
                                  </ExpansionPanelSummary>
                                  <ExpansionPanelDetails>
                                    <Typography className={classes.expansionPanelText}>
                                      How does the teacher engage children during walks to other parts of the school building (e.g., pretending to walk like an animal)?
                                      Since you can't get around walking all that way to the playground, talk about strategies you've used in the past to keep the children engaged.
                                      What works?
                                    </Typography>
                                  </ExpansionPanelDetails>
                                </ExpansionPanel>
                              </div>
                            ) : this.state.categoryView === "childrenWaiting" ? (
                              <div>
                                <ExpansionPanel
                                  expanded={this.state.openPanel === 'TransitionPanel3A'}
                                  onChange={this.handlePanelChange.bind(this,'TransitionPanel3A')}
                                  className={classes.expansionPanel}
                                >
                                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.expansionPanelTitle}>Materials Prep</Typography>
                                  </ExpansionPanelSummary>
                                  <ExpansionPanelDetails>
                                    <Typography className={classes.expansionPanelText}>
                                      Talk about the best time of the day that you've found for gathering materials for lessons and activities. Are there challenging times as well?
                                    </Typography>
                                  </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel
                                  expanded={this.state.openPanel === 'TransitionPanel3B'}
                                  onChange={this.handlePanelChange.bind(this,'TransitionPanel3B')}
                                  className={classes.expansionPanel}
                                >
                                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.expansionPanelTitle}>Teacher Teamwork</Typography>
                                  </ExpansionPanelSummary>
                                  <ExpansionPanelDetails>
                                    <Typography className={classes.expansionPanelText}>
                                      How do you and your teaching assistant help each other with lesson prep and organization? What systems seem to work best in your experience? 
                                      If you could try something new or change one of your routines around getting ready for a lesson, what would it be?
                                    </Typography>
                                  </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel
                                  expanded={this.state.openPanel === 'TransitionPanel3C'}
                                  onChange={this.handlePanelChange.bind(this,'TransitionPanel3C')}
                                  className={classes.expansionPanel}
                                >
                                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.expansionPanelTitle}>Child Engagement</Typography>
                                  </ExpansionPanelSummary>
                                  <ExpansionPanelDetails>
                                    <Typography className={classes.expansionPanelText}>
                                      Talk about the times of the day that you feel the most organized and prepared. What are the differences in children's behavior when you feel prepared?
                                      <br/>
                                      Talk about the most chaotic or overwhelming times. Are there any tips you can take from those other parts of the day when you feel more calm and prepared?
                                      Talk about some things you've been wanting to try during those overwhelming parts of the day.
                                    </Typography>
                                  </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel
                                  expanded={this.state.openPanel === 'TransitionPanel3D'}
                                  onChange={this.handlePanelChange.bind(this,'TransitionPanel3D')}
                                  className={classes.expansionPanel}
                                >
                                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.expansionPanelTitle}>Classroom Organization</Typography>
                                  </ExpansionPanelSummary>
                                  <ExpansionPanelDetails>
                                    <Typography className={classes.expansionPanelText}>
                                      Talk about how the classroom environment and layout affect the flow of the day and children's waiting time. Where are materials for different 
                                      activities stored and how quickly or not can children access materials?
                                    </Typography>
                                  </ExpansionPanelDetails>
                                </ExpansionPanel>
                              </div>
                            ) : this.state.categoryView === "routines" ? (
                              <div>
                                <ExpansionPanel
                                  expanded={this.state.openPanel === 'TransitionPanel4A'}
                                  onChange={this.handlePanelChange.bind(this,'TransitionPanel4A')}
                                  className={classes.expansionPanel}
                                >
                                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.expansionPanelTitle}>Types of Routines</Typography>
                                  </ExpansionPanelSummary>
                                  <ExpansionPanelDetails>
                                    <Typography className={classes.expansionPanelText}>
                                      Talk about all the different classroom routines that happen each day. Which types are more challenging for children? Why might that be?
                                      (e.g., Do children do well transitioning from morning meeting to centers but face obstacles cleaning up after centers and transitioning 
                                      to the read aloud?) Are there one or two classroom routines that have been on your mind or that you want to focus on? On a perfect day,
                                      what might that routine look like?
                                    </Typography>
                                  </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel
                                  expanded={this.state.openPanel === 'TransitionPanel4B'}
                                  onChange={this.handlePanelChange.bind(this,'TransitionPanel4B')}
                                  className={classes.expansionPanel}
                                >
                                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.expansionPanelTitle}>Classroom Organization</Typography>
                                  </ExpansionPanelSummary>
                                  <ExpansionPanelDetails>
                                    <Typography className={classes.expansionPanelText}>
                                      Let's talk about the relationship between classroom environment/layout and children's transition time. Do you feel like children spend too 
                                      much time cleaning up materials? What helps them know where to put materials? How does the amount of materials affect clean-up time? What 
                                      visuals or other strategies help them during classroom routines?
                                    </Typography>
                                  </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel
                                  expanded={this.state.openPanel === 'TransitionPanel4C'}
                                  onChange={this.handlePanelChange.bind(this,'TransitionPanel4C')}
                                  className={classes.expansionPanel}
                                >
                                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.expansionPanelTitle}>Centers</Typography>
                                  </ExpansionPanelSummary>
                                  <ExpansionPanelDetails>
                                    <Typography className={classes.expansionPanelText}>
                                      Let's talk about the routines and systems that  help children choose centers and move between centers. What's going well this year? How 
                                      are children doing with a) choosing their first center, b) leaving one center and going to another one, c) sticking with an activity once they begin?
                                    </Typography>
                                  </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel
                                  expanded={this.state.openPanel === 'TransitionPanel4D'}
                                  onChange={this.handlePanelChange.bind(this,'TransitionPanel4D')}
                                  className={classes.expansionPanel}
                                >
                                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.expansionPanelTitle}>Teacher Teamwork</Typography>
                                  </ExpansionPanelSummary>
                                  <ExpansionPanelDetails>
                                    <Typography className={classes.expansionPanelText}>
                                      Talk about how you and your teaching assistant work together to make transitions go smoothly. Do you have designated roles for transition 
                                      times throughout the day?
                                    </Typography>
                                  </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel
                                  expanded={this.state.openPanel === 'TransitionPanel4E'}
                                  onChange={this.handlePanelChange.bind(this,'TransitionPanel4E')}
                                  className={classes.expansionPanel}
                                >
                                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.expansionPanelTitle}>Number of Transitions</Typography>
                                  </ExpansionPanelSummary>
                                  <ExpansionPanelDetails>
                                    <Typography className={classes.expansionPanelText}>
                                      If you could get rid of one transition, what would it be? Is there a time of day when you feel like you're constantly reminding children where 
                                      they should be? Let's look at the daily schedule for any transitions that could be changed/removed.
                                    </Typography>
                                  </ExpansionPanelDetails>
                                </ExpansionPanel>
                              </div>
                            ) : this.state.categoryView === "behavior" ? (
                              <div>
                                <ExpansionPanel
                                  expanded={this.state.openPanel === 'TransitionPanel5A'}
                                  onChange={this.handlePanelChange.bind(this,'TransitionPanel5A')}
                                  className={classes.expansionPanel}
                                >
                                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.expansionPanelTitle}>Communicating Expectations</Typography>
                                  </ExpansionPanelSummary>
                                  <ExpansionPanelDetails>
                                    <Typography className={classes.expansionPanelText}>
                                      Talk about the types of strategies (verbal, visual, gesture) you like to use to communicate behavior expectations before, during, and/or
                                      after transitions? Do children know where to go and what to do during a transition? How do they know?
                                    </Typography>
                                  </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel
                                  expanded={this.state.openPanel === 'TransitionPanel5B'}
                                  onChange={this.handlePanelChange.bind(this,'TransitionPanel5B')}
                                  className={classes.expansionPanel}
                                >
                                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.expansionPanelTitle}>Individualized Support</Typography>
                                  </ExpansionPanelSummary>
                                  <ExpansionPanelDetails>
                                    <Typography className={classes.expansionPanelText}>
                                      Talk about children who might benefit from individualized strategies to help them during transitions? What has worked in the past? 
                                      What have you been thinking about trying?
                                    </Typography>
                                  </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel
                                  expanded={this.state.openPanel === 'TransitionPanel5C'}
                                  onChange={this.handlePanelChange.bind(this,'TransitionPanel5C')}
                                  className={classes.expansionPanel}
                                >
                                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.expansionPanelTitle}>Teacher Teamwork</Typography>
                                  </ExpansionPanelSummary>
                                  <ExpansionPanelDetails>
                                    <Typography className={classes.expansionPanelText}>
                                      Let's talk about how you and the paraprofessional/teaching assistant work together to teach and reinforce behavior expectations during transitions.
                                      What has worked? What felt less effective? How do you decide which member of the teaching team leads the different transitions across the day?
                                    </Typography>
                                  </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel
                                  expanded={this.state.openPanel === 'TransitionPanel5D'}
                                  onChange={this.handlePanelChange.bind(this,'TransitionPanel5D')}
                                  className={classes.expansionPanel}
                                >
                                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.expansionPanelTitle}>Reinforcing Behaviors</Typography>
                                  </ExpansionPanelSummary>
                                  <ExpansionPanelDetails>
                                    <Typography className={classes.expansionPanelText}>
                                      Talk about how you let children know when they do a transition well. What are you looking for so that you can give them positive reinforcement? 
                                      How do you respond when they don't meet behavior expectations during transitions?
                                    </Typography>
                                  </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel
                                  expanded={this.state.openPanel === 'TransitionPanel5E'}
                                  onChange={this.handlePanelChange.bind(this,'TransitionPanel5E')}
                                  className={classes.expansionPanel}
                                >
                                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.expansionPanelTitle}>Consistency of Routines</Typography>
                                  </ExpansionPanelSummary>
                                  <ExpansionPanelDetails>
                                    <Typography className={classes.expansionPanelText}>
                                      Talk about the challenges you and/or children experience during transitions. Which part of the transition is the most challenging for children? 
                                      Why might that be? What have you been brainstorming in terms of strategies to help them? If you could improve one aspect of a tricky transition, 
                                      what would it be?
                                    </Typography>
                                  </ExpansionPanelDetails>
                                </ExpansionPanel>
                              </div>
                            ) : <div/>}
                          </Grid>
                        </div>
                      ) : (
                        <div/>
                      )}
                  </div>
                  {/* </div> */}
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
