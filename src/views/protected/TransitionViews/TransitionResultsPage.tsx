import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import Typography from "@material-ui/core/Typography/Typography";
import TransitionCoachingQuestions from "../../../components/TransitionComponents/ResultsComponents/TransitionCoachingQuestions"
import "chartjs-plugin-datalabels";
import TransitionTimePie from "../../../components/TransitionComponents/ResultsComponents/TransitionTimePie";
import TransitionBarChart from "../../../components/TransitionComponents/ResultsComponents/TransitionBarChart";
import TransitionTrendsGraph from "../../../components/TransitionComponents/ResultsComponents/TransitionTrendsGraph";
import * as moment from "moment";
import ResultsLayout from '../../../components/ResultsLayout';
import Grid from '@material-ui/core/Grid';
import FadeAwayModal from '../../../components/FadeAwayModal';
import TeacherModal from '../HomeViews/TeacherModal';
import { connect } from 'react-redux';
import * as Constants from '../../../constants/Constants';
import * as Types from '../../../constants/Types';
import SignalWifi4BarIcon from '@material-ui/icons/SignalWifi4Bar';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

const styles: object = {
  root: {
    flexGrow: 1,
    height: "100vh",
    flexDirection: "column",
    overflowX: 'hidden',
    overflowY: 'auto'
  },
  comparisonText: {
    paddingLeft: '1em',
    lineHeight: '0.8em',
    fontFamily: 'Arimo'
  }
};

interface Props {
  classes: { root: string, comparisonText: string },
  teacherSelected: Types.Teacher,
  location: {
    state: {
      sessionId: string
    }
  },
}

interface State {
  sessionId: string,
  conferencePlanId: string,
  notes: Array<{id: string, content: string, timestamp: string}>,
  sessionLine: number,
  sessionTraveling: number,
  sessionWaiting: number,
  sessionRoutines: number,
  sessionBehaviorManagement: number,
  sessionOther: number,
  trendsDates: Array<Array<string>>,
  trendsLine: Array<number>,
  trendsTraveling: Array<number>,
  trendsWaiting: Array<number>,
  trendsRoutines: Array<number>,
  trendsBehaviorManagement: Array<number>,
  trendsOther: Array<number>,
  trendsTotal: Array<number>,
  transitionTime: number,
  sessionTotal: number,
  learningActivityTime: number,
  actionPlanExists: boolean,
  conferencePlanExists: boolean,
  addedToPlan: Array<{panel: string, number: number, question: string}>,
  sessionDates: Array<{id: string, sessionStart: {value: string}}>,
  noteAdded: boolean,
  questionAdded: boolean,
  teacherModal: boolean,
  noDataYet: boolean
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

    this.state = {
      sessionId: "",
      conferencePlanId: '',
      notes: [],
      sessionLine: 0,
      sessionTraveling: 0,
      sessionWaiting: 0,
      sessionRoutines: 0,
      sessionBehaviorManagement: 0,
      sessionOther: 0,
      trendsDates: [[]],
      trendsLine: [],
      trendsTraveling: [],
      trendsWaiting:  [],
      trendsRoutines: [],
      trendsBehaviorManagement:  [],
      trendsOther: [],
      trendsTotal: [],
      transitionTime: 0,
      sessionTotal: 0,
      learningActivityTime: 0,
      actionPlanExists: false,
      conferencePlanExists: false,
      addedToPlan: [],
      sessionDates: [],
      noteAdded: false,
      questionAdded: false,
      teacherModal: false,
      noDataYet: false
    };
  }



  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    if (this.props.teacherSelected) {
      const teacherId = this.props.teacherSelected.id;
      this.handleTrendsFetch(teacherId);
      this.handleDateFetching(teacherId);
    } else {
      this.setState({ teacherModal: true })
    }
  }

  handleCloseTeacherModal = (): void => {
    this.setState({ teacherModal: false })
  }

  /**
   * @param {string} teacherId
   */
  handleTrendsFetch = (teacherId: string): void => {
    const firebase = this.context;
    const dateArray: Array<Array<string>> = [];
    const lineArray: Array<number> = [];
    const travelingArray: Array<number> = [];
    const waitingArray: Array<number> = [];
    const routinesArray: Array<number> = [];
    const behaviorManagementArray: Array<number> = [];
    const otherArray: Array<number> = [];
    const totalArray: Array<number> = [];
    let formattedTime;
    firebase.fetchTransitionTrend(teacherId).then((dataSet: Array<{
      id: string,
      line: number,
      traveling: number,
      waiting: number,
      routines: number,
      behaviorManagement: number,
      other: number,
      total: number,
      sessionTotal: number,
      startDate: {value: string}
    }>) => {
      dataSet.forEach(data => {
        formattedTime = this.handleTrendsFormatTime(data.total);
        dateArray.push([
          moment(data.startDate.value).format("MMM Do"),
          formattedTime
        ]);
        lineArray.push(Math.round(data.line / data.sessionTotal * 100));
        travelingArray.push(Math.round(data.traveling / data.sessionTotal * 100));
        waitingArray.push(Math.round(data.waiting / data.sessionTotal * 100));
        routinesArray.push(Math.round(data.routines / data.sessionTotal * 100));
        behaviorManagementArray.push(Math.round(data.behaviorManagement / data.sessionTotal * 100));
        otherArray.push(Math.round(data.other / data.sessionTotal * 100));
        totalArray.push(Math.round((data.total / data.sessionTotal) * 100));
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
  handleTrendsFormatTime = (totalTime: number): string => {
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

  handleTrendsFormatData = (): {
    labels: Array<Array<string>>,
    datasets: Array<{
      label: string,
      backgroundColor: string,
      borderColor: string,
      fill: boolean,
      lineTension: number,
      data: Array<number>
    }>
  } => {
    return {
      labels: this.state.trendsDates,
      datasets:  [
        {
          label: 'TOTAL',
          backgroundColor: Constants.Colors.TT,
          borderColor: Constants.Colors.TT,
          fill: false,
          lineTension: 0,
          data: this.state.trendsTotal,
        },
        {
          label: 'WAITING IN LINE',
          backgroundColor: Constants.TransitionTypeColors.lineColor,
          borderColor: Constants.TransitionTypeColors.lineColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsLine,
        },
        {
          label: 'TRAVELING',
          backgroundColor: Constants.TransitionTypeColors.travelingColor,
          borderColor: Constants.TransitionTypeColors.travelingColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsTraveling,
        },
        {
          label: 'CHILD WAITING',
          backgroundColor: Constants.TransitionTypeColors.waitingColor,
          borderColor: Constants.TransitionTypeColors.waitingColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsWaiting,
        },
        {
          label: 'ROUTINES',
          backgroundColor: Constants.TransitionTypeColors.routinesColor,
          borderColor: Constants.TransitionTypeColors.routinesColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsRoutines,
        },
        {
          label: 'BEHAVIOR MANAGEMENT',
          backgroundColor: Constants.TransitionTypeColors.behaviorManagementColor,
          borderColor: Constants.TransitionTypeColors.behaviorManagementColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsBehaviorManagement,
        },
        {
          label: 'OTHER',
          backgroundColor: Constants.TransitionTypeColors.otherColor,
          borderColor: Constants.TransitionTypeColors.otherColor,
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
  handleNotesFetching = (sessionId: string): void => {
    const firebase = this.context;
    firebase.handleFetchNotesResults(sessionId).then((notesArr: Array<{
      id: string,
      content: string,
      timestamp: {
        seconds: number,
        nanoseconds: number
      }
    }>) => {
      const formattedNotesArr: Array<{id: string, content: string, timestamp: string}> = [];
      notesArr.forEach(note => {
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

  /**
   * @param {string} teacherId
   */
  handleDateFetching = (teacherId: string): void => {
    const firebase = this.context;
    this.setState({
      sessionId: "",
      conferencePlanId: '',
      notes: [],
      sessionLine: 0,
      sessionTraveling: 0,
      sessionWaiting: 0,
      sessionRoutines: 0,
      sessionBehaviorManagement: 0,
      sessionOther: 0,
      trendsDates: [[]],
      trendsLine: [],
      trendsTraveling: [],
      trendsWaiting:  [],
      trendsRoutines: [],
      trendsBehaviorManagement:  [],
      trendsOther: [],
      trendsTotal: [],
      transitionTime: 0,
      sessionTotal: 0,
      learningActivityTime: 0,
      actionPlanExists: false,
      conferencePlanExists: false,
      addedToPlan: [],
      sessionDates: [],
      noDataYet: false
    }, () => {
      firebase.fetchSessionDates(teacherId, "transition").then((dates: Array<{id: string, sessionStart: {value: string}}>) =>
        {if (dates[0]) {
          this.setState({
            sessionDates: dates,
            noDataYet: false
          }, () => {
            if (this.state.sessionDates[0]) {
              this.setState({ sessionId: (this.props.location.state !== undefined && this.props.location.state.sessionId !== undefined) ? this.props.location.state.sessionId : this.state.sessionDates[0].id },
                () => {
                  this.getData();
                }
              );
            }
          })
        } else {
          this.setState({
            noDataYet: true
          })
        }}
      );
    })
  };

  /**
   * retrieves summary, details, and notes data using the session id
   */
  getData = (): void => {
    const firebase = this.context;
    this.handleNotesFetching(this.state.sessionId);

    firebase.fetchTransitionSummary(this.state.sessionId).then((summary: Array<{
      total: number,
      sessionTotal: number,
      startDate: {value: string}
    }>)=>{
      this.setState({
        transitionTime: summary[0].total,
        sessionTotal: summary[0].sessionTotal,
        learningActivityTime: summary[0].sessionTotal - summary[0].total
      })
    });

    firebase.getConferencePlan(this.state.sessionId)
    .then((conferencePlanData: Array<{id: string, feedback: string, questions: Array<string>, notes: string, date: Date}>) => {
      if (conferencePlanData[0]) {
        this.setState({
          conferencePlanExists: true,
          conferencePlanId: conferencePlanData[0].id
        })
      } else {
        this.setState({
          conferencePlanExists: false,
          conferencePlanId: ''
        })
      }
    }).catch(() => {
      console.log('unable to retrieve conference plan')
    })
    firebase.fetchTransitionTypeSummary(this.state.sessionId).then((type: Array<{
      line: number,
      traveling: number,
      waiting: number,
      routines: number,
      behaviorManagement: number,
      other: number,
      total: number
    }>) => {
      this.setState({
        sessionLine: type[0].line,
        sessionTraveling: type[0].traveling,
        sessionWaiting: type[0].waiting,
        sessionRoutines: type[0].routines,
        sessionBehaviorManagement: type[0].behaviorManagement,
        sessionOther: type[0].other,
        transitionTime: type[0].total
      })
    });
  }

  /**
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event
   */
  changeSessionId = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    this.setState({
      sessionId: event.target.value,
    }, () => {
      this.getData();
    }
  )};

  /**
   * @param {string} conferencePlanId
   * @param {string} note
   */
  addNoteToPlan = (conferencePlanId: string, note: string): void => {
    const firebase = this.context;
    if (!conferencePlanId) {
      firebase.createConferencePlan(this.props.teacherSelected.id, this.state.sessionId, 'Transition Time')
        .then(() => {
          firebase.completeAppointment(this.props.teacherSelected.id, 'Conference Plan', 'TT');
          firebase.getConferencePlan(this.state.sessionId).then((conferencePlanData: Array<{id: string, feedback: string, questions: Array<string>, notes: string, date: Date}>) => {
            if (conferencePlanData[0]) {
              this.setState({
                conferencePlanExists: true,
                conferencePlanId: conferencePlanData[0].id
              })
            } else {
              this.setState({
                conferencePlanExists: false,
                conferencePlanId: ''
              })
            }
          }).then(() => {
            firebase.addNoteToConferencePlan(this.state.conferencePlanId, note)
            .then(() => {
              this.setState({ noteAdded: true }, () => {
                setTimeout(() => {
                  this.setState({ noteAdded: false })
                }, 1500);
              })
            })
          })
        })
    } else {
      firebase.addNoteToConferencePlan(conferencePlanId, note)
      .then(() => {
        this.setState({ noteAdded: true }, () => {
          setTimeout(() => {
            this.setState({ noteAdded: false })
          }, 1500);
        })
      })
    }
  }

  /**
   * checks if question has already been added and if not, adds it
   * @param {string} panelTitle
   * @param {number} index
   * @param {string} question
   * @param {string} sessionId
   * @param {string} teacherId
   * @param {string} magic8
   */
  handleAddToPlan = (panelTitle: string, index: number, question: string, sessionId: string, teacherId: string, magic8: string): void => {
    const firebase = this.context;
    const itemIndex = this.state.addedToPlan.findIndex(e => e.panel === panelTitle && e.number === index);
    if (itemIndex === -1) {
      this.setState({ addedToPlan: [...this.state.addedToPlan, {panel: panelTitle, number: index, question: question}] });
    } else {
      const newArray = [...this.state.addedToPlan];
      newArray.splice(itemIndex, 1);
      this.setState({ addedToPlan: newArray });
    }
    firebase.getConferencePlan(sessionId)
    .then((conferencePlanData: Array<{id: string, feedback: Array<string>, questions: Array<string>, addedQuestions: Array<string>, notes: Array<string>, date: string}>) => {
      if (conferencePlanData[0]) {
        firebase.saveConferencePlanQuestion(sessionId, question)
        .then(() => {
          firebase.completeAppointment(this.props.teacherSelected.id, 'Conference Plan', 'TT');
          this.setState({ questionAdded: true }, () => {
            setTimeout(() => {
              this.setState({ questionAdded: false })
            }, 1500);
          })
        })
        this.setState({
          conferencePlanExists: true,
          conferencePlanId: conferencePlanData[0].id
        })
      } else {
        firebase.createConferencePlan(teacherId, sessionId, magic8)
        .then(() => {
          firebase.completeAppointment(this.props.teacherSelected.id, 'Conference Plan', 'TT');
          firebase.getConferencePlan(sessionId).then((conferencePlanData: Array<{id: string, feedback: string, questions: Array<string>, notes: string, date: Date}>) => {
            if (conferencePlanData[0]) {
              this.setState({
                conferencePlanExists: true,
                conferencePlanId: conferencePlanData[0].id
              })
            } else {
              this.setState({
                conferencePlanExists: false,
                conferencePlanId: ''
              })
            }
          })
          firebase.saveConferencePlanQuestion(sessionId, question)
          .then(() => {
            this.setState({ questionAdded: true }, () => {
              setTimeout(() => {
                this.setState({ questionAdded: false })
              }, 1500);
            })
          })
          this.setState({
            conferencePlanExists: true
          })
        })
      }
    })
  };

  /**
   * lifecycle method invoked after component updates
   * @param {Props} prevProps
   */
  componentDidUpdate(prevProps: Props): void {
    if (this.props.teacherSelected != prevProps.teacherSelected) {
      this.handleTrendsFetch(this.props.teacherSelected.id);
      this.handleDateFetching(this.props.teacherSelected.id);
    }
  }

  static propTypes = {
    classes: PropTypes.exact({
      root: PropTypes.string,
      comparisonText: PropTypes.string
    }).isRequired,
    teacherSelected: PropTypes.exact({
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      notes: PropTypes.string,
      id: PropTypes.string,
      phone: PropTypes.string,
      role: PropTypes.string,
      school: PropTypes.string
    }).isRequired
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    const chosenQuestions = this.state.addedToPlan.map((value) => {
      return(
        value.question
      )
    })
    return (
      this.props.teacherSelected ? (
        <div className={classes.root}>
          <FadeAwayModal open={this.state.noteAdded} text="Note added to conference plan." />
          <FadeAwayModal open={this.state.questionAdded} text="Question added to conference plan." />
          <ResultsLayout
            teacher={this.props.teacherSelected}
            magic8="Transition Time"
            // history={this.props.history}
            summary={
              <Grid container justify={"space-between"} direction={"column"}>
                <Grid item style={{paddingTop: '1em'}}>
                  <Typography variant="h5" style={{textAlign: "center", fontFamily: 'Arimo'}}>
                    Transition Time
                  </Typography>
                </Grid>
                <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                  Compare how often children spent time in: 
                </Typography>
                <Grid container direction="column" alignItems="center">
                  <Grid item style={{width: '100%'}}>
                    <List>
                      <ListItem style={{padding: 0}}>
                        <ListItemIcon style={{margin: 0}}>
                          <SignalWifi4BarIcon style={{fill: Constants.Colors.TT, transform: 'rotate(-45deg)'}} />
                        </ListItemIcon>
                        <ListItemText primary="Transitions" />
                      </ListItem>
                      <ListItem style={{padding: 0}}>
                        <ListItemIcon style={{margin: 0}}>
                          <SignalWifi4BarIcon style={{fill: Constants.Colors.AppBar, transform: 'rotate(-45deg)'}} />
                        </ListItemIcon>
                        <ListItemText primary="Learning activities" />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
                <Grid item>
                  <TransitionTimePie
                    transitionTime={this.state.transitionTime}
                    learningActivityTime={this.state.learningActivityTime}
                    // style={{overflow:"hidden", height: '80vh'}}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h5" style={{textAlign: "center", fontFamily: 'Arimo'}}>
                    Total Session Time: {Math.floor((this.state.sessionTotal/1000)/60)}m {Math.round((((this.state.sessionTotal/1000)/60) % 1) * 60) }s
                  </Typography>
                </Grid>
              </Grid>
            }
            details={
              <div>
                <Grid container justify={"space-between"} direction={"column"}>
                  <Grid item style={{paddingTop: '1em'}}>
                    <Typography variant="h5" style={{textAlign: "center", fontFamily: 'Arimo'}}>
                      Transition Types
                    </Typography>
                  </Grid>
                  <Grid container justify={"center"} direction={"column"}>
                    <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                      What types of transitions did children spend time in during the observation?
                    </Typography>
                    <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                      Which transitions were shorter?             
                    </Typography>
                    <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                      Which transitions were longer?              
                    </Typography>
                  </Grid>
                  <Grid item style={{paddingTop: '0.5em', paddingBottom: '0.5em'}}>
                    <TransitionBarChart
                      line={this.state.sessionLine}
                      traveling={this.state.sessionTraveling}
                      waiting={this.state.sessionWaiting}
                      routines={this.state.sessionRoutines}
                      behaviorManagement={this.state.sessionBehaviorManagement}
                      other={this.state.sessionOther}
                      // style={{alignItems: "center", height: '80vh'}}
                    />
                  </Grid>
                  <Grid item style={{paddingTop: '0.5em'}}>
                    <Typography variant="h5" style={{textAlign: "center", fontFamily: 'Arimo'}}>
                      Total Transition Time: {Math.floor((this.state.transitionTime/1000)/60)}m {Math.round((((this.state.transitionTime/1000)/60) % 1) * 60) }s
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            }
            trendsGraph={
              <Grid container direction="column" justify="center">
                <Grid item style={{padding: '1em'}}>
                  <Typography variant="h5" style={{textAlign: "center", fontFamily: 'Arimo'}}>
                    Transition Time
                  </Typography>
                </Grid>
                <TransitionTrendsGraph
                  data={this.handleTrendsFormatData}
                  // style={{overflow:"hidden", height: '80vh'}}
                />
              </Grid>
            }
            changeSessionId={this.changeSessionId}
            sessionId={this.state.sessionId}
            conferencePlanId={this.state.conferencePlanId}
            addNoteToPlan={this.addNoteToPlan}
            sessionDates={this.state.sessionDates}
            notes={this.state.notes}
            questions={
              <TransitionCoachingQuestions
                handleAddToPlan={this.handleAddToPlan}
                sessionId={this.state.sessionId}
                teacherId={this.props.teacherSelected.id}
              />
            }
            chosenQuestions = {chosenQuestions}
            actionPlanExists={this.state.actionPlanExists}
            conferencePlanExists={this.state.conferencePlanExists}
            noDataYet={this.state.noDataYet}
          />
        </div>
      ) : (
        <FirebaseContext.Consumer>
          {(firebase: {
            getTeacherList(): Promise<Types.Teacher[]>
          }): React.ReactElement => (
            <TeacherModal
              handleClose={this.handleCloseTeacherModal}
              firebase={firebase}
              type={"Results"}
            />
          )}
        </FirebaseContext.Consumer>
      )
    );
  }
}

const mapStateToProps = (state: Types.ReduxState): {teacherSelected: Types.Teacher} => {
  return {
    teacherSelected: state.teacherSelectedState.teacher
  };
};

TransitionResultsPage.contextType = FirebaseContext;
export default withStyles(styles)(connect(mapStateToProps)(TransitionResultsPage));
