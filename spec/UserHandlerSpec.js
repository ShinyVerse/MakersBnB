var UserHandler = require("../src/UserHandler.js");

describe("UserHandler", function(){
  var subject;
  var mockAPIConnector;

  beforeEach(function(){
    mockAPIConnector = jasmine.createSpyObj('mockApiConnector', { 'connect': "ok"})
    subject = new UserHandler(mockAPIConnector);
  });

  describe('#getUserFromDatabase', function() {
    it('returns a specific user based on id', function() {
      subject.getUserFromDatabase(0)
      expect(mockAPIConnector.connect).toHaveBeenCalledWith('get', '/users/0')
    })
  })

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

  describe('#isEmailInUse', function() {
    it('returns true if the email is in use', function(done) {
      spyOn(subject, 'queryUsers').and.returnValue(Promise.resolve([{email: 'betty@mail.co.uk'}]))
      subject.isEmailInUse('betty@mail.co.uk')
        .then((res) => {
          expect(res).toEqual(true);
          done();
        })
    })
    it('returns false if the email is not in use', function(done) {
      spyOn(subject, 'queryUsers').and.returnValue(Promise.resolve([{email: 'betty@mail.co.uk'}]))
      subject.isEmailInUse('cameron@mail.co.uk')
        .then((res) => {
          expect(res).toEqual(false);
          done();
        })
    })
  })

  describe('#isLoginCorrect', function() {
    it('checks a given username and password against the database', function(done) {
      spyOn(subject, 'queryUsers').and.returnValue(Promise.resolve([{email: 'betty@mail.co.uk', password: '12345'}]))
      subject.isLoginCorrect('betty@mail.co.uk', '12345')
        .then((res) => {
          expect(res).toEqual(true);
          done();
        })
    });
    it('does not allow the user to log in with incorrect details', function(done) {
      spyOn(subject, 'queryUsers').and.returnValue(Promise.resolve([{email: 'betty@mail.co.uk', password: '12345'}]))
      subject.isLoginCorrect('betty@mail.co.uk', '12245')
        .then((res) => {
          expect(res).toEqual(false);
          done();
        })
    });
  });

  xdescribe('#trySignUp', function() {
    it('returns true if the sign up is successful', function(done) {
      subject.isEmailInUse = function(email) {
        return new Promise((res, rej) => {
          email !== 'betty@mail.co.uk'
        })
      }
      spyOn(subject, 'sendNewUser')
      subject.trySignUp('Tom', 'miller@mail.co.uk', 'jimmy123').then(function(res) {
        expect(res).toEqual(true)
        expect(sendNewUser).toHaveBeenCalledWith('Tom', 'miller@mail.co.uk', 'jimmy123')
      })
    })
    it('returns false if the sign up is unsuccessful', function(done) {
      subject.isEmailInUse = function(email) {
        return new Promise((res, rej) => {
          email !== 'betty@mail.co.uk'
        })
      }
      subject.trySignUp('Betty', 'betty@mail.co.uk', 'betty<3sbetty').then(function(res) {
        expect(res).toEqual(false)
      })
    })
  })
});
