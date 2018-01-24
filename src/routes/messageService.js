const express = require('express');

const router = express.Router();
const ValidationMessage = require('../utils/validations');
const MessageDB = require('../model/messageModel.js');


/* This route list a message,
using listMessageId
*/
router.get('/', (req, res) => {
  const validaciones = new ValidationMessage();
  if (validaciones.isEmptyObject(req.query._id)) {
    res.status(500).json({ status: 'Error: _id parameter is missing in body' });
  } else if (validaciones.isEmptyString(req.query._id)) {
    res.status(500).json({ status: 'Error: _id is empty' });
  } else {
    MessageDB.find({ listMessageId: req.query._id }, (err, mensajes) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(mensajes);
      }
    });
  }
});


module.exports = router;
