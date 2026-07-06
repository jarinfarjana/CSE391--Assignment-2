/* ===================================================================
   todo.js
   Add / complete / delete tasks. Tasks live in an array of objects
   { id, text, completed } which we mirror to localStorage on every
   change, so the list survives a refresh or closing the tab.
   =================================================================== */
 
const STORAGE_KEY = "jfj-todo-tasks";
 
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const listEl = document.getElementById("todo-list");
const metaEl = document.getElementById("todo-meta");
 
// 4) Persistent Data Storage ---------------------------------------------
function loadTasks() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("Couldn't read saved tasks, starting fresh.", err);
    return [];
  }
}
 
function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
 
let tasks = loadTasks();
 
// 2) Displaying Tasks -----------------------------------------------------
function render() {
  listEl.innerHTML = "";
 
  if (tasks.length === 0) {
    const empty = document.createElement("li");
    empty.className = "todo-empty";
    empty.textContent = "Nothing here yet — add your first task above.";
    listEl.appendChild(empty);
  } else {
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = "todo-item" + (task.completed ? " completed" : "");
      li.dataset.id = task.id;
 
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.setAttribute("aria-label", `Mark "${task.text}" as complete`);
      checkbox.addEventListener("change", () => toggleTask(task.id));
 
      const span = document.createElement("span");
      span.textContent = task.text;
 
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "todo-delete";
      deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`;
      deleteBtn.setAttribute("aria-label", `Delete "${task.text}"`);
      deleteBtn.addEventListener("click", () => deleteTask(task.id));
 
      li.append(checkbox, span, deleteBtn);
      listEl.appendChild(li);
    });
  }
 
  const doneCount = tasks.filter((t) => t.completed).length;
  metaEl.textContent = tasks.length
    ? `${doneCount} of ${tasks.length} done`
    : "";
}
 
// 1) Adding Tasks -----------------------------------------------------------
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
 
  tasks.push({
    id: Date.now().toString(),
    text,
    completed: false
  });
 
  saveTasks(tasks);
  render();
  input.value = "";
  input.focus();
});
 
// 3) Task Controls -----------------------------------------------------------
function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks(tasks);
  render();
}
 
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks(tasks);
  render();
}
 
render();
 
// Footer: last modified date -----------------------------------------------
document.getElementById("last-modified").textContent = `Last modified: ${document.lastModified}`;
