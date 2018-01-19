var MessageDB = require('../model/messageModel');

class MessageDao {
    constructor() { }
    /*REturn messages by listMessagesId*/
    getMessagesByListMessageId(listMessageId) {
        const getMessagesByListMessagesIdPromise = new Promise((resolve, reject) => {
            MessageDB.find({ '_id': listMessageId }, function (err, messages) {
                if (err) {
                    reject(err);
                } else {
                    resolve(messages);
                }
            });
        });
        return getMessagesByListMessagesIdPromise;
    };
}
module.exports = MessagesDao;