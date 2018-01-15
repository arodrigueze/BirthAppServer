
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

/*Route for person */
var person = require('./routes/person');
app.use('/person', person);

/*Connection to mongodb using mongoose */
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/birthapp", function (err) {
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