

function APICaller() {};

APICaller.prototype.sendNewUser = function(name, email, password) {
  $.post({
    type: "POST",
    url: 'http://cd2ed5b4.ngrok.io/users',
    name: name,
    email: email,
    password: password
  });
}


// module.exports = APICaller;
