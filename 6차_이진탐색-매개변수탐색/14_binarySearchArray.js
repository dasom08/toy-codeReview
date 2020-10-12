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
  // TODO: Your code here!

  // 주어진 배열을 절반씩 나눠가며 탐색하고 있으니, 이진 탐색 알고리즘을 제대로 구현한게 아닐까?
  function recursion(first, last) {
    let middleIndex = Math.floor((first + last) / 2);

    if (target === array[middleIndex]) {
      // 값을 찾았으면,
      return middleIndex; // index를 리턴한다.
    }

    if (target < array[middleIndex]) {
      // middleIndex 기준, target이 그 앞에 있다면,
      return recursion(first, middleIndex - 1); // middleIndex 기준으로 앞쪽 배열을 탐색한다.
    }

    if (array[middleIndex] < target) {
      // middleIndex 기준, target이 그 뒤에 있다면,
      return recursion(middleIndex + 1, last); // middleIndex 기준으로 뒤쪽 배열을 탐색한다.
    }
  }

  return recursion(0, array.length - 1); // 최초 탐색은 array의 0번째부터 끝까지를 갖고 시작한다.
};
