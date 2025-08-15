//Notes
const noteBtn = document.getElementById("noteBtn");
const addNote = document.getElementById("addNote");

let noteCards = JSON.parse(localStorage.getItem("noteCards")) || [];
let originalPage = document.getElementById("originalPage");
let noteScreen = document.getElementById("noteScreen");

//Renders notes on page load
if (addNote && noteBtn) {
  // add to prevent error when loading
  renderNoteCards();

  noteBtn.addEventListener("click", () => {
    // console.log("Button clicked!");
    noteCards.push({ text: "", theme: "light" }); //Adds a blank note
    localStorage.setItem("noteCards", JSON.stringify(noteCards));

    renderNoteCards();
  });
}

function renderNoteCards() {
  addNote.innerHTML = "";
  noteCards.forEach((noteObj, index) => {
    const themeAndTrashDiv = document.createElement("div");
    themeAndTrashDiv.classList.add("themeAndTrashDiv");
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("noteDiv");

    const textarea = document.createElement("textarea");
    textarea.classList.add("note");
    textarea.style.resize = "vertical"; // resize original note
    textarea.value = noteObj.text;
    textarea.placeholder = "Notes: ";
     if (noteObj.theme === "light") {
      textarea.classList.add("light");
    } else {
      textarea.classList.remove("light");
    }

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

    //Toggle theme button for each note
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "💡";
    toggleBtn.classList.add("toggle-note");

    toggleBtn.addEventListener("click", () => {
      //toggle theme in object and DOM
      noteCards[index].theme = noteObj.theme === "dark" ? "light" : "dark";
      //save the size only in browser when toggling theme
      if (noteCards[index].theme === "light") {
        textarea.classList.add("light");
      } else {
        textarea.classList.remove("light");
      }
      localStorage.setItem("noteCards", JSON.stringify(noteCards));
    });

    noteDiv.appendChild(textarea);
    noteDiv.appendChild(themeAndTrashDiv);
    themeAndTrashDiv.appendChild(deleteBtn);
    themeAndTrashDiv.appendChild(toggleBtn);
    addNote.appendChild(noteDiv);

  textarea.addEventListener("click", () => {
    hideNotes(null, noteDiv);
  });
  });
}

  function hideNotes(_, showNote) {
    const allNotes = document.querySelectorAll(".noteDiv");
    allNotes.forEach((note) => {
      note.classList.add("hidden");
    });
    showNote.classList.remove("hidden");
    showNote.querySelector('textarea').style.resize = "both";
    showNote.querySelector('textarea').style.width = "";
    showNote.style.width = "";
    console.log("Switched to active note only:", showNote);
    };

  // noteScreen.parentNode.removeChild(showNote);
  // noteScreen.innerHTML = "";
  // noteScreen.appendChild(showNote);
 







// function swapScreen(_, showScreen) {
//   const allScreens = document.querySelectorAll(".screen");
//   allScreens.forEach((screen) => screen.classList.add("hidden"));
//   showScreen.classList.remove("hidden");
//   console.log("Switched to screen:", showScreen.id);
// }

 


//tested using https://www.lifeinthefingerlakes.com/wp-content/uploads/2019/10/finger-lakes-sunset.jpg
//Find an image, open it in a new tab, copy url
//seeing a light background img for testing: https://images.pexels.com/photos/13133637/pexels-photo-13133637.jpeg
//right click on image to copy image link from pexels







