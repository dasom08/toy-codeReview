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


var LinkedList = function(value){
  //fill me in!
  this.head = null
  this.next = null 
  this.tail = null
  this.value = value;
};

//write methods here!

LinkedList.prototype.addToTail = function(value){
  let node = new LinkedList(value)
  if(this.tail === null){
    node.next = this.head
    this.head = node
    this.tail = this.head
  }
  else if (this.tail){
    this.tail.next = node; 
    this.tail = node; 
  }
};

LinkedList.prototype.removeHead = function(){
  if(this.head.next){
    this.head = this.head.next; 
  }else{
    //
    this.head = null;
    this.tail = null; 
  }
};

LinkedList.prototype.contains = function(value){
  if(!this.head){
    return undefined;
  }else{
    let temp = this.head; 
    while(temp.value !== value){
      if(temp.next === null){
        return false 
      }
      temp = temp.next;
    }
  }
  return true
};

LinkedList.prototype.makeNode = function(){

};
