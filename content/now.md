+++
date = "2026-10-29T22:27:46+07:00"
draft = true
title = "Now"
+++

Most personal sites start fast and slowly get heavier. A theme here, an analytics snippet there, three font weights "just in case"... and suddenly a page of text weighs more than a novel. This is a short write-up of the rules I use to keep **this** site small, and the _few_ places where I let myself spend bytes.

The short version: ship _**only what the reader needs**_, and let the platform do the rest. ~~Frameworks~~ Plain HTML and CSS go a long way.

## The budget

Before writing any code, I set a budget. Each line item has to justify itself:

| Asset      | Budget | Current | Notes                       |
| :--------- | -----: | ------: | :-------------------------- |
| HTML       |  14 KB |    6 KB | Fits in the first TCP round |
| CSS        |  10 KB |    4 KB | One fingerprinted file      |
| Fonts      |  40 KB |    0 KB | System stack for now        |
| JavaScript |   0 KB |    0 KB | None, on purpose            |

> Performance is not a feature you add at the end. It is the sum of every small decision you didn't make.
>
> > Or, put differently: every dependency is a loan, and the interest is paid by your readers.

## How the site is put together

The site is built with [Hugo](https://gohugo.io "Hugo static site generator"), which compiles everything to static files in a few milliseconds. There is no build step beyond Hugo itself, and the whole toolchain fits in one binary: https://github.com/gohugoio/hugo.

### Configuration

The config is deliberately boring:

```toml
baseURL = "https://odhyp.com/"
locale = "en-us"
title = "Odhy Pradhana"

[params]
description = "Notes on code and design"
```

### Styles

CSS is split into layers, so later layers always win regardless of selector specificity. That alone removes most `!important` hacks:

```css
@layer reset, tokens, base, layout, components, utilities;

:root {
  --font-sans: system-ui, sans-serif;
  --content-width: 65ch;
}
```

Hugo bundles and fingerprints it with `css.Build`[^1]:

[^1]: Font URLs need to be marked as `externals`, otherwise esbuild tries to resolve them on disk.

```go-html-template
{{- with resources.Get "css/main.css" | css.Build | fingerprint }}
  <link rel="stylesheet" href="{{ .RelPermalink }}" />
{{- end }}
```

### Running it locally

Two commands, and you're done:

```bash
pnpm install
pnpm dev
```

A block without a language is still rendered as code:

```
Start building sites …
Total in 14 ms
```

And so is an old-style indented block:

    $ hugo version
    hugo v0.168.0+extended

## Rules I try to follow

1. Measure first, then optimise.
2. Prefer the platform:
   - `system-ui` before a webfont
   - `<details>` before a JavaScript accordion
   - CSS `clamp()` before media-query soup
3. Delete more than you add.

Things that are explicitly **not** on this site:

- Tracking scripts
- Cookie banners
- Carousels
  - Especially auto-playing ones

### Progress

- [x] Reset and design tokens
- [x] Fluid type scale
- [x] Self-hosted font pipeline tested
- [ ] Dark mode polish
- [ ] Project pages

## A small glossary

Fingerprinting
: Adding a content hash to a filename so it can be cached forever.

FOUT
: Flash of unstyled text, the brief moment a fallback font shows before the webfont loads.

Variable font
: A single font file that contains a continuous range of weights or widths.

### Odds and ends

Typography details are handled automatically: "smart quotes", 'single quotes', en dashes for ranges like 2024--2026, em dashes---like this one---and ellipses...

Sometimes a line needs to break without starting a new paragraph.\
This sentence sits on its own line.

Literal characters can be escaped: \*not italic\*, \`not code\`, and \# not a heading.

Images work too:

![Test](anita-austvika-RfSMtI-KeMo-unsplash.jpg)

Thanks for reading. If you have thoughts, the best way to reach me is still plain old email[^2].

[^2]: No contact form, no CAPTCHA, no JavaScript.