
const localApiURL = "https://api.openweathermap.org/data/2.5/weather?q=Colorado,us&APPID=9818f918e9d02e8a934463e2e7602786"
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
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;

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
    document.getElementById("feels-like").textContent = "";
    document.getElementById("description").textContent = "";
    document.getElementById("humidity").textContent = "";
  }
//Challenges
//add Weather Icons: Use weather icons from the API response.
//add Styling
//add forecast: show a 5-day weather forecast

//add Geolocation: Automatically detect the user's location and display the weather.
//  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

 function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    //use these coordinates to fetch weather data
    fetchWeatherByCoordinates(latitude, longitude);
 }

    function errorCallback(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                console.error("User denied the request for Geolocation.");
                // Optionally, prompt the user to manually enter a location
                break;
            case error.POSITION_UNAVAILABLE:
                console.error("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                console.error("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                console.error("An unknown error occurred.");
                break;
        }
    }


  async function fetchWeatherByCoordinates(latitude, longitude) {
    try {
         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${api}`);
         const weather = await response.json();
         displayWeather(weather);
         //console.log("weather = ", weather);
    } catch (error) {
         console.error("Error fetching weather data:", error);
         displayError("Could not fetch local weather");
    };
  }

    
   const localBtn = document.getElementById("localBtn");
   if (localBtn) {
    localBtn.addEventListener("click", () => {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
   });
  }

 