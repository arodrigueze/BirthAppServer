const PersonDB = require('../model/personModel');
const mongoose = require('mongoose');

class PersonDao {
/* Method for create person
    @param personEmail
    jsonObject that contains modelAttributes
    with data
    */
  createPerson(personData) {
    const person = new PersonDB(personData);
    this.createPersonPromise = new Promise((resolve, reject) => {
      person.save((err, personCreated) => {
        if (err) {
          reject(err);
        } else {
          resolve(personCreated);
        }
      });
    });
    return this.createPersonPromise;
  }

  /* Method for get people
     */
  getPeople() {
    this.getPeoplePromise = new Promise((resolve, reject) => {
      PersonDB.find({}, (errorFind, people) => {
        if (errorFind) {
          reject(errorFind);
        } else {
          resolve(people);
        }
      });
    });
    return this.getPeoplePromise;
  }

  /* Method for get person by email
    @param personEmail
    email of person to found on db
    */
  getPersonByEmail(personEmail) {
    this.getPersonByEmailPromise = new Promise((resolve, reject) => {
      PersonDB.findOne({ email: personEmail }, (err, personFound) => {
        if (err) {
          reject(err);
        } else {
          resolve(personFound);
        }
      });
    });
    return this.getPersonByEmailPromise;
  }

  /* Method for get person by id
    @param personId
    id of person stored on db
    this id is assigned automatically by db
    */
  getPersonById(personId) {
    const objectIdPersonId = mongoose.mongo.ObjectID(personId);
    this.getPersonByEmailPromise = new Promise((resolve, reject) => {
      PersonDB.findOne({ _id: objectIdPersonId }, (err, personFound) => {
        if (err) {
          reject(err);
        } else {
          resolve(personFound);
        }
      });
    });
    return this.getPersonByEmailPromise;
  }

  /* Method for update state of person
    @param personId
    id of person stored on db
    this id is assigned automatically by db
    */
  updateStateById(personId) {
    this.updateStateByIdPromise = new Promise((resolve, reject) => {
      PersonDB.findByIdAndUpdate(personId, { $set: { subscribed: true } }, (err, person) => {
        if (err) reject(err);
        resolve(person);
      });
    });
    return this.updateStateByIdPromise;
  }

  /* Method for update addressBot of person
    @param personId
    addressBot is the address generated
    by the bot when a user is on a
    conversation
    */
  updateAddressBotById(personId, addressBotData) {
    this.updateAddressBotByIdPromise = new Promise((resolve, reject) => {
      PersonDB.findByIdAndUpdate(personId, {
        $set: { addressBot: addressBotData },
      }, (err, person) => {
        if (err) reject(err);
        resolve(person);
      });
    });
    return this.updateAddressBotByIdPromise;
  }
}

module.exports = PersonDao;
