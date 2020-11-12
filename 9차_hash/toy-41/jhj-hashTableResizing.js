/**
 * Create a hash table with `insert()`, `retrieve()`, and `remove()` methods.
 * Be sure to handle hashing collisions correctly.
 * Set your hash table up to double the storage limit as
 * soon as the total number of items stored is greater than
 * 3/4th of the number of slots in the storage array.
 * Resize by half whenever utilization drops below 1/4.
 */

/**
 * Create a hash table with `insert()`, `retrieve()`, and `remove()` methods.
 * The hashtable does not need to resize but it should still handle collisions.
 */

//getIndexBelowMaxForKey의 결과값인 index를 storage(즉, hash table)의 index라 생각하고,
// storage[index]에 [key, value]를 넣는다.
// storage[index]에 이미 어떤 [key, value]가 들어가 있다면
// 내 key와 같으면 value를 업데이트 해주고
// 아니면 chaining.
// 즉, [      [      [key1, value1], [key2, value2]], , ,[[key3, value3]] ] 이런식이 되도록 구현했다.
//    storage bucket tuple
var makeHashTable = function () {
  var result = {};
  var storage = [];
  var storageLimit = 1000;
  var size = 0;

  result.insert = function (key, value) {
    // TODO: implement `insert()`
    let index = getIndexBelowMaxForKey(key, storageLimit);
    const tuple = [key, value];
    const bucket = storage[index] || [];
    let flag = false;

    for (let i = 0; i < bucket.length; i++) {
      // console.log('hey');
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        flag = true;
      }
    }

    if (flag === false) {
      bucket.push(tuple);
      size++;
    }
    storage[index] = bucket;

    if (size > 0.75 * storageLimit) {
      resize(storageLimit * 2);
    }
  };

  result.retrieve = function (key) {
    // TODO: implement `retrieve()`
    let index = getIndexBelowMaxForKey(key, storageLimit);
    const bucket = storage[index];

    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          return bucket[i][1];
        }
      }
    }
    return undefined;
  };

  result.remove = function (key) {
    // TODO: implement `remove()`
    let index = getIndexBelowMaxForKey(key, storageLimit);
    const bucket = storage[index];

    if (bucket !== undefined) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          size--;
          return bucket.splice(i, 1);
        }
      }
    }

    if (size < 0.25 * storageLimit) {
      resize(Math.floor(storageLimit / 2));
    }
  };

  function resize(newLimit) {
    storageLimit = newLimit;

    let oldStorage = storage.slice();
    size = 0;

    oldStorage.map((bucket) => {
      for (let i = 0; i < bucket.length; i++) {
        result.insert(bucket[i][0], bucket[i][1]);
      }
    });

    return;
  }

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
