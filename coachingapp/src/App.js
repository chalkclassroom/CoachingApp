import React, { Component } from 'react';
import './App.css';
import './views/Home'
import Home from "./views/Home";
import Magic8Menu from "./views/Magic8Menu"
import ButtonAppBar from "./views/Home"
import { BrowserRouter, Route, Redirect } from "react-router-dom";

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Home}/>
                <Route
                    path="/Magic8Menu"
                    render={() => (<Magic8Menu/>)}
                />
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
