var nodemailer = require('nodemailer');
var configurationServer = require('../configServer');
var validation = require('../utils/validations');
var ListMessageDB = require('../model/listMessagesModel.js');

/*Validation constructor */
function ListMessagesDao() {
}

/*REturn messages by listMessagesId*/
ListMessagesDao.prototype.createListMessages = function (receiverIdIn) {
   
    var dataListMessages = {
        printed: "false",
        year: new Date().getFullYear(),
        receiverId: receiverIdIn
    }

    var listMessages = new ListMessageDB(dataListMessages);
    // pending, fulfilled, rejected
    const savePromise = new Promise((resolve, reject) => {
      istMessages.save(function (err, createdTodoObject) {
        if (err) {
            console.log(err);
            reject(err);
        } else {
            console.log("Person created on db");
            resolve(createdTodoObject);
        }
      });
    
    });

    return savePromise;
};

module.exports = ListMessagesDao;
