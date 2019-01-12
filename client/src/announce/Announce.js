import React, { Component } from 'react';
import './Announce.css';

class Announce extends Component {
    state = {
        message: '',
        response: ''
    };

    componentDidMount() {

    }

    handleSubmit = async e => {
        e.preventDefault();
        await fetch('/api/announce', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: localStorage.getItem("pushToken"),
                message: this.state.message
            })
        });
    };

    render() {
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
