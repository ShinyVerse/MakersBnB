process.env.NODE_ENV = 'test';

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
    expect(mockMongoose.connect).toHaveBeenCalledWith('mongodb://localhost/MakersBnB_test')
  })

  it('can disconnect from a database', function() {
    subject.connect();
    mockMongoose.connection = { 'readyState': 1 }
    mockMongoose.connection.close = function() {
      return true
    }
    subject.disconnect();
    expect(mockMongoose.connection.close).toHaveBeenCalled;
  })


})
