import * as React from "react";
import * as PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button/Button";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabBar from "@material-ui/core/AppBar";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import AppBar from "../../../components/AppBar";
import Typography from "@material-ui/core/Typography/Typography";
// import { ImmortalDB } from "immortal-db";
import NotesListDetailTable from "../../../components/ResultsComponents/NotesListDetailTable.tsx";
import DataQuestions from "../../../components/ResultsComponents/DataQuestions.tsx";
import "chartjs-plugin-datalabels";
import TransitionTimePie from "../../../components/ResultsComponents/TransitionTimePie";
import TransitionBarChart from "../../../components/ResultsComponents/TransitionBarChart.tsx";
import TransitionTrendsGraph from "../../../components/ResultsComponents/TransitionTrendsGraph.tsx";
import * as moment from "moment";
import ChildWaitingImage from "../../../assets/images/ChildWaitingImage.svg";
import WaitingInLineImage from "../../../assets/images/WaitingInLineImage.svg";
import WalkingImage from "../../../assets/images/WalkingImage.svg";
import ClassroomRoutinesImage from "../../../assets/images/ClassroomRoutinesImage.svg";
import BMDImage from "../../../assets/images/BMDImage.svg";
import {
  lightGreen,
  deepOrange,
  orange,
  blue,
  indigo
} from "@material-ui/core/colors";
import { red } from "@material-ui/core/es/colors";
import CardContent from "@material-ui/core/CardContent";
import ResultsDashboard from '../../../components/ResultsDashboard';

const styles: object = {
  root: {
    flexGrow: 1,
    height: "100vh",
    flexDirection: "column"
  },
  resultsContent: {
    position: "relative",
    width: '60vw',
    marginTop: '5vh'
  },
  buttonText: {
    fontSize: "12px",
    textAlign: "center"
  },
  transitionTypeButton: {
    width: "70px",
    height: "70px"
  },
  tabBar: {
    marginBottom: "10px",
    height: "5%",
    width: "100%"
  },
  coachPrepCard: {
    width: "100%",
    overflow: "auto"
  },
};

const TransitionTypeColors = {
  lineColor: lightGreen[300],
  travelingColor: orange[400],
  waitingColor: deepOrange[400],
  routinesColor: blue[300],
  behaviorManagementColor: red['A200'],
  otherColor: indigo['A200'],
}

const raisedThemes = createMuiTheme({
  palette: {
    waitingColor: {
      backgroundColor: lightGreen[300],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white',
      boxShadow: "4px 4px #a9a9a9"
    },
    travelingColor: {
      backgroundColor: orange[400],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white',
      boxShadow: "4px 4px #a9a9a9"
    },
    childWaitingColor: {
      backgroundColor: deepOrange[400],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white',
      boxShadow: "4px 4px #a9a9a9"
    },
    classroomRoutinesColor: {
      backgroundColor: blue[300],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white',
      boxShadow: "4px 4px #a9a9a9"
    },
    bmiColor: {
      backgroundColor: red["A200"],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white',
      boxShadow: "4px 4px #a9a9a9"
    },
    otherColor: {
      backgroundColor: indigo["A200"],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white',
      boxShadow: "4px 4px #a9a9a9"
    }
  }
});

const themes = createMuiTheme({
  palette: {
    waitingColor: {
      backgroundColor: lightGreen[300],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white'
    },
    travelingColor: {
      backgroundColor: orange[400],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white'
    },
    childWaitingColor: {
      backgroundColor: deepOrange[400],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white'
    },
    classroomRoutinesColor: {
      backgroundColor: blue[300],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white'
    },
    bmiColor: {
      backgroundColor: red["A200"],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white'
    },
    otherColor: {
      backgroundColor: indigo["A200"],
      color: "#000",
      textColor: 'white',
      primaryTextColor: 'white'
    }
  },
  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: "white"
      },
      textColor: 'white',
      primaryTextColor: 'white'
    }
  }
});

const ViewEnum = {
  DATA: 1,
  QUESTIONS: 2,
  COACH_PREP: 3,
  ACTION_PLAN: 4,
  NOTES: 5
};

const LineQuestions = [
  {
    name: "TransitionPanel1A",
    title: "Line-up Process",
    text:
      "How do you like to transition children from " +
      "where they are in the classroom to the line-up area? Do you prefer to line them up individually or send them " +
      "in groups? Talk about the differences in those approaches. What are the effects on the children?"
  },
  {
    name: "TransitionPanel1B",
    title: "Child Engagement",
    text:
      "Talk about any types of learning activities " +
      "that have helped children transition during the line-up process. Are the children engaged during the activities? " +
      "What are some successes or challenges? How do you all decide on what transition activities to do with children?"
  },
  {
    name: "TransitionPanel1C",
    title: "Causes for Waiting",
    text:
      "Talk about what children do when they get in line. " +
      "Do they have designated spots on which to stand? Do certain children have more difficulty with the process? " +
      "Are there any challenges that come up when they are lining up?"
  }
];

const TravelingQuestions = [
  {
    name: "TransitionPanel2A",
    title: "Travel Destinations",
    text:
      "Let's think about the transitions you make " +
      "outside the classroom. What's outside of your control and what do you have some control over? (We have to walk " +
      "to the playground on the other side of the building, but we could get creative about ways to reduce time spent " +
      "on bathroom breaks in the hallway.)"
  },
  {
    name: "TransitionPanel2B",
    title: "Practice and Positive Reinforcement",
    text:
      "Talk about how you reinforce " +
      "children's successes during transitions? What's the most effective way you've found to keep encouraging them?"
  },
  {
    name: "TransitionPanel2C",
    title: "Revisiting Routines and Expectations",
    text:
      "Talk about some of the transitions " +
      "skills children may need to relearn or practice. What have you been noticing lately about their challenges during " +
      "transitions outside the classroom?"
  },
  {
    name: "TransitionPanel2D",
    title: "Individualized Support",
    text:
      "What are some strategies that help children " +
      "with challenging behavior during long transitions outside the classroom? What do children with challenging behavior " +
      "need to be successful? What motivate them at other times during the day?"
  },
  {
    name: "TransitionPanel2E",
    title: "Child Engagement",
    text:
      "How does the teacher engage children during walks to " +
      "other parts of the school building (e.g., pretending to walk like an animal)? Since you can't get around walking all " +
      "that way to the playground, talk about strategies you've used in the past to keep the children engaged. What works?"
  }
];

const WaitingQuestions = [
  {
    name: "TransitionPanel3A",
    title: "Preparation of Materials",
    text:
      "Talk about the best time of the " +
      "day that you've found for gathering materials for lessons and activities. Are there challenging times as well?"
  },
  {
    name: "TransitionPanel3B",
    title: "Teacher Teamwork",
    text:
      "How do you and your teaching assistant help each " +
      "other with lesson prep and organization? What systems seem to work best in your experience? If you could try " +
      "something new or change one of your routines around getting ready for a lesson, what would it be?"
  },
  {
    name: "TransitionPanel3C",
    title: "Child Engagement",
    text:
      "Talk about the times of the day that you feel the " +
      "most organized and prepared. What are the differences in children's behavior when you feel prepared? Talk about " +
      "the most chaotic or overwhelming times. Are there any tips you can take from those other parts of the day when you " +
      "feel more calm and prepared? Talk about some things you've been wanting to try during those overwhelming parts of the day."
  },
  {
    name: "TransitionPanel3D",
    title: "Classroom Organization",
    text:
      "Talk about how the classroom environment and " +
      "layout affect the flow of the day and children's waiting time. Where are materials for different activities stored " +
      "and how quickly or not can children access materials?"
  }
];

const RoutinesQuestions = [
  {
    name: "TransitionPanel4A",
    title: "Types of Routines",
    text:
      "Talk about all the different classroom routines " +
      "that happen each day. Which types are more challenging for children? Why might that be? (e.g., Do children do well " +
      "transitioning from morning meeting to centers but face obstacles cleaning up after centers and transitioning to the " +
      "read aloud?) Are there one or two classroom routines that have been on your mind or that you want to focus on? " +
      "On a perfect day, what might that routine look like?"
  },
  {
    name: "TransitionPanel4B",
    title: "Classroom Organization",
    text:
      "Let's talk about the relationship between " +
      "classroom environment/layout and children's transition time. Do you feel like children spend too much time cleaning " +
      "up materials? What helps them know where to put materials? How does the amount of materials affect clean-up time? " +
      "What visuals or other strategies help them during classroom routines?"
  },
  {
    name: "TransitionPanel4C",
    title: "Centers",
    text:
      "Let's talk about the routines and systems that  help children " +
      "choose centers and move between centers. What's going well this year? How are children doing with a) choosing their " +
      "first center, b) leaving one center and going to another one, c) sticking with an activity once they begin?"
  },
  {
    name: "TransitionPanel4D",
    title: "Teacher Teamwork",
    text:
      "Talk about how you and your teaching assistant work " +
      "together to make transitions go smoothly. Do you have designated roles for transition times throughout the day?"
  },
  {
    name: "TransitionPanel4E",
    title: "Number of Transitions",
    text:
      "If you could get rid of one transition, what would " +
      "it be? Is there a time of day when you feel like you're constantly reminding children where they should be? Let's look " +
      "at the daily schedule for any transitions that could be changed/removed."
  }
];

const BehaviorQuestions = [
  {
    name: "TransitionPanel5A",
    title: "Communicating Expectations",
    text:
      "Talk about the types of strategies " +
      "(verbal, visual, gesture) you like to use to communicate behavior expectations before, during, and/or after transitions? " +
      "Do children know where to go and what to do during a transition? How do they know?"
  },
  {
    name: "TransitionPanel5B",
    title: "Individualized Support",
    text:
      "Talk about children who might benefit from " +
      "individualized strategies to help them during transitions? What has worked in the past? What have you been thinking " +
      "about trying?"
  },
  {
    name: "TransitionPanel5C",
    title: "Teacher Teamwork",
    text:
      "Let's talk about how you and the paraprofessional/teaching " +
      "assistant work together to teach and reinforce behavior expectations during transitions. What has worked? " +
      "What felt less effective? How do you decide which member of the teaching team leads the different transitions " +
      "across the day?"
  },
  {
    name: "TransitionPanel5D",
    title: "Reinforcing Behaviors",
    text:
      "Talk about how you let children know when they " +
      "do a transition well. What are you looking for so that you can give them positive reinforcement? " +
      "How do you respond when they don't meet behavior expectations during transitions?"
  },
  {
    name: "TransitionPanel5E",
    title: "Consistency of Routines",
    text:
      "Talk about the challenges you and/or children " +
      "experience during transitions. Which part of the transition is the most challenging for children? Why might that be? " +
      "What have you been brainstorming in terms of strategies to help them? If you could improve one aspect of a " +
      "tricky transition, what would it be?"
  }
];

interface Props {
  location: { state: { teacher: { id: string }}},
  classes: Style
}

interface Style {
  root: string,
  resultsContent: string,
  buttonText: string,
  transitionTypeButton: string,
  tabBar: string,
  coachPrepCard: string
}

interface State {
  view: number,
  categoryView: string,
  sessionId: string,
  sessionDates: Array<string>,
  notes: Array<object>,
  sessionLine: number,
  sessionTraveling: number,
  sessionWaiting: number,
  sessionRoutines: number,
  sessionBehaviorManagement: number,
  sessionOther: number,
  trendsDates: Array<string>,
  trendsLine: Array<number>,
  trendsTraveling: Array<number>,
  trendsWaiting: Array<number>,
  trendsRoutines: Array<number>,
  trendsBehaviorManagement: Array<number>,
  trendsOther: Array<number>,
  trendsTotalColor: string,
  transitionTime: number,
  sessionTotal: number,
  learningActivityTime: number,
  tabValue: number,
  openPanel: string,
  addedToPrep: Array<string>,
  selectedQuestions: Array<string>
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
    // this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  state = {
    view: ViewEnum.DATA,
    categoryView: '',
    sessionId: "",
    sessionDates: [],
    notes: [],
    sessionLine: 0,
    sessionTraveling: 0,
    sessionWaiting: 0,
    sessionRoutines: 0,
    sessionBehaviorManagement: 0,
    sessionOther: 0,
    trendsDates: [],
    trendsLine: [],
    trendsTraveling: [],
    trendsWaiting:  [],
    trendsRoutines: [],
    trendsBehaviorManagement:  [],
    trendsOther: [],
    trendsTotal: [],
    trendsTotalColor: "#0988EC",
    // totalTime: null,
    transitionTime: 0,
    sessionTotal: 0,
    learningActivityTime: 0,
    tabValue: 0,
    openPanel: '',
    addedToPrep: [],
    selectedQuestions: []
  };

  /** lifecycle method invoked after component mounts */
  componentDidMount() {
    const teacherId = this.props.location.state.teacher.id;
    this.handleTrendsFetch(teacherId);

    this.handleDateFetching(this.props.location.state.teacher.id);
  }

  /**
   * @param {string} teacherId
   */
  handleTrendsFetch = (teacherId: string) => {
    const firebase = this.context;
    const dateArray: Array<string> = [];
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
        dateArray.push(
          moment(data.startDate.value).format("MMM Do"),
          formattedTime
        );
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
          backgroundColor: TransitionTypeColors.lineColor,
          borderColor: TransitionTypeColors.lineColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsLine,
        },
        {
          label: 'TRAVELING',
          backgroundColor: TransitionTypeColors.travelingColor,
          borderColor: TransitionTypeColors.travelingColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsTraveling,
        },
        {
          label: 'CHILD WAITING',
          backgroundColor: TransitionTypeColors.waitingColor,
          borderColor: TransitionTypeColors.waitingColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsWaiting,
        },
        {
          label: 'ROUTINES',
          backgroundColor: TransitionTypeColors.routinesColor,
          borderColor: TransitionTypeColors.routinesColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsRoutines,
        },
        {
          label: 'BEHAVIOR MANAGEMENT',
          backgroundColor: TransitionTypeColors.behaviorManagementColor,
          borderColor: TransitionTypeColors.behaviorManagementColor,
          fill: false,
          lineTension: 0,
          data: this.state.trendsBehaviorManagement,
        },
        {
          label: 'OTHER',
          backgroundColor: TransitionTypeColors.otherColor,
          borderColor: TransitionTypeColors.otherColor,
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

  dataClick = () => {
    if (this.state.view !== ViewEnum.DATA) {
      this.setState({ view: ViewEnum.DATA });
    }
  };

  questionsClick = () => {
    if (this.state.view !== ViewEnum.QUESTIONS) {
      this.setState({ view: ViewEnum.QUESTIONS });
    }
  };

  notesClick = () => {
    if (this.state.view !== ViewEnum.NOTES) {
      this.setState({ view: ViewEnum.NOTES });
    }
  };

  coachPrepClick = () => {
    if (this.state.view !== ViewEnum.COACH_PREP) {
      this.setState({ view: ViewEnum.COACH_PREP });
    }
  };

  actionPlanClick = () => {
    if (this.state.view !== ViewEnum.ACTION_PLAN) {
      this.setState({ view: ViewEnum.ACTION_PLAN });
    }
  };

  lineClick = () => {
    if (this.state.categoryView !== "line") {
      this.setState({
        categoryView: "line",
        openPanel: null
      })
    }
  }

  travelingClick = () => {
    if (this.state.categoryView !== "traveling") {
      this.setState({
        categoryView: "traveling",
        openPanel: null
      })
    }
  }

  childrenWaitingClick = () => {
    if (this.state.categoryView !== "childrenWaiting") {
      this.setState({
        categoryView: "childrenWaiting",
        openPanel: null
      })
    }
  }

  routinesClick = () => {
    if (this.state.categoryView !== "routines") {
      this.setState({
        categoryView: "routines",
        openPanel: null
      })
    }
  }

  behaviorClick = () => {
    if (this.state.categoryView !== "behavior") {
      this.setState({
        categoryView: "behavior",
        openPanel: null
      })
    }
  }

  /**
   * @param {string} teacherId
   */
  handleDateFetching = (teacherId: string) => {
    const firebase = this.context;
    firebase.fetchSessionDates(teacherId, "transition").then((dates: Array<string>) =>
      this.setState({
        sessionDates: dates
      })
    );
  };

  handleSummary = () => {
    if (this.state.tabValue !== 0) {
      this.setState({
        tabValue: 0
      })
    }
  };

  handleDetails = () => {
    if (this.state.tabValue !== 1) {
      this.setState({
        tabValue: 1
      })
    }
  };

  handleTrends = () => {
    if (this.state.tabValue !== 2) {
      this.setState({
        tabValue: 2
      })
    }
  };

  /**
   * @param {string} panel
   */
  handlePanelChange = (panel: string) => {
    if (this.state.openPanel === panel) {
      this.setState({ openPanel: '' });
    } else {
      this.setState({ openPanel: panel });
    }
  };

  /**
   * @param {string} panel
   */
  handleAddToPlan = (panel: string) => {
    if (!this.state.addedToPrep.includes(panel)) {
      this.setState({ addedToPrep: [...this.state.addedToPrep, panel] });
    }
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

      firebase.fetchTransitionTypeSummary(this.state.sessionId).then(type => {
        this.setState({
          sessionLine: Math.round(((type[0].line/type[0].total)*100)),
          sessionTraveling: Math.round(((type[0].traveling/type[0].total)*100)),
          sessionWaiting: Math.round(((type[0].waiting/type[0].total)*100)),
          sessionRoutines: Math.round(((type[0].routines/type[0].total)*100)),
          sessionBehaviorManagement: Math.round(((type[0].behaviorManagement/type[0].total)*100)),
          sessionOther: Math.round(((type[0].other/type[0].total)*100)),
          transitionTime: type[0].total
        })
      });
  })};

  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.exact({ state: PropTypes.exact({ teacher: PropTypes.exact({ id: PropTypes.string})})}).isRequired
  };

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {(firebase: object) => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <Grid container spacing={16} justify="center" direction="row" alignItems="center">
          <Grid item xs={3}>
            <Grid container 
              alignItems="center"
              justify="center"
              direction="column"
            >
              <ResultsDashboard
                magic8="Transition Time"
                view={this.state.view}
                dataClick={this.dataClick}
                questionsClick={this.questionsClick}
                coachPrepClick={this.coachPrepClick}
                actionPlanClick={this.actionPlanClick}
                notesClick={this.notesClick}
                viewEnum={ViewEnum}
                sessionId={this.state.sessionId}
                changeSessionId={this.changeSessionId}
                sessionDates={this.state.sessionDates}
              />
            </Grid>
          </Grid>
          <Grid container xs={8} justify="flex-start" direction="column" alignItems="center" style={{height: '90vh'}}>
            <div>
              {this.state.view === ViewEnum.DATA ? (
                <div className={classes.resultsContent} style={{width: '60vw'}}>
                  <Grid item>
                    <TabBar position="static" color="default" className={classes.tabBar}>
                      <Tabs
                        value={this.state.tabValue}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                      >
                        <Tab label="Summary" onClick={this.handleSummary} />
                        <Tab label="Details" onClick={this.handleDetails} />
                        <Tab label="Trends" onClick={this.handleTrends} />
                      </Tabs>
                    </TabBar>
                  </Grid>
                  <Grid item>
                    {this.state.tabValue === 0 ? (
                      <div>
                        {this.state.sessionId ? (
                          <div>
                            <Typography variant="h5" style={{padding: 15, textAlign: "center"}}>
                              Total Session Time: {Math.floor((this.state.sessionTotal/1000)/60)}m {Math.round((((this.state.sessionTotal/1000)/60) % 1) * 60) }s
                            </Typography>
                            <TransitionTimePie
                              transitionTime={this.state.transitionTime}
                              learningActivityTime={this.state.learningActivityTime}
                              style={{overflow:"hidden", width: '100%'}}
                            />
                          </div>
                        ) : (
                          <Typography variant="h5" style={{padding: 15, textAlign: "center"}}>
                            Please choose a date from the dropdown menu.
                          </Typography>
                        )}
                      </div>
                      ) : this.state.tabValue === 1 ? (
                      <div>
                        <Grid style={{alignItems: "center"}}>
                          {this.state.sessionId ? (
                            <div>
                              <Typography variant="h5" style={{padding: 15, textAlign: "center"}}>
                                Total Transition Time: {Math.floor((this.state.transitionTime/1000)/60)}m {Math.round((((this.state.transitionTime/1000)/60) % 1) * 60) }s
                              </Typography>
                              <TransitionBarChart
                                line={this.state.sessionLine}
                                traveling={this.state.sessionTraveling}
                                waiting={this.state.sessionWaiting}
                                routines={this.state.sessionRoutines}
                                behaviorManagement={this.state.sessionBehaviorManagement}
                                other={this.state.sessionOther}
                                style={{alignItems: "center", width: '100%', border: '20px solid blue'}}
                              />
                          </div>
                          ) : (
                            <Typography variant="h5" style={{padding: 15, textAlign: "center"}}>
                            Please choose a date from the dropdown menu.
                            </Typography>
                          )}
                        </Grid>
                      </div>
                    ) : (
                      <div>
                        <TransitionTrendsGraph
                          data={this.handleTrendsFormatData}
                          style={{overflow:"hidden", width: '100%', border: '20px solid blue'}}
                        />
                      </div>
                    )}
                  </Grid>
                </div>
              ) : this.state.view === ViewEnum.NOTES ? (
                <div className={classes.resultsContent}>
                  <Grid item>
                    <NotesListDetailTable
                      data={this.state.notes}
                      style={{overflow:"hidden", minWidth: '100%'}}
                    />
                  </Grid>
                </div>
              ) : this.state.view === ViewEnum.QUESTIONS ? (
                <div className={classes.resultsContent}>
                  <Grid container direction="column">
                    <Grid container direction="row" justify="center" alignItems="center">
                      <Typography variant="subtitle2">
                        In which type of transition did children spend the most amount of time?
                      </Typography>
                    </Grid>
                    <Grid container direction="row" justify="center" alignItems="center">
                      <Typography variant="subtitle2">
                        Select a transition type to view questions that will encourage reflection about teaching practices.
                      </Typography>
                    </Grid>
                    <Grid container direction="row" justify="space-around" alignItems="center" style={{marginTop: "1vh"}}>
                      <Grid item>
                        <Button 
                          style={this.state.categoryView === "line" ? raisedThemes.palette.waitingColor : themes.palette.waitingColor}
                          onClick={this.lineClick}
                        >
                          <img src={WaitingInLineImage} className={classes.transitionTypeButton}/>
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          style={this.state.categoryView === "traveling" ? raisedThemes.palette.travelingColor : themes.palette.travelingColor}
                          onClick={this.travelingClick}
                        >
                          <img src={WalkingImage} className={classes.transitionTypeButton}/>
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          style={this.state.categoryView === "childrenWaiting" ? raisedThemes.palette.childWaitingColor : themes.palette.childWaitingColor}
                          onClick={this.childrenWaitingClick}
                        >
                          <img src={ChildWaitingImage} className={classes.transitionTypeButton}/>
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          style={this.state.categoryView === "routines" ? raisedThemes.palette.classroomRoutinesColor : themes.palette.classroomRoutinesColor}
                          onClick={this.routinesClick}
                        >
                          <img src={ClassroomRoutinesImage} className={classes.transitionTypeButton}/>
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          style={this.state.categoryView === "behavior" ? raisedThemes.palette.bmiColor : themes.palette.bmiColor}
                          onClick={this.behaviorClick}
                        >
                          <img src={BMDImage} className={classes.transitionTypeButton}/>
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid container direction="row" justify="space-around" alignItems="center" style={{marginTop: ".5vh"}}>
                      <Grid
                        item xs={2}
                        className = {classes.buttonText}
                        style={{fontWeight: this.state.categoryView === "line" ? "bold" : "normal"}}
                      >
                        Waiting in Line
                      </Grid>
                      <Grid
                        item xs={2}
                        className = {classes.buttonText}
                        style={{fontWeight: this.state.categoryView === "traveling" ? "bold" : "normal"}}
                      >
                        Traveling
                      </Grid>
                      <Grid
                        item xs={2}
                        className = {classes.buttonText}
                        style={{fontWeight: this.state.categoryView === "childrenWaiting" ? "bold" : "normal"}}
                      >
                        Children Waiting
                      </Grid>
                      <Grid
                        item xs={2}
                        className = {classes.buttonText}
                        style={{fontWeight: this.state.categoryView === "routines" ? "bold" : "normal"}}
                      >
                        Classroom Routines
                      </Grid>
                      <Grid
                        item xs={2}
                        className = {classes.buttonText}
                        style={{fontWeight: this.state.categoryView === "behavior" ? "bold" : "normal"}}
                      >
                        Behavior Management
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container direction="column" style={{marginTop: "1vh"}}>
                    {this.state.categoryView === "line" ? (
                      <DataQuestions
                        questions={LineQuestions}
                        openPanel={this.state.openPanel}
                        handlePanelChange={this.handlePanelChange}
                        addedToPrep={this.state.addedToPrep}
                        handleAddToPlan={this.handleAddToPlan}
                      />
                    ) : this.state.categoryView === "traveling" ? (
                      <DataQuestions
                        questions={TravelingQuestions}
                        openPanel={this.state.openPanel}
                        handlePanelChange={this.handlePanelChange}
                        addedToPrep={this.state.addedToPrep}
                        handleAddToPlan={this.handleAddToPlan}
                      />
                    ) : this.state.categoryView === "childrenWaiting" ? (
                      <DataQuestions
                        questions={WaitingQuestions}
                        openPanel={this.state.openPanel}
                        handlePanelChange={this.handlePanelChange}
                        addedToPrep={this.state.addedToPrep}
                        handleAddToPlan={this.handleAddToPlan}
                      />
                    ) : this.state.categoryView === "routines" ? (
                      <DataQuestions
                        questions={RoutinesQuestions}
                        openPanel={this.state.openPanel}
                        handlePanelChange={this.handlePanelChange}
                        addedToPrep={this.state.addedToPrep}
                        handleAddToPlan={this.handleAddToPlan}
                      />
                    ) : this.state.categoryView === "behavior" ? (
                      <DataQuestions
                        questions={BehaviorQuestions}
                        openPanel={this.state.openPanel}
                        handlePanelChange={this.handlePanelChange}
                        addedToPrep={this.state.addedToPrep}
                        handleAddToPlan={this.handleAddToPlan}
                      />
                    ) : <div/>}
                  </Grid>
                </div>
              ) : this.state.view === ViewEnum.COACH_PREP ? (
                <div className={classes.resultsContent}>
                  <Grid>
                    <Card className={classes.coachPrepCard} style={{height: "30vh"}}>
                      <CardContent>
                        <Typography variant="h5">
                          Data Reflection
                        </Typography>
                        <TextField
                          placeholder="Choose questions from the Data-Driven Coaching tab of the Details section." 
                          fullWidth 
                          disabled
                        />
                        <TextField
                          placeholder="Or add your own questions here!"
                          fullWidth
                          multiline
                        />
                        {this.state.selectedQuestions.map((item, index) => (
                          <div key={index}>
                            <Typography
                              variant="h6"
                              style={{textDecoration: "underline"}}
                            >
                              {item.type}
                            </Typography>
                            <ol style={{marginTop: ".5vh", marginBottom: "1vh"}}>
                              {item.questions.map((question: string, i: number) => (
                                <li key={i}>
                                  <Typography
                                    variant="subtitle2"
                                  >
                                    {question}
                                  </Typography>
                                </li>
                              ))}
                            </ol>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                    <Card className={classes.coachPrepCard} style={{height: "20vh"}}>
                      <CardContent>
                        <Typography variant="h5">
                          Strengths-Based Feedback
                        </Typography>
                        <TextField
                          placeholder="Add your observations of positive things the teacher did."
                          fullWidth
                          multiline
                        />
                      </CardContent>
                    </Card>
                    <Card className={classes.coachPrepCard} style={{height: "20vh"}}>
                      <CardContent>
                        <Typography variant="h5">
                          Notes
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </div>
              ) : this.state.view === ViewEnum.ACTION_PLAN ? (
                <div className={classes.resultsContent} /> // replace this null with next steps content
              ) : null}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

TransitionResultsPage.contextType = FirebaseContext;
export default withStyles(styles)(TransitionResultsPage);
