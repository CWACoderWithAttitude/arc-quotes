import arc from '@architect/functions'
//const arc = require('@architect/functions');

// learn more about HTTP functions here: https://arc.codes/http
export async function handler (req) {
  let tables = await arc.tables()
  const data = await tables.quotes.scan({})
  
  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'application/json; charset=utf8'
    },
    body: JSON.stringify(data.Items)
  }
}