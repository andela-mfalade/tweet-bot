'use strict';

var tweetServer = require('./twitter.feeds.controller');
var responseFormatter = require('./../partials/response.format.creator');
var _ = require('lodash');

module.exports = function (slack) {
  slack.on('message', function(message) {
      var channel = slack.getChannelGroupOrDMByID(message.channel);
      var user = slack.getUserByID(message.user);

      /**
       * sendBotResponse
       * This method is to be called after the bot response value has been set by the different methods above
       */
      var sendBotResponse = function() {
        channel.postMessage(botResponse); 
      }
   
      if (message.type === 'message') {
          if(message.text == undefined) {
            console.log('No message was received.. There is some silly internet error..');
          }
          // console.log(channel.name + ':' + user.name + ':' + message.text);
          // console.log(user.name + ' says :' + message.text);

          // Convert the user's message to the lowercased version
          else {
            var userMessage = message.text.toLowerCase();
            // var botResponse = "Send `help` as a dm to understand my purpose.";
            var botResponse = {}


            if (userMessage == 'test') {
              botResponse = responseFormatter.create_TEST_Response(user.name);
              sendBotResponse();
            }

            // watch out for when the user sends HELP to the boy
            else if (userMessage == 'help') {
              botResponse = responseFormatter.create_HELP_Response(user.name);
              sendBotResponse();
            }

            // Get a list of currently trending tweets
            else if (userMessage == 'trending') {
              tweetServer.getTrends(function (trends) {
                botResponse = responseFormatter.create_TRENDING_Response(trends)
                sendBotResponse();
              });
            }

            // watches out for when the user sends smm to the bot
            else if (userMessage == 'smm') {
              botResponse = ":mayor:  <-- That's the guy.";
            }

            // 

            // Get a particular hashtag
            else if (userMessage[0] == '#') {
              var tweetList = '```\n Latest tweets on ' + userMessage + '. \n\n';
              tweetServer.getTweetsFor(userMessage, function( tweets ) {
                var index = 1;
                tweets.map(function (tweet) {
                  tweetList += ' ' + index++ + ' - ' + tweet + ' \n';
                });
                tweetList += '\n ```';
                botResponse = tweetList;
                sendBotResponse();
              });
            }
          }
      }


  });
  slack.login();
};