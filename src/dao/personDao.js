const personDB = require('../model/personModel');

class PersonDao {
  getPersonByEmail(personEmail) {
    this.getPersonByEmailPromise = new Promise((resolve, reject) => {
      personDB.findOne({ email: personEmail }, (err, personFound) => {
        if (err) {
          reject(err);
        } else {
          resolve(personFound);
        }
      });
    });
    return this.getPersonByEmailPromise;
  }

  getPersonById(personId) {
    this.getPersonByEmailPromise = new Promise((resolve, reject) => {
      personDB.findOne({ _id: personId }, (err, personFound) => {
        if (err) {
          reject(err);
        } else {
          resolve(personFound);
        }
      });
    });
    return this.getPersonByEmailPromise;
  }


  updateStateById(personId) {
    this.updateStateByIdPromise = new Promise((resolve, reject) => {
      personDB.findByIdAndUpdate(personId, { $set: { subscribed: true } }, (err, person) => {
        if (err) reject(err);
        resolve(person);
      });
    });
    return this.updateStateByIdPromise;
  }
}

module.exports = PersonDao;
