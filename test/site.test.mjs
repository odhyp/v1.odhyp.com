import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
} from "node:fs";
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
    .map((f) => ({
      path: f.replaceAll("\\", "/"),
      html: readFileSync(join(out, f), "utf8"),
    }));
  assert.ok(pages.length > 0, "build produced no HTML pages");
});

after(() => rmSync(out, { recursive: true, force: true }));

const page = (path) => pages.find((p) => p.path === path)?.html;
const home = () => page("index.html");
const main = (path) => page(path).match(/<main>([\s\S]*?)<\/main>/)[1];
const read = (f) => readFileSync(join(out, f), "utf8");

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

test("writings list groups by year, newest first, on one page", () => {
  const html = page("writings/index.html");
  const years = [...html.matchAll(/<h2[^>]*>(\d{4})<\/h2>/g)].map((m) => m[1]);
  assert.deepEqual(years, ["2026", "2025"]);
  const titles = [
    ...html.matchAll(/<a href="?\/writings\/[^"> ]+"?>([^<]+)</g),
  ].map((m) => m[1]);
  assert.deepEqual(titles, [
    "Zeta",
    "Epsilon",
    "Delta",
    "Gamma",
    "Beta",
    "Alpha",
  ]);
  assert.match(html, /<time datetime="?2025-03-10"?>Mar 10, 2025<\/time>/);
  assert.ok(!pages.some((p) => p.path.startsWith("writings/page/")));
});

test("Updated shows only when lastmod falls on a different day", () => {
  assert.match(
    page("writings/delta/index.html"),
    /Updated <time datetime="?2026-05-01"?>May 1, 2026<\/time>/,
  );
  assert.doesNotMatch(page("writings/gamma/index.html"), /Updated/);
});

test("a Writing shows its title and date", () => {
  const html = page("writings/alpha/index.html");
  assert.match(html, /<h1>Alpha<\/h1>/);
  assert.match(html, /<time datetime="?2025-03-10"?>Mar 10, 2025<\/time>/);
});

test("home lists the 5 latest Writings and links to all", () => {
  const html = main("index.html");
  const titles = [
    ...html.matchAll(/<a href="?\/writings\/[^"> ]+"?>([^<]+)</g),
  ].map((m) => m[1]);
  assert.deepEqual(titles, ["Zeta", "Epsilon", "Delta", "Gamma", "Beta"]);
  assert.match(html, /<a href="?\/writings\/"?>All writings<\/a>/);
});

test("RSS feed contains only Writings", () => {
  const items = [...read("index.xml").matchAll(/<link>([^<]+)<\/link>/g)]
    .map((m) => m[1])
    .slice(1);
  assert.deepEqual(
    items,
    ["zeta", "epsilon", "delta", "gamma", "beta", "alpha"].map(
      (s) => `https://odhyp.com/writings/${s}/`,
    ),
  );
});

test("drafts and future Writings are absent from output", () => {
  for (const slug of ["draft", "future"])
    assert.ok(!existsSync(join(out, "writings", slug)), slug);
  for (const f of [
    "index.xml",
    "sitemap.xml",
    "writings/index.html",
    "index.html",
  ])
    assert.doesNotMatch(
      read(f),
      /Draft Writing|Future Writing|\/(draft|future)\//,
      f,
    );
});

test("sitemap and robots.txt exist; no JSON output", () => {
  assert.match(
    read("sitemap.xml"),
    /<loc>https:\/\/odhyp\.com\/writings\/alpha\/<\/loc>/,
  );
  assert.match(read("robots.txt"), /User-agent: \*/);
  assert.ok(
    !readdirSync(out, { recursive: true }).some((f) => f.endsWith(".json")),
  );
});

test("an undated page shows no date", () => {
  assert.doesNotMatch(page("about/index.html"), /0001/);
});

test("Topics page lists every Topic with its Writing count", () => {
  const topics = [
    ...main("topics/index.html").matchAll(
      /<a href="?\/topics\/([^"> /]+)\/"?>[^<]+<\/a>\s*\((\d+)\)/g,
    ),
  ].map((m) => [m[1], Number(m[2])]);
  assert.deepEqual(topics, [
    ["hugo", 3],
    ["go", 2],
    ["web", 1],
  ]);
});

test("a Topic page lists that Topic's Writings", () => {
  const titles = (path) =>
    [...main(path).matchAll(/<a href="?\/writings\/[^"> ]+"?>([^<]+)</g)].map(
      (m) => m[1],
    );
  assert.deepEqual(titles("topics/hugo/index.html"), [
    "Gamma",
    "Beta",
    "Alpha",
  ]);
  assert.deepEqual(titles("topics/go/index.html"), ["Gamma", "Alpha"]);
  assert.deepEqual(titles("topics/web/index.html"), ["Alpha"]);
});

test("Writings link their Topics on the single view and the list", () => {
  const links =
    /<a href="?\/topics\/hugo\/"?>Hugo<\/a>[\s\S]*<a href="?\/topics\/go\/"?>Go<\/a>[\s\S]*<a href="?\/topics\/web\/"?>Web<\/a>/;
  assert.match(page("writings/alpha/index.html"), links);
  const list = page("writings/index.html");
  const alpha = list.slice(list.lastIndexOf("<li>", list.indexOf(">Alpha<")));
  assert.match(alpha, links);
});

test("Writings page links to Topics at the top", () => {
  const html = main("writings/index.html");
  const topics = html.search(/<a href="?\/topics\/"?>Topics<\/a>/);
  assert.ok(topics >= 0, "no Topics link");
  assert.ok(topics < html.search(/<h2/), "Topics link is not above the list");
});

test("only the topics taxonomy exists", () => {
  for (const dir of ["tags", "categories"])
    assert.ok(!existsSync(join(out, dir)), dir);
});
