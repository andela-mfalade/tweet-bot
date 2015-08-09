'use strict';

var responseMsg = {};


// Response for when a user sends the keyword "help" to tweetbo 
responseMsg.create_HELP_Response = function(username) {
    return {
        "attachments": [
            {
                "fallback": "Hi " + username + ". \n- Below is a list of commands for your convenience.\n\n `funnytweet`: To get a random funny tweet. \n",
                "pretext": "Hi " + username ,
                "title": "Below is a list of commands for your convenience.",
                "text": "`funnytweet`: To get a random funny tweet.\n `trending`: To show a list of the trending tweets. \n `#<hashtag> e.g #andelaFellowOfTheWeek`: to get the `3` latest tweet(s) on #andelaFellowOfTheWeek \n `#<hashtag> <number of results you want> e.g #tgif 4`: To view the 4 latest tweets on #tgif. Note that the `MAX` value is `10`.\n`lookup @<user> e.g lookup @andela`: To get the latest tweet by @andela\n`#?`: To show who built me.\n",
                "mrkdwn": true,
                "mrkdwn_in": ["text", "pretext"],
                "color": "#7CD197"
            }
        ]
    };
};


// Response for when a user sends the keyword "trending" to tweetbot
responseMsg.create_TRENDING_Response = function(trends) {
    var attachmentsArray = [{ "title": "Trending topics in Nigeria.", "color": '#F62459' }];
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


// Response for when a user sends a hashtagged word to tweetbot
responseMsg.create_HASH_Response = function (userQuery, tweets) {
    var attachmentsArray = [{ "title": "Latest tweets for " + userQuery, "color": '#F62459' }];

    // If no tweet exist for a particular hashtag
    if(tweets.length < 1) {
        attachmentsArray = [{ "title": "No tweets were found for " + userQuery, "color": '#F62459' }];
    }

    var coolBarColors = ['#439FE0', '#7CD197', '#9B59B6', '#E67E22', '#34495E', '#DB0A5B', '#674172', '#F5D76E'];
    tweets.map(function(tweetItem) {
        var imageUrl;
        if (!tweetItem.entities.media) imageUrl = '';
        else imageUrl =  tweetItem.entities.media[0].media_url_https;
        attachmentsArray.push(
            {
                "fallback": tweetItem.text,
                "text": tweetItem.text,
                "image_url": imageUrl,
                "color": coolBarColors[Math.floor(Math.random() * 8)]
            }
        )
    });
    return { "attachments": attachmentsArray };
};

// Export the method that creates the bot response
module.exports = responseMsg;