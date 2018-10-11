var mongoose = require('mongoose');

const bookingsSchema = new mongoose.Schema({
  listing_id: String,
  booker_id: String,
  date_from: String,
  date_to: String
});

module.exports = bookingsSchema
