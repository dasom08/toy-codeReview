/*
 * 정렬되어 있는 배열 중 일부를 왼쪽 혹은 오른쪽으로 회전시킨 배열이 주어졌을때,
 * 어떻게 특정 element를 효율적으로 찾을 수 있을까요?
 *
 * 작성한 함수는 target의 index값을 return하고, 없으면 null을 return해야 합니다.
 *
 * 예시 :
 * rotatedArraySearch([4, 5, 6, 0, 1, 2, 3], 2) === 5
 *
 * rotatedArraySearch([4, 5, 6, 0, 1, 2, 3], 100) === null
 *
 * 시간 복잡도가 O(log(array.length))이 되도록 도전해 보세요!
 */

const rotatedArraySearch = function (rotated, target) {
  // TODO : Your code here!

  // 저 밑의 내가 작성한 두 방법은 배열 전체를 탐색하는 것 같다 : O(n) 시간복잡도를 가질 것으로 보임

  // '탐색'에서 O(log n)의 시간복잡도를 갖는 방법은 '이진 탐색 트리'
  // 일정한 값을 하나의 기준점으로 잡고, 양 끝의 인덱스를 가지고 시작하며, 기준점과 target을 비교한다.
  // 기준점의 값보다 작으면 기준점 왼쪽의 배열로, 기준점의 값보다 크면 기준점 오른쪽의 배열로 가며,
  // 이렇게 해서 옮겨가기 위해 기준점을 활용하여 양 끝의 인덱스를 조정한 뒤, 새로운 기준점을 잡고, 위 처리를 반복한다.

  let firstIndex = 0; // 아래 함수에서 써먹을 인덱스값 (0부터)
  let lastIndex = rotated.length - 1; // 아래 함수에서 써먹을 인덱스값 (마지막까지)

  function binarySearchRecursion(first, last) {
    let midIndex = Math.floor((first + last) / 2); // 중간값의 인덱스를 임의로 잡아주고, 여길 기준으로 배열을 쪼개기 시작한다.

    if (first > last) {
      // 값을 비교해가면서 midIndex - 1 또는 midIndex + 1 처리를 해주는데,
      return null; // 이게 반대쪽 값과 같아진걸 넘어서서 반대쪽 값을 넘어가 버린 경우
    } // 즉, 배열을 쪼개가면서 비교해서 1개 남을때까지 쪼갰는데도 못 찾아서, 그 다음번으로까지 넘어간 경우

    if (target === rotated[midIndex]) {
      // 계속된 아래의 처리 결과 target이 midIndex번째 값과 같으면,
      return midIndex; // midIndex를 리턴하고 종료
    }

    // 재귀를 덜 들어가게 할 수는 있겠으나, 없어도 동작한다
    if (rotated[midIndex - 2] === undefined) {
      // 기준점 앞에 원소가 단 하나밖에 없다면,
      if (rotated[first] === target) {
        // 기준점 앞의 단 하나의 요소만 갖고 일단 판단해서, 같으면 리턴
        return first;
      } else {
        return binarySearchRecursion(midIndex + 1, last); // 그렇지 않으면, (기준점 앞의 단 하나의 요소가 target과 다르면,)
      } // 뒤의 배열을 갖고 다시 돌림
    }

    if (rotated[first] < rotated[midIndex - 1]) {
      // 기준점의 앞쪽이 제대로 정렬되어 있다면,
      if (target >= rotated[first] && target <= rotated[midIndex - 1]) {
        // target이, rotated[first]와 rotated[midIndex] 사이에 속한다면, (기준점 앞을 탐색한다)
        return binarySearchRecursion(first, midIndex - 1); // midIndex - 1 을 최대값으로 변경하여, midIndex 기준 왼쪽 배열로 쪼개고 다시 탐색한다.
      } else {
        // 그 외에는, (target이 정렬된 앞쪽에 속하지 않는다면), (기준점 뒤를 탐색해야 한다.)
        return binarySearchRecursion(midIndex + 1, last); // midIndex + 1 을 최소값으로 변경하여, midIndex 기준 오른쪽 배열로 쪼개고 다시 탐색한다.
      }
    } else {
      // 그 외에는, (기준점의 뒤쪽이 제대로 정렬되어 있다면,)
      if (target >= rotated[midIndex + 1] && target <= rotated[last]) {
        // target이 rotated[midIndex + 1] 부터 rotated[last] 안의 값이라면, (기준점 뒤를 탐색해야 한다.)
        return binarySearchRecursion(midIndex + 1, last); // midIndex + 1 을 최소값으로 변경하여, midIndex 기준 오른쪽 배열로 쪼개고 다시 탐색한다.
      } else {
        // target이 rotated[midIndex]보다 크다면, (midIndex보다 오른쪽을 탐색해야 한다.)
        return binarySearchRecursion(first, midIndex - 1); // midIndex - 1 을 최대값으로 변경하여, midIndex 기준 왼쪽 배열로 쪼개고 다시 탐색한다.
      }
    }
  }

  return binarySearchRecursion(firstIndex, lastIndex);
  // 전에 짠 코드는 불완전했음. https://github.com/codestates/help-desk/issues/1628
  // 전에 짠 코드는 테스트케이스는 통과하지만, 다른 사례를 넣어 실행하면 완전히 동작하지 않음
  // 전에 짠 코드는 약 70ms 정도의 시간이 소요되었음

  // 위 질문글을 통해 개선한 코드임. 속도가 40ms 정도로 줄어든 듯. O(logn)도 달성한 듯?
};

/* 해결 (1) : indexOf()를 사용하니, 시간복잡도가 n이지 않나?  (이건 위아래 두 방법에 비해 확연히 늦음 : 110ms 이상)

const rotatedArraySearch = function(rotated, target) {
  // TODO : Your code here!  

  // 값이 계속 늘다가, 줄어드는 지점의 index를 찾아서 , 그 값을 활용해야 할 듯 -> 이렇게하면 시간복잡도 조건을 만족할 수 없지 않나?
  let smallestIndex = rotated.indexOf(rotated.reduce(function (a, b) {
    if (a > b) {
      a = b;
    }
    return a;
  }));

  // slice는 인덱스 기준으로 처리하니까 O(1) 아닐까..?
  let frontArr = rotated.slice(0, smallestIndex);  
  let backArr = rotated.slice(frontArr.length);

  if (target >= frontArr[0] && target <= frontArr[frontArr.length - 1]) { // target이 rotated의 가장 마지막 값보다 크다면, : 0을 기준으로 앞쪽의 것들만 판단하면 된다.
    return frontArr.indexOf(target);
  }
  else if (target >= backArr[0] && target <= backArr[backArr.length - 1]) {
    return backArr.indexOf(target) + frontArr.length;
  }
  return null;
};

*/

/* 해결 (2) : 이렇게 줘도 통과하는데, 이걸 원한 것은 아니지 않나? (근데 소요시간은 이게 더 짧은데? : 65ms 정도)
  // should return the index of that item quickly (45ms) 라고 나오면서 빨리 뽑는 요구조건까지 맞춰내는 듯?
  // .indexOf()의 시간복잡도는 O(n)이지 않을까?


const rotatedArraySearch = function(rotated, target) {
  if (rotated.indexOf(target) === -1) {
    return null;
  }
  return rotated.indexOf(target);
}


*/
