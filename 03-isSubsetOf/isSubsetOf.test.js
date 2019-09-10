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

describe('isSubsetOf', function(){
  it('should exist', function(){
    should.exist([].isSubsetOf);
  });

  it('should be a function', function(){
    [].isSubsetOf.should.be.a.Function();
  });

  it('should return a value', function(){
    var result = [].isSubsetOf([1, 2, 2]);
    should.exist(result);
  });

  it('should return true if all of the elements in the first array are in the second', function(){
    var result = ['cat', 'dog', 'cow'].isSubsetOf(['dog', 'cow', 'fox', 'cat']);
    result.should.equal(true);
  });

  it('should return false if not all of the elements in the first array are in the second', function(){
    var result = ['cat', 'dog', 'cow'].isSubsetOf(['dog', 'cow', 'fox']);
    result.should.equal(false);
  });

  it('should disregard duplicates', function(){
    ['cat', 'cat', 'dog'].isSubsetOf(['cat', 'dog']).should.equal(true);
    ['cat', 'cat', 'dog'].isSubsetOf(['cat']).should.equal(false);
  });

  it('should disregard order', function(){
    ['cat' , 'dog'].isSubsetOf(['dog', 'cat']).should.equal(true);
  });

  describe('EXTRA CREDIT', function () {
    it('should handle number element', function(){
      [1, 'cat', 3].isSubsetOf([4, 3, 'cat', 1]).should.equal(true);
      [1, 'cat', 3].isSubsetOf([4, 'cat', 1]).should.equal(false);
    });

    it('should handle array element', function(){
      ['alice', ['cat', 'dog']].isSubsetOf(['alice', ['cat', 'dog'], 'bob']).should.equal(true);
      ['alice', ['cat', 'dog']].isSubsetOf(['alice', 'cat', 'dog', 'bob']).should.equal(false);
    });

    it('should handle object element', function(){
      ['alice', 'bob', { name : 'chuck' }].isSubsetOf(['alice', 'bob', { name : 'chuck' }]).should.equal(true);
      ['alice', { name : 'chuck' }].isSubsetOf(['alice', 'chuck']).should.equal(false);
    });

    it('should handle mixed arrays with object/array element', function(){
      ['alice', ['cat'], { name : 'chuck' }].isSubsetOf(['alice', 'bob', ['cat'], { name : 'chuck' }]).should.equal(true);
      ['alice', ['cat'], { name : 'chuck' }].isSubsetOf(['alice', 'cat', ['chuck']]).should.equal(false);
    });
  });
});
