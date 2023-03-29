import arc from '@architect/functions'
import { v4 as uuidv4 } from 'uuid';
// learn more about HTTP functions here: https://arc.codes/http
export async function handler (req) {
  const f='quotesUpload'
  const body = arc.http.helpers.bodyParser(req)
  const tables = await arc.tables()
  
  body['quotes'].forEach(async quote => {
    quote['quoteID'] = uuidv4()
    console.log(`${f}: body: ${JSON.stringify(quote)}`)
    var quote = await tables.quotes.put(body)
    console.log('quotes-post: quote: ' + JSON.stringify(quote))
  });
  return {
    statusCode: 201,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'application/json; charset=utf8'
    },
    json: {}
  }
}