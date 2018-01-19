var MessageDB = require('../model/messageModel');
var validationMessage = require('../utils/validations');
var ListMessagesModelDB = require('../model/listMessagesModel');
var listMessageDao = require('../dao/listMessagesDao');
class MessageDao {

    constructor() {
        var validacion = new validationMessage();
    }

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

    createMessage(datoMessage,receiverId) { 
        var validaciones = new validationMessage();
        const createMessagePromise = new Promise((resolve, reject) => {
            if (validaciones.isEmptyObject(datoMessage.senderId)) {
                reject({ "status": "Error: senderId is missing" });
            } else if (validaciones.isEmptyString(datoMessage.senderId)) {
                reject({ "status": "Error: senderId is empty" });
            } else if (validaciones.isEmptyObject(datoMessage.message)) {
                reject({ "status": "Error: message is missing" });
            } else if (validaciones.isEmptyString(datoMessage.message)) {
                reject({ "status": "Error: message is empty" });
            } else if (validaciones.isEmptyObject(receiverId)) {
                reject({ "status": "Error: receiverId is missing" });
            } else if (validaciones.isEmptyString(receiverId)) {
                reject({ "status": "Error: receiverId is empty" });
            } else if (receiverId.localeCompare(datoMessage.senderId) == 0) {
                reject({ "status": "Error: Can't send message to self" });
            } else {
                ListMessagesModelDB.findOne({ 'receiverId': receiverId }, 'receiverId', function (err, listMessages) {  
                    if (validaciones.isEmptyObject(listMessages)) {
                        var listmessagedao = new listMessageDao().createListMessages(receiverId).then(function(result){
                            var dataMessage = {
                                senderId: datoMessage.senderId, 
                                message: datoMessage.message,
                                listMessageId: result._id
                            }
                            var message = new MessageDB(dataMessage);
                            message.save(function (err, createdTodoObject) {
                                if (err) {
                                    console.log(err);
                                    reject(err);
                                } else {
                                    console.log("Message created.");
                                    resolve(createdTodoObject);
                                }
                            });
                        },function(err){
                            reject(err);
                        });
                    } else {
                        var dataMessage = {
                            senderId: datoMessage.senderId,
                            message: datoMessage.message,
                            listMessageId: listMessages._id
                        }
                        var message = new MessageDB(dataMessage);
                        message.save(function (err, mensajeSaved) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(mensajeSaved);
                            }
                        });
                    }
                });
            }
        });
        return createMessagePromise;
    };
}
module.exports = MessageDao;