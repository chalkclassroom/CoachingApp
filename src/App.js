import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./App.css";
import WelcomePage from "./views/WelcomeViews/WelcomePage.tsx";
import ClassroomClimatePage from "./views/protected/ClassroomClimateViews/ClassroomClimatePage.tsx";
import ClassroomClimateResultsPage from "./views/protected/ClassroomClimateViews/ClassroomClimateResultsPage.tsx";
import LevelOfInstructionResultsPage from "./views/protected/LevelOfInstructionViews/LevelOfInstructionResultsPage.tsx";
import Magic8MenuPage from "./views/protected/Magic8MenuPage.tsx";
import TransitionResultsPage from "./views/protected/TransitionViews/TransitionResultsPage.tsx";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import TransitionTimePage from "./views/protected/TransitionViews/TransitionTimePage.tsx";
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
import LevelOfInstructionTrainingPage from "./views/protected/LevelOfInstructionViews/LevelOfInstructionTrainingPage.tsx";
import LevelOfInstructionPage from "./views/protected/LevelOfInstructionViews/LevelOfInstructionPage.tsx";
import MathInstructionTrainingPage from "./views/protected/MathInstructionViews/MathInstructionTrainingPage";
import AssociativeCooperativeInteractionsPage from "./views/protected/AssociativeCooperativeViews/AssociativeCooperativeInteractionsPage.tsx";
import AssociativeCooperativeInteractionsResultsPage from "./views/protected/AssociativeCooperativeViews/AssociativeCooperativeInteractionsResultsPage.tsx";
import SequentialActivitiesPage from "./views/protected/SequentialActivitiesViews/SequentialActivitiesPage.tsx";
import SequentialActivitiesResultsPage from "./views/protected/SequentialActivitiesViews/SequentialActivitiesResultsPage.tsx";
import AssociativeCooperativeInteractionsTrainingPage from "./views/protected/AssociativeCooperativeViews/AssociativeCooperativeInteractionsTrainingPage.tsx";
import ClassroomClimateTrainingPage from "./views/protected/ClassroomClimateViews/ClassroomClimateTrainingPage";
import SequentialActivitiesTrainingPage from "./views/protected/SequentialActivitiesViews/SequentialActivitiesTrainingPage.tsx";
import StudentEngagementPage from "./views/protected/StudentEngagementViews/StudentEngagementPage.tsx";
import StudentEngagementResultsPage from "./views/protected/StudentEngagementViews/StudentEngagementResultsPage.tsx";
import TransitionTimeTrainingPage from "./views/protected/TransitionViews/TransitionTimeTrainingPage.tsx";
import MathInstructionPage from "./views/protected/MathInstructionViews/MathInstructionPage.tsx"; 
import MathInstructionResultsPage from "./views/protected/MathInstructionViews/MathInstructionResultsPage";
import ListeningToChildrenPage from './views/protected/ListeningViews/ListeningToChildrenPage';
import ListeningToChildrenResultsPage from './views/protected/ListeningViews/ListeningToChildrenResultsPage';
import ListeningToChildrenTrainingPage from './views/protected/ListeningViews/ListeningToChildrenTrainingPage';
import TeamPage from "./views/WelcomeViews/TeamPage.tsx";
import TeacherDetailPage from "./views/protected/MyTeachers/TeacherDetailPage";
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import ReactGA from 'react-ga';
import CHALKLogoGIF from './assets/images/CHALKLogoGIF.gif';
import Grid from '@material-ui/core/Grid';
import { getCoach } from './state/actions/coach';
import { connect } from 'react-redux';
import StudentEngagementTrainingPage from "./views/protected/StudentEngagementViews/StudentEngagementTrainingPage";

ReactGA.initialize('UA-154034655-1');
ReactGA.pageview(window.location.pathname + window.location.search);

LogRocket.init('akprci/cqref');
setupLogRocketReact(LogRocket);

const styles = createMuiTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
      textColor: "#fff",
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
function PrivateRoute({ component: Component, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        auth === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
  auth: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired
}
/*
function PublicRoute({ component: Component, auth, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                auth === false ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/Home" />
                )
            }
        />
    );
}
*/
/**
 * @class App
 */
class App extends Component {
  /**
   * @param {Props} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      loading: true
    };
  }

  /** invoked after component mounts */
  componentDidMount() {
    this.removeListener = this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.props.firebase.getCoachFirstName().then(name => {
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
  componentWillUnmount() {
    this.removeListener();
  }

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
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
              render={props =>
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
              render={props =>
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
            <Route render={() => <h3>No Match</h3>} />
          </Switch>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  firebase: PropTypes.object.isRequired,
  getCoach: PropTypes.func.isRequired
};

export default withStyles(styles)(connect(null, {getCoach})(App));
