'use strict';

var tweetServer = require('./twitter.feeds.controller');

module.exports = function (slack) {
  slack.on('message', function(message) {
      var channel = slack.getChannelGroupOrDMByID(message.channel);
      var user = slack.getUserByID(message.user);
   
      if (message.type === 'message') {
          // console.log(channel.name + ':' + user.name + ':' + message.text);
          // console.log(user.name + ' says :' + message.text);

          // Convert the user's message to the lowercased version

          var userMessage = message.text.toLowerCase();
          var botResponse = "Send `help` as a dm to understand my purpose.";

          // watch out for when the user sends HELP to the boy
          if (userMessage == 'help') {
            botResponse = "Hi " + user.name + ".\n\n `funnytweet or #ft`: To get a random funny tweet. \n `trending or #t`: To show a list of the trending tweets. \n `#<hashtag> e.g #andelaFellowOfTheWeek`: to get the latest tweet(s) about #andelaFellowOfTheWeek \n`@user e.g @andela`: To get the latest tweet by @andela\n`#?`: To show who built me.\n";
          }

          // watches out for when the user sends smm to the bot
          else if (userMessage == 'smm') {
            botResponse = ":mayor:  <-- That's the guy.";
          }

          // Get a particular hashtag
          else if (userMessage[0] == '#') {
            botResponse = 'Hold on, your response will be provided shortly.';
            tweetServer.getTrends (userMessage); 
          }
          

          channel.send(botResponse); 
      }


  });
  slack.login();
};