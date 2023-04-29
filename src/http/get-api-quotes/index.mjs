import arc from '@architect/functions';

// learn more about HTTP functions here: https://arc.codes/http
export async function handler(req) {
  //console.log("get-api-quotes: 1...")
  let tables = await arc.tables();
  const data = await tables.quotes.scan({});
  //console.log(">>> get-api-quotes: 2..." + data!=undefined ? data.Items:'n/a')
  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'application/json; charset=utf8',
    },
    body: JSON.stringify(data.Items),
  };
}
