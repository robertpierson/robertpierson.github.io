// Three small behaviours: the stock toggle, the rail's scroll position, and
// the record filter. The initial theme is resolved by the inline script in
// <head> so the page never flashes the wrong stock.

/* ── Cream / forest stock ─────────────────────────────────────────────── */

const root = document.documentElement;
const toggle = document.querySelector("[data-theme-toggle]");
const themeColor = document.querySelector('meta[name="theme-color"]');
const STOCK = { cream: "#F7F4ED", forest: "#0B1F15" };

function paint(theme) {
  root.dataset.theme = theme;
  themeColor.content = STOCK[theme];
  toggle.setAttribute("aria-pressed", String(theme === "forest"));
  toggle.querySelector(".stock-label").textContent = theme === "forest" ? "Cream" : "Forest";
  toggle.setAttribute("aria-label", theme === "forest" ? "Switch to cream" : "Switch to forest");
}

paint(root.dataset.theme);

toggle.addEventListener("click", () => {
  const next = root.dataset.theme === "forest" ? "cream" : "forest";
  localStorage.setItem("stock", next);
  paint(next);
});

matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  if (!localStorage.getItem("stock")) paint(e.matches ? "forest" : "cream");
});

/* ── Rail: mark the section you're reading ────────────────────────────── */

const spyLinks = [...document.querySelectorAll("[data-spy]")];
const spied = spyLinks
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

if (spied.length) {
  // The last section whose top has crossed a line a third of the way down the
  // viewport is the one you're reading. An observer band was tried first and
  // left short sections — the last one especially — never lighting up at all.
  const LINE = 0.33;

  const mark = () => {
    const line = window.innerHeight * LINE;
    const atBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

    let active = atBottom ? spied[spied.length - 1] : null;
    if (!active) {
      for (const section of spied) {
        if (section.getBoundingClientRect().top <= line) active = section;
      }
    }

    spyLinks.forEach((a) => {
      if (active && a.getAttribute("href") === `#${active.id}`) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  };

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      mark();
    });
  };

  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", schedule, { passive: true });
  mark();
}

/* ── Record filter ────────────────────────────────────────────────────── */

const record = document.querySelector("[data-record]");
const filterBar = document.querySelector("[data-filters]");

// Display order and plural label for each type. Anything not listed still
// works — it just sorts last under a capitalised version of its own name.
const TYPES = [
  ["research", "Research"],
  ["certification", "Certifications"],
  ["honor", "Honors"],
  ["leadership", "Leadership"],
];

if (record && filterBar) {
  const entries = [...record.querySelectorAll(".entry")];
  const present = new Set(entries.map((e) => e.dataset.type));

  const label = (type) =>
    TYPES.find(([t]) => t === type)?.[1] ?? type.charAt(0).toUpperCase() + type.slice(1);

  const order = [...present].sort(
    (a, b) => (TYPES.findIndex(([t]) => t === a) + 1 || 99) - (TYPES.findIndex(([t]) => t === b) + 1 || 99)
  );

  // One category isn't a filter, it's just a list.
  if (order.length > 1) {
    filterBar.hidden = false;

    const make = (type, text, on) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = on ? "filter is-on" : "filter";
      b.dataset.filter = type;
      b.textContent = text;
      b.setAttribute("aria-pressed", String(on));
      filterBar.append(b);
      return b;
    };

    const buttons = [make("all", "All", true), ...order.map((t) => make(t, label(t), false))];

    filterBar.addEventListener("click", (event) => {
      const button = event.target.closest(".filter");
      if (!button) return;

      buttons.forEach((b) => {
        const on = b === button;
        b.classList.toggle("is-on", on);
        b.setAttribute("aria-pressed", String(on));
      });

      const want = button.dataset.filter;
      entries.forEach((entry) => {
        entry.hidden = want !== "all" && entry.dataset.type !== want;
      });
    });
  }
}
