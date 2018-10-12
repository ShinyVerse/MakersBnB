function APIConnector (jquery, rootURL) {
  this.jquery = jquery
  this.rootURL = rootURL
}

APIConnector.prototype.connect = function(action, path, params = false) {
  if (action === 'get') {
    return new Promise((resolve, reject) => {
      resolve(this.jquery.get(this.rootURL + path));
    })
  } else if (action === 'post') {
    this.jquery.ajax({
      url: this.rootURL + path,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(params)
    })
  } else {
    return 'Invalid command'
  }
}

module.exports = APIConnector;
