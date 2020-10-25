/*
 * write a function that takes a string of text and returns true if
 * the parentheses are balanced and false otherwise.
 *
 * Example:
 *   balancedParens('(');  // false
 *   balancedParens('()'); // true
 *   balancedParens(')(');  // false
 *   balancedParens('(())');  // true
 *
 * Step 2:
 *   make your solution work for all types of brackets
 *
 * Example:
 *  balancedParens('[](){}'); // true
 *  balancedParens('[({})]');   // true
 *  balancedParens('[(]{)}'); // false
 *
 * Step 3:
 * ignore non-bracket characters
 * balancedParens(' var wow  = { yo: thisIsAwesome() }'); // true
 * balancedParens(' var hubble = function() { telescopes.awesome();'); // false
 *
 *
 */

// stack을 가르치는 예제임. (코딩테스트에 나온대.)
var balancedParens = function (input) {
  let stack = [];
  for (let i = 0; i < input.length; i++) {
    if (
      input[i] === "(" ||
      input[i] === ")" ||
      input[i] === "{" ||
      input[i] === "}" ||
      input[i] === "[" ||
      input[i] === "]"
    ) {
      stack.push(input[i]);
    }
    if (
      (stack[stack.length - 2] === "(" && stack[stack.length - 1] === ")") ||
      (stack[stack.length - 2] === "{" && stack[stack.length - 1] === "}") ||
      (stack[stack.length - 2] === "[" && stack[stack.length - 1] === "]")
    ) {
      stack.pop();
      stack.pop();
    }
  }
  if (stack.length > 0) {
    return false;
  }
  return true;
};
