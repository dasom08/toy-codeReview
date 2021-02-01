var balancedParens = function (input) {
  let stack = [];

  for (let i = 0; i < input.length; i++) {
    var curr = input[i];
    if (curr === '(' || curr === '{' || curr === '[') {
      stack.push(curr);
    } else if (curr === ')' || curr === '}' || curr === ']') {
      let top = stack[stack.length - 1];
      if (top === undefined) {
        // 열린 괄호보다 닫힌 괄호가 더 많을 때, ex) should return false for )
        return false;
      }
      if (top === '(' && input[i] === ')') {
        stack.pop();
      } else if (top === '{' && input[i] === '}') {
        stack.pop();
      } else if (top === '[' && input[i] === ']') {
        stack.pop();
      }
    }
  }
  if (stack.length !== 0) {
    //닫힌 괋호보다 열린 괄호가 더 많을 때, ex) should return false for (
    return false;
  }
  return true;
};
