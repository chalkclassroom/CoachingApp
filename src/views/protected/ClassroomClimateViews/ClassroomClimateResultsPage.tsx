import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import * as moment from "moment";
import ClimateTrendsGraph from "../../../components/ClassroomClimateComponent/ResultsComponents/ClimateTrendsGraph.tsx";
import ResultsLayout from '../../../components/ResultsLayout';
import BehaviorResponsesDetailsChart from "../../../components/ClassroomClimateComponent/ResultsComponents/BehaviorResponsesDetailsChart";
import ClimateCoachingQuestions from "../../../components/ClassroomClimateComponent/ResultsComponents/ClimateCoachingQuestions";
import ClimateSummarySlider from "../../../components/ClassroomClimateComponent/ResultsComponents/ClimateSummarySlider";


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
  actionPlanExists: boolean,
  conferencePlanExists: boolean,
  addedToPlan: Array<{panel: string, number: number, question: string}>,
  sessionDates: Array<string>
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
      trendsDates: [],
      trendsPos: [],
      trendsNeg: [],
      notes: [],
      actionPlanExists: false,
      conferencePlanExists: false,
      addedToPlan: [],
      sessionDates: []
    };
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount() {
    const firebase = this.context;
    const teacherId = this.props.location.state.teacher.id;
    firebase.fetchBehaviourTypeCount(this.state.sessionId);
    firebase.fetchAvgToneRating(this.state.sessionId);
    this.handleDateFetching(teacherId);
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

  /**
   * @param {string} teacherId
   */
  handleDateFetching = (teacherId: string) => {
    const firebase = this.context;
    firebase.fetchSessionDates(teacherId, "climate").then((dates: Array<string>) =>
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

  trendsFormatData = () => {
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

  getData = () => {
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
        firebase.getConferencePlan(this.state.sessionId).then((conferencePlanData: Array<{id: string, feedback: string, questions: Array<string>, notes: string, date: Date}>) => {
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
   * @param {SyntheticEvent} event
   */
  changeSessionId = (event: React.SyntheticEvent) => {
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
    const chosenQuestions = this.state.addedToPlan.map((value) => {
      return(
        value.question
      )
    })
    return (
      <div className={classes.root}>
        <ResultsLayout
          teacherId={this.props.location.state.teacher.id}
          magic8="Classroom Climate"
          handleTrendsFetch={this.handleTrendsFetching}
          observationType="climate"
          summary={
            <ClimateSummarySlider
              positiveResponses={this.state.specificBehaviorCount+this.state.nonspecificBehaviorCount}
              negativeResponses={this.state.redirectionsBehaviorCount+this.state.disapprovalBehaviorCount}
              averageToneRating={this.state.averageToneRating}
            />
          }
          details={
            <BehaviorResponsesDetailsChart
              disapprovalBehaviorCount={this.state.disapprovalBehaviorCount}
              redirectionsBehaviorCount={this.state.redirectionsBehaviorCount}
              nonspecificBehaviorCount={this.state.nonspecificBehaviorCount}
              specificBehaviorCount={this.state.specificBehaviorCount}
            />
          }
          trendsGraph={<ClimateTrendsGraph data={this.trendsFormatData}/>}
          changeSessionId={this.changeSessionId}
          sessionId={this.state.sessionId}
          sessionDates={this.state.sessionDates}
          notes={this.state.notes}
          questions={
            <ClimateCoachingQuestions
              handleAddToPlan={this.handleAddToPlan}
              addedToPlan={this.state.addedToPlan}
              sessionId={this.state.sessionId}
              teacherId={this.props.location.state.teacher.id}
              magic8={"Classroom Climate"}
            />
          }
          chosenQuestions={chosenQuestions}
          teacherFirstName={this.props.location.state.teacher.firstName}
          teacherLastName={this.props.location.state.teacher.lastName}
          actionPlanExists={this.state.actionPlanExists}
          conferencePlanExists={this.state.conferencePlanExists}
        />
      </div>
    );
  }
}


ClassroomClimateResultsPage.contextType = FirebaseContext;
export default withStyles(styles)(ClassroomClimateResultsPage);