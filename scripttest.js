
// document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const taskBtn = document.getElementById("task-btn");
  const taskList = document.getElementById("taskList");
  console.log(taskInput, taskBtn, taskList);
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  renderTasks();

taskBtn.addEventListener("click", () => {
  const newTask = taskInput.value.trim();
  if (newTask !== "") {
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    taskInput.value = "";
  }
});

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((item, index) => {
      newItem = document.createElement("li");
      newItem.innerHTML = item;

      xButton = document.createElement("button");
      xButton.innerHTML = "❌";

      taskList.appendChild(newItem);
    });
}