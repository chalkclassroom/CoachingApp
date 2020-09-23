import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import * as moment from "moment";
import ResultsLayout from '../../../components/ResultsLayout';
import ChildTeacherBehaviorPieSlider from "../../../components/AssociativeCooperativeComponents/ResultsComponents/ChildTeacherBehaviorPieSlider";
import ChildTeacherBehaviorDetailsSlider from "../../../components/AssociativeCooperativeComponents/ResultsComponents/ChildTeacherBehaviorDetailsSlider";
import ChildTeacherBehaviorTrendsSlider from "../../../components/AssociativeCooperativeComponents/ResultsComponents/ChildTeacherBehaviorTrendsSlider";
import ACCoachingQuestions from "../../../components/AssociativeCooperativeComponents/ResultsComponents/ACCoachingQuestions";
import FadeAwayModal from '../../../components/FadeAwayModal';
import { connect } from 'react-redux';
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
};

interface Props {
  classes: Style,
  teacherSelected: Types.Teacher
}

interface Style {
  root: string
}

interface State {
  ac: number,
  noAc: number,
  noChildOpp: number,
  support: number,
  noSupport: number,
  noTeacherOpp: number,
  sessionId: string,
  conferencePlanId: string,
  ac1: number,
  ac2: number,
  ac3: number,
  ac4: number,
  teacher1: number,
  teacher2: number,
  teacher3: number,
  teacher4: number,
  trendsDates: Array<Array<string>>,
  trendsNoChildOpp: Array<number>,
  trendsNoAC: Array<number>,
  trendsAC: Array<number>,
  trendsNoTeacherOpp: Array<number>,
  trendsNoSupport: Array<number>,
  trendsSupport: Array<number>,
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
 * associative cooperative results
 * @class AssociativeCooperativeInteractionsResultsPage
 */
class AssociativeCooperativeInteractionsResultsPage extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      ac: 0,
      noAc: 0,
      noChildOpp: 0,
      support: 0,
      noSupport: 0,
      noTeacherOpp: 0,
      sessionId: '',
      conferencePlanId: '',
      ac1: 0,
      ac2: 0,
      ac3: 0,
      ac4: 0,
      teacher1: 0,
      teacher2: 0,
      teacher3: 0,
      teacher4: 0,
      trendsDates: [],
      trendsNoChildOpp: [],
      trendsNoAC: [],
      trendsAC: [],
      trendsNoTeacherOpp: [],
      trendsNoSupport: [],
      trendsSupport: [],
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
    if (this.props.teacherSelected.id) {
      this.handleDateFetching(this.props.teacherSelected.id);
      this.handleTrendsFetching(this.props.teacherSelected.id);
    } else {
      this.setState({ teacherModal: true });
    }
  }

  handleCloseTeacherModal = (): void => {
    this.setState({ teacherModal: false })
  }

  /** 
   * lifecycle method invoked after component updates 
   * @param {Props} prevProps
   */
  componentDidUpdate(prevProps: Props): void {
    if (this.props.teacherSelected != prevProps.teacherSelected) {
      this.handleDateFetching(this.props.teacherSelected.id);
      this.handleTrendsFetching(this.props.teacherSelected.id);
    }
  }

  /**
   * @param {string} teacherId
   */
  handleTrendsFetching = (teacherId: string): void => {
    this.handleChildTrendsFetch(teacherId);
    this.handleTeacherTrendsFetch(teacherId);
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
        console.log('newTimestamp', newTimestamp);
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
      ac: 0,
      noAc: 0,
      noChildOpp: 0,
      support: 0,
      noSupport: 0,
      noTeacherOpp: 0,
      sessionId: '',
      conferencePlanId: '',
      ac1: 0,
      ac2: 0,
      ac3: 0,
      ac4: 0,
      teacher1: 0,
      teacher2: 0,
      teacher3: 0,
      teacher4: 0,
      trendsDates: [],
      trendsNoChildOpp: [],
      trendsNoAC: [],
      trendsAC: [],
      trendsNoTeacherOpp: [],
      trendsNoSupport: [],
      trendsSupport: [],
      notes: [],
      actionPlanExists: false,
      conferencePlanExists: false,
      addedToPlan: [],
      sessionDates: []
    }, () => {
      firebase.fetchSessionDates(teacherId, "ac").then((dates: Array<{id: string, sessionStart: {value: string}}>) =>
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

  /**
   * @param {string} teacherId
   */
  handleChildTrendsFetch = (teacherId: string): void => {
    const firebase = this.context;
    const dateArray: Array<Array<string>> = [];
    const noOppArray: Array<number> = [];
    const noACArray: Array<number> = [];
    const ACArray: Array<number> = [];
    firebase.fetchChildACTrend(teacherId)
    .then((dataSet: Array<{startDate: {value: string}, noOpportunity: number, ac: number, noac: number}>) => {
      dataSet.forEach(data => {
        dateArray.push([
          moment(data.startDate.value).format("MMM Do"),
        ]);
        noOppArray.push(Math.round((data.noOpportunity / (data.noOpportunity + data.noac + data.ac)) * 100));
        noACArray.push(Math.round((data.noac / (data.noOpportunity + data.noac + data.ac)) * 100));
        ACArray.push(Math.round((data.ac / (data.noOpportunity + data.noac + data.ac)) * 100));
      });

      this.setState({
        trendsDates: dateArray,
        trendsNoChildOpp: noOppArray,
        trendsNoAC: noACArray,
        trendsAC: ACArray
      });
    });
  };

  /**
   * @param {string} teacherId
   */
  handleTeacherTrendsFetch = (teacherId: string): void => {
    const firebase = this.context;
    const dateArray: Array<Array<string>> = [];
    const noSupportArray: Array<number> = [];
    const supportArray: Array<number> = [];
    const noOppArray: Array<number> = [];
    firebase.fetchTeacherACTrend(teacherId)
    .then((dataSet: Array<{startDate: {value: string}, noOpportunity: number, support: number, nosupport: number}>) => {
      dataSet.forEach(data => {
        dateArray.push([
          moment(data.startDate.value).format("MMM Do"),
        ]);
        noSupportArray.push(Math.round((data.nosupport / (data.noOpportunity + data.nosupport + data.support)) * 100));
        supportArray.push(Math.round((data.support / (data.noOpportunity + data.nosupport + data.support)) * 100));
        noOppArray.push(Math.round((data.noOpportunity / (data.noOpportunity + data.nosupport + data.support)) * 100));
      });

      this.setState({
        trendsDates: dateArray,
        trendsNoSupport: noSupportArray,
        trendsSupport: supportArray,
        trendsNoTeacherOpp: noOppArray
      });
    });
  };

  /**
   * specifies formatting for child trends
   * @return {object}
   */
  handleTrendsChildFormatData = (): {
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
          label: "No Opportunity",
          backgroundColor: Constants.Colors.NotPresent,
          borderColor: Constants.Colors.NotPresent,
          fill: false,
          lineTension: 0,
          data: this.state.trendsNoChildOpp
        },
        {
          label: "No Assoc./Coop. Interaction",
          backgroundColor: '#ec2409',
          borderColor: '#ec2409',
          fill: false,
          lineTension: 0,
          data: this.state.trendsNoAC
        },
        {
          label: "Associative and/or Cooperative",
          backgroundColor: Constants.Colors.AC,
          borderColor: Constants.Colors.AC,
          fill: false,
          lineTension: 0,
          data: this.state.trendsAC
        }
      ]
    };
  };

  /**
   * specifies formatting for teacher trends
   * @return {object}
   */
  handleTrendsTeacherFormatData = (): {
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
          label: "Teacher Not at Center",
          backgroundColor: Constants.Colors.NotPresent,
          borderColor: Constants.Colors.NotPresent,
          fill: false,
          lineTension: 0,
          data: this.state.trendsNoTeacherOpp
        },
        {
          label: "No Support",
          backgroundColor: Constants.Colors.RedGraph,
          borderColor: Constants.Colors.RedGraph,
          fill: false,
          lineTension: 0,
          data: this.state.trendsNoSupport
        },
        {
          label: "Teacher Support",
          backgroundColor: Constants.Colors.AppBar,
          borderColor: Constants.Colors.AppBar,
          fill: false,
          lineTension: 0,
          data: this.state.trendsSupport
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
      firebase.createConferencePlan(this.props.teacherSelected.id, this.state.sessionId, 'AC')
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
    
    firebase.fetchChildACSummary(this.state.sessionId).then((summary: {noOpportunity: number, noac: number, ac: number}) => {
      this.setState({
        noChildOpp: summary.noOpportunity,
        noAc: summary.noac,
        ac: summary.ac,
      });
    });

    firebase.fetchTeacherACSummary(this.state.sessionId).then((summary: {noOpportunity: number, noSupport: number, support: number}) => {
      this.setState({
        noTeacherOpp: summary.noOpportunity,
        noSupport: summary.noSupport,
        support: summary.support,
      });
    });

    firebase.fetchACDetails(this.state.sessionId).then((summary: {
      ac1: number,
      ac2: number,
      ac3: number,
      ac4: number,
      teacher1: number,
      teacher2: number,
      teacher3: number,
      teacher4: number
    }) => {
      this.setState({
        ac1: summary.ac1,
        ac2: summary.ac2,
        ac3: summary.ac3,
        ac4: summary.ac4,
        teacher1: summary.teacher1,
        teacher2: summary.teacher2,
        teacher3: summary.teacher3,
        teacher4: summary.teacher4
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
            magic8="AC"
            summary={
              <ChildTeacherBehaviorPieSlider
                ac={this.state.ac}
                noAc={this.state.noAc}
                noChildOpp={this.state.noChildOpp}
                support={this.state.support}
                noSupport={this.state.noSupport}
                noTeacherOpp={this.state.noTeacherOpp}
              />
            }
            details={
              <ChildTeacherBehaviorDetailsSlider
                ac1={this.state.ac1}
                ac2={this.state.ac2}
                ac3={this.state.ac3}
                ac4={this.state.ac4}
                teacher1={this.state.teacher1}
                teacher2={this.state.teacher2}
                teacher3={this.state.teacher3}
                teacher4={this.state.teacher4}
              />
            }
            trendsGraph={
              <ChildTeacherBehaviorTrendsSlider
                childData={this.handleTrendsChildFormatData}
                teacherData={this.handleTrendsTeacherFormatData}
              />
            }
            changeSessionId={this.changeSessionId}
            conferencePlanId={this.state.conferencePlanId}
            addNoteToPlan={this.addNoteToPlan}
            sessionId={this.state.sessionId}
            sessionDates={this.state.sessionDates}
            notes={this.state.notes}
            questions={
              <ACCoachingQuestions
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
          {(firebase: {getTeacherList(): Promise<Types.Teacher[]>} | null): React.ReactElement => (
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

AssociativeCooperativeInteractionsResultsPage.contextType = FirebaseContext;
export default withStyles(styles)(connect(mapStateToProps)(AssociativeCooperativeInteractionsResultsPage));