var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var configurationServer = require('../configServer');



router.get('/send', function (req, res, next) {

    var transporter = nodemailer.createTransport({
        service: configurationServer.emailProvider,
        auth: {
            user: configurationServer.emailUser,
            pass: configurationServer.emailPass
        }
    });

    var mailOptions = {
        from: configurationServer.emailUser,
        to: req.query.email,
        subject: configurationServer.subject,
        text: configurationServer.emailMessage
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.send(error);
        } else {
            res.send(info);
        }
    });
});

module.exports = router;