//Greeting based on time of day

const currentDate = new Date();
let hour = currentDate.getHours();
const currentHour = document.getElementById("current-hour");

function greeting() {
    if (!currentHour) return; // only runs if element exists
    const morningGreeting = document.createElement("p");
    const afternoonGreeting = document.createElement("p");
    const eveningGreeting = document.createElement("p");
   
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

//Get name input to display a different user's name
const input = document.getElementById("nameInput");
const saveBtn = document.getElementById("saveBtn");
const usersname = document.getElementById("userDisplay");

const savedName = localStorage.getItem("username");
if (savedName && usersname) { // added && username to ensure code only runs if elements exist, prevent errors on other pages
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

// Load tasks from localStorage or start with empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks on page load
if (taskBtn && taskInput && taskList) { // add this to avoid loading error on other pages
  renderTasks();
  taskBtn.addEventListener("click", () => {
   const taskText = taskInput.value.trim();
   //if the input is empty, do nothing. This prevents adding blank tasks
   if (taskText === "") return;

  //adds the new task to tasks array
   tasks.push(taskText);
  //saves the updated tasks array to localStorage
   localStorage.setItem("tasks", JSON.stringify(tasks));
  // calling updates the displayed list of tasks
   renderTasks();
  //clears the input box for the next task
   taskInput.value = "";
});
}
//Render tasks function, defines the function that displays all tasks in the list
function renderTasks() {
  if (!taskList) return // Prevents error if taskList doesn't exist
  //clears any existing tasks from the list in the DOM
  taskList.innerHTML = "";
  //loops through each task in the tasks array, providing both task and it's index
  tasks.forEach((task, index) => {
    //skips rendering if empty string, keeps blank tasks from showing
    if (task.trim() === "") return; 
    const taskItem = document.createElement("li");
    taskItem.textContent = task;
    taskItem.classList.add("list");


//Remove task on click from array and updates localStorage with new array, calls renderTasks() again to update the displayed list
    taskItem.addEventListener("click", function() {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
  });

//adds the list item to the task list in the DOM
    taskList.appendChild(taskItem);
//ends the loop through all tasks
 });
// ends the function
};

//Notes
const noteBtn = document.getElementById("noteBtn");
const addNote = document.getElementById("addNote");

let noteCards = JSON.parse(localStorage.getItem("noteCards")) || [];

//Renders notes on page load
if (addNote && noteBtn) { // add this to keep from getting an error when loading 
renderNoteCards();

noteBtn.addEventListener("click", () => {
  // console.log("Button clicked!");
  noteCards.push({ text: "", theme: "light" });//Adds a blank note
  localStorage.setItem("noteCards", JSON.stringify(noteCards));

  renderNoteCards();
});
}

function renderNoteCards() {
  addNote.innerHTML = "";//clear the previous notes
  noteCards.forEach((noteObj, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("noteDiv")
    if (noteObj.theme === "light") {
      noteDiv.classList.add("light");
    } else {
      noteDiv.classList.remove("light");
    };

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
};

//Weather
// const localApiURL = "https://api.openweathermap.org/data/2.5/weather?q=Colorado,us&APPID=9818f918e9d02e8a934463e2e7602786"
const apiKey = "9818f918e9d02e8a934463e2e7602786";
const btn = document.getElementById("weatherBtn");
const cityInput = document.getElementById("cityInput");

   
if (btn) {
    btn.addEventListener("click", () => {
    //  const city = document.getElementById("cityInput").value;
    const city = cityInput.value;
     if (city) {
      fetchWeather(city);
      } else {
      displayError("Please enter a city name.");
      }
      cityInput.value = "";
})
      
};


 function fetchWeather(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    fetch(apiURL)
      .then(response => {
        if(!response.ok) {
          throw new Error ("City not found");
       }
      //console.log(response.json());
      return response.json();
    })
      .then(data => displayWeather(data))
      .catch(error => displayError(error.message));
      
  };

  function displayWeather(data) {
    document.getElementById("error-message").textContent = "";
    document.getElementById("city-name").textContent = `Weather in ${data.name}`;
    document.getElementById("temperature").textContent = `Current Temperature: ${Math.floor(data.main.temp)}°F`;
    document.getElementById("feels-like").textContent = `Feels like: ${Math.floor(data.main.feels_like)}°F`;
    document.getElementById("description").textContent = `Condition: ${data.weather[0].description}`;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
  };

  function displayError(message) {
    document.getElementById("error-message").textContent = message;
    document.getElementById("city-name").textContent = "";
    document.getElementById("temperature").textContent = "";
    document.getElementById("feels-like").textContent = "";
    document.getElementById("description").textContent = "";
    document.getElementById("humidity").textContent = "";
  };

//Display weather for the user's location

 function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    //use these coordinates to fetch weather data
    fetchWeatherByCoordinates(latitude, longitude);
 };

  function errorCallback(error) {
    console.error("Unable to get your location.");
    displayError("Unable to get your location.");
  };

  async function fetchWeatherByCoordinates(latitude, longitude) {
    try {
         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${apiKey}&units=imperial`);
         const weather = await response.json();
         displayWeather(weather);
         console.log("weather = ", weather);
    } catch (error) {
         console.error("Error fetching weather data:", error);
         displayError("Could not fetch local weather");
    };
  };

    
   const localBtn = document.getElementById("localBtn");
   if (localBtn) {
    localBtn.addEventListener("click", () => {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
   });
  };

  //Light Mode Toggle
  const body = document.body;
  const lightModeBtn = document.getElementById("toggleModeBtn");

  function toggleLightMode() {
    body.classList.toggle("light");
    const theme = body.classList.contains("light") ? "light" : "dark";
    lightModeBtn.innerText = theme === "light" ? "Image Mode" : "Light Mode";
    localStorage.setItem("theme", theme);
  };

    function loadTheme() {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "light") {
        body.classList.add("light");
        lightModeBtn.innerText = "Image Mode";
      }
    };
    loadTheme();
    lightModeBtn.addEventListener("click", toggleLightMode);
    