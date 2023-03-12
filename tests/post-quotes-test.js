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
  let result = await tiny.get({ url: 'http://localhost:3333/api/quotes' })
  t.ok(result, 'got 200 response')
});

test("create quote by post request", async (t) => {
    t.plan(1);
    const id = new Date(Date.now()).toISOString()
    const postData = {"quoteID":id,"text": "itzelbritzel bla fasel blub", "author":"JavaVolker"}
    const headers= {
      'Content-Type': 'application/json',
      'volker': "benders"
    }
    const result = await tiny.post({ url: 'http://localhost:3333/api/quotes', headers: headers, data: postData})
    t.ok(result, 'got 200 response')
  });
  
test("teardown", async (t) => {
    t.plan(1);
    await sandbox.end();
    t.ok(true, "sandbox ended");
  });
  