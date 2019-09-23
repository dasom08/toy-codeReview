const { exec } = require('child_process');
const https = require('https');

// Get sutdent data from student.json
let studentInfo = require('../student.json')
let {th, name, problemNumber} = studentInfo

exec('npm test | grep -E \"[0-9]+\\s(passing|failing)\"', (err, stdout1, stderr) => {
    if (err) {
        console.log(err)
        throw new Error('can not take the test result')
    }

    // Get test result from the console and cleasing it for spread sheet
    let matchWithPassing = stdout1.match(/([.\d,]+)[ ]+passing/)
    let matchWithFailing = stdout1.match(/([.\d,]+)[ ]+failing/)
    let passing = matchWithPassing ? Number(matchWithPassing[1]) : 0
    let failing = matchWithFailing ? Number(matchWithFailing[1]) : 0

    console.log(['테스트 결과입니다.', `통과된 테스트: ${passing}`, `통과하지 못한 테스트: ${failing}`].join('\n'))

    const options = {
      hostname: "dnl7koxsek.execute-api.ap-northeast-2.amazonaws.com",
      path: "/default/im-submit",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    };

    const result = new Promise((resolve, reject) => {
      const req = https.request(options, res => {
        let data = '';
    
        if (res.statusCode === 500) {
          throw new Error("There is an error on submiting")
        }
    
        res.on("data", chunk => {
          data += chunk;
        });
    
        res.on("end", () => {
          resolve(JSON.parse(data.toString()))
        });
      });
    
      req.on("error", e => {
        throw new Error("data did not submit correctly");
      });
    
      // send the request
      req.write(
        JSON.stringify({
          fields: {
            'class': th,
            'name': name,
            'problem': problemNumber,
            'passed': passing,
            'failed': failing,
            'sprint' : 'toy problem' + " " + problemNumber
          }
        })
      );
      req.end();
      
})})