const express = require('express');

const router = express.Router();
const builder = require('botbuilder');

// Create chat connector for communicating with the Bot Framework Service
const connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD,
});

// Listen for messages from users
router.post('/messages', connector.listen());

const bot = new builder.UniversalBot(connector, [

  (session) => {
    session.send('Welcome to the PSL Birthday bot!');
    session.beginDialog('initialQuestion');
  },
  (session, results) => {
    const answerInitialQuestion = results.response.entity;

    if (answerInitialQuestion === 'Sure!') {
      session.beginDialog('birthdayConfirmation');
    } else {
      session.endDialog('Ok, you can always talk me later if you change your mind.');
    }
  },
  (session, results) => {
    const answerBirthday = results.response.entity;

    if (answerBirthday === 'Hell yeah!') {
      session.beginDialog('birthdayMessage');
    } else if (answerBirthday === 'Nah, screw that guy') {
      session.endDialog('That\'s to bad');
    } else {
      session.endConversation('Goodbye!');
    }
  },
  (session, results) => {
    session.send(`Ok! I'll make sure to tell him you said: ${results.response}`);
    session.endConversation('Goodbye!');
  },

]);

const initialQuestionDIalog = bot.dialog('initialQuestion', [

  (session) => {
    builder.Prompts.choice(session, 'Do you wish to be continually notified of your teammates birthdays?', ['Sure!', 'Not really...'], { listStyle: builder.ListStyle.button });
  },
  (session, results) => {
    session.endDialogWithResult(results);
  },

]);

const birthdayConfirmationDialog = bot.dialog('birthdayConfirmation', [

  (session) => {
    builder.Prompts.choice(session, 'It\'s Foo\'s irthday tomorrow, you work with him in the Bar team.\nDo you wish to send him a message?', ['Hell yeah!', 'Nah, screw that guy'], { listStyle: builder.ListStyle.button });
  },
  (session, results) => {
    session.endDialogWithResult(results);
  },

]);

const birthdayMessageDialog = bot.dialog(
  'birthdayMessage',

  (session) => {
    builder.Prompts.text(session, 'What do you wish to tell him?');
  },
  (session, results) => {
    session.endDialogWithResult(results);
  },

);

module.exports = router;
