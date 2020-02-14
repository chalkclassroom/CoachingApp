import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import * as moment from "moment";
import ResultsLayout from '../../../components/ResultsLayout';
import SummarySlider from "../../../components/MathInstructionComponents/ResultsComponents/SummarySlider";
import DetailsSlider from "../../../components/MathInstructionComponents/ResultsComponents/DetailsSlider";
import TrendsSlider from "../../../components/MathInstructionComponents/ResultsComponents/TrendsSlider";
import MathCoachingQuestions from "../../../components/MathInstructionComponents/ResultsComponents/MathCoachingQuestions";
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
  location: { state: { teacher: { id: string, firstName: string, lastName: string }}},
}

interface Style {
  root: string
}

interface State {
  math: number,
  notMath: number,
  support: number,
  noSupport: number,
  noTeacherOpp: number,
  sessionId: string,
  math1: number,
  math2: number,
  math3: number,
  math4: number,
  teacher1: number,
  teacher2: number,
  teacher3: number,
  teacher4: number,
  trendsDates: Array<Array<string>>,
  trendsMath: Array<number>,
  trendsNotMath: Array<number>,
  trendsNoTeacherOpp: Array<number>,
  trendsNoSupport: Array<number>,
  trendsSupport: Array<number>,
  notes: Array<{id: string, content: string, timestamp: Date}>,
  actionPlanExists: boolean
}

/**
 * math results
 * @class MathInstructionResultsPage
 */
class MathInstructionResultsPage extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      math: 0,
      notMath: 0,
      support: 0,
      noSupport: 0,
      noTeacherOpp: 0,
      sessionId: '',
      math1: 0,
      math2: 0,
      math3: 0,
      math4: 0,
      teacher1: 0,
      teacher2: 0,
      teacher3: 0,
      teacher4: 0,
      trendsDates: [],
      trendsMath: [],
      trendsNotMath: [],
      trendsNoTeacherOpp: [],
      trendsNoSupport: [],
      trendsSupport: [],
      notes: [],
      actionPlanExists: false
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
  handleChildTrendsFetch = (teacherId: string): void => {
    const firebase = this.context;
    const dateArray: Array<Array<string>> = [];
    const mathArray: Array<number> = [];
    const notMathArray: Array<number> = [];
    firebase.fetchChildMathTrend(teacherId)
    .then((dataSet: Array<{startDate: {value: string}, math: number, notMath: number}>) => {
      dataSet.forEach(data => {
        dateArray.push([
          moment(data.startDate.value).format("MMM Do"),
        ]);
        mathArray.push(Math.floor((data.math / (data.math + data.notMath)) * 100));
        notMathArray.push(Math.floor((data.notMath / (data.math + data.notMath)) * 100));
      });

      this.setState({
        trendsDates: dateArray,
        trendsMath: mathArray,
        trendsNotMath: notMathArray
      }, () => console.log('math trends: ', this.state.trendsMath, this.state.trendsNotMath));
    });
  };

  /**
   * @param {string} teacherId
   */
  handleTeacherTrendsFetch = (teacherId: string): void => {
    const firebase = this.context;
    const dateArray: Array<Array<string>> = [];
    const supportArray: Array<number> = [];
    const noSupportArray: Array<number> = [];
    const noOppArray: Array<number> = [];
    firebase.fetchTeacherMathTrend(teacherId)
    .then((dataSet: Array<{startDate: {value: string}, noOpportunity: number, support: number, noSupport: number}>) => {
      dataSet.forEach(data => {
        dateArray.push([
          moment(data.startDate.value).format("MMM Do"),
        ]);
        supportArray.push(Math.floor((data.support / (data.noOpportunity + data.noSupport + data.support)) * 100));
        noSupportArray.push(Math.floor((data.noSupport / (data.noOpportunity + data.noSupport + data.support)) * 100));
        noOppArray.push(Math.floor((data.noOpportunity / (data.noOpportunity + data.noSupport + data.support)) * 100));
      });
      this.setState({
        trendsDates: dateArray,
        trendsSupport: supportArray,
        trendsNoSupport: noSupportArray,
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
          label: "Non-Math Activities",
          backgroundColor: '#ec2409',
          borderColor: '#ec2409',
          fill: false,
          lineTension: 0,
          data: this.state.trendsNotMath
        },
        {
          label: "Math",
          backgroundColor: Constants.MathColor,
          borderColor: Constants.MathColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsMath
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
   * @param {SyntheticEvent} event
   */
  changeSessionId = (event: React.SyntheticEvent): void => {
    this.setState(
      {
        sessionId: event.target.value
      },
      () => {
        this.handleNotesFetching(this.state.sessionId);
        const firebase = this.context;
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
        firebase.fetchChildMathSummary(this.state.sessionId).then((summary: {math: number, notMath: number}) => {
          this.setState({
            math: summary.math,
            notMath: summary.notMath,
          });
        });
        firebase.fetchTeacherMathSummary(this.state.sessionId).then((summary: {noOpportunity: number, noSupport: number, support: number}) => {
          this.setState({
            noTeacherOpp: summary.noOpportunity,
            noSupport: summary.noSupport,
            support: summary.support,
          });
        });
        firebase.fetchMathDetails(this.state.sessionId)
        .then((summary: {
          math1: number,
          math2: number,
          math3: number,
          math4: number,
          teacher1: number,
          teacher2: number,
          teacher3: number,
          teacher4: number
        }) => {
          this.setState({
            math1: summary.math1,
            math2: summary.math2,
            math3: summary.math3,
            math4: summary.math4,
            teacher1: summary.teacher1,
            teacher2: summary.teacher2,
            teacher3: summary.teacher3,
            teacher4: summary.teacher4
          })
        })
      }
    );
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ResultsLayout
          teacherId={this.props.location.state.teacher.id}
          magic8="Math Instruction"
          handleTrendsFetch={this.handleTrendsFetching}
          observationType="math"
          summary={
            <SummarySlider
              math={this.state.math}
              notMath={this.state.notMath}
              support={this.state.support}
              noSupport={this.state.noSupport}
              noTeacherOpp={this.state.noTeacherOpp}
            />
          }
          details={
            <DetailsSlider
              math1={this.state.math1}
              math2={this.state.math2}
              math3={this.state.math3}
              math4={this.state.math4}
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
          notes={this.state.notes}
          questions={<MathCoachingQuestions />}
          teacherFirstName={this.props.location.state.teacher.firstName}
          teacherLastName={this.props.location.state.teacher.lastName}
          actionPlanExists={this.state.actionPlanExists}
        />
      </div>
    );
  }
}


MathInstructionResultsPage.contextType = FirebaseContext;
export default withStyles(styles)(MathInstructionResultsPage);