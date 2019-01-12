import React, { Component } from 'react';
import './banner.css';
import firebase from 'firebase';
import fetch from 'node-fetch'

class Banner extends Component {

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

            let banner = document.getElementById("banner");
            let message = document.getElementById("message");
            message.innerHTML = payload.notification.body;
            banner.style.display = "table";
        });
    }

    // let updateLink = document.querySelector('.updateAlert-link');
    //     updateLink.addEventListener('click', function(event) {
    //     event.preventDefault();
    //     location.reload();
    // });

    render() {
      this.setupFirebase();
      return (
          <div className="banner-wrapper" id="banner">
            <dialog open role="alert" className="updateAlert">
                ANNOUNCEMENT: <span id="message">Growing Gardens Notification: K-5 Gardening Classes Registration Now Open!</span>
                &nbsp;&nbsp;&nbsp;<a href="www.growing-gardens.org" className="updateAlert-link">Learn More</a>
            </dialog>
          </div>
      )}
}

export default Banner;