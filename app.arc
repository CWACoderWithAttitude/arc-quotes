@app
test1

@http
#get /
get /api/quotes
get /api/randomQuote
get /api/quotes/:quoteID
delete /api/quotes/:quoteID
post /api/quotes
post /api/quotesUpload

@aws
# profile default
region eu-central-1
architecture arm64

@tables
quotes
  quoteID *String

# https://arc.codes/docs/en/guides/frontend/static-assets#static-assets
@static
folder svelte/moz-todo-svelte/public
#spa true