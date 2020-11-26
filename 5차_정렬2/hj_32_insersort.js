// Example usage:
// insertionSort([{value: 2}, {value: 1}, {value: 3}]);
// yields [{value: 1}, {value: 2}, {value: 3}]

// This function is to help you test, and should not be incorporated in your solution.
// It will transform an array of numbers into an array of valid objects.
var testingTransform = function(array) {
  var transform = [];
  
  for (var i = 0; i < array.length; i++)
    transform.push({ value: array[i], i: i });

  return transform;
};

var insertionSort = function(array) {
  //array = testingTransform(array);
  //아...테스트케이스에서 이미 위의 함수에 넣은 값을 해당 함수에 넣어주므로 내가 별도로 넣은 값을 정의해줄 필요가 없구먼
  //일단 새로운 배열을 한바퀴 돌기
  for(let i=0; i<array.length; i++){
    for(let j=0; j<array.length-1; j++){
      if(array[j].value > array[j+1].value) { //즉 배열에서 앞의 값이 뒤의 값보다 크면, 앞의 값과 뒤의 값의 자리를 바꿔줘야 한다.
        let front = array[j];
        array[j] = array[j+1];
        array[j+1] = front;
      }
    }
  }
  return array;
};
