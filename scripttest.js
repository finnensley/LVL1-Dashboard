// const urlInput = document.getElementById("backgroundImgInput");
// const changeBackgroundBtn = document.getElementById("changeBackgroundBtn");
// const greetingPage = document.querySelector(".greeting");

// changeBackgroundBtn.addEventListener("click", () => {
//     changeBackground(greetingPage);
//   });




//.greeting, background-image: url(images/....jpg)

// function changeBackground(page){
//     const url = urlInput.value.trim();
//   if (url && greetingPage) {
//     page.style.backgroundImage = `url(${url})`;
//   };
// };

// one handler for all pages including light mode:
// document.querySelectorAll(".bkgBtn").forEach((btn) => {
//   btn.addEventListener("click", () => {
//     const inputId = btn.getAttribute("data-input");
//     const input = document.getElementById(inputId);
//     const targetSelector = input.getAttribute("data-target");
//     const page = document.querySelector(targetSelector);

//     if (!input || !page) return;

//     if (body.classList.contains("light")) {
//       input.type = "color";
//       const color = input.value;
//       page.style.backgroundColor = color;
//       page.style.backgroundImage = "";
//     } else {
//       input.type = "text";
//       const url = input.value.trim();
//       page.style.backgroundImage = url ? `url(${url})` : "";
//       page.style.backgroundColor = "";
//     }
//   });
// });

//tested using https://www.lifeinthefingerlakes.com/wp-content/uploads/2019/10/finger-lakes-sunset.jpg
//Find an image, open it in a new tab, copy url
//seeing a light background img for testing: https://images.pexels.com/photos/13133637/pexels-photo-13133637.jpeg
//right click on image to copy image link from pexels

// if (urlInputGreet) {
//  url.includes(".jpg")
// }

// if (urlInput) {
//   url.endsWith(".jpg")
//   page.styles
// }
// const currentDate = new Date();
// const hour = currentDate.getHours();
// const currentHour = document.getElementById("current-hour");
// const currentDay = document.getElementById("current-date");
// const currentTime = document.getElementById("current-time");
// const dateValue = document.getElementById("dateInput").value;
// const feedbackForm = document.getElementById("feedbackForm");
// const formBtn = document.getElementById("formBtn");

// window.addEventListener("load", () => {
//   if(dateValue && submitBtn) {
//     addDate()
// }
// })

// function addDate(date, time){
//   date = currentDate.toDateString();
//   time = currentDate.toLocaleTimeString();
//   dateValue.textContent = `${date} ${time}`;
//   console.log(dateValue);
// }

// addDate();
window.addEventListener("DOMContentLoaded", () => {
  const feedbackForm = document.getElementById("feedbackForm");
  const hiddenDateInput =  document.getElementById("dateInput")
  

  if (feedbackForm) {
  feedbackForm.addEventListener("submit", (event) => {
    const now = new Date();
    
    hiddenDateInput.value = `${now.toLocaleString()}`;
    hiddenDateInput.type = "text"; 
    // event.preventDefault();
    console.log("Hidden input value:", hiddenDateInput.value);
  });
}
});





