var ListingHandler = require('../src/listingHandler.js');

describe("ListingHandler", function(){
  var subject;
  var mockAPIConnector;


  beforeEach(function(){
    mockAPIConnector = jasmine.createSpyObj('mockAPIConnector', { 'connect': 200 })
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
    it('returns listings for the logged in user', function(done) {
      spyOn(subject, 'queryListings').and.returnValue(Promise.resolve([{ _id: 1, owner_id: '41rgg4jvj3t43qf4q3' }]))
      subject.queryOwnListings('41rgg4jvj3t43qf4q3')
        .then((res) => {
          expect(res).toEqual([{ _id: 1, owner_id: '41rgg4jvj3t43qf4q3' }]);
          done();
      })
    });

    it('returns nothing if user does not have listings', function(done) {
      spyOn(subject, 'queryListings').and.returnValue(Promise.resolve([{ _id: 1, owner_id: '41rgg4jvj3t43qf4q3' }]))
      subject.queryOwnListings('41rgg2jvj3t43qf4q3')
        .then((res) => {
          expect(res).toEqual([]);
          done();
      })
    });
  })

});
