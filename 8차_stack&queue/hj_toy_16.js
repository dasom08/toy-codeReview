var balancedParens = function (input) {
  //() , {}, [] : 인풋값중에서 괄호가 이렇게 쌍으로 이루어져 있는지를 탐색
  //input값을 우선 spilt 해준다.
  //그리고 괄호 부분만 발라내서 새로운 배열에 넣어준다.
  let bracket = ['(', ')', '{', '}', '[', ']'];
  let inputArr = input.split('');
  let res = [];
  for (let i = 0; i < inputArr.length; i++) {
    if (bracket.includes(inputArr[i])) {
      res.push(inputArr[i]);
    }
    if (
      (res[res.length - 2] === '(' && res[res.length - 1] === ')') ||
      (res[res.length - 2] === '{' && res[res.length - 1] === '}') ||
      (res[res.length - 2] === '[' && res[res.length - 1] === ']')
    ) {
      res.pop();
      res.pop();
    }
  }
  if (res.length > 0) {
    return false;
  }
  return true;
};
