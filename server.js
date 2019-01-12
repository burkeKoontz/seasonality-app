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
    });
  });
}

function cropsAsOfDay(date) {
  let sql = Plant.find().where(date).gt('plantStart').lt('plantEnd');
  return queryDatabase(sql);
}


function cropsByName(crop) {
  let sql = Plant.find({ 'name': /${crop}/i });
  return queryDatabase(sql);
}


// API calls
// possible calls
// /api/home?date=&crop=broccoli
// /api/home?date=11031994&crop=
// /api/home?date=&crop=
app.get('/api/home', (req, res) => {
  var date = new Date();
  // if there's search
  if(req.query.searchText === ''){
    res.send(cropsAsOfDay(date));
  }
  if(req.query.searchType === 'date'){
    res.send(cropsAsOfDay(req.query.searchText));
  } else {
    res.send(cropsByName(req.query.searchText));
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
