let rootURL = 'http://59c11025.ngrok.io'

let apiCon = new APIConnector(jQuery, rootURL)
let useHan = new UserHandler(apiCon)
let listHand = new ListingHandler(apiCon)
let bookHand = new BookingHandler(apiCon)

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
    login(email, password)
  })

  $('#signInSubmit').click(function() {
    let email = $('#signInEmail').val()
    let password = $('#signInPassword').val()
    login(email, password)
  })

  $('#logOutButton').click(function() {
    $('#logOut').hide()
    $('#signUpIn').show()
    $('#signIn').show()
    $('#signUp').show()
    $('#signInForm').hide()
    $('.btn').hide()
    $('#createListingBtn').hide()
    $.ajax({
      url: '/',
      type: 'POST',
      contentType: 'application/json',
      data: null
    })
  })

  $('#createListingBtn').click(function() {
    $('#createListingForm').show()
  })

  $('#createListingSubmit').click(function() {
    let address = $('#listingAddress').val()
    let noBeds = parseInt($('#listingNoBeds').val())
    let userId = $('#userId').val()
    listHand.createNewListing(address, userId, noBeds)
    setTimeout(function() {
      updateListing()} , 500)
  })

  updateListing()

  $(".bookingbtn").click(function() {
    let listingId = this.id
    let bookerId = $('#userId').val()
    console.log(listingId, bookerId)
    let today = new Date()
    let nextWeek = today + 7
    bookHand.createNewBooking(listingId, bookerId, today, nextWeek)
  })


  //shoud we wait until login to trigger query listings?
})

var updateListing = function() {
  $('#allListings').empty()
  listHand.queryListings().then(function(res) {
    for (var i = 0; i < res.length; i += 1){
      let bedImg = "<img class=svgBed src='/stylesheets/images/bed.svg'  />"
      let id = res[i]._id;
      let bookingId = "book" + id;
      let address = "<li> "+ res[i].address + "</li>"

      let beds = "<li class=bedCount> "+ res[i].no_beds + bedImg + "</li>"
      let bookButton = "<button id=" + bookingId + " class=bookingbtn hidden>Book now!</button>"
      $('#allListings').append("<div class=listItem id=" + id + ">"
      + address
      + beds
      + bookButton
      +"</div>");
    }
  })
}

var login = function(email, password) {
  useHan.isLoginCorrect(email, password).then(function(res) {
    if (res !== false) {
      $.ajax({
        url: '/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(res)
      })
      $('#createListingBtn').show()
      $('.bookingbtn').show()
      $('#signUpIn').hide()
      $('#logOut').show()
    } else {
    }
  })
}
