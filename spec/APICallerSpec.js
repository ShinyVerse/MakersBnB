var APICaller = require("../src/APICaller.js");

describe("APICaller", function(){
  var subject;
  const testURL = 'https://jsonplaceholder.typicode.com/todos/'

  beforeEach(function(){
    mockjQuery = jasmine.createSpyObj('mockjQuery', { 'post': 202, 'get': 200 });
    mockBcrypt = jasmine.createSpyObj('mockBcrypt', {'genSaltSync': 10, 'hashSync': 'fewiofjweio'});
    subject = new APICaller(testURL, mockjQuery, mockBcrypt);
  });

  describe('#hashPassword', function(){
    it('returns hash with encrypted password', function(){
      subject.hashPassword('password');
      expect(mockBcrypt.genSaltSync).toHaveBeenCalledWith(10);
      expect(mockBcrypt.hashSync).toHaveBeenCalledWith("password", 10);
    });
  });

  describe("#sendNewUser", function(){
    it("sends a new user to the API", function(){
      subject.sendNewUser('Billy', 'billy@mail.co', 'fewiofjweio')
      expected_request = {
        url: testURL,
        name: 'Billy',
        email: 'billy@mail.co',
        password: 'fewiofjweio'
      }
      expect(mockjQuery.post).toHaveBeenCalledWith(expected_request);
    });
  });

  describe('#getUserFromDatabase', function(){
    it("returns a user from the database", function(){
      subject.getUserFromDatabase(0);
      expect(mockjQuery.get).toHaveBeenCalledWith(subject.rootURL + '0', jasmine.any(Function));
    });
  });

  describe('#tryLogin', function() {
    it('checks a given username and password against the database', function() {
      expect(subject.tryLogin('Billy', 'billy01')).toEqual(true);
    });
    it('does not allow the user to log in with incorrect details', function() {
      expect(subject.tryLogin('Billy', 'billy02')).toEqual(false);
    });
  });
});