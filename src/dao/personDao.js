var validation = require('../utils/validations');
var personDB = require('../model/personModel.js');

/*Validation constructor */
function PersonDao() {
}

/*REturn messages by listMessagesId*/
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