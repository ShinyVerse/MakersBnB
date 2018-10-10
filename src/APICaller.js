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
  return this.bcrypt.hashSync(password, salt);
}

APICaller.prototype.getUserFromDatabase = function(id) {
   this.jquery.get(this.rootURL + id, function(data) {
     console.log(data)
     return data;
   })
};

APICaller.prototype.queryUsers = function() {
  return new Promise( (resolve, reject) => {
    resolve(this.jquery.get(this.rootURL));
  })
}

APICaller.prototype.tryLogin = function(email, password) {
  let allUsers = this.queryUsers()
  return output = allUsers.then(function(res) {
    for (i = 0; i < res.length; i += 1) {
      if (res[i].email === email && res[i].password === password) {
        return true
      }
    }
    return false
  })
}

// dd you give right user/pass
//
// authenticate user: check username and password
// store current user:

// Export node module.
if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
  module.exports = APICaller;
}
