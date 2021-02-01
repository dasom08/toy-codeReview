/**
 * Create a hash table with `insert()`, `retrieve()`, and `remove()` methods.
 * The hashtable does not need to resize but it should still handle collisions.
 */

var makeHashTable = function () {
  var result = {}; // 해시값과 value의 짝
  var storage = []; //result 안에 해시값으르 가지는 value의 linkedlist 저장소
  var storageLimit = 1000;
  result.insert = function (key, value) {
    let index = getIndexBelowMaxForKey(key, storageLimit);
    if (result[index] === undefined) {
      storage.push([key, value]);
      result[index] = storage; //result = {index: [[key,value],[key2,value2]] , index2:[[key,value]]}
      storage = [];
    } else {
      storage = result[index]; // [[key,value],[key2,value2]]
      for (let i = 0; i < storage.length; i++) {
        if (storage[i][0] === key) {
          //이 경우는 이미 있는 값을 변경하고 싶을때,
          storage[i][1] = value;
        } else {
          storage.push([key, value]);
        }
      }
    }
  };

  result.retrieve = function (key) {
    let index = getIndexBelowMaxForKey(key, storageLimit);
    if (result[index]) {
      //result = {index: [[key,value],[key2,value2]] , index2:[[key,value]]}
      storage = result[index]; // [[key,value],[key2,value2]]
      for (let i = 0; i < storage.length; i++) {
        if (storage[i][0] === key) {
          return storage[i][1];
        }
      }
    } else {
      return undefined;
    }
  };

  result.remove = function (key) {
    let index = getIndexBelowMaxForKey(key, storageLimit);
    if (result[index]) {
      storage = result[index]; // [[key,value],[key2,value2]]
      for (let i = 0; i < storage.length; i++) {
        if (storage[i][0] === key) {
          storage[i].splice(i, 1);
        }
      }
      return storage;
    }
    return undefined;
  };

  return result;
};

// This is a "hashing function". You don't need to worry about it, just use it
// to turn any string into an integer that is well-distributed between
// 0 and max - 1
var getIndexBelowMaxForKey = function (str, max) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};
