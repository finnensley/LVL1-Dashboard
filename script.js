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
  currentDay.textContent = currentDate.toDateString();
  // currentTime.textContent = currentDate.toTimeString();
}

greeting(hour);

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
  // add this to keep from getting an error when loading
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

    //Toggle theme button for each note
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "💡";
    toggleBtn.classList.add("toggle-note");

    toggleBtn.addEventListener("click", () => {
      //toggle theme in object and DOM
      noteCards[index].theme = noteObj.theme === "dark" ? "light" : "dark";
      localStorage.setItem("noteCards", JSON.stringify(noteCards));
      renderNoteCards();
    });

    noteDiv.appendChild(textarea);
    noteDiv.appendChild(deleteBtn);
    noteDiv.appendChild(toggleBtn);
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
      //console.log(response.json());
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
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light");
    lightModeBtn.innerText = "Dark Mode";
  }
}
loadTheme();
lightModeBtn.addEventListener("click", toggleLightMode);

//Submit Feedback Form - url submits without the need of anything here, but glitching, some tie in with the dark mode button or needs the eventListener
const formBtn = document.getElementById("formBtn");
const contactName = document.getElementById("contactName").value;
const contactEmail = document.getElementById("contactEmail").value;
const userFeedback = document.getElementById("userFeedback").value;
const category = document.getElementById("categoryDropdown").value;

document.addEventListener("DOMContentLoaded", function () {
  const feedbackForm = document.getElementById("feedbackForm");

  if (feedbackForm) {
    feedbackForm.addEventListener("submit", (event) => {
      event.preventDefault(); //Prevent default form submission on page reload
    });
  }
});

formBtn.addEventListener("click", () => {
  alert("Another tab will open automatically to show the submission was successful. Please return to this tab and reload the page to clear the form. Thank you!");
});
