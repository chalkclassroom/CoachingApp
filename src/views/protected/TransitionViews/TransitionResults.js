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
import IconButton from "@material-ui/core/IconButton/IconButton";
import Select from "@material-ui/core/Select";
import { ReactComponent as GenerateReportSVG } from "../../../assets/icons/generateReport.svg";

import { withStyles } from "@material-ui/core/styles";
import spreadsheetData from "../../../SPREADSHEET_SECRETS";
import FirebaseContext from "../../../components/Firebase/context";
import AppBar from "../../../components/AppBar";
import Typography from "@material-ui/core/Typography/Typography";
import { ImmortalDB } from "immortal-db";
import { VictoryPie } from "victory-pie";
import ListDetailTableTransitionResults from "../../../components/ResultsComponents/ListDetailTableTransitionResults.js";
import NotesListDetailTable from "../../../components/ResultsComponents/NotesListDetailTable";
import { Line } from "react-chartjs-2";
import 'chartjs-plugin-datalabels';

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
    left: "20%",
    top: "13%"
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
  }
};

const ViewEnum = {
  SUMMARY: 1,
  LIST: 2,
  TRENDS: 3,
  NOTES: 4,
  NEXT_STEPS: 5
};

// dummy data for transition list detail table, when we read in from DB we can use custom id
let id = 0;

function createTransitionData(startTime, duration, notes, type) {
  id += 1;
  return { id, startTime, duration, notes, type };
}

function createNotesData(time, notes) {
  id += 1;
  return { id, time, notes };
}

const transitionData = [
  createTransitionData("08:32", "2m 3s", "Breakfast to am meeting", "INSIDE"),
  createTransitionData("08:44", "5m 10s", "Line up for bathroom", "OUTSIDE"),
  createTransitionData("09:01", "1m 7s", "T finding book", "WAIT"),
  createTransitionData("09:37", "1m 56s", "Rotating rooms", "WAIT"),
  createTransitionData("09:56", "3m 2s", "Cleanup after centers", "INSIDE")
];

const transitionNotes = [
  createNotesData("08:32", "Kiss your brain"),
  createNotesData("08:44", "Great super friend"),
  createNotesData("09:01", "Lots of good jobs"),
  createNotesData("09:37", "BD frown"),
  createNotesData("09:56", "Close down center conflict")
];

/**
 * specifies data sets (and formatting) for transition trends graph
 * @type {{datasets: *[], labels: string[][]}}
 */
const transitionTrendData = {
  labels: [
    ["Jan 5", "0:44:42"],
    ["Feb 16", "1:13:12"],
    ["Mar 8", "0:32:57"],
    ["Apr 23", "0:25:16"],
    ["May 12", "0:55:32"]
  ],
  datasets: [
    {
      label: "TOTAL",
      backgroundColor: "#0988EC", //blue
      borderColor: "#0988EC",
      fill: false,
      lineTension: 0,
      data: [27, 45, 49, 17, 30]
    },
    {
      label: "INSIDE",
      backgroundColor: "#E99C2E", //yellow
      borderColor: "#E99C2E",
      fill: false,
      lineTension: 0,
      data: [7, 5, 25, 0, 15]
    },
    {
      label: "OUTSIDE",
      backgroundColor: "#E55529", //orange
      borderColor: "#E55529",
      fill: false,
      lineTension: 0,
      data: [5, 20, 8, 0, 8]
    },
    // {
    //   label: "WAIT",
    //   backgroundColor: "rgb(54, 162, 235)",
    //   borderColor: "rgb(54, 162, 235)",
    //   fill: false,
    //   lineTension: 0,
    //   data: [15, 20, 16, 17, 8]
    // }
  ]
};

/**
 * formatting for transition trends graph, including title and scales for the axes
 * @type {{showScale: boolean, pointDot: boolean, scales: {yAxes: {ticks: {min: number, max: number, callback: (function(*): string), beginAtZero: boolean}, scaleLabel: {labelString: string, display: boolean, fontStyle: string}}[], xAxes: {display: boolean, scaleLabel: {labelString: string, display: boolean, fontStyle: string}}[]}, title: {display: boolean, fontSize: number, text: string, fontStyle: string}, showLines: boolean}}
 */
const transitionTrendOptions = {
  showScale: true,
  pointDot: true,
  showLines: true,
  // title: {
  //     display: true,
  //     text: 'Transition Time Trends',
  //     fontSize: 20,
  //     fontStyle: 'bold'
  // },
  tooltips: {
      mode: 'index',
      intersect: false
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
          labelString: "Date & Total Time in Transition",
          fontStyle: "bold"
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 100,
          callback: function(value) {
            return value + "%";
          }
        },
        scaleLabel: {
          display: true,
          labelString: "Percentage of Total Time Spent in Transition",
          fontStyle: "bold"
        }
      }
    ]
  },
  plugins: {
    datalabels: {
      display: 'auto',
      color: 'gray',
      align: 'top',
      formatter: function(value, context) {
        return value + '%';
      }
    }
  }
};

class TransitionResults extends React.Component {
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
    view: ViewEnum.SUMMARY
  };

  componentDidMount() {
    console.log(this.props.location.state);
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
        sheet: "TransitionTime",
        del: "false",
        TrnStart: entry.start,
        TrnEnd: entry.end,
        TrnDur: entry.duration,
        TrnType: entry.type,
        TeacherID: this.props.location.state.key.id
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

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {firebase => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <main>
          <Grid container spacing={16} justify="center" direction={"row"}>
            <Grid container item xs={4}>
              <List className={classes.buttonsList}>
                <ListItem>
                  <form>
                    <FormControl
                      variant="filled"
                      className={classes.viewButtons}
                    >
                      <InputLabel htmlFor="filled-age-simple">Date</InputLabel>
                      <Select
                        input={
                          <FilledInput name="age" id="filled-age-simple" />
                        }
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Mon, Oct 22, 2018</MenuItem>
                        <MenuItem value={20}>Tue, Nov 6, 2018</MenuItem>
                        <MenuItem value={30}>Thurs, Nov 29, 2018</MenuItem>
                      </Select>
                    </FormControl>
                  </form>
                </ListItem>
                <ListItem>
                  <Button
                    size="large"
                    color={"secondary"}
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
                    color={"secondary"}
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
                    color={"inherit"}
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
                    color={"inherit"}
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
              </List>
            </Grid>
            <Grid container item xs={8}>
              <Grid container item direction={"row"}>
                <Grid item xs={12}>
                  <Typography variant={"h5"} className={classes.title}>
                    Transition Time Results
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <div style={{ height: 20 }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant={"h7"} className={classes.secondTitle}>
                    Total Transition Time:{" "}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <div>
                    {this.state.view === ViewEnum.SUMMARY ? (
                      <div style={{ height: "80vh" }}>
                        <VictoryPie
                          data={[
                            {
                              x: "Inside Transition\n(17%)",
                              y: 15
                            },
                            {
                              x: "Outside Transition\n(17%)",
                              y: 12
                            },
                            {
                              x: "Non-Transition\n(17%)",
                              y: 47
                            }
                          ]}
                          colorScale={["#E99C2E", "#E55529", "#0988EC"]}
                          //labelRadius={75}
                          style={{
                            labels: {
                              fill: "black",
                              fontSize: 12
                            }
                          }}
                        />
                      </div>
                    ) : this.state.view === ViewEnum.LIST ? (
                      <div
                        style={{
                          height: "60vh",
                          position: "relative",
                          marginTop: "100px",
                          left: "7%"
                        }}
                      >
                        <ListDetailTableTransitionResults
                          data={transitionData}
                        />
                      </div>
                    ) : this.state.view === ViewEnum.TRENDS ? (
                      <div
                        style={{
                          height: "60vh",
                          marginRight: "50px",
                          marginTop: "100px"
                        }}
                      >
                        <Line
                          data={transitionTrendData}
                          options={transitionTrendOptions}
                          width="650"
                          height="400"
                        />
                      </div>
                    ) : this.state.view === ViewEnum.NOTES ? (
                      <div
                        style={{
                          height: "60vh",
                          marginLeft: "165px",
                          marginTop: "100px"
                        }}
                      >
                        <NotesListDetailTable data={transitionNotes} />
                      </div>
                    ) : this.state.view === ViewEnum.NEXT_STEPS ? (
                      <div style={{ height: "60vh" }} /> // replace this null with next steps content
                    ) : null}
                  </div>
                </Grid>
              </Grid>
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

export default withStyles(styles)(TransitionResults);
