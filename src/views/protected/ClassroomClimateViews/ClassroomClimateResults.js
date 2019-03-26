import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton/IconButton";
import Select from "@material-ui/core/Select";
import LinearProgress from "@material-ui/core/LinearProgress";
import ClassroomClimateIcon from "../../../assets/icons/ClassroomClimate.svg";
import { ReactComponent as GenerateReportSVG } from "../../../assets/icons/generateReport.svg";
import { withStyles } from "@material-ui/core/styles";
import spreadsheetData from "../../../SPREADSHEET_SECRETS";
import FirebaseContext from "../../../components/Firebase/context";
import AppBar from "../../../components/AppBar";
import Typography from "@material-ui/core/Typography/Typography";
import { ImmortalDB } from "immortal-db";
import { VictoryPie } from "victory-pie";
import exNegativeFace from "../../../assets/icons/1-ex-negative-cqref.png";
import negativeFace from "../../../assets/icons/2-negative-cqref.png";
import flatFace from "../../../assets/icons/3-flat-cqref.png";
import pleasantFace from "../../../assets/icons/4-pleasant-cqref.png";
import vibrantFace from "../../../assets/icons/5-vibrant-cqref.png";
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
// import ListDetailTableClassroomClimateResults from "../../../components/ResultsComponents/ListDetailTableClassroomClimateResults.js";

import NotesListDetailTable from "../../../components/ResultsComponents/NotesListDetailTable.js";
import BehaviorCounterResults from "../../../components/ResultsComponents/BehaviorCounterResults.js";
import AverageToneRating from "../../../components/ResultsComponents/AverageToneRating.js";
import ClimateTrendsGraph from "../../../components/ResultsComponents/ClimateTrendsGraph.js";
import BehaviorCounter from "../../../components/ClassroomClimateComponent/BehaviorCounter.js";


const styles = {
    root: {
        flexGrow: 1,
        height: '100vh',
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
    },
};

const ViewEnum = {
    SUMMARY: 1,
    DETAILS: 2,
    TRENDS: 3,
    NOTES: 4,
    NEXT_STEPS: 5
};

// dummy data for classroom climate list detail table, when we read in from DB we can use custom id
// let id = 0;
function createData(time, notes) {
    // id += 1;
    return { time, notes };
}

const classroomClimateNotes = [
    createData("08:32", "Kiss your brain"),
    createData("08:44", "Great super friend"),
    createData("09:01", "Lots of good jobs"),
    createData("09:37", "BD frown"),
    createData("09:56", "Close down center conflict")
];
// end of list detail table data

class ClassroomClimateResults extends React.Component {
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
        sessionDates: [],
        disapprovalBehaviorCount: 0,
        redirectionsBehaviorCount: 0,
        nonspecificBehaviorCount: 0,
        specificBehaviorCount: 0,
        averageToneRating:0,
        percentage: false,
        sessionId: null,
        trendsDates: [],
        trendsPos: [],
        trendsNeg: [],
        trendsPosCol: [],
        trendsNegCol: []
    };

    componentDidMount() {
        let teacherId = this.props.location.state.teacher.id;
        console.log(this.props.location.state);
        this.handleDateFetching(this.props.location.state.teacher.id);
        console.log(teacherId);
        console.log("handle behavior count results fetching called")
        let firebase = this.context;
        firebase.fetchBehaviourTypeCount(this.state.sessionId).then((data)=>{
          console.log(this.state.disapprovalBehaviorCount
            + " " + this.state.redirectionsBehaviorCount
            + " " + this.state.nonspecificBehaviorCount
            + " " + this.state.specificBehaviorCount)
        });
        this.handleTrendsFetching(teacherId);
  }

    handleAppend(entry) {
        let newEntries = this.state.entries;
        entry.type = this.state.type;
        newEntries.push(entry);
        this.setState({ entries: newEntries });

        this.handleSpreadsheetAppend(entry);

        this.handleDBinsert(entry);
    }

    handleTypeChange(newType) {
        this.setState({ type: newType });
        this.changeHex(newType);
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

    handleSpreadsheetAppend = entry => {
        let url = new URL(spreadsheetData.scriptLink),
            params = {
                sheet: "ClassroomClimateTime",
                del: "false",
                TrnDur: entry.time
            };
        Object.keys(params).forEach(key =>
            url.searchParams.append(key, params[key])
        );
        fetch(url, {
            method: "POST",
            credentials: "include",
            mode: "no-cors",
            headers: {
                "content-type": "application/json"
            }
        })
            .then(response => console.log("Success"))
            .catch(error => console.error("Error:", error));
    };

    summaryClick = () => {
        if (this.state.view !== ViewEnum.SUMMARY) {
            this.setState({ view: ViewEnum.SUMMARY });
        }
    };

    detailsClick = () => {
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

      handleDateFetching = (teacherId) => {
          console.log("handle date fetching called")
        let firebase = this.context;
        firebase.fetchClimateSessionDates(teacherId).then(dates=>this.setState({
          sessionDates: dates
        }));

        firebase.fetchAvgToneRating(this.state.sessionId);
        firebase.fetchBehaviourTypeCount(this.state.sessionId);
        firebase.fetchBehaviourTrend(teacherId);
      };

      handleTrendsFetching = (teacherId) => {
        let firebase = this.context;
        let dateArray = [];
        let posArray =[];
        let negArray = [];
        let posBkgColor = [];
        let negBkgColor = [];
        firebase.fetchBehaviourTrend(teacherId).then(dataSet => {
          dataSet.map(data => {
            dateArray.push(moment(data.dayOfEvent.value).format("MMM Do YYYY"));
            posArray.push(data.positive);
            negArray.push(data.negative);
            posBkgColor.push('#008000');
            negBkgColor.push('#FF0000');
          });
          this.setState({
            trendsDates: dateArray,
            trendsPos: posArray,
            trendsNeg: negArray,
            trendsPosCol: posBkgColor,
            trendsNegCol: negBkgColor
          })
        });
      };

      trendsFormatData = () => {
        return {
          labels: this.state.trendsDates,
          datasets:  [
            {
              label: 'Disapproval',
              data: this.state.trendsNeg,
              backgroundColor: this.state.trendsNegCol
            },
            {
              label: 'Positive',
              data: this.state.trendsPos,
              backgroundColor: this.state.trendsPosCol
            }
          ]
        }
      };



      changeSessionId = (event) =>{
        console.log("sessionId",event.target.value);
        this.setState({
          sessionId: event.target.value,
        }, () => {

                  let firebase = this.context;
                  firebase.fetchAvgToneRating(this.state.sessionId).then(json=>json.map(toneRating=>{
                    this.setState({
                      averageToneRating:toneRating.average
                    })
                  }));

                  firebase.fetchBehaviourTypeCount(this.state.sessionId).then(json=>console.log("attempt behavior count: ", json));
                  //.gets json, then map to the state
                  firebase.fetchBehaviourTypeCount(this.state.sessionId).then(json=>json.map(behavior=>{
                    switch (behavior.behaviorResponse) {
                      case "specificapproval":
                          this.setState({
                            specificBehaviorCount:behavior.count
                          });
                          break;
                          case "nonspecificapproval":
                              this.setState({
                                  nonspecificBehaviorCount:behavior.count
                              });
                          break;
                      case "disapproval":
                          this.setState({
                              disapprovalBehaviorCount:behavior.count
                          });
                      break;
                      case "redirection":
                          this.setState({
                              redirectionsBehaviorCount:behavior.count
                          });
                      break;

                      default:

                    }
                  }));
        });
      };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <FirebaseContext.Consumer>
                    {firebase => <AppBar firebase={firebase} />}
                </FirebaseContext.Consumer>
                <main>
                    <Grid container spacing={0} justify="center" direction={"row"} alignItems={"center"}>
                        <Grid container item xs={3}>
                            <List className={classes.buttonsList}>
                            <ListItem>
                              <img src={ClassroomClimateIcon} style={{width:"15vw", height:"10vh", position:"center"}} />
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
                                      <em>{moment(date.start.value).format("MMM Do YY HH:mm A")}</em>
                                    </MenuItem>})}
                                  </TextField>
                                    {/*<form>*/}
                                        {/*<FormControl*/}
                                            {/*variant="filled"*/}
                                            {/*className={classes.viewButtons}*/}
                                        {/*>*/}
                                            {/*<InputLabel htmlFor="filled-age-simple">*/}
                                                {/*Date*/}
                                            {/*</InputLabel>*/}
                                            {/*<Select  value={this.state.sessionId}*/}
                                              {/*onChange={this.changeSessionId}>*/}
                                              {/*{this.state.sessionDates.map(date=> {return <MenuItem id={date.id} value={date.id}>*/}
                                                {/*<em>{moment(date.start.value).format("MMM Do YY HH:mm A")}</em>*/}
                                              {/*</MenuItem>})}*/}
                                            {/*</Select>*/}
                                        {/*</FormControl>*/}
                                    {/*</form>*/}
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
                                        onClick={this.detailsClick}
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
                                            this.state.view ===
                                            ViewEnum.NEXT_STEPS
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
                                    <IconButton
                                        className={classes.generateReport}
                                    >
                                        <GenerateReportSVG
                                            style={{
                                                height: "88px",
                                                width: "88px"
                                            }}
                                        />
                                    </IconButton>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid container item xs={8} justify="center" direction={"row"} alignItems={"center"}>
                          <Typography variant={"h4"} alignItems={"center"} justify={"center"}>
                            Classroom Climate Results
                          </Typography>
                            <Grid item xs={10}>
                                <div>
                                    {this.state.view ===
                                    ViewEnum.SUMMARY ? (
                                        <div className={classes.resultsContent}>
                                          {this.state.percentage = false}
                                      <Grid>
                                      <FirebaseContext.Consumer>
                                        {firebase =>
                                          <AverageToneRating
                                          averageToneRating={
                                            this.state.averageToneRating
                                          }
                                          firebase={firebase}
                                        />}
                                      </FirebaseContext.Consumer>
                                      </Grid>
                                      <Grid>
                                      <FirebaseContext.Consumer>
                                        {firebase =>
                                          <BehaviorCounterResults
                                            percentage={
                                              this.state.percentage
                                            }
                                            disapprovalBehaviorCount={
                                              this.state.disapprovalBehaviorCount
                                            }
                                            redirectionsBehaviorCount={
                                              this.state.redirectionsBehaviorCount
                                            }
                                            nonspecificBehaviorCount={
                                              this.state.nonspecificBehaviorCount
                                            }
                                            specificBehaviorCount={
                                              this.state.specificBehaviorCount
                                            }
                                            firebase={firebase}
                                          />}
                                      </FirebaseContext.Consumer>
                                    </Grid>

                                        </div>
                                    ) : this.state.view ===
                                      ViewEnum.DETAILS ? (
                                        <div className={classes.detailsGraph}>
                                        {this.state.percentage = true}
                                            <Grid>
                                            <FirebaseContext.Consumer>
                                              {firebase =>
                                                <BehaviorCounterResults
                                                  percentage = {
                                                    this.state.percentage
                                                  }
                                                  disapprovalBehaviorCount={
                                                    this.state.disapprovalBehaviorCount
                                                  }
                                                  redirectionsBehaviorCount={
                                                    this.state.redirectionsBehaviorCount
                                                  }
                                                  nonspecificBehaviorCount={
                                                    this.state.nonspecificBehaviorCount
                                                  }
                                                  specificBehaviorCount={
                                                    this.state.specificBehaviorCount
                                                  }
                                                  firebase={firebase}
                                                />}
                                            </FirebaseContext.Consumer>
                                            </Grid>
                                        </div>
                                    ) : this.state.view ===
                                      ViewEnum.TRENDS ? (
                                            <div className={classes.resultsContent}>
                                              <ClimateTrendsGraph
                                                data={this.trendsFormatData}
                                                />
                                            </div>
                                    ) : this.state.view ===
                                      ViewEnum.NOTES ? (
                                        <div className={classes.resultsContent}>
                                            <NotesListDetailTable
                                                data={classroomClimateNotes}
                                            />
                                        </div>
                                    ) : this.state.view ===
                                      ViewEnum.NEXT_STEPS ? (
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

ClassroomClimateResults.propTypes = {
    classes: PropTypes.object.isRequired
};
ClassroomClimateResults.contextType = FirebaseContext;
export default withStyles(styles)(ClassroomClimateResults);
