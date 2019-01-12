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
        return (
            <div className="Announce">
                <header className="Announce-header">
                    <h1>Announcements</h1>
                </header>
                <p>{this.state.response}</p>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <strong>Send Announcement:</strong>
                    </p>
                    <textarea
                        onChange={e => this.setState({ message: e.target.value })}
                    />
                    <button className="submit-button" type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default Announce;
