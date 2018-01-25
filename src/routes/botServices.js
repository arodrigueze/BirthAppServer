var express = require('express');
var router = express.Router();
var builder = require('botbuilder');
var botPersistenceFacade = require('../facade/botPersistenceFacade')

//Instantiate bot persistence facade for communication with database
const botPersistence = new botPersistenceFacade();

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
router.post('/messages', connector.listen());

//Instantiate in memory storage for the bot
var inMemoryStorage = new builder.MemoryBotStorage();

//Initialize bot with it's in memory storage
var bot = new builder.UniversalBot(connector).set('storage', inMemoryStorage);

//start default dialog
var defaultDialog = bot.dialog('/', [

    (session) => {
        session.userData.userAddress = session.message.address;
        session.beginDialog('welcomeDialog');
    },
    (session, results) => {

        const personEmail = session.userData.personEmail;

        if(!personEmail){
            
            session.beginDialog('emailDialog');

        }

    },
    (session, results) => {
     
        const person = session.userData.person;

        if(!person.suscribed){
            session.beginDialog('suscribeDialog');
        }

    },
    // (session, results) => {
    //     session.endConversation("Goodbye!");
    // }

]);

var welcomeDialog = bot.dialog('welcomeDialog', 

    (session) => {
        session.endDialog("Welcome to the PSL Birthday bot!")
    }

);

var emailDialog = bot.dialog('emailDialog', [

    (session, args) => {

        if(args && args.reprompt){
            builder.Prompts.text(session, 'I couldn\'t find your Skype email, would you please re-type it?');
        }
        else{
            builder.Prompts.text(session, 'Would you please give me your email?');
        }
        
    },
    (session, results) => {

        var emailResponse = results.response;

        const personResponse = botPersistence.getPersonByEmail(emailResponse);

        if(personResponse){
            session.userData.person = personResponse;
            botPersistence.registerUserAddress(session.userData.person.id, session.userData.address);
            session.endDialog('Thanks!');
        }
        else{
            session.userData.person = undefined;
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

            botPersistence.suscribePerson(session.userData.person.id);
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

            //TODO: Change to for loop of all user adresses in database            
            bot.beginDialog(addressUser, 'birthdayConfirmation');

        }                
    
    // }

}, 1000 * 60);


module.exports = router;