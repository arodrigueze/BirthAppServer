const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: String,
  senderId: String,
  listMessageId: String,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
