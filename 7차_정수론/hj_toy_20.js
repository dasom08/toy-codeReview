vvar toFraction = function (number) {
  let strNum = number.toString();
  //let numLength = strNum.length - 1; //왜냐면 소수점부분을 빼야 진짜 숫자의 갯수이므로 -1을 해준 것.
  let inputNum = number;
  if (strNum[0] === '-') {
    //주어진 인자가 음수라면
    //numLength = strNum.length - 2; //실제 숫자의 갯수는 소수점과, 마이너스 기호를 뺀 갯수이므로 -2 이다.
    //let minus = strNum.slice(1, strNum.length); //마이너스 기호를 뺀 숫자 부분을 발라냄(소수점자체는 포함)
    strNum = strNum.slice(1, strNum.length);
    inputNum = parseFloat(strNum);
  }
  //위의 조건문 자체는 음수가 주어졌을때, 마이너스라는 기호를 배제하고 우선 수를 변환시키기 위한 작업을 위해 필요.

  //let ten = Math.pow(10, numLength - 1);
  //->이 부분은 미스였다. 10.2 같이 소수점 위의 정수 부분이 두자리 이상인 경우를 인지하지 못했다.
  let float = strNum.slice(strNum.indexOf('.'), strNum.length);
  let floatLength = float.length;

  let ten = Math.pow(10, floatLength);

  //위의 변수는 소수점을 분수로 만들기 위해, 필요한 10의 제곱 수를 구하기 위함이다.
  //가령 2.5인 경우에는 10^1을 곱하고 그 분모로 들어가게 된다.

  // 소수점이 0인 경우
  if (inputNum - Math.floor(inputNum) === 0) {
    return `${Math.floor(inputNum)}/1`;
  } else {
    // 소수점이 0이 아닌 경우 + 5로 나눠지는 경우

    let newNum = parseInt(inputNum * ten);
    // 주어진 수를 분수로 만들기 위해 10의 제곱 수 중 하나를 곱하고 나서 parseInt를 써주지 않으면, 소수점 이하의 0까지 같이 불린다.

    //두수의 최대공약수 구하기(소수점이 0이 아닌 수에 필요하다)
    let max = 1;
    // 우선 최대공약수는 최초로는 1로 선언. 공약수가 없는 두수가 있을 수도 있으므로
    //가령 number 0.88 일경우, 최대공약수 구해야 하는 수는 88과 100이된다. 두 수의 공약수 구할때는 비교하는 두수 중에
    //작은 수 까지만 비교하면 되므로, 88까지 반복문 돌린다
    for (let i = 1; i <= newNum; i++) {
      if (newNum % i === 0 && ten % i === 0) {
        max = i;
      }
    }
    if (number < 0) {
      return `-${newNum / max}/${ten / max}`;
    }
    return `${newNum / max}/${ten / max}`;
  }
};