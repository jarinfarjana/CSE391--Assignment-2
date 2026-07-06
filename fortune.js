/* ===================================================================
   fortune.js
   Picks a random fortune on load and lets four buttons cycle through
   preset looks for the fortune box (font color, background, border,
   font size/family). Each button just steps to the next option in
   its own small array — nothing random happens on click, only on load.
   =================================================================== */

// 1) Fortune Messages -------------------------------------------------
const fortunes = [
  "True wisdom comes not from knowledge, but from understanding.",
  "A small step taken today saves a giant leap tomorrow.",
  "Patience is a browser tab you forgot to close, still loading quietly.",
  "Coffee is not a personality, but it helps the personality function.",
  "Simplicity is the last step before you're actually done.",
  "A life well lived is measured by meaning, not milestones.",
  "Growth is the quiet victory no one else can see.",
  "The soul finds peace when purpose is greater than pride.",
  "Your character is the story your actions write.",
  "Live in a way that your absence leaves gratitude, not regret.",
  "Choose purpose over comfort.",
  "Grow through what you go through.",
  "Be the peace you seek.",
  "Kindness outlives success.",
  "Live simply. Love deeply. Leave kindly."
];

// 1b) Dark text colors — one is picked at random alongside the fortune
//     itself, so the message text varies in shade each time. This is
//     separate from the 4 swatch theme colors, which stay untouched.
const fortuneTextColors = [
  "#1A1A1A", // near-black
  "#2F1B0C", // dark espresso
  "#1C2541", // deep navy
  "#3B0918", // dark maroon
  "#0D2818", // deep forest green
  "#241571", // deep indigo
  "#4A0E0E", // dark brick red
  "#062925"  // dark teal-black
];

// 2) Random Selection ---------------------------------------------------
const fortuneTextEl = document.getElementById("fortune-text");
const fortuneBoxEl = document.getElementById("fortune-box");

function showRandomFortune() {
  const index = Math.floor(Math.random() * fortunes.length);
  fortuneTextEl.textContent = fortunes[index];

  const colorIndex = Math.floor(Math.random() * fortuneTextColors.length);
  fortuneTextEl.style.color = fortuneTextColors[colorIndex];
}

showRandomFortune(); // run once on page load

// 3) Styling & Interactivity ---------------------------------------------
// Each button applies a complete look to the box: background, a font
// color chosen for contrast, and a border color that stays visible.

const themes = {
  white:   { bg: "#FFFFFF", font: "#1A1A1A", border: "#2F1B0C" },
  orange:  { bg: "#E8792C", font: "#3B0918", border: "#4A0E0E" },
  skyblue: { bg: "#6EC1E4", font: "#1C2541", border: "#0D2818" },
  black:   { bg: "#1A1A1A", font: "#FFFFFF", border: "#241571" }
};

function applyTheme(theme) {
  fortuneBoxEl.style.background = theme.bg;
  fortuneBoxEl.style.borderColor = theme.border;
  fortuneTextEl.style.color = theme.font;
}

document.getElementById("btn-white").addEventListener("click", () => applyTheme(themes.white));
document.getElementById("btn-orange").addEventListener("click", () => applyTheme(themes.orange));
document.getElementById("btn-skyblue").addEventListener("click", () => applyTheme(themes.skyblue));
document.getElementById("btn-black").addEventListener("click", () => applyTheme(themes.black));

// 4) Footer: last modified date -------------------------------------------
document.getElementById("last-modified").textContent = `Last modified: ${document.lastModified}`;