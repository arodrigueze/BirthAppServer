const express = require('express');

const router = express.Router();
const PersonDB = require('../model/personModel');
const MessageDB = require('../model/messageModel');
const ListMessagesDB = require('../model/listMessagesModel');
const Validations = require('../utils/validations');

router.get('/', (req, res) => {
  const listMessageWithPersonNameJson = { listMessagesData: [] };
  ListMessagesDB.find({}, (errorListMessagesDb, listMessages) => {
    if (errorListMessagesDb) {
      res.status(500).send(errorListMessagesDb);
    } else {
      PersonDB.find({}, (errorFind, person) => {
        if (errorFind) {
          res.status(500).send(errorFind);
        } else {
          Object.entries(listMessages).forEach(([, value]) => {
            const listMessageWithPersonName = {
              _id: '', printed: '', year: '', receiverId: '', name: '',
            };
            listMessageWithPersonName._id = value._id;
            listMessageWithPersonName.printed = value.printed;
            listMessageWithPersonName.year = value.year;
            listMessageWithPersonName.receiverId = value.receiverId;
            Object.entries(person).forEach(([, value1]) => {
              if (value.receiverId.localeCompare(value1._id) === 0) {
                listMessageWithPersonName.name = value1.name;
              }
            });
            listMessageWithPersonNameJson.listMessagesData.push(listMessageWithPersonName);
          });
          res.send(listMessageWithPersonNameJson.listMessagesData);
        }
      });
    }
  });
});

router.get('/:_id/messages', (req, res) => {
  const validaciones = new Validations();
  if (validaciones.isEmptyObject(req.params._id)) {
    res.status(500).json({ status: 'Error: _id parameter is missing in body' });
  } else if (validaciones.isEmptyString(req.params._id)) {
    res.status(500).json({ status: 'Error: _id is empty' });
  } else {
    MessageDB.find({ listMessageId: req.params._id }, (err, mensajes) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(mensajes);
      }
    });
  }
});

router.put('/', (req, res) => {
  const datoListMessage = req.body;
  ListMessagesDB.findByIdAndUpdate(
    datoListMessage._id, {
      $set: { printed: datoListMessage.printed },
    },
    (err, listMessagesUpdate) => {
      if (err) res.status(500).send(err);
      res.send(listMessagesUpdate);
    },
  );
});
module.exports = router;
