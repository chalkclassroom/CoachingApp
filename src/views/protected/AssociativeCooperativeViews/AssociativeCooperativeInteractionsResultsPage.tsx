import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import * as moment from "moment";
import Typography from "@material-ui/core/Typography";
import ResultsLayout from '../../../components/ResultsLayout';
import ChildTeacherBehaviorPieSlider from "../../../components/AssociativeCooperativeComponents/ResultsComponents/ChildTeacherBehaviorPieSlider.tsx";
import ChildTeacherBehaviorDetailsSlider from "../../../components/AssociativeCooperativeComponents/ResultsComponents/ChildTeacherBehaviorDetailsSlider.tsx";
import ChildTeacherBehaviorTrendsSlider from "../../../components/AssociativeCooperativeComponents/ResultsComponents/ChildTeacherBehaviorTrendsSlider.tsx";
import ChildTeacherSummary from "../../../components/AssociativeCooperativeComponents/ResultsComponents/ChildTeacherSummary.tsx";

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
  disapprovalBehaviorCount: number,
  redirectionsBehaviorCount: number,
  nonspecificBehaviorCount: number,
  specificBehaviorCount: number,
  averageToneRating: number,
  sessionId: string,
  trendsDates: Array<string>,
  trendsPos: Array<number>,
  trendsNeg: Array<number>,
  notes: Array<{id: string, content: string, timestamp: Date}>,
  actionPlanExists: boolean
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
      trendsDates: [],
      trendsNoOpp: [],
      trendsNoAC: [],
      trendsAC: [],
      trendsNoSupport: [],
      trendsSupport: [],
      notes: [],
      actionPlanExists: false
    };
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount() {
    const firebase = this.context;
    firebase.fetchBehaviourTypeCount(this.state.sessionId);
    firebase.fetchAvgToneRating(this.state.sessionId);
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
      console.log(notesArr);
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
      console.log(formattedNotesArr);
      this.setState({
        notes: formattedNotesArr
      });
    });
  };

  handleChildTrendsFetch = teacherId => {
    const firebase = this.context;
    const dateArray = [];
    const noOppArray = [];
    const noACArray = [];
    const ACArray = [];
    let formattedTime;
    firebase.fetchChildACTrend(teacherId).then(dataSet => {
      console.log("Trends dataSet", dataSet);
      dataSet.map(data => {
        formattedTime = this.handleTrendsFormatTime(data.total);
        dateArray.push([
          moment(data.startDate.value).format("MMM Do"),
          formattedTime
        ]);
        noOppArray.push(
          Math.floor((data.noOpportunity / data.sessionTotal) * 100)
        );
        noACArray.push(Math.floor((data.noAC / data.sessionTotal) * 100));
        ACArray.push(Math.floor((data.AC / data.sessionTotal) * 100));
      });

      this.setState({
        trendsDates: dateArray,
        trendsNoOpp: noOppArray,
        trendsNoAC: noACArray,
        trendsAC: ACArray
      });

      console.log("trends date array: ", this.state.trendsDates);
      console.log("trends no opportunity array: ", this.state.trendsNoOpp);
      console.log("trends no ac array: ", this.state.trendsNoAC);
      console.log("trends ac array: ", this.state.trendsNoOpp);
    });
  };

  handleTeacherTrendsFetch = teacherId => {
    const firebase = this.context;
    const dateArray = [];
    const noSupportArray = [];
    const supportArray = [];
    const ACArray = [];
    let formattedTime;
    firebase.fetchTeacherACTrend(teacherId).then(dataSet => {
      console.log("Trends dataSet", dataSet);
      dataSet.map(data => {
        formattedTime = this.handleTrendsFormatTime(data.total);
        dateArray.push([
          moment(data.startDate.value).format("MMM Do"),
          formattedTime
        ]);
        noSupportArray.push(
          Math.floor((data.noSupport / data.sessionTotal) * 100)
        );
        supportArray.push(
          Math.floor((data.supportArray / data.sessionTotal) * 100)
        );
        ACArray.push(Math.floor((data.AC / data.sessionTotal) * 100));
      });

      this.setState({
        trendsDates: dateArray,
        trendsNoSupport: noSupportArray,
        trendsSupport: supportArray
      });

      console.log("trends date array: ", this.state.trendsDates);
      console.log("trends no support array: ", this.state.trendsNoSupport);
      console.log("trends support array: ", this.state.trendsSupport);
    });
  };

  handleTrendsFormatTime = totalTime => {
    const seconds = Math.floor((totalTime / 1000) % 60);
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
    console.log("formatted time is ", formattedTime);

    return formattedTime;
  };

  handleTrendsChildFormatData = () => {
    return {
      labels: this.state.trendsDates,
      datasets: [
        {
          label: "No Opportunity",
          backgroundColor: this.state.trendsNoOppColor,
          borderColor: this.state.trendsNoOppColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsNoOpp
        },
        {
          label: "No Assoc./Coop. Interaction",
          backgroundColor: this.state.trendsNoACColor,
          borderColor: this.state.trendsNoACColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsNoAC
        },
        {
          label: "Associative and/or Cooperative",
          backgroundColor: this.state.trendsACColor,
          borderColor: this.state.trendsACColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsAC
        }
      ]
    };
  };

  handleTrendsTeacherFormatData = () => {
    return {
      labels: this.state.trendsDates,
      datasets: [
        {
          label: "No Support",
          backgroundColor: this.state.trendsNoSupportColor,
          borderColor: this.state.trendsNoSupportColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsNoSupport
        },
        {
          label: "Teacher Support",
          backgroundColor: this.state.trendsSupportColor,
          borderColor: this.state.trendsSupportColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsSupport
        }
      ]
    };
  };

  changeSessionId = event => {
    console.log("sessionId", event.target.value);
    this.setState(
      {
        sessionId: event.target.value
      },
      () => {
        this.handleNotesFetching(this.state.sessionId);
        //this.handleListDetailFetching(this.state.sessionId);
        const firebase = this.context;

        /* firebase
          .fetchChildACSummary(this.state.sessionId)
          .then(summary => console.log("summary time: ", summary[0].childAC));
        firebase
          .fetchTeacherACSummary(this.state.sessionId)
          .then(summary => console.log("summary time: ", summary[0].teacherAC)); */

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
        
        firebase.fetchChildACSummary(this.state.sessionId).then(summary => {
          this.setState({
            noChildOpp: summary.noOpportunity,
            noAc: summary.noac,
            ac: summary.ac,
          });
        });

        firebase.fetchTeacherACSummary(this.state.sessionId).then(summary => {
          this.setState({
            noTeacherOpp: summary.noOpportunity,
            noSupport: summary.noSupport,
            support: summary.support,
          });
        });
      }
    );
  };

  /**
   * @param {SyntheticEvent} event
   */
  /* changeSessionId = (event: React.SyntheticEvent) => {
    console.log("sessionId", event.target.value, "type is: ", typeof event);
    let specificCount = 0;
    let nonspecificCount = 0;
    let disapprovalCount = 0;
    let redirectionCount = 0;
    this.setState(
      {
        sessionId: event.target.value
      },
      () => {
        this.handleNotesFetching(this.state.sessionId);
        const firebase = this.context;
        firebase.fetchAvgToneRating(this.state.sessionId).then((json: Array<{average: number}>) =>
          json.forEach(toneRating => {
            this.setState({
              averageToneRating: toneRating.average
            });
          })
        );
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
    );
  }; */

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
          magic8="AC"
          handleTrendsFetch={this.handleTrendsFetching}
          observationType="ac"
          summary={
            <ChildTeacherSummary
              ac={this.state.ac}
              noAc={this.state.noAc}
              noChildOpp={this.state.noChildOpp}
              support={this.state.support}
              noSupport={this.state.noSupport}
              noTeacherOpp={this.state.noTeacherOpp}
            />
          }
          details={
            <ChildTeacherBehaviorDetailsSlider />
          }
          trendsGraph={
            <ChildTeacherBehaviorTrendsSlider
              childData={this.handleTrendsChildFormatData}
              teacherData={this.handleTrendsTeacherFormatData}
            />
          }
          changeSessionId={this.changeSessionId}
          sessionId={this.state.sessionId}
          notes={this.state.notes}
          questions={<Typography> questions go here </Typography>}
          teacherFirstName={this.props.location.state.teacher.firstName}
          teacherLastName={this.props.location.state.teacher.lastName}
          actionPlanExists={this.state.actionPlanExists}
        />
      </div>
    );
  }
}


AssociativeCooperativeInteractionsResultsPage.contextType = FirebaseContext;
export default withStyles(styles)(AssociativeCooperativeInteractionsResultsPage);