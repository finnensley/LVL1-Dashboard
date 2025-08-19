//Refactoring Practice -bkgImage

if (input && page && !body.classList.contains("light")) {
    page.style.backgroundImage = `url(${savedBkgImg})`;
    updatePlaceholder(urlInput, "bkgImg")
} else if (urlInput) {
  updatePlaceholder(urlInput, "bkgImg");
}

if (bkgBtn && urlInput && page) {
  bkgBtn.addEventListener("click", () => {
    changeBackground(page, urlInput, "bkgImg");
  });
}

//Greeting Page
const urlInputGreet = document.getElementById("urlInputGreet");
const bkgBtnGreet = document.getElementById("bkgBtnGreet");
const greetingPage = document.querySelector(".greeting");
const savedBkgImgGreet = localStorage.getItem("bkgImgGreet");

//loads the background image on page load and excludes loading localStorage to light mode page
if (savedBkgImgGreet && greetingPage && !body.classList.contains("light")) {
  greetingPage.style.backgroundImage = `url(${savedBkgImgGreet})`;
  updatePlaceholder(urlInputGreet, "bkgImgGreet")
} else if (urlInputGreet) {
  updatePlaceholder(urlInputGreet, "bkgImgGreet");
}

//added "bkgImgGreet" to changeBackground()
if (bkgBtnGreet && urlInputGreet && greetingPage) {
  bkgBtnGreet.addEventListener("click", () => {
    changeBackground(greetingPage, urlInputGreet, "bkgImgGreet");
  });
}

function getElements() {
  if (!body.classList.contains("light")) {

  }
}

//Generic function
function changeBackground(page, input, bkgImg) {
  const url = input.value.trim();
  if (url && !(url.endsWith("jpg") || url.endsWith(".jpeg") || url.endsWith(".png"))) {
    input.value = "";
    alert("Please enter a valid image URL (.jpg, .jpeg, .png).")
    return;
  }
  if (url.endsWith(".jpg") && page || url.endsWith(".jpeg") && page || url.endsWith(".png") && page) {
    page.style.backgroundImage = `url(${url})`;
    localStorage.setItem(bkgImg, url); // Save to localStorage

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
    localStorage.removeItem(bkgImg); //Remove from localStorage

    if (page.classList.contains("tasks")) {//Removes listBkgChange class from tasks page 
      page.classList.remove("listBkgChange");
    }

    if (page.classList.contains("notes")) {//Removes notesBkgChange class from notes page
      page.classList.remove("notesBkgChange");
    }
    input.placeholder = "Image URL";
  }
  updatePlaceholder(input, bkgImg);
};

 //bkgImgKey is same as storageKey (which is commonly used for the key used for localStorage)
function updatePlaceholder(input, bkgImgStorageKey) {
  const savedBkgImg = localStorage.getItem(bkgImgStorageKey);
  if(savedBkgImg) {
    input.placeholder = "Click for default image";
  } else {
    input.placeholder = "Image URL";
  }
}


//tested using https://www.lifeinthefingerlakes.com/wp-content/uploads/2019/10/finger-lakes-sunset.jpg
//Find an image, open it in a new tab, copy url
//seeing a light background img for testing: https://images.pexels.com/photos/13133637/pexels-photo-13133637.jpeg
//right click on image to copy image link from pexels
//action = "https://script.google.com/macros/s/AKfycbx2jjQOs6gxbBnDkQSSsGhqaa_lMM9irwEST_svx5LQWSvAjrS6dV-qUk_Z3D_waKHXqA/exec" // url points back to nondeployed local feedback.html page








