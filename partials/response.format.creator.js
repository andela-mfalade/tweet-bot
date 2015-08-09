'use strict';

var responseMsg = {};


// Response for when a user sends help to tweetbo 
responseMsg.create_HELP_Response = function(username) {
    return {
        "attachments": [
            {
                "fallback": "Hi " + username + ". \n- Below is a list of commands for your convenience.\n\n `funnytweet`: To get a random funny tweet. \n",
                "pretext": "Hi " + username ,
                "title": "Below is a list of commands for your convenience.",
                "text": "`funnytweet`: To get a random funny tweet.\n `trending`: To show a list of the trending tweets. \n `#<hashtag> e.g #andelaFellowOfTheWeek`: to get the latest tweet(s) on #andelaFellowOfTheWeek \n`@user e.g @andela`: To get the latest tweet by @andela\n`#?`: To show who built me.\n",
                "mrkdwn": true,
                "mrkdwn_in": ["text", "pretext"],
                "color": "#7CD197"
            }
        ]
    };
};


responseMsg.create_TRENDING_Response = function(trends) {
    var attachmentsArray = [{"title": "Trending topics in Nigeria.", "color": '#F62459'}];
    var coolBarColors = ['#439FE0', '#7CD197', '#9B59B6', '#E67E22', '#34495E', '#DB0A5B', '#674172', '#F5D76E'];
    trends.map(function(trend) {
        attachmentsArray.push(
            {
                "fallback": trend,
                "text": trend,
                "color": coolBarColors[Math.floor(Math.random() * 8)]
            }
        )
    });
    return { "attachments": attachmentsArray };
};

// Export the method that creates the bot response
module.exports = responseMsg;