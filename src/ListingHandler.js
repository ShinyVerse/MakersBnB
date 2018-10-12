function ListingHandler(apiConnector) {
  this.apiConnector = apiConnector;
}

ListingHandler.prototype.createNewListing = function(address, owner_id, no_beds) {
  let listingDetails = {address: address, owner_id: owner_id, no_beds: no_beds}
  this.apiConnector.connect('post', '/listings', listingDetails)
};

ListingHandler.prototype.queryListings = function () {
  return this.apiConnector.connect('get', '/listings')
}

ListingHandler.prototype.queryOwnListings = function(owner_id) {
  let listings = this.queryListings();
  let output = []
  return listings.then((res, rej) => {
      for (i = 0; i < res.length; i += 1) {
        if (res[i].owner_id === owner_id) {
          output.push(res[i])
        } else {
          //pass
        };
      };
    }).then(() => {
      return output
    })
}

module.exports = ListingHandler;
