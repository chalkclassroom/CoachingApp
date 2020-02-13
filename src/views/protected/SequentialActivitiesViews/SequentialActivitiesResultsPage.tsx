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
  actionPlanExists: boolean
}

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
          backgroundColor: Constants.SequentialColor,
          borderColor: Constants.SequentialColor,
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
          magic8="Sequential Activities"
          handleTrendsFetch={this.handleTrendsFetching}
          observationType="sequential"
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
          notes={this.state.notes}
          questions={<SequentialCoachingQuestions />}
          teacherFirstName={this.props.location.state.teacher.firstName}
          teacherLastName={this.props.location.state.teacher.lastName}
          actionPlanExists={this.state.actionPlanExists}
        />
      </div>
    );
  }
}


SequentialActivitiesResultsPage.contextType = FirebaseContext;
export default withStyles(styles)(SequentialActivitiesResultsPage);