function APIConnector(jquery, rootURL) {
  this.jquery = jquery;
  this.rootURL = rootURL
}

APIConnector.prototype.connect = function(action, path) {
  return new Promise((resolve, reject) => {
    resolve(this.jquery.get(this.rootURL + path));
  })
}

module.exports = APIConnector;
