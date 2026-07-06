/* ===================================================================
   stopwatch.js
   Counts up in steps of 3 seconds, stopping automatically at 30.
   Stop just pauses the interval (elapsed time is kept), so pressing
   Start again resumes from the same number instead of restarting.
   =================================================================== */

const LIMIT = 30;   // stop automatically once we reach this
const STEP = 3;     // count in steps of 3 seconds
const TICK_MS = 1000; // real milliseconds between each step

let elapsed = 0;
let intervalId = null;
let isRunning = false;

const timeDisplay = document.getElementById("time-display");
const progressFill = document.getElementById("progress-fill");
const statusNote = document.getElementById("status-note");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");

function render() {
 const minutes = Math.floor(elapsed / 60).toString().padStart(2, "0");
const seconds = (elapsed % 60).toString().padStart(2, "0");
timeDisplay.textContent = `${minutes}:${seconds} sec`;
  progressFill.style.width = `${(elapsed / LIMIT) * 100}%`;
}

function updateButtons() {
  const finished = elapsed >= LIMIT;
  startBtn.disabled = isRunning || finished;
  stopBtn.disabled = !isRunning;
}

function tick() {
  elapsed += STEP;
  render();

  if (elapsed >= LIMIT) {
    clearInterval(intervalId);
    intervalId = null;
    isRunning = false;
    statusNote.textContent = "Hit 30 seconds — press Reset to run it again.";
    updateButtons();
  }
}

startBtn.addEventListener("click", () => {
  if (isRunning || elapsed >= LIMIT) return;
  isRunning = true;
  statusNote.textContent = "Counting...";
  intervalId = setInterval(tick, TICK_MS);
  updateButtons();
});

stopBtn.addEventListener("click", () => {
  if (!isRunning) return;
  clearInterval(intervalId);
  intervalId = null;
  isRunning = false;
  statusNote.textContent = "Paused. Press Start to pick up from here.";
  updateButtons();
});

resetBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
  isRunning = false;
  elapsed = 0;
  statusNote.textContent = "Ready when you are.";
  render();
  updateButtons();
});

render();
updateButtons();

// Footer: last modified date -----------------------------------------------
document.getElementById("last-modified").textContent = `Last modified: ${document.lastModified}`;