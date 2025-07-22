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


//Tasks - Todo List
const taskInput = document.getElementById("taskInput");
const taskBtn = document.getElementById("taskBtn"); 
const taskList = document.getElementById("taskList");

// Load tasks from localStorage or start with empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks on page load
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

//Render tasks function, defines the function that displays all tasks in the list
function renderTasks() {
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
}

//Notes
//Create Note Button
const addNoteBtn = document.getElementById("noteBtn");

// Add a div with a textarea for stickyNote
let textarea = document.createElement("textarea");
textarea.className = "textarea";

function createNote() {

  saveNotes();
}
 
    function saveNotes() {
    const notes = Array.from(document.querySelectorAll(".note")).map(note => ({
        content: note.value,
        x: parseInt(note.style.left),
        y: parseInt(note.style.top),
    }));
    localStorage.setItem("notes", JSON.stringify(notes)); // Store as a JSON string
}


function loadNotes() {
    const saved = JSON.parse(localStorage.getItem("notes") || "[]"); // Parse saved JSON string
    saved.forEach((note) => {
        createNote(note.id, note.content, note.x, note.y);
    });
}

// Add a new note when the "Add Note" button is clicked
addNoteBtn.addEventListener("click", () => 
createNote());


// Load notes when the page loads
window.onload = () => loadNotes();
