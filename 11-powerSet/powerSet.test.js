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

describe('powerSet', function () {
  it('should exist', function(){
    should.exist(powerSet);
  });

  it('should be a function', function(){
    powerSet.should.be.a.Function();
  });

  it('should return something', function(){
    var result = powerSet('a');
    should.exist(result);
  });

  it('should return an array', function(){
    powerSet('a').should.be.an.instanceof(Array);
  });

  it('should contain the original set', function(){
    // the power set of a set includes the original set!
    powerSet('a').includes('a').should.be.equal(true);
  });

  it('should produce a set with the original set plus sub sets', function(){
    var result = powerSet('ab'); // the power set of `ab`
    result.includes('ab'); // the original se.should.be.equal(true)t
    result.includes('a');  // sub se.should.be.equal(true)t
    result.includes('b');  // sub se.should.be.equal(true)t
  });

  it('should work for sets of length 3', function(){
    // recall that with sets, order doesn't matter (if order did matter, it
    // wouldn't be called a `set`.) so the set 'abc' is equivalent to 'bca',
    // 'cba', etc. this allows us to do `sortSet('abc') === sortSet('bca')` to
    // easily test set equality. With that in mind, we'll just sort
    // ahead of time each set we get back from `powerSet()`
    var sortSet = function(set){
      // takes a set like 'bca' or 'cba' and returns 'abc'
      return set.split('').sort().join('');
    }
    // `result` is the power set of `"fun"`
    var result = powerSet('fun');
    // sort each set in the power set
    for(var i = 0; i < result.length; i++){
      result[i] = sortSet(result[i]);
    }
    // should include all the original characters
    (result.includes('f') && result.includes('u') && result.includes('n')).should.be.equal(true);
    // should include all sub sets of length 2
    (result.includes('fu') && result.includes('nu') && result.includes('fn')).should.be.equal(true);
    // should include the original set
    result.includes(sortSet('fun')).should.be.equal(true);
  });

  it('should contain the original set for larger sets', function(){
    // takes a set like 'bca' or 'cba' and returns 'abc'
    var sortSet = function(set){
      return set.split('').sort().join('');
    }
    // `result` is the power set of `"jump"`
    var result = powerSet('jump');
    // sort each set in the power set
    for(var i = 0; i < result.length; i++){
      result[i] = sortSet(result[i]);
    }
    // should include all sub sets of length 1 (aka, all the original characters)
    result.includes('j').should.be.equal(true);
    result.includes('u').should.be.equal(true);
    result.includes('m').should.be.equal(true);
    result.includes('p').should.be.equal(true);
    // should include all sub sets of length 2
    result.includes(sortSet('ju')).should.be.equal(true);
    result.includes(sortSet('jm')).should.be.equal(true);
    result.includes(sortSet('jp')).should.be.equal(true);
    result.includes(sortSet('um')).should.be.equal(true);
    result.includes(sortSet('up')).should.be.equal(true);
    result.includes(sortSet('mp')).should.be.equal(true);
    // should include all sub sets of length 3
    result.includes(sortSet('jum')).should.be.equal(true);
    result.includes(sortSet('jup')).should.be.equal(true);
    result.includes(sortSet('jmp')).should.be.equal(true);
    result.includes(sortSet('ump')).should.be.equal(true);
    // should include the original set
    result.includes(sortSet('jump')).should.be.equal(true);
  });

  it('should not include duplicate sets', function(){
    // make sure you remove duplicate sets. 'vic' is the same set as 'civ'

    // takes a set like 'bca' or 'cba' and returns 'abc'
    var sortSet = function(set){
      return set.split('').sort().join('');
    }
    // `result` is the power set of `"jump"`
    var result = powerSet('jump');
    // sort each set in the power set
    for(var i = 0; i < result.length; i++){
      result[i] = sortSet(result[i]);
    }

    // check for duplicate sets
    for(var i = 0; i < result.length; i++){
      for(var j = 0; j < result.length; j++){
        if(i === j) { continue; }
        result[i].should.not.equal(result[j], 'the set ' + result[i] + ' appears twice in your solution');
      }
    }
  });

  it('should remove duplicates from the original set', function(){
    // you're doing awesome! This test is more of a caveat of the fact that we're
    // using strings to store our sets but by definition, each element in a
    // set must be unique. because of this, you should remove duplicate items
    // from the original set. said another way, the power set of 'bbbaaa'
    // should be the same as the power set of 'ab'.

    // takes a set like 'bca' or 'cba' and returns 'abc'
    var sortSet = function(set){
      return set.split('').sort().join('');
    }
    // `result` is the power set of `"bbbaaa"`
    var result = powerSet('bbbaaa');
    // sort each set in the power set
    for(var i = 0; i < result.length; i++){
      result[i] = sortSet(result[i]);
    }
    result.includes('aa').should.be.equal(false);
    result.includes('aaa').should.be.equal(false);
    result.includes('bb').should.be.equal(false);
    result.includes('bbb').should.be.equal(false);
    result.includes('a').should.be.equal(true);
    result.includes('b').should.be.equal(true);
    result.includes('ab').should.be.equal(true);
  });

  it('should include the empty set', function(){
    // holly cannoli batman! you're kicking so much ass!! you've gotten through
    // almost all the tests!! this is the last one, I promise. we saved this
    // one for last because it's sort of lame but... _technically_, the power
    // set, by definition, includes the empty set.
    // to quote Wikipedia:
    // > "In mathematics, the power set (or powerset) of any set S, [...] is
    // > the set of all subsets of S, including the empty set and S itself."
    // > -- http://en.wikipedia.org/wiki/Power_set
    powerSet('lame').includes('').should.be.equal(true);
  });
});
