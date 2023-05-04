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

test("endpoint exists", async (t) => {
  t.plan(1);
  let result = await tiny.get({ url: "http://localhost:3333/api/quotes" });
  t.ok(result, "got 200 response");
});
test("contenttype", async (t) => {
  t.plan(3);
  let result = await tiny.get({ url: "http://localhost:3333/api/quotes" });
  t.ok(result.headers, "no headers at all?!");
  t.ok(result.headers["content-type"], "no contewnrt tyoe header?!");
  t.equal(result.headers["content-type"], "application/json; charset=utf8", "wrong content type");
});
test("body", async (t) => {
  t.plan(3);
  let result = await tiny.get({ url: "http://localhost:3333/api/quotes" });
  t.ok(result.body, "no body in response?!");
  t.notEqual(result.body, "itzelbritzel");
  t.equal(result.body.length, 92, "wrong number of items in test data");
  //console.debug("test: getQuotes: quotes: " + JSON.stringify(result.body, " ", 2));
});

test("teardown", async (t) => {
  t.plan(1);
  await sandbox.end();
  t.ok(true, "sandbox ended");
});
