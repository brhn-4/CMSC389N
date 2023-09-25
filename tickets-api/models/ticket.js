// Define ticket model in this file -
//
// - you will define schema and also export the model (see authorApp)
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema(
    {
      title: { type: String, required: true},
      author: { type: String, required: true},
      type: { type: String, required: true},
      dueDate: { type: String, required: true},
      assignedTo: { type: String, required: false},
      status: { type: String, required: true},
      
    }
  );
  
  module.exports = mongoose.model('Ticket', ticketSchema);
