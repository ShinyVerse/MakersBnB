var APIConnector = require('./APIConnector.js')

function BookingHandler(apiConnector) {
  this.apiConnector = apiConnector;
}

BookingHandler.prototype.createNewBooking = function(listing_id, booker_id, date_from, date_to) {
  this.apiConnector.connect('post', '/bookings', {listing_id : listing_id, booker_id : booker_id,
                                                 date_from : date_from, date_to : date_to} )
}

BookingHandler.prototype.retrieveBookingsList = function () {
  this.apiConnector.connect('get', '/bookings')
}

BookingHandler.prototype.queryOwnBookings = function(user_id) {
  var bookings = this.retrieveBookingsList();
  return bookings.filter( booking => { return booking["booker_id"] === user_id });
}

if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
  module.exports = BookingHandler;
};
