const express = require('express');

const router = express.Router();
const PersonORM = require('../model/personModel');
const TeamDao = require('../dao/teamDao');
const PersonDao = require('../dao/personDao');
const Validations = require('../utils/validations');

/* End point create person */
router.post('/', (req, res) => {
  const datoPerson = req.body;
  const validation = new Validations();
  if (validation.isEmptyObject(datoPerson.email)) {
    res.status(500).json({ status: 'Email parameter is not inside the body request' });
  } else if (validation.isEmptyObject(datoPerson.name)) {
    res.status(500).json({ status: 'Name parameter is not inside the body request' });
  } else if (validation.isEmptyObject(datoPerson.birthdate)) {
    res.status(500).json({ status: 'Birthdate parameter is not inside the body request' });
  } else if (validation.isEmptyObject(datoPerson.teamId)) {
    res.status(500).json({ status: 'TeamId parameter is not inside the body request' });
  } else if (validation.isEmptyString(datoPerson.email)) {
    res.status(500).json({ status: 'Email parameter is empty' });
  } else if (validation.isEmptyString(datoPerson.name)) {
    res.status(500).json({ status: 'Name parameter is empty' });
  } else if (validation.isEmptyString(datoPerson.birthdate)) {
    res.status(500).json({ status: 'Birthdate parameter is empty' });
  } else if (validation.isEmptyString(datoPerson.teamId)) {
    res.status(500).json({ status: 'TeamId parameter is empty' });
  } else {
    this.teamdao = new TeamDao().getTeamById(datoPerson.teamId).then((result) => {
      if (validation.isEmptyObject(result)) {
        res.status(500).json({ status: 'Error: Team Id not exist.' });
      } else {
        const dataPerson = {
          email: datoPerson.email,
          name: datoPerson.name,
          birthdate: datoPerson.birthdate,
          teamId: datoPerson.teamId,
          addressBot: '',
          subscribed: false,
        };
        this.persondao = new PersonDao().createPerson(dataPerson).then((personCreated) => {
          res.send(personCreated);
        }, (error) => {
          res.status(500).send(error);
        });
      }
    }, (err) => {
      res.status(500).send(err);
    });
  }
});

/* End point list person */
router.get('/', (req, res) => {
  PersonORM.find({}, (err, persons) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(persons);
    }
  });
});

module.exports = router;
