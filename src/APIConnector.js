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
    this.jquery.post({
      url: this.rootURL + path,
      name: params.name,
      email: params.email,
      password: params.password
    })
  }
}

if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
  module.exports = APIConnector;
};
