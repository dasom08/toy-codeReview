/**
 * Write a function that takes a number as its argument and
 * returns a string that represents that number's simplified fraction.
 *
 * Example: toFraction(0.5) === '1/2'
 *
 * Whole numbers and mixed fractions should be returned as irregular fractions
 *
 * Example: toFraction(3.0) === '3/1'
 *
 * Example: toFraction(2.5) === '5/2'
 *
 */

var toFraction = function (number) {
  // Your code here
  let origin = number;

  if (number < 0) {
    number = number * -1;
  }

  let splittedNumber = String(number).split("");

  if (splittedNumber.indexOf(".") === -1) {
    splittedNumber.push(".", "0");
  }

  let int = Math.floor(number);
  let decimal = splittedNumber.slice(splittedNumber.indexOf(".") + 1).join("");

  let top = Number(decimal);
  let bottom = 1;

  if (decimal.length > 1) {
    bottom = Math.pow(10, decimal.length);
  }

  while (
    (top % 2 === 0) & (bottom % 2 === 0) ||
    (top % 5 === 0) & (bottom % 5 === 0)
  ) {
    if ((top % 2 === 0) & (bottom % 2 === 0)) {
      top = top / 2;
      bottom = bottom / 2;
    }
    if ((top % 5 === 0) & (bottom % 5 === 0)) {
      top = top / 5;
      bottom = bottom / 5;
    }
  }

  top = top + int * bottom;

  if (origin < 0) {
    return "-" + top + "/" + bottom;
  }

  return top + "/" + bottom;
};
