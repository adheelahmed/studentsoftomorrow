const taskInput = document.getElementById("taskInput");
const timeSelect = document.getElementById("timeSelect");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("daily_tasks") || "[]");

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((t, i) => {
    const div = document.createElement("div");
    div.className = "task" + (t.done ? " done" : "");
    div.innerHTML = `
      <span>${t.text} <span class="time">(${t.time})</span></span>
      <div>
        <button onclick="toggleDone(${i})">✔</button>
        <button onclick="deleteTask(${i})">🗑</button>
      </div>
    `;
    taskList.appendChild(div);
  });
  localStorage.setItem("daily_tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = taskInput.value.trim();
  const time = timeSelect.value;
  if (!text) return;
  tasks.push({ text, time, done: false });
  taskInput.value = "";
  renderTasks();
}

function toggleDone(i) {
  tasks[i].done = !tasks[i].done;
  renderTasks();
}

function deleteTask(i) {
  tasks.splice(i, 1);
  renderTasks();
}

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", e => {
  if (e.key === "Enter") addTask();
});

document.getElementById("githubPagesBtn").addEventListener("click", () => {
  alert("Steps to deploy on GitHub Pages:\n1. Create a GitHub repo.\n2. Upload this folder (with index.html, style.css, script.js).\n3. Go to Settings > Pages, select branch: main, folder: root.\n4. Your Daily Planner will be live!");
  window.open("https://github.com/new", "_blank");
});

renderTasks();
