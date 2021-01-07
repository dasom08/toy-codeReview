var primeTester = function (n) {
  if (typeof n !== 'number' || n <= 1 || n % 1 !== 0) {
    // n 이 숫자가 아니거나 n이 1보다 작거나 or n이 정수가 아닌 경우
    return false;
  } else if (n <= 2) {
    return true; //즉 n이 1이거나 2일 때 소수이다
  } else if (n > 2 && n % 2 === 0) {
    return false; //n이 2보다 크고 짝수이면 무조건 소수가 아니다
  } else {
    //? 숫자의 제곱근까지 루프를 실행하면 알고리즘의 복잡성을 O (n)에서 O (sqrt (n))로 줄일 수도 있다.
    //제곱근 활용하지 않고 그냥 숫자를 반복문을 돌다보니 테스트를 통과하지 못하고 시간복잡도가 너무 오래 걸림.
    //그렇다면 제곱근을 통해서 비교해줘야 하는 이유는 무엇일까?
    //주어진 수 = 제곱근보다 작은 수 * 제곱근보다 큰수 로 구성되어있으므로, 제곱근보다 작은 수들을 약수로 가지는지 안가지는 지만 확인하면 되는 것!
    //? 참고 : https://stackoverflow.com/questions/40200089/number-prime-test-in-javascript
    //? 참고 : https://www.thepolyglotdeveloper.com/2015/04/determine-if-a-number-is-prime-using-javascript/

    let num = parseInt(Math.sqrt(n)); // n의 제곱근에서 소수자리 버려주고 정수화

    for (let i = 3; i <= num; i = i + 2) {
      //소수인지 알아보려 해당 조건까지 내려온 수는 1보다 큰 홀수일 것이므로, 약수인지 비교하는 수들에서 짝수는 건너뛰어도 된다.
      if (n % i === 0) {
        //약수가 하나라도 있으면 바로 false 반환
        return false;
      }
    }
    return true;
  }
};

/* Extra credit: Write a function that generates a list of all prime numbers
 * in a user-specified range (inclusive). If you're not quite sure where to start,
 * check out the Sieve of Eratosthenes on Wikipedia. (And if you're feeling
 * saucy, check out the Sieve of Atkin.)
 */

var primeSieve = function (start, end) {
  let arr = [];
  for (let i = start; i <= end; i++) {
    if (primeTester(i) === true) {
      arr.push(i);
    }
  }
  return arr;
};
