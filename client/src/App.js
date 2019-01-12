import React, { Component } from 'react';
import './App.css';
import Announce from './announce/Announce.js'
import Home from './Home.js'
import { BrowserRouter as Router, Route } from "react-router-dom";
import SproutLogo from './images/sprout-logo.png'
import Bell from './images/bell.png'
import firebase from 'firebase';
import fetch from 'node-fetch'

class App extends Component {

  componentDidMount() {}

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
            // const token = messaging.getToken();

            messaging.getToken().then(function(result){
                console.log(result);

                localStorage.setItem('pushToken', result);

                let resp = fetch('http://localhost:3000/api/subtopic', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'key=AAAAwDyW1Bo:APA91bHQbOnDKK9GTX0xd8-3fiEmZXiiWGib6-uh_sfasgIZ7J3vRn6QoaDiMvGT40eRUQydmtJpbOT2dCjjej6cQX42oovf4yYfWOkUdHgnlBiqxw4h8tA5sNI1YW8Qj8ZrVB_ailn1'
                    },
                    body: JSON.stringify({
                        token: result
                    })
                });

                resp.then(function(result){
                    console.log(result);
                })
            });

        }).catch(function(err) {
            console.log('Unable to get permission to notify.', err);
        });

        messaging.onMessage(function(payload) {
            console.log('Message received. ', payload);

            alert('whats up yo')
        });
    }

  render() {
    this.setupFirebase();
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
