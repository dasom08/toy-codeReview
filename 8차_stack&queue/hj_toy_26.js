/**
 * Stack Class
 */
var Stack = function () {
  this.storage = {};
  this.top = 0;
  // top을 이해할때는 스택 저장소의 길이로 이해하면 좋을 듯 하다.
  this.push = function (value) {
    this.storage[this.top] = value;
    this.top++;
  };

  // remove an item from the top of the stack
  this.pop = function () {
    let topValue = this.storage[this.top - 1];
    //실제로 가장 위에 있는 값으 인덱스는 저장소의 길이보다 1개 작다.
    delete topValue;
    this.top--;
  };

  // return the number of items in the stack
  this.size = function () {
    return this.top;
  };
};

/**
 * Queue Class
 */
var Queue = function () {
  var queue = new Stack();
  //스택과 비슷한 성격을 지녔으므로 기본 스택의 형태를 가지고 와서 만들수 있다.
  this.front = queue.top;
  this.storage = queue.storage;
  this.rear = 0;
  //스택과는 다르게 큐에서는 앞과 뒤의 개념이 있으므로 새로 정의해준다.
  //큐에서는 rear이 현재 저장소 안에 있는 요소의 수로 이해하면 된다.
  // called to add an item to the `queue`
  this.enqueue = function (value) {
    if (this.rear === 0) {
      this.storage[this.front] = value;
      this.storage[this.rear] = value;
      this.rear++;
    } else {
      this.storage[this.rear] = value;
      this.rear++;
    }
  };

  // called to remove an item from the `queue`
  this.dequeue = function () {
    if (this.rear === 0) {
      return;
    } else {
      let frontValue = this.storage[this.front];
      delete frontValue;
      this.front++;
      return frontValue;
    }
  };

  // should return the number of items in the queue
  this.size = function () {
    if (this.rear < this.front) {
      return 0;
    } else {
      return this.rear - this.front;
    }
  };
};
