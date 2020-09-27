//폰 노이만이 개발 
//정렬이 안된 배열, 그리고 결과배열 
//정렬이 안된 배열을 반으로 쪼개준다.
//제일 앞의 수를 비교해 작은 숫자를 결과배열에 넣는다. 
//[2,4,5,7,1,3,6,8]
//[2,4,5,7],[1,3,6,8],[]
//2와 1을 비교, [1]
//[2,4,5,7],[3,6,8]
//2와 3을 비교,[1,2]
//[4,5,7],[3,6,8]
//4와 3을 비교,[1,2,3]

//그러나 처음부터 정렬이 되어 있었다!
//정렬이 안되어 있느 경우 안됨. 
//다 나누어 주기.
//[[4],[7],[4],[3],[9],[1],[2]] 이렇게 하면 나눠져 버려서, 2개씩 묶을 수가 없다.
//반으로 나누고, 나누고,나눠서 정렬




var mergeSort = function (array) {

    // let div = arr.map((el) => {
    //   let result = []
    //   result.push(el)
    //   return result
    // })
  
    //[[4],[7],[4],[3],[9],[1],[2]] 이렇게 하면 나눠져 버려서, 2개씩 묶을 수가 없다.
  
    if(array.length < 2){
      return array //원소가 한개 일때. 
    }
    let mid = Math.floor(array.length/2) //반으로 쪼개기
    let left = array.slice(0,mid) // 왼쪽으로 쪼개기
    let right = array.slice(mid,array.length) // 나머지를 오른쪽으로 쪼개기
  
    return merge(mergeSort(left),mergeSort(right))
  }
  
  function merge(left,right){
    let result = []
    while(left.length && right.length) { //왼쪽&오른쪽 둘다 있을경우만 실행. 한쪽이 비면 끝.
      if(left[0] <= right[0]) { //첫 원소를 비교
        result.push(left.shift()) //왼쪽이 작으면 빼서 결과에 앞쪽에 넣어준다.
      }else{
        result.push(right.shift()) //오른쪽이 작으면 빼서 결과에 앞쪽에 넣어준다. 
      }
    }
    while(left.length){ result.push(left.shift())} // 왼쪽에 남은게 있다면 마저넣기.
    while(right.length){ result.push(right.shift())} // 오른쪽에 남은게 있다면 마저넣기
    return result
  }
  
  
  let arr = [4, 7, 4, 3]
  
  
  // 핵심은 나눈다 + 나눈걸 비교해서 순서대로 병합한다, 그리고 나누는 과정은 재귀로 병합을 저장하면서 진행해준다 는 점. 
  // 레퍼런스 : https://www.zerocho.com/category/Algorithm/post/57ee1fc107c0b40015045cb4