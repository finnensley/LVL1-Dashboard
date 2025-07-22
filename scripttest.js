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

