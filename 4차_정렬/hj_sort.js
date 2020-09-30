/*
 *  Write a function that takes as its input a string and returns an array of
 *  arrays as shown below sorted in descending order by frequency and then by
 *  ascending order by character.
 *
 *       :: Example ::
 *
 *  characterFrequency('mississippi') ===
 *  [
 *    ['i', 4],
 *    ['s', 4],
 *    ['p', 2],
 *    ['m', 1]
 *  ]
 *
 *       :: Example2 ::
 *
 *  characterFrequency('miaaiaaippi') ===
 *  [
 *    ['a', 4],
 *    ['i', 4],
 *    ['p', 2],
 *    ['m', 1]
 *  ]
 *
 *       :: Example3 ::
 *
 *  characterFrequency('mmmaaaiiibbb') ===
 *  [
 *    ['a', 3],
 *    ['b', 3],
 *    ['i', 3],
 *    ['m', 3]
 *  ]
 *
 */

var characterFrequency = function (string) {
  let result = []
  for (let i = 0; i < string.length; i++) {
    let char = string[i]
    let flag = false
    let j
    for (j = 0; j < result.length; j++) {
      if (result[j].indexOf(char) !== -1) {
        flag = true
        break
      }
    }
    if (flag === false) {
      result.push([char, 1])
    } else {
      result[j][1]++
    }
  }

  //sort
  //횟수 내림차순 정렬 후 a[1] === b[1]인 곳에 한해서 문자 오름차순 정렬
  result.sort(function (a, b) {
    return a[1] > b[1] ? -1 : a[1] < b[1] ? 1 : a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0
  })

  //횟수 내림차순 정렬
  // result.sort(function (a, b) {
  //   return a[1] > b[1] ? -1 : a[1] < b[1] ? 1 : a[0] < b[0] ? -1 : 0
  // })

  // 문자 오름차순 정렬
  // result.sort(function (a, b) {s
  //   return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0
  // })

  return result
}
