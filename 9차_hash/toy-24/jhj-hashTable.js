/**
 * Create a hash table with `insert()`, `retrieve()`, and `remove()` methods.
 * The hashtable does not need to resize but it should still handle collisions.
 */

var makeHashTable = function () {
  var result = {};
  var storage = [];
  var storageLimit = 1000;
  result.insert = function (key, value) {
    // TODO: implement `insert()`
    let index = getIndexBelowMaxForKey(key, storageLimit);
    if (storage[index] === undefined) {
      storage[index] = [];
      storage[index].push([key, value]);
    } else {
      for (let i = 0; i < storage[index].length; i++) {
        if (storage[index][i][0] === key) {
          storage[index][i][1] = value;
        }
      }
      storage[index].push([key, value]);
    }
  };

  result.retrieve = function (key /*...*/) {
    // TODO: implement `retrieve()`
    let index = getIndexBelowMaxForKey(key, storageLimit);
    if (storage[index]) {
      for (let i = 0; i < storage[index].length; i++) {
        if (storage[index][i][0] === key) {
          return storage[index][i][1];
        }
      }
    }
    return undefined;
  };

  result.remove = function (key /*...*/) {
    // TODO: implement `remove()`
    let index = getIndexBelowMaxForKey(key, storageLimit);
    if (storage[index] !== undefined) {
      for (let i = 0; i < storage[index].length; i++) {
        if (storage[index][i][0] === key) {
          //return storage[index][i][1]
          return storage[index].splice(i, 1);
        }
      }
    }
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
