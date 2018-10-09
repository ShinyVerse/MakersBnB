var APICaller = require("../src/APICaller.js");

describe("APICaller", function(){
  var subject;

  beforeEach(function(){
    mockjQuery = jasmine.createSpyObj('mockjQuery', { 'post': 202 })
    subject = new APICaller(mockjQuery);
  });

  describe("#sendNewUser", function(){
    it("sends a new user to the API", function(){
      subject.sendNewUser('Billy', 'billy@mail.co', 'fewiofjweio')
      expected_request = {
        type: "POST",
        url: 'http://cd2ed5b4.ngrok.io/users',
        name: 'Billy',
        email: 'billy@mail.co',
        password: 'fewiofjweio'
      }
      expect(mockjQuery.post).toHaveBeenCalledWith(expected_request)
    });
  });
})
