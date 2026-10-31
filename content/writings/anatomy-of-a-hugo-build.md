+++
date = "2026-10-28T20:00:00+07:00"
title = "Anatomy of a Hugo Build"
topics = ["hugo"]
toc = true
+++

Running `hugo` turns a folder of Markdown into a folder of HTML in well under a second. This post follows that run from start to finish, mostly so I have one place to look things up.

## Reading the configuration

Hugo starts by merging configuration from several places, in order of precedence.

### The config file

`hugo.toml` at the project root holds the site-wide settings: base URL, title, menus, taxonomies and output formats. Anything not set falls back to Hugo's defaults.

### Environment overrides

Any setting can be overridden with an environment variable prefixed `HUGO_`. The build script uses this for the cache directory:

```bash
export HUGO_CACHEDIR="${PWD}/.hugo-cache"
hugo --gc --minify
```

### Command-line flags

Flags win over everything else. `--buildDrafts` and `--buildFuture` are the ones I reach for most, and `pnpm dev` passes both.

## Collecting content

With the configuration settled, Hugo walks the content directory and builds a page for every file it finds.

### Sections

Every top-level folder under `content/` becomes a section. Writings is a section; Projects, Now and About are single pages at the root.

### Front matter

Each file starts with TOML front matter. Hugo reads the date, title and taxonomy terms from it, along with any custom parameters such as `toc`.

| Key      | Used for                     |
| -------- | ---------------------------- |
| `date`   | Sorting and the visible date |
| `title`  | Headings and the page title  |
| `topics` | The Topics taxonomy          |
| `toc`    | Turning on this ToC          |

### Dates and lastmod

The last-modified date comes from the first source that has one: a hand-set `lastmod`, then Git, then the file's date. Git only works when the clone has its full history, which is why the build script unshallows it.

## Rendering pages

Each page is matched to a template, and the template produces its HTML.

### Template lookup

Hugo picks the most specific template it can find. A Writing uses `page.html`, the Writings list uses `section.html`, and the home page uses `home.html`. All of them fill the `main` block of `baseof.html`.

### Render hooks

Markdown headings and images go through render hooks before they reach the template:

- headings get an id, and their text links to itself
- images are resized, converted to WebP and given fixed dimensions

### Shortcodes

This site uses none. Plain Markdown and render hooks cover everything so far, and every shortcode is one more thing to remember.

## Processing assets

Stylesheets and images live under `assets/`, where Hugo Pipes can transform them.

### CSS

One entry file imports the rest into cascade layers. Hugo bundles, minifies and fingerprints it into a single stylesheet, so each page makes one CSS request.

### Images

Images are processed only when a template asks for them. The results are cached, so a second build reuses the WebP files instead of encoding them again.

## Writing output

Finally, Hugo writes everything to `public/`.

### HTML, RSS and the sitemap

Each page gets an `index.html`. The home page also gets an RSS feed of Writings only, and Hugo writes `sitemap.xml` and `robots.txt` on its own.

### After Hugo

Pagefind runs over the finished output to build the search index. It is the last step, and the only one that isn't Hugo.

## Wrapping up

None of these steps needs a plugin or a separate tool. That's most of why the build stays fast and why I can still read the whole setup in one sitting.