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
            listMessages.save(function (err, listMessageCreated) {
                if (err) {
                    reject(err);
                } else {
                    resolve(listMessageCreated);
                }
            });
        });
        return  createListMessagesPromise;
    };
}
module.exports =  ListMessagesDao;