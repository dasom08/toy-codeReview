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
    // TODO: implement `insert`
    const index = getIndexBelowMaxForKey(key, (storageLimit * 3) / 4);
    // const bucket = result[index] || []
    // bucket.push(value)
    // result[index] = bucket
    result[index] = value; // 충돌이 일어나면 chaining으로 연결하는게 아니라 아에 덮어씌우라고 하는구나(should allow valus to be updated)
    if (result[index].length < 1 / 4) {
      storageLimit /= 2;
    }
  };

  //주어진 키에 해당하는 값을 반환한다. 없다면 undefined를 반환한다.
  result.retrieve = function (key) {
    // TODO: implement `retrieve`
    const index = getIndexBelowMaxForKey(key, (storageLimit * 3) / 4);
    if (result[index]) {
      return result[index]; //should return values previously inserted
    }
    return undefined;
  };

  result.remove = function (key) {
    // TODO: implement `remove`
    const index = getIndexBelowMaxForKey(key, (storageLimit * 3) / 4);
    if (result[index]) {
      delete result[index];
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
