var ListingHandler = require('../src/ListingHandler.js');
const promisedData = require('./MockData/listingData.json');


describe("ListingHandler", function(){
  var subject;
  var mockAPIConnector;


  beforeEach(function(){
    mockAPIConnector = jasmine.createSpyObj('mockAPIConnector', { 'connect': promisedData.Listings})
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

  describe('#queryListings', function() {
    it('queries all current available listings', function() {
      subject.queryListings();
      expect(mockAPIConnector.connect).toHaveBeenCalledWith('get', '/listings');
    })
  });

  describe('#queryOwnListings', function() {
    it('returns listings for the logged in user', function() {
      spyOn(subject, 'queryListings').and.returnValue(promisedData["Listings"]);
      expect(subject.queryListings).toHaveBeenCalled
      expect(subject.queryOwnListings("1a")).toEqual([{ "id": 1,"address": "66 Joey Lane",
                                                        "owner_id": "1a", "no_beds": 4 },
                                                        { "id": 3, "address": "54 Chandler's Place (Joey owns)",
                                                          "owner_id": "1a", "no_beds": 4 }])
    });
  })

});
