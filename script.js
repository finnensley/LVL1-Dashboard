//Greeting based on time of day

const currentDate = new Date();
let hour = currentDate.getHours();
const currentHour = document.getElementById("current-hour");

function greeting() {
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

 greeting();
 console.log(new Date);



//Tasks - Todo List
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");


function addTask() {
   const taskText = taskInput.value.trim();
   if (taskText === "") return;

   const taskItem = document.createElement("li");
   taskItem.textContent = taskText;
   taskItem.classList.add("list");

//    //local storage - not working
//    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//    tasks.push(tasks.value);
//    localStorage.setItem("tasks", JSON.stringify(tasks));
//    displayTasks();
//    taskList.value = "";


//remove task
    taskItem.addEventListener("click", function() {
    taskList.removeChild(taskItem);
})

//add items to list
    taskList.appendChild(taskItem);
    taskInput.value = "";
}
  // displaying local storage: not working
//    function displayTasks() {
//     //display new array tasks converted to strings, setItem created this now how do I view it
//     if (savedTasks != "") {
        
//     }
    
// }
  //  document.addEventListener('DOMContentLoaded', displayTasks);

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
//example of saving text in notes on refresh
// const myTextArea = document.querySelector('#myTextArea');

// myTextArea.addEventListener("keyup", function() {
//     localStorage.setItem('myTextAreaContent', myTextArea.value);
// });

// window.addEventListener('DOMContentLoaded', fuction() {
//     const savedContent = localStorage.getItem('myTextAreaContent');
//     if (saveContent){
//         myTextArea.value = savedContent;
//     }
// })