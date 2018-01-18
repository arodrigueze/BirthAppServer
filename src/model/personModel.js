var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var personSchema = new Schema({
    email:String,
    name:String,
    birthdate:String,
    teamId: String,
    subscribed: String
});

var Person = mongoose.model('Person', personSchema);

module.exports = Person;