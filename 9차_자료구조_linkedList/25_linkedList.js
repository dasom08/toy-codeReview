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

  this.head = null; // { value: XXX, next: OOO }
  this.tail = null; // { value: XXX, next: OOO }
  this.size = 0;
  // container: [],  // { value: XXX, next: OOO }
};

//write methods here!

LinkedList.prototype.addToTail = function (value) {
  let newNode = this.makeNode(value);

  if (this.size === 0) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    this.tail.next = newNode;
    this.tail = newNode;
  }

  this.size++;
};

LinkedList.prototype.removeHead = function () {
  if (this.size === 0) {
    return null;
  } else {
    let nodeToRemove = this.head;
    this.head = this.head.next;
    this.size -= 1;
    if (this.size === 0) {
      this.tail = null;
    }
    return nodeToRemove.value;
  }
};

LinkedList.prototype.contains = function (value) {
  debugger;
  let currentNode = this.head;
  let i = 0;
  while (i < this.size) {
    if (currentNode === null) {
      return false;
    }
    if (currentNode.value === value) {
      return true;
    }
    currentNode = currentNode.next;
  }
};

LinkedList.prototype.makeNode = function (value) {
  return {
    value: value,
    next: null,
  };
};
