import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

// Checks the actual production HTML, rather than duplicating the metadata helper.
const pages = ["/", "/about", "/projects", "/services", "/contact"];
const titles = new Set();
const descriptions = new Set();
const canonicals = [];
let indexable;

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]]));
}

for (const route of pages) {
  const html = fs.readFileSync(path.join(".next/server/app", route === "/" ? "index.html" : `${route.slice(1)}.html`), "utf8");
  const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1];
  assert(head, `${route}: missing server-rendered head`);
  const title = head.match(/<title>([^<]+)<\/title>/)?.[1];
  const metas = [...head.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attributes(tag));
  const meta = (name) => metas.find((item) => item.name === name || item.property === name)?.content;
  const canonicalTags = [...head.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag)).filter((item) => item.rel === "canonical");
  assert.equal(canonicalTags.length, 1, `${route}: exactly one canonical required`);
  const canonical = canonicalTags[0].href;
  assert.equal(new URL(canonical).pathname, route, `${route}: wrong canonical path`);
  assert(!new URL(canonical).search && !new URL(canonical).hash, `${route}: canonical has query or fragment`);
  assert(title && !titles.has(title), `${route}: missing or duplicate title`);
  assert(meta("description") && !descriptions.has(meta("description")), `${route}: missing or duplicate description`);
  assert.equal(meta("og:title"), title, `${route}: social title mismatch`);
  assert.equal(meta("og:description"), meta("description"), `${route}: social description mismatch`);
  assert.equal(meta("og:url"), canonical, `${route}: social URL mismatch`);
  assert.equal(meta("og:type"), "website", `${route}: wrong Open Graph type`);
  assert.equal(meta("twitter:card"), "summary_large_image", `${route}: missing Twitter card`);
  assert.equal(meta("twitter:title"), title, `${route}: Twitter title mismatch`);
  assert.equal(meta("twitter:description"), meta("description"), `${route}: Twitter description mismatch`);
  for (const key of ["og:image", "twitter:image"]) {
    const image = new URL(meta(key));
    assert(fs.existsSync(path.join("public", image.pathname)), `${route}: missing social image`);
  }
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: exactly one H1 required`);
  if (route === "/") {
    assert(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1].includes("Maaz Ur Rehman"), "Homepage name must be present in H1 before JavaScript runs");
    const graphs = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
    assert.equal(graphs.length, 1, "Homepage needs one non-conflicting JSON-LD graph");
    const entities = graphs[0]["@graph"];
    for (const type of ["Person", "WebSite", "ProfilePage"]) assert(entities.some((entity) => entity["@type"] === type), `Missing ${type} entity`);
    const person = entities.find((entity) => entity["@type"] === "Person");
    assert.equal(person.name, "Maaz Ur Rehman");
    assert.equal(person.jobTitle, "Full Stack Developer");
    assert.equal(entities.find((entity) => entity["@type"] === "ProfilePage").mainEntity["@id"], person["@id"]);
  }
  const pageIndexable = !meta("robots")?.includes("noindex");
  if (indexable === undefined) indexable = pageIndexable;
  assert.equal(pageIndexable, indexable, `${route}: inconsistent indexing configuration`);
  for (const [, tag] of html.matchAll(/(<a\b[^>]*>)/g)) {
    const href = attributes(tag).href;
    if (href?.startsWith("/") && !href.startsWith("//")) {
      const pathname = new URL(href, canonical).pathname;
      assert(pages.includes(pathname) || fs.existsSync(path.join("public", pathname)), `${route}: unresolved internal link ${href}`);
    }
  }
  titles.add(title); descriptions.add(meta("description")); canonicals.push(canonical);
}

assert.equal(new Set(canonicals.map((url) => new URL(url).origin)).size, 1, "Canonicals must use one origin");
const sitemap = fs.readFileSync(".next/server/app/sitemap.xml.body", "utf8");
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual(locations.sort(), indexable ? [...canonicals].sort() : [], "Sitemap must match indexable canonical pages");
const robots = fs.readFileSync(".next/server/app/robots.txt.body", "utf8");
assert(robots.includes("Allow: /") && robots.includes("Disallow: /api/"), "Public crawling/API exclusion missing");
assert(!/^Disallow: \/$/m.test(robots), "Public portfolio must not be blocked");
if (indexable) assert(robots.includes(`Sitemap: ${new URL(canonicals[0]).origin}/sitemap.xml`), "Sitemap reference missing");
console.log(`SEO audit passed for ${pages.length} pages: unique metadata, canonical/social URLs, images, static H1, JSON-LD, internal links, sitemap, and robots.`);
if (!indexable) console.log("This build is intentionally noindex. Configure SITE_URL and enable production indexing, then rebuild before submitting to Google.");
