var characterFrequency = function (string) {
  //처음에 바로 배열로 접근하려고 하니 알파벳 정렬에서 걸렸다. 그래서 처음에는 객체로 만들고, 그다음에 배열로 접근하니 문제가 해결되었다.
  let result_obj = {};
  let key_arr = [];
  //let freq = [];
  for (let i = 0; i < string.length; i++) {
    if (!Object.keys(result_obj).includes(string[i])) {
      key_arr.push(string[i]);
      result_obj[string[i]] = 1;
      //result.push(freq_str)
      //freq.push(1);
    } else {
      //let str_index = arr_str.indexOf(string[i]);
      result_obj[string[i]]++;
      //freq[str_index]++
    }
  }
  let newKey = key_arr.sort();
  let result = [];
  for (let t = 0; t < newKey.length; t++) {
    let freq_arr = [];
    freq_arr[0] = newKey[t];
    freq_arr[1] = result_obj[newKey[t]];
    result.push(freq_arr);
  }
  for (let j = 0; j < result.length; j++) {
    for (let k = 0; k < result.length - 1; k++) {
      if (result[k][1] < result[k + 1][1]) {
        let big_num = result[k + 1];
        result[k + 1] = result[k];
        result[k] = big_num;
      }
    }
  }
  return result;
};
