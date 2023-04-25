import arc from '@architect/functions';

// https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
const generateId = async function (min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const getRandomQuote = async function () {
  let tables = await arc.tables();
  const data = await tables.quotes.scan({});
  //console.log(">>> randowmQuote: 1..." + data != undefined ? data.Items : "n/a");
  const quotes = data.Items; //await tiny.get({ url: "http://localhost:3333/api/quotes" });
  const randomId = await generateId(0, quotes.length);
  //console.log("randowmQuote: 1 > randomId: " + randomId);
  return quotes[randomId];
};
// learn more about HTTP functions here: https://arc.codes/http
export async function handler(req) {
  //console.log("get-api-quotes: 1...")
  const randomQuote = await getRandomQuote();
  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'application/json; charset=utf8',
    },
    body: JSON.stringify(randomQuote),
  };
}
