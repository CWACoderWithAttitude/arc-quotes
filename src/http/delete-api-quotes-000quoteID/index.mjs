import arc from "@architect/functions";
// learn more about HTTP functions here: https://arc.codes/http
export async function handler(req) {
  // this is not the beat way to get params
  // see line 8 for a better approach
  const params = arc.http.helpers.interpolate(req).params;
  const data = await arc.tables();
  let quoteID = req.params.quoteID 
  const p = { quoteID: quoteID }
  
  const quote = await data.quotes.delete(p);
  return {
    statusCode: 204,
    headers: {
      "cache-control":
        "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
      "content-type": "application/json; charset=utf8",
    },
    
  };
}
