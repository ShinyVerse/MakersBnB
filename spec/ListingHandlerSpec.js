var ListingHandler = require('../src/ListingHandler.js');

describe("ListingHandler", function(){
  var subject;
  var mockAPIConnector

  beforeEach(function(){
    mockAPIConnector = jasmine.createSpyObj('mockAPIConnector', { 'connect': "ok"})
    mockUser = jasmine.createSpyObj('mockUser', { 'id': "01", 'name': 'Laura'} )
    subject = new ListingHandler(mockAPIConnector);
  });

  describe('#createNewListing', function(){
    it('creates a new listing', function(){
      subject.createNewListing('123 Listing Street', mockUser.id, '2')
      expect(mockAPIConnector.connect).toHaveBeenCalledWith('post', '/listings',
      {address: '123 Listing Street',
      owner_id: mockUser.id,
      no_beds: '2' });
    });
  });
});
