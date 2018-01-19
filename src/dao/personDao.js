var personDB = require('../model/personModel');

class PersonDao {
    constructor() { }
    
    getPersonByEmail(personEmail) {
        const getPersonByEmailPromise = new Promise((resolve, reject) => {
            personDB.findOne({ 'email': personEmail }, function (err, personFound) {
                if (err) {
                    reject(err);
                } else {
                    resolve(personFound);
                }
            });
        });
        return getPersonByEmailPromise;
    };

    getPersonById(personId) {
        const getPersonByEmailPromise = new Promise((resolve, reject) => {
            personDB.findOne({ '_id': personId }, function (err, personFound) {
                if (err) {
                    reject(err);
                } else {
                    resolve(personFound);
                }
            });
        });
        return getPersonByEmailPromise;
    };

    
    updateStateById(personId) {
        const updateStateByIdPromise = new Promise((resolve, reject) => {
            personDB.findOne({ '_id': personId }, function (err, person) {
                person.subscribed = "true";
                person.save(function (err, personSaved) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(personSaved);
                    }
                });
            });
        });
        return updateStateByIdPromise;
    };
}

module.exports = PersonDao;