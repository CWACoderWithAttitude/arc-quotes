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
  t.plan(1);
  let result = await tiny.get({ url: 'http://localhost:3333/api/quotes' });
  t.ok(result, 'got 200 response');
});
test('get only german quotes', async (t) => {
  t.plan(3);
  let result = await tiny.get({ url: 'http://localhost:3333/api/quotes' });
  t.ok(result, 'no headers at all?!');
  const quotes = result.body;
  const expectedLanguage = 'de';
  const englishQuotes = quotes.filter((quote) => quote.language === expectedLanguage);
  t.notEqual(englishQuotes, undefined, 'the result should contain quotes');
  var wrongLanguageFound = false;
  englishQuotes.forEach((quote) => {
    if (quote.language !== expectedLanguage) {
      wrongLanguageFound = true;
    }
  });
  t.false(wrongLanguageFound, `only entries with language "${expectedLanguage}" should be in result`);
});

/* test('body', async (t) => {
  t.plan(3);
  let result = await tiny.get({ url: 'http://localhost:3333/api/quotes' });
  t.ok(result.body, 'no body in response?!');
  t.notEqual(result.body, 'itzelbritzel');
  t.equal(result.body.length, 73, 'wrong number of items in test data');
  //console.debug("test: getQuotes: quotes: " + JSON.stringify(result.body, " ", 2));
}); */

test('teardown', async (t) => {
  t.plan(1);
  await sandbox.end();
  t.ok(true, 'sandbox ended');
});
