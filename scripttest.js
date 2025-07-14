//new Date practice for index.html
const currentDate = new Date();
let hour = currentDate.getHours();
const currentHour = document.getElementById("current-hour");
// currentHour.textContent = greeting();
// currentHour.textContent = `Current Hour (0-23):  ${hour}`;


function greeting() {
    // let greetings = document.getElementById("greetings");//something wrong with this
    const morningGreeting = document.createElement("p");
    const afternoonGreeting = document.createElement("p");
    const eveningGreeting = document.createElement("p");
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

 //Sticky Note and Local Storage Practice
function createNote(content = "") {
    const newNote = document.createElement("textarea");
    newNote.className = "sticky-note"
    newNote.value = content;
    //add event listener for editing, saving, dragging
    // textarea.addEventListener("input", () => saveNotes()); // Save on content changes
    //textarea.addEventListener("mouseup", () => saveNotes()); // Save when done dragging
    //textarea.addEventListener("touchend", () => saveNotes()); // Save on touch interactions (for mobile)

   
    document.getElementById("notes-container")
}

function keepNotes {
    const notes = Array.from(documents.querySelectorAll(".sticky-note")).map(note => ({
        content: note.value,
        //store position, size if needed
    }));
    localStorage.setItem("sitckyNotes", JSON.stringify(notes));
}

function loadNotes {
    const keptNotes = JSON.parse(localStorage.getItem("stickyNotes") || "[]");
    keptNotes.forEach(noteData => createStickyNote(noteData.content));
}

window.onload = loadNotes

//Example to pull from:
// const addNoteBtn = document.getElementById("addNote");
// const notesContainer = document.getElementById("notesContainer");

// // Function to create a new sticky note
// function createNote(id = Date.now(), content = "", x = 100, y = 100) {
//     const textarea = document.createElement("textarea");
//     textarea.className = "note";
//     textarea.value = content;
//     textarea.style.left = x + "px";
//     textarea.style.top = y + "px";

//     // Add event listeners for interaction
//     textarea.addEventListener("input", () => saveNotes()); // Save on content changes
//     textarea.addEventListener("mouseup", () => saveNotes()); // Save when done dragging
//     textarea.addEventListener("touchend", () => saveNotes()); // Save on touch interactions (for mobile)

//     makeDraggable(textarea); // Make the note draggable (see below)
//     notesContainer.appendChild(textarea);
//     saveNotes(); // Save the new note immediately
// }

// // Function to make a note draggable
// function makeDraggable(element) {
//     let offsetX, offsetY;

//     element.addEventListener("mousedown", e => { // Start dragging on mouse down
//         offsetX = e.clientX - parseInt(element.style.left);
//         offsetY = e.clientY - parseInt(element.style.top);

//         document.addEventListener("mousemove", mouseMove);
//         document.addEventListener("mouseup", mouseUp);
//     });

//     function mouseMove(e) {
//         element.style.left = e.clientX - offsetX + "px";
//         element.style.top = e.clientY - offsetY + "px";
//     }

//     function mouseUp() {
//         document.removeEventListener("mousemove", mouseMove); // Stop dragging on mouse up
//         document.removeEventListener("mouseup", mouseUp);
//         saveNotes(); // Save position after dragging
//     }
// }

// // Functions for saving and loading notes (using localStorage)
// function saveNotes() {
//     const notes = Array.from(document.querySelectorAll(".note")).map(note => ({
//         content: note.value,
//         x: parseInt(note.style.left),
//         y: parseInt(note.style.top),
//     }));
//     localStorage.setItem("notes", JSON.stringify(notes)); // Store as a JSON string
// }

// function loadNotes() {
//     const saved = JSON.parse(localStorage.getItem("notes") || "[]"); // Parse saved JSON string
//     saved.forEach((note) => {
//         createNote(note.id, note.content, note.x, note.y);
//     });
// }

// // Add a new note when the "Add Note" button is clicked
// addNoteBtn.addEventListener("click", () => createNote());

// // Load notes when the page loads
// window.onload = () => loadNotes();
