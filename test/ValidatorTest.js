var validator = require("../public/javascripts/Validator.js");

var assert = require("assert");

describe("Validator", function() {
  var subject;

  beforeEach(function() {
    subject = new validator;
  });

  describe("#validatesEmail will", function() {
    it('returns false if email is not valid', function() {
      assert.equal(subject.isValidEmail("FakeEmail"), false);
    });

    it('returns true if email is valid', function() {
      assert.equal(subject.isValidEmail("realemail@gmail.com"), true);
    })
  });
});
