const teamDb = require('../model/teamModel');
const mongoose = require('mongoose');

class TeamDao {
  /* Return team by id */
  getTeamById(teamId) {
    this.getTeamByIdPromise = new Promise((resolve, reject) => {
      const objectIdTeamId = mongoose.mongo.ObjectID(teamId);
      teamDb.findOne({ _id: objectIdTeamId }, (err, teamFound) => {
        if (err) {
          reject(err);
        } else {
          resolve(teamFound);
        }
      });
    });
    return this.getTeamByIdPromise;
  }
}

module.exports = TeamDao;
