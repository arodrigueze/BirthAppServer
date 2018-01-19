var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var personSchema = new Schema({
    email:String,
    name:String,
    birthdate:Date,
    teamId: String,
    subscribed: Boolean,
    skypeId:String
});

var Person = mongoose.model('Person', personSchema);

module.exports = Person;