var ListMessageDB = require('../model/listMessagesModel');

class ListMessagesDao {
    constructor() { }

    /*Create listmessages using receiverId*/
    createListMessages(receiverIdIn) {
        const createListMessagesPromise = new Promise((resolve, reject) => {
            var listMessages = new ListMessageDB(dataListMessages);
            var dataListMessages = {
                printed: "false",
                year: new Date().getFullYear(),
                receiverId: receiverIdIn
            }
            listMessages.save(function (err, createdTodoObject) {
                if (err) {
                    reject(err);
                } else {
                    resolve(createdTodoObject);
                }
            });
        });
        return createListMessagesPromise;
    };
}
module.exports = ListMessagesDao;