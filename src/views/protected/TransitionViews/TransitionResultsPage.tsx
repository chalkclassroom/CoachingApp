import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import Typography from "@material-ui/core/Typography/Typography";
import TransitionCoachingQuestions from "../../../components/TransitionComponents/ResultsComponents/TransitionCoachingQuestions"
import "chartjs-plugin-datalabels";
import TransitionTimePie from "../../../components/ResultsComponents/TransitionTimePie";
import TransitionBarChart from "../../../components/ResultsComponents/TransitionBarChart.tsx";
import TransitionTrendsGraph from "../../../components/ResultsComponents/TransitionTrendsGraph.tsx";
import * as moment from "moment";
import ResultsLayout from '../../../components/ResultsLayout';
import * as Constants from '../../../constants';

const styles: object = {
  root: {
    flexGrow: 1,
    height: "100vh",
    flexDirection: "column",
    overflowX: 'hidden',
    overflowY: 'auto'
  },
};

interface Props {
  location: { state: { teacher: { id: string, firstName: string, lastName: string }}},
  classes: { root: string }
}

interface State {
  sessionId: string,
  notes: Array<{timestamp: Date, content: string}>,
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
  trendsTotalColor: string,
  transitionTime: number,
  sessionTotal: number,
  learningActivityTime: number,
  actionPlanExists: boolean
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
      trendsTotalColor: "#ec2409",
      transitionTime: 0,
      sessionTotal: 0,
      learningActivityTime: 0,
      actionPlanExists: false
    };
  }

  

  /** lifecycle method invoked after component mounts */
  componentDidMount() {
    const teacherId = this.props.location.state.teacher.id;
    this.handleTrendsFetch(teacherId);
  }

  /**
   * @param {string} teacherId
   */
  handleTrendsFetch = (teacherId: string) => {
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
    firebase.fetchTransitionTrend(teacherId).then(dataSet => {
      dataSet.forEach(data => {
        formattedTime = this.handleTrendsFormatTime(data.total);
        dateArray.push([
          moment(data.startDate.value).format("MMM Do"),
          formattedTime
        ]);
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

      firebase.getActionPlan(this.state.sessionId).then((actionPlanData) => {
        if (actionPlanData.length>0) {
          console.log('actionplan data: ', actionPlanData>0)
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

      /* firebase.fetchTransitionTypeSummary(this.state.sessionId).then(type => {
        this.setState({
          sessionLine: Math.round(((type[0].line/type[0].total)*100)),
          sessionTraveling: Math.round(((type[0].traveling/type[0].total)*100)),
          sessionWaiting: Math.round(((type[0].waiting/type[0].total)*100)),
          sessionRoutines: Math.round(((type[0].routines/type[0].total)*100)),
          sessionBehaviorManagement: Math.round(((type[0].behaviorManagement/type[0].total)*100)),
          sessionOther: Math.round(((type[0].other/type[0].total)*100)),
          transitionTime: type[0].total
        })
      }); */
      firebase.fetchTransitionTypeSummary(this.state.sessionId).then(type => {
        this.setState({
          sessionLine: Math.round(((type[0].line))),
          sessionTraveling: Math.round(((type[0].traveling))),
          sessionWaiting: Math.round(((type[0].waiting))),
          sessionRoutines: Math.round(((type[0].routines))),
          sessionBehaviorManagement: Math.round(((type[0].behaviorManagement))),
          sessionOther: Math.round(((type[0].other))),
          transitionTime: type[0].total
        }, () => {console.log("session line is ", this.state.sessionLine)})
      });
  })};

  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.exact({ state: PropTypes.exact({ teacher: PropTypes.exact({ id: PropTypes.string})})}).isRequired
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {console.log("transition: ", this.state.transitionTime)}
        {console.log("learning activity: ", this.state.learningActivityTime)}
        {console.log("session total: ", this.state.sessionTotal)}
        <ResultsLayout
          teacherId={this.props.location.state.teacher.id}
          magic8="Transition Time"
          handleTrendsFetch={this.handleTrendsFetch}
          observationType="transition"
          summary={
            <div>
              <Typography variant="h5" style={{padding: 15, textAlign: "center", fontFamily: 'Arimo'}}>
                Total Session Time: {Math.floor((this.state.sessionTotal/1000)/60)}m {Math.round((((this.state.sessionTotal/1000)/60) % 1) * 60) }s
              </Typography>
              <TransitionTimePie
                transitionTime={this.state.transitionTime}
                learningActivityTime={this.state.learningActivityTime}
                style={{overflow:"hidden", height: '80vh'}}
              />
            </div>
          }
          details={
            <div>
              <Typography variant="h5" style={{padding: 15, textAlign: "center", fontFamily: 'Arimo'}}>
                Total Transition Time: {Math.floor((this.state.transitionTime/1000)/60)}m {Math.round((((this.state.transitionTime/1000)/60) % 1) * 60) }s
              </Typography>
              <TransitionBarChart
                line={this.state.sessionLine}
                traveling={this.state.sessionTraveling}
                waiting={this.state.sessionWaiting}
                routines={this.state.sessionRoutines}
                behaviorManagement={this.state.sessionBehaviorManagement}
                other={this.state.sessionOther}
                style={{alignItems: "center", height: '80vh'}}
              />
            </div>
          }
          trendsGraph={
            <TransitionTrendsGraph
              data={this.handleTrendsFormatData}
              style={{overflow:"hidden", height: '80vh'}}
            />
          }
          changeSessionId={this.changeSessionId}
          sessionId={this.state.sessionId}
          notes={this.state.notes}
          questions={<TransitionCoachingQuestions />}
          teacherFirstName={this.props.location.state.teacher.firstName}
          teacherLastName={this.props.location.state.teacher.lastName}
          actionPlanExists={this.state.actionPlanExists}
        />
      </div>
    );
  }
}

TransitionResultsPage.contextType = FirebaseContext;
export default withStyles(styles)(TransitionResultsPage);
