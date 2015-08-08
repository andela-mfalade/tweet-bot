'use strict';

var express = require('express');
var app = express();
var port = 5050;
var Slack = require('slack-client');
var token = 'xoxb-8834364515-J745d3BrcbWOdNNxFWP5tgbp';

var slack = new Slack(token, true, true);

require('./controllers/bot.login.controller')(slack);
require('./controllers/message.response.controller')(slack);

app.listen(port, function(err) {
  if (err) {
    console.log( 'An error occurred.. App coulld not be started', err)
  } else {
    console.log(port + ' is where the magic happens.');
  }
});