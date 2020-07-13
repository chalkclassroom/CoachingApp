import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import * as moment from "moment";
import ClimateTrendsGraph from "../../../components/ClassroomClimateComponent/ResultsComponents/ClimateTrendsGraph";
import ResultsLayout from '../../../components/ResultsLayout';
import BehaviorResponsesDetailsChart from "../../../components/ClassroomClimateComponent/ResultsComponents/BehaviorResponsesDetailsChart";
import ClimateCoachingQuestions from "../../../components/ClassroomClimateComponent/ResultsComponents/ClimateCoachingQuestions";
import ClimateSummarySlider from "../../../components/ClassroomClimateComponent/ResultsComponents/ClimateSummarySlider";
import FadeAwayModal from '../../../components/FadeAwayModal';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TeacherModal from '../HomeViews/TeacherModal';
import * as Types from '../../../constants/Types';
import * as H from 'history';
import ReactRouterPropTypes from 'react-router-prop-types';

const styles: object = {
  root: {
    flexGrow: 1,
    height: "100vh",
    flexDirection: "column",
    overflowY: "auto",
    overflowX: "hidden"
  },
};

interface Props {
  classes: Style,
  teacherSelected: Types.Teacher,
  history: H.History
}

interface Style {
  root: string
}

interface State {
  disapprovalBehaviorCount: number,
  redirectionsBehaviorCount: number,
  nonspecificBehaviorCount: number,
  specificBehaviorCount: number,
  averageToneRating: number,
  sessionId: string,
  conferencePlanId: string,
  trendsDates: Array<string>,
  trendsPos: Array<number>,
  trendsNeg: Array<number>,
  notes: Array<{id: string, content: string, timestamp: string}>,
  actionPlanExists: boolean,
  conferencePlanExists: boolean,
  addedToPlan: Array<{panel: string, number: number, question: string}>,
  sessionDates: Array<{id: string, sessionStart: {value: string}}>,
  noteAdded: boolean,
  questionAdded: boolean,
  teacherModal: boolean
}

/**
 * classroom climate results
 * @class ClassroomClimateResultsPage
 */
class ClassroomClimateResultsPage extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      disapprovalBehaviorCount: 0,
      redirectionsBehaviorCount: 0,
      nonspecificBehaviorCount: 0,
      specificBehaviorCount: 0,
      averageToneRating: 0,
      sessionId: '',
      conferencePlanId: '',
      trendsDates: [],
      trendsPos: [],
      trendsNeg: [],
      notes: [],
      actionPlanExists: false,
      conferencePlanExists: false,
      addedToPlan: [],
      sessionDates: [],
      noteAdded: false,
      questionAdded: false,
      teacherModal: false
    };
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    const firebase = this.context;
    if (this.props.teacherSelected) {
      const teacherId = this.props.teacherSelected.id;
      firebase.fetchBehaviourTypeCount(this.state.sessionId);
      firebase.fetchAvgToneRating(this.state.sessionId);
      this.handleDateFetching(teacherId);
      this.handleTrendsFetching(teacherId);
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
  handleTrendsFetching = (teacherId: string): void => {
    const firebase = this.context;
    const dateArray: Array<string> = [];
    const posArray: Array<number> = [];
    const negArray: Array<number> = [];
    firebase.fetchBehaviourTrend(teacherId).then((dataSet: Array<object>) => {
      console.log("dataset is: ", dataSet);
      dataSet.forEach((data: {dayOfEvent: {value: string}, positive: number, negative: number}) => {
        dateArray.push(moment(data.dayOfEvent.value).format("MMM Do YYYY"));
        posArray.push(data.positive);
        negArray.push(data.negative);
      });
      this.setState({
        trendsDates: dateArray,
        trendsPos: posArray,
        trendsNeg: negArray,
      });
    });
  };

  /**
   * @param {string} sessionId
   */
  handleNotesFetching = (sessionId: string): void => {
    const firebase = this.context;
    firebase.handleFetchNotesResults(sessionId).then((notesArr: Array<{id: string, content: string, timestamp: {seconds: number, nanoseconds: number}}>) => {
      console.log(notesArr);
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
      console.log(formattedNotesArr);
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
      sessionId: '',
      conferencePlanId: '',
      disapprovalBehaviorCount: 0,
      redirectionsBehaviorCount: 0,
      nonspecificBehaviorCount: 0,
      specificBehaviorCount: 0,
      averageToneRating: 0,
      trendsDates: [],
      trendsPos: [],
      trendsNeg: [],
      notes: [],
      actionPlanExists: false,
      conferencePlanExists: false,
      addedToPlan: [],
      sessionDates: []
    }, () => {
      firebase.fetchSessionDates(teacherId, "climate").then((dates: Array<{id: string, sessionStart: {value: string}}>) =>
        this.setState({
          sessionDates: dates
        }, () => {
          if (this.state.sessionDates[0]) {
            this.setState({ sessionId: this.state.sessionDates[0].id },
              () => {
                this.getData();
              }
            );
          }
        })
      );
    })
  };

  trendsFormatData = (): {
    labels: Array<string>,
    datasets: Array<{
      label: string,
      data: Array<number>,
      backgroundColor: string,
      borderColor: string,
      fill: boolean,
      lineTension: number
    }>
  } => {
    return {
      labels: this.state.trendsDates,
      datasets: [
        {
          label: "Redirection/Disapproval",
          data: this.state.trendsNeg,
          backgroundColor: "#ec2409",
          borderColor: "#ec2409",
          fill: false,
          lineTension: 0,
        },
        {
          label: "Specific/General Approval",
          data: this.state.trendsPos,
          backgroundColor: "#0988ec",
          borderColor: "#0988ec",
          fill: false,
          lineTension: 0,
        }
      ]
    };
  };

  getData = (): void => {
    const firebase = this.context;
    let specificCount = 0;
    let nonspecificCount = 0;
    let disapprovalCount = 0;
    let redirectionCount = 0;
    this.handleNotesFetching(this.state.sessionId);
    firebase.fetchAvgToneRating(this.state.sessionId).then((json: Array<{average: number}>) =>
          json.forEach(toneRating => {
            this.setState({
              averageToneRating: toneRating.average
            });
          })
        );
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
        }).catch(() => {
          console.log('unable to retrieve conference plan')
        })
        firebase.fetchBehaviourTypeCount(this.state.sessionId).then((json: Array<{behaviorResponse: string, count: number}>) => {
          json.forEach(behavior => {
            if (behavior.behaviorResponse === "specificapproval") {
              specificCount = behavior.count;
            } else if (behavior.behaviorResponse === "nonspecificapproval") {
              nonspecificCount = behavior.count;
            } else if (behavior.behaviorResponse === "disapproval") {
              disapprovalCount = behavior.count;
            } else if (behavior.behaviorResponse === "redirection") {
              redirectionCount = behavior.count;
            }
          });
          this.setState({
            redirectionsBehaviorCount: redirectionCount,
            disapprovalBehaviorCount: disapprovalCount,
            nonspecificBehaviorCount: nonspecificCount,
            specificBehaviorCount: specificCount
          });
        });
  }

  /**
   * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event
   */
  changeSessionId = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    console.log("sessionId", event.target.value, "type is: ", typeof event);
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
      firebase.createConferencePlan(this.props.teacherSelected.id, this.state.sessionId, 'Classroom Climate')
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
    console.log('handle add to plan session id is: ', sessionId);
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

  /**
   * lifecycle method invoked after component updates
   * @param {Props} prevProps
   */
  componentDidUpdate(prevProps: Props): void {
    if (this.props.teacherSelected != prevProps.teacherSelected) {
      this.handleTrendsFetching(this.props.teacherSelected.id);
      this.handleDateFetching(this.props.teacherSelected.id);
    }
  }

  static propTypes = {
    classes: PropTypes.exact({
      root: PropTypes.string
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
    }).isRequired,
    history: ReactRouterPropTypes.history.isRequired
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
          magic8="Classroom Climate"
          history={this.props.history}
          summary={
            <ClimateSummarySlider
              positiveResponses={this.state.specificBehaviorCount+this.state.nonspecificBehaviorCount}
              negativeResponses={this.state.redirectionsBehaviorCount+this.state.disapprovalBehaviorCount}
              averageToneRating={this.state.averageToneRating}
            />
          }
          details={
            <div>
              <Grid container justify={"center"} direction={"column"}>
                <Grid container justify={"center"} direction={"column"}>
                  <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                    What behavior responses did the teacher give children
                    during the observation?
                  </Typography>
                  <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                    Did the teacher give one type of behavior response
                    more often than other types?          
                  </Typography>
                  <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                    Did the teacher give one type of behavior response
                    less often than other types?            
                  </Typography>
                </Grid>
                <Grid item>
                  <BehaviorResponsesDetailsChart
                    disapprovalBehaviorCount={this.state.disapprovalBehaviorCount}
                    redirectionsBehaviorCount={this.state.redirectionsBehaviorCount}
                    nonspecificBehaviorCount={this.state.nonspecificBehaviorCount}
                    specificBehaviorCount={this.state.specificBehaviorCount}
                  />
                </Grid>
              </Grid>
            </div>
          }
          trendsGraph={<ClimateTrendsGraph data={this.trendsFormatData}/>}
          changeSessionId={this.changeSessionId}
          sessionId={this.state.sessionId}
          sessionDates={this.state.sessionDates}
          conferencePlanId={this.state.conferencePlanId}
          addNoteToPlan={this.addNoteToPlan}
          notes={this.state.notes}
          questions={
            <ClimateCoachingQuestions
              handleAddToPlan={this.handleAddToPlan}
              addedToPlan={this.state.addedToPlan}
              sessionId={this.state.sessionId}
              teacherId={this.props.teacherSelected.id}
            />
          }
          chosenQuestions={chosenQuestions}
          actionPlanExists={this.state.actionPlanExists}
          conferencePlanExists={this.state.conferencePlanExists}
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

ClassroomClimateResultsPage.contextType = FirebaseContext;
export default withStyles(styles)(connect(mapStateToProps)(ClassroomClimateResultsPage));