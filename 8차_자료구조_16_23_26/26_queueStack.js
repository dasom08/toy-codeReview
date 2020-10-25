/**
 * Write a stack using your preferred instantiation pattern.
 * Avoid using native array methods i.e., push, pop, and length.
 * Once you're done, implement a queue using two stacks.
 */

/**
 * Stack Class
 */
var Stack = function () {
  this.storage = {};
  this.top = 0;

  // add an item to the top of the stack
  this.push = function (value) {
    this.storage[this.top] = value;
    this.top++;
  };

  // remove an item from the top of the stack
  this.pop = function () {
    let poppedValue = this.storage[this.top - 1];
    delete this.storage[this.top];
    this.top--;
    return poppedValue;
  };

  // return the number of items in the stack
  this.size = function () {
    return this.top;
  };
};

/**
 * Queue Class
 */

// Quere를 만드는데 왜 Stack을 써야 하는지를 이해하지 못함. stack을 쓰면 더 유리해지나?
// 참고링크 : https://coderbyte.com/algorithm/implement-queue-using-two-stacks
// (1) When calling the enqueue method, simply push the elements into the stack 1.
// (2) If the dequeue method is called, push all the elements from stack 1 into stack 2, which reverses the order of the elements. Now pop from stack 2.

var Queue = function () {
  // Use two `stack` instances to implement your `queue` Class
  var inbox = new Stack();
  var outbox = new Stack();

  this.box = inbox.storage; // queue의 내용에 접근하여 직접 눈으로 확인하기 위한 기능을 추가함.

  // called to add an item to the `queue`
  this.enqueue = function (value) {
    // TODO: implement `enqueue`
    inbox.push(value);
  };

  // called to remove an item from the `queue`
  this.dequeue = function () {
    // TODO: implement `dequeue`
    let inboxLength = inbox.size();
    for (let i = 0; i < inboxLength; i++) {
      outbox.push(inbox.pop());
    }
    let dequeuedValue = outbox.pop(); // 실제로 pop 되어야 할 값 - 이따가 리턴
    // outbox에 남은것들을 다시 indox로 되돌려 줘야 한다.
    let outboxLength = outbox.size();
    for (let i = 0; i < outboxLength; i++) {
      inbox.push(outbox.pop());
    }
    return dequeuedValue;
  };

  // should return the number of items in the queue
  this.size = function () {
    // TODO: implement `size`
    return inbox.size();
  };
};
