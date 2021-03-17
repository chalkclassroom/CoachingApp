import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SignalWifi4BarIcon from '@material-ui/icons/SignalWifi4Bar';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import * as moment from "moment";
import ResultsLayout from '../../../components/ResultsLayout';
import ListeningSummaryChart from "../../../components/ListeningComponents/ResultsComponents/ListeningSummaryChart";
import ListeningDetailsChart from "../../../components/ListeningComponents/ResultsComponents/ListeningDetailsChart";
import ListeningTrendsGraph from "../../../components/ListeningComponents/ResultsComponents/ListeningTrendsGraph";
import ListeningCoachingQuestions from "../../../components/ListeningComponents/ResultsComponents/ListeningCoachingQuestions";
import FadeAwayModal from '../../../components/FadeAwayModal';
import { connect } from 'react-redux';
import {
  addListeningSummary,
  addListeningDetails,
  addListeningTrends
} from '../../../state/actions/listening-results';
import { addTeacher, addTool } from '../../../state/actions/session-dates';
import * as Constants from '../../../constants/Constants';
import * as Types from '../../../constants/Types';
import TeacherModal from '../HomeViews/TeacherModal';

const styles: object = {
  root: {
    flexGrow: 1,
    height: "100vh",
    flexDirection: "column",
    overflowY: "auto",
    overflowX: "hidden"
  },
  comparisonText: {
    paddingLeft: '1em',
    lineHeight: '0.8em',
    fontFamily: 'Arimo'
  }
};

interface Props {
  classes: Style,
  teacherSelected: Types.Teacher,
  addTeacher(dates: {
    teacherId: string,
    data: [{
      tool: string,
      sessions: Array<{id: string, sessionStart: {value: string}}>
    }]
  }): void,
  addTool(dates: [{
    teacherId: string,
    data: [{
      tool: string,
      sessions: Array<{id: string, sessionStart: {value: string}}>
    }]
  }]): void,
  sessionDates: Array<{
    teacherId: string,
    data: Array<{
      tool: string,
      sessions: Array<{id: string, sessionStart: {value: string}}>
    }>
  }>,
  addListeningSummary(summary: {
    sessionId: string,
    teacherId: string,
    summary: Types.ListeningData['summary']
  }): void,
  addListeningDetails(details: {
    sessionId: string,
    teacherId: string,
    details: Types.ListeningData['details']
  }): void,
  addListeningTrends(trends: {
    teacherId: string,
    trends: Types.ListeningData['trends'] | undefined
  }): void,
  listeningResults: Array<{
    teacherId: string,
    sessionId: string,
    summary: Types.ListeningData['summary'],
    details: Types.ListeningData['details']
  }>,
  listeningTrends: Array<{
    teacherId: string,
    trends: Types.ListeningData['trends']
  }>
}

interface Style {
  root: string,
  comparisonText: string
}

interface State {
  listening: number,
  notListening: number,
  sessionId: string,
  conferencePlanId: string,
  listening1: number,
  listening2: number,
  listening3: number,
  listening4: number,
  listening5: number,
  listening6: number,
  trendsDates: Array<Array<string>>,
  trendsListening: Array<number>,
  trendsNotListening: Array<number>,
  notes: Array<{id: string, content: string, timestamp: string}>,
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
 * listening to children results
 * @class ListeningToChildrenResultsPage
 */
class ListeningToChildrenResultsPage extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      listening: 0,
      notListening: 0,
      sessionId: '',
      conferencePlanId: '',
      listening1: 0,
      listening2: 0,
      listening3: 0,
      listening4: 0,
      listening5: 0,
      listening6: 0,
      trendsDates: [],
      trendsListening: [],
      trendsNotListening: [],
      notes: [],
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

  /**
   * @param {string} teacherId
   */
  handleTrendsFetching = (teacherId: string): void => {
    this.handleTrendsFetch(teacherId);
  };

  /**
   * @param {string} sessionId
   */
  handleNotesFetching = (sessionId: string): void => {
    const firebase = this.context;
    firebase.handleFetchNotesResults(sessionId).then((notesArr: Array<{id: string, content: string, timestamp: {seconds: number, nanoseconds: number}}>) => {
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
      listening: 0,
      notListening: 0,
      sessionId: '',
      conferencePlanId: '',
      listening1: 0,
      listening2: 0,
      listening3: 0,
      listening4: 0,
      listening5: 0,
      listening6: 0,
      trendsDates: [],
      trendsListening: [],
      trendsNotListening: [],
      notes: [],
      actionPlanExists: false,
      conferencePlanExists: false,
      addedToPlan: [],
      sessionDates: [],
      noDataYet: false
    }, () => {
      const teacherIndex = this.props.sessionDates.map(e => e.teacherId).indexOf(teacherId);
      if (teacherIndex > -1) { // if teacher in redux sessionDatesState
        const toolIndex = this.props.sessionDates[teacherIndex].data.map(e => e.tool).indexOf('LC');
        if (toolIndex > -1 && this.props.sessionDates[teacherIndex].data[toolIndex].sessions.length > 0) { // if listening for this teacher in sessionDatesState
          this.setState({
            sessionDates: this.props.sessionDates[teacherIndex].data[toolIndex].sessions,
            noDataYet: false
          }, () => {
            if (this.state.sessionDates[0]) {
              this.setState({ sessionId: this.state.sessionDates[0].id },
                () => {
                  this.getData();
                }
              );
            }
          })
        } else { // teacher exists but not listening
          firebase.fetchSessionDates(teacherId, "listening").then((dates: Array<{id: string, sessionStart: {value: string}}>) => {
            if (dates[0]) {
              this.setState({
                sessionDates: dates,
                noDataYet: false
              }, () => {
                if (this.state.sessionDates[0]) {
                  this.setState({ sessionId: this.state.sessionDates[0].id },
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
            }
            this.props.addTool([{
              teacherId: teacherId,
              data: [{
                tool: 'LC',
                sessions: dates
              }]
            }]);
          });
        }
      } else { // teacher not in redux sessionDatesState
        firebase.fetchSessionDates(teacherId, "listening").then((dates: Array<{id: string, sessionStart: {value: string}}>) => {
          if (dates[0]) {
            this.setState({
              sessionDates: dates,
              noDataYet: false
            }, () => {
              if (this.state.sessionDates[0]) {
                this.setState({ sessionId: this.state.sessionDates[0].id },
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
          }
          this.props.addTeacher({
            teacherId: teacherId,
            data: [{
              tool: 'LC',
              sessions: dates
            }]
          });
        });
      }
    })
  };

  /**
   * @param {string} teacherId
   */
  handleTrendsFetch = (teacherId: string): void => {
    const firebase = this.context;
    const dateArray: Array<Array<string>> = [];
    const listeningArray: Array<number> = [];
    const notListeningArray: Array<number> = [];

    const reduxIndex = this.props.listeningTrends.map(e => e.teacherId).indexOf(teacherId);

    const handleTrendsData = async (trendsData: Types.ListeningData['trends']): Promise<void> => {
      trendsData.forEach((data: {startDate: {value: string}, listening: number, notListening: number}) => {
        dateArray.push([
          moment(data.startDate.value).format("MMM Do"),
        ]);
        listeningArray.push(Math.round((data.listening / (data.listening + data.notListening)) * 100));
        notListeningArray.push(Math.round((data.notListening / (data.listening + data.notListening)) * 100));
      });
    };

    if ((reduxIndex > -1) && (this.props.listeningTrends[reduxIndex].childTrends !== undefined)) {
      handleTrendsData(this.props.listeningTrends[reduxIndex].childTrends).then(() => {
        this.setState({
          trendsDates: dateArray,
          trendsListening: listeningArray,
          trendsNotListening: notListeningArray
        })
      })
    } else {
      firebase.fetchListeningTrend(teacherId)
      .then((dataSet: Array<{startDate: {value: string}, listening: number, notListening: number}>) => {
        handleTrendsData(dataSet).then(() => {
          this.setState({
            trendsDates: dateArray,
            trendsListening: listeningArray,
            trendsNotListening: notListeningArray
          });
        })
        this.props.addListeningTrends({
          teacherId: teacherId,
          trends: dataSet
        })
      });
    }
  };

  /**
   * specifies formatting for child trends
   * @return {object}
   */
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
      datasets: [
        {
          label: "Teacher Listening",
          backgroundColor: Constants.Colors.LC,
          borderColor: Constants.Colors.LC,
          fill: false,
          lineTension: 0,
          data: this.state.trendsListening
        },
        {
          label: "Other Tasks or Behaviors",
          backgroundColor: Constants.Colors.RedGraph,
          borderColor: Constants.Colors.RedGraph,
          fill: false,
          lineTension: 0,
          data: this.state.trendsNotListening
        }
      ]
    };
  };

  /**
   * retrieves summary, details, and notes data using the session id
   */
  getData = (): void => {
    const firebase = this.context;
    this.handleNotesFetching(this.state.sessionId);
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
    const reduxIndex = this.props.listeningResults.map(e => e.sessionId).indexOf(this.state.sessionId);

    if ((reduxIndex > -1) && this.props.listeningResults[reduxIndex].summary !== undefined) {
      this.setState({
        listening: this.props.listeningResults[reduxIndex].summary.listening,
        notListening: this.props.listeningResults[reduxIndex].summary.notListening,
      });
    } else {
      firebase.fetchListeningSummary(this.state.sessionId)
      .then((summary: {listening: number, notListening: number}) => {
        this.setState({
          listening: summary.listening,
          notListening: summary.notListening
        });
        this.props.addListeningSummary({
          sessionId: this.state.sessionId,
          teacherId: this.props.teacherSelected.id,
          summary: {
            listening: summary.listening,
            notListening: summary.notListening
          }
        })
      });
    }

    if ((reduxIndex > -1) && this.props.listeningResults[reduxIndex].details !== undefined) {
      this.setState({
        listening1: this.props.listeningResults[reduxIndex].details.listening1,
        listening2: this.props.listeningResults[reduxIndex].details.listening2,
        listening3: this.props.listeningResults[reduxIndex].details.listening3,
        listening4: this.props.listeningResults[reduxIndex].details.listening4,
        listening5: this.props.listeningResults[reduxIndex].details.listening5,
        listening6: this.props.listeningResults[reduxIndex].details.listening6
      });
    } else {
      firebase.fetchListeningDetails(this.state.sessionId)
      .then((summary: {
        listening1: number,
        listening2: number,
        listening3: number,
        listening4: number,
        listening5: number,
        listening6: number,
      }) => {
        this.setState({
          listening1: summary.listening1,
          listening2: summary.listening2,
          listening3: summary.listening3,
          listening4: summary.listening4,
          listening5: summary.listening5,
          listening6: summary.listening6,
        });
        this.props.addListeningDetails({
          sessionId: this.state.sessionId,
          teacherId: this.props.teacherSelected.id,
          details: {
            listening1: summary.listening1,
            listening2: summary.listening2,
            listening3: summary.listening3,
            listening4: summary.listening4,
            listening5: summary.listening5,
            listening6: summary.listening6,
          }
        })
      })
    }
  }

  /**
   * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event
   */
  changeSessionId = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    this.setState(
      {
        sessionId: event.target.value
      },
      () => {
        this.getData();
      }
    );
  };

  /**
   * @param {string} conferencePlanId
   * @param {string} note
   */
  addNoteToPlan = (conferencePlanId: string, note: string): void => {
    const firebase = this.context;
    if (!conferencePlanId) {
      firebase.createConferencePlan(this.props.teacherSelected.id, this.state.sessionId, 'Listening to Children')
        .then(() => {
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

  handleCloseTeacherModal = (): void => {
    this.setState({ teacherModal: false })
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    if (this.props.teacherSelected) {
      this.handleDateFetching(this.props.teacherSelected.id);
      this.handleTrendsFetch(this.props.teacherSelected.id);
    } else {
      this.setState({ teacherModal: true })
    }
  }

  /** 
   * lifecycle method invoked after component updates 
   * @param {Props} prevProps
   */
  componentDidUpdate(prevProps: Props): void {
    if (this.props.teacherSelected != prevProps.teacherSelected) {
      this.handleDateFetching(this.props.teacherSelected.id);
      this.handleTrendsFetch(this.props.teacherSelected.id);
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
            magic8="Listening to Children"
            summary={
              <Grid container justify={"center"} direction={"column"}>
                <Grid item style={{paddingTop: '1em'}}>
                  <Typography variant="h5" style={{textAlign: "center", fontFamily: 'Arimo'}}>
                    Listening to Children
                  </Typography>
                </Grid>
                <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                  Compare how often the teacher was: 
                </Typography>
                <Grid container direction="column" alignItems="center">
                  <Grid item style={{width: '100%'}}>
                    <List>
                      <ListItem style={{padding: 0}}>
                        <ListItemIcon style={{margin: 0}}>
                          <SignalWifi4BarIcon style={{fill: Constants.Colors.LC, transform: 'rotate(-45deg)'}} />
                        </ListItemIcon>
                        <ListItemText primary="Listening to children/encouraging child talk" />
                      </ListItem>
                      <ListItem style={{padding: 0}}>
                        <ListItemIcon style={{margin: 0}}>
                          <SignalWifi4BarIcon style={{fill: Constants.Colors.RedGraph, transform: 'rotate(-45deg)'}} />
                        </ListItemIcon>
                        <ListItemText primary="Not doing any target behaviors" />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
                <Grid item>
                  <ListeningSummaryChart
                    listening={this.state.listening}
                    notListening={this.state.notListening}
                  />
                </Grid>
              </Grid>
            }
            details={
              <div>
                <Grid container justify={"center"} direction={"column"}>
                  <Grid item style={{paddingTop: '1em'}}>
                    <Typography variant="h5" style={{textAlign: "center", fontFamily: 'Arimo'}}>
                      Teacher Behaviors
                    </Typography>
                  </Grid>
                  <Grid container justify={"center"} direction={"column"}>
                    <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                      What behaviors did the teacher use during the observation?
                    </Typography>
                    <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                      Did the teacher do one type of behavior more often than the other behaviors?               
                    </Typography>
                    <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                      Did the teacher do one type of behavior less often than the other behaviors?               
                    </Typography>
                  </Grid>
                  <ListeningDetailsChart
                    listening1={this.state.listening1}
                    listening2={this.state.listening2}
                    listening3={this.state.listening3}
                    listening4={this.state.listening4}
                    listening5={this.state.listening5}
                    listening6={this.state.listening6}
                  />
                </Grid>
              </div>
            }
            trendsGraph={
              <Grid container direction="column" justify="center">
                <Grid item style={{paddingTop: '1em', paddingBottom: '0.5em'}}>
                  <Typography variant="h5" style={{textAlign: "center", fontFamily: 'Arimo'}}>
                    Teacher Behaviors
                  </Typography>
                </Grid>
                <ListeningTrendsGraph
                  data={this.handleTrendsFormatData}
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
              <ListeningCoachingQuestions
                handleAddToPlan={this.handleAddToPlan}
                sessionId={this.state.sessionId}
                teacherId={this.props.teacherSelected.id}
              />
            }
            chosenQuestions={chosenQuestions}
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

const mapStateToProps = (state: Types.ReduxState): {
  teacherSelected: Types.Teacher,
  sessionDates: Array<{
    teacherId: string,
    data: Array<{
      tool: string,
      sessions: Array<{id: string, sessionStart: {value: string}}>
    }>
  }>,
  listeningResults: Array<{
    teacherId: string,
    sessionId: string,
    summary: Types.ListeningData['summary'],
    details: Types.ListeningData['details']
  }>,
  listeningTrends: Array<{
    teacherId: string,
    trends: Types.ListeningData['trends']
  }>,
} => {
  return {
    teacherSelected: state.teacherSelectedState.teacher,
    sessionDates: state.sessionDatesState.dates,
    listeningResults: state.listeningResultsState.listeningResults,
    listeningTrends: state.listeningResultsState.listeningTrends
  };
};

ListeningToChildrenResultsPage.contextType = FirebaseContext;
export default withStyles(styles)(connect(mapStateToProps, {
  addListeningSummary,
  addListeningDetails,
  addListeningTrends,
  addTeacher,
  addTool
})(ListeningToChildrenResultsPage));