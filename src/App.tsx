import { hot } from 'react-hot-loader/root';
import * as React from "react";
import * as PropTypes from 'prop-types';
import "./App.css";
import WelcomePage from "./views/WelcomeViews/WelcomePage";
import ClassroomClimatePage from "./views/protected/ClassroomClimateViews/ClassroomClimatePage";
import ClassroomClimateResultsPage from "./views/protected/ClassroomClimateViews/ClassroomClimateResultsPage";
import LevelOfInstructionResultsPage from "./views/protected/LevelOfInstructionViews/LevelOfInstructionResultsPage";
import Magic8MenuPage from "./views/protected/Magic8MenuPage";
import TransitionResultsPage from "./views/protected/TransitionViews/TransitionResultsPage";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import TransitionTimePage from "./views/protected/TransitionViews/TransitionTimePage";
import ForgotPasswordPage from "./views/ForgotPasswordViews/ForgotPasswordPage";
import HomePage from "./views/protected/HomeViews/HomePage";
import TeacherListPage from "./views/protected/MyTeachers/TeacherListPage";
import ActionPlanListPage from "./views/protected/ActionPlanViews/ActionPlanListPage";
import ActionPlanView from './views/protected/ActionPlanViews/ActionPlanView';
import ConferencePlanListPage from './views/protected/ConferencePlanViews/ConferencePlanListPage';
import ConferencePlanView from './views/protected/ConferencePlanViews/ConferencePlanView';
import blue from "@material-ui/core/colors/blue";
import amber from "@material-ui/core/colors/amber";
import {
  createMuiTheme,
  MuiThemeProvider,
  Theme
} from "@material-ui/core/styles";
import LevelOfInstructionTrainingPage from "./views/protected/LevelOfInstructionViews/LevelOfInstructionTrainingPage";
import LevelOfInstructionPage from "./views/protected/LevelOfInstructionViews/LevelOfInstructionPage";
import MathInstructionTrainingPage from "./views/protected/MathInstructionViews/MathInstructionTrainingPage";
import AssociativeCooperativeInteractionsPage from "./views/protected/AssociativeCooperativeViews/AssociativeCooperativeInteractionsPage";
import AssociativeCooperativeInteractionsResultsPage from "./views/protected/AssociativeCooperativeViews/AssociativeCooperativeInteractionsResultsPage";
import SequentialActivitiesPage from "./views/protected/SequentialActivitiesViews/SequentialActivitiesPage";
import SequentialActivitiesResultsPage from "./views/protected/SequentialActivitiesViews/SequentialActivitiesResultsPage";
import AssociativeCooperativeInteractionsTrainingPage from "./views/protected/AssociativeCooperativeViews/AssociativeCooperativeInteractionsTrainingPage";
import ClassroomClimateTrainingPage from "./views/protected/ClassroomClimateViews/ClassroomClimateTrainingPage";
import SequentialActivitiesTrainingPage from "./views/protected/SequentialActivitiesViews/SequentialActivitiesTrainingPage";
import StudentEngagementPage from "./views/protected/StudentEngagementViews/StudentEngagementPage";
import StudentEngagementResultsPage from "./views/protected/StudentEngagementViews/StudentEngagementResultsPage";
import TransitionTimeTrainingPage from "./views/protected/TransitionViews/TransitionTimeTrainingPage";
import MathInstructionPage from "./views/protected/MathInstructionViews/MathInstructionPage";
import MathInstructionResultsPage from "./views/protected/MathInstructionViews/MathInstructionResultsPage";
import ListeningToChildrenPage from './views/protected/ListeningViews/ListeningToChildrenPage';
import ListeningToChildrenResultsPage from './views/protected/ListeningViews/ListeningToChildrenResultsPage';
import ListeningToChildrenTrainingPage from './views/protected/ListeningViews/ListeningToChildrenTrainingPage';
import LiteracyTrainingPage from './views/protected/LiteracyViews/LiteracyTrainingPage';
import LiteracyInstructionPage from './views/protected/LiteracyViews/LiteracyInstructionPage';
import LiteracyInstructionResultsPage from './views/protected/LiteracyViews/LiteracyInstructionResultsPage';
import AdminPage from './views/protected/AdminViews/AdminPage';
import TeamPage from "./views/WelcomeViews/TeamPage";
import TeacherDetailPage from "./views/protected/MyTeachers/TeacherDetailPage";
import TrainingPage from './views/protected/TrainingPage';
import * as LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import * as ReactGA from 'react-ga';
import CHALKLogoGIF from './assets/images/CHALKLogoGIF.gif';
import Grid from '@material-ui/core/Grid';
import { getCoach } from './state/actions/coach';
import { getUnlocked } from './state/actions/unlocked';
import { connect } from 'react-redux';
import StudentEngagementTrainingPage from "./views/protected/StudentEngagementViews/StudentEngagementTrainingPage";
import * as H from 'history';


ReactGA.initialize('UA-154034655-1');
ReactGA.pageview(window.location.pathname + window.location.search);

LogRocket.init('akprci/cqref');
setupLogRocketReact(LogRocket);

const styles: Theme = createMuiTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
      // textColor: "#fff",
      contrastText: "#fff"
    },
    secondary: {
      light: amber[300],
      main: amber[500],
      dark: amber[700],
      contrastText: "#000"
    }
  }
});

/**
 *
 * @return {ReactElement}
 */
function PrivateRoute({ auth, ...rest }): React.ReactElement {
  return (
    auth === true ? (
      <Route
        exact
        {...rest}
      />
    ) : (
      <Route
        {...rest}
        render={(props): React.ReactNode => {
          return (
            <Redirect to={{ pathname: '/', state: {from: props.location}}} />
          )
        }}
      />
    )
  )
}

PrivateRoute.propTypes = {
  auth: PropTypes.bool.isRequired,
  location: PropTypes.object
}

interface Props {
  firebase: {
    auth: {
      onAuthStateChanged(arg: any): firebase.User | null
    },
    getCoachFirstName(): Promise<string>,
    getUserRole(): Promise<string>,
    getUnlockedSections(): Promise<Array<number>>
  },
  getCoach(name: string, role: string): void,
  getUnlocked(unlocked: Array<number>): void
}

interface State {
  auth: boolean,
  loading: boolean
}

/**
 * @class App
 */
class App extends React.Component<Props, State> {
  removeListener: any;

  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      auth: false,
      loading: true
    };
  }

  /** invoked after component mounts */
  componentDidMount(): void {
    this.removeListener = this.props.firebase.auth.onAuthStateChanged((user: firebase.User) => {
      if (user) {
        this.props.firebase.getCoachFirstName().then((name: string) => {
          this.props.firebase.getUserRole().then((role: string) => {
            this.props.getCoach(name, role);
            this.setState({
              auth: true,
              loading: false
            });
          })

        });
        this.props.firebase.getUnlockedSections().then((unlocked: Array<number>) => {
          this.props.getUnlocked(unlocked);
        })
      } else {
        this.setState({
          auth: false,
          loading: false
        });
      }
    });
  }

  /** lifecycle method invoked just before component is unmounted */
  componentWillUnmount(): void {
    this.removeListener();
  }

  static propTypes = {
    firebase: PropTypes.exact({
      auth: PropTypes.exact({
        onAuthStateChanged: PropTypes.func
      }),
      getCoachFirstName: PropTypes.func,
      getUnlockedSections: PropTypes.func
    }).isRequired,
    getCoach: PropTypes.func.isRequired,
    getUnlocked: PropTypes.func.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    return this.state.loading === true ? (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{height: "100vh"}}
      >
        <img src={CHALKLogoGIF} alt="Loading" width="80%" />
      </Grid>
    ) : (
      <BrowserRouter>
        <MuiThemeProvider theme={styles}>
          <Switch>
            <Route
              exact
              path="/"
              render={(props): React.ReactElement =>
                this.state.auth === true ? (
                  <Redirect to={{ pathname: '/Home', state: { from: props.location } }} />
                ) : (
                  <WelcomePage />
                )
              }
            />
            <Route exact path="/forgot" component={ForgotPasswordPage} />
            <PrivateRoute
              auth={this.state.auth}
              path="/Landing"
              render={(props: object) : React.ReactElement=> <WelcomePage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/Invite"
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <HomePage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/Account"
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <HomePage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/Home"
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <HomePage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth || !this.state.auth}
              path="/team"
              render={(props: object) : React.ReactElement=> <TeamPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth || !this.state.auth}
              path="/Training"
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <TrainingPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/ActionPlans"
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <ActionPlanListPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/ActionPlan"
              render={(props: {
                history: H.History,
                actionPlanId: string,
                location: H.Location,
                classes: {
                  backButton: string
                }
              }) : React.ReactElement=> <ActionPlanView {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/ConferencePlans"
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <ConferencePlanListPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/ConferencePlan"
              render={(props: {
                history: H.History,
                location: H.Location,
                classes: {
                  backButton: string
                }
              }) : React.ReactElement=> <ConferencePlanView {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/TransitionTime"
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <TransitionTimePage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/LevelOfInstruction"
              render={(props: {
                history: H.History,
                classes: object
              }) : React.ReactElement=> <LevelOfInstructionPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/ClassroomClimate"
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <ClassroomClimatePage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/ListeningToChildren"
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <ListeningToChildrenPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/ListeningToChildrenResults"
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <ListeningToChildrenResultsPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/ListeningToChildrenTraining"
              render={(props: object) : React.ReactElement=> <ListeningToChildrenTrainingPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/AssociativeCooperativeInteractions"
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <AssociativeCooperativeInteractionsPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/AssociativeCooperativeInteractionsResults"
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <AssociativeCooperativeInteractionsResultsPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/MathInstruction"
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <MathInstructionPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/MathInstructionResults"
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <MathInstructionResultsPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/SequentialActivities"
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <SequentialActivitiesPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/MathInstructionTraining"
              render={(props: object) : React.ReactElement=> <MathInstructionTrainingPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/SequentialActivitiesResults"
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <SequentialActivitiesResultsPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/AssociativeCooperativeInteractionsTraining"
              render={(props: object) : React.ReactElement=> <AssociativeCooperativeInteractionsTrainingPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/LevelOfInstructionTraining"
              render={(props: object) : React.ReactElement=> <LevelOfInstructionTrainingPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/ClassroomClimateTraining"
              render={(props: object) : React.ReactElement=> <ClassroomClimateTrainingPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/SequentialActivitiesTraining"
              render={(props: object) : React.ReactElement=> <SequentialActivitiesTrainingPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/TransitionTimeTraining"
              render={(props: object) : React.ReactElement=> <TransitionTimeTrainingPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/LiteracyInstructionTraining"
              render={() : React.ReactElement=> <LiteracyTrainingPage />}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/LiteracyInstruction"
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <LiteracyInstructionPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/LiteracyInstructionResults"
              render={(props: {
                history: H.History
              }) : React.ReactElement=> <LiteracyInstructionResultsPage {...props}/>}
            />
            <PrivateRoute
              exact
              auth={this.state.auth}
              path="/MyTeachers"
              render={(props: {
                history: H.History,
                type: string
              }) : React.ReactElement=> <TeacherListPage {...props}/>}
            />
            <PrivateRoute
              auth={this.state.auth}
              path={`/MyTeachers/:teacherid`}
              render={(props: {
                history: H.History,
                location: H.Location,
                match: {
                  params: {
                    teacherid: string
                  }
                }
              }) : React.ReactElement=> <TeacherDetailPage {...props}/>}
            />
            <PrivateRoute
                auth={this.state.auth}
                path="/StudentEngagement"
                render={(props: object) : React.ReactElement=> <StudentEngagementPage {...props}/>}
            />
            <PrivateRoute
                auth={this.state.auth}
                path="/StudentEngagementResults"
                render={(props: {
                  history: H.History
                }) : React.ReactElement=> <StudentEngagementResultsPage {...props}/>}
            />
            <PrivateRoute
                auth={this.state.auth}
                path="/StudentEngagementTraining"
                render={(props: object) : React.ReactElement=> <StudentEngagementTrainingPage {...props}/>}
            />

            {/* this is the ugly way I had to do the router bc i wasn't sure how to pass
                          the type prop into the PrivateRoute function*/}
            <Route
              path="/Magic8Menu"
              render={(props): React.ReactElement =>
                this.state.auth === true ? (
                  <Magic8MenuPage
                    {...props}
                    type={
                      props.location.state.type === "Results"
                        ? "Results"
                        : "Observe"
                    }
                  />
                ) : (
                  <Redirect
                    to={{ pathname: "/", state: { from: props.location } }}
                  />
                )
              }
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/TransitionTimeResults"
              component={TransitionResultsPage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/ClassroomClimateResults"
              component={ClassroomClimateResultsPage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/LevelOfInstructionResults"
              component={LevelOfInstructionResultsPage}
            />
            <PrivateRoute
                auth={this.state.auth}
                path="/Admin"
                component={AdminPage}
            />

            <Route render={(): React.ReactElement => <h3>No Match</h3>} />
          </Switch>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default hot(connect(null, {getCoach, getUnlocked})(App));

