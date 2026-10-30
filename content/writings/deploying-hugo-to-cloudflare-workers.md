+++
date = "2026-10-27T20:00:00+07:00"
title = "Deploying Hugo to Cloudflare Workers"
topics = ["hugo", "cloudflare"]
+++

The site is served by Cloudflare Workers as static assets, following Hugo's "Host on Cloudflare" guide.

A build script pins the Hugo version and fetches the full Git history, so each page's last-modified date comes from Git. It installs dependencies with Corepack and pnpm, then runs the same `pnpm build` I run locally.

The Wrangler config points at the output folder and serves the 404 page for unknown URLs.