import * as React from 'react';
import * as PropTypes from "prop-types";
import FirebaseContext from "./Firebase/FirebaseContext";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "./AppBar";
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography/Typography";
import NotesListDetailTable from "./ResultsComponents/NotesListDetailTable";
import "chartjs-plugin-datalabels";
import ResultsDashboard from './ResultsDashboard';

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

const ViewEnum = {
  DATA: 1,
  QUESTIONS: 2,
  COACH_PREP: 3,
  ACTION_PLAN: 4,
  NOTES: 5
};

interface Props {
  // location: { state: { teacher: { id: string }}},
  teacherId: string,
  classes: Style,
  handleTrendsFetch: any,
  magic8: string,
  observationType: string,
  summaryGraph: React.ReactNode,
  detailsGraph: React.ReactNode,
  trendsGraph: React.ReactNode,
  changeSessionId: any,
  sessionId: string,
  questions: React.ReactNode
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
  sessionId: string,
  view: number,
  tabValue: number,
  notes: Array<object>,
  sessionDates: Array<string>,
}

/**
 * layout for results pages
 * @class ResultsLayout
 */
class ResultsLayout extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props){
    super(props);

    this.state = {
      //sessionId: '',
      view: ViewEnum.DATA,
      tabValue: 0,
      notes: [],
      sessionDates: [],
    }
  }

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
   * @param {string} teacherId
   */
  handleDateFetching = (teacherId: string) => {
    const firebase = this.context;
    firebase.fetchSessionDates(teacherId, this.props.observationType).then((dates: Array<string>) =>
      this.setState({
        sessionDates: dates
      })
    );
    console.log('date fetching was called');
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
  // changeSessionId = (event) => {
  //   this.setState({
  //     sessionId: event.target.value,
  //   }, () => {
  //     this.handleNotesFetching(this.state.sessionId);
  //     const firebase = this.context;

      // this.props.firebase.fetchSummary();
      // this.props.firebase.fetchDetails();

      /* firebase.fetchTransitionSummary(this.state.sessionId).then(summary=>{
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
      }); */
  //})};

  /** lifecycle method invoked after component mounts */
  componentDidMount() {
    // const teacherId = this.props.location.state.teacher.id;
    // this.props.handleTrendsFetch(teacherId);
    this.handleDateFetching(this.props.teacherId);
    this.props.handleTrendsFetch(this.props.teacherId);
  }

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    const { classes } = this.props;
    return (
      <div>
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
                magic8={this.props.magic8}
                view={this.state.view}
                dataClick={this.dataClick}
                questionsClick={this.questionsClick}
                coachPrepClick={this.coachPrepClick}
                actionPlanClick={this.actionPlanClick}
                notesClick={this.notesClick}
                viewEnum={ViewEnum}
                sessionId={this.props.sessionId}
                changeSessionId={this.props.changeSessionId}
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
                        {this.props.sessionId ? (
                          <div>
                            {this.props.summaryGraph}
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
                          {this.props.sessionId ? (
                            <div>
                              {this.props.detailsGraph}
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
                        {this.props.trendsGraph}
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
                    {this.props.questions}
                  </Grid>
                </div>
              ) : this.state.view === ViewEnum.COACH_PREP ? (
                <div className={classes.resultsContent}>
                  {/* <Grid>
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
                  </Grid> */}
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

ResultsLayout.contextType = FirebaseContext;
export default withStyles(styles)(ResultsLayout);