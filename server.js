// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var get = require('request-promise-native');
var API_KEY = process.env.FOOD2FORK_KEY;
var GET_URL = 'http://food2fork.com/api/get';
var SEARCH_URL = 'http://food2fork.com/api/search';

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`. 

// http://expressjs.com/en/starter/basic-routing.html
// https://marvelous-fan.glitch.me/get?rId=5531
app.get("/get", function (request, response) {
  if (request.query.rId) {
    get({url: GET_URL,
         qs: {key: API_KEY, rId: request.query.rId},
         json: true})
      .then(function(recipe){
      response.json(recipe);
    });
  }
  else { response.sendStatus(400); }
});

// http://expressjs.com/en/starter/basic-routing.html
// https://marvelous-fan.glitch.me/search?q=curry,chicken
app.get("/search", function (request, response) {
  if (request.query.q) {
    var query = {key: API_KEY, q: request.query.q};
    if (request.query.sort) { query.sort = request.query.sort; }
    if (request.query.page) { query.sort = request.query.page; }
    get({url: SEARCH_URL,
         qs: query,
         json: true})
      .then(function(recipe){
      response.json(recipe);
    })
  }
  else { response.sendStatus(400); }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
