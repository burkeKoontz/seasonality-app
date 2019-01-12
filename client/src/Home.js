import React, { Component } from 'react';
import './App.css';
import {API_BASE_URL} from '../config';

class Home extends Component {

  constructor(props) {
    this.state = {
      plants : [],
      searchBar: ''
    }
  }

  setInput(input) {
    this.setState({searchBar: input})
  }

  componentDidMount() {
    const date = new Date();
    fetch(`${API_BASE_URL}/home?date=${date}`, {
      method: "GET"
      })
      .then(res => {
        if (!res.ok) {
            return Promise.reject(res.statusText);
        }
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      })
  }

  search(event) {
    event.preventDefault();
    fetch(`${API_BASE_URL}/home?date=${date}`, {
      method: "GET"
      })
      .then(res => {
        if (!res.ok) {
            return Promise.reject(res.statusText);
        }
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      })
  }

  render() {
    let listHTML;
    if (this.state.plants.length) {
      listHTML = this.state.plants.map((item, index) => {
        return <li key={index}><p>Name : {item.name}</p></li>
      })
    }

    return (
        <div className="Home">
            <form onSubmit={(e) => this.search(e)}>
            <input type="radio" id="searchText" name="searchBy" value="By Plant" checked="checked"></input>
            <label for="searchText">By Plant</label>
            <input type="radio" id="date" name="searchBy" value="By Date"></input>
            <label for="date">By Date</label>
            <label for="searchBar"></label>
            <input onChange={(e) => this.setInput(e.target.value)} id="searchBar" type="text"></input>
            <button>Search</button>
            </form>
            <ul>
              {listHTML}
            </ul>
        </div>
    );
  }
}

export default Home;
