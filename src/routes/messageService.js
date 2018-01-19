var express = require('express');
var router = express.Router();
var validationMessage = require('../utils/validations');
var ListMessagesModelDB = require('../model/listMessagesModel.js');
var MessageDB = require('../model/messageModel.js');
var listMessagesDao = require("../dao/listMessagesDao");

/*This route list a message, 
using receiverId
*/
router.get('/', function (req, res, next) {
    var validaciones = new validationMessage();
    if (validaciones.isEmptyObject(req.query._id)) {
        res.json({ "status": "Error: _id is missing" });
    } else if (validaciones.isEmptyString(req.query._id)) {
        res.json({ "status": "Error: _id is empty" });
    } else{
        MessageDB.find({ 'listMessageId': req.query._id },function (err, mensajes) {
            if (err) {
                res.status(500).send(err)
            } else {
                res.send(mensajes);
            }
        });
    }   
});


module.exports = router;