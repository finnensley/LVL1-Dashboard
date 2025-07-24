//Greeting based on time of day

const currentDate = new Date();
let hour = currentDate.getHours();
const currentHour = document.getElementById("current-hour");

function greeting() {
    if (!currentHour) return; // only runs if element exists
    const morningGreeting = document.createElement("p");
    const afternoonGreeting = document.createElement("p");
    const eveningGreeting = document.createElement("p");
    //not sure if I need these classes for styling 
    morningGreeting.className = "morning";
    afternoonGreeting.className = "afternoon";
    eveningGreeting.className = "evening";

    if (hour < 12){
      currentHour.textContent = "Good Morning!";
      document.body.appendChild(morningGreeting);
    } else if (hour >= 12 && hour <= 18){
      currentHour.textContent = "Good Afternoon"; 
      document.body.appendChild(afternoonGreeting);
    } else if (hour > 18) {
      currentHour.textContent = "Good Evening"; 
      document.body.appendChild(eveningGreeting);
    }
}

greeting(hour);

const input = document.getElementById("nameInput");
const saveBtn = document.getElementById("saveBtn");
const usersname = document.getElementById("userDisplay");

const savedName = localStorage.getItem("username");
if (savedName && usersname) { // added && username to ensure code only runs if elements exist, prevent errors on other pages
  usersname.textContent = `Greetings ${savedName}`;
}

if (saveBtn && input && usersname) {
saveBtn.addEventListener("click", () => {
  const getValue = input.value;
  localStorage.setItem("username", getValue);
  usersname.textContent = `Greetings ${getValue}`;
});
}

//Tasks - Todo List
const taskInput = document.getElementById("taskInput");
const taskBtn = document.getElementById("taskBtn"); 
const taskList = document.getElementById("taskList");

// Load tasks from localStorage or start with empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks on page load
if (taskBtn && taskInput && taskList) { // add this to avoid loading error on other pages
  renderTasks();
  taskBtn.addEventListener("click", () => {
   const taskText = taskInput.value.trim();
   //if the input is empty, do nothing. This prevents adding blank tasks
   if (taskText === "") return;

  //adds the new task to tasks array
   tasks.push(taskText);
  //saves the updated tasks array to localStorage
   localStorage.setItem("tasks", JSON.stringify(tasks));
  // calling updates teh displayed list of tasks
   renderTasks();
  //clears the input box for the next task
   taskInput.value = "";
});
}
//Render tasks function, defines the function that displays all tasks in the list
function renderTasks() {
  if (!taskList) return // Prevents error if taskList doesn't exist
  //clears any existing tasks from the list in the DOM
  taskList.innerHTML = "";
  //loops through each task in the tasks array, providing both task and it's index
  tasks.forEach((task, index) => {
    //skips rendering if empty string, keeps blank tasks from showing
    if (task.trim() === "") return; 
    const taskItem = document.createElement("li");
    taskItem.textContent = task;
    taskItem.classList.add("list");


//Remove task on click from array and updates localStorage with new array, calls renderTasks() again to update the displayed list
    taskItem.addEventListener("click", function() {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
  });

//adds the list item to the task list in the DOM
    taskList.appendChild(taskItem);
//ends the loop through all tasks
 });
// ends the function
};

//Notes
const noteBtn = document.getElementById("noteBtn");
const addNote = document.getElementById("addNote");

let noteCards = JSON.parse(localStorage.getItem("noteCards")) || [];

//Renders notes on page load
if (addNote && noteBtn) { // add this to keep from getting an error when loading 
renderNoteCards();

noteBtn.addEventListener("click", () => {
  // console.log("Button clicked!");
  noteCards.push({ text: "", theme: "light" });//Adds a blank note
  localStorage.setItem("noteCards", JSON.stringify(noteCards));

  renderNoteCards();
});
}

function renderNoteCards() {
  addNote.innerHTML = "";//clear the previous notes
  noteCards.forEach((noteObj, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("noteDiv")
    if (noteObj.theme === "light") {
      noteDiv.classList.add("light");
    } else {
      noteDiv.classList.remove("light");
    };

    const textarea = document.createElement("textarea");
    textarea.classList.add("note");
    textarea.value = noteObj.text;
    textarea.placeholder = "Notes: ";


    //Save changes to localStorage when user edits notes
    textarea.addEventListener("input", () => {
      noteCards[index].text = textarea.value;
      localStorage.setItem("noteCards", JSON.stringify(noteCards));
    });

    //Delete button for each note
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.classList.add("delete-note");
    deleteBtn.addEventListener("click", () => {
      noteCards.splice(index, 1);
      localStorage.setItem("noteCards", JSON.stringify(noteCards));
      renderNoteCards();
    });
  
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "💡";
    toggleBtn.classList.add("toggle-note");

    toggleBtn.addEventListener("click", () => {
      //toggle theme in object and DOM
      noteCards[index].theme = noteObj.theme === "dark" ? "light": "dark";
      localStorage.setItem("noteCards", JSON.stringify(noteCards));
      renderNoteCards();
      
  });
  
    noteDiv.appendChild(textarea);
    noteDiv.appendChild(deleteBtn);
    noteDiv.appendChild(toggleBtn);
    addNote.appendChild(noteDiv);
  });
};

//Weather
