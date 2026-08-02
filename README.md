# Personal site

Three files. No build step, no dependencies, no framework. Open `index.html`
in a browser and it works.

```
index.html   all the content
styles.css   all the design
main.js      the ink/paper theme toggle, and nothing else
```

## Make it yours

Search `index.html` for `[EDIT]`. Every spot that needs your details is marked.
In priority order:

1. **`<title>` and `<meta name="description">`** — this is what Google and
   link previews show. Write it for a stranger, not for you.
2. **The thesis line in the hero** — one honest sentence: what you do, and what
   you want next. If it could be on anyone's site, rewrite it.
3. **The Now block** — three specific, dated lines. Update it when it changes;
   a stale Now block is worse than no Now block. Bump the date in the eyebrow
   at the same time.
4. **Selected work** — duplicate a `<li class="work-item">` per project. Lead
   with what it does and one real number. Four projects is plenty.
5. **Also shipped** — the smaller public repos. If you start writing, the same
   list works for posts: swap the links and rename the heading.
6. **About + facts list** — your links, your availability.
7. **`<link rel="canonical">` and the `og:url` metas** — your real domain.
8. **The JSON-LD block** — name, url, `sameAs` profile links.

## Run it locally

```bash
npx --yes serve .
```

Any static server works. So does double-clicking `index.html`.

## Put it online

Drag the folder onto [app.netlify.com/drop](https://app.netlify.com/drop) — it
is live in about ten seconds, no account required to start.

Or, for a permanent home on GitHub Pages:

```bash
git init && git add -A && git commit -m "Personal site"
```

Push to a repo named `<yourusername>.github.io`, then turn on Pages in the
repo settings. Cloudflare Pages and Vercel also take this folder as-is.

## Design notes

The concept is a two-colour press: green ink on cream stock, laid down in
separate passes that never line up perfectly. That misregistration is the
signature — the name in the hero is printed twice, offset, and pulls into
register on load. Project titles drift back out of register on hover. White is
the third element: the panels and cards the ink sits on top of.

- **Stock and inks** — cream `#F4EFE4`, deep forest `#10281B` for text, riso
  green `#1E9A5C` for the offset layer and rules, `#15693F` for green that has
  to work as small text, white `#FFFFFF` for panels. Swap them in the `:root`
  block of `styles.css`; both themes are defined there and everything else
  follows.
- **Type** — Bricolage Grotesque for display, Newsreader for body, your system
  monospace for labels and data.
- **Grain** — a generated SVG noise layer, not an image. Costs one element.
- **Motion** — the load sequence, hover misregistration, and scroll reveals via
  native CSS `animation-timeline`. All of it is off under
  `prefers-reduced-motion`.
- **Registration marks** (⊕) label each section. Printers use them to line the
  ink passes up, which is the only reason they are there.

## Ceilings, deliberately

- Content lives in HTML. Past roughly a dozen projects or posts you want a
  static site generator — not before.
- No sitemap or RSS. One page doesn't need a sitemap; add RSS when you have a
  real blog and it lives on its own pages.
- Two web fonts load from Google. To go fully self-hosted, download the woff2
  files, drop them next to `index.html`, and swap the `<link>` for
  `@font-face` rules.
