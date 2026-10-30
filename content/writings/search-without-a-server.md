+++
date = "2026-10-25T20:00:00+07:00"
title = "Search without a Server"
topics = ["hugo", "search"]
toc = true
+++

A static site has no server to run queries on, so the search index has to be built ahead of time.

## Building the index

[Pagefind](https://pagefind.app) runs after Hugo and indexes the finished HTML:

```bash
hugo --gc --minify && pagefind --site public
```

Only Writings carry the `data-pagefind-body` attribute, so other pages stay out of the results.

## Querying it

The Search page loads a small hand-written script that calls Pagefind's JS API and renders the results as plain links. I skipped the default UI so the results look like the rest of the site.

## Testing locally

`pnpm preview` builds the site and serves it together with the index.