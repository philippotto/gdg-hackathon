var Twitter = require('./twitter');
var _ = require('lodash');

var defaults = {
  userCount: 4,
  tweetCount: 10,
  tweetPoolCount: 100
};

/**
 * options:
 *   userCount: {Number}
 * @param {[type]} options [description]
 */
function Middleware(options) {
  this.twitter = new Twitter();
  this.users = this.twitter.loadTwitterUsers().german_users;
  this.allUsers = this.twitter.loadTwitterJSON();

  _.defaults(this, options);
  _.defaults(this, defaults);
}

Middleware.prototype.deleteUser = function(user) {
  this.user = _.without(this.users, user);
};

Middleware.prototype.getRandomUsers = function(count) {
  return this.twitter.getRandomUsers(this.users, count);
};

Middleware.prototype.getRandomUser = function() {
  return _.shuffle(this.users)[0];
};

Middleware.prototype.usersAvailable = function() {
  return this.users.length > this.userCount;
};

Middleware.prototype.getNextQuestion = function(req, res, next) {
  var _this = this;

  if (!this.usersAvailable()) {
    return null;
  }

  var solution = this.getRandomUser();
  this.deleteUser(solution);

  console.log("solution", solution);

  var otherUsers = this.getRandomUsers(this.userCount);
  if (!_.contains(otherUsers, solution)) {
    otherUsers[0]= solution;
    otherUsers = _.shuffle(otherUsers);
  }

  var otherUserRecords = _.filter(this.allUsers, function(user) {
    return _.contains(otherUsers, user.screen_name);
  });

  // function getNextUser(index, callback) {
  //   if (otherUsers.length == index) {
  //     callback();
  //   }

  //   _this.twitter.getUserById(otherUsers[index], function(userData) {
  //     otherUserRecords.push(userData);
  //     getNextUser(index+1, callback);
  //   });
  // }

  console.log("others", otherUsers);

  function buildQuestion(tweets) {
    var questionTweets = _this.twitter.getRandomTweets(tweets, _this.tweetCount);

    req.question = {
      solutionId: solution,
      otherUsers: otherUserRecords,
      tweets: questionTweets
    };

    next();
  }

  // console.log(this.twitter.loadTwitterJSON());
  // async data loading
  // _this.twitter.getUsersByIds(otherUsers, function(data) {  
  //   console.log(data);  
  //   otherUserRecords = data;
  _this.twitter.getTweetsByUserId(solution, _this.tweetPoolCount, buildQuestion);
  // });

};

module.exports = Middleware;
