const powerSet = function (str) {
    // TODO: Your code here!
    debugger
    let strArr = str.split("")
    let arr = []
  
    for (let i = 0; i < strArr.length; i++) {
      if (!arr.includes(strArr[i])) {
        arr.push(strArr[i])
      }
    }
  
  
    console.log(arr)
  
    let result = [""];
  
    for (let i = 0; i < arr.length; i++) {
      let len = result.length
      for (let x = 0; x < len; x++) {
        result.push(result[x] + arr[i])
      }
    }
    return result
  };
  
  let str = "bbbaaa"