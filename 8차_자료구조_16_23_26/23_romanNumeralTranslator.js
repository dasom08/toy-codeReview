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

var translateRomanNumeral = function (romanNumeral) {
  // TODO: Implement me!
  if (romanNumeral === "") {
    return 0;
  }

  if (typeof romanNumeral !== "string") {
    return null;
  }

  // 로마자를 배열로 쪼개고, array 배열에 담음
  let array = romanNumeral.split("");
  let result = [];

  // array 배열을 DIGIT_VALUES 객체와 비교해서 숫자로 다 바꿔서, result 배열에 담음
  for (let i = 0; i < array.length; i++) {
    for (key in DIGIT_VALUES) {
      if (array[i] === key) {
        result.push(DIGIT_VALUES[key]);
      }
    }
  }

  // 변환했는데 길이가 다르다는건, DIGIT_VALUES 객체에서 지정하지 않은 문자가 포함되었다는 얘기.
  if (array.length !== result.length) {
    return null;
  }

  // 'IIIX' => ["I", "I", "I", "X"] => [1, 1, 1, 10]

  // 각 자리를 다 더하기 전에, 4와 9를 표현할 방법을 찾아야 한다. (40, 90, 400, 900 역시...)
  // 1과 5, 1과 10이 이 순서로 나오면 4와 9가 되니까, 아래와 같이 처리한다.

  for (let i = 0; i < result.length; i++) {
    if (
      result[i] / result[i + 1] === 0.2 ||
      result[i] / result[i + 1] === 0.1
    ) {
      result[i] = result[i + 1] - result[i];
      result = result.slice(0, i + 1).concat(result.slice(i + 2));
    }
  }

  // [1, 1, 1, 10] => [1, 1, 9]

  return result.reduce((acc, cur) => acc + cur);
};
