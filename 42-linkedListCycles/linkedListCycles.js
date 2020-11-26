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



  // TODO: implement me!
  // next 에 먼저 나온 value를 포함하고 있는 노드가 있다면,싸이클이 존재  
  // 바깥쪽에서부터 탐색해서 들어가야함. 
  // 재귀함수로 안쪽을 타고 들어가서 검사 후 리턴.
  // val를 저장하는 배열을 만듦.


  // 재귀함수에 리턴을 걸지 않았을때 
  // nodeA { value: A , next :{ value: B , next: { value: A , }}}
  // recurs(nodeA)
  // values["A"]
  // callstack : hasCycle -> recurs(linkedList) -> recurs(B)
  // values["A","B"]
  // callstack : hasCycle -> recurs(linkedList) -> recurs(B) -> recurse(A)
  // recurse(A)는 종료가 되는데, 그 다음 콜스택은 리턴값이 없음. 

  // 객체 안의 value를 모두 끄집어 내서 배열로 만든다. 
  // 중복값을 검사한다.
  
  // setTimeout을 써서 에러를 방지해보기.

  // 꼬리재귀함수를 써보자.
  // 대부분의 예제와 달리 이 함수에서는 연산을 하지 않는다. 