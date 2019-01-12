import React, { Component } from 'react';
import './App.css';
import ListItem from './ListItem.js';
import SproutLogo from './images/sprout-logo.png'
import Bell from './images/bell.png'
import {
    Route,
    Link
} from 'react-router-dom'
import Announce from './announce/Announce.js';

class App extends Component {
  state = {
    list: '',
    post: '',
    responseToPost: ''
  };

  componentDidMount() {
    this.updateTodoList();
  }

  updateTodoList() {
    this.callApi()
      .then(res => this.setState({ list: res.toDoList }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/addItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post })
    });
    const body = await response.text()
     .then(this.updateTodoList());

    this.setState({ responseToPost: body, post: '' });
  };

  render() {
    console.log(this.state.response);
    return (
      <div className="App">
        <header className="App-header">
          <img src={SproutLogo} className="logo" />
          <h1 className="title">Seedsonal Planner</h1>
          <img src={Bell} className="bell" />
          <a href="/admin" className="admin-link">Admin</a>
        </header>
        <ul className="to-do-list">
       {this.state.list.length > 0 && this.state.list.map((listItem, index) => (
          <ListItem text={listItem} />
        ))}

        </ul>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button className="submit-button" type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>

      <div className="App-intro">
          <Route path="/announce" component={Announce}/>
      </div>

      </div>
    );
  }
}

export default App;
