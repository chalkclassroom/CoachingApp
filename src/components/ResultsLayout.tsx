import * as React from 'react';
import * as PropTypes from "prop-types";
import FirebaseContext from "./Firebase/FirebaseContext";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "./AppBar";
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button/Button";
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabBar from "@material-ui/core/AppBar";
import "chartjs-plugin-datalabels";
import ResultsDashboard from './ResultsDashboard';
import ActionPlanForm from './ActionPlanForm';
import ConferencePlanForm from './ConferencePlanForm';
import CHALKLogoGIF from '../assets/images/CHALKLogoGIF.gif';
import * as Types from '../constants/Types';

const styles: object = {
  root: {
    flexGrow: 1,
    height: "100vh",
    flexDirection: "column"
  },
  resultsContent: {
    position: "relative",
    width: '70vw',
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
  backButton: {
    marginTop: '0.5em',
    marginBottom: '0.5em',
    color: '#333333',
    borderRadius: 3,
    textTransform: 'none'
  },
};

interface Props {
  teacher: Types.Teacher,
  classes: Style,
  magic8: string,
  summary: React.ReactNode,
  details: React.ReactNode,
  trendsGraph: React.ReactNode,
  changeSessionId(event: React.SyntheticEvent): void,
  sessionId: string,
  sessionDates: Array<{id: string, sessionStart: {value: string}}>,
  questions: React.ReactNode,
  chosenQuestions: Array<string>,
  notes: Array<{id: string, content: string, timestamp: string}>,
  actionPlanExists: boolean,
  conferencePlanId: string,
  addNoteToPlan(conferencePlanId: string, note: string): void,
  conferencePlanExists: boolean,
  history: {
    replace(
      param: {
        pathname: string,
        state: {
          type: string
        }
      }
    ): void
  }
}

interface Style {
  root: string,
  resultsContent: string,
  buttonText: string,
  transitionTypeButton: string,
  tabBar: string,
  coachPrepCard: string,
  backButton: string
}

interface State {
  view: string,
  tabValue: number,
  actionPlanEditMode: boolean,
  conferencePlanEditMode: boolean,
  count: number,
  notesModal: boolean
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
      view: 'data',
      tabValue: 0,
      actionPlanEditMode: false,
      conferencePlanEditMode: false,
      count: 0,
      notesModal: false
    }
  }

  /**
   * @param {string} name
   */
  viewClick = (name: string): void => {
    if (this.state.view !== name) {
      this.setState({ view: name })
    }
  }

  handleSummary = (): void => {
    if (this.state.tabValue !== 0) {
      this.setState({
        tabValue: 0
      })
    }
  };

  handleDetails = (): void => {
    if (this.state.tabValue !== 1) {
      this.setState({
        tabValue: 1
      })
    }
  };

  handleTrends = (): void => {
    if (this.state.tabValue !== 2) {
      this.setState({
        tabValue: 2
      })
    }
  };

  handleOpenNotes = (): void => {
    this.setState({ notesModal: true })
  }

  handleCloseNotes = (): void => {
    this.setState({ notesModal: false })
  }

  static propTypes = {
    teacher: PropTypes.exact({
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      id: PropTypes.string,
      phone: PropTypes.string,
      role: PropTypes.string,
      school: PropTypes.string,
      notes: PropTypes.string
    }).isRequired,
    classes: PropTypes.object.isRequired,
    magic8: PropTypes.string.isRequired,
    summary: PropTypes.elementType.isRequired,
    details: PropTypes.elementType.isRequired,
    trendsGraph: PropTypes.elementType.isRequired,
    changeSessionId: PropTypes.func.isRequired,
    sessionId: PropTypes.string.isRequired,
    sessionDates: PropTypes.array.isRequired,
    questions: PropTypes.elementType.isRequired,
    chosenQuestions: PropTypes.array.isRequired,
    notes: PropTypes.array.isRequired,
    actionPlanExists: PropTypes.bool.isRequired,
    conferencePlanId: PropTypes.string.isRequired,
    addNoteToPlan: PropTypes.func.isRequired,
    conferencePlanExists: PropTypes.bool.isRequired,
    history: PropTypes.exact({
      replace: PropTypes.func
    }).isRequired
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
          {(firebase: object): React.ReactNode => <AppBar {...firebase} />}
        </FirebaseContext.Consumer>
        <Grid container justify="flex-start" direction="row" alignItems="flex-start">
          <Grid item xs={3} style={{alignSelf: 'flex-start', paddingTop: '0.5em'}}>
            <Grid container
              alignItems="center"
              justify="center"
              direction="column"
            >
              <Grid item>
                <Button variant="contained" size="medium" className={classes.backButton}
                  onClick={(): void => {
                    this.props.history.replace({
                      pathname: "/Magic8Menu",
                      state: {
                        type: "Results"
                      }
                    })
                  }}>
                  <ChevronLeftRoundedIcon />
                  <b>Back</b>
                </Button>
              </Grid>
              <Grid item>
                <ResultsDashboard
                  magic8={this.props.magic8}
                  view={this.state.view}
                  viewClick = {this.viewClick}
                  sessionId={this.props.sessionId}
                  conferencePlanId={this.props.conferencePlanId}
                  addNoteToPlan={this.props.addNoteToPlan}
                  changeSessionId={this.props.changeSessionId}
                  sessionDates={this.props.sessionDates}
                  notes={this.props.notes}
                  handleOpenNotes={this.handleOpenNotes}
                  handleCloseNotes={this.handleCloseNotes}
                  notesModal={this.state.notesModal}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container xs={9} justify="flex-start" direction="column" alignItems="center" style={{height: '75vh'}}>
            <div>
              {this.state.view === 'data' ? (
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
                          <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                          >
                            <img src={CHALKLogoGIF} alt="Loading" width="100%" />
                          </Grid>
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
                            <Grid
                              container
                              direction="row"
                              justify="center"
                              alignItems="center"
                            >
                              <img src={CHALKLogoGIF} alt="Loading" width="100%" />
                            </Grid>
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
              ) : this.state.view === 'questions' ? (
                <div className={classes.resultsContent}>
                  <Grid container direction="column">
                    {this.props.questions}
                  </Grid>
                </div>
              ) : this.state.view === 'conferencePlan' ? (
                <div className={classes.resultsContent}>
                  {this.props.sessionId ? (
                    <div>
                      <FirebaseContext.Consumer>
                        {(firebase: {
                          createConferencePlan(teacherId: string, sessionId: string, magic8: string): Promise<void>,
                          getConferencePlan(sessionId: string):
                            Promise<Array<{
                              id: string,
                              feedback: Array<string>,
                              questions: Array<string>,
                              addedQuestions: Array<string>,
                              notes: Array<string>,
                              date: {seconds: number, nanoseconds: number}}>>,
                          saveConferencePlan(conferencePlanId: string, feedback: Array<string>, questions: Array<string>, addedQuestions: Array<string>, notes: Array<string>): Promise<void>,
                          getCoachFirstName(): Promise<string>,
                          getCoachLastName(): Promise<string>
                        }): React.ReactNode => 
                          <ConferencePlanForm 
                            conferencePlanExists={this.props.conferencePlanExists}
                            editMode={this.state.conferencePlanEditMode}
                            firebase={firebase}
                            teacher={this.props.teacher}
                            chosenQuestions={this.props.chosenQuestions}
                            readOnly={false}
                            sessionId={this.props.sessionId}
                            magic8={this.props.magic8}
                            notesModal={this.state.notesModal}
                          />
                        }
                      </FirebaseContext.Consumer>
                    </div>
                  ) : (
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <img src={CHALKLogoGIF} alt="Loading" width="100%" />
                    </Grid>
                  )}
                </div>
              ) : this.state.view === 'actionPlan' ? (
                <div className={classes.resultsContent} >
                  {this.props.sessionId ? (
                    <div>
                      <FirebaseContext.Consumer>
                        {(firebase: {
                          createActionPlan(teacherId: string, magic8: string): Promise<void>,
                          getAPInfo(actionPlanId: string): Promise<{
                            sessionId: string,
                            goal: string,
                            goalTimeline: string,
                            benefit: string,
                            dateModified: {seconds: number, nanoseconds: number},
                            dateCreated: {seconds: number, nanoseconds: number},
                            coach: string,
                            teacher: string,
                            tool: string
                          }>,
                          getTeacherActionPlans(practice: string, teacherId: string): Promise<Array<{
                            id: string,
                            date: {seconds: number, nanoseconds: number},
                            newDate: Date
                          }>>,
                          getActionSteps(actionPlanId: string): Promise<Array<{
                            step: string,
                            materials: string,
                            person: string,
                            timeline: string
                          }>>,
                          saveActionPlan(
                            actionPlanId: string,
                            goal: string,
                            goalTimeline: string,
                            benefit: string
                          ): Promise<void>,
                          saveActionStep(
                            actionPlanId: string,
                            index: string,
                            step: string,
                            materials: string,
                            person: string,
                            timeline: string
                          ): Promise<void>,
                          createActionStep(actionPlanId: string, index: string): Promise<void>,
                          getCoachFirstName(): Promise<string>,
                          getCoachLastName(): Promise<string>
                        }): React.ReactNode => <ActionPlanForm
                          firebase={firebase}
                          teacher={this.props.teacher}
                          sessionId={this.props.sessionId}
                          readOnly={false}
                          actionPlanExists={this.props.actionPlanExists}
                          editMode={this.state.actionPlanEditMode}
                          magic8={this.props.magic8}
                        />}
                      </FirebaseContext.Consumer>
                    </div>
                  ) : (
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <img src={CHALKLogoGIF} alt="Loading" width="100%" />
                    </Grid>
                  )}
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