//import arc from '@architect/functions'
let arc = require('@architect/functions')

exports.handler = arc.http.async(handler)
// learn more about HTTP functions here: https://arc.codes/http
async function handler (req) {
  // https://arc.codes/docs/en/reference/runtime-helpers/node.js#arc.tables()
  const tables = await arc.tables()
  const quotes = tables.quotes
  const body = req.body 
  let quoteID = req.params.quoteID //await arc.http.helpers(req)
  console.log('=== session: ' + JSON.stringify(quoteID))
  

  //console.log('=== quotes-byID: req: ' + JSON.stringify(req))
  const quote = await quotes.get({ quoteID: quoteID })
  console.log('=== quote: ' + JSON.stringify(quote))
  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'application/json; charset=utf8'
    },
    body: JSON.stringify(quote)
  }
}