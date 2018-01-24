const nodemailer = require('nodemailer');
const configurationServer = require('../configServer');

class Email {
  /* Email class
    this class send emails
    @param receiver
    person's email */
  sendEmail(receiver) {
    this.sendEmailPromise = new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        service: configurationServer.emailProvider,
        auth: {
          user: configurationServer.emailUser,
          pass: configurationServer.emailPass,
        },
      });

      const mailOptions = {
        from: configurationServer.emailUser,
        to: receiver,
        subject: configurationServer.subject,
        text: configurationServer.emailMessage,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
    return this.sendEmailPromise;
  }
}
module.exports = Email;
