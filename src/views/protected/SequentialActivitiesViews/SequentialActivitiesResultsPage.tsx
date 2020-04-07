import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import * as moment from "moment";
import ResultsLayout from '../../../components/ResultsLayout';
import SummarySlider from "../../../components/SequentialActivitiesComponents/ResultsComponents/SummarySlider";
import DetailsSlider from "../../../components/SequentialActivitiesComponents/ResultsComponents/DetailsSlider";
import TrendsSlider from "../../../components/SequentialActivitiesComponents/ResultsComponents/TrendsSlider";
import SequentialCoachingQuestions from "../../../components/SequentialActivitiesComponents/ResultsComponents/SequentialCoachingQuestions";
import { connect } from 'react-redux';
import * as Constants from '../../../constants';

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
  teacherSelected: Teacher
}

interface Style {
  root: string
}

interface State {
  sequential: number,
  notSequential: number,
  support: number,
  noSupport: number,
  noTeacherOpp: number,
  sessionId: string,
  sequential1: number,
  sequential2: number,
  sequential3: number,
  sequential4: number,
  teacher1: number,
  teacher2: number,
  teacher3: number,
  teacher4: number,
  trendsDates: Array<Array<string>>,
  trendsNotSequential: Array<number>,
  trendsSequential: Array<number>,
  trendsNoTeacherOpp: Array<number>,
  trendsNoSupport: Array<number>,
  trendsSupport: Array<number>,
  notes: Array<{id: string, content: string, timestamp: Date}>,
  actionPlanExists: boolean,
  conferencePlanExists: boolean,
  addedToPlan: Array<{panel: string, number: number, question: string}>,
  sessionDates: Array<{id: string, sessionStart: {value: string}}>
}

interface Teacher {
  email: string,
  firstName: string,
  lastName: string,
  notes: string,
  id: string,
  phone: string,
  role: string,
  school: string
};

/**
 * sequential results
 * @class SequentialActivitiesResultsPage
 */
class SequentialActivitiesResultsPage extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      sequential: 0,
      notSequential: 0,
      support: 0,
      noSupport: 0,
      noTeacherOpp: 0,
      sessionId: '',
      sequential1: 0,
      sequential2: 0,
      sequential3: 0,
      sequential4: 0,
      teacher1: 0,
      teacher2: 0,
      teacher3: 0,
      teacher4: 0,
      trendsDates: [],
      trendsNotSequential: [],
      trendsSequential: [],
      trendsNoTeacherOpp: [],
      trendsNoSupport: [],
      trendsSupport: [],
      notes: [],
      actionPlanExists: false,
      conferencePlanExists: false,
      addedToPlan: [],
      sessionDates: []
    };
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
    firebase.handleFetchNotesResults(sessionId).then((notesArr: Array<{id: string, content: string, timestamp: Date}>) => {
      const formattedNotesArr: Array<{id: string, content: string, timestamp: Date}> = [];
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
  handleDateFetching = (teacherId: string) => {
    const firebase = this.context;
    firebase.fetchSessionDates(teacherId, "sequential").then((dates: Array<{id: string, sessionStart: {value: string}}>) =>
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
    console.log('date fetching was called');
  };

  /**
   * @param {string} teacherId
   */
  handleChildTrendsFetch = (teacherId: string): void => {
    const firebase = this.context;
    const dateArray: Array<Array<string>> = [];
    const notSequentialArray: Array<number> = [];
    const sequentialArray: Array<number> = [];
    firebase.fetchChildSeqTrend(teacherId)
    .then((dataSet: Array<{startDate: {value: string}, sequential: number, notSequential: number}>) => {
      dataSet.forEach(data => {
        dateArray.push([
          moment(data.startDate.value).format("MMM Do"),
        ]);
        notSequentialArray.push(Math.floor((data.notSequential / (data.notSequential + data.sequential)) * 100));
        sequentialArray.push(Math.floor((data.sequential / (data.notSequential + data.sequential)) * 100));
      });

      this.setState({
        trendsDates: dateArray,
        trendsNotSequential: notSequentialArray,
        trendsSequential: sequentialArray
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
    firebase.fetchTeacherSeqTrend(teacherId)
    .then((dataSet: Array<{startDate: {value: string}, noOpportunity: number, support: number, noSupport: number}>) => {
      dataSet.forEach(data => {
        dateArray.push([
          moment(data.startDate.value).format("MMM Do"),
        ]);
        noSupportArray.push(Math.floor((data.noSupport / (data.noOpportunity + data.noSupport + data.support)) * 100));
        supportArray.push(Math.floor((data.support / (data.noOpportunity + data.noSupport + data.support)) * 100));
        noOppArray.push(Math.floor((data.noOpportunity / (data.noOpportunity + data.noSupport + data.support)) * 100));
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
          label: "Non-Sequential Activities",
          backgroundColor: '#ec2409',
          borderColor: '#ec2409',
          fill: false,
          lineTension: 0,
          data: this.state.trendsNotSequential
        },
        {
          label: "Sequential Activities",
          backgroundColor: Constants.Colors.SA,
          borderColor: Constants.Colors.SA,
          fill: false,
          lineTension: 0,
          data: this.state.trendsSequential
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
          backgroundColor: Constants.NotPresentColor,
          borderColor: Constants.NotPresentColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsNoTeacherOpp
        },
        {
          label: "No Support",
          backgroundColor: Constants.RedGraphColor,
          borderColor: Constants.RedGraphColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsNoSupport
        },
        {
          label: "Teacher Support",
          backgroundColor: Constants.AppBarColor,
          borderColor: Constants.AppBarColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsSupport
        },
      ]
    };
  };

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
        firebase.saveConferencePlanQuestion(sessionId, question);
        this.setState({
          conferencePlanExists: true
        })
      } else {
        firebase.createConferencePlan(teacherId, sessionId, magic8)
        .then(() => {
          firebase.saveConferencePlanQuestion(sessionId, question);
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
    firebase.getActionPlan(this.state.sessionId)
    .then((actionPlanData: Array<{id: string, goal: string, benefit: string, date: string}>) => {
      if (actionPlanData.length>0) {
        this.setState({
          actionPlanExists: true
        })
      } else {
        this.setState({
          actionPlanExists: false
        })
      }
    }).catch(() => {
      console.log('unable to retrieve action plan')
    })
    firebase.getConferencePlan(this.state.sessionId)
    .then((conferencePlanData: Array<{id: string, feedback: string, questions: Array<string>, notes: string, date: Date}>) => {
      if (conferencePlanData[0]) {
        this.setState({
          conferencePlanExists: true
        })
      } else {
        this.setState({
          conferencePlanExists: false
        })
      }
    }).catch(() => {
      console.log('unable to retrieve conference plan')
    })
    firebase.fetchChildSeqSummary(this.state.sessionId).then((summary: {notSequential: number, sequential: number}) => {
      this.setState({
        notSequential: summary.notSequential,
        sequential: summary.sequential,
      });
    });
    firebase.fetchTeacherSeqSummary(this.state.sessionId).then((summary: {noOpportunity: number, noSupport: number, support: number}) => {
      this.setState({
        noTeacherOpp: summary.noOpportunity,
        noSupport: summary.noSupport,
        support: summary.support,
      });
    });
    firebase.fetchSeqDetails(this.state.sessionId)
    .then((summary: {
      sequential1: number,
      sequential2: number,
      sequential3: number,
      sequential4: number,
      teacher1: number,
      teacher2: number,
      teacher3: number,
      teacher4: number
    }) => {
      this.setState({
        sequential1: summary.sequential1,
        sequential2: summary.sequential2,
        sequential3: summary.sequential3,
        sequential4: summary.sequential4,
        teacher1: summary.teacher1,
        teacher2: summary.teacher2,
        teacher3: summary.teacher3,
        teacher4: summary.teacher4
      })
    })
  }

  /**
   * @param {SyntheticEvent} event
   */
  changeSessionId = (event: React.SyntheticEvent): void => {
    this.setState(
      {
        sessionId: event.target.value
      },
      () => {
        this.getData();
      }
    );
  };

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    this.handleDateFetching(this.props.teacherSelected.id);
    this.handleTrendsFetching(this.props.teacherSelected.id);
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
      <div className={classes.root}>
        <ResultsLayout
          teacher={this.props.teacherSelected}
          magic8="Sequential Activities"
          history={this.props.history}
          summary={
            <SummarySlider
              sequential={this.state.sequential}
              notSequential={this.state.notSequential}
              support={this.state.support}
              noSupport={this.state.noSupport}
              noTeacherOpp={this.state.noTeacherOpp}
            />
          }
          details={
            <DetailsSlider
              sequential1={this.state.sequential1}
              sequential2={this.state.sequential2}
              sequential3={this.state.sequential3}
              sequential4={this.state.sequential4}
              teacher1={this.state.teacher1}
              teacher2={this.state.teacher2}
              teacher3={this.state.teacher3}
              teacher4={this.state.teacher4}
            />
          }
          trendsGraph={
            <TrendsSlider
              childData={this.handleTrendsChildFormatData}
              teacherData={this.handleTrendsTeacherFormatData}
            />
          }
          changeSessionId={this.changeSessionId}
          sessionId={this.state.sessionId}
          sessionDates={this.state.sessionDates}
          notes={this.state.notes}
          questions={
            <SequentialCoachingQuestions
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
    );
  }
}

const mapStateToProps = state => {
  return {
    teacherSelected: state.teacherSelectedState.teacher
  };
};

SequentialActivitiesResultsPage.contextType = FirebaseContext;
export default withStyles(styles)(connect(mapStateToProps)(SequentialActivitiesResultsPage));