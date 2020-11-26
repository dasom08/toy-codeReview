const DIGIT_VALUES = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

var translateRomanNumeral = function (romanNumeral) {
  if (typeof romanNumeral === 'string') {
    if (romanNumeral.length === 1) {
      return DIGIT_VALUES[romanNumeral];
    } else if (romanNumeral.length > 1) {
      let result = DIGIT_VALUES[romanNumeral[0]];
      //일단 첫번째 글자에 해당하는 수를 먼저 선언해둠 그리고 하단에서 반복문을 돌면서 누적해서 더해줄 예정
      for (let i = 0; i < romanNumeral.length - 1; i++) {
        if (DIGIT_VALUES[romanNumeral[i]] < DIGIT_VALUES[romanNumeral[i + 1]]) {
          let sub = DIGIT_VALUES[romanNumeral[i + 1]] - DIGIT_VALUES[romanNumeral[i]];
          result = result - DIGIT_VALUES[romanNumeral[i]] + sub;
          //이렇게 해준 이유는, 가령 누적해오면서 "10[0번째인덱스 수]+5[1번째 인덱스수]=result" 이렇게일때 2번째 인덱스에 20이 온다면,
          //result 값에 단순히 2번째 인덱스 수에서 1번째 인덱스 수를 뺀값을 더해준다면, 1번째 인덱스 수는 2번 계산된셈이다. 따라서 일단 빼주고
          //새로 계산한 수를 더해주는 것
        } else {
          result = result + DIGIT_VALUES[romanNumeral[i + 1]];
        }
      }
      return result;
    } else {
      return 0;
    }
  } else {
    return null;
  }
};
