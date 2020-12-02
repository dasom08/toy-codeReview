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

/*  (0816) 아래와 같이 작성하여, 일단 테스트는 다 통과했음.
  아래 문제점들이 남았음.
  
  - BinaryHeap 이라는 개념을 내가 제대로 이해하고 있는 것이 맞나?
  - logarithmic time 으로 구성할 것을 요구한 것 같은데, bubble sort를 사용했으니 O(n^2) 이 아닌가?
  - Extra credit 두 가지를 전혀 손대지 못함

*/

/*  개념 정리
  - 자료구조 "힙(heap)" 관련 문제임

  (1) 완전 이진 트리의 일종임 (자식이 0,1,2개 중 하나이며, 좌측 자식은 우측 자식보다 항상 작다)
    - (느슨한 정렬)반정렬 상태를 유지한다. : 큰 값이 위에 있고, 작은 값이 아래에 있다는 정도
    - 중복된 값을 허용함

  (2) 최대 힙(부모 노드가 자식 노드보다 크거나 같음) / 최소 힙(부모 노드가 자식 노드보다 작거나 같음)

  (3) 힙에서의 부모 노드와 자식 노드의 관계
    - "원활한 계산을 위해, 첫번째(root) index를 1로 잡고 생각한다."
    - 부모의 인덱스 = (자식의 인덱스) / 2
    - 왼쪽 자식의 인덱스 = (부모의 인덱스) * 2
    - 오른쪽 자식의 인덱스 = (부모의 인덱스) * 2 + 1

  (4) 삽입(insert)
    - 맨 뒤에 값을 넣고, 
    - 그 부모와 비교해서, 조건에 맞으면 바꿔주고, 
    - 새로 들어간 자리의 다른쪽 자식과 비교하고, 조건에 맞으면 바꿔주고,
    - 또 그 위의 부모와 비교해 간다.

  (5) 루트 노드 제거(removeRoot)
    - 루트값을 지우고, 
    - 맨 뒤에 값을 루트 자리에 넣고, 
    - 그 자식들과 비교해서, 조건에 맞으면 바꿔주고,
    - 또 그 아래의 자식들과 비교해 간다.

  - 위와 같이 삽입/삭제 후 값을 정리해 가는 과정에서, 자연스럽게 log n으로 수렴하게 되는 걸까?
  
  - '우선순위 Queue'에서 쓰인다
      - '루트 노드(제일 우선순위가 높은 항목)'를 제일먼저 queue 밖으로 빼 주고(dequeue),
      - 새로운 루트 노드를 찾아나서서 새롭게 정렬한다.


*/

function BinaryHeap() {
  this._heap = [];
  // this compare function will result in a minHeap(최소 힙), use it to make comparisons between nodes in your solution
  this._compare = function (i, j) {
    return i < j;
  };
}

// This function works just fine and shouldn't be modified
BinaryHeap.prototype.getRoot = function () {
  return this._heap[0];
};

/*  일단 아래의 insert 기능이 잘 동작은 하는데, 
  
  <궁금한 점>
    - 한 부모 안의 두 자식을 비교하면, "좌측이 항상 더 작은 상황은 아니다."
    - 오른쪽이 더 작은 값이더라도 에러 없이 heap 안에 들어가는데, 이게 BinaryHeap이라는 개념에 맞는 것인가?

    - min heap, 이면 상위 값이 하위 값보다 항상 작을 것을 요구하지만, 자식 노드 사이에서는 우열을 가리지 않아도 되는 것인가?

    - https://gmlwjd9405.github.io/2018/05/10/data-structure-heap.html
    - 참고했던 위 블로그에서는 이 부분을 언급하지 않았고, 반정렬 상태(느슨한 정렬 상태)라고만 했으며, 
    - 그림 예시들에서도, 우측 자식이 좌측 자식보다 더 큰 경우가 많이 나옴

  <내 생각> 
    - removeRoot 구현 부분에서 이에 관한 내 생각을 적어뒀음
    - 결론 1 (line 191) : insert 기능으로 오른쪽 자식에서 부모 노드로 올라왔다면, 새롭게 만난 왼쪽 자식은 당연히 이보다 작다
    - 결론 2 (line 328) : 자식간의 우열은 가릴 필요 없고, 왼쪽으로 파고 들어가는 것이 맞다고 생각한다
    - 문제는, 자식간의 우열을 가리지 않는다면, removeRoot 기능에서 의문점이 생김 (아래에서 적어뒀음)

*/

BinaryHeap.prototype.insert = function (value) {
  // TODO: Your code here
  this._heap.push(value); // 가장 뒤에 일단 추가하고,

  if (this._heap.length === 1) {
    return;
  }

  if (this._heap.length === 2) {
    if (this._compare(this._heap[0], this._heap[1])) {
      return;
    } else {
      let temp = this._heap[1];
      this._heap[1] = this._heap[0];
      this._heap[0] = temp;
      return;
    }
  }

  let count = 0;

  let insertedValueIndex = this._heap.length; // 삽입된 값의 index

  while (count < Math.log(insertedValueIndex) + 1) {
    let parentIndex = parseInt(insertedValueIndex / 2); // 부모 노드의 index

    let temp;

    if (
      this._compare(
        this._heap[parentIndex - 1],
        this._heap[insertedValueIndex - 1]
      )
    ) {
      return;
    }

    // 부모 노드가 작지 않다면, (최소 힙 조건에 어긋난다면,) 부모와 자식을 교환한다.
    if (
      !this._compare(
        this._heap[parentIndex - 1],
        this._heap[insertedValueIndex - 1]
      )
    ) {
      temp = this._heap[insertedValueIndex - 1];
      this._heap[insertedValueIndex - 1] = this._heap[parentIndex - 1];
      this._heap[parentIndex - 1] = temp;

      temp = undefined;

      insertedValueIndex = parentIndex; // 부모 자리로 위치가 바뀐 것을 반영해 주고,

      /*  (새로운 부모 자리에서, 아직 비교하지 않은 다른 자식과 비교하는 기능)
            => 비교를 거쳐 교환되고 위로 올라갔다면, "그 아래의 자식은 당연히 이보다 작음"
              - 가령, 오른쪽에서 하나씩 올라왔다면, 올라온 후에 만난 왼쪽 자식보다는 무조건 크다
              - 그래서 아래의 처리는 쓸모없다...
        
        if (!this._compare(this._heap[insertedValueIndex - 1], this._heap[(2 * insertedValueIndex) - 1])) {
          temp = this._heap[(2 * insertedValueIndex) - 1];
          this._heap[(2 * insertedValueIndex) - 1] = this._heap[insertedValueIndex - 1];
          this._heap[insertedValueIndex - 1] = temp;
          
          temp = undefined;
        }
    
        if (!this._compare(this._heap[insertedValueIndex - 1], this._heap[(2 * insertedValueIndex)])) {
          temp = this._heap[(2 * insertedValueIndex) - 1];
          this._heap[(2 * insertedValueIndex) - 1] = this._heap[insertedValueIndex - 1];
          this._heap[insertedValueIndex - 1] = temp;
          
          temp = undefined;
        }
      */
    }

    count++;
  }

  /*  먼저 제출해서 일단 통과는 되었던 코드
        => 이거는 O(n^2) 방식임 - heap의 정의와 무관하게 테스트만 통과하는 코드
            위에서 새로 작성했음

    //  bubble sort 코드
    for (let i = 0; i < this._heap.length; i++) {
      for (let j = 0; j < this._heap.length - 1 - i; j++) {
        if (this._compare(this._heap[j], this._heap[j+1]) === false) {
          let switchElement = this._heap[j+1];
          this._heap[j+1] = this._heap[j];
          this._heap[j] = switchElement;
        }
      }
    }

  */
};

BinaryHeap.prototype.removeRoot = function () {
  // TODO: Your code here

  // 처음에 제출한 말도 안 되는 답안 - return this._heap.shift();
  // 이하에서 개선함

  // 가장 밑의 리턴에 관한 궁금증 참고
  let removedRoot = this._heap[0];

  // 맨 뒤의 값을 맨 위로 올린 뒤,
  this._heap[0] = this._heap.pop();

  if (this._heap.length === 1) {
    return removedRoot;
  }

  if (this._heap.length === 2) {
    if (this._compare(this._heap[0], this._heap[1])) {
      return removedRoot;
    } else {
      let temp = this._heap[1];
      this._heap[1] = this._heap[0];
      this._heap[0] = temp;
      return removedRoot;
    }
  }

  // heap 안의 값이 3개 이상이면, 본격적으로 탐색함
  let count = 0;

  let insertedValueIndex = 0; // root 로 올라간 값의 index (최초에는 root 자리니까 0부터 시작하게 됨.)

  while (count < Math.log(this._heap.length) + 1) {
    let leftChildIndex = (insertedValueIndex + 1) * 2 - 1; // 부모 노드의 왼쪽 자식
    let rightChildIndex = (insertedValueIndex + 1) * 2; // 부모 노드의 오른쪽 자식

    let temp;

    // 양쪽 자식하고 다 비교해서 문제 없다면, 그만 돌리고 리턴해라 (기저조건 1)
    if (
      this._compare(
        this._heap[insertedValueIndex],
        this._heap[leftChildIndex]
      ) &&
      this._compare(this._heap[insertedValueIndex], this._heap[rightChildIndex])
    ) {
      return removedRoot;
    }

    // 자식 노드가 왼쪽 하나뿐이고, 현재노드가 왼쪽자식보다 작고(더 돌릴 필요 없고,) 오른쪽은 노드가 없다면,
    // => 그만 돌리고 리턴해라 (기저조건 2)
    if (
      this._compare(
        this._heap[insertedValueIndex],
        this._heap[leftChildIndex]
      ) &&
      this._heap[rightChildIndex] === undefined
    ) {
      return removedRoot;
    }

    // 자식 노드가 양쪽 다 없다면,
    // => 그만 돌리고 리턴해라 (기저조건 3)
    if (
      this._heap[leftChildIndex] === undefined &&
      this._heap[rightChildIndex] === undefined
    ) {
      return removedRoot;
    }

    // 위 기저조건을 통과하지 못했다면, 자식 둘 중 하나는 부모보다 작은 것임

    // 자식끼리 비교하지 않고 진행하니까, 나중에 이상한 문제가 생김
    // 자식끼리 비교해서 더 작은쪽으로 내려가게 해야 할 듯

    // 왼쪽 자식이 오른쪽 자식보다 작다면, 부모와 왼쪽 자식을 교환한다.
    // if (!this._compare(this._heap[insertedValueIndex], this._heap[leftChildIndex])) {
    if (
      this._compare(this._heap[leftChildIndex], this._heap[rightChildIndex])
    ) {
      temp = this._heap[leftChildIndex];
      this._heap[leftChildIndex] = this._heap[insertedValueIndex];
      this._heap[insertedValueIndex] = temp;

      temp = undefined;

      insertedValueIndex = leftChildIndex; // 부모 자리로 위치가 바뀐 것을 반영해 주고,
    }
    // 왼쪽 자식이 오른쪽 자식보다 크다면, 부모와 오른쪽 자식을 교환한다.
    // else if (!this._compare(this._heap[insertedValueIndex], this._heap[rightChildIndex])) {
    else {
      temp = this._heap[rightChildIndex];
      this._heap[rightChildIndex] = this._heap[insertedValueIndex];
      this._heap[insertedValueIndex] = temp;

      temp = undefined;

      insertedValueIndex = rightChildIndex; // 부모 자리로 위치가 바뀐 것을 반영해 주고,
    }

    count++;

    /*  '자식 노드끼리에서는 우열(크기비교)을 가리지 않는 점'에서, 아래와 같은 궁금한 점이 생겼음

    <궁금한 점>
      부모 노드가 왼쪽 자식보다도 오른쪽 자식보다도 작다면, 왼쪽으로 내려가는 것이 옳은가 오른쪽으로 내려가는 것이 옳은가?
        => 양 자식을 비교해서 더 작은 쪽으로 내려가게 해야 한다?

            2
          3     4
        5 6   7 8 

      여기서 2를 지우면 8이 위로 올라올건데, 8은 왼쪽 자식 3보다도 작고, 오른쪽 자식 4보다도 작다  
      - 왼쪽과 먼저 비교하는 방식이면, 8은 5 밑으로 들어갈거고, root는 3이 된다. (5 밑에 8과 6이 있는 구조가 됨)
      - 오른쪽 먼저 비교하는 방식이면, root가 4가 되고, 4자리에 7이 오고, 8은 7의 왼쪽 노드가 됨

    <내 결론>
      - 특성상 왼쪽 자식부터 채워지게 되는 점 / 이를 이용해서 기저조건 2를 구성한 점 등을 감안하면, 
      - 왼쪽과 먼저 비교하는 방식이 맞다고 생각함
    */
  }

  /*
    <궁금한 점> - 리턴값에 관하여,
      - 테스트케이스를 보면, 빼버린 최초의 루트값을 그대로 리턴하길 요구하는 것 같다.
      - root를 없애고 난 뒤의 새로운 루트를 리턴하는 것을 요구하는 줄 알았는데,
    
    <내 생각>
      - 테스트케이스에서 요구하는 방법이 맞다고 생각함
      - 우선순위 queue 개념이, 가장 위에 있는 값을 '빼내서 써먹기 위한 것'이라면, 
  */
  return removedRoot;
};

/*  while 반복문의 횟수를 정해주는 부분에서,

  <궁금한 점>
    - 사실, 이 부분에 대한 명확한 고민이 부족했음.
    - '1을 더하지 않고도 해결할 수 있을까' 하는 생각.
    - 길이를 log 처리한 후 1을 더해줘서 한번 더 돌게 했음

  <내 생각>
    - 1을 더 넣어줘서 반북문을 한바퀴 더 돌리는 것이 맞지 않나 생각함
    - 그러나, 처리가 나름 끝난 뒤 기저조건으로 마무리하는 1회의 처리를 위해서라도, 

*/
