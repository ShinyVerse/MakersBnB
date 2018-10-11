process.env.NODE_ENV = 'test';
var mongoose = require('mongoose')

var Connection = require("../src/connection.js");

describe('Connection', function() {
  var subject;

  beforeEach(function() {
    mockMongoose = jasmine.createSpyObj('mockMongoose', {'connect' : true })
    mockSchemas = jasmine.createSpyObj('mockSchemas', ['connect'])
    subject = new Connection(mockMongoose, {'name': 'mockSchema', 'schema': mockSchemas });
  });

  it('Connects to a database', function() {
    subject.connect()
    expect(mockMongoose.connect).toHaveBeenCalledWith('mongodb://localhost/MakersBnB_test', { useNewUrlParser: true })
  })

  it('can disconnect from a database', function() {
    mockMongoose.connection = { 'readyState': 1 }
    mockMongoose.connection.close = function() {
      return true
    }
    subject.disconnect();
    expect(mockMongoose.connection.close).toHaveBeenCalled;
  })

  it('can create a new entry in a database', function() {
    mockUsableSchema = new mongoose.Schema({
      name: String
    })
    mockModel = mongoose.model('mockModel', mockUsableSchema)
    subject.models['mockSchema'] = mockModel
    subject.create('mockSchema', {'name': 'Billy'})
  })

  it('can read elements of the database', function() {

  })

  it('can read an individual element of the database', function() {

  })

  it('can updaate elements of the database', function() {

  })

  it('can delete an element of the database', function() {
    
  })

})
