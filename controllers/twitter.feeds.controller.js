'use strict';
var _ = require('lodash');

// Require twitter module and set up account
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: 'LRrLDWp42SUxsek3XlKoX9Ou2',
  consumer_secret: 'QkPR1POOZrzEWAmu9er9UPjvnyyAmTlZArocTJ58RDzbMAJDgE',
  access_token_key: '3408560205-nsQnBWqHe4vhVk4xiC4xYa8sqd9iHaRV5mVcI71',
  access_token_secret: 'FHIt8Xtycehl4r91uDuR7agOsBCMlr8adcGJRHUe5TGZB'
});

var tweetServer = {};

// this method gets top 10 latest trending topics
tweetServer.getTrends = function (cb) {
  client.get('trends/place', {id: 23424908}, function(error, tweets, response){
    if(error) console.log(error);
    else {
      var trendsArray = tweets[0].trends;
      var trends = _.pluck(trendsArray, 'name');
      cb(trends);
    }    
  });
};

// This method gets the tweets for the user input
tweetServer.getTweetsFor = function (query ,cb) {
  var queryObject = {q: query};
  client.get('search/tweets', queryObject, function(error, tweetsObj, response) {
    if(error) console.log(error);
    else {
      var tweetsArray = tweetsObj.statuses;
      var tweets = _.pluck(tweetsArray, 'text');
      cb(tweets);
    }
  });
};


module.exports = tweetServer;