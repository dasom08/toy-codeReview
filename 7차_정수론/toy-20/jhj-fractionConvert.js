var toFraction = function (number) {
  //1. number을 정수로 만들어주기 위한 최소번 10을 곱한다.
  let denominator = 1;
  let len = String(number).length;
  for (let i = 1; i <= len - 2; i++) {
    number *= 10;
    denominator *= 10;
  }
  number = Math.floor(number); //이건 순전히 그러나 testcase중 toFraction(0.253213)의 0.253213는 이상하게도 0.25321300000000003으로 인식되는 경우 때문이다..

  //2. 이렇게 되면 정수가 된 number와 10의 거듭제곱으로 만들어진 분모 denominator가 생긴다.
  // 그러면 이것의 최대 공배수를 구해서, 둘을 나눈뒤 기약분수화 시킨다.
  // 최대 공배수를 구하는 방법은 <유클리드 호제법>을 사용한다.
  let originNumber = number;
  let originDenom = denominator;
  let GCD;

  while (1) {
    let r = number % denominator;
    if (r === 0) {
      GCD = denominator;
      break;
    }
    number = denominator;
    denominator = r;
  }
  //3. 이렇게 구해진 최소공배수인 GCD를 분모(dennominator)와 분자(number)에 각각 나눠서 기약분수로 만든다.
  //단, number와 denominator는 GCD를 구하는 과정에서 값이 이리저리 바뀌었으니 미리 원본을 빼놓은 originNumber, originDenom를 이용한다.

  return `${originNumber / GCD}/${originDenom / GCD}`;
};
