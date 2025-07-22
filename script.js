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
const taskList = document.getElementById("taskList");


function addTask() {
   const taskText = taskInput.value.trim();
   if (taskText === "") return;

   const taskItem = document.createElement("li");
   taskItem.textContent = taskText;
   taskItem.classList.add("list");

   //local storage - not working
  //  function saveTasks() {
  //  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  //  tasks.push(tasks.value);
   
  //  localStorage.setItem("tasks", JSON.stringify(tasks));
  //  loadTasks();
  //  taskList.value = "";
  //  }

//remove task
    taskItem.addEventListener("click", function() {
    taskList.removeChild(taskItem);
});

//add items to list
    taskList.appendChild(taskItem);
    taskInput.value = "";
};

 // displaying local storage: not working
//  function loadTasks() {
//     const saved = JSON.parse(localStorage.getItem("taskItem") || "[]"); // Parse saved JSON string
//     saved.forEach((task) => {
//         createNote(task.id, task.content, task.x, task.y);
//     });
// }

//document.addEventListener('DOMContentLoaded', loadTasks);

//Notes
//Create Note Button
const addNoteBtn = document.getElementById("note-btn");

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
