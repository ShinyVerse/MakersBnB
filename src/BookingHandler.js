function BookingHandler(apiConnector) {
  this.apiConnector = apiConnector;
}

BookingHandler.prototype.createNewBooking = function(listing_id, booker_id, date_from, date_to) {
  booking_data = { listing_id: listing_id, booker_id: booker_id, date_from: date_from, date_to: date_to}
  console.log(booking_data)
  this.apiConnector.connect('post', '/bookings', booking_data)
}

BookingHandler.prototype.queryBookings = function () {
  return this.apiConnector.connect('get', '/bookings')
}

BookingHandler.prototype.queryOwnBookings = function(user_id) {
  let bookings = this.queryBookings();
  let output = []
  return bookings.then((res, rej) => {
      for (i = 0; i < res.length; i += 1) {
        if (res[i].booker_id === user_id) {
          output.push(res[i])
        } else {
          //pass
        }
      }
    }).then(() => {
      return output
    })
}

module.exports = BookingHandler;
