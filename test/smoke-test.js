var expect = require("chai").expect;

describe("Mocha Smoke Test", function() {
  describe("A basic test", function() {
    it("works", function() {
      expect(1).to.equal(1);
    })
  })
});