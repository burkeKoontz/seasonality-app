import React, { Component } from 'react';
import './Announce.css';

class Announce extends Component {
  state = {
    message: '',
    response: ''
  };

  componentDidMount() {

  }

  // callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();
  //
  //   if (response.status !== 200) throw Error(body.message);
  //
  //   return body;
  // };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/announce', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post })
    });
    const body = await response.text()
     .then(alert("response yo. update thign here")); //TODO update user

    this.setState({ response: body, message: '' });
  };

  render() {
    console.log(this.state.response);
    return (
      <div className="announce">
        <header className="announce-header">
          <h1>📣 Growing Gardens Announcements 📣</h1>
        </header>
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p className="announce-subheader">Draft push notification below:</p>
          <textarea className="announce-textarea"
            onChange={e => this.setState({ message: e.target.value })}
          />
          <button className="submit-button" type="submit">Publish</button>
        </form>
      </div>
    );
  }
}

export default Announce;
