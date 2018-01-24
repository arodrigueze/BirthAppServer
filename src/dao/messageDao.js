const MessageDB = require('../model/messageModel');
const ValidationMessage = require('../utils/validations');
const ListMessagesModelDB = require('../model/listMessagesModel');
const ListMessageDao = require('../dao/listMessagesDao');

class MessageDao {
  constructor() {
    this.validaciones = new ValidationMessage();
  }

  getMessagesByListMessageId(listMessageId) {
    this.getMessagesByListMessagesIdPromise = new Promise((resolve, reject) => {
      MessageDB.find({ _id: listMessageId }, (err, messages) => {
        if (err) {
          reject(err);
        } else {
          resolve(messages);
        }
      });
    });
    return this.getMessagesByListMessagesIdPromise;
  }

  createMessage(datoMessage, receiverId) {
    this.createMessagePromise = new Promise((resolve, reject) => {
      if (this.validaciones.isEmptyObject(datoMessage.senderId)) {
        reject(new Error('Error: senderId is missing'));
      } else if (this.validaciones.isEmptyString(datoMessage.senderId)) {
        reject(new Error('Error: senderId is empty'));
      } else if (this.validaciones.isEmptyObject(datoMessage.message)) {
        reject(new Error('Error: message is missing'));
      } else if (this.validaciones.isEmptyString(datoMessage.message)) {
        reject(new Error('Error: message is empty'));
      } else if (this.validaciones.isEmptyObject(receiverId)) {
        reject(new Error('Error: receiverId is missing'));
      } else if (this.validaciones.isEmptyString(receiverId)) {
        reject(new Error('Error: receiverId is empty'));
      } else if (receiverId.localeCompare(datoMessage.senderId) === 0) {
        reject(new Error("Error: Can't send message to self"));
      } else {
        ListMessagesModelDB.findOne({ _id: receiverId }, 'receiverId', (err, listMessages) => {
          if (this.validaciones.isEmptyObject(listMessages)) {
            const listMessageDao = new ListMessageDao();
            listMessageDao.createListMessages(receiverId).then((result) => {
              const dataMessage = {
                senderId: datoMessage.senderId,
                message: datoMessage.message,
                listMessageId: result._id,
              };
              const message = new MessageDB(dataMessage);
              message.save((errSave, createdTodoObject) => {
                if (errSave) {
                  console.log(errSave);
                  reject(errSave);
                } else {
                  console.log('Message created.');
                  resolve(createdTodoObject);
                }
              });
            }, (errorPromise) => {
              reject(errorPromise);
            });
          } else {
            const dataMessage = {
              senderId: datoMessage.senderId,
              message: datoMessage.message,
              listMessageId: listMessages._id,
            };
            const message = new MessageDB(dataMessage);
            message.save((errSave, mensajeSaved) => {
              if (errSave) {
                reject(errSave);
              } else {
                resolve(mensajeSaved);
              }
            });
          }
        });
      }
    });
    return this.createMessagePromise;
  }
}
module.exports = MessageDao;
