const { exec } = require("child_process");
const getTodaysScript = require("./getdailyscript");
const axios = require("axios");

const { URCLASS_URL, ASSESSMENT_ID, TRAVIS_PULL_REQUEST_SLUG } = process.env;

if (TRAVIS_PULL_REQUEST_SLUG === "\n") {
  throw new Error("github username is missing");
}

(async function() {
  let resp = await getTodaysScript();
  console.log(resp.data);
  executeScript(resp.data);
})();

function executeScript(obj) {
  exec(obj.script, (err, json, stderr) => {
    const result = JSON.parse(json);
    const username = TRAVIS_PULL_REQUEST_SLUG.split("/")[0];

    const options = {
      baseURL: `https://${URCLASS_URL}`,
      url: `/Prod/submit`,
      method: "post",
      headers: {
        "Content-Type": "application/json"
      }
    };

    console.log(JSON.stringify(options));
    console.log(result);

    const body = {
      assessment_id: obj.uuid,
      githubUsername: username,
      type: "mocha",
      result: result
    };

    makeRequest(options, body);
  });
}

function makeRequest(options, body) {
  options.data = body;
  console.log(options);
  axios(options)
    .then(resp => {
      console.log(resp.status);
      if (resp.status >= 400) {
        if (resp.status === 400) {
          throw new Error("invalid github username.");
        }
        throw new Error("There is an error on response from urclass.");
      }
      console.log("data from urclass is ", resp.data);
    })
    .catch(e => {
      console.log(e);
      throw new Error("data did not send to urclass");
    });
}
