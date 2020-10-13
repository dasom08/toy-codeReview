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

/*About binarySearch
BinarySearch: **정렬**되어 있는 숫자들 중에서 특정 숫자를 찾는다. 

알고리즘 순서
1. '중간 값' 찾아서
2. '내가 원하는 값'과 비교
3-1. 내가 원하는 값은 그 중앙값의 '오른쪽'에 위치해있다면 => 왼쪽껀 날려버리고 오른쪽에 있는 값들만 고려하면 된다. (왜냐면 정렬되어있으니까!)
3-2. 내가 원하는 값은 그 중앙값의 '왼쪽'에 위치해있다면 => 오른쪽껀 날려버리고 왼쪽에 있는 값들만 고려하면 된다. (왜냐면 정렬되어있으니까!)
4. 1~3을 반복하다가 내가 원하는 수를 찾으면 끝 or 내가 원하는 조건을 만족하는 최적의 값(max or min)을 result같은 곳에 저장해 두었다가 모든 숫자를 다 보고 최종 끝나면  => 이건 문제에 따라 다르게 결정
4-2. 그래도 못찾았으면 내가 원하는 값이 없다는 것!

시간복잡도
: **정렬된** 숫자를 절반씩 지원나가면서 찾는단는 원리를 이용한 것이므로
n개 -> n/2개 -> n/4개 -> n/8개...... -> 2개 -> 1개
즉, log(n) 
(띠라서 정렬이 안되었다면 정렬부터 해야하고 추가 시간복잡도가 생길 수도 있다.)
*/

const binarySearch = function (array, target) {
  // TODO: Your code here!
  let start = 0
  let end = array.length - 1

  while (start <= end) {
    let mid = Math.floor((start + end) / 2) //C랑 잠깐 헷갈렸는데.. console찍어보니 JS에서는 / 이 소수점 나누기까지 가능하므로 정수로 떨어질 수 있도록 Math.floor 추가
    // console.log(mid)

    if (array[mid] === target) {
      return mid
    } else if (array[mid] < target) {
      //이 경우 3-1에 해당하므로 왼쪽의 index들은 날려버리기
      start = mid + 1
    } else {
      //이 경우 3-2에 해당하므로 오른쪽의 index들은 날려버리기
      end = mid - 1
    }
  }
  return null //4-2에 해당.
}
