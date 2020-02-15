const axios = require("axios");
const { CUSTOM_TIMESTAMP } = process.env;

async function getTodaysScript() {
  return await axios
    .get(
      "https://fgsruyxrxj.execute-api.ap-northeast-2.amazonaws.com/Prod/date"
    )
    .catch(e => {
      throw new Error("lambda is dead");
    });
}

(async function() {
  let resp = await getTodaysScript();
  console.log(resp.data.script);
})();

module.exports = getTodaysScript;
