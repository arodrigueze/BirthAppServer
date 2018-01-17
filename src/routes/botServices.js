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

var bot = new builder.UniversalBot(connector, [

    (session) => {
        session.send("Welcome to the PSL Birthday bot!")
        builder.Prompts.choice(session, "Do you wish to be continually notified of your teammates birthdays?", ["Yes", "No"], { listStyle: builder.ListStyle.button });
    },
    (session, results) => {
        if(results.response.entity === "Yes"){
            session.send("Great, I´ll be in touch then!");
        }
        else{
            session.send("Alright, hit me up when you do!");
        }
        session.endDialog();
    }

]);

module.exports = router;