import React, { Component } from 'react';
import './App.css';
import Announce from './announce/Announce.js'
import Home from './Home.js'
import { BrowserRouter as Router, Route } from "react-router-dom";
import SproutLogo from './images/sprout-logo.png'
import Bell from './images/bell.png'

class App extends Component {

  componentDidMount() {}

  render() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <img src={SproutLogo} className="logo" />
                    <h1 className="title">Seedsonal Planner</h1>
                    <div className="menu">
                      <img src={Bell} className="bell" />
                      <a href="/announce" className="admin-link">Admin</a>
                    </div>
                </header>

                <Route exact path="/" component={Home} />
                <Route path="/announce" component={Announce} />
            </div>
        </Router>
    );
  }
}

export default App;
