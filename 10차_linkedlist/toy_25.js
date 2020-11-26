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
  this.length = 0;
  this.head = null;
  this.tail = null;
};

//write methods here!

LinkedList.prototype.addToTail = function (value) {
  let newNode = new this.makeNode(value);
  let oldTail = this.tail;
  if (!this.head) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    this.tail = newNode;
    oldTail.next = this.tail;
  }
  this.length++;
};

LinkedList.prototype.removeHead = function () {
  if (!this.head.next) {
    this.head = null;
    this.tail = null;
  } else {
    this.head = this.head.next;
  }
  this.length--;
};

LinkedList.prototype.contains = function (value) {
  let curr = this.head;
  //let pre = this.head.next
  while (curr) {
    if (curr.value === value) {
      return true;
    }
    curr = curr.next;
    //pre = pre.next
  }
  return false;
};

LinkedList.prototype.makeNode = function (value) {
  this.value = value;
  this.next = null;
  return this;
};
