/**
 * A heap is a special kind of tree in which a parent node is ordered only in
 * respect to its immediate children. Unlike the binary search tree you may have
 * implemented, where the entire tree is ordered, in a heap the only order
 * guaranteed is between a node and its parent.
 *
 * In a binary heap each node should have only zero, one, or two children. Each node
 * must have 2 children before the next oldest node can have any children. Therefore
 * the 0th node will be the parent of the 1st and 2nd nodes, the 1st node will be the
 * parent of the 3rd and 4th nodes, and the 2nd node will be the parent of the 5th and
 * 6th nodes. In a specific kind of binary heap, the binary min heap, every node is
 * less than its immediate children:
 * 
 *          0
 *     1         2
 *   3   4     5   6
 *  7
 *
 * There is only one place at any given time in a binary heap where a node can be
 * added or removed. In the example above, the next node will be inserted as the second
 * child of 3. If we were to remove a node instead, we would remove the 7. This mimics
 * the behavior of a stack and allows us to manage the heap in a very memory efficient way,
 * using a list or array. For example, the heap pictured above can be described as:
 *
 * [0, 1, 2, 3, 4, 5, 6, 7]
 *
 * where we always add to or remove from the end of the array.
 *
 * A well known fact, utilized with binary heaps stored in arrays, is that
 * we can calculate the index of a node's parent or children using math:
 *
 * parentIndex = Math.floor( (index - 1) / 2 )
 * childrenIndices = [index * 2 + 1, index * 2 + 2]
 *
 * When adding a new node to a binary min heap, it could be that we violate the property of the
 * heap whereby every node is of lower value than its children. Thus whenever we insert into
 * a binary min heap, we must compare the inserted node to its parent, and swap their positions
 * if it is less than its parent. After a swap it must compare itself to its new parent, continuing
 * until it is no longer less than its parent.
 *
 * Something similar happens when we want to remove the root node. Because we can only remove from the
 * end of the array we swap the position of the last node and the root node and then remove the now-last
 * node from the heap. The new root node now must be compared to its children and if it is not less than
 * both of them, be swapped with whichever of the two of them is the smallest. It is then compared with its
 * new children and this swapping continues until it is less than both its children.
 *
 * You can see a great visualization of a binary min heap in action here, play around with it until you can
 * easily guess how the heap will behave with both insertion and removal:
 * https://www.cs.usfca.edu/~galles/visualization/Heap.html
 */


// Below is a binary heap whose nodes are integers. Its storage is an array and
// its `getRoot` method is already written. `BinaryHeap`'s `this._compare` method is hard-coded to return
// whether the fist element passed into it is less than the second. Use it when comparing nodes.
//
// Implement the `insert` and `removeRoot` methods, each operating in logarithmic time relative
// to the size of the heap, and each restoring the heap's property of parent to child sorting. Use
// the equations above to navigate parent / child relationships in the storage array, and write any
// helper functions needed to assist you.
//
// Extra credit: `BinaryHeap`'s `this._compare` is hard-coded to assist in making a min heap, modify `BinaryHeap`
// to accept an optional argument which is a function used as the sorting mechanism for the heap.
// That way you can use your `BinaryHeap` class to construct a max heap or min heap or whatever.
//
// Extra extra credit: Implement `heapSort`. `heapSort` takes an array, constructs it into a `BinaryHeap`
// and then iteratively returns the root of the `BinaryHeap` until its empty, thus returning a sorted array.

// 힙에 대한 설명 : https://www.youtube.com/watch?v=AE5I0xACpZs

function BinaryHeap () {
  this._heap = [];
  // this compare function will result in a minHeap, use it to make comparisons between nodes in your solution
  this._compare = function (i, j) { return i < j };//return true or false 
}

// This function works just fine and shouldn't be modified
BinaryHeap.prototype.getRoot = function () {
  return this._heap[0];
}

BinaryHeap.prototype.insert = function (value) {
  // TODO: Your code here
  // 부모노드 보다는 값이 커야함. 즉 새로 들어오는 값은, 기존에 있던 값보다 커야함.
  // 새로 들어오는 값이 더 작다면, 기존값하고 비교해서 위치를 바꿔주어야함. 

  let heap = this._heap;

  if(heap.length === 0 ){
    heap.push(value)
  }
  else if(this._compare(heap[heap.length - 1],value)){
    //배열의 마지막값과 새로 주어진 값을 비교해서 배열의 마지막값 < value이면 맨 뒤에 넣기. 
    heap.push(value)
  } 
  else if(!this._compare(heap[0],value)){
    //배열의 첫번째 값보다 작다면 맨앞에 넣기. 
    heap.unshift(value)
  }
  else{
  //value 값이 더 작을 경우 [0,1,5,9] value = 7 
  //1번째 값과 비교한 후 크면 통과. 2번째 값과 비교한 후 크면 통과. 3번째 값과 비교하면 작으므로 넣어주기.
  //중간에 push로 넣어줄 수가 없으므로 빈배열을 만들어서 넣어주기. 그리고 그 인덱스 값 이후를 다시 넣어준다. 
  //queue개념을 사용해서 한개씩 빼서 넣어보기.

  let findIndex = ()=>{
    for(let i = 0; i < heap.length; i++){
      if(!this._compare(heap[i],value)){
        return i 
      }  
    }
  }
  
  let bigNum = findIndex()
  let arr = []

  for(let i = 0; i < bigNum ; i++){
    arr.push(heap[0])
    //arr[4,5]
    heap.shift()
    //heap[]
  }
  console.log(arr)
  arr.push(value)

  for(let i = 0; i < heap.length; i++){
    arr.push(heap[0])
    heap.shift()
  }
  for(let i of arr){
    heap.push(i)
  }

  }
  //생각해보니 그냥 sort해버리면 그냥 통과할듯. 근데 그건 힙방식이 아닌것 같다. 그리고 구현을 요구하는 방식도 완전한 힙은 아닌걸로 보이는데. 
  
}

BinaryHeap.prototype.removeRoot = function () {
  let heap = this._heap
  if(heap.length === 0 ){
    return undefined; 
  }
  let root = heap[0]
  heap.shift();
  return root
}

// let binaryHeap = new BinaryHeap()
