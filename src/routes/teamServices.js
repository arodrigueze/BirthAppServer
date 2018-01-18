var express = require('express');
var router = express.Router();
var TeamDB = require('../model/teamModel.js');
var validationTeam = require('../utils/validations');

/* End point create team*/
router.post('/', function (req, res, next) {

    var datoTeam = req.body;

    var validaciones = new validationTeam();


    if (validaciones.isEmptyString(datoTeam.name)) {
        res.json({ "status": "El equipo esta vacio." });
    }
    else {
        var normalizedTeam = validaciones.normalizeTeamName(datoTeam.name);
        TeamDB.findOne({ 'name': normalizedTeam }, 'name', function (err, team) {
            if (err) {
                res.json({ "status": "Error: al acceder a la base de datos, intenta nuevamente." });
            }
            else {
                if (!validaciones.isEmptyObject(team)) {
                    res.json({ "status": "Error: El equipo ya se encuentra registrado." });
                }
                else {
                    var dataTeam = {
                        name: normalizedTeam
                    }
                    var team = new TeamDB(dataTeam);
                    team.save(function (err, createdTodoObject) {
                        if (err) {
                            console.log(err);
                            res.send(err);
                        } else {
                            console.log("Team created ok");
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
            res.status(500).send(err)
        } else {
            res.send(teams);
        }
    });
});

module.exports = router;