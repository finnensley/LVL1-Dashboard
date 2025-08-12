const urlInput = document.getElementById("backgroundImgInput");
const changeBackgroundBtn = document.getElementById("changeBackgroundBtn");
const greetingPage = document.querySelector(".greeting");

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
document.querySelectorAll(".bkgBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const inputId = btn.getAttribute("data-input");
    const input = document.getElementById(inputId);
    const targetSelector = input.getAttribute("data-target");
    const page = document.querySelector(targetSelector);

    if (!input || !page) return;

    if (body.classList.contains("light")) {
      input.type = "color";
      const color = input.value;
      page.style.backgroundColor = color;
      page.style.backgroundImage = "";
    } else {
      input.type = "text";
      const url = input.value.trim();
      page.style.backgroundImage = url ? `url(${url})` : "";
      page.style.backgroundColor = "";
    }
  });
});

//tested using https://www.lifeinthefingerlakes.com/wp-content/uploads/2019/10/finger-lakes-sunset.jpg
//Find an image, open it in a new tab, copy url

if (urlInputGreet) {
 url.includes(".jpg")
}

if (urlInput) {
  url.endsWith(".jpg")
  page.styles
}