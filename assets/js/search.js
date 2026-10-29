// Pagefind's index exists only after `pnpm build`; `pnpm dev` has no search.
const pagefind = await import("/pagefind/pagefind.js");
const input = document.getElementById("q");
const list = document.getElementById("results");

async function run() {
  const search = await pagefind.debouncedSearch(input.value);
  // null means a newer keystroke superseded this search
  if (search === null) return;
  const results = await Promise.all(search.results.map((r) => r.data()));
  list.replaceChildren(
    ...results.map(({ url, meta }) => {
      const a = document.createElement("a");
      a.href = url;
      a.textContent = meta.title;
      const li = document.createElement("li");
      li.append(a);
      return li;
    }),
  );
}

input.form.addEventListener("submit", (e) => e.preventDefault());
input.addEventListener("input", run);
// Run a query passed in the URL, e.g. a shared /search/?q= link
input.value = new URLSearchParams(location.search).get("q") ?? "";
if (input.value) run();
