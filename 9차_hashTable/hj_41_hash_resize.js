/**
 * Create a hash table with `insert()`, `retrieve()`, and `remove()` methods.
 * Be sure to handle hashing collisions correctly.
 * Set your hash table up to double the storage limit as
 * soon as the total number of items stored is greater than
 * 3/4th of the number of slots in the storage array.
 * Resize by half whenever utilization drops below 1/4.
 */

var makeHashTable = function () {
  var result = {};
  var storage = [];
  var storageLimit = 4;
  var size = 0;
  result.insert = function (key, value) {
    //insert에서는 넣을때 마다 size를 +1 해주고, storageLimit을 점검해서 resize해줘야 한다.
    let oldLimit = storageLimit; //resize 위해 추가해준 부분
    if (size >= oldLimit * 0.75) {
      storageLimit = storageLimit * 2; //리미트를 정수화? 해줄 필요가 잇을까용? 일단 테스트는 통과했습니다.
    }
    let index = getIndexBelowMaxForKey(key, storageLimit);
    if (result[index] === undefined) {
      storage.push([key, value]);
      result[index] = storage; //result = {index: [[key,value],[key2,value2]] , index2:[[key,value]]}
      storage = [];
      size++;
    } else {
      storage = result[index]; // [[key,value],[key2,value2]]
      for (let i = 0; i < storage.length; i++) {
        if (storage[i][0] === key) {
          //이 경우는 이미 있는 값을 변경하고 싶을때,
          storage[i][1] = value;
        } else {
          storage.push([key, value]);
          size++;
        }
      }
    }
  };

  result.retrieve = function (key) {
    //여기는 resize 필요X
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
    //요소를 하나씩 뺄때마다 size 를 하나씩 줄이고 resize는 가장 최종에 해준다. 메소드 시작 전에 resize 했던 insert와 다른점
    let index = getIndexBelowMaxForKey(key, storageLimit);
    if (result[index]) {
      storage = result[index]; // [[key,value],[key2,value2]]
      for (let i = 0; i < storage.length; i++) {
        if (storage[i][0] === key) {
          storage[i].splice(i, 1);
          size--;
        }
      }
      let oldLimit2 = storageLimit;
      if (size <= oldLimit2 * 0.25) {
        storageLimit = storageLimit * 0.5;
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
