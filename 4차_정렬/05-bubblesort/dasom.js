/*jshint expr:true*/

/*
 * Bubble sort는 컴퓨터 과학의 가장 기본적인 알고리즘입니다.
 * 배열의 첫 번째 요소(element)와 두 번째 요소를 비교함으로써 시작합니다.
 * 첫 번째 요소가 두 번째 요소보다 크면, 두 요소의 위치를 바꿉니다. (swap)
 * 이후 두 번째 요소와 세 번째 요소를 비교하고, 이를 마지막까지 반복합니다.
 * 위와 같은 방식을 통해서 가장 큰 요소가 가장 마지막으로 밀려납니다.
 * 이 모습이 마치 "거품이 밀려 올라가는 것과 같은 모습" 이여서 Bubble sort라 합니다.
 * 가장 큰 요소가 마지막으로 밀려간 후에는, 다시 첫 요소부터 지금까지의 정렬을
 * 배열의 모든 요소가 크기 순서대로 정렬될 때까지 반복됩니다.
 *
 * Bubble sort 방식으로 배열을 인자로 받아 크기 순서대로 정렬된 배열을 반환하는
 * 함수를 만드세요. 자바스크립트의 내장 함수 (Array.prototype.sort)는 사용을
 * 금지합니다.
 *
 * 질문: 여러분이 작성한 알고리즘의 시간 복잡도는 어떻게 될까요?
 * 아직 잘 모르겠다면, 구글링보다는 직관적으로 얼마나 걸릴지 고민해보세요.
 *
 * Advanced : 최적화 시간입니다! iteration 중 어떤 요소도 위치가 바뀌지(swap) 않았던
 * 적이 있다면, 그 배열은 이미 잘 정렬 되었다고 볼 수 있지 않을까요? 함수 실행을
 * 조금 더 일찍 마무리 할 수도 있었겠어요. 이렇게 최적화를 해봅시다.
 * 최적화가 끝나고, 여러분이 작성한 알고리즘의 시간 복잡도는 어떻게 될까요?
 *
 * Nightmare : 1회 iteration에 모든 요소를 정말 다 검사 해야만 하나요?
 * 검사하지 않아도 될 수 있습니다 :) 여러분이 직접 해보시죠! (Make it happen, boss.)
 * 다시 말씀드리지만, 최적화 후 시간 복잡도는 어떻게 바뀌었을까요?
 *
 */

/*
 * 예:
 * bubbleSort([2, 1, 3]); // [1, 2, 3]을 반환해야 합니다.
 *
 */

// i를 선언하여, 테스트를 원활하게 할 수 있습니다.
let i;

// 헬퍼 함수가 필요하다면 얼마든지 만들어서 사용하세요!

// 함수를 독립시켜서 사용할 때 시간복잡도는 어떻게 계산하면 될까? 


const bubbleSort = function (array) {

  while(judge(array) === false){ // for문 실행. 기저조건 판별을 위한 for문 실행. 
    compare(array) //for문 실행
  }
  return array;
};
//비교를 해주어야 하므로, 비교하는 함수를 만든다. 
// [0,7,5,3]
// 0번째와 1번째를 비교해서, 더 큰 수를 뒤로 보낸다. 
// compare는 이 작업을 1번 수행한다. 앞쪽 인덱스의 숫자가 더 작으면 변화없음. 

function compare(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > arr[i + 1]) {
      let small = arr[i + 1]
      let bigger = arr[i]
      arr[i] = small
      arr[i + 1] = bigger

    }
  }
  return arr
}
//바꿀지 말지 판단을 하는 함수. 
//0번째 인덱스의 숫자가 1번째 인덱스의 숫자보다 클때만 compare를 실행 시킨다. 
//1번이라도 뒤의 숫자가 클 경우에는 compare가 실행이 되지만, 정렬되어 있는 경우에는 compare가 실행되지 않는다. 

function judge(arr){
  for(let i = 0; i < arr.length; i++){
    if(arr[i] > arr[i+1]){
      return false;
    }
  }
  return true
}
