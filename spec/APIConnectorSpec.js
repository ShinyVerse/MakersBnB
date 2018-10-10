var APIConnector = require('../src/APIConnector.js');

describe("APIConnector", function() {
  var subject;

  beforeEach(function() {
    mockjQuery = jasmine.createSpyObj('mockjQuery', { 'post': 202, 'get':
      [ { email: 'betty@mail.co.uk', password: 'hfowepfmoamopaivgnpeanpv'} ] });
    mockRoot = "www.mockapi.com"
    subject = new APIConnector(mockjQuery, mockRoot);
    console.log(subject.jquery.get())
    console.log(subject.rootURL)
  })



  describe('connect', function() {
    it('calls jquery get if verb is get', function() {
      subject.connect('get', '/users/0').then(function(res) {
        expect(res).toEqual([{email: 'betty@mail.co.uk', password: 'hfowepfmoamopaivgnpeanpv'}])
      })
    })
  })
})
