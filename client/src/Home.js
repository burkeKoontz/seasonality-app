import React, { Component } from 'react';
import './Home.css';
import {API_BASE_URL} from './config';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      plants : [],
      searchBar: '',
    }
  }

  setInput(input) {
    this.setState({searchBar: input})
  }

  componentDidMount() {
    const date = new Date();
    fetch(`${API_BASE_URL}/home`, {
      method: "GET"
      })
      .then(res => {
        if (!res.ok) {
            return Promise.reject(res.statusText);
        }
        return res.json()
      })
      .then(res =>
        this.setState({plants: res})
      )
      .catch(err => {
        console.error(err);
      })
  }

  searchDate(event) {
    event.preventDefault();
    let date = document.getElementById("date").value ;
    date = new Date( date )
    let month = date.getMonth() + 1;
    let decimal = date.getDate();
    decimal = decimal / 30;
    date = month + decimal;
    fetch(`${API_BASE_URL}/home?date=${date}`, {
      method: "GET"
    })
      .then(res => {
        if (!res.ok) {
            return Promise.reject(res.statusText);
        }
        return res.json()
      })
      .then(res =>
        this.setState({plants: res})
      )
      .catch(err => {
        console.error(err);
      });
  }

  // searchText(event) {
  //   event.preventDefault();
  //   let seachTextInput;
  //   fetch(`${API_BASE_URL}/home?searchText=${searchTextInput}`, {
  //     method: "GET"
  //   })
  //     .then(res => {
  //       if (!res.ok) {
  //           return Promise.reject(res.statusText);
  //       }
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // }


  render() {
    let listHTML;

    const image = {
      width: '100px',
      height: '100px'
    };


    if (this.state.plants.length) {
      listHTML = this.state.plants.map((item, index) => {
        console.log(item.image);
        return <li key={index}><p>Name : {item.name}</p><img style={image} src={item.image} /></li>
      })
    }

    return (
        <div className="Home">
            <form onSubmit={(e) => this.searchDate(e)}>
              <label htmlFor="date">Search by Date</label>
              <input type="date" id="date" name="searchBy"></input>
              <button>Search</button>
            </form>
            <form onSubmit={(e) => this.searchPlant(e)}>
              <label htmlFor="searchBar">Search by Plant Name</label>
              <input id="searchBar" type="text"></input>
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
