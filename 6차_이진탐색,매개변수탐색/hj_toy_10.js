/*
 * 정렬되어 있는 배열 중 일부를 왼쪽 혹은 오른쪽으로 회전시킨 배열이 주어졌을때,
 * 어떻게 특정 element를 효율적으로 찾을 수 있을까요?
 *
 * 작성한 함수는 target의 index값을 return하고, 없으면 null을 return해야 합니다.
 *
 * 예시 :
 * rotatedArraySearch([7 ,8, 9,10, 0, "1", 2, 3, 4, 5, 6 ], 2) === 5
 *
 * rotatedArraySearch([4, 5, 6, 0, 1, 2, 3], 100) === null
 *
 * 시간 복잡도가 O(log(array.length))이 되도록 도전해 보세요!
 */
const rotatedArraySearch = function (rotated, target) {
  //우선 주어진 배열의 첫번째와 마지막 인덱스를 정의
  let firstidx = 0;
  let lastidx = rotated.length - 1;
  function find(first, last) {
    //첫번째 인덱스 값으로 오는 first가 last보다 크면 안된다.
    if (first > last) {
      return null;
    }
    //임의로 중간 인덱스를 정의
    let mididx = Math.floor((first + last) / 2);
    // 1. 임의의 인덱스 값과 타겟값이 같으면 해당 인덱스값 리턴
    if (target === rotated[mididx]) {
      return mididx;
    }

    // 2. 비교하는 가상의 배열의 길이가 3개이하일때를 말한다.
    if (last - first <= 2) {
      //해당 부분 조건 수정
      if (target === rotated[first]) {
        return first;
      } else {
        //이미 위의 조건문에서 mididx에 해당하는 값은 일치하지 않는다고 나왔으므로, 재귀를 돌릴때 mididx는 고려X
        return find(mididx + 1, last);
      }
    }
    //해당 중간값을 기준으로 양쪽이 제대로 정렬되어있는지 점검
    //우선 기준점의 앞쪽부터 점검
    if (rotated[first] < rotated[mididx - 1]) {
      //앞쪽이 제대로 정렬되어있다면, 찾고자 하는 수가 앞쪽에 있는지 확인
      if (target >= rotated[first] && target <= rotated[mididx - 1]) {
        //앞쪽에 있는 경우에만 재귀돌려주기
        return find(first, mididx - 1);
      } else {
        return find(mididx + 1, last);
      }
    } else {
      //앞쪽이 제대로 정렬되어있지 않은 경우 ex) [7,8,9,10,0]
      if (target === rotated[mididx - 1]) {
        //앞쪽의 가장 끝요소 즉 중간인덱스에서 -1한 인덱스의 요소가 타겟과 같은지 검사
        return mididx - 1;
      } else if (target >= rotated[first] && target <= rotated[mididx - 2]) {
        //맨끝요소를 제외한 가상의 배열에 타겟이 있는 경우만 재귀를 넣어주고
        return find(first, mididx - 2);
      } else {
        return find(mididx + 1, last);
      }
    }
  }
  return find(firstidx, lastidx);
};

//   function quickSort(rotated){
//     if (rotated.length < 2){
//       return rotated;
//     }
//     let random = rotated[0];
//     let left  = [];
//     let right = [];
//     for (let i = 1; i < rotated.length; i++){
//       if (rotated[i] < random){
//         left.push(rotated[i]);
//       }else {
//         right.push(rotated[i]);
//       }
//     }
//     return [
//       quickSort(left),
//       random,
//       quickSort(right)
//       ];
//   }
//  quickSort(rotated);
//   let low = 0;
//   let high = rotated.length -1;
//   while (low <= high) {
//     mid = parseInt((low + high) / 2);
//     current = rotated[mid];
//     if (current > target) {
//       high = mid - 1;
//     } else if (current < target) {
//       low = mid + 1;
//     } else {
//       return mid;
//     }
//   }
//   return null;
//위의 방법은 정렬이 작은수 -> 큰수 순서로 되어있을때만 가능,
//즉 위의 방법을 쓸려면 우선 정렬부터 해주어야 한다.
//따라서 정렬을 해주고 진행하려다보니, 통과는 하는데 오히려 더 비효율적인 코드가 만들어져버렸다..

// if(rotated.indexOf(target) === -1){
//   return null;
// }
// return rotated.indexOf(target);
//해당 indexof 활용 방법은 시간복잡도가 O(n) 이다.
//퀵정렬을 활용하여 시간 복잡도가 O(logn) 나올수 있도록 해보았다.
