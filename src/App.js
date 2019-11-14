import React, { Component } from "react";
import "./App.css";
import WelcomePage from "./views/WelcomeViews/WelcomePage";
import ClassroomClimate from "./views/protected/ClassroomClimateViews/ClassroomClimate";
import ClassroomClimateResults from "./views/protected/ClassroomClimateViews/ClassroomClimateResults";
import Magic8Menu from "./views/protected/Magic8Menu";
import TransitionResults from "./views/protected/TransitionViews/TransitionResults";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import TransitionTime from "./views/protected/TransitionViews/TransitionTime";
import ForgotPasswordPage from "./views/ForgotPasswordViews/ForgotPassword";
import HomePage from "./views/protected/HomeViews/HomePage";
import MyTeachers from "./views/protected/MyTeachers/TeacherLists"
import blue from "@material-ui/core/colors/blue";
import amber from "@material-ui/core/colors/amber";
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles
} from "@material-ui/core/styles";
import AssociativeCooperativeInteractions from "./views/protected/AssociativeCooperativeViews/AssociativeCooperativeInteractions";
import AssociativeCooperativeInteractionsResults from "./views/protected/AssociativeCooperativeViews/AssociativeCooperativeInteractionsResults";
import SequentialActivities from "./views/protected/SequentialActivitiesViews/SequentialActivities";
import SequentialActivitiesResults from "./views/protected/SequentialActivitiesViews/SequentialActivitiesResults";
import AssociativeCooperativeInteractionsTrainingHome from "./views/protected/AssociativeCooperativeViews/AssociativeCooperativeInteractionsTrainingHome";
import ClassroomClimateTrainingHome from "./views/protected/ClassroomClimateViews/ClassroomClimateTrainingHome";
import SequentialActivitiesTrainingHome from "./views/protected/SequentialActivitiesViews/SequentialActivitiesTrainingHome";
import TransitionTimeTrainingHome from "./views/protected/TransitionViews/TransitionTimeTrainingHome";
import About from "./views/WelcomeViews/About";
import Team from "./views/WelcomeViews/Team";
import TeacherDetail from "./views/protected/MyTeachers/TeacherDetail";


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
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      loading: true
    };
  }

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

  componentWillUnmount() {
    this.removeListener();
  }

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
            component={About}
              />
            <PrivateRoute
            auth={this.state.auth || !this.state.auth}
            path = "/team"
            component = {Team}/>
            <PrivateRoute
              auth={this.state.auth}
              path="/TransitionTime"
              component={TransitionTime}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/ClassroomClimate"
              component={ClassroomClimate}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/AssociativeCooperativeInteractions"
              component={AssociativeCooperativeInteractions}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/AssociativeCooperativeInteractionsResults"
              component={AssociativeCooperativeInteractionsResults}
              />
            <PrivateRoute
            auth={this.state.auth}
            path="/SequentialActivities"
            component={SequentialActivities}
            />
            <PrivateRoute
            auth={this.state.auth}
            path="/SequentialActivitiesResults"
            component={SequentialActivitiesResults}
            />
            <PrivateRoute
                auth={this.state.auth}
                path="/AssociativeCooperativeInteractionsTrainingHome"
                component={AssociativeCooperativeInteractionsTrainingHome}
            />
            <PrivateRoute
                auth={this.state.auth}
                path="/ClassroomClimateTrainingHome"
                component={ClassroomClimateTrainingHome}
            />
            <PrivateRoute
                auth={this.state.auth}
                path="/SequentialActivitiesTrainingHome"
                component={SequentialActivitiesTrainingHome}
            />
            <PrivateRoute
                auth={this.state.auth}
                path="/TransitionTimeTrainingHome"
                component={TransitionTimeTrainingHome}
            />
            <PrivateRoute
              exact
              auth={this.state.auth}
              path="/MyTeachers"
              component={MyTeachers}
            />
            <PrivateRoute
              auth={this.state.auth}
              path={`/MyTeachers/:teacherid`}
              component={TeacherDetail}
            />
            {/* this is the ugly way I had to do the router bc i wasn't sure how to pass
                            the type prop into the PrivateRoute function*/}
            <Route
              path="/Magic8Menu"
              render={props =>
                this.state.auth === true ? (
                  <Magic8Menu {...props} type={props.location.state.type === "Results" ? "Results" : "Observe"} />
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
              component={TransitionResults}
            />
            <PrivateRoute
              auth={this.state.auth}
              path="/ClassroomClimateResults"
              component={ClassroomClimateResults}
            />
            <Route render={() => <h3>No Match</h3>} />
          </Switch>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}
export default withStyles(styles)(App);

