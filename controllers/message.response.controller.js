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
            var botResponse = {};
            var splitUserMessage = userMessage.split(' ');
            var firstMessagePart = splitUserMessage[0];
            var secondMessagePart;
            if(splitUserMessage.length > 1) {
              secondMessagePart = splitUserMessage[1];
              if(secondMessagePart[0] == '<' && secondMessagePart[1] == '@') {
                
                secondMessagePart = slack.getUserByID(slackUserId);
              }
            }
            
            if (userMessage == 'test') {
              botResponse = responseFormatter.create_TEST_Response(user.name);
              sendBotResponse();
            }

            // watch out for when the user sends HELP to the boy
            else if (userMessage == 'help') {
              botResponse = responseFormatter.create_HELP_Response(user.name);
              sendBotResponse();
            }

            else if (firstMessagePart == 'lookup' || firstMessagePart == 'lu') {
              tweetServer.lookup(secondMessagePart, function (userInfo) {
                botResponse = responseFormatter.create_LOOKUP_response(secondMessagePart, userInfo);
                sendBotResponse();
              });
                // console.log(secondMessagePart, 'second msg part');
            }

            else if (userMessage.substring(0, 10) == 'tweets by ' || userMessage.substring(0, 3) == 'tb ') {
              var queryString;
              if (userMessage.substring(0, 3) == 'tb ') {
                queryString = userMessage.substring(2, userMessage.length);
              }
              else queryString = userMessage.substring(9, userMessage.length);
              tweetServer.getTweetsByUser(secondMessagePart, function (userTweetsArray) {
                botResponse = responseFormatter.create_TWEETS_BY_response(queryString, userTweetsArray);
                sendBotResponse();
              });
            }

            // Get a list of currently trending tweets
            else if (userMessage == 'trending') {
              tweetServer.getTrends(function (trends) {
                botResponse = responseFormatter.create_TRENDING_Response(trends);
                sendBotResponse();
              });
            }

            // watches out for when the user sends smm to the bot
            else if (userMessage == 'smm') {
              botResponse = ":mayor:  <-- That's the guy.";
            }

            // Get a particular hashtag
            else if (userMessage[0] == '#') {
              tweetServer.getTweetsFor(userMessage, function( tweets ) {
                botResponse = responseFormatter.create_HASH_Response(userMessage, tweets);
                sendBotResponse();
              });
            }
          }
      }


  });
  slack.login();
};