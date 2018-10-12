var BookingHandler = require('../src/bookingHandler.js');

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

  describe('#queryBookings', function() {
    it('retrieves a list of all bookings', function() {
      subject.queryBookings();
      expect(mockAPIConnector.connect).toHaveBeenCalledWith('get', '/bookings');
    })
  });

  describe('#queryOwnBookings', function() {
     it('returns bookings for the logged in user', function(done) {
       spyOn(subject, 'queryBookings').and.returnValue(Promise.resolve([{ _id: 1, booker_id: '41rgg4jvj3t43qf4q3' }]))
       subject.queryOwnBookings('41rgg4jvj3t43qf4q3')
         .then((res) => {
           expect(res).toEqual([{ _id: 1, booker_id: '41rgg4jvj3t43qf4q3' }]);
           done();
       })
     });

     it('returns empty array if logged in user does not have bookings', function(done) {
       spyOn(subject, 'queryBookings').and.returnValue(Promise.resolve([{ _id: 1, booker_id: '41rgg4jvj3t43qf4q3' }]))
       subject.queryOwnBookings('41rgg4jvj2t43qf4q3')
         .then((res) => {
           expect(res).toEqual([]);
           done();
       })
     });
  });
});
