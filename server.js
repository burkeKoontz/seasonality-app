'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const Plant = require('./models/plants');

let mongoose = require('mongoose');

let fetch = require('node-fetch');

function queryDatabase(sql) {
  mongoose.connect("mongodb://admin:plantsAREveryCOOL333@ds155577.mlab.com:55577/seasonality-plants-app", function(err, db) {
    if (err) throw err;
    console.log("Connected!");

    sql.exec(function (err, plants) {
      if (err) throw err;
      console.log(plants);
    });
  });
};

function cropsAsOfDay(date) {
  mongoose.connect("mongodb://admin:plantsAREveryCOOL333@ds155577.mlab.com:55577/seasonality-plants-app", function(err, db) {
    if (err) throw err;
    console.log("Connected!");

    Plant.find().then(response => res.json(response));//.where(date).gt('plantStart').lt('plantEnd');
  //return queryDatabase(sql);
})};

function cropsByName(crop) {
  let sql = Plant.find({ "name": /${crop}/i });
  return queryDatabase(sql);
};

// API calls
app.get('/api/home', (req, res) => {
  var searchText = req.query.searchText;

  mongoose.connect("mongodb://admin:plantsAREveryCOOL333@ds155577.mlab.com:55577/seasonality-plants-app", function(err, db) {
    if (err) throw err;
    console.log("Connected!");

    //Plant.find().then(response => res.json(response));//.where(date).gt('plantStart').lt('plantEnd');
  //return queryDatabase(sql);
})

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
    console.log("Searching by date");
    res.send(cropsAsOfDay(searchText));
  } else {
    console.log("Searching by crop");
    res.send(cropsByName(searchText));
  }
});

app.post('/api/addItem', (req, res) => {
  // displays in the terminal
  console.log(req.body);
  crops.push(req.body.post);
  res.send('Item added!');
});


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

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
