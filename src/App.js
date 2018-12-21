import React, { Component } from 'react';
import './App.css';
import WelcomePage from "./views/WelcomeViews/Welcome";
import Magic8Menu from "./views/Magic8Menu"
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import TransitionTime from "./views/TransitionViews/TransitionTime";

import  blue from "@material-ui/core/colors/blue"
import amber from "@material-ui/core/colors/amber";
import {createMuiTheme, MuiThemeProvider, withStyles} from "@material-ui/core/styles";

const styles = createMuiTheme({
    palette: {
        primary: {
            light: blue[300],
            main: blue[500],
            dark: blue[700],
            textColor: '#fff',
            contrastText: '#fff',
        },
        secondary: {
            light: amber[300],
            main: amber[500],
            dark: amber[700],
            contrastText: '#000',
        },
    }
});
class App extends Component {
  render() {
    return (
        <BrowserRouter>
                <MuiThemeProvider theme={styles}>
                    <Route exact path="/" component={WelcomePage}/>
                    <Route
                        path="/Magic8Menu"
                        render={() => (<Magic8Menu/>)}
                    />
                    <Route
                      path="/TransitionTime"
                      render={() => (<TransitionTime/>)}
                    />
                </MuiThemeProvider>
        </BrowserRouter>
    );
  }
}

export default withStyles(styles)(App);
