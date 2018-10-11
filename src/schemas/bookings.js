var mongoose = require('mongoose');

const bookingsSchema = new mongoose.Schema({
  booker_id: String,
  owner_id: String,
  date_from: String,
  date_to: String
});

module.exports = bookingsSchema
