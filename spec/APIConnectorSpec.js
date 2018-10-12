var APIConnector = require('../src/apiConnector.js');

describe("APIConnector", function() {
  var subject;

  beforeEach(function() {
    mockjQuery = jasmine.createSpyObj('mockjQuery', { 'ajax': 202, 'get':
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
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(send_param)
      }

      expect(mockjQuery.ajax).toHaveBeenCalledWith(expected_request)
    })

    it('tells the user if they have entered an invalid command', function() {
      expect(subject.connect('invalid', '/users')).toEqual('Invalid command')
    })
  })
})
