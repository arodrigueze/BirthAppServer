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

app.use('/persons', person);

/* Route for message */
const listMessages = require('./routes/listMessagesService');

app.use('/listMessages', listMessages);

/* Route for team */
const team = require('./routes/teamServices');

app.use('/teams', team);

/* Route for bot chat */
const botService = require('./routes/botServices');

app.use('/bot', botService);

/* Connection to mongodb using mongoose */
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(configurationServer.mongodbURL);

app.listen(3000);
