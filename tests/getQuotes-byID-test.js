const test = require('tape');
const tiny = require('tiny-json-http');
const sandbox = require('@architect/sandbox');

//
// https://arc.codes/docs/en/guides/developer-experience/local-development
//

/**
 * first we need to start the local http server
 */
test('sandbox.start', async (t) => {
  t.plan(1);
  await sandbox.start();
  t.ok(true, 'sandbox started and mockdata loaded on http://localhost:3333');
});

test('endpoint exists', async (t) => {
  t.plan(2);
  let result = await tiny.get({ url: 'http://localhost:3333/api/quotes/1' });
  t.ok(result, 'got result response');
  t.notEqual(result.body, {}, 'wrong bodfy?!');
});
test('check valid result', async (t) => {
  t.plan(2);
  const id = '1';
  let result = await tiny.get({
    url: 'http://localhost:3333/api/quotes/' + id,
  });

  t.ok(result.body, '', 'wew should have found something?!');
  t.equal(result.body.quoteID, id, 'ID mismatch - returned wrong quote by id?!');
});

test('check query for non existing id', async (t) => {
  t.plan(1);
  const nonExistingId = '99999';
  let result = await tiny.get({
    url: 'http://localhost:3333/api/quotes/' + nonExistingId,
  });

  t.equal(result.body, '', 'the JOSN should be empty?!');
});

test('get by existing id', async (t) => {
  t.plan(2);
  const existingId = '1';
  let result = await tiny.get({
    url: 'http://localhost:3333/api/quotes/' + existingId,
  });
  t.ok(result, "there ain't a result?!");

  t.equal(result.body.quoteID, existingId, 'the JOSN should be empty?!');
});
test('contenttype', async (t) => {
  t.plan(3);
  let result = await tiny.get({ url: 'http://localhost:3333/api/quotes' });
  t.ok(result.headers, 'no headers at all?!');
  t.ok(result.headers['content-type'], 'no contewnrt tyoe header?!');
  t.equal(result.headers['content-type'], 'application/json; charset=utf8', 'wrong content type');
});
test('teardown', async (t) => {
  t.plan(1);
  await sandbox.end();
  t.ok(true, 'sandbox ended');
});
