'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let mongoose = require('mongoose');

queryDatabase(function(sql) {
  mongoose.connect("mongodb://admin:plantsAREveryCOOL333@ds155577.mlab.com:55577/seasonality-plants-app", function(err, db) {
    if (err) throw err;
    console.log("Connected!");

    sql.exec(function (err, plants) {
      if (err) throw err;
    })
  });
});

cropsAsOfDay(function(date) {
  sql = Plant.find().where(date).gt('plantStart').lt('plantEnd');
  return queryDatabase(sql);
});

cropsByName(function(crop) {
  sql = Plant.find({ "name": /${crop}/i });
  return queryDatabase(sql);
});

// API calls
// possible calls
// /api/home?date=&crop=broccoli
// /api/home?date=11031994&crop=
// /api/home?date=&crop=
app.get('/api/home', (req, res) => {
  var date = new Date();
  if(req.query.searchText == ''){
    res.send({ cropsAsOfDay(date) });
  }
  if(req.query.searchType == 'date'){
    res.send({ cropsAsOfDay(searchText) });
  } else {
    res.send({ cropsByName(searchText) });
  }
});

app.post('/api/addItem', (req, res) => {
  // displays in the terminal
  console.log(req.body);
  crops.push(req.body.post);
  res.send('Item added!');
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
