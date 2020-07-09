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
  withStyles
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
import TeamPage from "./views/WelcomeViews/TeamPage";
import TeacherDetailPage from "./views/protected/MyTeachers/TeacherDetailPage";
import * as LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import * as ReactGA from 'react-ga';
import CHALKLogoGIF from './assets/images/CHALKLogoGIF.gif';
import Grid from '@material-ui/core/Grid';
import { getCoach } from './state/actions/coach';
import { connect } from 'react-redux';
import StudentEngagementTrainingPage from "./views/protected/StudentEngagementViews/StudentEngagementTrainingPage";

ReactGA.initialize('UA-154034655-1');
ReactGA.pageview(window.location.pathname + window.location.search);

LogRocket.init('akprci/cqref');
setupLogRocketReact(LogRocket);

const styles: object = createMuiTheme({
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
  },
  typography: {
    useNextVariants: true
  }
});

/**
 * 
 * @return {ReactElement}
 */
function PrivateRoute({ component: Component, auth, ...rest }): React.ReactElement {
  return (
    auth === true ? (
      <Route
        {...rest}
        render={(props): React.ReactNode => {
          return (
            <Route component={Component} {...props} />
          )
        }}
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
  component: PropTypes.element.isRequired,
  auth: PropTypes.bool.isRequired,
  location: PropTypes.object
}

interface Props {
  firebase: {
    auth: {
      onAuthStateChanged(arg: any): firebase.User | null
    },
    getCoachFirstName(): Promise<string>
  },
  getCoach(name: string): void
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
          this.props.getCoach(name);
          this.setState({
            auth: true,
            loading: false
          });
        });
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
      onAuthStateChanged: PropTypes.func,
      getCoachFirstName: PropTypes.func
    }).isRequired,
    getCoach: PropTypes.func.isRequired
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
              component={WelcomePage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/Invite"
              component={HomePage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/Account"
              component={HomePage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/Home"
              component={HomePage}
            />
            <PrivateRoute
              auth={this.state.auth || !this.state.auth}
              path="/team"
              component={TeamPage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/ActionPlans"
              component={ActionPlanListPage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/ActionPlan"
              component={ActionPlanView}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/ConferencePlans"
              component={ConferencePlanListPage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/ConferencePlan"
              component={ConferencePlanView}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/TransitionTime"
              component={TransitionTimePage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/LevelOfInstruction"
              component={LevelOfInstructionPage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/ClassroomClimate"
              component={ClassroomClimatePage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/ListeningToChildren"
              component={ListeningToChildrenPage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/ListeningToChildrenResults"
              component={ListeningToChildrenResultsPage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/ListeningToChildrenTraining"
              component={ListeningToChildrenTrainingPage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/AssociativeCooperativeInteractions"
              component={AssociativeCooperativeInteractionsPage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/AssociativeCooperativeInteractionsResults"
              component={AssociativeCooperativeInteractionsResultsPage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/MathInstruction"
              component={MathInstructionPage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/MathInstructionResults"
              component={MathInstructionResultsPage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/SequentialActivities"
              component={SequentialActivitiesPage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/MathInstructionTraining"
              component={MathInstructionTrainingPage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/SequentialActivitiesResults"
              component={SequentialActivitiesResultsPage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/AssociativeCooperativeInteractionsTraining"
              component={AssociativeCooperativeInteractionsTrainingPage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/LevelOfInstructionTraining"
              component={LevelOfInstructionTrainingPage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/ClassroomClimateTraining"
              component={ClassroomClimateTrainingPage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/SequentialActivitiesTraining"
              component={SequentialActivitiesTrainingPage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/TransitionTimeTraining"
              component={TransitionTimeTrainingPage}
            />
            <PrivateRoute
              exact
              auth={this.state.auth}
              path="/MyTeachers"
              component={TeacherListPage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path={`/MyTeachers/:teacherid`}
              component={TeacherDetailPage}
            />
            <PrivateRoute
                auth={this.state.auth}
                path="/StudentEngagement"
                component={StudentEngagementPage}
            />
            <PrivateRoute
                auth={this.state.auth}
                path="/StudentEngagementResults"
                component={StudentEngagementResultsPage}
            />
            <PrivateRoute
                auth={this.state.auth}
                path="/StudentEngagementTraining"
                component={StudentEngagementTrainingPage}
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
            <Route render={(): React.ReactElement => <h3>No Match</h3>} />
          </Switch>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default hot(withStyles(styles)(connect(null, {getCoach})(App)));

