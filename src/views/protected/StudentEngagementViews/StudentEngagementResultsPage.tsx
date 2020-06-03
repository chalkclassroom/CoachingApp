import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import * as moment from "moment";
import ResultsLayout from '../../../components/ResultsLayout';
import SummarySlider from "../../../components/StudentEngagementComponents/ResultsComponents/SummarySlider";
import DetailsSlider from "../../../components/StudentEngagementComponents/ResultsComponents/DetailsSlider";
import TrendsSlider from "../../../components/StudentEngagementComponents/ResultsComponents/TrendsSlider";
import * as Constants from '../../../constants';
import {connect} from "react-redux";
import StudentEngagementCoachingQuestions
  from "../../../components/StudentEngagementComponents/ResultsComponents/StudentEngagementCoachingQuestions";

const styles: object = {
  root: {
    flexGrow: 1,
    height: "100vh",
    flexDirection: "column",
    overflowY: "auto",
    overflowX: "hidden"
  },
};


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

interface Props {
  classes: Style,
  location: { state: { teacher: { id: string, firstName: string, lastName: string }}},
  teacherSelected: Teacher
}

interface Style {
  root: string
}

interface State {
  sessionId: string,

  offTaskSummaryCount: number,
  engagedSummaryCount: number,
  avgEngagementSummary: number,

  offTaskDetailSplit: Array<number>,
  mildlyEngagedDetailSplit: Array<number>,
  engagedDetailSplit: Array<number>,
  highlyEngagedDetailSplit: Array<number>,

  trendsDates: Array<Array<string>>,
  trendsAvg: Array<number>,

  notes: Array<{id: string, content: string, timestamp: Date}>,
  actionPlanExists: boolean,
  conferencePlanExists: boolean,
  addedToPlan: Array<{panel: string, number: number, question: string}>,
  sessionDates: Array<string>
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
      sessionDates: []
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
    firebase.fetchSessionDates(teacherId, "engagement").then((dates: Array<string>) =>
      this.setState({
        sessionDates: dates
      }, () => {
        this.setState({ sessionId: this.state.sessionDates[0].id },
          () => {
            this.getData();
          }
        );
      })
    );
    console.log('date fetching was called');
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
          backgroundColor: Constants.EngagementColor,
          borderColor: Constants.EngagementColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsAvg
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
    // firebase.getActionPlan(this.state.sessionId)
    // .then((actionPlanData: Array<{id: string, goal: string, benefit: string, date: string}>) => {
    //   if (actionPlanData.length>0) {
    //     this.setState({
    //       actionPlanExists: true
    //     })
    //   } else {
    //     this.setState({
    //       actionPlanExists: false
    //     })
    //   }
    // }).catch(() => {
    //   console.log('unable to retrieve action plan')
    // })
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
      mildlyEngaged0: number,
      mildlyEngaged1: number,
      mildlyEngaged2: number,
      engaged0: number,
      engaged1: number,
      engaged2: number,
      highlyEngaged0: number,
      highlyEngaged1: number,
      highlyEngaged2: number,
    }) => {
      this.setState({
        offTaskDetailSplit: [detail.offTask0,detail.offTask1,detail.offTask2],
        mildlyEngagedDetailSplit: [detail.mildlyEngaged0,detail.mildlyEngaged1,detail.mildlyEngaged2],
        engagedDetailSplit: [detail.engaged0,detail.engaged1,detail.engaged2],
        highlyEngagedDetailSplit: [detail.highlyEngaged0, detail.highlyEngaged1, detail.highlyEngaged2],
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

  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
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
          magic8="Level of Engagement"
          handleTrendsFetch={this.handleTrendsFetching}
          observationType="engagement"
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
            <TrendsSlider
              data={this.handleTrendsFormatData}
            />
          }
          changeSessionId={this.changeSessionId}
          sessionId={this.state.sessionId}
          sessionDates={this.state.sessionDates}
          notes={this.state.notes}
          questions={
            <StudentEngagementCoachingQuestions
              handleAddToPlan={this.handleAddToPlan}
              addedToPlan={this.state.addedToPlan}
              sessionId={this.state.sessionId}
              teacherId={this.props.teacherSelected.id}
              magic8={"Student Engagement"}
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

StudentEngagementResultsPage.contextType = FirebaseContext;
export default connect(mapStateToProps, {})(
    withStyles(styles)(StudentEngagementResultsPage)
);
