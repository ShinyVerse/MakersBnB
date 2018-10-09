function APICaller(rootURL, jquery, bcrypt) {
  this.rootURL = rootURL
  this.jquery = jquery;
  this.bcrypt = bcrypt;
};

APICaller.prototype.sendNewUser = function(name, email, password) {
  this.jquery.post({
    url: this.rootURL,
    name: name,
    email: email,
    password: this.hashPassword(password)
  });
}

APICaller.prototype.hashPassword = function (password){
  const salt = this.bcrypt.genSaltSync(10);
  return this.bcrypt.hashSync("password", salt);
}

APICaller.prototype.getUserFromDatabase = function(id) {
   this.jquery.get(this.rootURL + id, function(data) {
     console.log(data)
     return data;
   })
};

// Export node module.
if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
  module.exports = APICaller;
}
