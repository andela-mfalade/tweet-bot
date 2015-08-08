'use strict';

// Require twitter module and set up account
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: 'LRrLDWp42SUxsek3XlKoX9Ou2',
  consumer_secret: 'QkPR1POOZrzEWAmu9er9UPjvnyyAmTlZArocTJ58RDzbMAJDgE',
  access_token_key: '3408560205-nsQnBWqHe4vhVk4xiC4xYa8sqd9iHaRV5mVcI71',
  access_token_secret: 'FHIt8Xtycehl4r91uDuR7agOsBCMlr8adcGJRHUe5TGZB'
});

var tweetServer = {};

tweetServer.getTrends = function (hashTag) {
  client.get('statuses/home_timeline', {count: 1}, function(error, tweets, response){
    if(error) console.log(error);
    console.log(tweets);  // The favorites. 
    console.log(response);  // Raw response object. 
  });
};

module.exports = tweetServer;