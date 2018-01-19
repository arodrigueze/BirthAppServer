var express = require('express');
var router = express.Router();
var PersonORM = require('../model/personModel');
var personDao = require("../dao/personDao");
var teamDao = require("../dao/teamDao");
var messageDao = require("../dao/messageDao");
var validationPerson = require('../utils/validations');

/* End point create person*/
router.post('/', function (req, res, next) {

    var validaciones = new validationPerson();
    var datoPerson = req.body;

    if (validaciones.isEmptyObject(datoPerson.email)) {
        res.json({ "status": "Email parameter not exist" });
    } else if (validaciones.isEmptyObject(datoPerson.name)) {
        res.json({ "status": "Name parameter not exist" });
    } else if (validaciones.isEmptyObject(datoPerson.birthdate)) {
        res.json({ "status": "Birthdate parameter not exist" });
    } else if (validaciones.isEmptyObject(datoPerson.teamId)) {
        res.json({ "status": "TeamId parameter not exist" });
    } else if (validaciones.isEmptyString(datoPerson.email)) {
        res.json({ "status": "Email parameter is empty" });
    } else if (validaciones.isEmptyString(datoPerson.name)) {
        res.json({ "status": "Name parameter is empty" });
    } else if (validaciones.isEmptyString(datoPerson.birthdate)) {
        res.json({ "status": "Birthdate parameter is empty" });
    } else if (validaciones.isEmptyString(datoPerson.teamId)) {
        res.json({ "status": "TeamId parameter is empty" });
    } else  {
        var teamdao = new teamDao().getTeamById(datoPerson.teamId).then(function (result) {
            if (validaciones.isEmptyObject(result)) {
                res.json({ "status": "Error: Team Id not exist." });
            } else {
                console.log("Team found-------------", result);
                var dataPerson = {
                    email: datoPerson.email,
                    name: datoPerson.name,
                    birthdate: datoPerson.birthdate,
                    teamId: datoPerson.teamId,
                    skypeId: "",
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
            }
        }, function (err) {
            console.log("Errores team");
            res.send(err);
        });
    }
});

/* End point list person*/
router.get('/', function (req, res, next) {
    PersonORM.find(function (err, persons) {
        if (err) {
            res.send(err)
        } else {
            res.send(persons);
        }
    });
});

module.exports = router;
