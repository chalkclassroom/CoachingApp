import React, { Component } from 'react';
import './App.css';
import './views/Home'
// import Home from "./views/Home";
import Magic8Menu from "./views/Magic8Menu"
import ButtonAppBar from "./views/Home"
import { BrowserRouter, Route, Redirect } from "react-router-dom";

class App extends Component {
  render() {
    return (
        <div className="App">
            <Magic8Menu/>
        </div>
    );
  }
}

export default App;
