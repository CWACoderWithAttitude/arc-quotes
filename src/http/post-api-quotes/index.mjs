import arc from '@architect/functions'
//const arc = require('@architect/functions');
//exports.handler = arc.http.async(handler)
// learn more about HTTP functions here: https://arc.codes/http
export async function handler (req) {
  //let tables = await arc.tables()
  //const data = await tables.quotes.scan({})
  //console.log('quotes-post: req: ' + JSON.stringify(req))
  const body = req.body 
  
  console.log('quotes-post: text: ' +text)
//  console.log('quotes-post: body: ' + body)
  //arc.http(req)
  return {
    statusCode: 201,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'application/json; charset=utf8'
    },
    body: {"a":"a"}
  }
}