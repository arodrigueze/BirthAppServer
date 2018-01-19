var nodemailer = require('nodemailer');
var configurationServer = require('../configServer');

class Email {
    constructor() {}
    /*Email class
    this class send emails
    @param receiver
    person's email*/
    sendEmail(receiver) {
        const sendEmailPromise = new Promise((resolve, reject) => {
            var transporter = nodemailer.createTransport({
                service: configurationServer.emailProvider,
                auth: {
                    user: configurationServer.emailUser,
                    pass: configurationServer.emailPass
                }
            });

            var mailOptions = {
                from: configurationServer.emailUser,
                to: receiver,
                subject: configurationServer.subject,
                text: configurationServer.emailMessage
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    reject(error);
                } else {
                    resolve(info);
                }
            });
        });
        return sendEmailPromise;
    };
}
module.exports = Email;