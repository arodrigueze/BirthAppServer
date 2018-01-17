var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var personSchema = new Schema({
    emailPerson:String,
    namePerson:String,
    birthdatePerson:String,
    teamId: String
});

var Person = mongoose.model('Person', personSchema);

module.exports = Person;