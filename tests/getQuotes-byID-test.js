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
  t.plan(2);
  let result = await tiny.get({ url: "http://localhost:3333/api/quotes/1" });
  t.ok(result, "got result response");
  t.notEqual(result.body, {}, "wrong bodfy?!");
  //t.equal(result.body.length, 1, 'wrong bodfy size?!')
  //console.log(">>>> result: " + JSON.stringify(result))
});
test("check valid result", async (t) => {
  t.plan(2);
  const id = "1";
  let result = await tiny.get({
    url: "http://localhost:3333/api/quotes/" + id,
  });

  t.ok(result.body, "", "wew should have found something?!");
  //console.log(">>>> result: " + JSON.stringify(result.body));
  t.equal(result.body.quoteID, id, "ID mismatch?!");
});
/* test("query with no id", async (t) => {
  t.plan(2);
  const id = "";
  let result = await tiny.get({
    url: "http://localhost:3333/api/quotes",
  });

  t.ok(result.body, "", "wew should have found something?!");
  console.log(">>>> result: " + JSON.stringify(result.body));
  t.equal(result.body.quoteID, id, "ID mismatch?!");
}); */
test("check query for non existing id", async (t) => {
  t.plan(1);
  const id = "42";
  let result = await tiny.get({
    url: "http://localhost:3333/api/quotes/" + id,
  });

  t.equal(result.body, "", "the JOSN should be empty?!");
});

test("contenttype", async (t) => {
  t.plan(3);
  let result = await tiny.get({ url: "http://localhost:3333/api/quotes" });
  //console.log(">>>> result: " + JSON.stringify(result))
  t.ok(result.headers, "no headers at all?!");
  t.ok(result.headers["content-type"], "no contewnrt tyoe header?!");
  t.equal(
    result.headers["content-type"],
    "application/json; charset=utf8",
    "wrong content type"
  );
});
test("teardown", async (t) => {
  t.plan(1);
  await sandbox.end();
  t.ok(true, "sandbox ended");
});
