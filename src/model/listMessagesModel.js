const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listMessagesSchema = new Schema({
  printed: String,
  year: Number,
  receiverId: String,
});

const ListMessages = mongoose.model('ListMessages', listMessagesSchema);

module.exports = ListMessages;
