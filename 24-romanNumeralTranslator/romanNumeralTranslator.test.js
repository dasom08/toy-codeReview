var should = require('should');
var vm = require('vm');
var fs = require('fs');

// if this test is being run on a server it should be ONLY to test the
// provided solutions
if(typeof window === 'undefined'){
  // looks for a file with the same name as this one but with
  // `.test.js` replaced with `.js`
  var filename = __filename.replace(/\.test\.js$/, '.js');
  vm.runInThisContext(fs.readFileSync(filename), filename);
}

describe('translateRomanNumeral', function() {
  it('should exist', function(){
    should.exist(translateRomanNumeral);
  });

  it('should be a function', function(){
    translateRomanNumeral.should.be.a.Function;
  });

  it('should translate I', function(){
    translateRomanNumeral('I').should.eql(1);
  });

  it('should translate V', function(){
    translateRomanNumeral('V').should.eql(5);
  });

  it('should translate X', function(){
    translateRomanNumeral('X').should.eql(10);
  });

  it('should translate L', function(){
    translateRomanNumeral('L').should.eql(50);
  });

  it('should translate C', function(){
    translateRomanNumeral('C').should.eql(100);
  });

  it('should translate D', function(){
    translateRomanNumeral('D').should.eql(500);
  });

  it('should translate M', function(){
    translateRomanNumeral('M').should.eql(1000);
  });

  it('should translate multiple digits being added', function(){
    translateRomanNumeral("II").should.eql(2);
    translateRomanNumeral("VI").should.eql(6);
    translateRomanNumeral("VII").should.eql(7);
    translateRomanNumeral("XV").should.eql(15);
  });

  it('should translate subtractive notation', function(){
    translateRomanNumeral("IV").should.eql(4);
    translateRomanNumeral("XIV").should.eql(14);
    translateRomanNumeral("MCM").should.eql(1900);
  });

  it('should translate complex examples (e.g. years used in Wikipedia page on roman numerals)', function(){
    translateRomanNumeral("MCMLIV").should.eql(1954);
    translateRomanNumeral("MCMXC").should.eql(1990);
    translateRomanNumeral("MMVIII").should.eql(2008);
    translateRomanNumeral("MDCCCCX").should.eql(1910);
    translateRomanNumeral("MCMX").should.eql(1910);
  });

  it('should return null if passed something other than a string', function(){
      should.equal(translateRomanNumeral(50), null);
  });

  it('should return 0 if passed an empty string', function(){
    translateRomanNumeral("").should.eql(0);
  });


});
