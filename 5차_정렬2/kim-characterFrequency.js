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
  let obj = {};

  for (let i = 0; i < string.length; i++) {
    if (obj[string[i]] === undefined) {
      obj[string[i]] = 1;
    } else {
      obj[string[i]]++;
    }
  }

  let result = [];

  for (key in obj) {
    let innerArray = [];
    innerArray.push(key);
    innerArray.push(obj[key]);
    result.push(innerArray);
  }

  // sort()를 사용해서 해결했는데, 다른 정렬 방법을 사용하면 시간복잡도를 줄일 수 있지 않을까 생각함.
  result.sort(function (a, b) {
    if (a[1] !== b[1]) {
      // frequency가 다르면,
      return b[1] - a[1]; // 더 큰 frequency를 더 앞의 index에 배치한다. (내림차순)
    } else {
      // frequency가 같으면,
      if (a[0] < b[0]) {
        // 뒤의 character가 앞의 character보다 뒤에 들어가야 할 알파벳이라면,
        // character를 알파벳 순서로 정렬한다. (오름차순)
        return -1;
      }
    }
  });

  return result;
};
