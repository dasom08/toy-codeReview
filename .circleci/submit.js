const { exec } = require('child_process');
const https = require('https');

// Get sutdent data from student.json
let studentInfo = require('../student.json')
let {th, name, problemNumber} = studentInfo

exec('npm test | grep -E \"[0-9]+\\s(passing|failing)\"', (err, stdout1, stderr) => {
    if (err) {
        return;
    }

    // Get test result from the console and cleasing it for spread sheet
    let matchWithPassing = stdout1.match(/([.\d,]+)[ ]+passing/)
    let matchWithFaling = stdout1.match(/([.\d,]+)[ ]+failing/)
    let passing = matchWithPassing ? Number(matchWithPassing[1]) : 0
    let faling = matchWithFaling ? Number(matchWithFaling[1]) : 0

    exec('echo "$airtable_api_key"', (err, apikey) => {
        const options = {
            hostname: 'api.airtable.com',
            path: '/v0/app8kEq9wXlsuffDy/Toy%20Problem',
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Authorization: ' Bearer ' + apikey.trim()
            }
        };

        const req = https.request(options, (res) => {
            res.on('data', (chunk) => {
            console.log(chunk.toString());
          // callback(null, result);
        });
      });

      req.on('error', (e) => {
        console.log('error');
        // callback(new Error('failure'));
      });
      // send the request
      req.write(JSON.stringify({
        'fields': {
            'th': th,
            'name':name,
            'problem': problemNumber,
            'passing': passing,
            'failing': faling,
            'date': date
        }
      }));
      req.end();
    });
});