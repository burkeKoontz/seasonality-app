import React, { Component } from 'react';
import './App.css';
import SproutLogo from './images/sprout-logo.png'
import Bell from './images/bell.png'

class Home extends Component {

  componentDidMount() {}

  render() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={SproutLogo} className="logo" />
                <h1 className="title">Seedsonal Planner</h1>
                <img src={Bell} className="bell" />
                <a href="/admin" className="admin-link">Admin</a>
            </header>
        </div>
    );
  }
}

export default Home;
