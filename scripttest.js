
const api = "9818f918e9d02e8a934463e2e7602786";
     
const btn = document.getElementById("btn");
  btn.addEventListener("click", () => {
    const city = document.getElementById("city").value;
    if (city) {
      fetchWeather(city);
    } else {
      displayError("Please enter a city name.");
    }
});

 function fetchWeather(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},us&appid=${api}&units=metric`;

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
      
  }

  function displayWeather(data) {
    document.getElementById("error-message").textContent = "";
    document.getElementById("city-name").textContent = `Weather in ${data.name}`;
    document.getElementById("temperature").textContent = `Current Temperature: ${data.main.temp} C`;
    document.getElementById("feels-like").textContent = `Feels like: ${data.main.feels_like} C`;
    document.getElementById("description").textContent = `Condition: ${data.weather[0].description}`;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
  }

  function displayError(message) {
    document.getElementById("error-message").textContent = message;
    document.getElementById("city-name").textContent = "";
    document.getElementById("temperature").textContent = "";
    document.getElementById("description").textContent = "";
    document.getElementById("humidity").textContent = "";
  }



    //  async function fetchUser() {
    //     try {
    //         const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Colorado,us&APPID=9818f918e9d02e8a934463e2e7602786");
    //         const weather = await response.json();
    //         console.log("weather = ", weather);
    //     } catch (error) {
    //         console.error("Error fetching user:", error);// error message didn't display ?
    //     };
    // }

    // fetchUser();

 