const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const personSchema = new Schema({
  email: String,
  name: String,
  birthdate: Date,
  teamId: String,
  subscribed: Boolean,
  addressBot: String,
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
