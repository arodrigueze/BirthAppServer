var teamDb = require('../model/teamModel');
var mongoose = require("mongoose");
class TeamDao {
    constructor() {}

    /*Return team by id*/
    getTeamById(teamId) {
        const getTeamByIdPromise = new Promise((resolve, reject) => {
            var objectIdTeamId = mongoose.mongo.ObjectID(teamId);
            teamDb.findOne({'_id':objectIdTeamId}, function (err, teamFound) {
                if (err) {
                    reject(err);
                } else {
                    resolve(teamFound);
                }
            });
        });
        return getTeamByIdPromise;
    };
}

module.exports = TeamDao;