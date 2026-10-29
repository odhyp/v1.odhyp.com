import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, before, test } from "node:test";
import assert from "node:assert/strict";

let out;
let pages;

before(() => {
  out = mkdtempSync(join(tmpdir(), "odhyp-test-"));
  execFileSync(
    "hugo",
    [
      "--contentDir",
      "test/fixtures/content",
      "--destination",
      out,
      "--minify",
      "--quiet",
    ],
    { stdio: "inherit" },
  );
  pages = readdirSync(out, { recursive: true })
    .filter((f) => f.endsWith(".html"))
    .map((f) => ({ path: f, html: readFileSync(join(out, f), "utf8") }));
  assert.ok(pages.length > 0, "build produced no HTML pages");
});

after(() => rmSync(out, { recursive: true, force: true }));

const home = () => pages.find((p) => p.path === "index.html").html;

test("header nav is exactly Writings, Projects, Now, About", () => {
  for (const { path, html } of pages) {
    const nav = html.match(/<header>[\s\S]*?<nav>([\s\S]*?)<\/nav>/)?.[1] ?? "";
    const names = [...nav.matchAll(/<a\s[^>]*>\s*([^<]*?)\s*<\/a\s*>/g)].map(
      (m) => m[1],
    );
    assert.deepEqual(names, ["Writings", "Projects", "Now", "About"], path);
  }
});

test("each page has exactly one fingerprinted stylesheet with integrity", () => {
  for (const { path, html } of pages) {
    const links = html.match(/<link\s[^>]*rel="?stylesheet"?[^>]*>/g) ?? [];
    assert.equal(links.length, 1, path);
    assert.match(links[0], /href="?\/css\/main\.[0-9a-f]{64}\.css"?/, path);
    assert.match(links[0], /integrity="?sha256-/, path);
  }
});

test("no page has a script tag", () => {
  for (const { path, html } of pages)
    assert.doesNotMatch(html, /<script/i, path);
});

test("footer has copyright range, GitHub, RSS and back-to-top links", () => {
  for (const { path, html } of pages) {
    const footer = html.match(/<footer>([\s\S]*?)<\/footer>/)?.[1] ?? "";
    assert.match(
      footer,
      new RegExp(`2020&ndash;${new Date().getFullYear()}`),
      path,
    );
    assert.match(footer, /href="?https:\/\/github\.com\/odhyp"?>GitHub</, path);
    assert.match(footer, /href="?\/index\.xml"?>RSS</, path);
    assert.match(footer, /href="?#top"?>/, path);
    assert.match(html, /<body id="?top"?/, path);
  }
});

test("home shows the intro from its content file", () => {
  assert.match(home(), /<main>[\s\S]*Fixture intro\.[\s\S]*<\/main>/);
});

test("pages carry OpenGraph meta", () => {
  for (const { path, html } of pages) {
    assert.match(html, /<meta property="?og:title"?/, path);
    assert.match(html, /<meta property="?og:url"?/, path);
  }
});
