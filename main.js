// Cream / forest press toggle. The initial choice is resolved by the inline
// script in <head> so the page never flashes the wrong stock.

const root = document.documentElement;
const toggle = document.querySelector("[data-theme-toggle]");
const themeColor = document.querySelector('meta[name="theme-color"]');

const STOCK = { cream: "#F4EFE4", forest: "#0C2418" };

function paint(theme) {
  root.dataset.theme = theme;
  themeColor.content = STOCK[theme];
  toggle.setAttribute("aria-pressed", String(theme === "forest"));
  toggle.querySelector(".ink-toggle-label").textContent =
    theme === "forest" ? "Cream" : "Forest";
  toggle.setAttribute(
    "aria-label",
    theme === "forest" ? "Switch to cream stock" : "Switch to forest stock"
  );
}

paint(root.dataset.theme);

toggle.addEventListener("click", () => {
  const next = root.dataset.theme === "forest" ? "cream" : "forest";
  localStorage.setItem("press", next);
  paint(next);
});

// Follow the OS only while the visitor hasn't picked a side.
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  if (!localStorage.getItem("press")) paint(e.matches ? "forest" : "cream");
});
