var twitter = require("twitter");
var _ = require("lodash");

var config = {
  consumer_key: "XqhJ1n6r0VnnPqpgXkeI3Lbq1",
  consumer_secret: "j6HLWhjydW6movgkfbXzDMaAtfj73umm8O6SBxIPO2caEg6h9w",
  access_token_key: "2889088102-iO6j41470HseFFD1zbBtVo9HmScR7iGzeLpDPqI",
  access_token_secret: "2i5kJzqdXNxZse3kv4MkV3K4qDuPpwzgQEwYzrw3nOFBR"
};

function TwitterAPI() {
  this.twitter = new twitter(config);

}

TwitterAPI.prototype.getTweetsByUserId = function(id, maxCount, callback) {
  maxCount = maxCount || 200;
  this.twitter.search('from:'+id, {count: maxCount}, callback);
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

module.exports = TwitterAPI;
