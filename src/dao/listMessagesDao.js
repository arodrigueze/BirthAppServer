var nodemailer = require('nodemailer');
var configurationServer = require('../configServer');
var validation = require('../utils/validations');
var ListMessageDB = require('../model/listMessagesModel.js');

/*Validation constructor */
function ListMessagesDao() {
}

/*REturn messages by listMessagesId*/
ListMessagesDao.prototype.createListMessages = function (receiverIdIn, callback) {
   
    var dataListMessages = {
        printed: "false",
        year: new Date().getFullYear(),
        receiverId: receiverIdIn
    }

    var listMessages = new ListMessageDB(dataListMessages);

    listMessages.save(function (err, createdTodoObject) {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            console.log("Person created on db");
            callback(createdTodoObject);
        }
    });
};

module.exports = ListMessagesDao;