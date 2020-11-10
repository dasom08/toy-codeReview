/**
 * Create a hash table with `insert()`, `retrieve()`, and `remove()` methods.
 * Be sure to handle hashing collisions correctly.
 * Set your hash table up to double the storage limit as
 * soon as the total number of items stored is greater than
 * 3/4th of the number of slots in the storage array.
 * Resize by half whenever utilization drops below 1/4.
 */

//해시테이블이란? 키값을 해시함수를 통해 인덱싱 한 후 값을 버켓에 저장한다. 
//그래서 객체를 사용하면 그냥 간단하다..
//해시테이블을 왜 써야하는지 잘 모르겠다..? 
//사이즈 변경 필요 

var makeHashTable = function () {
    var result = {};
    var storage = [];
    var storageLimit = 4;
    var size = 0;
  
    result.insert = function (key,val) {
      //arguments가 두개 여야한다. 
      //key들은 다시 써먹을 수 있어야 한다.
      
      //key값을 해싱한다. 
      let index = getIndexBelowMaxForKey(key,storageLimit)
      //storage를 버켓으로 사용하면 된다. 
      storage[index] = val
  
    };
  
    result.retrieve = function (key) {
      let index = getIndexBelowMaxForKey(key,storageLimit)
     
      return storage[index]
  
    };
  
    result.remove = function (key) {
      //특정 인덱스의 값 지우기 
      let index = getIndexBelowMaxForKey(key)
      storage.splice(index,1)
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