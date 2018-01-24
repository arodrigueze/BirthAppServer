const ListMessageDB = require('../model/listMessagesModel');


class ListMessagesDao {
  /* Create listmessages using receiverId */
  createListMessages(receiverIdIn) {
    this.createListMessagesPromise = new Promise((resolve, reject) => {
      const dataListMessages = {
        printed: 'false',
        year: new Date().getFullYear(),
        receiverId: receiverIdIn,
      };
      const listMessages = new ListMessageDB(dataListMessages);
      listMessages.save((err, listMessageCreated) => {
        if (err) {
          reject(err);
        } else {
          resolve(listMessageCreated);
        }
      });
    });
    return this.createListMessagesPromise;
  }
}


module.exports = ListMessagesDao;
