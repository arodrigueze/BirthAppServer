var express = require('express');
var router = express.Router();
var TeamDB = require('../model/teamModel.js');
var validationTeam = require('../utils/validations');

/* End point create team*/
router.get('/create', function (req, res, next) {
    
    var datoTeam = req.query;
    
    var validaciones = new validationTeam();
    

    if (validaciones.isEmptyString(datoTeam.name)) res.json({ "status": "El equipo esta vacio." });
    else {

        var normalizedTeam = validaciones.normalizeTeamName(datoTeam.name);
        TeamDB.findOne({ 'nameTeam': normalizedTeam }, 'nameTeam', function (err, team) {
            if (err) res.json({ "status": "Error al acceder a la base de datos, intenta nuevamente." });
            else {
                if (!validaciones.isEmptyObject(team)) res.json({ "status": "El equipo ya se encuentra registrado." });
                else {
                    var dataTeam = {
                        nameTeam: normalizedTeam
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

module.exports = router;