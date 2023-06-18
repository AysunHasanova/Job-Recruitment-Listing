let nums = document.querySelectorAll(".num");
let numbers = document.querySelectorAll(".number");
let interval = 5000;
let intervalNum = 8000;
let menu = document.querySelector("#menu");
let nav = document.querySelector("nav");
let Mock_API = "http://localhost:3000/users";
let loginEmail = document.querySelector(".login-email");
let loginPassword = document.querySelector(".login-password");
let username = document.querySelector(".username");
let signEmail = document.querySelector(".sign-email");
let signPassword = document.querySelector(".sign-password");
let loginForm = document.querySelector(".login");
let signForm = document.querySelector(".sign");
const formOpenBtn = document.querySelector("#form-open"),
  home = document.querySelector(".content");
formContainer = document.querySelector(".form_container");
formCloseBtn = document.querySelector(".form_close");
signupBtn = document.querySelector("#signup");
loginBtn = document.querySelector("#login");
let Job_API = "http://localhost:3000/jobs";
let rowJob = document.querySelector("#job-row");

nums.forEach((num) => {
  let startNum = 0;
  let endNum = parseInt(num.getAttribute("data-val"));
  let duration = Math.floor(interval / endNum);
  let counter = setInterval(function () {
    startNum += 10;
    num.textContent = startNum;
    if (startNum == endNum) {
      clearInterval(counter);
    }
  }, duration);
});

numbers.forEach((num) => {
  let startNum = 0;
  let endNum = parseInt(num.getAttribute("data-val"));
  let duration = Math.floor(intervalNum / endNum);
  let counter = setInterval(function () {
    startNum += 1;
    num.textContent = startNum;
    if (startNum == endNum) {
      clearInterval(counter);
    }
  }, duration);
});

menu.addEventListener("click", function () {
  nav.classList.toggle("show");
  this.classList.contains("fa-bars")
    ? (this.classList = "fa-solid fa-xmark")
    : (this.classList = "fa-solid fa-bars");
});

let body = document.querySelector("body");
let modeToggle = body.querySelector(".mode-toggle");
let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
  body.classList.toggle("dark");
}
modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    localStorage.setItem("mode", "dark");
  } else {
    localStorage.setItem("mode", "light");
  }
});

formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
});
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
});

async function api() {
  let res = await axios(Mock_API);
  let data = res.data;
  signForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (signEmail.value && signPassword.value && username.value) {
      let userObj = {
        username: username.value,
        email: signEmail.value,
        password: signPassword.value,
        isAdmin: "false",
      };
      let found = false;
      for (let i = 0; i < data.length; i++) {
        if (userObj.username === data[i].username) {
          found = true;
          break;
        }
      }

      if (found) {
        setError(username, "User is already");
        setError(signEmail, "");
        setError(signPassword, "");
      } else {
        await axios.post(Mock_API, userObj);
      }
    } else {
      setError(signEmail, "Email is required");
      setError(username, "Username is required");
      setError(signPassword, "Password is required");
    }
  });
  //  let obj=data.find(item=> item.user
  //   )
  // let obj = arr.find(item => item.email == email.value && item.password);
  // if(obj)){
  //   if(obj.isadmin==="true"){
  //     window.location = "admin.html"
  //   }else{
  //     window.location = "home.html"
  //   }
  // }else{

  // }

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (loginEmail.value && loginPassword.value) {
      let obj = data.find(
        (item) =>
          item.email === loginEmail.value &&
          item.password === loginPassword.value
      );
      let notobj = data.find(
        (item) =>
          item.email === loginEmail.value &&
          item.password !== loginPassword.value
      );
      if (obj) {
        if (obj.isAdmin) {
          window.location = "/admin/admin.html";
        } else {
          window.location = "index.html";
        }
      } else if (notobj) {
        setSuccess(loginEmail);
        setError(loginPassword, "Password is wrong");
      } else {
        setError(loginEmail, "User not found");
        setError(loginPassword, "");
      }
    } else {
      setError(loginEmail, "Email is required");
      setError(loginPassword, "Password is required");
    }
  });
}
api();

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

function drawCard(arr) {
  rowJob.innerHTML = "";
  arr.forEach((element) => {
    rowJob.innerHTML += `
    <div class="col col-4 card py-3 px-2">
            <div class="d-flex align-items-center justify-content-around">
              <img src=${element.image} alt="" />
              <div class="mx-3">
                <p class="city">${element.country}, ${element.city}</p>
                <p class="marka">${element.company}</p>
              </div>
            </div>
            <hr />
            <div class="d-flex align-items-center justify-content-between">
              <p><i class="fa-solid fa-clock-rotate-left"></i> Remote</p>
              <p><i class="fa-solid fa-clock-rotate-left"></i> Full time</p>
            </div>
            <p class="pb-3">
              <i class="fa-solid fa-clock-rotate-left"></i> Part time
            </p>
            <h5>${element.nameJob}</h5>
            <p class="text-start">
              ${element.aboutJob}
            </p>
            <div class="text-start">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-regular fa-star-half-stroke"></i>
            </div>
            <div class="text-start">
              <i class="fa-solid fa-dollar-sign"></i> <span>$${element.firstprice}k-$${element.lastprice}k</span>

              
            </div>
            <div class="text-start my-4">
              <a href="" class="add"><i class="fa-solid fa-bookmark"></i></a>
            </div>
          </div>
    `;
  });
}

async function cards() {
  let res = await axios(Job_API);
  let data = res.data;
  drawCard(data);
}
cards();
