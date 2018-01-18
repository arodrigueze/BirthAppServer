var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    message:String,
    senderPersonId:String,
    listMessageId:String
});

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;