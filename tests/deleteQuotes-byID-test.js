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

test("delete existing quote", async (t) => {
  t.plan(3);
  const existingId = "1";
  const ensure = await tiny.get({
    url: "http://localhost:3333/api/quotes/" + existingId,
  });
  t.equal(ensure.body.quoteID, existingId, "quote should exist before it can be deleted");
  let result = await tiny.delete({ url: "http://localhost:3333/api/quotes/" + existingId });
  t.ok(result, "got 200 response");
  const verify = await tiny.get({
    url: "http://localhost:3333/api/quotes/" + existingId,
  });
  t.equal(verify.body, "", "body should be empty when querying non existing quotes");
});

test("teardown", async (t) => {
  t.plan(1);
  await sandbox.end();
  t.ok(true, "sandbox ended");
});
