var express = require('express');
var bodyParser = require('body-parser');
var configurationServer = require('./configServer');
var app = express();

/*Route for person */
var person = require('./routes/person');
app.use('/person', person);

/*Route for send email to users */
var sendEmail = require('./routes/sendEmail');
app.use('/sendEmail', sendEmail);

/*Route for team */
var team = require('./routes/team');
app.use('/team', team);

/*Route for bot chat */
var botService = require('./routes/botServices');
app.use('/bot', botService);

/*Connection to mongodb using mongoose */
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(configurationServer.mongodbURL, function (err) {
  if (err) {
    console.log("Error de conexion mongodb");
    console.log(err);
  }
});

/*Parsing json data */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000, function () {
  console.log('server on port 3000!');
});