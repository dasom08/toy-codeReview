let studentInfo = require('../student.json')

let {th, name, problemNumber} = studentInfo

if (name === "한글 이름을 입력해 주세요 ex) 존도우") {
    throw new Error("student.json에 정확한 정보를 입력하세요")
}

if (!th.match(/^-{0,1}\d+$/)) {
    throw new Error("student.json 기수에는 숫자만 입력하세요")
}

if (!problemNumber.match(/^\d{2}$/)) {
    throw new Error("student.json 문제 번호는 숫자를 두자리로 입력하세요")
}

console.log(problemNumber);