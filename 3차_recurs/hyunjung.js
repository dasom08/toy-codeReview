
const powerSet = function (str) {
  // TODO: Your code here!
  let result = ['']
  let subset = ''
  let check = {}
  function makeSubset() {
    //기저조건: 문자열에 있는 알파벳 모두 다 넣었을 때
    if (subset.length >= str.length) {
      return
    }
    // 재귀
    for (let i = 0; i < str.length; i++) {
      if (!check[str[i]]) { 
        //1. 아직 subset에 안들어간 알파벳이면
        subset += str[i] //2. 넣고
        check[str[i]] = true
        //3. 썼다고 표시해주고(중복으로 들어가면 안되니까)=> 같은 문자로 이루어진 부분집합은 순서와 무관하게 하나로 인식합니다. ('ab'와 'ba'는 같습니다.) 만족
        let sortSubset = subset.split('').sort().join('')
        // => 모든 부분집합의 문자들은 알파벳 순서로 정렬되어야 합니다. 만족
        if (result.indexOf(sortSubset) === -1) {
          //3은 jjum 와 같은 알파벳 중복을 막아 준 것이고 이 코드는 jmup와 jpum 같은 중복을 없애기 위한 것읻다.
          result.push(sortSubset)
        }
        makeSubset() //4. 재귀 들어가서 그 뒤에 알파벳 덧붙이고
        subset = subset.slice(0, -1)
        //5-1. 재귀 빠져나오면 원래대로 제자리 //.slice가 immutable이기때문에 그냥 subset에 대입시켜서 원본을 바꿔줘야한다.
        check[str[i]] = false
        //5-2. 초기화
      }
    }
  }
  makeSubset()
  return result
}