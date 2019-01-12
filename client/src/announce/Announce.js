import React, { Component } from 'react';
import './Announce.css';
import firebase from 'firebase';

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

    /**
     * Initialize firebase
     */
    setupFirebase() {
        var config = {
            apiKey: "AAAAwDyW1Bo:APA91bHQbOnDKK9GTX0xd8-3fiEmZXiiWGib6-uh_sfasgIZ7J3vRn6QoaDiMvGT40eRUQydmtJpbOT2dCjjej6cQX42oovf4yYfWOkUdHgnlBiqxw4h8tA5sNI1YW8Qj8ZrVB_ailn1\n",
            authDomain: "seedsonality.firebaseapp.com",
            databaseURL: "https://seedsonality.firebaseio.com",
            projectId: "seedsonality",
            storageBucket: "seedsonality.appspot.com",
            messagingSenderId: "825650238490",
        };
        firebase.initializeApp(config);

        const messaging = firebase.messaging();
        messaging.usePublicVapidKey("BGq8Hpjffnqs-gCsFRTzzpaN-8Hohyrp5bWi5F5wOTHn0V8pN3WFd-Dn-IEKxsAjs6XSYiAvxGQ8RYUKqklbKlA");
        messaging.requestPermission().then(function() {
            console.log('Notification permission granted.');
            // TODO(developer): Retrieve an Instance ID token for use with FCM.
            const token = messaging.getToken();
            console.log('dat token', token);
        }).catch(function(err) {
            console.log('Unable to get permission to notify.', err);
        });

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.setBackgroundMessageHandler` handler.
        messaging.onMessage(function(payload) {
            console.log('Message received. ', payload);

            alert('whats up yo')
        });
    }

    render() {
        this.setupFirebase();
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
