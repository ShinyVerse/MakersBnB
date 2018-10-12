function UserHandler(apiConnector) {
  this.apiConnector = apiConnector
};

UserHandler.prototype.sendNewUser = function(name, email, password) {
  this.apiConnector.connect('post', '/users', {name: name, email: email,
  password: password})

};

UserHandler.prototype.getUserFromDatabase = function(id) {
  this.apiConnector.connect("get", '/users' + `/${id}`);

};

UserHandler.prototype.queryUsers = function() {
  return this.apiConnector.connect("get", '/users')
};

UserHandler.prototype.isLoginCorrect = function(email, password) {
  let allUsers = this.queryUsers()
  return output = allUsers.then((res) => {
    for (i = 0; i < res.length; i += 1) {
      if (res[i].email === email && res[i].password === password) {
        return res[i]
      };
    };
    return false
  })
};

UserHandler.prototype.isEmailInUse = function(email) {
  let allUsers = this.queryUsers()
  return output = allUsers.then((res) => {
    for (i = 0; i < res.length; i += 1) {
      if (res[i].email === email) {
        return true
      };
    };
    return false
  })
};

UserHandler.prototype.trySignUp = function(name, email, password) {
  return this.isEmailInUse(email).then((res) => {
    if (res === false) {
      this.sendNewUser(name, email, password)
      return true;
    }
    return false;
  })
}

module.exports = UserHandler;
