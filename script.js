//Greeting based on time of day

const now = new Date();
const hour = now.getHours();
/*console.log(now);
console.log(hour);*/

/*function time(){
    if (hour < 12) {
       greeting = prompt("good morning");
    } else if (hour >= 12 <= 18) {
        greeting = prompt("good afternoon");
    } else {
        greeting = prompt("good evening");
    }
}
time(hour);*/
/*return time;
console.log(time);*/

//Tasks - Todo List
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
   const taskText = taskInput.value.trim();
   if (taskText === "") return;

   const taskItem = document.createElement("li");
   taskItem.textContent = taskText;
   taskItem.classList.add("list");


//remove task
    taskItem.addEventListener("click", function() {
    taskList.removeChild(taskItem);
})

//add items to list
    taskList.appendChild(taskItem);

    taskInput.value = "";
}

//Notes
const notesInput = document.getElementById("notesInput");
const notesList = document.getElementById("notesList");

function addNotes() {
   const notesText = notesInput.value.trim();
   if (notesText === "") return;

   const notesItem = document.createElement("li");
   notesItem.textContent = notesText;
   notesItem.classList.add("notesList");

   notesItem.addEventListener("click", function() {
    notesList.removeChild(notesItem);
})

    notesList.appendChild(notesItem);

    notesInput.value = "";
}