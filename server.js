'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
const Plant = require('./models/plants');
const { PORT, CLIENT_ORIGIN, POETRY_API_BASE_URL } = require('./config');
const { dbConnect } = require('./db-mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let mongoose = require('mongoose');

function queryDatabase(sql) {
  mongoose.connect('mongodb://admin:plantsAREveryCOOL333@ds155577.mlab.com:55577/seasonality-plants-app', function(err, db) {
    if (err) throw err;
    console.log('Connected!');

    sql.exec(function (err, plants) {
      if (err) throw err;
      console.log(plants);
    });
  });
}

function cropsAsOfDay(date) {
  mongoose.connect('mongodb://admin:plantsAREveryCOOL333@ds155577.mlab.com:55577/seasonality-plants-app', function(err, db) {
    if (err) throw err;
    console.log('Connected!');

    Plant.find().then(response => res.json(response));//.where(date).gt('plantStart').lt('plantEnd');
  //return queryDatabase(sql);
  });}

function cropsByName(crop) {
  let sql = Plant.find({ 'name': /${crop}/i });
  return queryDatabase(sql);
}

// API calls
app.get('/api/home', (req, res) => {
  var searchText = req.query.searchText;

  mongoose.connect('mongodb://admin:plantsAREveryCOOL333@ds155577.mlab.com:55577/seasonality-plants-app', function(err, db) {
    if (err) throw err;
    console.log('Connected!');

    //Plant.find().then(response => res.json(response));//.where(date).gt('plantStart').lt('plantEnd');
  //return queryDatabase(sql);
  });

  console.log(req.query.searchType);
  if(!searchText || searchText === ''){
    var date = new Date();
    console.log(date);
    Plant.find()//.where(date).gt('plantStart').lt('plantEnd')
      .then(response => {
        console.log(response);
        res.json(response);
      }).catch(err => console.error(err));
  }
  else if(req.query.searchType === 'date'){
    console.log('Searching by date');
    res.send(cropsAsOfDay(searchText));
  } else {
    console.log('Searching by crop');
    res.send(cropsByName(searchText));
  }
});

app.post('/api/addItem', (req, res) => {
  // displays in the terminal
  console.log(req.body);
  crops.push(req.body.post);
  res.send('Item added!');
});

// if (process.env.NODE_ENV === 'production') {
//   // Serve any static files
//   app.use(express.static(path.join(__dirname, 'client/build')));

//   // Handle React routing, return all requests to React app
//   app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   });
// }

// app.listen(port, () => console.log(`Listening on port ${port}`));

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
