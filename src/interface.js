let rootURL = 'http://59c11025.ngrok.io'

let apiCon = new APIConnector(jQuery, rootURL)
let useHan = new UserHandler(apiCon)
let listHand = new ListingHandler(apiCon)

$(document).ready(function() {

  $('#signUp').click(function() {
    $('#signUpForm').show()
    $('#signInForm').hide()
    $('#signUp').hide()
    $('#signIn').show()
  })

  $('#signIn').click(function() {
    $('#signInForm').show()
    $('#signUpForm').hide()
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

  $('#createListingBtn').click(function() {
    $('#createListingForm').show()
  })

  $('#createListingSubmit').click(function() {
    let address = $('#listingAddress').val()
    let noBeds = parseInt($('#listingNoBeds').val())
    listHand.createNewListing(address, "test", noBeds)
  })


  //shoud we wait until login to trigger query listings?
  listHand.queryListings().then(function(res) {

    for (var i = 0; i < res.length; i += 1){
      let bedImg = "<img class=svgBed src='/stylesheets/images/bed.svg'  />"
      let id = res[i]._id;
      let bookingId = "book" + id;
      let address = "<li> "+ res[i].address + "</li>"
      let beds = "<li class=bedCount> "+ res[i].no_beds + bedImg + "</li>"
      let bookButton = "<button id=" + bookingId + " class=btn>Book now!</button>"
      $('#allListings').append("<div class=listItem id=" + id + ">"
      + address
      + beds
      + bookButton
      +"</div>");
    }
  } )
})
