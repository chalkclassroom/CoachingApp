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
import ActionPlanForm from './ActionPlanForm';
import ActionPlanModal from './ActionPlanModal';

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
  handleTrendsFetch(teacherId: string): void,
  magic8: string,
  observationType: string,
  summary: React.ReactNode,
  details: React.ReactNode,
  trendsGraph: React.ReactNode,
  changeSessionId: any,
  sessionId: string,
  questions: React.ReactNode,
  notes: Array<{timestamp: Date, content: string}>,
  teacherFirstName: string,
  teacherLastName: string,
  actionPlanExists: boolean
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
  // sessionId: string,
  view: number,
  tabValue: number,
  // notes: Array<object>,
  sessionDates: Array<string>,
  actionPlanEditMode: boolean,
  // actionPlanExists: boolean
  count: number
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
      // sessionId: '',
      view: ViewEnum.DATA,
      tabValue: 0,
      // notes: [],
      sessionDates: [],
      actionPlanEditMode: false,
      // actionPlanExists: false,
      count: 0
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

  handleEditActionPlan = (): void => {
    this.setState({
      actionPlanEditMode: true
    })
  }

  handleSaveAndCloseActionPlan = (): void => {
    this.setState({
      actionPlanEditMode: false
    })
  }

  /** lifecycle method invoked after component mounts */
  componentDidMount(): void {
    const firebase = this.context;
    this.handleDateFetching(this.props.teacherId);
    this.props.handleTrendsFetch(this.props.teacherId);
    /* const actionPlanExists = firebase.findActionPlan(this.props.sessionId);
    if (actionPlanExists) {
      this.setState({
        actionPlanExists: true
      }, () => {console.log('ap exists true')})
    } else {
      console.log('ap exists false')
    } */
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <div>
        <FirebaseContext.Consumer>
          {(firebase: object): React.ReactNode => <AppBar firebase={firebase} />}
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
                color="#0988ec"
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
                        <Tab label="Summary" onClick={this.handleSummary} style={{fontFamily: "Arimo", fontSize: '1em'}} />
                        <Tab label="Details" onClick={this.handleDetails} style={{fontFamily: "Arimo", fontSize: '1em'}} />
                        <Tab label="Trends" onClick={this.handleTrends} style={{fontFamily: "Arimo", fontSize: '1em'}} />
                      </Tabs>
                    </TabBar>
                  </Grid>
                  <Grid item>
                    {this.state.tabValue === 0 ? (
                      <div>
                        {this.props.sessionId ? (
                          <div>
                            {this.props.summary}
                          </div>
                        ) : (
                          <Typography variant="h5" style={{padding: 15, textAlign: "center", fontFamily: "Arimo"}}>
                            Please choose a date from the dropdown menu.
                          </Typography>
                        )}
                      </div>
                      ) : this.state.tabValue === 1 ? (
                      <div>
                        <Grid style={{alignItems: "center"}}>
                          {this.props.sessionId ? (
                            <div>
                              {this.props.details}
                          </div>
                          ) : (
                            <Typography variant="h5" style={{padding: 15, textAlign: "center", fontFamily: "Arimo"}}>
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
                      data={this.props.notes}
                      magic8={this.props.magic8}
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
                          Reflection Questions
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
                <div className={classes.resultsContent} >
                  {this.props.sessionId ? (
                    <div>
                      <FirebaseContext.Consumer>
                        {(firebase: object) => <ActionPlanForm 
                          firebase={firebase}
                          teacherFirstName={this.props.teacherFirstName}
                          teacherLastName={this.props.teacherLastName}
                          teacherId={this.props.teacherId}
                          sessionId={this.props.sessionId}
                          handleEditActionPlan={this.handleEditActionPlan}
                          handleClose={null}
                          readOnly={true}
                          actionPlanExists={this.props.actionPlanExists}
                          editMode={this.state.actionPlanEditMode}
                        />}
                      </FirebaseContext.Consumer>
                      {this.state.actionPlanEditMode ? (
                        <FirebaseContext.Consumer>
                          {(firebase: object) => <ActionPlanModal 
                            firebase={firebase}
                            teacherFirstName={this.props.teacherFirstName}
                            teacherLastName={this.props.teacherLastName}
                            teacherId={this.props.teacherId}
                            sessionId={this.props.sessionId}
                            handleClose={this.handleSaveAndCloseActionPlan}
                            actionPlanExists={true}
                          />}
                        </FirebaseContext.Consumer>
                      ) : ( <div /> )}
                    </div>
                  ) : (
                    <Typography variant="h5" style={{padding: 15, textAlign: "center", fontFamily: "Arimo"}}>
                      Please choose a date from the dropdown menu.
                    </Typography>
                  )}

                  {/* {this.props.sessionId? (
                    <FirebaseContext.Consumer>
                      {(firebase: object) => <ActionPlanForm 
                        firebase={firebase}
                        teacherFirstName={this.props.teacherFirstName}
                        teacherLastName={this.props.teacherLastName}
                        teacherId={this.props.teacherId}
                        sessionId={this.props.sessionId}
                        handleEditActionPlan={this.handleEditActionPlan}
                        // handleSaveAndClose={this.handleSaveAndCloseActionPlan}
                        handleClose={null}
                        disabled={true}
                        actionPlanExists={this.props.actionPlanExists}
                      />}
                    </FirebaseContext.Consumer>
                    this.state.actionPlanEditMode ? (
                      <FirebaseContext.Consumer>
                        {(firebase: object) => <ActionPlanModal 
                          firebase={firebase}
                          teacherFirstName={this.props.teacherFirstName}
                          teacherLastName={this.props.teacherLastName}
                          teacherId={this.props.teacherId}
                          sessionId={this.props.sessionId}
                          handleEditActionPlan={this.handleEditActionPlan}
                          // handleSaveAndClose={this.handleSaveAndCloseActionPlan}
                          disabled={false}
                          actionPlanExists={this.props.actionPlanExists}
                        />}
                      </FirebaseContext.Consumer>
                  ) : ( <div /> )
                  } else {
                    <Typography variant="h5" style={{padding: 15, textAlign: "center", fontFamily: "Arimo"}}>
                      Please choose a date from the dropdown menu.
                    </Typography>
                  }})} */}
                  {/* /*{this.props.sessionId ? (
                     <FirebaseContext.Consumer>
                      {(firebase: object) => <ActionPlanForm
                        teacherFirstName={this.props.teacherFirstName}
                        teacherLastName={this.props.teacherLastName}
                        teacherId={this.props.teacherId}
                        sessionId={this.props.sessionId}
                        firebase={firebase}
                      />}
                    </FirebaseContext.Consumer> 
                    this.props.actionPlanExists? (
                     true ? (  
                      this.state.actionPlanEditMode ? (
                        <FirebaseContext.Consumer>
                          {(firebase: object) => <ActionPlanModal 
                            firebase={firebase}
                            teacherFirstName={this.props.teacherFirstName}
                            teacherLastName={this.props.teacherLastName}
                            teacherId={this.props.teacherId}
                            sessionId={this.props.sessionId}
                            handleEditActionPlan={this.handleEditActionPlan}
                            // handleSaveAndClose={this.handleSaveAndCloseActionPlan}
                            disabled={false}
                            actionPlanExists={this.props.actionPlanExists}
                          />}
                        </FirebaseContext.Consumer>
                      ) : (
                        <FirebaseContext.Consumer>
                          {(firebase: object) => <ActionPlanForm 
                            firebase={firebase}
                            teacherFirstName={this.props.teacherFirstName}
                            teacherLastName={this.props.teacherLastName}
                            teacherId={this.props.teacherId}
                            sessionId={this.props.sessionId}
                            handleEditActionPlan={this.handleEditActionPlan}
                            // handleSaveAndClose={this.handleSaveAndCloseActionPlan}
                            handleClose={null}
                            disabled={true}
                            actionPlanExists={this.props.actionPlanExists}
                          />}
                        </FirebaseContext.Consumer>
                      )
                    ) : (
                      <Button>
                        create action plan
                      </Button>
                    )
                  ) : (
                    <Typography variant="h5" style={{padding: 15, textAlign: "center", fontFamily: "Arimo"}}>
                      Please choose a date from the dropdown menu.
                    </Typography>
                  )} */}
                </div>
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