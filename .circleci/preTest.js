let studentInfo = require('../student.json')

let {th, name, problemNumber} = studentInfo

if (th === "" | name === "" | th === "Immersive 기수를 입력해 주세요" | name === "Put Your name") {
    throw new Error("Studnets Information is empty! put your info in student.json")
}

console.log(problemNumber);