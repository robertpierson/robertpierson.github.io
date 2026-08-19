# robertpierson.github.io

Portfolio and record. Three files, no framework, no dependencies, no build step.

```
index.html   structure and all content
styles.css   the whole design system
main.js      rail scroll tracking and the record filter
```

Live at **https://robertpierson.github.io**. Pushing to `main` deploys it.

## Sections

| Section | What it holds |
| --- | --- |
| Hero | Name, role line, positioning paragraph, four-stat strip, primary links |
| Focus | Building / Interested in / Looking for |
| Projects | Six shipped projects, newest and largest first |
| Record | Leadership, certifications, and honors in one filterable index |
| Capabilities | Six groups, only things shipped with |
| About | Four paragraphs |
| Contact | Email, LinkedIn, GitHub, availability |

## Adding to the record

Copy this block into the `<ul class="record">` in `index.html` and set
`data-type` to one of `leadership`, `certification`, `honor`, or `research`:

```html
<li class="entry" data-type="certification">
  <span class="entry-date">Mar 2026</span>
  <div class="entry-body">
    <h3 class="entry-title">Certification name</h3>
    <p class="entry-issuer">Issuing body</p>
    <p class="entry-detail">One line on what it covers.</p>
    <span class="entry-score">968 / 1000</span><a class="entry-verify" href="https://…" rel="noopener">Verify transcript</a>
  </div>
  <span class="entry-type">Certification</span>
</li>
```

`entry-issuer`, `entry-detail`, `entry-score`, and `entry-verify` are all
optional — drop any you don't have.

If there's no confirmed date, add `entry-undated` and drop the date span
entirely rather than guessing. The row drops the date column and stays aligned:

```html
<li class="entry entry-undated" data-type="leadership">
  <div class="entry-body">
    <h3 class="entry-title">Role, Organization</h3>
  </div>
  <span class="entry-type">Leadership</span>
</li>
```

The filter buttons build themselves from whatever types are actually present,
so a category never appears until there's something in it, and the bar stays
hidden while only one type exists. Nothing to wire up.

## Adding a project

Copy a `<li class="project">` block. Each has an index, a year, a role, a
description, optional outcome bullets, and chips. Renumber the indexes so they
stay sequential — they're plain text, not generated.

## Run it locally

```bash
python -m http.server 4321
```

Then open http://localhost:4321.

## Design

One theme, no toggle. Institutional and technical rather than decorative: a
sticky left index rail tracks position in the document and collapses to a
header bar under 52rem. Green is used only where it carries meaning — active
state, section labels, links, figures, chips.

- **Palette** — cream `#F6F3EC`, deep forest `#0E1F17` for text, green
  `#146B41` for anything green that has to be read, `#1E9A5C` for marks, white
  `#FFFFFF` for panels. All in the `:root` block of `styles.css`.
- **Type** — Geist for text and headings, Geist Mono for every label, date,
  figure, and chip. The monospace carrying all the data is what makes it read
  technical rather than plain.
- **Texture** — a faint engineering grid behind the hero, masked out as it
  falls. Pure CSS, no image.
- **Motion** — scroll reveals via native CSS `animation-timeline`, off under
  `prefers-reduced-motion`.
- **Print** — `Ctrl/Cmd+P` gives a clean record: rail and filters drop out, and
  filtered-away entries are forced visible so a filtered view still prints whole.

## Verified

43 text pairs pass WCAG AA, floor 4.57:1. No horizontal overflow from 375px up.
Heading order is h1 → h2 → h3 throughout. Tap targets clear 24px. Record filter
and rail position rule both tested against every section.

## Ceilings, deliberately

- Content lives in HTML. Past roughly 30 record entries or a dozen projects,
  move to a static site generator — not before.
- No sitemap or RSS. One page doesn't need a sitemap.
- Two fonts load from Google. To self-host, download the woff2 files, drop them
  beside `index.html`, and swap the `<link>` for `@font-face` rules.
