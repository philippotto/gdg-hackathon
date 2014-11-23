var express = require('express');
var Session = require("./lib/session");
var Twitter = require("./lib/twitter");

var app = express();
var twitter = new Twitter();
var session = new Session();
var users = twitter.loadTwitterUsers();


app.use(express.static("."));

app.route('/users/german').get(function(req, res, next) {
  res.json(users.german_users);
});

app.route('/users/global').get(function(req, res, next) {
  res.json(users.global_users);
});

app.route('/next').get(
  function(req, res, next) {
    session.getNextQuestion(req, res, next);
  }, function(req, res, next) {
  res.json(req.question);
});

app.listen(3000);
