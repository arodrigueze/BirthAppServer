var express = require('express');
var router = express.Router();
var validationMessage = require('../utils/validations');
var PersonDB = require('../model/personModel.js');
var ListMessagesDB = require('../model/listMessagesModel.js');

router.get('/', function (req, res, next) {
    var datoListMessage = req.body;
    var validaciones = new validationMessage();

    if (validaciones.isEmptyObject(datoListMessage.receiverId)) {
        res.json({ "status": "Error: receiverId is missing" });
    } else if (validaciones.isEmptyString(datoListMessage.receiverId)) {
        res.json({ "status": "Error: receiverId is empty" });
    } else {
        ListMessagesDB.find({ '_id': datoListMessage.receiverId },function (err, listMessage) {
            if (err) {
                res.status(500).send(err)
            } else {
                res.send(listMessage);
            }
        });
    }
});

module.exports = router;