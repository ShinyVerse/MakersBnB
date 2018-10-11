var APIConnector = require('./APIConnector.js')

function ListingHandler(apiConnector) {
  this.apiConnector = apiConnector;
}

ListingHandler.prototype.createNewListing = function(address, owner_id, no_beds) {
   this.apiConnector.connect('post', '/listings', {address: address, owner_id: owner_id, no_beds: no_beds})
};

ListingHandler.prototype.queryListings = function () {
  this.apiConnector.connect('get', '/listings')
}

ListingHandler.prototype.queryOwnListings = function(owner_id) {
  var listings = this.queryListings();
  return listings.filter( listing => { return listing["owner_id"] === owner_id });
}

if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
  module.exports = ListingHandler;
};
