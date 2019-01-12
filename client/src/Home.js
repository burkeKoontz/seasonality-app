import React, { Component } from 'react';
import firebase from 'firebase';

class Home extends Component {

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
            const token = messaging.getToken();

            console.log('dat token', token);
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
            <div className="Home">
                {/* TODO put what goes on the home page here */}
            </div>
        );
    }
}

export default Home;
