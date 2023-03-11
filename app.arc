@app
test1

@http
#get /
get /api/quotes
get /api/quotes/:quoteID
post /api/quotes

@aws
# profile default
region eu-central-1
architecture arm64

@tables
quotes
  quoteID *String

# https://arc.codes/docs/en/guides/frontend/static-assets#static-assets
#@static
#spa true