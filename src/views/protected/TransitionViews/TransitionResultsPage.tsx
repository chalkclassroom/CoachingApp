import * as React from "react";
import * as PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button/Button";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabBar from "@material-ui/core/AppBar";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import AppBar from "../../../components/AppBar";
import Typography from "@material-ui/core/Typography/Typography";
// import { ImmortalDB } from "immortal-db";
import NotesListDetailTable from "../../../components/ResultsComponents/NotesListDetailTable.tsx";
import DataQuestions from "../../../components/ResultsComponents/DataQuestions.tsx";
import TransitionCoachingQuestions from "../../../components/TransitionComponents/ResultsComponents/TransitionCoachingQuestions"
import "chartjs-plugin-datalabels";
import TransitionTimePie from "../../../components/ResultsComponents/TransitionTimePie";
import TransitionBarChart from "../../../components/ResultsComponents/TransitionBarChart.tsx";
import TransitionTrendsGraph from "../../../components/ResultsComponents/TransitionTrendsGraph.tsx";
import * as moment from "moment";
import ChildWaitingImage from "../../../assets/images/ChildWaitingImage.svg";
import WaitingInLineImage from "../../../assets/images/WaitingInLineImage.svg";
import WalkingImage from "../../../assets/images/WalkingImage.svg";
import ClassroomRoutinesImage from "../../../assets/images/ClassroomRoutinesImage.svg";
import BMDImage from "../../../assets/images/BMDImage.svg";
import {
  lightGreen,
  deepOrange,
  orange,
  blue,
  indigo
} from "@material-ui/core/colors";
import { red } from "@material-ui/core/es/colors";
import CardContent from "@material-ui/core/CardContent";
import ResultsDashboard from '../../../components/ResultsDashboard';

const styles: object = {
  root: {
    flexGrow: 1,
    height: "100vh",
    flexDirection: "column"
  },
  resultsContent: {
    position: "relative",
    width: '60vw',
    marginTop: '5vh'
  },
  buttonText: {
    fontSize: "12px",
    textAlign: "center"
  },
  transitionTypeButton: {
    width: "70px",
    height: "70px"
  },
  tabBar: {
    marginBottom: "10px",
    height: "5%",
    width: "100%"
  },
  coachPrepCard: {
    width: "100%",
    overflow: "auto"
  },
};

const TransitionTypeColors = {
  lineColor: lightGreen[300],
  travelingColor: orange[400],
  waitingColor: deepOrange[400],
  routinesColor: blue[300],
  behaviorManagementColor: red['A200'],
  otherColor: indigo['A200'],
}

const raisedThemes = createMuiTheme({
  palette: {
    waitingColor: {
      backgroundColor: lightGreen[300],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white',
      boxShadow: "4px 4px #a9a9a9"
    },
    travelingColor: {
      backgroundColor: orange[400],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white',
      boxShadow: "4px 4px #a9a9a9"
    },
    childWaitingColor: {
      backgroundColor: deepOrange[400],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white',
      boxShadow: "4px 4px #a9a9a9"
    },
    classroomRoutinesColor: {
      backgroundColor: blue[300],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white',
      boxShadow: "4px 4px #a9a9a9"
    },
    bmiColor: {
      backgroundColor: red["A200"],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white',
      boxShadow: "4px 4px #a9a9a9"
    },
    otherColor: {
      backgroundColor: indigo["A200"],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white',
      boxShadow: "4px 4px #a9a9a9"
    }
  }
});

const themes = createMuiTheme({
  palette: {
    waitingColor: {
      backgroundColor: lightGreen[300],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white'
    },
    travelingColor: {
      backgroundColor: orange[400],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white'
    },
    childWaitingColor: {
      backgroundColor: deepOrange[400],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white'
    },
    classroomRoutinesColor: {
      backgroundColor: blue[300],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white'
    },
    bmiColor: {
      backgroundColor: red["A200"],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white'
    },
    otherColor: {
      backgroundColor: indigo["A200"],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white'
    }
  },
  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: "white"
      },
      textColor: 'white',
      primaryTextColor: 'white'
    }
  }
});

const ViewEnum = {
  DATA: 1,
  QUESTIONS: 2,
  COACH_PREP: 3,
  ACTION_PLAN: 4,
  NOTES: 5
};

interface Props {
  location: { state: { teacher: { id: string }}},
  classes: Style
}

interface Style {
  root: string,
  resultsContent: string,
  buttonText: string,
  transitionTypeButton: string,
  tabBar: string,
  coachPrepCard: string
}

interface State {
  view: number,
  categoryView: string,
  sessionId: string,
  sessionDates: Array<string>,
  notes: Array<object>,
  sessionLine: number,
  sessionTraveling: number,
  sessionWaiting: number,
  sessionRoutines: number,
  sessionBehaviorManagement: number,
  sessionOther: number,
  trendsDates: Array<string>,
  trendsLine: Array<number>,
  trendsTraveling: Array<number>,
  trendsWaiting: Array<number>,
  trendsRoutines: Array<number>,
  trendsBehaviorManagement: Array<number>,
  trendsOther: Array<number>,
  trendsTotalColor: string,
  transitionTime: number,
  sessionTotal: number,
  learningActivityTime: number,
  tabValue: number,
  openPanel: string,
  addedToPrep: Array<string>,
  selectedQuestions: Array<string>
}

/**
 * transition results
 * @class TransitionResultsPage
 */
class TransitionResultsPage extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);
    // this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  state = {
    view: ViewEnum.DATA,
    categoryView: '',
    sessionId: "",
    sessionDates: [],
    notes: [],
    sessionLine: 0,
    sessionTraveling: 0,
    sessionWaiting: 0,
    sessionRoutines: 0,
    sessionBehaviorManagement: 0,
    sessionOther: 0,
    trendsDates: [],
    trendsLine: [],
    trendsTraveling: [],
    trendsWaiting:  [],
    trendsRoutines: [],
    trendsBehaviorManagement:  [],
    trendsOther: [],
    trendsTotal: [],
    trendsTotalColor: "#0988EC",
    // totalTime: null,
    transitionTime: 0,
    sessionTotal: 0,
    learningActivityTime: 0,
    tabValue: 0,
    openPanel: '',
    addedToPrep: [],
    selectedQuestions: []
  };

  /** lifecycle method invoked after component mounts */
  componentDidMount() {
    const teacherId = this.props.location.state.teacher.id;
    this.handleTrendsFetch(teacherId);

    this.handleDateFetching(this.props.location.state.teacher.id);
  }

  /**
   * @param {string} teacherId
   */
  handleTrendsFetch = (teacherId: string) => {
    const firebase = this.context;
    const dateArray: Array<string> = [];
    const lineArray: Array<number> = [];
    const travelingArray: Array<number> = [];
    const waitingArray: Array<number> = [];
    const routinesArray: Array<number> = [];
    const behaviorManagementArray: Array<number> = [];
    const otherArray: Array<number> = [];
    const totalArray: Array<number> = [];
    let formattedTime;
    firebase.fetchTransitionTrend(teacherId).then(dataSet => {
      dataSet.forEach(data => {
        formattedTime = this.handleTrendsFormatTime(data.total);
        dateArray.push(
          moment(data.startDate.value).format("MMM Do"),
          formattedTime
        );
        lineArray.push(Math.floor(data.line / data.sessionTotal * 100));
        travelingArray.push(Math.floor(data.traveling / data.sessionTotal * 100));
        waitingArray.push(Math.floor(data.waiting / data.sessionTotal * 100));
        routinesArray.push(Math.floor(data.routines / data.sessionTotal * 100));
        behaviorManagementArray.push(Math.floor(data.behaviorManagement / data.sessionTotal * 100));
        otherArray.push(Math.floor(data.other / data.sessionTotal * 100));
        totalArray.push(Math.floor((data.total / data.sessionTotal) * 100));
      });

      this.setState({
        trendsDates: dateArray,
        trendsLine: lineArray,
        trendsTraveling: travelingArray,
        trendsWaiting: waitingArray,
        trendsRoutines: routinesArray,
        trendsBehaviorManagement: behaviorManagementArray,
        trendsOther: otherArray,
        trendsTotal: totalArray
      });
    });
  };

  /**
   * @param {number} totalTime
   * @return {number}
   */
  handleTrendsFormatTime = (totalTime: number) => {
    const seconds = Math.round(totalTime / 1000 % 60);
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
          label: 'WAITING IN LINE',
          backgroundColor: TransitionTypeColors.lineColor,
          borderColor: TransitionTypeColors.lineColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsLine,
        },
        {
          label: 'TRAVELING',
          backgroundColor: TransitionTypeColors.travelingColor,
          borderColor: TransitionTypeColors.travelingColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsTraveling,
        },
        {
          label: 'CHILD WAITING',
          backgroundColor: TransitionTypeColors.waitingColor,
          borderColor: TransitionTypeColors.waitingColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsWaiting,
        },
        {
          label: 'ROUTINES',
          backgroundColor: TransitionTypeColors.routinesColor,
          borderColor: TransitionTypeColors.routinesColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsRoutines,
        },
        {
          label: 'BEHAVIOR MANAGEMENT',
          backgroundColor: TransitionTypeColors.behaviorManagementColor,
          borderColor: TransitionTypeColors.behaviorManagementColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsBehaviorManagement,
        },
        {
          label: 'OTHER',
          backgroundColor: TransitionTypeColors.otherColor,
          borderColor: TransitionTypeColors.otherColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsOther,
        }
      ]
    };
  };

  /**
   * @param {string} sessionId
   */
  handleNotesFetching = (sessionId: string) => {
    const firebase = this.context;
    firebase.handleFetchNotesResults(sessionId).then(notesArr => {
      const formattedNotesArr: {id: number, content: string, timestamp: any}[] = [];
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
      this.setState({
        notes: formattedNotesArr
      });
    });
  };

  dataClick = () => {
    if (this.state.view !== ViewEnum.DATA) {
      this.setState({ view: ViewEnum.DATA });
    }
  };

  questionsClick = () => {
    if (this.state.view !== ViewEnum.QUESTIONS) {
      this.setState({ view: ViewEnum.QUESTIONS });
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

  /**
   * @param {string} teacherId
   */
  handleDateFetching = (teacherId: string) => {
    const firebase = this.context;
    firebase.fetchSessionDates(teacherId, "transition").then((dates: Array<string>) =>
      this.setState({
        sessionDates: dates
      })
    );
  };

  handleSummary = () => {
    if (this.state.tabValue !== 0) {
      this.setState({
        tabValue: 0
      })
    }
  };

  handleDetails = () => {
    if (this.state.tabValue !== 1) {
      this.setState({
        tabValue: 1
      })
    }
  };

  handleTrends = () => {
    if (this.state.tabValue !== 2) {
      this.setState({
        tabValue: 2
      })
    }
  };

  /**
   * @param {string} panel
   */
  handlePanelChange = (panel: string) => {
    if (this.state.openPanel === panel) {
      this.setState({ openPanel: '' });
    } else {
      this.setState({ openPanel: panel });
    }
  };

  /**
   * @param {string} panel
   */
  handleAddToPlan = (panel: string) => {
    if (!this.state.addedToPrep.includes(panel)) {
      this.setState({ addedToPrep: [...this.state.addedToPrep, panel] });
    }
  };

  /**
   * @param {event} event
   */
  changeSessionId = (event) => {
    this.setState({
      sessionId: event.target.value,
    }, () => {
      this.handleNotesFetching(this.state.sessionId);
      const firebase = this.context;

      firebase.fetchTransitionSummary(this.state.sessionId).then(summary=>{
        console.log("the start date is ", summary[0].startDate.value);
        console.log("the total transition time is ", summary[0].total);
        console.log("the session total is ", summary[0].sessionTotal);
        console.log("the learning activity time is ", summary[0].sessionTotal - summary[0].total);
        this.setState({
          transitionTime: summary[0].total,
          sessionTotal: summary[0].sessionTotal,
          learningActivityTime: summary[0].sessionTotal - summary[0].total
        })
      });

      firebase.fetchTransitionTypeSummary(this.state.sessionId).then(type => {
        this.setState({
          sessionLine: Math.round(((type[0].line/type[0].total)*100)),
          sessionTraveling: Math.round(((type[0].traveling/type[0].total)*100)),
          sessionWaiting: Math.round(((type[0].waiting/type[0].total)*100)),
          sessionRoutines: Math.round(((type[0].routines/type[0].total)*100)),
          sessionBehaviorManagement: Math.round(((type[0].behaviorManagement/type[0].total)*100)),
          sessionOther: Math.round(((type[0].other/type[0].total)*100)),
          transitionTime: type[0].total
        })
      });
  })};

  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.exact({ state: PropTypes.exact({ teacher: PropTypes.exact({ id: PropTypes.string})})}).isRequired
  };

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {(firebase: object) => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <Grid container spacing={16} justify="center" direction="row" alignItems="center">
          <Grid item xs={3}>
            <Grid container 
              alignItems="center"
              justify="center"
              direction="column"
            >
              <ResultsDashboard
                magic8="Transition Time"
                view={this.state.view}
                dataClick={this.dataClick}
                questionsClick={this.questionsClick}
                coachPrepClick={this.coachPrepClick}
                actionPlanClick={this.actionPlanClick}
                notesClick={this.notesClick}
                viewEnum={ViewEnum}
                sessionId={this.state.sessionId}
                changeSessionId={this.changeSessionId}
                sessionDates={this.state.sessionDates}
              />
            </Grid>
          </Grid>
          <Grid container xs={8} justify="flex-start" direction="column" alignItems="center" style={{height: '90vh'}}>
            <div>
              {this.state.view === ViewEnum.DATA ? (
                <div className={classes.resultsContent} style={{width: '60vw'}}>
                  <Grid item>
                    <TabBar position="static" color="default" className={classes.tabBar}>
                      <Tabs
                        value={this.state.tabValue}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                      >
                        <Tab label="Summary" onClick={this.handleSummary} />
                        <Tab label="Details" onClick={this.handleDetails} />
                        <Tab label="Trends" onClick={this.handleTrends} />
                      </Tabs>
                    </TabBar>
                  </Grid>
                  <Grid item>
                    {this.state.tabValue === 0 ? (
                      <div>
                        {this.state.sessionId ? (
                          <div>
                            <Typography variant="h5" style={{padding: 15, textAlign: "center"}}>
                              Total Session Time: {Math.floor((this.state.sessionTotal/1000)/60)}m {Math.round((((this.state.sessionTotal/1000)/60) % 1) * 60) }s
                            </Typography>
                            <TransitionTimePie
                              transitionTime={this.state.transitionTime}
                              learningActivityTime={this.state.learningActivityTime}
                              style={{overflow:"hidden", width: '100%'}}
                            />
                          </div>
                        ) : (
                          <Typography variant="h5" style={{padding: 15, textAlign: "center"}}>
                            Please choose a date from the dropdown menu.
                          </Typography>
                        )}
                      </div>
                      ) : this.state.tabValue === 1 ? (
                      <div>
                        <Grid style={{alignItems: "center"}}>
                          {this.state.sessionId ? (
                            <div>
                              <Typography variant="h5" style={{padding: 15, textAlign: "center"}}>
                                Total Transition Time: {Math.floor((this.state.transitionTime/1000)/60)}m {Math.round((((this.state.transitionTime/1000)/60) % 1) * 60) }s
                              </Typography>
                              <TransitionBarChart
                                line={this.state.sessionLine}
                                traveling={this.state.sessionTraveling}
                                waiting={this.state.sessionWaiting}
                                routines={this.state.sessionRoutines}
                                behaviorManagement={this.state.sessionBehaviorManagement}
                                other={this.state.sessionOther}
                                style={{alignItems: "center", width: '100%', border: '20px solid blue'}}
                              />
                          </div>
                          ) : (
                            <Typography variant="h5" style={{padding: 15, textAlign: "center"}}>
                            Please choose a date from the dropdown menu.
                            </Typography>
                          )}
                        </Grid>
                      </div>
                    ) : (
                      <div>
                        <TransitionTrendsGraph
                          data={this.handleTrendsFormatData}
                          style={{overflow:"hidden", width: '100%', border: '20px solid blue'}}
                        />
                      </div>
                    )}
                  </Grid>
                </div>
              ) : this.state.view === ViewEnum.NOTES ? (
                <div className={classes.resultsContent}>
                  <Grid item>
                    <NotesListDetailTable
                      data={this.state.notes}
                      style={{overflow:"hidden", minWidth: '100%'}}
                    />
                  </Grid>
                </div>
              ) : this.state.view === ViewEnum.QUESTIONS ? (
                <div className={classes.resultsContent}>
                  <TransitionCoachingQuestions />
                </div>
              ) : this.state.view === ViewEnum.COACH_PREP ? (
                <div className={classes.resultsContent}>
                  <Grid>
                    <Card className={classes.coachPrepCard} style={{height: "30vh"}}>
                      <CardContent>
                        <Typography variant="h5">
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
                        {this.state.selectedQuestions.map((item, index) => (
                          <div key={index}>
                            <Typography
                              variant="h6"
                              style={{textDecoration: "underline"}}
                            >
                              {item.type}
                            </Typography>
                            <ol style={{marginTop: ".5vh", marginBottom: "1vh"}}>
                              {item.questions.map((question: string, i: number) => (
                                <li key={i}>
                                  <Typography
                                    variant="subtitle2"
                                  >
                                    {question}
                                  </Typography>
                                </li>
                              ))}
                            </ol>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                    <Card className={classes.coachPrepCard} style={{height: "20vh"}}>
                      <CardContent>
                        <Typography variant="h5">
                          Strengths-Based Feedback
                        </Typography>
                        <TextField
                          placeholder="Add your observations of positive things the teacher did."
                          fullWidth
                          multiline
                        />
                      </CardContent>
                    </Card>
                    <Card className={classes.coachPrepCard} style={{height: "20vh"}}>
                      <CardContent>
                        <Typography variant="h5">
                          Notes
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </div>
              ) : this.state.view === ViewEnum.ACTION_PLAN ? (
                <div className={classes.resultsContent} /> // replace this null with next steps content
              ) : null}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

TransitionResultsPage.contextType = FirebaseContext;
export default withStyles(styles)(TransitionResultsPage);
