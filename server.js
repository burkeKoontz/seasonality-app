'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var MongoClient = require('mongodb').MongoClient;

queryDatabase(function(sql) {
  MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
    if (err) throw err;
    console.log("Connected!");
    MongoClient.query(sql, function (err, result) {
      if (err) throw err;
      return result;
    });
  });
});

cropsAsOfDay(function(date) {
  return queryDatabase("select 'name', 'plantStart', 'plantEnd' where ${date} >= 'plantStart' and ${date} <= 'plantEnd'");
});

cropsByName(function(crop) {
  return queryDatabase("select 'name', 'plantStart', 'plantEnd' where 'name' like ${crop}")
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
