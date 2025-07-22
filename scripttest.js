const noteBtn = document.getElementById("noteBtn");
const addNote = document.getElementById("addNote");

let noteCards = JSON.parse(localStorage.getItem("noteCards")) || [];

//Renders notes on page load
renderNoteCards();

noteBtn.addEventListener("click", () => {
  noteCards.push({ text: "", theme: "light" });//Adds a blank note
  localStorage.setItem("noteCards", JSON.stringify(noteCards));

  renderNoteCards();
});

function renderNoteCards() {
  addNote.innerHTML = "";//clear the previous notes
  noteCards.forEach((noteObj, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("noteDiv")
    if (noteObj.theme === "light") {
      noteDiv.classList.add("light");
    } else {
      noteDiv.classList.remove("light");
    }

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
}
 

//add ability to remove note on click
//add nice hover interaction
//keep note in localStorage
//style note a bit more old school