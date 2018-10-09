var APICaller = require("../src/APICaller.js");

describe("APICaller", function(){
  var subject;
  const testURL = 'https://jsonplaceholder.typicode.com/todos/'

  beforeEach(function(){
    mockjQuery = jasmine.createSpyObj('mockjQuery', { 'post': 202, 'get': 200 })
    mockBcrypt = jasmine.createSpyObj('mockBcrypt', {'genSaltSync': 10, 'hashSync': 'fewiofjweio'})
    subject = new APICaller(testURL, mockjQuery, mockBcrypt);
  });

  describe('#hashPassword', function(){
    it('returns hash with encrypted password', function(){
      subject.hashPassword('fewiofjweio')
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
      expect(mockjQuery.post).toHaveBeenCalledWith(expected_request)
    });
  });

  describe('#getUserFromDatabase', function(){
    it("returns a user from the database", function(){
      subject.getUserFromDatabase(0)
      expect(mockjQuery.get).toHaveBeenCalledWith(ID)
    });
  });
})
