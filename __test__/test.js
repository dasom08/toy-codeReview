const colors = require('colors')
let tests = require("./test.json")
let students = require('../student.json') 

let { th, name, problemNumber } = students
let { test } = tests 

if (problemNumber && Number(problemNumber) <= 50) {
  require(`../${test[Number(problemNumber)-1]}`)
} else {
  throw new Error ("student.json 파일에 문제 번호를 알맞게 수정해 주시기 바랍니다".red)
}

