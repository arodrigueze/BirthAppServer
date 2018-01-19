var express = require('express');
var router = express.Router();
var validationMessage = require('../utils/validations');
var PersonDB = require('../model/personModel');
var ListMessagesDB = require('../model/listMessagesModel');
var MessagesDB = require('../model/messageModel');

router.get('/', function (req, res, next) {
    var datoListMessage = req.body;
    var validaciones = new validationMessage();

    var listMessageWithPersonNameJson = { "listMessagesData": [] };
    ListMessagesDB.find(function (err, listMessages) {
        if (err) {
            res.status(500).send(err)
        } else {
            PersonDB.find(function (err, person) {
                if (err) {
                    res.status(500).send(err)
                } else {
                    for (var i in listMessages) {
                        var listMessageWithPersonName = { "_id": "", "printed": "", "year": "", "receiverId": "", "name": "" };
                        listMessageWithPersonName._id = listMessages[i]._id;
                        listMessageWithPersonName.printed = listMessages[i].printed;
                        listMessageWithPersonName.year = listMessages[i].year;
                        listMessageWithPersonName.receiverId = listMessages[i].receiverId;
                        for (var j in person) {
                            if (listMessages[i].receiverId.localeCompare(person[j]._id) == 0) {
                                console.log(listMessages[i], person[j].name);
                                listMessageWithPersonName.name = person[j].name;
                            }
                        }
                        listMessageWithPersonNameJson.listMessagesData.push(listMessageWithPersonName);
                    }
                    res.send(listMessageWithPersonNameJson.listMessagesData);
                }
            });
        }
    });
});

module.exports = router;