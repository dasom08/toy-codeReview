const fs = require("fs");
const { CUSTOM_TIMESTAMP } = process.env;

function getTodaysScript() {
  const runner = fs.readFileSync("./.travis/testrunner.json").toString();
  const toys = JSON.parse(runner).toy;
  let today = new Date();
  if (CUSTOM_TIMESTAMP && CUSTOM_TIMESTAMP.trim() !== "") {
    today = new Date(CUSTOM_TIMESTAMP);
  }
  console.log(`echo ${today.toISOString()}`);

  const dailyToy = toys.filter(
    toy => toy.date === today.toISOString().slice(0, 10)
  );

  if (dailyToy.length === 0) return `echo "{}"`;

  let script = "";
  if (dailyToy[0].runner === "mocha") {
    script = `mocha ./${dailyToy[0].name} --reporter json`;
  }
  return script;
}

console.log(getTodaysScript());

module.exports = getTodaysScript;
