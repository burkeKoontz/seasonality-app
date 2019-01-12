import React, { Component } from 'react';
import './App.css';
import Announce from './announce/Announce.js'
import Home from './Home.js'
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {

  componentDidMount() {}

  render() {
    return (
        <Router>
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/announce" component={Announce} />
            </div>
        </Router>
    );
  }
}

export default App;
