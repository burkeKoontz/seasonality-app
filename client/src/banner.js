import React, { Component } from 'react';
import './banner.css';

class Banner extends Component {

    // let updateLink = document.querySelector('.updateAlert-link');
    //     updateLink.addEventListener('click', function(event) {
    //     event.preventDefault();
    //     location.reload();
    // });

    render() {
      return (
          <div className="banner-wrapper">
            <dialog open role="alert" class="updateAlert">
                Growing Gardens Notification: K-5 Gardening Classes Registration Now Open!
                <a href="www.growing-gardens.org" class="updateAlert-link">Enroll Now</a>
            </dialog>
          </div>
      )}
}

export default Banner;