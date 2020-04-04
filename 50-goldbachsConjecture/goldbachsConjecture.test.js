var should = require('should');
var vm = require('vm');
var fs = require('fs');

// if this test is being run on a server it should be ONLY to test the
// provided solutions
if (typeof window === 'undefined') {
  // looks for a file with the same name as this one but with
  // `.test.js` replaced with `.js`
  var filename = __filename.replace(/\.test\.js$/, '.js');
  vm.runInThisContext(fs.readFileSync(filename), filename);
}

describe('spiralTraversal', function () {

  it('should return "12 = 5 + 7" when input is 12', function () {
    goldbachsConjecture(12).should.equal('12 = 5 + 7');
  });

  it('should return "42 = 5 + 37" when input is 42', function () {
    goldbachsConjecture(42).should.equal('42 = 5 + 37');
  });

  it('should return "1000 = 3 + 997" when input is 1000', function () {
    goldbachsConjecture(1000).should.equal("1000 = 3 + 997");
  });

  it('should return "6 = 3 + 3" when input is 6', function () {
    goldbachsConjecture(6).should.equal("6 = 3 + 3")
  });

});
