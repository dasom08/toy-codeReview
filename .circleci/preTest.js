let studentInfo = require('../student.json')

let {th, name, problemNumber} = studentInfo

if (th === "" | name === "") {
    throw new Error("Studnets Information is empty! put your info in student.json")
}

console.log(problemNumber);