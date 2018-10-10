var mongoose = require('mongoose');

function Connection(database) {
  this.database = database
  this.userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
  })
}

Connection.prototype.connect = function() {
  mongoose.connect('mongodb://localhost/' + this.database).then(() => {
         console.log('Database connection successful')
       })
}

Connection.prototype.disconnect = function() {
  if (mongoose.connection.readyState === 1) {
    console.log('Disconnected!')
    mongoose.connection.close()
  }
}

Connection.prototype.create = function() {
  
}

module.exports = Connection;
