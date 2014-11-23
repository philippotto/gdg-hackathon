var twitter = require("twitter");
var _ = require("lodash");
var fs = require('fs');

var config = {
  consumer_key: "HNqeiuDmZUcUPajkXgqYk9eaX",
  consumer_secret: "DUVD1BxnFH5VkrQZLPoPU9DJyFUValnO6yXw7XJfg26qmGb9If",
  access_token_key: "2889088102-iO6j41470HseFFD1zbBtVo9HmScR7iGzeLpDPqI",
  access_token_secret: "2i5kJzqdXNxZse3kv4MkV3K4qDuPpwzgQEwYzrw3nOFBR"
};

function TwitterAPI() {
  this.twitter = new twitter(config);

}

TwitterAPI.prototype.getTweetsByUserId = function(id, maxCount, callback) {
  maxCount = maxCount || 200;
  this.twitter.search('from:'+id+' -filter:retweets', {count: maxCount}, callback);
};


/**
* @param tweets {Array} array of tweets (no object with status property)
*/
TwitterAPI.prototype.getRandomTweets = function(tweets, count) {
  if (count > tweets.length) {
    count = tweets.length;
  }

  return _.shuffle(tweets.statuses).slice(0, count);
};

TwitterAPI.prototype.test = function() {
  this.twitter
    .verifyCredentials(function(data) {
      console.log(data);
    });

  this.twitter.search('from:katyperry', function(data) {
    console.log(data);
  });
};

TwitterAPI.prototype.test1 = function() {
  var _this = this;

  this.getTweetsByUserId("katyperry", 20,
    function(data) {
      console.log(data);
      var random = _this.getRandomTweets(data, 3);
      console.log("random\n\n\n\n", random);
    }
  );
};

TwitterAPI.prototype.loadTwitterUsers = function() {
  var userNames = {};
  ["german_users", "global_users"].map(function(fileName) {
    userNames[fileName] = fs
      .readFileSync('./data/' + fileName + ".txt", 'utf8')
      .split(/\s+/);
  });
  return userNames;
};

TwitterAPI.prototype.loadTwitterJSON = function() {
  var users = fs
    .readFileSync('./data/german.json', 'utf8');
  return JSON.parse(users);
}

TwitterAPI.prototype.getUserById = function(id, callback) {
  this.twitter.get("/users/show.json?screen_name="+id, callback);
};

TwitterAPI.prototype.getUsersByIds = function(ids, callback) {
  this.twitter.get("/users/lookup.json?screen_name=?"+ids.join(","), callback);
};

TwitterAPI.prototype.getRandomUsers = function(users, count) {
  if (count > users.length) {
    count = users.length;
  }

  return _.shuffle(users).slice(0, count);
};

module.exports = TwitterAPI;
