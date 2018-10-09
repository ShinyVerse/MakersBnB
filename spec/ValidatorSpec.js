var Validator = require("../src/Validator.js");

describe("Validator", function() {
  var subject;

  beforeEach(function() {
    subject = new Validator();
  });

  describe("#validatesEmail will", function() {
    it('returns false if email is not valid', function() {
      expect(subject.isValidEmail("FakeEmail")).toEqual(false);
    });

    it('returns true if email is valid', function() {
      expect(subject.isValidEmail("realemail@gmail.com")).toEqual(true);
    })
  });
});
