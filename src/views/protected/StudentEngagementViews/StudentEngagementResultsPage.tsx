import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import * as moment from "moment";
import ResultsLayout from '../../../components/ResultsLayout';
import SummarySlider from "../../../components/StudentEngagementComponents/ResultsComponents/SummarySlider";
import DetailsSlider from "../../../components/StudentEngagementComponents/ResultsComponents/DetailsSlider";
import TrendsSlider from "../../../components/StudentEngagementComponents/ResultsComponents/TrendsSlider";
import * as Constants from '../../../constants/Constants';
import {connect} from "react-redux";
import StudentEngagementCoachingQuestions
  from "../../../components/StudentEngagementComponents/ResultsComponents/StudentEngagementCoachingQuestions";
import TeacherModal from '../HomeViews/TeacherModal';
import FadeAwayModal from '../../../components/FadeAwayModal';
import * as Types from '../../../constants/Types';

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
  teacherSelected: Types.Teacher
}

interface Style {
  root: string
}

interface State {
  sessionId: string,
  conferencePlanId: string,
  offTaskSummaryCount: number,
  engagedSummaryCount: number,
  avgEngagementSummary: number,
  offTaskDetailSplit: Array<number>,
  mildlyEngagedDetailSplit: Array<number>,
  engagedDetailSplit: Array<number>,
  highlyEngagedDetailSplit: Array<number>,
  trendsDates: Array<Array<string>>,
  trendsAvg: Array<number>,
  notes: Array<{id: string, content: string, timestamp: string}>,
  actionPlanExists: boolean,
  conferencePlanExists: boolean,
  addedToPlan: Array<{panel: string, number: number, question: string}>,
  sessionDates: Array<{id: string, sessionStart: {value: string}}>,
  teacherModal: boolean,
  noteAdded: boolean,
  questionAdded: boolean,
  noDataYet: boolean
}

/**
 * Student Engagement results
 * @class StudentEngagementResultsPage
 */
class StudentEngagementResultsPage extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      sessionId: '',
      conferencePlanId: '',
      offTaskSummaryCount: 0,
      engagedSummaryCount: 0,
      avgEngagementSummary: 0,
      offTaskDetailSplit: [],
      mildlyEngagedDetailSplit: [],
      engagedDetailSplit: [],
      highlyEngagedDetailSplit: [],
      trendsDates: [],
      trendsAvg: [],
      notes: [],
      actionPlanExists: false,
      conferencePlanExists: false,
      addedToPlan: [],
      sessionDates: [],
      teacherModal: false,
      noteAdded: false,
      questionAdded: false,
      noDataYet: false
    };
  }

  /**
   * @param {string} teacherId
   */
  handleTrendsFetching = (teacherId: string): void => {
    this.handleEngagementTrendsFetch(teacherId);
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
      sessionId: '',
      conferencePlanId: '',
      offTaskSummaryCount: 0,
      engagedSummaryCount: 0,
      avgEngagementSummary: 0,
      offTaskDetailSplit: [],
      mildlyEngagedDetailSplit: [],
      engagedDetailSplit: [],
      highlyEngagedDetailSplit: [],
      trendsDates: [],
      trendsAvg: [],
      notes: [],
      actionPlanExists: false,
      conferencePlanExists: false,
      addedToPlan: [],
      sessionDates: [],
      noDataYet: false
    }, () => {
      firebase.fetchSessionDates(teacherId, "engagement").then((dates: Array<{id: string, sessionStart: {value: string}}>) =>
        {if (dates[0]) {
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
        }}
      );
    })
  };

  /**
   * @param {string} teacherId
   */
  handleEngagementTrendsFetch = (teacherId: string): void => {
    const firebase = this.context;
    const dateArray: Array<Array<string>> = [];
    const avgArray: Array<number> = [];

    firebase.fetchEngagementTrend(teacherId)
    .then((dataSet: Array<{startDate: {value: string}, average: number}>) => {
      dataSet.forEach(data => {
        dateArray.push([
          moment(data.startDate.value).format("MMM Do"),
        ]);
          avgArray.push(Math.round((data.average + Number.EPSILON) * 100) / 100);
      });
      this.setState({
        trendsDates: dateArray,
        trendsAvg: avgArray,
      });
    });
  };


  /**
   * specifies formatting for teacher trends
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
    }>,
  } => {
    return {
      labels: this.state.trendsDates,
      datasets: [
        {
          label: "Average",
          backgroundColor: Constants.Colors.SE,
          borderColor: Constants.Colors.SE,
          fill: false,
          lineTension: 0,
          data: this.state.trendsAvg
        },
      ]
    };
  };

  /**
   * @param {string} conferencePlanId
   * @param {string} note
   */
  addNoteToPlan = (conferencePlanId: string, note: string): void => {
    const firebase = this.context;
    if (!conferencePlanId) {
      firebase.createConferencePlan(this.props.teacherSelected.id, this.state.sessionId, 'Level of Engagement')
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
    firebase.fetchEngagementPieSummary(this.state.sessionId).then((summary: {offTask: number, engaged: number}) => {
      this.setState({
        offTaskSummaryCount: summary.offTask,
        engagedSummaryCount: summary.engaged,
      });
    });
    firebase.fetchEngagementAvgSummary(this.state.sessionId).then((summary: {average: number}) => {
      this.setState({
        avgEngagementSummary: summary.average,
      });
    });
    firebase.fetchEngagementDetails(this.state.sessionId)
    .then((detail: {
      offTask0: number,
      offTask1: number,
      offTask2: number,
      offTask3: number,
      mildlyEngaged0: number,
      mildlyEngaged1: number,
      mildlyEngaged2: number,
      mildlyEngaged3: number,
      engaged0: number,
      engaged1: number,
      engaged2: number,
      engaged3: number,
      highlyEngaged0: number,
      highlyEngaged1: number,
      highlyEngaged2: number,
      highlyEngaged3: number
    }) => {
      this.setState({
        offTaskDetailSplit: [detail.offTask0, detail.offTask1, detail.offTask2, detail.offTask3],
        mildlyEngagedDetailSplit: [detail.mildlyEngaged0, detail.mildlyEngaged1, detail.mildlyEngaged2, detail.mildlyEngaged3],
        engagedDetailSplit: [detail.engaged0, detail.engaged1, detail.engaged2, detail.engaged3],
        highlyEngagedDetailSplit: [detail.highlyEngaged0, detail.highlyEngaged1, detail.highlyEngaged2, detail.highlyEngaged3],
      })
    })
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

  handleCloseTeacherModal = (): void => {
    this.setState({ teacherModal: false })
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    if (this.props.teacherSelected) {
      this.handleDateFetching(this.props.teacherSelected.id);
      this.handleTrendsFetching(this.props.teacherSelected.id);
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
      this.handleTrendsFetching(this.props.teacherSelected.id);
      this.handleDateFetching(this.props.teacherSelected.id);
    }
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
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
            magic8="Level of Engagement"
            summary={
              <SummarySlider
                offTask={this.state.offTaskSummaryCount}
                engaged={this.state.engagedSummaryCount}
                avgRating={this.state.avgEngagementSummary}
              />
            }
            details={
              <DetailsSlider
                offTaskDetailSplit={this.state.offTaskDetailSplit}
                mildlyEngagedDetailSplit={this.state.mildlyEngagedDetailSplit}
                engagedDetailSplit={this.state.engagedDetailSplit}
                highlyEngagedDetailSplit={this.state.highlyEngagedDetailSplit}
              />
            }
            trendsGraph={
              <Grid container direction="column" justify="center">
                <Grid item style={{paddingTop: '1em', paddingBottom: '0.5em'}}>
                  <Typography variant="h5" style={{textAlign: "center", fontFamily: 'Arimo'}}>
                    Average Student Engagement
                  </Typography>
                </Grid>
                <TrendsSlider
                  data={this.handleTrendsFormatData}
                />
              </Grid>
            }
            changeSessionId={this.changeSessionId}
            sessionId={this.state.sessionId}
            sessionDates={this.state.sessionDates}
            notes={this.state.notes}
            addNoteToPlan={this.addNoteToPlan}
            questions={
              <StudentEngagementCoachingQuestions
                handleAddToPlan={this.handleAddToPlan}
                sessionId={this.state.sessionId}
                teacherId={this.props.teacherSelected.id}
              />
            }
            chosenQuestions={chosenQuestions}
            actionPlanExists={this.state.actionPlanExists}
            conferencePlanExists={this.state.conferencePlanExists}
            conferencePlanId={this.state.conferencePlanId}
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

const mapStateToProps = (state: Types.ReduxState): { teacherSelected: Types.Teacher } => {
  return {
    teacherSelected: state.teacherSelectedState.teacher
  };
};

StudentEngagementResultsPage.contextType = FirebaseContext;
export default connect(mapStateToProps, {})(
  withStyles(styles)(StudentEngagementResultsPage)
);
