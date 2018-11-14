import React, { Component } from 'react';
import './App.css';
import './views/Home'
import Home from "./views/Home";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home/>
      </div>
    );
  }
}

export default App;
