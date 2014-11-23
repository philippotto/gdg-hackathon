var express = require('express');
var app = express();
var twitterApi = new (require("./lib/twitter"))();

app.use(express.static("."));

var users = twitterApi.loadTwitterUsers();

app.route('/users/german').get(function(req, res, next) {
  res.json(users.german_users);
});

app.route('/users/global').get(function(req, res, next) {
  res.json(users.global_users);
})

app.listen(3000);
