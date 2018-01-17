var express = require('express');
var router = express.Router();
var emailSender = require('../utils/email');

router.post('/', function (req, res, next) {
    var email = new emailSender();
    email.sendEmail(req.body.email, function (status) {
        if (status) {
            console.log("email send " + status);
            res.json({ "status": "email sent successfully" });
        }
        else {
            console.log("email send " + status);
            res.json({ "status": "Error sending email" });
        }
    });
});

module.exports = router;