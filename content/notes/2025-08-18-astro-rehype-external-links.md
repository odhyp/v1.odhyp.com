+++
# Metadata
title = "Astro: Rehype External Links"
description = "Integrate rehype plugin to add rel (and target) to external links in Astro" 
slug = "astro-rehype-external-links"
date = 2025-08-18T20:33:23+07:00
lastmod = 2025-08-18T20:33:23+07:00
draft = false

# Page setting
toc = false

# Taxonomies & Routing
category = "astro"
aliases = ["/2025-08-18-astro-rehype-external-links"]
+++

Astro doesn’t offer a built-in integration specifically for automatically opening external links in new tabs, but we can easily implement it using a Markdown (or MDX) plugin. This runs at build time, giving you a clean, dependency-free solution.

[Astro’s docs](https://docs.astro.build/en/guides/markdown-content/#adding-remark-and-rehype-plugins) recommend using [rehype-external-links](https://github.com/rehypejs/rehype-external-links) as your go-to plugin for external link behavior in Markdown content.

## Install `rehype-external-links`

In Node.js (version 16+), install with `npm`:

```bash
npm install rehype-external-links
```

## Apply plugin to `astro.config.mjs`

Import `rehype-external-links` and you can set your own `target` or `rel`.

{{< highlight mjs "linenos=inline, hl_lines=2 6-16" >}}

...
import rehypeExternalLinks from "rehype-external-links";

export default defineConfig({
...
markdown: {
rehypePlugins: [
[
rehypeExternalLinks,
{
target: "\_blank",
rel: ["noopener", "noreferrer", "external"],
},
],
],
},
...
});

{{< /highlight >}}

## Output

The `target` and `rel` will be added to every external anchor tag after `npm run build` (or `npm run dev`).

```html
<a
  href="https://github.com/odhyp/"
  rel="noopener noreferrer external"
  target="_blank"
  >GitHub</a
>
```
