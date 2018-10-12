let rootURL = 'http://59c11025.ngrok.io'

let apiCon = new APIConnector(jQuery, rootURL)
let useHan = new UserHandler(apiCon)
let listHand = new ListingHandler(apiCon)

$(document).ready(function() {

  $('#signUp').click(function() {
    $('#signUpBox').show()
    $('#signInBox').hide()
    $('#signUp').hide()
    $('#signIn').show()
  })

  $('#signIn').click(function() {
    $('#signInBox').show()
    $('#signUpBox').hide()
    $('#signIn').hide()
    $('#signUp').show()
  })

  $('#signUpSubmit').click(function() {
    let name = $('#signUpName').val()
    let email = $('#signUpEmail').val()
    let password = $('#signUpPassword').val()
    useHan.sendNewUser(name, email, password)
  })

  $('#signInSubmit').click(function() {
    let email = $('#signInEmail').val()
    let password = $('#signInPassword').val()
    console.log(useHan.isLoginCorrect(email, password))
  })

  listHand.queryListings().then(function(res) {

    for (var i = 0; i < res.length; i += 1){
      let id = res[i]._id;
      let bookingId = "book" + id;
      let address = "<li> "+ res[i].address + "</li>"
      let beds = "<li> "+ res[i].no_beds + "</li>"
      let bookButton = "<button id=" + bookingId + " class=btn>Book now!</button>"
      $('#allListings').append("<div class=listItem id=" + id + ">"
      + address
      + beds
      + bookButton
      +"</div>");
    }
    // $('#allListings').text(list)
  } )


})
