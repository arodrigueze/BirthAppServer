var express = require('express');
var router = express.Router();
var TeamDB = require('../model/teamModel');
var validationTeam = require('../utils/validations');

/* End point create team
param req.body.name
name of the team*/
router.post('/', function (req, res, next) {

    var datoTeam = req.body;
    var validaciones = new validationTeam();

    if (validaciones.isEmptyObject(datoTeam.name)) {
        res.json({ "status": "Incorrect parameter" });
    } else if (validaciones.isEmptyString(datoTeam.name)) {
        res.json({ "status": "Team is empty" });
    }
    else {
        var normalizedTeam = validaciones.normalizeTeamName(datoTeam.name);
        TeamDB.findOne({ 'name': normalizedTeam }, 'name', function (err, team) {
            if (err) {
                res.json({ "status": "Error: Data base error." });
            }
            else {
                if (!validaciones.isEmptyObject(team)) {
                    res.json({ "status": "Error: Team is already on db" });
                }
                else {
                    var dataTeam = {
                        name: normalizedTeam
                    }
                    var team = new TeamDB(dataTeam);
                    team.save(function (err, createdTodoObject) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.send(createdTodoObject);
                        }
                    });
                }
            }
        });
    }
});

/* End point list team*/
router.get('/', function (req, res, next) {
    TeamDB.find(function (err, teams) {
        if (err) {
            res.send(err)
        } else {
            res.send(teams);
        }
    });
});

module.exports = router;