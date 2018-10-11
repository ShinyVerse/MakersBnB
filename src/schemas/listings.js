var mongoose = require('mongoose');

const listingsSchema = new mongoose.Schema({
  owner_id: String,
  address: String,
  no_beds: Integer
});

module.exports = listingsSchema
