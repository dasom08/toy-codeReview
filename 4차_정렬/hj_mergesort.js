/*
 * Merge Sort에 관하여
 *
 * 개념)Using the divide and conquer method
 *  1. Divide the array into two sizes and sort the spolit arrays
 *  2. Sort the entire array by summing the two sorted arrays
 *
 * 구현)
 *  1. If the size off the segment is greater than 1 => Merge_sort(list, left, right)
 *  2. Calculate intermediate position => if left < right { mid = (left+right)/2
 *  3. Sort the left-side array(recursive call) => merge_sort(list, left, mid)
 *  4. Sort the left-side array(recursive call) => merge_sort(list, mid+1, right)
 *  5. Merge the two sorted subarrays (이때 기준에 맞게 정렬하면서 합친다.)=> merge(list, left, mid, right)
 *
 * Stability of sorting Algorithm(cf. Quick sorting)
 *  'The relative positionn of records with the ssame key wavlue does not change after sorting' is the 'Stability of sorting'.
 *  즉, 정렬의 안정적 특성이란 '정렬되지 않은 상태에서 같은 키값을 가진 원소의순서가 정렬 후에도 유지되느냐'이다.
 *  example of unstable sort) 30(a), 30(b), 10, 20 -> 10 20 30(b) 30(a)
 *
 *  Quick sort의 경우 - 불안정 정렬)  특정 pivot값을 기준으로 그 전, 후로 정렬기준에 맞게 요소들을 이동시킨다.
 *    그래서 30(a), 30(b) 로 되어있다 하더라도, 30이 pivot 값이고, pivot보다 크거나 같은 값은 pivot의 오른쪽에 위치시킨다. 라는 정렬기준이 있다면 30(b), 30(a)으로 정렬결과가 나오게 된다.
 *    즉, 퀵정렬의 경우에는 pivot및 정렬 기준에 따라 값의 위치가 바뀔 때, 그게 pivot의 왼쪽에 있냐 오른쪽에 있는지와 상관없이 전체를 pivot하나와 비교하기 때문에 위와 같은 불안정 정렬이 될 수 있다.
 *  반면, Merge sort의 경우 - 안정 정렬) 요소가 1개만 남아있을 때까지 분할 한 뒤, 왼쪽 배열과 오른쪽 배열을 각각 요소 하나씩 살펴보며 위치를 정하기 때문에
 *    등호를 알맞은 기준에 맞게 사용하면 불안정 정렬이 나올 수 없다. (나오지 않는다.)
 *
 * 시간 복잡도)
 *  T(n): 'n개의 숫자를 합병정렬 할 때의 시간복잡도' 라고 하자.
 *  1. 왼쪽 반을 합병정렬 할 때의 시간복잡도: T(n/2)
 *  2. 오른쪽 반을 합병정렬 할 때의 시간복잡도: T(n/2)
 *  3. 합치기 - # of comparisions = n, # of moves = 2n
 *  4. T(n) = T(n/2)+T(n/2)+O(n)
 *  5. 점화식을 풀면, n T(1) + (log n)O(n) = n O(1) + (log n)O(n) = O(n) + (log n)O(n) = O(nlogn)
 *  아니면 쉽게 생각하면,
 *  1. 구현1~4과정을 n이 1개가 될 때까지 반씩 줄여나가면서 계속해야하니까 log n 번 하게 된다.
 *  2. 이때 구현 1~4과정은 # of comparisions = n, # of moves = 2n 가 시간복잡도를 차지하므로 O(n)
 *  3. 따라서 O(n)을 log n 번 반복하는 알고리즘이기때문에 merge sort의 시간복잡도는 O(nlogn)이다.
 */

var mergeSort = function (array) {
  // Your code here.
  // 재귀적 구현
  if (array.length <= 1) {
    //기저조건
    return array
  } else {
    //If the size off the segment is greater than 1
    let start = 0,
      end = array.length
    //Calculate intermediate position
    let mid = Math.floor((start + end) / 2)
    //Sort the left-side array(recursive call)
    let leftArray = array.slice(start, mid)
    //console.log('leftArray:', leftArray)
    //Sort the left-side array(recursive call)
    let rightArray = array.slice(mid, end)
    //console.log('rightArray:', rightArray)
    return Merge(mergeSort(leftArray), mergeSort(rightArray))
  }

  function Merge(array1, array2) {
    let tempArray = []
    let inx1 = 0
    let inx2 = 0
    while (inx1 < array1.length && inx2 < array2.length) {
      if (array1[inx1] <= array2[inx2]) {
        tempArray.push(array1[inx1])
        inx1++
      } else {
        tempArray.push(array2[inx2])
        inx2++
      }
    }
    if (inx2 >= array2.length) {
      for (let i = inx1; i < array1.length; i++) {
        tempArray.push(array1[i])
      }
    }
    if (inx1 >= array1.length) {
      for (let i = inx2; i < array2.length; i++) {
        tempArray.push(array2[i])
      }
    }
    return tempArray
  }
}

/*
 * slice에 관하여
 * javascript는 slice를 사용하여 원하는 부분을 고대로 복사해서 새로운 배열을 만들 수 있다. (원본 배열은 바뀌지 않음)
 * array.slice( start, end ): start와 end에는 숫자가 들어갑니다. 배열의 start에 해당하는 요소부터 end 바로 전의 요소까지를 선택하여 새로운 배열을 만듭니다
 *
 */
