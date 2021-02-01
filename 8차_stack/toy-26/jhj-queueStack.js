/**
 * Write a stack using your preferred instantiation pattern.
 * Avoid using native array methods i.e., push, pop, and length.
 * Once you're done, implement a queue using two stacks.
 */

/**
 * Stack Class
 */
/*
Stack은 단순 
배열을 이용하고 배열 '맨뒤'('위'이기도 한)에서만 값이 넣어지고 빼지기때문에 배열.push와 배열.pop사용
stack의 구조처럼 push(a)-> push(b) -> push(c) 를 하면 아래서부터 a, b, c가 순서대로 들어가고
pop()-> pop() -> pop() 하면 위에서부터 c-> b-> a가 순서대로 나온다. 
| c |
| b | 
|_a_|
원래 this.list.pop(); this.inx -= 1; 까지만 구현해도 stack pop기능에는 이상이 없지만 
뒤에 queue를 구현 할때 inbox에서 pop한 값을 outbox에 넣어야하기 때문에 pop한 값을 알고 있어햐 한다. 
그래서 let top = this.list.pop();this.inx -= 1;return top;
으로 수정.
*/
var Stack = function () {
  this.list = [];
  this.inx = 0;

  // add an item to the top of the stack
  this.push = function (value) {
    this.list.push(value);
    this.inx += 1;
  };

  // remove an item from the top of the stack
  this.pop = function () {
    if (this.inx === 0) {
      console.log('StackUnderFlow');
    } else {
      let top = this.list.pop();
      this.inx -= 1;
      return top;
    }
  };

  // return the number of items in the stack
  this.size = function () {
    return this.inx;
  };
};

/**
 * Queue Class
 */
/*
Stack을 이용한 Queue는 enqueue는 둘다 뒤에 넣어주는 것이므로 동일한 개념이다(단, 값을 '넣어'주는 거니까 inbox에 push해준다.)
그런데 dequeu가 서로 방법이 다르므로 조금 복잡하다. 
inbox   outbox
| c |   |   |
| b |   |   | 
|_a_|   |_ _|
일 때 dequeue시 a가 inbox에서 제거되어야 하므로
1. inbox.pop()을 a만 남아있을 때까지 반복해주고, (while (inbox.size() !== 1))
inbox   outbox
|   |   |   |
|   |   | b | 
|_a_|   |_c_|

2. a를 pop한 다음 (이 역시 값을 return해주어야지 테스트케이스 line 161, 162의 조건을 만족)(let item = inbox.pop())
inbox   outbox
|   |   |   |
|   |   | b | 
|_ _|   |_c_|

3. 다시 outbox에 있는 것들을 outbox에 아무것도 없을 때까지(while (outbox.size() !== 0)) outbox pop & inbox push
inbox   outbox
|   |   |   |
| c |   |   | 
|_b_|   |_ _|

4. 그리고 dequeue한 값인 a를 return 한다. (return item)

어짜피 이미 구현된 stack을 활용하는 것이므로 Queue 구현 과정에서 this.front나 this.end로 index를 고려해줄 필요는 없다. 
*/
var Queue = function () {
  // Use two `stack` instances to implement your `queue` Class
  var inbox = new Stack();
  var outbox = new Stack();

  // called to add an item to the `queue`
  this.enqueue = function (value) {
    // TODO: implement `enqueue`
    inbox.push(value);
  };

  // called to remove an item from the `queue`
  this.dequeue = function () {
    // TODO: implement `dequeue`
    while (inbox.size() !== 1) {
      let top = inbox.pop();
      outbox.push(top);
    }
    let item = inbox.pop();
    while (outbox.size() !== 0) {
      let value = outbox.pop();
      inbox.push(value);
    }
    return item;
  };

  // should return the number of items in the queue
  this.size = function () {
    // TODO: implement `size`
    return inbox.size();
  };
};
