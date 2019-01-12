import React, { Component } from 'react';

class Home extends Component {

  componentDidMount() {}


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
