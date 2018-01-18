var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var listMessagesSchema = new Schema({
    printed:String,
    year:String,
    receiverId:String
});

var ListMessages = mongoose.model('ListMessages', listMessagesSchema);

module.exports = ListMessages;