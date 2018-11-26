import React, { Component } from 'react';
import './App.css';
import './views/Home'
import Home from "./views/Home";
import TransitionTime from "./views/TransitionTime";

class App extends Component {
  render() {
    return (
      <div className="App">
        <TransitionTime/>
      </div>
    );
  }
}

export default App;
