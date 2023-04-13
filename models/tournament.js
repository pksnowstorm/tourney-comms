// Dependencies 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const tournamentSchema = Schema({
  name: { type: String },
  organizerName: { type: String },
  organizerEmail: { type: String},
  startDate: { type: String },
  endDate: { type: String },
  time: { type: String },
  address: { type: String },
  rules: { type: String },
  numberOfParticipants: { type: Number },
  participants:{ type: String },
  openToPublic: Boolean,
});

// User Model
const Tournament = mongoose.model('Tournament', tournamentSchema);

// Export User Model
module.exports = Tournament;