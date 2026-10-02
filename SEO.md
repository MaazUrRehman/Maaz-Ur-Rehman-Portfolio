# SEO configuration and deployment

## Files changed for SEO

- Added `src/lib/seo.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/projects/layout.tsx`, `.env.example`, `scripts/seo-audit.mjs`, and this report.
- Updated `src/app/layout.tsx` and all five public `page.tsx` files.
- Updated `src/components/Services/ServicesGrid.tsx` and `src/components/About/ProfessionalRoles.tsx` for heading semantics.
- Updated `src/app/globals.css` and `src/app/page-styles.css` only to preserve styling when heading tags changed.
- No dependencies were added. Existing working-tree changes were retained.
- Added optional Google/Bing verification metadata, explicit staging indexing controls, and Vercel preview noindex behavior. `.gitignore` permits committing the blank `.env.example`; no secrets are included.
- The homepage H1 now contains a static accessible copy of the exact animated name. The animated spans are hidden from assistive technology to avoid repeated announcements; their appearance and timing remain unchanged. This is an accessibility equivalent of the same visible heading, not additional hidden keywords.
- Services metadata naturally connects full stack development in Karachi with the Laravel, React, Next.js, and Node.js skills represented on the site.
- `package.json` adds `npm run seo:check` for repeatable checks of built HTML and crawler files.

## Validation

`npm run build` passed, including TypeScript checking and static generation of all public pages, sitemap, and robots. `npm run lint` passed with two pre-existing warnings: unused `AboutSkills` import and a `HomeHero` effect dependency. Those unrelated components were left as they were.

After the follow-up improvements, build/TypeScript and lint passed again, and `npm run seo:check` passed against all five generated pages, including the static homepage name and the three linked JSON-LD entities. This workspace still has no supplied production `SITE_URL`, so the current build intentionally emits noindex and an empty sitemap. Verification tokens and live production checks remain pending owner configuration.

A temporary audit passed for all five unique titles/descriptions, production-configured canonical/social URLs, the existing social image, the five-entry sitemap, robots sitemap reference, JSON-LD serialization, and local noindex behavior. Generated HTML for each public page contains exactly one H1 and one canonical link. The temporary audit used a reserved example domain only in its process environment; no domain was stored in project configuration. The generated local robots and sitemap files were also inspected. Production HTTP accessibility and visual browser verification remain deployment checks.

## Deployment configuration

Set `SITE_URL` in the deployment environment **before building** to the final public origin, for example `https://your-owned-domain.tld`. Use the preferred HTTPS hostname without a path, query, fragment, or credentials. Do not use a preview deployment URL. Rebuild after changing it.

No production domain was present in the project. Without `SITE_URL`, local development uses `http://localhost:3000`, pages are marked `noindex,follow`, and the sitemap is empty. A configured localhost also remains non-indexable. Production indexing therefore requires setting the real domain; no placeholder domain is published as a production canonical.

Five public routes are included: `/`, `/about`, `/projects`, `/services`, `/contact`. Each has unique server-rendered title, description, self-canonical, Open Graph metadata, and Twitter large-image card metadata. The existing homepage portrait supplies social previews. Projects metadata lives in a server layout to preserve the interactive client page; the contact provider remains unchanged.

`/sitemap.xml` lists only these canonical public pages. `/robots.txt` allows public crawling, excludes `/api/`, and references the sitemap when the production URL is configured. Robots directives are not access controls. There are no existing private/admin/auth pages to include or alter. No fabricated modification dates are emitted.

The homepage contains one JSON-LD graph with Person, WebSite, and ProfilePage entities. The profile's mainEntity references the same Person ID. Name, profession, Karachi location, skills, portrait, and existing social profile links come from the portfolio; the generic GitHub homepage is not asserted as a personal profile. No fabricated reviews, employment, ratings, or modification dates are added.

Heading fixes preserve presentation: the services title becomes H1 and service cards H2, professional role cards become H3 under their H2 section, and a visually hidden project section H2 precedes project H3 cards. CSS selector changes retain the original styles for the changed tags. Existing descriptive image alternatives and navigation anchors are preserved.

After deploying:

- Verify each page's canonical and social URLs use the final HTTPS origin and public pages no longer have `noindex`.
- Fetch `/sitemap.xml` and `/robots.txt` on the production domain and submit the sitemap in Google Search Console and Bing Webmaster Tools.
- Validate the homepage JSON-LD in Schema.org's validator and test social previews.
- Configure hosting redirects from alternate hostnames and HTTP to the chosen HTTPS origin. Existing route behavior was preserved; canonical tags consolidate query variants and Next.js retains its default trailing-slash handling.

Existing content follow-ups requiring owner input: the projects CTA links to the generic `https://github.com/` homepage; supply your personal profile before changing that navigation. The contact page labels its details as placeholders, despite matching portfolio data. Neither was rewritten as part of this SEO-only change.

## Search Console and indexing

1. Set `SITE_URL` to your final public HTTPS origin. `.env.example` lists SEO settings only; preserve your existing contact/reCAPTCHA settings. Set these variables on the hosting platform before building.
2. Leave `SEO_INDEXABLE` blank or set it to `true` for production. Set it to `false` for staging. A Vercel `preview` environment always remains noindex, even when it has the canonical production `SITE_URL`. Do not block these preview pages in robots.txt while relying on their noindex tags: crawlers need to read those tags.
3. In Google Search Console, create either a Domain property (verify via your domain's DNS TXT record) or a URL-prefix property matching `SITE_URL`. For HTML verification of a URL-prefix property, set `GOOGLE_SITE_VERIFICATION` to the tag's **content value only**, rebuild, and click Verify after deployment. The token remains in the server-rendered head on all routes. It is optional when using DNS verification. `BING_SITE_VERIFICATION` provides the equivalent Bing meta tag.
4. Run `npm run build`, then `npm run seo:check`. The audit checks actual built HTML for unique titles/descriptions, canonical/social URLs, existing social images, one H1 per page, the static homepage name, linked schema entities, internal navigation, sitemap membership, and robots crawl rules. An intentionally noindex build prints an explicit notice.
5. Deploy and check `<SITE_URL>/sitemap.xml` and `<SITE_URL>/robots.txt` return successful public HTTP responses. Confirm the sitemap has exactly five URLs and homepage source has no `noindex` before submission. Inspect your homepage and important pages with Search Console's URL Inspection live test, then request indexing where needed and submit `sitemap.xml`.
6. Monitor Page indexing, Core Web Vitals, and Performance reports after Google has collected data. Track name-based queries separately from competitive technology/location queries. Search Console access, DNS changes, hosting redirects, and sitemap submission require the owner's account; they have not been performed from this workspace.

Google references: [verification methods](https://support.google.com/webmasters/answer/9008080?hl=en), [developer SEO guidance](https://developers.google.com/search/docs/fundamentals/get-started-developers), and [ProfilePage guidance](https://developers.google.com/search/docs/appearance/structured-data/profile-page).

## Future SEO work

The homepage prioritizes your personal identity and full stack developer role in Karachi; About supplies professional/skills context, Projects supports evidence of your work, Services targets development services, and Contact supports enquiries. The existing visible skills and project content provide the technology context; no keyword-list meta tag or repeated hidden keyword text is needed.

Improve relevance over time with accurate, original project case studies describing the problem, your role, implementation, and verifiable results. Add dedicated service or project routes only when they have substantial unique content and are part of an approved website change; avoid near-identical city/technology doorway pages. Update your verified professional profiles to link to the canonical portfolio. Use genuine professional mentions and links rather than purchased links or fabricated reviews.

Ranking and rich-result appearance are not guaranteed by metadata or structured data. Live indexing, content quality, reputation, competition, and performance must be assessed after deployment. No visual redesign, contact API changes, analytics/tracking scripts, or new dependencies were introduced.
