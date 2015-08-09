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
  var splitQuery = query.split(' ');
  var userQuery = splitQuery[0];
  // Count is the default numbr of tweets that is returned to the user when they do not specify the number of tweets needed
  var count = 3;
  if (splitQuery.length > 1){
    count = parseInt(splitQuery[1]), 10;
    if(count >10) count = 10;
  }
  var queryObject = {q: userQuery, count: count};
  client.get('search/tweets', queryObject, function(error, tweetsObj, response) {
    if(error) console.log(error);
    else {
      var tweets = tweetsObj.statuses;
      cb(tweets);
    }
  });
};

// This is the method that looks up a particular username and returns the necessary information
tweetServer.lookup = function (query, cb) {
  client.get('users/show', {screen_name: query, count: 1}, function(error, tweets, response){
    if(error) console.log(error);
    else {
      cb(tweets);
    }
  });
}

tweetServer.getTweetsByUser = function(query, cb) {
  client.get('statuses/user_timeline', {screen_name: query, count: 5}, function(error, tweets, response){
    if(error) console.log(error);
    else {
      var userTweetsArray = [];
      tweets.map(function(item) {
        userTweetsArray.push(item.text);
      });
      cb(userTweetsArray);
    }    
  });
}

module.exports = tweetServer;