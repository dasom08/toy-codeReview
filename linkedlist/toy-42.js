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

var Node = function (value) {
  return { value: value, next: null };
}; //이것이든,

//cycle이라는 건 어떻게 판단하는가?(1). 위의 문제에서 힌트가 있다. cycle이 아닌건 어떤 node의 next가 반드시 Null이다.
//반면 cycle이면 어떤 노드의 next도 Null이 아니며, 반드시 방문한 것을 재방문하게 된다.
//그래서 방문한것을 재방문 하는지 체크해주는 객체 check을 만든다. property는 Node.value이고, value는 true(방문했음)이다.

//그리고 첫번째 (인자로 주어지는) 노드부터 탐색을 시작한다.
// 언제까지?
// 1. currNode.next === null 이면 cycle이 아니라는 거니까 false
// 2. check[currNode.next.value] === true 즉 재방문한다는 건 cycle이라는 거니까 true
// 3. 앞의 두 경우로 while을 벗어나고, 실행 결과도 반환하지 못하는 경우라면, 계속 next가 currNode가 되면서 탐색을 계속한다.
// 단, 시간복잡도가 크다.
// 1) should return false for a large sized non-cyclical linked list
// 2) should return true for a large sized cyclical linked list 이 두 테스트 케이스가 통과되지 않는다.
// 어디서 미리 판단할 수 있을까?
// 최악의 경우는
// 1) start -> tail0 -> tail1 -> ... -> tail99998 -> tail99999 -> null
// 2)  start -> tail0 -> tail1 -> ... -> tail99998 -> tail99999 -> start
// 이 두 경우이다. 즉, 아래의 방식은 O(N)이라서 N이 이렇게 크면 한계가 있다.

var hasCycle = function (linkedList) {
  // TODO: implement me!
  var check = {};
  var currNode = linkedList;
  while (1) {
    check[currNode.value] = true;
    if (currNode.next === null) {
      return false;
    } else if (check[currNode.next.value] === true) {
      return true;
    } else {
      currNode = currNode.next;
    }
  }
};

//돌아온다는건, 나머지 1이 모여서 한 주기를 이룰 때 생기는 것,
// 그러니까 cycle을 구성하고 있는 요소가 3일 때, 1차이 나는게 3번 반복되면, 한 바퀴 차이나는게 되고, 결국 따라잡히면서 만나게 된다.
// 1차이 나는 것을 .next를 한번 더 해주는 걸로 구현
// 그런데 이렇게 해도 어짜피 최악의 경우 O(N)이 아닌가? 의문이 들긴한다.
// var hasCycle = function (linkedList) {
//   let currNode = linkedList
//   let nextNode = linkedList

//   while (nextNode && nextNode.next) {
//     currNode = currNode.next
//     nextNode = nextNode.next.next
//     if (currNode === nextNode) {
//       //node 하나만 있는 걸 cycle로 안치니까 , line 75, 76때문에 이 검사를 나중에 해야함.
//       return true
//     }
//   }
//   return false
// }
