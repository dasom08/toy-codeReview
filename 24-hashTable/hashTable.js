/**
 * Create a hash table with `insert()`, `retrieve()`, and `remove()` methods.
 * The hashtable does not need to resize but it should still handle collisions.
 */


let source = {name:"dasom"}
let source2 = {gender:"female"}
let source3 = {hobby:"coding always"}

var makeHashTable = function(){
  var result = {};
  var storage = [];
  var storageLimit = 1000;

  result.insert = function(key,val){

    let max = key.length;
    let hashIndex = getIndexBelowMaxForKey(key[0],max)
   
    let arr = []
    arr.push(key)
    arr.push(val) 

    let hashIndexArr = []
    hashIndexArr.push(arr) //[ [key,val] ]

    if(storage[hashIndex] === undefined){
        storage[hashIndex] = hashIndexArr;
    }
    else if(storage[hashIndex].length > 0 ){
        // key 값이 같은경우 밸류 값을 업데이트. 
        for(let i = 0; i < storage[hashIndex].length; i++){
            if(storage[hashIndex][i][0] === key){
                storage[hashIndex][i][1] = val // key 값이 같은경우 밸류 값을 업데이트. 
                result["storage"] = storage;
                return result; //중복이 발생해버리는데... 흠. 
            }
        }
        storage[hashIndex].push(arr)
    }
    

    result["storage"] = storage;
    return result;
  };

  result.retrieve = function(key){
    
    let max = key.length;
    let hashIndex = getIndexBelowMaxForKey(key[0],max)
    
    if(storage.length !== 0 ){
        for(let i = 0; i < storage[hashIndex].length; i++){
            if(storage[hashIndex][i][0] === key){
                return storage[hashIndex][i][1];
            }
        }
    }

    return undefined;
  };

  result.remove = function(key){
      //value만 지우기
      let max = key.length;
      let hashIndex = getIndexBelowMaxForKey(key[0],max)

    for(let i = 0; i < storage[hashIndex].length; i++){
        if(storage[hashIndex][i][0] === key){
            return storage[hashIndex][i].pop()
        }
    }

  };

  return result;
};

// This is a "hashing function". You don't need to worry about it, just use it
// to turn any string into an integer that is well-distributed between
// 0 and max - 1
var getIndexBelowMaxForKey = function(str, max){
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash<<5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};
