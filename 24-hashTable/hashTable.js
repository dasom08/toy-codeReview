/**
 * Create a hash table with `insert()`, `retrieve()`, and `remove()` methods.
 * The hashtable does not need to resize but it should still handle collisions.
 */

//해시테이블이란 해시함수를 통해 키와 밸류를 가진 쌍을 저장하는 것 
//키는 해시함수를 통해 나온 값이 된다. 
//밸류는 저장하고자 하는 값(주어진 파라미터)
//해시함수를 통해서 데이터를 저장하기 때문에, 암호화가 된다. 
//result가 객체이므로, 스토리지는 밸류여야 할듯. 


// 데이터  --> 해시함수 --> 인덱스 값 반환, 해당 인덱스가 있는 해쉬 테이블에 데이터값이 들어가게 됨. 
// 해쉬테이블은 키,값 쌍의 구조. 
// cat : cute 가 쌍이라면, cat을 넣었을 때 cute를 반환해야함. 
// 두개를 넣는 건 인서트. 

let source = {name:"dasom"}
let source2 = {gender:"female"}
//source 와 source2는 동일한 인덱스 값을 가져서 충돌이 일어난다. 
//체이닝 또는 리니어 프로빙을 해주어야 함. 

let source3 = {hobby:"coding always"}

var makeHashTable = function(){
  var result = {};
  var storage = [];
  var storageLimit = 1000;

  result.insert = function(key,val){
    //키를 암호화한다. 일단 항상 1개의 키를 가진 객체를 받는다고 가정. 
    //키값을 어떻게 알아내지? 
    //테스트 케이스에 키와 밸류로 받으라고 되어있음;

    let max = key.length;
    let hashIndex = getIndexBelowMaxForKey(key[0],max)
    
    //result는 메소드를 담기 위함. storage는 메소드가 아니기 때문에 바로 접근불가. 
    // storage[hashIndex] = obj[key] //추가 되지 않고, 대체되어 버림. 매번 실행될때마다 스토리지가 리셋됨. 
    //만약 푸쉬를 한다면? 그래도 마찬가지. 리셋되어 버림. 결국 이걸 저장하기 위해서는 result에 저장해야 할것 같음. 
    
    //1번코드 
    // storage[hashIndex] = obj[key]
    // result[hashIndex] = storage; 

    //이렇게 해도 대체되어 버림. 
    //구글링. https://medium.com/@clgh0331/javascript-node-js-hash-table%EC%9D%84-%EA%B5%AC%ED%98%84-f1442b24571c
    //이차원 배열로 저장해준다는 이야기. 구조는 { storage : [], index f , ...}
    //그렇다면, result 에 스토리지를 연결하는 것은 맞음. 
    //위의 레퍼런스에서는 class방식을 사용했기 때문에, let data = new hashTable(100); 이렇게 선언해주고 있음.
    //그렇다면, 현재 작성하고 있는 함수 방식에서도 함수의 데이터를 저장해준 뒤에, 인서트를 하면 리셋이 되지 않을것 같다.

    //1번코드를 사용하게 되면, hashIndex를 키값으로 가진 storage를 계속 생성하게 됨. 레퍼런스처럼 하려면, 같은 스토리지를 반복사용해야함.
        
    // storage[hashIndex] = obj[key]
    // result["storage"] = storage; 

    //해당 인덱스 값에 넣는것 성공! 
    //동일한 인덱스 값이 발생(아마 콜리전?)하면 어떻게 할 것인가? 즉, 해시값이 같은경우. 어떻게 해결해야 할까? 
    //내가 짠 코드는 키를 인덱스로 보고 밸류만 저장했기 때문에 덮어써지게 될것. 그렇다고 추가를 해주게 되면 인덱스 값이 변환되서 찾을수가 없어짐. 
    //레퍼런스에서는 2차원 배열을 통해서 해결. 근데 그냥..객체쓰면 안되나. 
    //그냥 일단 객체로 해보기로. 
    //그렇다면 result = {storage : [ hashIndex: {key: val}, hashIndex: { key, val} ]}...? storage가 배열이라서, 객체를 하나더 추가해주어야됨.
    //그럼 더 복잡해지므로 2차원 배열로 변경. 
   
    let arr = []
    arr.push(key)
    arr.push(val) // arr[key,val]
    //storage [ arr, arr2 ...  ]

    // storage[hashIndex] = arr //대체되어 버리기때문에.
    // result["storage"] = storage;

    //배열이 계속 추가될 뿐이므로, hashIndex값을 찾을 수 없음. 
    //ref에서는 hashIndex = 배열의 index이며, 동일 index일 경우 이차원배열. 
    //레퍼런스에서는 1번째 배열의 인덱스를 해쉬인덱스로 해서, 체이닝을 해주고 있음. 

    // storage [
    //    0 [ [key , val], [key, val] ],
    //    1 [ [key , val] ]
    // ]

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
    
    //오늘 따라 몽롱하네.. ㅠㅠ 생각이어지게 하기가 너무 힘들다. 
    //다른 키값인데, 해쉬함수의 결과가 같을 수 있음. 
    //따라서 해쉬를 먼저 검증하는게 아니라, 키값이 존재하는지를 확인하기. 
    //근데 해쉬값이 같다면, 어차피 체이닝됨. 

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

class hashTable{
    constructor(size){
        this.storage = [];
        if(size){
            this.size = size;
        }
        else{
            this.size = 100;
        }
    }
    insert = (key,value) => {               
        let index = this.hash(key);
        
        if(this.storage[index] === undefined){
            this.storage[index] = [[key, value]];
        }
        else{
            let storageFlag = false;
            for(let i = 0; i < this.storage[index].length; i++){
                if(this.storage[index][i][0] === key){
                    this.storage[index][i][1] = value;
                    storageFlag = true;
                }
            }
            if(!storageFlag){
                this.storage[index].push([key,value]);
            }
        }
    }
    delete = (key) => {
        let index = this.hash(key);
        if(this.storage[index] === undefined){
            return false;
        }
        else if(this.storage[index].length === 1 && this.storage[index][0][0] === key){
            this.storage.splice(index,1);
            return true;
        }
        else{
            for(let i = 0; i < this.storage[index].length; i++){
                if(this.storage[index][i][0] === key){
                    this.storage[index].splice(i,1)
                    return true;
                }
            }
            return false;
        }
    }
    search = (key) => {
        let index = this.hash(key);
        if(this.storage[index] === undefined){
            return false;
        }
        else if(this.storage[index].length === 1 && this.storage[index][0][0] === key){
            return this.storage[index][0][1];
        }
        else{
            for(let i = 0; i < this.storage[index].length; i++){
                if(this.storage[index][i][0] === key){
                    return this.storage[index][i][1];
                }
            }
            return false;
        } 
    }

    hash = (key) => {
        let hash = 0;
        for(let i = 0; i < key.length; i++){
            hash += key.charCodeAt(i);
        }
        return hash % this.size;
    }

    getTable(){
        return this.storage;
    }

}