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

describe('threeFiveMultiple', function () {

  it('should return 3260658 when input is 3740', function () {
    threeFiveMultiples(3740).should.equal(3260658);
  });

  it('should return 3680853 when input is 3971', function () {
    threeFiveMultiples(3971).should.equal(3680853)
  });

  it('should return 5749470 when input is 4963', function () {
    threeFiveMultiples(4963).should.equal(5749470);
  });

  it('should return 16079 when input is 262', function () {
    threeFiveMultiples(262).should.equal(16079);
  });

  it('should return 593 when input is 51', function () {
    threeFiveMultiples(51).should.equal(593);
  });

});
