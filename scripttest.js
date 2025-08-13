//Notes
const noteBtn = document.getElementById("noteBtn");
const addNote = document.getElementById("addNote");

let noteCards = JSON.parse(localStorage.getItem("noteCards")) || [];

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
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("noteDiv");
    if (noteObj.theme === "light") {
      noteDiv.classList.add("light");
    } else {
      noteDiv.classList.remove("light");
    }

    noteDiv.contentEditable = 'true'
    noteDiv.classList.add("note");
    noteDiv.value = noteObj.text;
    noteDiv.placeholder = "Notes: ";

    // const textarea = document.createElement("textarea");
    // textarea.classList.add("note");
    // textarea.value = noteObj.text;
    // textarea.placeholder = "Notes: ";

    //Save changes to localStorage when user edits notes
    noteDiv.addEventListener("input", () => {
    noteCards[index].text = noteDiv.value;
    localStorage.setItem("noteCards", JSON.stringify(noteCards));
    });

    // textarea.addEventListener("input", () => {
    //   noteCards[index].text = textarea.value;
    //   localStorage.setItem("noteCards", JSON.stringify(noteCards));
    // });

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
        noteDiv.classList.add("light");
      } else {
        noteDiv.classList.remove("light");
      }
      localStorage.setItem("noteCards", JSON.stringify(noteCards));
    });


    // noteDiv.appendChild(textarea);
    noteDiv.appendChild(deleteBtn);
    noteDiv.appendChild(toggleBtn);
    addNote.appendChild(noteDiv);
  });
}

//tested using https://www.lifeinthefingerlakes.com/wp-content/uploads/2019/10/finger-lakes-sunset.jpg
//Find an image, open it in a new tab, copy url
//seeing a light background img for testing: https://images.pexels.com/photos/13133637/pexels-photo-13133637.jpeg
//right click on image to copy image link from pexels







