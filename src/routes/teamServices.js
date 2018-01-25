const express = require('express');

const router = express.Router();
const TeamDB = require('../model/teamModel');
const ValidationTeam = require('../utils/validations');

/* End point create team
param req.body.name
name of the team */
router.post('/', (req, res) => {
  const datoTeam = req.body;
  const validaciones = new ValidationTeam();

  if (validaciones.isEmptyObject(datoTeam.name)) {
    res.status(500).json({ status: 'The parameter is not inside the body request' });
  } else if (validaciones.isEmptyString(datoTeam.name)) {
    res.status(500).json({ status: 'Team is empty' });
  } else {
    const normalizedTeam = validaciones.normalizeTeamName(datoTeam.name);
    TeamDB.findOne({ name: normalizedTeam }, 'name', (errorFindTeam, team) => {
      if (errorFindTeam) {
        res.status(500).send(errorFindTeam);
      } else if (!validaciones.isEmptyObject(team)) {
        res.status(500).json({ status: 'Error: Team is already on db' });
      } else {
        const dataTeam = {
          name: normalizedTeam,
        };
        const teamSave = new TeamDB(dataTeam);
        teamSave.save((err, savedTeam) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.send(savedTeam);
          }
        });
      }
    });
  }
});

/* End point list team */


router.get('/', (req, res) => {
  TeamDB.find({}, (errorFind, teams) => {
    if (errorFind) {
      res.status(500).send(errorFind);
    } else {
      res.send(teams);
    }
  });
});

module.exports = router;
