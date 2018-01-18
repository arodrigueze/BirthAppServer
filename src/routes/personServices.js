var express = require('express');
var router = express.Router();
var PersonORM = require('../model/personModel');
var personDao = require("../dao/personDao");
/* End point create person*/
router.post('/', function (req, res, next) {

    var datoPerson = req.body;

    var dataPerson = {
        email: datoPerson.email,
        name: datoPerson.name,
        birthdate: datoPerson.birthdate,
        teamId: datoPerson.teamId,
        subscribed: "false"
    }

    var person = new PersonORM(dataPerson);

    person.save(function (err, createdTodoObject) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log("Person created on db");
            res.send(createdTodoObject);
        }
    });
});

/* End point list person*/
router.get('/', function (req, res, next) {

    console.log("Inicio promise");
    var pd = new personDao();
    var promise = pd.getPersonByEmail("q@q.com");
    promise.then(function (result) {
        console.log(result);
    }, function (err) {
        console.log(err);
    });
    
    PersonORM.find(function (err, persons) {
        if (err) {
            
            res.status(500).send(err)
        } else {
            
            res.send(persons);
        }
    });
});

module.exports = router;
