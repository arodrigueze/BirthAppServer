var validation = require('../utils/validations');
var personDB = require('../model/personModel.js');

/*Validation constructor */
function PersonDao() {
}

/*Return messages by listMessagesId*/
PersonDao.prototype.getPersonByEmail = function (personEmail) {

    const getPersonByEmailPromise = new Promise((resolve, reject) => {
        personDB.findOne({ 'email': personEmail }, function (err, createdTodoObject) {
                if (err) {
                    reject(err);
                } else {
                    resolve(createdTodoObject);
                }
            });
    });
    return getPersonByEmailPromise;
};

/*Return messages by listMessagesId*/
PersonDao.prototype.updateStateById = function (personId) {

    personDB.findOne(
        { '_id': personId },
        '_id',
        function (err, person) {
            person.subscribed = "true";
            person.save(function (err, createdTodoObject) {
                if (err) {
                    console.log(err);

                } else {
                    console.log("Person updated");
                    console.log(createdTodoObject);
                }
            });
        });
};

module.exports = PersonDao;