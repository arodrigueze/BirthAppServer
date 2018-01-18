

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

var addressUser;

var bot = new builder.UniversalBot(connector, [

    (session) => {
        addressUser = session.message.address;
        session.beginDialog('welcomeDialog');
    },
    (session, results) => {
        session.beginDialog('emailDialog');
    },
    (session, results) => {
        session.beginDialog('suscribeDialog');
    },
    (session, results) => {
        session.endConversation("Goodbye!");
    }

]);

var welcomeDialog = bot.dialog('welcomeDialog', 

    (session) => {
        session.endDialog("Welcome to the PSL Birthday bot!")
    }

);

var foundEmail = false;

var emailDialog = bot.dialog('emailDialog', [

    (session, args) => {

        if(args && args.reprompt){
            foundEmail = true;
            builder.Prompts.text(session, 'I couldn\'t find your Skype email, would you please re-type it?');
        }
        else{
            builder.Prompts.text(session, 'Would you please give me your email?');
        }
        
    },
    (session, results) => {

        var emailResponse = results.response;
        console.log(emailResponse);
        console.log(foundEmail);

        //TODO: implement method

        if(foundEmail){
            session.endDialog('Thanks!');
        }
        else{
            session.replaceDialog('emailDialog', { reprompt: true });
        }

    }

]);

var suscribeDialogDIalog = bot.dialog('suscribeDialog', [

    (session) => {
        builder.Prompts.choice(session, 'Do you wish to be continually notified of your teammates birthdays?', ['Sure!', 'Not really...'], { listStyle: builder.ListStyle.button });
    },
    (session, results) => {
        
        var suscribeDialogResponse = results.response.entity;

        if(suscribeDialogResponse === 'Sure!'){
            session.endDialog('Great, I\'ll make sure to notify you.');
        }
        else{
            session.endDialog('Alright, if you want to subscribe at any time just say "subscribe".');
        }

    }

]);

var birthdayConfirmationDialog = bot.dialog('birthdayConfirmation', [

    (session) => {
        builder.Prompts.choice(session, 'It\'s Foo\'s irthday tomorrow, you work with him in the Bar team.\nDo you wish to send him a message?', ['Hell yeah!', 'Nah, screw that guy'], { listStyle: builder.ListStyle.button });
    },
    (session, results) => {

        var birthdayConfirmationDialogResponse = results.response.entity;

        if(birthdayConfirmationDialogResponse === 'Hell yeah!'){
            session.beginDialog('birthdayMessage');
        }
        else {
            session.send('Ok, if you change your mind, just type "congratulate".');
            session.endConversation("Goodbye!");
        }

    }

]);

var birthdayMessageDialog = bot.dialog('birthdayMessage', [

    (session) => {
        builder.Prompts.text(session, 'What do you wish to tell him?');
    },
    (session, results) => {

        var birthdayMessageDialogResponse = results.response;
        session.endDialog('Ok, I\'ll make sure to tell him you said: ' + birthdayMessageDialogResponse);

    }

]);

var timeCheck = setInterval ( () => {

    var date = new Date();

    var hour = date.getHours();
    var minute = date.getMinutes();

    // if(hour === 13 && minute === 50) {


        console.log('entered if');

        if(!addressUser){
            console.log(addressUser);
        }
        else{
            
            bot.beginDialog(addressUser, 'birthdayConfirmation');

        }                
    
    // }

}, 1000 * 60);


module.exports = router;