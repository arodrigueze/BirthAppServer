var express = require('express');
var router = express.Router();
var PersonORM = require('../model/personModel.js');

/* End point create person*/
router.get('/create', function (req, res, next) {
   
    var datoPerson = req.query;

    var dataPerson = {
        emailPerson: datoPerson.email,
        namePerson: datoPerson.name,
        birthdatePerson: datoPerson.birthdate
    }

    var person = new PersonORM(dataPerson);

    person.save(function (err, createdTodoObject) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log("Creado con exito");
            res.send(createdTodoObject);
        }
    });
});

module.exports = router;
