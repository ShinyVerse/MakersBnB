var APIConnector = require('../src/APIConnector.js');

describe("APIConnector", function() {
  var subject;

  beforeEach(function() {
    mockjQuery = jasmine.createSpyObj('mockjQuery', { 'post': 202, 'get':
      [ { email: 'betty@mail.co.uk', password: 'hfowepfmoamopaivgnpeanpv'} ] });
    mockRoot = "www.mockapi.com"
    subject = new APIConnector(mockjQuery, mockRoot);
  })



  describe('connect', function() {
    it('calls jquery get if verb is get', function() {
      subject.connect('get', '/users/0').then(function(res) {
        expect(res).toEqual([{email: 'betty@mail.co.uk', password: 'hfowepfmoamopaivgnpeanpv'}])
      })
    })

    it('calls jquery post if verb is post', function() {
      var send_param = { name: 'Billy', email: 'billy@mail.co.uk', password: 'fewiofjweio'}
      subject.connect('post', '/users', send_param)

      var expected_request = {
        url: "www.mockapi.com/users",
        name: 'Billy',
        email: 'billy@mail.co.uk',
        password: 'fewiofjweio'
      }

      expect(mockjQuery.post).toHaveBeenCalledWith(expected_request)
    })
  })
})
