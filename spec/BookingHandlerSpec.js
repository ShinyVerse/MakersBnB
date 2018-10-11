var BookingHandler = require('../src/BookingHandler.js');
const promisedData = require('./MockData/bookingData.json');

describe("BookingHandler", function(){
  var subject;
  var mockAPIConnector;

  beforeEach(function(){
    mockAPIConnector = jasmine.createSpyObj('mockAPIConnector', { 'connect': 'ok'})
    mockUser = jasmine.createSpyObj('mockUser', { 'id': "01", 'name': 'Laura'} )
    subject = new BookingHandler(mockAPIConnector);
  });

  describe('#createNewBooking', function(){
    it('creates a new booking', function(){
      subject.createNewBooking('123', mockUser.id, '12-10-2018', '14-10-2018')
      expect(mockAPIConnector.connect).toHaveBeenCalledWith('post', '/bookings',
      {listing_id: '123',
      booker_id: mockUser.id,
      date_from: '12-10-2018',
      date_to: '14-10-2018'})
    });
  });

  describe('#retrieveBookingsList', function() {
    it('retrieves a list of all bookings', function() {
      subject.retrieveBookingsList();
      expect(mockAPIConnector.connect).toHaveBeenCalledWith('get', '/bookings');
    })
  });

  describe('#queryOwnBookings', function() {
     it('returns bookings for the logged in user', function() {
       spyOn(subject, 'retrieveBookingsList').and.returnValue(promisedData["Bookings"]);
       expect(subject.retrieveBookingsList).toHaveBeenCalled;
       expect(subject.queryOwnBookings("12b")).toEqual([{
         "id": 2,
         "listing_id" : "173",
         "booker_id" : "12b",
         "date_from" : "11-10-2018",
         "date_to" : "13-10-2018"
       }]);
     });
  });
});
