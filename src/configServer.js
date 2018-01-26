const configServer = {};

// configServer.mongodbURL = 'mongodb://localhost/birthapp';
configServer.mongodbURL = 'mongodb://birthuser:birthuser@ds115758.mlab.com:15758/heroku_dpsccprq';
configServer.emailProvider = 'gmail';
configServer.emailUser = 'birthdayspecialmessage@gmail.com';
configServer.emailPass = 'birthdayspecialmessage2018';
configServer.subject = 'Recordatorio Cumpleaños';
configServer.emailMessage = 'En PSL nos importa nuestros empleados, vincúlate al servicio de recordatorio de cumpleaños en: https://www.google.com ';

module.exports = configServer;
