/*
 * Assignment: Write a function that returns true if a linked list contains a cycle, or false if it terminates somewhere
 *
 * Explanation:
 *
 * Generally, we assume that a linked list will terminate in a null next pointer, as follows:
 *
 * A -> B -> C -> D -> E -> null
 *
 * A 'cycle' in a linked list is when traversing the list would result in visiting the same nodes over and over
 * This is caused by pointing a node in the list to another node that already appeared earlier in the list. Example:
 *
 * A -> B -> C
 *      ^    |
 *      |    v
 *      E <- D
 *
 * Example code:
 *
 * var nodeA = Node('A');
 * var nodeB = nodeA.next = Node('B');
 * var nodeC = nodeB.next = Node('C');
 * var nodeD = nodeC.next = Node('D');
 * var nodeE = nodeD.next = Node('E');
 * hasCycle(nodeA); // => false
 * nodeE.next = nodeB;
 * hasCycle(nodeA); // => true
 *
 * Constraint 1: Do this in linear time
 * Constraint 2: Do this in constant space
 * Constraint 3: Do not mutate the original nodes in any way
 */
// cycle 인 경우!
// 1차
// A (s,f)-> B -> C
//           |    |
//           E <- D
// 2차
// A-> B(s) -> C(f)
//      |        |
//      E   <-   D

// 3차
// A->  B   ->  C(s)
//      |        |
//      E (f) <- D

// 4차
// A->  B   ->  C(f)
//      |        |
//      E   <- D(s)

// 5차
// A->  B     ->  C
//      |         |
//      E (s,f)<- D

// cycle이 아닌경우!
// 1차
// A (s,f)-> B -> C -> D -> E -> null

// 2차
// A -> B(s) -> C(f) -> D -> E -> null

// 3차
// A -> B -> C(s) -> D -> E(f) -> null

// 4차
// A->  B  -> C -> D(s) -> E -> null => checkFast 말은 연결리스트를 벗어나서 null이 되어버림

var Node = function (value) {
  return { value: value, next: null };
};

var hasCycle = function (linkedList) {
  //해당 함수의 인자로 연결리스트의 노드 중 하나가 주어졌을 때, 이중연결인지 아닌지의 여부를 점검
  //https://medium.com/@joshuablankenshipnola/checking-for-linked-list-cycles-in-javascript-77ec9adc6822
  //연결리스트를 순회하는 두개의 말이 있다고 가정,
  //하나는 한칸씩 이동하고, 나머지 하나는 두칸씩 이동한다. 그러다가 이 두개의 말이 어디선가 만나게 된다면 이는 이중 연결 리스트라는 의미이다.
  let checkSlow = linkedList;
  let checkFast = linkedList;
  while (checkFast && checkFast.next) {
    checkSlow = checkSlow.next;
    checkFast = checkFast.next.next;
    if (checkSlow === checkFast) {
      return true;
    }
  }
  return false;
};
