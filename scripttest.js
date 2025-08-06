const currentDate = new Date();
// console.log(currentDate);
// const month = currentDate.getMonth() + 1;
// const day = currentDate.getDay();
// const year = currentDate.getFullYear();
let hour = currentDate.getHours();
const minutes = currentDate.getMinutes();
// const seconds = currentDate.getSeconds();
// console.log(month, day, year, hour, minutes, seconds);
const currentHour = document.getElementById("current-hour");
const currentDay = document.getElementById("current-date");
const currentTime = document.getElementById("current-time");

// console.log(currentDate.toDateString());
// console.log(`${hour}:${minutes}`);

function greeting() {
  if (!currentHour) return;
  // const morningGreeting = document.createElement("p");
  // const afternoonGreeting = document.createElement("p");
  // const eveningGreeting = document.createElement("p");
  if (hour < 12 && hour > 0) {
    currentHour.textContent = "Good Morning!";
    // document.body.appendChild(morningGreeting);
  } else if (hour >= 12 && hour <= 18) {
    currentHour.textContent = "Good Afternoon!";
    // document.body.appendChild(afternoonGreeting);
  } else if (hour > 18) {
    currentHour.textContent = "Good Evening!";
    // document.body.appendChild(eveningGreeting);
  }
  currentDay.textContent = currentDate.toDateString();
  // currentTime.textContent = currentDate.toTimeString();
}

greeting(hour);

// Get Name input to display user's name
const input = document.getElementById("nameInput");
const saveBtn = document.getElementById("saveBtn");
const usersname = document.getElementById("userDisplay");

//localStorage
const savedName = localStorage.getItem("username");
if (savedName && usersname) {
  usersname.textContent = `Greetings ${savedName}`;
}

//get the username value or input.value
if (saveBtn && input && usersname) {
  saveBtn.addEventListener("click", () => {
    const getUsersName = input.value;
    localStorage.setItem("username", getUsersName);
    usersname.textContent = `Greetings ${getUsersName}`;
    input.value = "";
  });
}

//Todo
//Step 1: grab all Elements
const taskInput = document.getElementById("taskInput");
const taskBtn = document.getElementById("taskBtn");
const taskList = document.getElementById("taskList");

//Step 2: get anything saved from localStorage 
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//Step 3: render tasks on page load
if (taskInput && taskBtn && taskList) {
  renderTasks();

//Step 4: When btn is clicked, add task to localStorage, calling the function updates the storage
  taskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;
    tasks.push(taskText)
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    taskInput.value= "";
  });
}

//Step 5: Render tasks function, 
function renderTasks() {
  if (!taskList) return;
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    if(task.trim() === "") return; // keeps from rendering if empty string or blank task
    const taskItem = document.createElement("li");
    taskItem.textContent = task;
    taskItem.classList.add("list");

    //Remove task and update storage
    taskItem.addEventListener("click", function() {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    });
    taskList.appendChild(taskItem);
  
  });
}

//Notes

const noteBtn = document.getElementById("noteBtn");
const addNote = document.getElementById("addNote");

let noteCards = JSON.parse(localStorage.getItem("notecards")) || [];

if (addNote && noteBtn){
renderNoteCards();
};

//When new note is created, add it to localStorage
noteBtn.addEventListener("click", () => {
  noteCards.push({ text: "", theme: "light" });
  localStorage.setItem("notecards", JSON.stringify(noteCards));
  renderNoteCards();
})

function renderNoteCards() {
  addNote.innerHTML = "";
  noteCards.forEach((noteObj, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("noteDiv");
    if (noteObj.theme === "light") {
      noteDiv.classList.add("light");
    } else {
      noteDiv.classList.remove("light");
    }

    const textarea = document.createElement("textarea");
    textarea.classList.add("note");
    textarea.value = noteObj.text;
    textarea.placeholder = "Notes: ";

    //save to localStorage
    textarea.addEventListener("input", () => {
      noteCards[index].text = textarea.value;
      localStorage.setItem("noteCards", JSON.stringify(noteCards));
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.classList.add = "delete-note";
    deleteBtn.addEventListener("click", () => {
      noteCards.splice(index, 1);
      localStorage.setItem("noteCards", JSON.stringify(noteCards));
      renderNoteCards();
  })

  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "💡";
  toggleBtn.classList.add("toggle-note");

  toggleBtn.addEventListener("click", () => {
    noteCards[index].theme = noteObj.theme === "dark" ? "light" : "dark";
    localStorage.setItem("noteCards", JSON.stringify(noteCards));
    renderNoteCards();
  });

  noteDiv.appendChild(textarea);
  noteDiv.appendChild(deleteBtn);
  noteDiv.appendChild(toggleBtn);
  addNote.appendChild(noteDiv);
  });
}












