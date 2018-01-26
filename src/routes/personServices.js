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
  } else if (validation.isEmptyObject(datoPerson.team._id)) {
    res.status(500).json({ status: 'TeamId parameter is not inside the body request' });
  } else if (validation.isEmptyString(datoPerson.email)) {
    res.status(500).json({ status: 'Email parameter is empty' });
  } else if (validation.isEmptyString(datoPerson.name)) {
    res.status(500).json({ status: 'Name parameter is empty' });
  } else if (validation.isEmptyString(datoPerson.birthdate)) {
    res.status(500).json({ status: 'Birthdate parameter is empty' });
  } else if (validation.isEmptyString(datoPerson.team._id)) {
    res.status(500).json({ status: 'TeamId parameter is empty' });
  } else {
    this.teamdao = new TeamDao().getTeamById(datoPerson.team._id).then((result) => {
      if (validation.isEmptyObject(result)) {
        res.status(500).json({ status: 'Error: Team Id not exist.' });
      } else {
        const dataPerson = {
          email: datoPerson.email,
          name: datoPerson.name,
          birthdate: datoPerson.birthdate,
          teamId: datoPerson.team._id,
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

/* End point list people */
router.get('/', (req, res) => {
  const personsInJson = [];
  const teamsInJson = { teams: [] };
  const promises = [];

  this.persondao = new PersonDao().getPeople().then(people => {
    Object.entries(people).forEach(([, personData]) => {
      const person = {
        _id: '', email: '', name: '', birthdate: '', team: {_id:'',name:''}, teamId:''
      };
      person._id = personData._id;
      person.email = personData.email;
      person.name = personData.name;
      person.birthdate = personData.birthdate;
      person.teamId = personData.teamId;
      promises.push(new TeamDao().getTeamById(personData.teamId));
      personsInJson.push(person);
    });

    Promise.all(promises).then(function(values) {
      
      Object.entries(personsInJson).forEach(([key, personData]) => {
        personsInJson[key].team._id=values[key]._id;
        personsInJson[key].team.name=values[key].name;
      });
      res.send(personsInJson);
    });
  },
  error=>{
    res.status(500).send(error);
  });
});

module.exports = router;
