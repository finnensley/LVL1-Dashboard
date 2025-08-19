document.addEventListener("DOMContentLoaded", function () {

  //Greeting based on time of day
const currentDate = new Date();
const hour = currentDate.getHours();
const currentHour = document.getElementById("current-hour");
const currentDay = document.getElementById("current-date");
const currentTime = document.getElementById("current-time");

function greeting() {
  if (!currentHour) return; // only runs if element exists

  if (hour < 12) {
    currentHour.textContent = "Good Morning!";
  } else if (hour >= 12 && hour <= 18) {
    currentHour.textContent = "Good Afternoon!";
  } else if (hour > 18) {
    currentHour.textContent = "Good Evening!";
  }
}

greeting(hour);

if (currentDay) {
  currentDay.textContent = currentDate.toDateString();
}
if (currentTime) {
  currentTime.textContent = currentDate.toLocaleTimeString();
}

//User name displayed after inputting
const input = document.getElementById("nameInput");
const saveBtn = document.getElementById("saveBtn");
const usersname = document.getElementById("userDisplay");

const savedName = localStorage.getItem("username");
// added to ensure code only runs if elements exist, prevents errors on other pages
if (savedName && usersname) {
  usersname.textContent = `Greetings ${savedName}`;
}

if (saveBtn && input && usersname) {
  saveBtn.addEventListener("click", () => {
    const getValue = input.value;
    if (getValue === "") {
      alert("Please enter your name to personalize the greeting message.");
      return;
    }
    localStorage.setItem("username", getValue);
    usersname.textContent = `Greetings ${getValue}`;
    input.value = "";
  });
}

//Tasks - Todo List
const taskInput = document.getElementById("taskInput");
const taskBtn = document.getElementById("taskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks on page load
if (taskBtn && taskInput && taskList) {
  renderTasks();

  taskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    // Prevent adding blank tasks
    if (taskText === "") return;
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    //rendering saves tasks to localStorage
    renderTasks();
    taskInput.value = "";
  });
}

function renderTasks() {
  if (!taskList) return;
  taskList.innerHTML = "";
  //loops through each task in the tasks array, providing both task and index
  tasks.forEach((task, index) => {
    //Prevents adding blank tasks
    if (task.trim() === "") return;
    const taskItem = document.createElement("li");
    taskItem.textContent = task;
    taskItem.classList.add("list");

    //Remove task on click from array and updates localStorage with new array, calling renderTasks() updates the displayed list
    taskItem.addEventListener("click", function () {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    });
    //adds the list item to the task list in the DOM
    taskList.appendChild(taskItem);
  });
}

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
    const themeAndTrashDiv = document.createElement("div");
    themeAndTrashDiv.classList.add("themeAndTrashDiv");
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("noteDiv");


    const textarea = document.createElement("textarea");
    textarea.classList.add("note");
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
  });
}

//Weather
// const localApiURL = "https://api.openweathermap.org/data/2.5/weather?q=Colorado,us&APPID=9818f918e9d02e8a934463e2e7602786"
const apiKey = "9818f918e9d02e8a934463e2e7602786";
const btn = document.getElementById("weatherBtn");
const cityInput = document.getElementById("cityInput");

if (btn && cityInput) {
  btn.addEventListener("click", () => {
    const city = cityInput.value;
    if (city) {
      fetchWeather(city);
    } else {
      displayError("Please enter a city name.");
    }
    cityInput.value = "";
  });
}

function fetchWeather(city) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  fetch(apiURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      // console.log(response.json());
      return response.json();
    })
    .then((data) => displayWeather(data))
    .catch((error) => displayError(error.message));
}

function displayWeather(data) {
  console.log("displayWeather called with:", data);
  document.getElementById("error-message").textContent = "";
  document.getElementById("city-name").textContent = `Weather in ${data.name}`;
  document.getElementById(
    "temperature"
  ).textContent = `Current Temperature: ${Math.floor(data.main.temp)}°F`;
  document.getElementById("feels-like").textContent = `Feels like: ${Math.floor(
    data.main.feels_like
  )}°F`;
  document.getElementById(
    "description"
  ).textContent = `Condition: ${data.weather[0].description}`;
  document.getElementById(
    "humidity"
  ).textContent = `Humidity: ${data.main.humidity}%`;
  // Save to localStorage, opting to not use
  // localStorage.setItem("lastWeatherData", JSON.stringify(data));
}

function displayError(message) {
  document.getElementById("error-message").textContent = message;
  document.getElementById("city-name").textContent = "";
  document.getElementById("temperature").textContent = "";
  document.getElementById("feels-like").textContent = "";
  document.getElementById("description").textContent = "";
  document.getElementById("humidity").textContent = "";
}

//Display weather for the user's location

function successCallback(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  //use these coordinates to fetch weather data
  fetchWeatherByCoordinates(latitude, longitude);
}

function errorCallback(error) {
  console.error("Unable to get your location.");
  displayError("Unable to get your location.");
}

async function fetchWeatherByCoordinates(latitude, longitude) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${apiKey}&units=imperial`
    );
    const weather = await response.json();
    displayWeather(weather);
    console.log("weather = ", weather);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    displayError("Could not fetch local weather");
  }
}

const localBtn = document.getElementById("localBtn");
if (localBtn) {
  localBtn.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  });
}

//Save to localStorage, opting to not use
//   window.addEventListener("DOMContentLoaded", () => {
//     if (document.getElementById("city-name")) {
//     const lastWeather = localStorage.getItem("lastWeatherData");
//     if (lastWeather) {
//         try {
//             const data = JSON.parse(lastWeather);
//             // console.log("Loaded from localStorage", data);
//             displayWeather(data);
//         } catch (e) {
//             localStorage.removeItem("lastWeatherData");
//         }

//       }
//     }
// });

//Light Mode Toggle
const body = document.body;
const lightModeBtn = document.getElementById("toggleModeBtn");

function toggleLightMode() {
  body.classList.toggle("light");
  const theme = body.classList.contains("light") ? "light" : "dark";
  lightModeBtn.innerText = theme === "light" ? "Dark Mode" : "Light Mode";
  localStorage.setItem("theme", theme);

 //Reset background to default in light mode
//   if (theme === "light") {
//     if (greetingPage) greetingPage.style.backgroundImage = "";
//     if (aboutPage) aboutPage.style.backgroundImage = "";
//     if (weatherPage) weatherPage.style.backgroundImage = "";
//     if (tasksPage) {
//         tasksPage.style.backgroundImage = "";
//         tasksPage.classList.remove("listBkgChange"); // removes class if bkg img is changed in dark mode, then toggled to light mode. style stays the same for light mode
//     } 
//     if (notesPage) { 
//       notesPage.style.backgroundImage = "";
//       notesPage.classList.remove("notesBkgChange");
//     }
//     if (feedbackPage) feedbackPage.style.backgroundImage = "";
//   } else {
//     //Restore background images from localStorage when toggle back to dark mode
//     if (greetingPage) {
//       const savedBkgImg = localStorage.getItem("bkgImgGreet");
//       if (savedBkgImg) greetingPage.style.backgroundImage = savedBkgImg ? `url(${savedBkgImg})` : "";
//     }
//     if (aboutPage) {
//       const savedBkgImg = localStorage.getItem("bkgImgAbout");
//       if (savedBkgImg) aboutPage.style.backgroundImage = savedBkgImg ? `url(${savedBkgImg})` : "";
//     }
//     if (weatherPage) {
//       const savedBkgImg = localStorage.getItem("bkgImgWeather");
//       if (savedBkgImg) weatherPage.style.backgroundImage = savedBkgImg ? `url(${savedBkgImg})` : "";
//   }
//     if (tasksPage) {
//       const savedBkgImg = localStorage.getItem("bkgImgTasks");
//       if (savedBkgImg) {
//       // tasksPage.style.backgroundImage = savedBkgImg ?  `url(${savedBkgImg})` : ""; // use this if decide to not customize list
//         tasksPage.style.backgroundImage = `url(${savedBkgImg})`;
//         tasksPage.classList.add("listBkgChange");
//       } else {
//         tasksPage.classList.remove("listBkgChange");
//       }
//   }
//     if (notesPage) {
//       const savedBkgImg = localStorage.getItem("bkgImgNotes");
//       if (savedBkgImg) {
//       // notesPage.style.backgroundImage = savedBkgImg ?  `url(${savedBkgImg})` : "";
//       notesPage.style.backgroundImage = `url(${savedBkgImg})`;
//       notesPage.classList.add("notesBkgChange");
//       } else {
//         notesPage.classList.remove("notesBkgChange");
//       }
//   }
//     if (feedbackPage) {
//       const savedBkgImg = localStorage.getItem("bkgImgFeedback");
//       if (savedBkgImg) feedbackPage.style.backgroundImage = savedBkgImg ? `url(${savedBkgImg})` : "";
//   }
// }
// } 

//Refactored code: Reset background to default in light mode
 handleBackgroundOnThemeChange({
    pageSelector: ".greeting",
    storageKey: "bkgImgGreet"
  });
  handleBackgroundOnThemeChange({
    pageSelector: ".about",
    storageKey: "bkgImgAbout"
  });
  handleBackgroundOnThemeChange({
    pageSelector: ".weather",
    storageKey: "bkgImgWeather"
  });
  handleBackgroundOnThemeChange({
    pageSelector: ".tasks",
    storageKey: "bkgImgTasks",
    bkgChangeClass: "listBkgChange"
  });
  handleBackgroundOnThemeChange({
    pageSelector: ".notes",
    storageKey: "bkgImgNotes",
    bkgChangeClass: "notesBkgChange"
  });
  handleBackgroundOnThemeChange({
    pageSelector: ".feedback",
    storageKey: "bkgImgFeedback"
  });
}

function handleBackgroundOnThemeChange ({
  pageSelector,
  storageKey,
  bkgChangeClass
}) {
  const page = document.querySelector(pageSelector);
  const savedBkgImg = localStorage.getItem(storageKey);

  if (!page) return;

  if (body.classList.contains("light")) {
    page.style.backgroundImage = "";
    if (bkgChangeClass) page.classList.remove(bkgChangeClass);
   } else {
      if (savedBkgImg) {
        page.style.backgroundImage = `url(${savedBkgImg})`;
        if (bkgChangeClass) page.classList.add(bkgChangeClass);
      } else if (bkgChangeClass) page.classList.remove(bkgChangeClass);
    }
  }

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light");
    lightModeBtn.innerText = "Dark Mode";
  }
}

loadTheme();

if (lightModeBtn) {
lightModeBtn.addEventListener("click", toggleLightMode);
}

//Submit Feedback Form - form submits without anything in script because action is set in HTML, added hidden date/time input

  const feedbackForm = document.getElementById("feedbackForm");
  const hiddenDateInput =  document.getElementById("dateInput");
  

  if (feedbackForm && hiddenDateInput) {
    feedbackForm.addEventListener("input", () => { 
     const now = new Date();
     hiddenDateInput.value = `${now.toLocaleString()}`;
    //  hiddenDateInput.type = "text"; // use for debugging 
  });
};

// //User can change background on each page to personalize
// //Greeting Page
// const urlInputGreet = document.getElementById("urlInputGreet");
// const bkgBtnGreet = document.getElementById("bkgBtnGreet");
// const greetingPage = document.querySelector(".greeting");
// const savedBkgImgGreet = localStorage.getItem("bkgImgGreet");

// //loads the background image on page load and excludes loading localStorage to light mode page
// if (savedBkgImgGreet && greetingPage && !body.classList.contains("light")) {
//   greetingPage.style.backgroundImage = `url(${savedBkgImgGreet})`;
//   updatePlaceholder(urlInputGreet, "bkgImgGreet")
// } else if (urlInputGreet) {
//   updatePlaceholder(urlInputGreet, "bkgImgGreet");
// }

// //added "bkgImgGreet" to changeBackground()
// if (bkgBtnGreet && urlInputGreet && greetingPage) {
//   bkgBtnGreet.addEventListener("click", () => {
//     changeBackground(greetingPage, urlInputGreet, "bkgImgGreet");
//   });
// }

// //About Page
// const urlInputAbout = document.getElementById("urlInputAbout");
// const bkgBtnAbout = document.getElementById("bkgBtnAbout");
// const aboutPage = document.querySelector(".about");
// const savedBkgImgAbout = localStorage.getItem("bkgImgAbout");

// if (savedBkgImgAbout && aboutPage && !body.classList.contains("light")) {
//   aboutPage.style.backgroundImage = `url(${savedBkgImgAbout})`;
//   updatePlaceholder(urlInputAbout, "bkgImgAbout")
// } else if (urlInputAbout) {
//   updatePlaceholder(urlInputAbout, "bkgImgAbout");
// }

// if (bkgBtnAbout && urlInputAbout && aboutPage) {
//   bkgBtnAbout.addEventListener("click", () => {
//     changeBackground(aboutPage, urlInputAbout, "bkgImgAbout");
//   });
// }

// //Weather Page
// const urlInputWeather = document.getElementById("urlInputWeather");
// const bkgBtnWeather = document.getElementById("bkgBtnWeather");
// const weatherPage = document.querySelector(".weather");
// const savedBkgImgWeather = localStorage.getItem("bkgImgWeather");

// if (savedBkgImgWeather && weatherPage && !body.classList.contains("light")) {
//   weatherPage.style.backgroundImage = `url(${savedBkgImgWeather})`;
//   updatePlaceholder(urlInputWeather, "bkgImgWeather");
// } else if (urlInputWeather) {
//   updatePlaceholder(urlInputWeather, "bkgImgWeather");
// }

// if (bkgBtnWeather && urlInputWeather && weatherPage) {
//   bkgBtnWeather.addEventListener("click", () => {
//     changeBackground(weatherPage, urlInputWeather, "bkgImgWeather");
//   });
// }

// //Tasks Page
// const urlInputTasks = document.getElementById("urlInputTasks");
// const bkgBtnTasks = document.getElementById("bkgBtnTasks");
// const tasksPage = document.querySelector(".tasks");
// const savedBkgImgTasks = localStorage.getItem("bkgImgTasks");

// if (savedBkgImgTasks && tasksPage && !body.classList.contains("light")) {
//   tasksPage.style.backgroundImage = `url(${savedBkgImgTasks})`;
//   tasksPage.classList.add("listBkgChange");
//   updatePlaceholder(urlInputTasks, "bkgImgTasks");

// // } else if (urlInputTasks) { // add back if decide not to customize list when bkgImg is changed
// }else if (tasksPage) {
//   tasksPage.classList.remove("listBkgChange");
//   updatePlaceholder(urlInputTasks, "bkgImgTasks");
// }

// if (bkgBtnTasks && urlInputTasks && tasksPage) {
//   bkgBtnTasks.addEventListener("click", () => {
//     changeBackground(tasksPage, urlInputTasks, "bkgImgTasks");
//   });
// }

// //Notes Page
// const urlInputNotes = document.getElementById("urlInputNotes");
// const bkgBtnNotes = document.getElementById("bkgBtnNotes");
// const notesPage = document.querySelector(".notes");
// const savedBkgImgNotes = localStorage.getItem("bkgImgNotes");

// if (savedBkgImgNotes && notesPage && !body.classList.contains("light")) {
//   notesPage.style.backgroundImage = `url(${savedBkgImgNotes})`;
//   notesPage.classList.add("notesBkgChange");
//   updatePlaceholder(urlInputNotes, "bkgImgNotes");
// // }else if (urlInputNotes) { // add back if decide not to customize list when bkgImg is changed
// } else if (notesPage) {
//   notesPage.classList.remove("notesBkgChange");
//   updatePlaceholder(urlInputNotes, "bkgImgNotes");
// }

// if (bkgBtnNotes && urlInputNotes && notesPage) {
//   bkgBtnNotes.addEventListener("click", () => {
//     changeBackground(notesPage, urlInputNotes, "bkgImgNotes");
//   });
// }

// //Feedback Page
// const urlInputFeedback = document.getElementById("urlInputFeedback");
// const bkgBtnFeedback = document.getElementById("bkgBtnFeedback");
// const feedbackPage = document.querySelector(".feedback");
// const savedBkgImgFeedback = localStorage.getItem("bkgImgFeedback");

// if (savedBkgImgFeedback && feedbackPage && !body.classList.contains("light")) {
//   feedbackPage.style.backgroundImage = `url(${savedBkgImgFeedback})`;
//   updatePlaceholder(urlInputFeedback, "bkgImgFeedback");
// } else if (urlInputFeedback) {
//   updatePlaceholder(urlInputFeedback, "bkgImgFeedback");
// }

// if (bkgBtnFeedback && urlInputFeedback && feedbackPage) {
//   bkgBtnFeedback.addEventListener("click", () => {
//     changeBackground(feedbackPage, urlInputFeedback, "bkgImgFeedback");
//   });
// }

//User can change background on each page to personalize
//Refactored code using function parameters and calling the arguments
setupBackgroundControls({
  pageSelector: ".greeting",
  inputId: "urlInputGreet",
  btnId: "bkgBtnGreet",
  storageKey: "bkgImgGreet"
});
setupBackgroundControls({
  pageSelector: ".about",
  inputId: "urlInputAbout",
  btnId: "bkgBtnAbout",
  storageKey: "bkgImgAbout"
});
setupBackgroundControls({
  pageSelector: ".weather",
  inputId: "urlInputWeather",
  btnId: "bkgBtnWeather",
  storageKey: "bkgImgWeather"
});
setupBackgroundControls({
  pageSelector: ".tasks",
  inputId: "urlInputTasks",
  btnId: "bkgBtnTasks",
  storageKey: "bkgImgTasks",
  bkgChangeClass: "listBkgChange"
});
setupBackgroundControls({
  pageSelector: ".notes",
  inputId: "urlInputNotes",
  btnId: "bkgBtnNotes",
  storageKey: "bkgImgNotes",
  bkgChangeClass: "notesBkgChange"
});
setupBackgroundControls({
  pageSelector: ".feedback",
  inputId: "urlInputFeedback",
  btnId: "bkgBtnFeedback",
  storageKey: "bkgImgFeedback"
});

function setupBackgroundControls({
  pageSelector,
  inputId,
  btnId,
  storageKey,
  bkgChangeClass
}) {
  const page = document.querySelector(pageSelector);
  const input = document.getElementById(inputId);
  const btn = document.getElementById(btnId);
  const savedBkgImg = localStorage.getItem(storageKey);

  if (savedBkgImg && page && !body.classList.contains("light")) {
     page.style.backgroundImage = `url(${savedBkgImg})`;
     if(bkgChangeClass) page.classList.add(bkgChangeClass);
     updatePlaceholder(input, storageKey);
  } else if (page) {
    if(bkgChangeClass) page.classList.remove(bkgChangeClass);
    updatePlaceholder(input, storageKey);
  }
  if (btn && input && page) {
    btn.addEventListener("click", () => {
      changeBackground(page, input, storageKey);
    });
  }
}


//Generic function - changed bkgImg to storageKey to use refactored code
function changeBackground(page, input, storageKey) {
  const url = input.value.trim();
  if (url && !(url.endsWith("jpg") || url.endsWith(".jpeg") || url.endsWith(".png"))) {
    input.value = "";
    alert("Please enter a valid image URL (.jpg, .jpeg, .png).")
    return;
  }
  if (url.endsWith(".jpg") && page || url.endsWith(".jpeg") && page || url.endsWith(".png") && page) {
    page.style.backgroundImage = `url(${url})`;
    localStorage.setItem(storageKey, url); // Save to localStorage

    if (page.classList.contains("tasks")) {
     page.classList.add("listBkgChange");// Change taskList background and hover colors when bkgimg changed
    }

    if (page.classList.contains("notes")) {
      page.classList.add("notesBkgChange"); // Change taskList background and hover colors when bkgimg changed
    }

    input.value = "";
    input.placeholder = "Click for default image";
  } else if (page) {
    page.style.backgroundImage = "";
    localStorage.removeItem(storageKey); //Remove from localStorage

    if (page.classList.contains("tasks")) {//Removes listBkgChange class from tasks page 
      page.classList.remove("listBkgChange");
    }

    if (page.classList.contains("notes")) {//Removes notesBkgChange class from notes page
      page.classList.remove("notesBkgChange");
    }
    input.placeholder = "Image URL";
  }
  updatePlaceholder(input, storageKey);
};



//bkgImgKey is same as storageKey (which is commonly used for the key used for localStorage)
function updatePlaceholder(input, bkgImgStorageKey) {
  if (!input) return;
  const savedBkgImg = localStorage.getItem(bkgImgStorageKey);
  input.placeholder = savedBkgImg ? "Click for default image" : "Image URL";
  //Refactored with a ternary statement:
  // if(savedBkgImg) {
  //   input.placeholder = "Click for default image";
  // } else {
  //   input.placeholder = "Image URL";
  // }
}

//Hide background change option in light mode
const backgroundControls = document.getElementById("backgroundControls");

function updateVisibility() {
  if (!backgroundControls) return;
  if (body.classList.contains("light")) {
    backgroundControls.classList.add("hide");

  } else {
    backgroundControls.classList.remove("hide");
  }
}
updateVisibility();
lightModeBtn.addEventListener("click",updateVisibility);

});



