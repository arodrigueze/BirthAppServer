var validation = require('../utils/validations');
var MessageDB = require('../model/messageModel.js');

/*Validation constructor */
function MessagesDao() {
}

/*REturn messages by listMessagesId*/
MessagesDao.prototype.getMessagesByListMessageId = function (listMessageId, callback) {
    MessageDB.findOne({ '_id': listMessageId }, '_id',
        function (err, messages) {
            callback(messages);
        });
};

module.exports = MessagesDao;