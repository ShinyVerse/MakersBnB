function APICaller(jquery) {
  this.jquery = jquery
};

APICaller.prototype.sendNewUser = function(name, email, password) {
  this.jquery.post({
    type: "POST",
    url: 'http://cd2ed5b4.ngrok.io/users',
    name: name,
    email: email,
    password: password
  });
}


// Export node module.
if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
  module.exports = APICaller;
}
