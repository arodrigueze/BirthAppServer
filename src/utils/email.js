var nodemailer = require('nodemailer');
var configurationServer = require('../configServer');
var validation = require('../utils/validations');
var validacion;
/*Validation constructor */
function Email() {
    validacion = new validation();
}

/*Validate if empty string*/
Email.prototype.sendEmail = function (receiver,callback) {

    if (validacion.isEmptyString(receiver)) {
        console.log("No email on parameter");
        callback(false);
    }
    else {
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
                console.log(error);
                console.log("Error sending email");
                callback(false);
            } else {
                console.log(info);
                console.log("Email sent ok");
                callback(true);
            }
        });
    }

};

module.exports = Email;