import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./App.css";
import WelcomePage from "./views/WelcomeViews/WelcomePage.tsx";
import ClassroomClimatePage from "./views/protected/ClassroomClimateViews/ClassroomClimatePage";
import ClassroomClimateResultsPage from "./views/protected/ClassroomClimateViews/ClassroomClimateResultsPage";
import Magic8MenuPage from "./views/protected/Magic8MenuPage";
import TransitionResultsPage from "./views/protected/TransitionViews/TransitionResultsPage.tsx";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import TransitionTimePage from "./views/protected/TransitionViews/TransitionTimePage.tsx";
import ForgotPasswordPage from "./views/ForgotPasswordViews/ForgotPasswordPage";
import HomePage from "./views/protected/HomeViews/HomePage";
import TeacherListPage from "./views/protected/MyTeachers/TeacherListPage";
import blue from "@material-ui/core/colors/blue";
import amber from "@material-ui/core/colors/amber";
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles
} from "@material-ui/core/styles";
import AssociativeCooperativeInteractionsPage from "./views/protected/AssociativeCooperativeViews/AssociativeCooperativeInteractionsPage.tsx";
import AssociativeCooperativeInteractionsResultsPage from "./views/protected/AssociativeCooperativeViews/AssociativeCooperativeInteractionsResultsPage";
import SequentialActivitiesPage from "./views/protected/SequentialActivitiesViews/SequentialActivitiesPage.tsx";
import SequentialActivitiesResultsPage from "./views/protected/SequentialActivitiesViews/SequentialActivitiesResultsPage";
import AssociativeCooperativeInteractionsTrainingPage from "./views/protected/AssociativeCooperativeViews/AssociativeCooperativeInteractionsTrainingPage.tsx";
import ClassroomClimateTrainingPage from "./views/protected/ClassroomClimateViews/ClassroomClimateTrainingPage";
import SequentialActivitiesTrainingPage from "./views/protected/SequentialActivitiesViews/SequentialActivitiesTrainingPage.tsx";
import TransitionTimeTrainingPage from "./views/protected/TransitionViews/TransitionTimeTrainingPage.tsx";
import AboutPage from "./views/WelcomeViews/AboutPage";
import TeamPage from "./views/WelcomeViews/TeamPage.tsx";
import TeacherDetailPage from "./views/protected/MyTeachers/TeacherDetailPage";
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import ReactGA from 'react-ga';

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
        this.setState({
          auth: true,
          loading: false
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
      <h1>Loading</h1>
    ) : (
      <BrowserRouter>
        <MuiThemeProvider theme={styles}>
          <Switch>
            <Route exact path="/" component={WelcomePage} />
            <Route exact path="/forgot" component={ForgotPasswordPage} />
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
              path="/about"
              component={AboutPage}
            />
            <PrivateRoute
              auth={this.state.auth || !this.state.auth}
              path="/team"
              component={TeamPage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/TransitionTime"
              component={TransitionTimePage}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/ClassroomClimate"
              component={ClassroomClimatePage}
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
              path="/SequentialActivities"
              component={SequentialActivitiesPage}
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
            <Route render={() => <h3>No Match</h3>} />
          </Switch>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
