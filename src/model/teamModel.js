const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema({
  name: String,
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
