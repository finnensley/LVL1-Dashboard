const taskInput = document.getElementById("taskInput");
const taskBtn = document.getElementById("taskBtn");
const taskList = document.getElementById("taskList");

// Create Element li to display tasks to user
// Remove tasks displayed to user
//Remover tasks from localStorage
// Need to push new tasks into an array
//localStorage to display on page load
//localStorage update when new tasks are added

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//render tasks on page load
if (taskBtn && taskInput && taskList) {
  renderTasks();

  // eventListener to Btn inside if statement
  taskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    //prevent blank tasks
    if (taskText === "") return;
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    taskInput.value = "";
  });
}

function renderTasks() {
  if (!taskList) return;
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    if (task.trim() === "") return;
    const taskItem = document.createElement("li");
    taskItem.textContent = task;
    taskItem.classList.add("list");

    taskItem.addEventListener("click", function () {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    });
    taskList.appendChild(taskItem);
  });
}
