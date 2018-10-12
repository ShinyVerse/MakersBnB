var mongoose = require('mongoose');
var userSchema = require('./schemas/users')

function Connection(mongoose, schemas) {
  this.mongoose = mongoose;
  this.schemas = schemas; // looks like [{name:'user', schema:schema], ['listings', listingSchema]]
  this.models = {};
  this.compileSchemas();
  this.connect();
}

Connection.prototype.compileSchemas = function() {
  for (i = 0; i < this.schemas.length; i += 1) {
    this.models[this.schemas[i].name] =
      this.mongoose.model(this.schemas[i].name, this.schemas[i].schema)
  }
}

Connection.prototype.connect = function() {
  if (process.env.NODE_ENV === "test") {
    this.mongoose.connect('mongodb://localhost/MakersBnB_test', { useNewUrlParser: true })
  } else {
    this.mongoose.connect('mongodb://localhost/MakersBnB', { useNewUrlParser: true })
  }
}

Connection.prototype.disconnect = function() {
  if (this.mongoose.connection.readyState === 1) {
    this.mongoose.connection.close()
  }
}

Connection.prototype.create = function(modelName, data) {
  const model = this.models[modelName]
  const newDocument = new model(data);
  newDocument.save((err) => {
    if (err) {
      console.log('Error occurred')
    }
  });
}

Connection.prototype.read = function(modelName, data = {}) {
  const model = this.models[modelName]
  return model.find(data)
}

Connection.prototype.update = function(modelName, id, data) {
  const model = this.models[modelName]
  model.findOneAndUpdate({_id: id}, data, {new: true}, (err, res) => {
    if (err) {
      console.log('Error occurred')
    }
  })
}

Connection.prototype.delete = function(modelName, id) {
  const model = this.models[modelName]
  model.findOneAndDelete({_id: id}, (err, res) => {})
}

module.exports = Connection;
