const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = Schema({
    name: { type: String },
    message: { type: String },
  });
  
  // User Model
  const Message = mongoose.model('Message', messageSchema);
  
  // Export User Model
  module.exports = Message;