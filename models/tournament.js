// Dependencies 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const tournamentSchema = Schema({
  name: { type: String },
  date: { type: String },
  address: { type: String },
  rules: { type: String },
  numberOfParticipants: { type: Number },
  participants:{ type: String },
  openToPublic: { type: String },
});

// User Model
const Tournament = mongoose.model('Tournament', tournamentSchema);

// Export User Model
module.exports = Tournament;