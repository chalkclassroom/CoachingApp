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
import Typography from "@material-ui/core/Typography/Typography";
import "chartjs-plugin-datalabels";
import ResultsDashboard from './ResultsDashboard';
import ActionPlanForm from './ActionPlanForm';
import ActionPlanModal from './ActionPlanModal';
import ConferencePlanForm from './ConferencePlanForm';
import ConferencePlanModal from './ConferencePlanModal';
import CHALKLogoGIF from '../assets/images/CHALKLogoGIF.gif';

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
  teacher: Teacher,
  classes: Style,
  magic8: string,
  summary: React.ReactNode,
  details: React.ReactNode,
  trendsGraph: React.ReactNode,
  changeSessionId: any,
  sessionId: string,
  sessionDates: Array<any>,
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

  /* handleEditConferencePlan = (): void => {
    this.setState({
      conferencePlanEditMode: true
    })
  } */

  /* handleSaveAndCloseConferencePlan = (): void => {
    this.setState({
      conferencePlanEditMode: false
    })
  } */

  handleOpenNotes = () => {
    this.setState({ notesModal: true })
  }

  handleCloseNotes = () => {
    this.setState({ notesModal: false })
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
                <FirebaseContext.Consumer>
                  {(firebase: object): React.ReactNode => <ResultsDashboard
                    firebase={firebase}
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
                  />}
                </FirebaseContext.Consumer>
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
                        {(firebase: object): React.ReactNode => 
                          <ConferencePlanForm 
                            conferencePlanExists={this.props.conferencePlanExists}
                            editMode={this.state.conferencePlanEditMode}
                            firebase={firebase}
                            teacher={this.props.teacher}
                            chosenQuestions={this.props.chosenQuestions}
                            // handleEditConferencePlan={this.handleEditConferencePlan}
                            readOnly={false}
                            sessionId={this.props.sessionId}
                            magic8={this.props.magic8}
                            notesModal={this.state.notesModal}
                          />
                        }
                      </FirebaseContext.Consumer>
                        {/* {this.state.conferencePlanEditMode ? (
                          <FirebaseContext.Consumer>
                            {(firebase: object): React.ReactNode => <ConferencePlanModal 
                              firebase={firebase}
                              teacher={this.props.teacher}
                              sessionId={this.props.sessionId}
                              handleClose={this.handleSaveAndCloseConferencePlan}
                              conferencePlanExists={true}
                            />}
                          </FirebaseContext.Consumer>
                        ) : ( <div /> )} */}
                      </div>
                  ) : (
                    <Typography variant="h5" style={{padding: 15, textAlign: "center", fontFamily: "Arimo"}}>
                      Please choose a date from the dropdown menu.
                    </Typography>
                  )}
                </div>
              ) : this.state.view === 'actionPlan' ? (
                <div className={classes.resultsContent} >
                  {this.props.sessionId ? (
                    <div>
                      <FirebaseContext.Consumer>
                        {(firebase: object): React.ReactNode => <ActionPlanForm 
                          firebase={firebase}
                          teacher={this.props.teacher}
                          sessionId={this.props.sessionId}
                          handleEditActionPlan={this.handleEditActionPlan}
                          handleClose={null}
                          readOnly={true}
                          actionPlanExists={this.props.actionPlanExists}
                          editMode={this.state.actionPlanEditMode}
                          magic8={this.props.magic8}
                        />}
                      </FirebaseContext.Consumer>
                      {this.state.actionPlanEditMode ? (
                        <FirebaseContext.Consumer>
                          {(firebase: object): React.ReactNode => <ActionPlanModal 
                            firebase={firebase}
                            teacher={this.props.teacher}
                            sessionId={this.props.sessionId}
                            handleClose={this.handleSaveAndCloseActionPlan}
                            actionPlanExists={true}
                            magic8={this.props.magic8}
                          />}
                        </FirebaseContext.Consumer>
                      ) : ( <div /> )}
                    </div>
                  ) : (
                    <Typography variant="h5" style={{padding: 15, textAlign: "center", fontFamily: "Arimo"}}>
                      Please choose a date from the dropdown menu.
                    </Typography>
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