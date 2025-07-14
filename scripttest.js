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

