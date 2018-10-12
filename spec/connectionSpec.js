process.env.NODE_ENV = 'test';
var mongoose = require('mongoose')

var Connection = require("../src/connection.js");

describe('Connection', function() {
  var subject;
  var mockUsableSchema = new mongoose.Schema({
    name: String
  })
  var mockModel = mongoose.model('mockModel', mockUsableSchema)

  beforeEach(function() {
    mockMongoose = jasmine.createSpyObj('mockMongoose', {'connect' : true, 'model': 'CompiledSchema' })
    mockMongoose2 = jasmine.createSpyObj('mockMongoose2', {'connect' : true, 'model': 'CompiledSchema' })
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

  it('does not disconnect if not connected', function() {
    mockMongoose.connection = { 'readyState': 2 }
    subject.disconnect();
    expect(mockMongoose.connection.close).notToHaveBeenCalled;
  })

  it('connects to the development database if not in testing environment', function() {
    process.env.NODE_ENV = 'development'
    let subject2 = new Connection(mockMongoose2, {'name': 'mockSchema', 'schema': mockSchemas })
    subject.connect()
    expect(mockMongoose2.connect).toHaveBeenCalledWith('mongodb://localhost/MakersBnB', { useNewUrlParser: true })
    process.env.NODE_ENV = 'test'
  })

  it('compiles the schemas it is passed', function() {
    let mockUsableSchema2 = new mongoose.Schema({
      name: String
    })
    subject.schemas = [{ name: 'second schema', schema: mockUsableSchema2 }]
    subject.compileSchemas()
    expect(subject.models).toEqual({ 'second schema': 'CompiledSchema' })
  })

  it('can create a new entry in a database', function() {
    subject.models['mockSchema'] = mockModel
    subject.create('mockSchema', {'name': 'Billy'})
  })

  it('can read elements of the database', function() {
    subject.models['mockSchema'] = jasmine.createSpyObj('mockSchema', ['find'])
    subject.read('mockSchema')
    expect(subject.models['mockSchema'].find).toHaveBeenCalled()
  })

  it('can read an individual element of the database', function() {
    subject.models['mockSchema'] = jasmine.createSpyObj('mockSchema', ['find'])
    subject.read('mockSchema', {_id: 'wfneoifn32oifn2'})
    expect(subject.models['mockSchema'].find).toHaveBeenCalledWith({_id: 'wfneoifn32oifn2'})
  })

  it('can update elements of the database', function() {
    subject.models['mockSchema'] = jasmine.createSpyObj('mockSchema', ['findOneAndUpdate'])
    subject.update('mockSchema')
    expect(subject.models['mockSchema'].findOneAndUpdate).toHaveBeenCalled()
  })

  it('can delete an element of the database', function() {
    subject.models['mockSchema'] = jasmine.createSpyObj('mockSchema', ['findOneAndDelete'])
    subject.delete('mockSchema')
    expect(subject.models['mockSchema'].findOneAndDelete).toHaveBeenCalled()
  })

})
