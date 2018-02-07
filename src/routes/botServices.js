const express = require('express');
const router = express.Router();
const builder = require('botbuilder');
const botPersistenceFacade = require('../facade/botPersistenceFacade')
const personDao = require("../dao/personDao");

//People with birthday on the current day
var birthdayPeople = [];

//Instantiate bot persistence facade for communication with database
const botPersistence = new botPersistenceFacade();

// Create chat connector for communicating with the Bot Framework Service
const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
router.post('/messages', connector.listen());

//Instantiate in memory storage for the bot
const inMemoryStorage = new builder.MemoryBotStorage();

//Initialize bot with it's in memory storage
var bot = new builder.UniversalBot(connector).set('storage', inMemoryStorage);

//start default dialog
var defaultDialog = bot.dialog('/', [

    (session) => {
        session.userData.userAddress = session.message.address;
        session.beginDialog('welcomeDialog');
    },
    (session, results) => {

        const personEmail = session.userData.person;

        if (!personEmail) {

            session.beginDialog('emailDialog');

        }

    },
    (session, results) => {

        const person = session.userData.person;

        if (!person.suscribed) {
            session.beginDialog('suscribeDialog');
        }

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

var emailDialog = bot.dialog('emailDialog', [

    (session, args) => {

        if (args && args.reprompt) {
            builder.Prompts.text(session, 'I couldn\'t find your Skype email, would you please re-type it?');
        }
        else {
            builder.Prompts.text(session, 'Would you please give me your email?');
        }

    },
    (session, results) => {

        let emailResponse = results.response;

        let personResponsePromise = botPersistence.getPersonByEmail(emailResponse);

        personResponsePromise.then(

            (result) => {

                session.userData.person = result;

                botPersistence.registerUserAddress(session.userData.person.id, session.userData.userAddress);
                session.endDialog('Thanks!');

            },
            (err) => {

                session.userData.person = undefined;
                session.replaceDialog('emailDialog', { reprompt: true });

            }

        );

    }

]);

var suscribeDialogDIalog = bot.dialog('suscribeDialog', [

    (session) => {
        builder.Prompts.choice(session, 'Do you wish to be continually notified of your teammates birthdays?', ['Sure!', 'Not really...'], { listStyle: builder.ListStyle.button });
    },
    (session, results) => {

        var suscribeDialogResponse = results.response.entity;

        if (suscribeDialogResponse === 'Sure!') {

            botPersistence.suscribePerson(session.userData.person.id);
            session.endDialog('Great, I\'ll make sure to notify you.');

        }
        else {
            session.endDialog('Alright, if you want to subscribe at any time just say "subscribe".');
        }

    }

]);

var birthdayConfirmationDialog = bot.dialog('birthdayConfirmation', [

    (session) => {

        const birthdayPerson = birthdayPeople[0];

        let birthdayMessageQuestion = 'It\'s ' + birthdayPerson.name + ' birthday tomorrow.\nDo you wish to send him a message?';

        builder.Prompts.choice(session, birthdayMessageQuestion, ['Hell yeah!', 'Nah, screw that guy'], { listStyle: builder.ListStyle.button });
    },
    (session, results) => {

        var birthdayConfirmationDialogResponse = results.response.entity;

        if (birthdayConfirmationDialogResponse === 'Hell yeah!') {
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

        const birthdayPerson = birthdayPeople[0];

        botPersistence.sendBirthdayMessage(session.userData.person.id, birthdayPerson.id, birthdayMessageDialogResponse);
        session.endDialog('Ok, I\'ll make sure to tell him you said: ' + birthdayMessageDialogResponse);

    }

]);

setInterval(() => {

    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var hour = date.getHours();
    var minute = date.getMinutes();

    let personDAO = new personDao();

    const peoplePromise = personDAO.getPeople();

    peoplePromise.then(

        (result) => {

            let suscribedPeople = [];
            birthdayPeople = [];

            for (let i = 0; i < result.length; i++) {
                let current = result[i];

                if (current.subscribed) {
                    suscribedPeople.push(current);
                }

                if (current.birthdate.getDate() === day && current.birthdate.getMonth() === month) {
                    birthdayPeople.push(current);
                }

            }

            for (let i = 0; i < suscribedPeople.length; i++) {

                let addressSuscribedUser = JSON.parse(suscribedPeople[i].addressBot);

                bot.beginDialog(addressSuscribedUser, 'birthdayConfirmation');
            }

        },
        (err) => {
            console.log("fu");
        }

    );

}, 1000 * 60);

module.exports = router;