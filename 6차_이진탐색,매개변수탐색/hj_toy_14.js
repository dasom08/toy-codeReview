/*
 * 정렬된 배열이 주어졌을때, 이진 탐색 알고리즘을 이용하여 특정 요소의 인덱스값을 return하는 함수를 작성하세요.
 *
 * 예시 :
 *
 * let index = binarySearch([1, 2, 3, 4, 5], 4);
 * console.log(index); // [3]
 *
 * 참고 : https://qph.fs.quoracdn.net/main-qimg-742d049387316193be2d097fe7a499de
 */

const binarySearch = function (array, target) {
  //임의의 난수 만들어서 그 난수 인덱스에 위치한 랜덤한 기준값뽑아내기
  //여기서 임의의 수를 나는 중간값으로 할 것이다
  //첫번째 코드 짤때는 배열 내의 값으로 비교를 하니까 나중에 결국 값의 인덱스를 찾기위해 indexOf 메소드를 사용해야했다.
  //따라서 index값을 나중에 구할수있도록 index값들끼리 비교해야한다.
  function findIndex(first, last) {
    if (first > last) {
      return null;
    }
    let midKey = Math.floor((first + last) / 2);
    if (target === array[midKey]) {
      return midKey;
    }
    if (last - first <= 2) {
      if (target === array[first]) {
        return first;
      } else {
        return findIndex(midKey + 1, last);
      }
    }
    if (array[midKey] > target) {
      return findIndex(0, midKey - 1);
    } else if (array[midKey] < target) {
      return findIndex(midKey + 1, array.length - 1);
    }
  }
  return findIndex(0, array.length - 1);
};
