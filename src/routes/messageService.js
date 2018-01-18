var express = require('express');
var router = express.Router();
var validationMessage = require('../utils/validations');
var ListMessagesModelDB = require('../model/listMessagesModel.js');
var MessageDB = require('../model/messageModel.js');
var listMessagesDao = require("../dao/listMessagesDao");

/*This route insert a message, 
create a list messages if not exist
using receiverid 
*/
router.post('/', function (req, res, next) {

    var datoMessage = req.body;
    var validaciones = new validationMessage();

    if (validaciones.isEmptyObject(datoMessage.senderId)) {
        res.json({ "status": "Error: senderId is missing" });
    } else if (validaciones.isEmptyString(datoMessage.senderId)) {
        res.json({ "status": "Error: senderId is empty" });
    } else if (validaciones.isEmptyObject(datoMessage.message)) {
        res.json({ "status": "Error: message is missing" });
    } else if (validaciones.isEmptyString(datoMessage.message)) {
        res.json({ "status": "Error: message is empty" });
    } else if (validaciones.isEmptyObject(datoMessage.receiverId)) {
        res.json({ "status": "Error: receiverId is missing" });
    } else if (validaciones.isEmptyString(datoMessage.receiverId)) {
        res.json({ "status": "Error: receiverId is empty" });
    } else {
          
        ListMessagesModelDB.findOne({ 'receiverId': datoMessage.receiverId }, 'receiverId',function (err, listMessages) {
            if (validaciones.isEmptyObject(listMessages)) {
                uploadMessageIfListMessageNotExist(datoMessage, res);
            } else {
                var dataMessage = {
                    senderId: datoMessage.senderId,
                    message: datoMessage.message,
                    listMessageId: listMessages._id
                }
                var message = new MessageDB(dataMessage);
                message.save(function (err, createdTodoObject) {
                    if (err) {
                        console.log(err);
                        res.send(err);
                    } else {
                        console.log("Message created.");
                        res.send(createdTodoObject);
                    }
                });
            }
        });
    }
});


function uploadMessageIfListMessageNotExist(datoMessage, res) {
    var dataListMessages = {
        printed: "false",
        year: new Date().getFullYear(),
        receiverId: datoMessage.receiverId
    }
    var createlistMessages = new ListMessagesModelDB(dataListMessages);
    createlistMessages.save(function (err, createdTodoObject) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log("List messages created");
            var dataMessage = {
                senderId: datoMessage.senderId,
                message: datoMessage.message,
                listMessageId: createdTodoObject._id
            }
            var message = new MessageDB(dataMessage);
            message.save(function (err, createdTodoObject) {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    console.log("Message created.");
                    res.send(createdTodoObject);
                }
            });
        }
    });
}
module.exports = router;