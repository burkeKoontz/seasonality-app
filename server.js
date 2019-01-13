'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const Plant = require('./models/plants');
const { PORT, CLIENT_ORIGIN, POETRY_API_BASE_URL } = require('./config');
const { dbConnect } = require('./db-mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

let mongoose = require('mongoose');

let fetch = require('node-fetch');

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
  let searchText = req.query.searchText;
  let date = req.query.date;

  console.log(date);
  if (searchText) {
    Plant.find({name: searchText})
      .then(response => {
        console.log(response);
        res.json(response);
      })
      .catch(err => console.error(err));
  } else if (date) {
    Plant.find({$and : [{plantStart: { $lte: date }}, {plantEnd: { $gte: date }}]})
      .then(response => {
        console.log(response);
        res.json(response);
      })
      .catch(err => console.error(err));
  } else {
    let today = new Date();
    date = today.getMonth() + 1;
    let decimal = today.getDate();
    decimal = decimal / 30;
    date = date + decimal;
    Plant.find({$and : [{plantStart: { $lte: date }}, {plantEnd: { $gte: date }}]})
      .then(response => {
        console.log(response);
        res.json(response);
      })
      .catch(err => console.error(err));
  }

});

app.post('/api/addItem', (req, res) => {
  // displays in the terminal
  console.log(req.body);
  // crops.push(req.body.post);
  res.send('Item added!');
});

function runServer() {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

app.post('/api/subtopic', (req, res) => {
    let token = req.body.token;
    let resp = fetch('https://iid.googleapis.com/iid/v1/' + token + '/rel/topics/seedsonality', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'key=AAAAwDyW1Bo:APA91bHQbOnDKK9GTX0xd8-3fiEmZXiiWGib6-uh_sfasgIZ7J3vRn6QoaDiMvGT40eRUQydmtJpbOT2dCjjej6cQX42oovf4yYfWOkUdHgnlBiqxw4h8tA5sNI1YW8Qj8ZrVB_ailn1'
        }
    });

    resp.then(function(result){
        console.log(result);
    });

    res.send('Subbed!');
});

app.post('/api/announce', (req, res) => {
    let token = req.body.token;
    let resp = fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=AAAAwDyW1Bo:APA91bHQbOnDKK9GTX0xd8-3fiEmZXiiWGib6-uh_sfasgIZ7J3vRn6QoaDiMvGT40eRUQydmtJpbOT2dCjjej6cQX42oovf4yYfWOkUdHgnlBiqxw4h8tA5sNI1YW8Qj8ZrVB_ailn1'
        },
        body: "{\n" +
            "    \"notification\": {\n" +
            "        \"title\": \"Seedsonality\",\n" +
            "        \"body\": \"" + req.body.message + "\",\n" +
            "        \"click_action\": \"http://localhost:3000/\",\n" +
            "        \"icon\": \"http://url-to-an-icon/icon.png\"\n" +
            "    },\n" +
            "    \"to\": \"/topics/seedsonality\"\n" +
            "}"
        });

    resp.then(function(result){
        console.log(result);
    });

    res.send('Announce yo!');
});

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
