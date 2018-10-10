var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const listingSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});


function Connection(mongoose, schemas) {
  this.mongoose = mongoose;
  this.schemas = schemas; // looks like [{name:'user', schema:schema], ['listings', listingSchema]]
  this.models = {};
  this.compileSchemas();
}

Connection.prototype.compileSchemas = function() {
  for (i = 0; i < this.schemas.length; i += 1) {
    this.models[this.schemas[i].name] =
      this.mongoose.model(this.schemas[i].name, this.schemas[i].schema)
  }
}

Connection.prototype.connect = function() {
  if (process.env.NODE_ENV === "test") {
    this.mongoose.connect('mongodb://localhost/MakersBnB_test');
  } else {
    this.mongoose.connect('mongodb://localhost/MakersBnB');
  }
}

Connection.prototype.disconnect = function() {
  if (this.mongoose.connection.readyState === 1) {
    this.mongoose.connection.close()
  }
}

Connection.prototype.create = function(modelName, data) {
  let newDocument = new modelName(data);
  this.connect();
  newDocument.save();
  this.disconnect();
}

Connection.prototype.read = function(model, data) {
  this.connect();
  model.find((err, users) => {
        return users;
  })
  this.disconnect();
}

Connection.prototype.update = function(model, data) {

}

Connection.prototype.delete = function(model, data) {

}

let conn = new Connection(mongoose, [{ 'name': 'Users', 'schema': userSchema }])


conn.create('Users', { 'name': 'Billy', 'email': 'billy@mail.co.uk', 'password': 'whofiew'})


module.exports = Connection;
