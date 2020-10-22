/**
 * A prime number is a whole number that has no other divisors other than
 * itself and 1. Write a function that accepts a number and returns true if it's
 * a prime number, false if it's not.
 */

var primeTester = function (n) {
  if (typeof n !== 'number' || n < 1 || n % 1 !== 0 || n === 1) {
    // n isn't a number or n is less than 1 or n is not an integer
    return false;
  }
  // TODO: return true if n is prime, false otherwise
  for (let i = 2; i <= Math.sqrt(n); i++) {
    //그냥 i=2~<n까지하면 시간복잡도가 너무 커진다.
    if (n % i === 0) {
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

//소수문제풀 때 항상 조심해야하는 두 수: 1은 소수가 아니다. 2는 소수이다.
//다 소수(true)라고 치고, 소수가 아닌 것(false)을 제외시켜 나간다.

var primeSieve = function (start, end) {
  let Era = []; //start부터 end까지의 수가 차례대로 들어가있는 배열
  for (let i = start; i <= end; i++) {
    Era.push(i);
  } //끝까지 Era 배열에 남아있는수가 소수들이다.
  if (start === 1) {
    Era.splice(0, 1);
  } //1은 소수가 아니고 모두가 다 1의 배수이므로 처음부터 제외하고 시작한다.
  //에라토스테네스의 체 시작

  let inx = 0;
  let len = Era.length;
  for (let i = 0; i < len; i++) {
    let curr = Era[inx];
    if (curr === undefined) {
      return Era;
    }
    //console.log(Era, curr)
    if (primeTester(curr)) {
      //소수이면 그것만 놔두고
      for (let mul = 2 * curr; mul <= end; mul += curr) {
        //그것의 배수는 다 제거
        if (Era.includes(mul)) {
          Era.splice(Era.indexOf(mul), 1);
        }
      }
      inx++;
    } else {
      //소수 아니면 제거
      Era.splice(Era.indexOf(curr), 1);
    }
  }
  //남은게 소수들로 구성된 배열
  return Era;
};
