import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton/IconButton";
import GenerateReportImage from "../../../assets/images/GenerateReportImage.svg";
import SequentialIconImage from "../../../assets/images/SequentialIconImage.svg";
import { withStyles } from "@material-ui/core/styles";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import AppBar from "../../../components/AppBar";
import Typography from "@material-ui/core/Typography/Typography";
import { ImmortalDB } from "immortal-db";
import "chartjs-plugin-datalabels";
import ChildTeacherBehaviorPieSlider from "../../../components/SequentialActivitiesComponents/ResultsComponents/ChildTeacherBehaviorPieSlider";
import ChildTeacherBehaviorDetailsSlider from "../../../components/SequentialActivitiesComponents/ResultsComponents/ChildTeacherBehaviorDetailsSlider";
import moment from "moment";
import TextField from "@material-ui/core/TextField";

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
    textAlign: "center"
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
    height: "60vh",
    position: "relative",
    top: "8vh"
  }
};

const ViewEnum = {
  SUMMARY: 1,
  DETAILS: 2,
  TRENDS: 3,
  NOTES: 4,
  NEXT_STEPS: 5
};

class SequentialActivitiesResultsPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleAppend = this.handleAppend.bind(this);
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
    sessionId: null,
    sessionDates: [],
    totalTime: null,
    sessionTotal: null,
    learningActivityTime: null,
    notes: []
  };

  componentDidMount() {
    console.log(this.props.location.state);
  }

  handleAppend(entry) {
    const newEntries = this.state.entries;
    entry.type = this.state.type;
    newEntries.push(entry);
    this.setState({ entries: newEntries });

    this.handleSpreadsheetAppend(entry);

    this.handleDBinsert(entry);
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

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
  //     let url = new URL(spreadsheetData.scriptLink),
  //         params = {
  //             sheet: "TransitionTime",
  //             del: "false",
  //             TrnStart: entry.start,
  //             TrnEnd: entry.end,
  //             TrnDur: entry.duration,
  //             TrnType: entry.type,
  //             TeacherID: this.props.location.state.key.id
  //         };
  //     Object.keys(params).forEach(key =>
  //         url.searchParams.append(key, params[key])
  //     );
  //     fetch(url, {
  //         method: "POST",
  //         credentials: "include",
  //         mode: "no-cors",
  //         headers: {
  //             "content-type": "application/json"
  //         }
  //     })
  //         .then(response => console.log("Success"))
  //         .catch(error => console.error("Error:", error));
  // };

  handleTrendsFormatTime = totalTime => {
    const seconds = Math.floor((totalTime / 1000) % 60);
    const minutes = Math.floor((totalTime / 1000 / 60) % 60);
    const hours = Math.floor((totalTime / 1000 / 3600) % 60);
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

    const formattedTime =
      hours.toString() + ":" + minutesString + ":" + secondsString;
    console.log("formatted time is ", formattedTime);

    return formattedTime;
  };

  handleTrendsFormatData = () => {
    return {
      labels: this.state.trendsDates,
      datasets: [
        {
          label: "No Opportunity",
          backgroundColor: this.state.trendsNoOppColor,
          borderColor: this.state.trendsNoOppColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsNoOpp
        },
        {
          label: "No Assoc./Coop. Interaction",
          backgroundColor: this.state.trendsNoACColor,
          borderColor: this.state.trendsNoACColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsNoAC
        },
        {
          label: "Associative and/or Cooperative",
          backgroundColor: this.state.trendsACColor,
          borderColor: this.state.trendsACColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsAC
        }
      ]
    };
  };

  handleNotesFetching = sessionId => {
    const firebase = this.context;
    firebase.handleFetchNotesResults(sessionId).then(notesArr => {
      console.log(notesArr);
      const formattedNotesArr = [];
      notesArr.map(note => {
        const newTimestamp = new Date(
          note.timestamp.seconds * 1000
        ).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true
        });
        formattedNotesArr.push({
          id: note.id,
          content: note.content,
          timestamp: newTimestamp
        });
      });
      console.log(formattedNotesArr);
      this.setState({
        notes: formattedNotesArr
      });
    });
  };

  summaryClick = () => {
    if (this.state.view !== ViewEnum.SUMMARY) {
      this.setState({ view: ViewEnum.SUMMARY });
    }
  };

  listClick = () => {
    if (this.state.view !== ViewEnum.DETAILS) {
      this.setState({ view: ViewEnum.DETAILS });
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

  changeSessionId = event => {
    console.log("sessionId", event.target.value);
    this.setState(
      {
        sessionId: event.target.value
      },
      () => {
        this.handleNotesFetching(this.state.sessionId);
        this.handleListDetailFetching(this.state.sessionId);
        const firebase = this.context;

        firebase
          .fetchChildSeqSummary(this.state.sessionId)
          .then(summary => console.log("summary time: ", summary[0].childAC));

        firebase.fetchChildSeqSummary(this.state.sessionId).then(summary => {
          this.setState({
            noOppTime: summary[0].noopp,
            noAcTime: summary[0].noac,
            acTime: summary[0].yesac,
            totalTime: summary[0].total,
            sessionTotal: summary[0].sessionTotal,
            learningActivityTime: summary[0].sessionTotal - summary[0].total
          });
        });
      }
    );
  };

  changeSessionId = event => {
    console.log("sessionId", event.target.value);
    this.setState(
      {
        sessionId: event.target.value
      },
      () => {
        this.handleNotesFetching(this.state.sessionId);
        this.handleListDetailFetching(this.state.sessionId);
        // let firebase = this.context;

        // firebase.fetchChildACSummary(this.state.sessionId).then(summary => console.log("summary time: ", summary[0].childAC));

        // firebase.fetchChildACSummary(this.state.sessionId).then(summary=>{
        //     this.setState({
        //         noOppTime: summary[0].noopp,
        //         noAcTime: summary[0].noac,
        //         acTime: summary[0].yesac,
        //         totalTime: summary[0].total,
        //         sessionTotal: summary[0].sessionTotal,
        //         learningActivityTime: summary[0].sessionTotal - summary[0].total
        //
        //     })});
      }
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {firebase => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <main>
          <Grid
            container
            spacing={0}
            justify="center"
            direction={"row"}
            alignItems={"center"}
          >
            <Grid container item xs={3}>
              <List className={classes.buttonsList}>
                <ListItem>
                  <img
                    src={SequentialIconImage}
                    style={{
                      width: "15vw",
                      height: "10vh",
                      position: "center"
                    }}
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    select
                    className={classes.viewButtons}
                    label="Date"
                    value={this.state.sessionId}
                    onChange={this.changeSessionId}
                    InputLabelProps={{ shrink: true }}
                  >
                    {this.state.sessionDates.map((date, index) => {
                      return (
                        <MenuItem key={index} id={date.id} value={date.id}>
                          <em>
                            {moment(date.sessionStart.value).format(
                              "MMM Do YY hh:mm A"
                            )}
                          </em>
                        </MenuItem>
                      );
                    })}
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
                      this.state.view === ViewEnum.DETAILS
                        ? "contained"
                        : "outlined"
                    }
                    className={classes.viewButtons}
                    onClick={this.listClick}
                  >
                    Details
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
                    color={"primary"}
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
                    <img src={GenerateReportImage}
                      style={{
                        height: "10vh",
                        width: "10vh"
                      }}
                    />
                  </IconButton>
                </ListItem>
              </List>
            </Grid>
            <Grid
              container
              item
              xs={8}
              justify="center"
              direction={"row"}
              alignItems={"center"}
            >
              <Typography
                variant={"h4"}
                alignItems={"center"}
                justify={"center"}
              >
                Sequential Results
              </Typography>
              <Grid item xs={12}>
                <div>
                  {this.state.view === ViewEnum.SUMMARY ? (
                    <div className={classes.resultsContent}>
                      <ChildTeacherBehaviorPieSlider />
                    </div>
                  ) : this.state.view === ViewEnum.DETAILS ? (
                    <div className={classes.resultsContent}>
                      <ChildTeacherBehaviorDetailsSlider />
                    </div>
                  ) : this.state.view === ViewEnum.TRENDS ? (
                    <div className={classes.resultsContent}></div>
                  ) : this.state.view === ViewEnum.NOTES ? (
                    <div className={classes.resultsContent}></div>
                  ) : this.state.view === ViewEnum.NEXT_STEPS ? (
                    <div className={classes.resultsContent} /> // replace this null with next steps content
                  ) : null}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

SequentialActivitiesResultsPage.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withStyles(styles)(SequentialActivitiesResultsPage);
