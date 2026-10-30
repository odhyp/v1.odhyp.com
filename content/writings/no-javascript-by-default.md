+++
date = "2026-10-22T20:00:00+07:00"
title = "No JavaScript by Default"
topics = ["web", "css"]
+++

Almost every page on this site ships zero JavaScript. The tests check this: any page except Search that loads a script fails the build.

Things that usually need a script are done without one:

- The back-to-top link in the footer is a plain anchor.
- Light and dark mode follow the operating system through `color-scheme` and `light-dark()`.
- The header wraps on narrow screens with CSS alone.

Search is the one exception, and that script loads only on the Search page.