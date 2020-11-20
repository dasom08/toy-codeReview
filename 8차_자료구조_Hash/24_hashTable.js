/**
 * Create a hash table with `insert()`, `retrieve()`, and `remove()` methods.
 * The hashtable does not need to resize but it should still handle collisions.
 */

// resize 를 고려하지 말라고 해서 처리하지 않았는데, 이 부분도 핵심이 아닐까?

var makeHashTable = function () {
  var result = {};
  var storage = [];
  var storageLimit = 1000;
  result.insert = function (/*...*/ key, value) {
    // TODO: implement `insert()`
    const index = getIndexBelowMaxForKey(key, storageLimit);

    const bucket = storage[index] || [];

    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      if (tuple[0] === key) {
        const oldValue = tuple[1];
        tuple[1] = value;
        return oldValue;
      }
    }

    bucket.push([key, value]);
    storage[index] = bucket;

    return undefined;
  };

  result.retrieve = function (/*...*/ key) {
    // TODO: implement `retrieve()`
    let index = getIndexBelowMaxForKey(key, storageLimit);

    let bucket = storage[index];

    if (bucket === undefined) {
      return undefined;
    }

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }
  };

  result.remove = function (/*...*/ key) {
    // TODO: implement `remove()`
    let index = getIndexBelowMaxForKey(key, storageLimit);

    // 하나의 index 안에 걸려있는 key value 가 여러개라면,
    // 이를 bucket 안에 순차로 넣어서 collision 을 해결하도록 구성했으므로,
    // remove 기능에도 이러한 bucket의 경우를 고려해야 하지 않을까 해서 아래와 같이 구성함.
    let bucket = storage[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i);
      }
      if (bucket.length === 0) {
        storage.splice(index);
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
