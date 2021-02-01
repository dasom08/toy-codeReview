/**
 * Given a roman numeral as input, write a function that converts the roman
 * numeral to a number and outputs it.
 *
 * Ex:
 * translateRomanNumeral("LX") // 60
 *
 * When a smaller numeral appears before a larger one, it becomes
 * a subtractive operation. You can assume only one smaller numeral
 * may appear in front of larger one.
 *
 * Ex:
 * translateRomanNumeral("IV") // 4
 *
 * You should return `null` on invalid input.
 */

var DIGIT_VALUES = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

// 0. 예외 처리 1 - should return null if passed something other than a string ex) translateRomanNumeral(50)
// 1. 배열 길이만큼 반복하는데,
// 2. 예외 처리 2- string이긴 한데 DIGIT_VALUES property가 아닌게 들어왓을 경우 ex) DIGIT_VALUES["A"]
// 2. 맨 처음꺼 stack에 넣고 시작
// 3-1. top보다 작은 수이면 Push
// 3-2. top보다 큰 수이면 먼저 빼기가 선행되어야하므로 큰 수 - pop한(top)수 를 뺀 결과를 push
// 4. for 문 다 돌았으면 stack바구니에 있는 수 다 더하기
// 끝!

var translateRomanNumeral = function (romanNumeral) {
  // TODO: Implement me!
  if (typeof romanNumeral === 'string') {
    let stack = [];
    for (let i = 0; i < romanNumeral.length; i++) {
      let currNum = DIGIT_VALUES[romanNumeral[i]];
      if (currNum === undefined) {
        return null;
      }
      if (i === 0) {
        stack.push(currNum);
      } else {
        let top = stack[stack.length - 1];
        if (top >= currNum) {
          stack.push(currNum);
        } else {
          stack.pop();
          stack.push(currNum - top);
          // stack.splice(-1, 1, currNum - top);
        }
      }
    }

    let result = 0; //여기서 translateRomanNumeral("")는 0을 반환
    for (let i = 0; i < stack.length; i++) {
      result += stack[i];
    }

    return result;
  } else {
    return null;
  }
};
