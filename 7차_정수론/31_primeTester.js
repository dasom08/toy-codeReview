/**
 * A prime number is a whole number that has no other divisors other than
 * itself and 1. Write a function that accepts a number and returns true if it's
 * a prime number, false if it's not.
 */

// 위키백과 : 2와 5를 제외하면, 모든 소수의 일의 자리 수는 1, 3, 7, 9이다.
// 위키백과 : 어떤 자연수 n이 소수임을 판정하기 위해선, 루트 n까지의 수 중 1을 제외하고 그 자연수의 약수가 있는지 확인하면 된다.
// 루트 n : Math.pow(n, 0.5)
// 루트 n의 자연수 부분(버림) : Math.floor(Math.pow(n, 0.5))

// n을 어떤 수로 나누었을 때, 나누어 떨어지는 모든 값을 배열로 나열한다. (1부터 자기 자신까지 나열하게 됨) - 약수를 구하는 함수
// 이 배열 안에, 1과 자기 사진만 포함되어 있다면, 그 n은 소수임.
// 위키백과 내용과 조합하면, 1~n까지를 모두 탐색할 필요 없고, 1~루트n까지만 탐색하면 되는걸까?

var primeTester = function (n) {
  if (typeof n !== "number" || n < 1 || n % 1 !== 0) {
    // n isn't a number or n is less than 1 or n is not an integer
    return false;
  }
  // TODO: return true if n is prime, false otherwise
  if (n === 1) {
    return false;
  }

  if (n === 2 || n === 3 || n === 5 || n === 7) {
    return true;
  }

  // 위키백과 : 2와 5를 제외하면, 모든 소수의 일의 자리 수는 1, 3, 7, 9이다.
  let firstDigit = n % 10;

  if (
    firstDigit === 2 ||
    firstDigit === 4 ||
    firstDigit === 5 ||
    firstDigit === 6 ||
    firstDigit === 8
  ) {
    return false;
  }

  // n의 제곱근이 정수라면, 제곱근이 n의 약수이므로, 탈락
  if (Number.isInteger(Math.pow(n, 0.5))) {
    return false;
  }

  // let rootN = Math.floor(Math.pow(n, 0.5));

  // 참고 : https://im-developer.tistory.com/23
  // 1부터 n까지의 모든 수를 가지고, n을 나눠서, 나머지가 0인 경우 이 수를 push 한다.
  // 이렇게 해서 push된 숫자가, 1과 자기 자신 뿐이라면, 그 수는 소수이다.
  // 난 약수를 push하지 않고, 약수가 발견되면 바로 false를 리턴하도록 구성함

  // 위키백과 : 어떤 자연수 n이 소수임을 판정하기 위해선, 루트 n까지의 수 중 1을 제외하고 그 자연수의 약수가 있는지 확인하면 된다.
  // 이게 맞는지 실험해 보겠음

  let powedNum = Math.floor(Math.pow(n, 0.5));
  // 70368760954879 라는 큰 숫자도 위 처리를 거치면 8388608 로 줄어든다.
  // 진짜로 여기까지만 판단하면 된다면, 그 뒤를 처리하지 않아도 되므로 연산하는 양이 크게 줄어들 듯
  // 15485867 을 가지고 실험해 봤는데,
  // powedNum 처리하니 i 값이 3935까지 가고 true가 출력되었음  // powedNum 처리 없이는 15485865번 연산하고 true 출력
  // 따라서 정상 작동하는 것 같다.

  for (i = 2; i < powedNum; i++) {
    // 1부터 시작할 필요가 없음. 2부터 비교하면 됨. // 자기 자신도 넣을 필요 없음
    if (n % i === 0) {
      // 나머지가 0인 것들, 즉 약수들만을 체크해서, (여기에서 걸린다면 나누어 떨어지는 수, 즉 약수가 있다는 말이 된다.)
      return false;
    }
  }
  return true;
};

/* Extra credit: Write a function that generates a list of all prime numbers
 * in a user-specified range (inclusive). If you're not quite sure where to start,
 * check out the Sieve of Eratosthenes on Wikipedia. (And if you're feeling
 * saucy, check out the Sieve of Atkin.)
 */

var primeSieve = function (start, end) {
  // create a current to start our iteration which is 2
  var current = 2;
  // create a range for our prime numbers
  var primes = range(end);
  // check while I current is less than our end
  while (current < end) {
    // loop through until the end and increment by the current every time
    for (var i = current + current; i <= end; i += current) {
      // make the current = to null
      primes[i] = null;
    }
    do {
      // add to our current
      current++;
      // check if the current is null then add to current again, if the current is not null continue
    } while (!primes[current] && current <= end);
  }
  // return all the numbers that aren't null and greater then start
  var results = [];
  for (var j = 2; j < primes.length; j++) {
    if (primes[j] !== null && primes[j] >= start) {
      results.push(primes[j]);
    }
  }
  return results;
};

var range = function (end) {
  var result = [];
  for (var i = 0; i <= end; i++) {
    result.push(i);
  }
  return result;
};

/*  아래는 앞서 제출했던 코드

  위에서 만든 primeTester 함수를 사용하여 전체를 훑는 방식이다.
  그러나, 이 방식은 효율성 면에서 불리함.

  "Sieve of Eratosthenes(에라토스테네스의 체)" 라는 방식을 활용한 코드를 요구하므로, 이를 반영하여 작성
  배수를 처리하는 방법이 감이 오지 않아서, 구글검색으로 해결함...

  '에라토스테네스의 체' 개념 : 
  "소수를 구하고자 하는 범위 2~n이 있을 때, 
    2~n의 제곱근에 해당하는 범위 안의 소수의 배수들을 계속 제외하면, 결국 소수만 남는다"


  var primeSieve = function (start, end) {
    let result = [];

    for (let i = start; i <= end; i++) {
      if (primeTester(i)) {
        result.push(i);
      }
    }

    return result;
  };


*/
