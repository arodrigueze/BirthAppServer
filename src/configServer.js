var configServer ={};

configServer.mongodbURL = 'mongodb://localhost/birthapp';
configServer.emailProvider = 'gmail';
configServer.emailUser = 'birthdayspecialmessage@gmail.com';
configServer.emailPass = 'birthdayspecialmessage2018';
configServer.subject = 'Recordatorio Cumpleaños';
configServer.emailMessage = 'En PSL nos importa nuestros empleados, vincúlate al servicio de recordatorio de cumpleaños en: https://www.google.com ';

module.exports = configServer;