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

  // 주어진 키와 값을 저장합니다. 이미 해당 키가 저장되어 있다면 "값을 덮어씌웁니다".
  result.insert = function (/*...*/ key, value) {
    // TODO: implement `insert`

    let index = getIndexBelowMaxForKey(key, storageLimit);

    let bucket = storage[index] || [];

    // 이미 해당 키가 저장되어 있다면 값을 덮어씌웁니다.
    if (bucket.length > 0) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket[i][1] = value;
          return bucket;
        }
      }
    }

    bucket.push([key, value]);
    storage[index] = bucket;
    size++;

    if (size / storageLimit >= 0.75) {
      resize(Math.floor(storageLimit * 2)); // Math.floor : 소수점 이하 '버림' 기능
    }

    return bucket;
  };

  // 주어진 키에 해당하는 값을 반환합니다. 없다면 undefined를 반환합니다.
  result.retrieve = function (key /*...*/) {
    // TODO: implement `retrieve`
    let index = getIndexBelowMaxForKey(key, storageLimit);

    let bucket = storage[index] || [];

    if (bucket.length < 1) {
      return undefined;
    }

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      } else {
        return undefined;
      }
    }
  };

  // 주어진 키에 해당하는 값을 삭제하고 값을 반환합니다. 없다면 undefined를 반환합니다.
  result.remove = function (key /*...*/) {
    // TODO: implement `remove`
    let index = getIndexBelowMaxForKey(key, storageLimit);

    let bucket = storage[index];

    if (bucket.length === 1) {
      bucket.splice(0, 1);
      size--;
    } else if (bucket.length > 1) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket.splice(i, 1);
          size--;
        }
      }
    }

    if (size / storageLimit <= 0.25) {
      resize(Math.floor(storageLimit / 2)); // Math.floor : 소수점 이하 '버림' 기능
    }

    return undefined;
  };

  // -------------------------------------------------------

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

  // -------------------------------------------------------

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
