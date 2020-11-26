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

var Node = function(value){
  return { value: value, next: null };
}

var hasCycle = function(linkedList){
  let slow = linkedList;
  let fast = linkedList;
  
  // fast.next가 null이면 사이클 없이 종료
  while(fast && fast.next){
    slow = slow.next;
    console.log("slow : ",slow)
    fast = fast.next.next; 
    console.log("fast : ",fast)
    if(slow === fast){
      return true
    }
  }
  return false
};
// https://velog.io/@yujo/JSLeetcode-141.-Linked-List-Cycle


  // nodeA가 들어간다. value를 넣어준다. 
  // 리커젼이 일어난다. 이 리커젼을, setTimeout 시키면
  // 콜스택에서 리커젼이 사라져 버린다. 
  // 콜스택 큐로 넘어가기 때문. 
  
  // 걍 반복문으로 실행하자.. 

  // function recurs(node){
  //   if(values.includes(node.value)){
  //     return true
  //   }
  //   else if(node.next === null){
  //     return false
  //   }
  //   else{
  //     values.push(node.value)
  //     node[next] = node.next.next 
  //      return recurs(node.next)
  //   }
  // }

