const test = require("tape");
const tiny = require("tiny-json-http");
const sandbox = require("@architect/sandbox");
//
// https://arc.codes/docs/en/guides/developer-experience/local-development
//

/**
 * first we need to start the local http server
 */
test("sandbox.start", async (t) => {
  t.plan(1);
  await sandbox.start();
  t.ok(true, "sandbox started and mockdata loaded on http://localhost:3333");
});

// https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
const generateId = async function (min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const getRandomQuote = async function () {
  const quotes = await tiny.get({ url: "http://localhost:3333/api/quotes" });
  const randomId = await generateId(0, quotes.length);
  console.log("generateId > id: " + randomId);
  return quotes[randomId];
};
test("get random quote", async (t) => {
  t.plan(1);

  const quotes = await tiny.get({ url: "http://localhost:3333/api/randomQuote" });
  t.true(quotes.body, "Randowm Quote should be valid");
});

test("teardown", async (t) => {
  t.plan(1);
  await sandbox.end();
  t.ok(true, "sandbox ended");
});
