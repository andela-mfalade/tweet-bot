'use strict';

var responseMsg = {};
var coolBarColors = ['#439FE0', '#7CD197', '#9B59B6', '#E67E22', '#34495E', '#DB0A5B', '#674172', '#F5D76E'];

// Response for when a user sends the keyword "help" to tweetbo 
responseMsg.create_HELP_Response = function(username) {
    return {
        "attachments": [
            {
                "fallback": "Hi " + username + ". \n- Below is a list of Tweetbot commands.\n \n",
                "pretext": "Hi " + username ,
                "title": "Below is a list of Tweetbot commands.",
                "text": "`trending`: To show a list of the trending tweets. \n\n  `#<hashtag> e.g #andelaFellowOfTheWeek`: to get the `3` latest tweet(s) on #andelaFellowOfTheWeek \n\n  `#<hashtag> <number of results you want> e.g #tgif 4`: To view the 4 latest tweets on #tgif. Note that the `MAX` value is `10`.\n\n `lookup @<user> e.g lookup @andela`: To get the basic summary of @andela\n\n  `tweets by @<user> or tb @andela e.g tweets by @andela or tb @andela`: To get the latest tweets by @andela\n",
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
    var attachmentsArray = [{ "title": "Latest tweets on " + userQuery, "color": '#F62459' }];

    // If no tweet exist for a particular hashtag
    if(tweets.length < 1) {
        attachmentsArray = [{ "title": "No tweets were found on " + userQuery, "color": '#F62459' }];
    }

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

responseMsg.create_LOOKUP_response = function (username, userInfo) {
    var attachmentsArray = [{ 
        "title": "Summary of " + username, 
        "text": userInfo.description + "\n *Followers*: " + userInfo.followers_count + "\n *Following*: _" + userInfo.friends_count + "_",
        "color": coolBarColors[Math.floor(Math.random() * 8)],
        "thumb_url": userInfo.profile_image_url_https,
        "mrkdwn": true,
        "mrkdwn_in": ["text", "pretext"]
    }];
    return { "attachments": attachmentsArray };
};

responseMsg.create_TWEETS_BY_response = function (username, userTweetsArray) {
    var attachmentsArray = [{ "title": "Latest tweets by "  + username, "color": '#F62459' }];
    userTweetsArray.map(function(userTweet) {
        attachmentsArray.push(
            {
                "fallback": userTweet,
                "text": userTweet,
                "color": coolBarColors[Math.floor(Math.random() * 8)]
            }
        )
    });
    return { "attachments": attachmentsArray };
};

responseMsg.create_INVALID_ENTRY_response = function () {
    var attachmentsArray = [{ 
        "title": "Oops, that command is not recognised! :stuck_out_tongue_winking_eye:", 
        "text": "Send `help` to Tweetbot to get a list of available commands",
        "color": coolBarColors[Math.floor(Math.random() * 8)],
        "thumb_url": '',
        "mrkdwn": true,
        "mrkdwn_in": ["text", "pretext"]
    }];
    return { "attachments": attachmentsArray };
}

// Export the method that creates the bot response
module.exports = responseMsg;