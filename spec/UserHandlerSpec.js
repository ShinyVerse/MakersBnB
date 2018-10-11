var UserHandler = require("../src/UserHandler.js");

describe("UserHandler", function(){
  var subject;
  const testURL = 'http://98fa80dc.ngrok.io'
  var mockAPIConnector

  beforeEach(function(){
    mockAPIConnector = jasmine.createSpyObj('mockApiConnector', { 'connect': "ok"})
    mockjQuery = jasmine.createSpyObj('mockjQuery', { 'post': 202, 'get':
      [ { email: 'betty@mail.co.uk', password: 'hfowepfmoamopaivgnpeanpv'} ] });
    mockBcrypt = jasmine.createSpyObj('mockBcrypt', {'genSaltSync': 10, 'hashSync': 'fewiofjweio'});
    subject = new UserHandler(mockBcrypt, mockAPIConnector);
  });

  describe('#getUserFromDatabase', function() {
    it('returns a specific user based on id', function() {
      subject.getUserFromDatabase(0)
      expect(mockAPIConnector.connect).toHaveBeenCalledWith('get', '/users/0')
    })
  })

  describe('#hashPassword', function(){
    it('returns hash with encrypted password', function(){
      subject.hashPassword('password');
      expect(mockBcrypt.genSaltSync).toHaveBeenCalledWith(10);
      expect(mockBcrypt.hashSync).toHaveBeenCalledWith("password", 10);
    });
  });

  describe("#sendNewUser", function(){
    it("sends a new user to the API", function(){
      subject.sendNewUser('Billy', 'billy@mail.co.uk', 'fewiofjweio')
      expect(mockAPIConnector.connect).toHaveBeenCalledWith('post', '/users',
      {name: 'Billy',
      email: 'billy@mail.co.uk',
      password: 'fewiofjweio' });
    });
  });

  describe('#queryUsers', function(){
    it("returns all users from db", function(){
      subject.queryUsers();
      expect(mockAPIConnector.connect).toHaveBeenCalledWith('get', '/users');
    });
  });

  // find a way to stub query users for the rest of the tests

  xdescribe('#isLoginCorrect', function() {
    it('checks a given username and password against the database', function() {
      spyOn(subject.queryUsers, "hello")
      subject.isLoginCorrect('betty@mail.co.uk', 'hfowepfmoamopaivgnpeanpv').then(function(res) {
        expect(res).toEqual(true);
      })
    });
    it('does not allow the user to log in with incorrect details', function() {
      subject.isLoginCorrect('betty@mail.co.uk', 'notthepassword').then(function(res) {
        expect(res).toEqual(false);
      })
    });
  });

  xdescribe('#isEmailInUse', function() {
    it('returns true if the email is in use', function() {
      subject.isEmailInUse('betty@mail.co.uk').then(function(res) {
        expect(res).toEqual(true)
      })
    })
    it('returns false if the email is not in use', function() {
      subject.isEmailInUse('botty@mail.co.uk').then(function(res) {
        expect(res).toEqual(false)
      })
    })
  })

  xdescribe('#trySignUp', function() {
    it('returns true if the sign up is successful', function() {
      spyOn(subject, 'sendNewUser')
      subject.trySignUp('Tom', 'miller@mail.co.uk', 'jimmy123').then(function(res) {
        expect(res).toEqual(true)
      })
    })
    it('returns false if the sign up is unsuccessful', function() {
      subject.trySignUp('Betty', 'betty@mail.co.uk', 'betty<3sbetty').then(function(res) {
        expect(res).toEqual(false)
      })
    })
  })
});
