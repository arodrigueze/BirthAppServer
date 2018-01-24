const express = require('express');
const bodyParser = require('body-parser');
const configurationServer = require('./configServer');

const app = express();

app.use((req, res, next) => { res.header('Access-Control-Allow-Origin', '*'); res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); next(); });
/* Parsing json data */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/* Route for person */
const person = require('./routes/personServices');

app.use('/person', person);

/* Route for message */
const message = require('./routes/messageService');

app.use('/message', message);

/* Route for message */
const listMessages = require('./routes/listMessagesService');

app.use('/listMessages', listMessages);

/* Route for team */
const team = require('./routes/teamServices');

app.use('/team', team);

/* Route for bot chat */
const botService = require('./routes/botServices');

app.use('/bot', botService);

/* Connection to mongodb using mongoose */
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(configurationServer.mongodbURL, (err) => {
  if (err) {
    console.log('Error de conexion mongodb');
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log('server on port 3000!');
});
