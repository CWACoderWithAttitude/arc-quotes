import arc from '@architect/functions';
//const arc = require('@architect/functions');
//exports.handler = arc.http.async(handler)
// learn more about HTTP functions here: https://arc.codes/http
export async function handler(req) {
  //let tables = await arc.tables()
  //const data = await tables.quotes.scan({})
  //console.log('quotes-post: req: ' + JSON.stringify(req))
  const headers = req.headers;
  //console.log('quotes-post: header: ' + JSON.stringify(headers))
  const body = arc.http.helpers.bodyParser(req);
  if (body && !body['quoteID']) {
    body['quoteID'] = new Date(Date.now()).toISOString();
  }
  //console.log('quotes-post: quote-input: ' + JSON.stringify(body, ' ', 2))
  //console.log('quotes-post: request-body: ',(body != undefined ? JSON.stringify(body) : 'no body?!'))
  //  console.log('quotes-post: body: ' + body)
  const data = await arc.tables();

  const quote = await data.quotes.put(body);
  //console.log('quotes-post: quote: ' + JSON.stringify(quote));
  //const quotes = await data.tables()
  //arc.http(req)
  return {
    statusCode: 201,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'application/json; charset=utf8',
    },
    json: quote,
  };
}
