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

//단순히 모든 배열 요소를 하나하나 일치비교하면 O(n)이다.
//근데 O(log n)으로 구현하라는 것은 => 반씩 버려가면서 답을 찾는 방법을 구해보라는 것.
//그래서 생각난게 이진탐색법
//1. rotated길이-1 < target 이면 null
//2. 아니면 이진탐색 start=0, end=rotated길이-1, mid = (start+end)/2
//3-1. rotated[mid]===target이면 return mid
//3-2. rotated[mid]<target이면 오른쪽 탐색 즉, start = mid+1
//3-3. rotated[mid]>target이면 왼쪽 탐색 즉, end = mid-1

const rotatedArraySearch = function (rotated, target) {
  // TODO : Your code here!

  let start = 0
  let last = rotated.length - 1

  function binarySearchRecursion(start, end) {
    let mid = Math.floor((start + end) / 2)

    if (start > end) {
      return null
    } else if (start === end) {
      if (rotated[start] === target) {
        return start
      } else {
        return null
      }
    } else {
      if (target === rotated[mid]) {
        return mid
      } else if (rotated[start] <= rotated[mid]) {
        if (target >= rotated[start] && target < rotated[mid]) {
          return binarySearchRecursion(start, mid - 1)
        } else {
          return binarySearchRecursion(mid + 1, end)
        }
      } else {
        if (target >= rotated[mid + 1] && target <= rotated[end]) {
          return binarySearchRecursion(mid + 1, end)
        } else {
          return binarySearchRecursion(start, mid - 1)
        }
      }
    }
  }

  return binarySearchRecursion(start, last)
}
