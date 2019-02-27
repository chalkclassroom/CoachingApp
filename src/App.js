import React, { Component } from "react";
import "./App.css";
import WelcomePage from "./views/WelcomeViews/Welcome";
import ClassroomClimate from "./views/protected/ClassroomClimateViews/ClassroomClimate";
import ClassroomClimateResults from "./views/protected/ClassroomClimateViews/ClassroomClimateResults";
import Magic8Menu from "./views/protected/Magic8Menu";
import TransitionResults from "./views/protected/TransitionViews/TransitionResults";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import TransitionTime from "./views/protected/TransitionViews/TransitionTime";
import ForgotPasswordPage from "./views/ForgotPasswordViews/ForgotPassword";
import HomePage from "./views/protected/HomeViews/Home";

import blue from "@material-ui/core/colors/blue";
import amber from "@material-ui/core/colors/amber";
import {
    createMuiTheme,
    MuiThemeProvider,
    withStyles
} from "@material-ui/core/styles";

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

const Magic8Page = (props) => {
  return (
    <Magic8Menu
      type={this.props.history.type}
      {...props}
    />
  );
};

function PrivateRoute({ component: Component, auth, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                auth === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{ pathname: "/", state: { from: props.location } }}
                    />
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
        this.removeListener = this.props.firebase.auth.onAuthStateChanged(
            user => {
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
            }
        );
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
                        <Route
                            exact
                            path="/forgot"
                            component={ForgotPasswordPage}
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
                            auth={this.state.auth}
                            path="/TransitionTime"
                            component={TransitionTime}
                        />
                        <PrivateRoute
                            auth={this.state.auth}
                            path="/ClassroomClimate"
                            component={ClassroomClimate}
                        />
                        {/* this is the ugly way I had to do the router bc i wasn't sure how to pass
                            the type prop into the PrivateRoute function*/}
                        <Route
                            path="/Magic8Menu"
                            render={props =>
                              this.state.auth === true ? (
                                <Magic8Menu {...props} type={props.location.state.type} />
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
