/*
 * Implement a linked list using the pseudoclassical instantiation pattern.
 *
 * Your linked list should have methods called "addToTail", "removeHead", and "contains."
 *
 */

// EXAMPLE USAGE:
// var list = new LinkedList();
// list.tail;         //yields 'null'
// list.addToTail(4);
// list.addToTail(5);
// list.head.value;   //yields '4';
// list.contains(5);  //yields 'true';
// list.contains(6);  //yields 'false';
// list.removeHead(); //yields '4'
// list.tail.value;   //yields '5';

var LinkedList = function () {
  //fill me in!
  //node하나에는 value와 nextAddress가 있어야 하고,
  //LinkedList전체에는 head와 tail이 있어야함.
  this.head = null;
  this.tail = null;
};

//write methods here!

LinkedList.prototype.addToTail = function (value) {
  let newNode = new this.makeNode(value);
  if (this.head === null) {
    //tail이 없었으면 (즉, linkedlist에 Node가 하나도 없으면)
    this.head = newNode; //추가하는게 head이자 tail
    this.tail = newNode;
  } else {
    //tail이 있으면 (즉, linkedlist에 Node하나 이상 있었으면)
    this.tail.nextAddress = newNode;
    this.tail = newNode;
  }
};

LinkedList.prototype.removeHead = function () {
  if (this.head === null) {
    //linkedlist에 Node가 하나도 없을 때
    return;
  } else if (this.head.nextAddress === null) {
    //linkedlist에 Node가 하나만 있을 때
    this.head = null;
    this.tail = null;
  } else {
    ////linkedlist에 Node가 하나 이상일 때
    this.head = this.head.nextAddress;
  }
};

LinkedList.prototype.contains = function (value) {
  let currNode = this.head;
  while (currNode !== null) {
    //처음엔 while(currNode.value!==null)이라고 했는데, 끝까지 없는 경우 Node전체가 null이므로 null의 value는 읽을 수 없다는 에러가 난다. 따라서 currNode 전체가 null일때 그만돌게 고쳤고, 잘 된다.
    if (currNode.value === value) {
      return true;
    }
    currNode = currNode.nextAddress;
  }
  return false;
};

// var Node = function (value) {
//   this.value = value
//   this.nextAddress = null
// } //이 역할을 LinkedList.prototype.makeNode에서 해준다.

LinkedList.prototype.makeNode = function (value) {
  this.value = value;
  this.nextAddress = null;
  return this;
};
/*
 * Implement a linked list using the pseudoclassical instantiation pattern.
 *
 * Your linked list should have methods called "addToTail", "removeHead", and "contains."
 *
 */

// EXAMPLE USAGE:
// var list = new LinkedList();
// list.tail;         //yields 'null'
// list.addToTail(4);
// list.addToTail(5);
// list.head.value;   //yields '4';
// list.contains(5);  //yields 'true';
// list.contains(6);  //yields 'false';
// list.removeHead(); //yields '4'
// list.tail.value;   //yields '5';

var LinkedList = function () {
  //fill me in!
  //node하나에는 value와 nextAddress가 있어야 하고,
  //LinkedList전체에는 head와 tail이 있어야함.
  this.head = null;
  this.tail = null;
};

//write methods here!

LinkedList.prototype.addToTail = function (value) {
  let newNode = new this.makeNode(value);
  if (this.head === null) {
    //tail이 없었으면 (즉, linkedlist에 Node가 하나도 없으면)
    this.head = newNode; //추가하는게 head이자 tail
    this.tail = newNode;
  } else {
    //tail이 있으면 (즉, linkedlist에 Node하나 이상 있었으면)
    this.tail.nextAddress = newNode;
    this.tail = newNode;
  }
};

LinkedList.prototype.removeHead = function () {
  if (this.head === null) {
    //linkedlist에 Node가 하나도 없을 때
    return;
  } else if (this.head.nextAddress === null) {
    //linkedlist에 Node가 하나만 있을 때
    this.head = null;
    this.tail = null;
  } else {
    ////linkedlist에 Node가 하나 이상일 때
    this.head = this.head.nextAddress;
  }
};

LinkedList.prototype.contains = function (value) {
  let currNode = this.head;
  while (currNode !== null) {
    //처음엔 while(currNode.value!==null)이라고 했는데, 끝까지 없는 경우 Node전체가 null이므로 null의 value는 읽을 수 없다는 에러가 난다. 따라서 currNode 전체가 null일때 그만돌게 고쳤고, 잘 된다.
    if (currNode.value === value) {
      return true;
    }
    currNode = currNode.nextAddress;
  }
  return false;
};

// var Node = function (value) {
//   this.value = value
//   this.nextAddress = null
// } //이 역할을 LinkedList.prototype.makeNode에서 해준다.

LinkedList.prototype.makeNode = function (value) {
  this.value = value;
  this.nextAddress = null;
  return this;
};
