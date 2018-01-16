var express = require('express');
var router = express.Router();
var builder = require('botbuilder');

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
router.post('/messages', connector.listen());

var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said: %s", session.message.text);
});

module.exports = router;