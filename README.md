# robertpierson.github.io

Portfolio and record. Three files, no framework, no dependencies, no build step.

```
index.html   structure and all content
styles.css   the whole design system
main.js      stock toggle, rail scroll position, record filter
```

Live at **https://robertpierson.github.io**. Pushing to `main` deploys it.

## Adding to the record

The Record section is one index of research, certifications, honors, and
leadership. Copy this block into the `<ul class="record">` in `index.html` and
set `data-type` to one of `research`, `certification`, `honor`, or `leadership`:

```html
<li class="entry" data-type="certification">
  <span class="entry-date">Mar 2026</span>
  <div class="entry-body">
    <h3 class="entry-title">AWS Certified Cloud Practitioner</h3>
    <p class="entry-issuer">Amazon Web Services</p>
    <p class="entry-detail">Credential ID ABC123. Cloud architecture, security, and billing models.</p>
  </div>
  <span class="entry-type">Certification</span>
</li>
```

The filter buttons build themselves from whatever types are actually present,
so a category never shows up until there's something in it, and the bar stays
hidden entirely while there's only one type. Nothing to wire up — add the entry
and the filter appears.

Keep entries newest-first. `entry-detail` is optional; drop the tag if there's
nothing worth adding.

If you don't have a confirmed date, add `entry-undated` and drop the date span
entirely rather than guessing one — the row drops the date column and stays
aligned:

```html
<li class="entry entry-undated" data-type="certification">
  <div class="entry-body">
    <h3 class="entry-title">Fundamentals of Digital Marketing</h3>
    <p class="entry-issuer">Google Digital Garage</p>
  </div>
  <span class="entry-type">Certification</span>
</li>
```

## Everything else worth editing

All in `index.html`, top to bottom:

- **`<title>` and `<meta name="description">`** — what Google and link previews show.
- **Hero** — the kicker date, the one-paragraph positioning line, and the four
  vitals (status, focus, shipped, contact). Update the date when you update the page.
- **Focus** — three cards: building, learning, looking for. Keep them specific;
  vague entries are worse than no section.
- **Ventures** — one `<li class="venture">` per product. Each has an index, a
  year, a role, a description, up to three outcome bullets, and chips.
- **Capabilities** — four groups. Only list things you've shipped with.
- **About** — the lede plus three paragraphs, and the at-a-glance figures.
- **JSON-LD block in `<head>`** — name, url, job title, `sameAs` links.

## Run it locally

```bash
python -m http.server 4321
```

Then open http://localhost:4321.

## Design

Institutional rather than decorative. A persistent index rail on the left tracks
where you are in the document; on narrow screens it collapses to a sticky header.
Green is used only where it carries meaning — active state, section labels,
links, the numbering — never as decoration.

- **Stock and ink** — cream `#F7F4ED`, deep forest `#0F2419` for text, green
  `#1A6B42` for anything green that has to be read, `#23935B` for rules and
  marks, white `#FFFFFF` for panels. A forest variant inverts onto `#0B1F15`.
  All of it is in the `:root` block of `styles.css`.
- **Type** — Fraunces for display, Archivo for text, your system monospace for
  dates, labels, and figures.
- **The one flourish** — the name in the hero prints as two ink passes slightly
  out of register, and pulls into register on load. That's the only decoration
  on the page.
- **Motion** — the register animation and scroll reveals via native CSS
  `animation-timeline`. All of it is off under `prefers-reduced-motion`.
- **Print** — `Ctrl/Cmd+P` gives a clean one-page record: rail, filters, and
  buttons drop out, and hidden entries are forced visible so a filtered view
  still prints in full.

## Verified

Both stocks pass WCAG AA on every text pair (cream floor 4.61:1, forest 4.54:1).
No horizontal overflow from 375px up. Heading order is h1 → h2 → h3 throughout.
Tap targets clear 24px.

## Ceilings, deliberately

- Content lives in HTML. Past roughly 30 record entries or a dozen ventures,
  move to a static site generator — not before.
- No sitemap or RSS. One page doesn't need a sitemap.
- Two fonts load from Google. To self-host, download the woff2 files, drop them
  beside `index.html`, and swap the `<link>` for `@font-face` rules.
