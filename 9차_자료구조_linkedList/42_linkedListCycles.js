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
};

/* 의문점
    위 주석의 예시만 봐도, 처음 node가 아닌 중간 node로 연결되는 경우가 존재하는데,
    테스트케이스는 모두 처음 node로 연결되는 경우를 true로 처리하길 요구한다
    중간으로 연결되는 경우는 어떻게 처리할 것인가?
  */
var hasCycle = function (linkedList) {
  // TODO: implement me!
  let currentNode = linkedList;

  while (currentNode.next !== null) {
    if (currentNode.next === linkedList) {
      return true;
    } else {
      currentNode = currentNode.next;
    }
  }
  return false;
};

/* 다른 시도 : 처음에는 재귀를 활용하고 싶어 아래와 같이 작성했음

  - 마지막 테스트를 통과하지 못함
  - 내 생각엔 재귀의 콜스택 문제인 듯
  - 999999개의 node가 아니라 9999개의 node를 연결하고 콘솔에서 돌리면 true 잘 나온다
  - 위 제출 코드에서는 어쩔수없이 while 반복문으로 진행했음


  var hasCycle = function (linkedList) {
    // TODO: implement me!

    function recursion(node) {
      if (node.next === null || node.next.next === null) {
        return false;
      } else if (linkedList === node.next) {
        return true;
      } else {
        return recursion(node.next);
      }
    }

    return recursion(linkedList);
  };

*/
