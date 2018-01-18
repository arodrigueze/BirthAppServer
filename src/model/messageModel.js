var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    message:String,
    senderId:String,
    listMessageId:String
});

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;