let nums = document.querySelectorAll(".num");
let numbers = document.querySelectorAll(".number");
let interval = 5000;
let intervalNum = 8000;
let menu = document.querySelector(".fa-bars");
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
    if (
      signEmail.value === "" &&
      signPassword.value === "" &&
      username.value === ""
    ) {
      setError(signEmail, "Email is required");
      setError(username, "Username is required");
      setError(signPassword, "Password is required");
    } else {
      let userObj = {
        username: username.value,
        email: signEmail.value,
        password: signPassword.value,
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
    }
  });
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (loginEmail.value === "" && loginPassword.value === "") {
      setError(loginEmail, "Email is required");
      setError(loginPassword, "Password is required");
    } else {
      let userEmail = data.find((item) => item.email === loginEmail.value);
      let userPassword = data.find(
        (item) => item.password === loginPassword.value
      );
      console.log(userEmail);
      if (userEmail && userPassword) {
        window.location = "index.html";
      }
      if (userEmail && !userPassword) {
        setSuccess(loginEmail);
        setError(loginPassword, "Password is wrong");
      } else {
        setError(loginEmail, "User not found");
        setError(loginPassword, "");
      }
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

let Job_API = "http://localhost:3000/jobs";
let rowJob = document.querySelector("#job-row");

function drawCard(arr) {
  rowJob.innerHTML = "";
  arr.forEach((element) => {
    rowJob.innerHTML += `
    <div class="col col-4 card py-3 px-4">
            <div class="d-flex align-items-center justify-content-around">
              <img src=${element.image} alt="" />
              <div>
                <p class="city">${element.country}, ${element.city}</p>
                <p class="marka">${element.company}</p>
              </div>
            </div>
            <hr />
            <div class="d-flex align-items-center justify-content-between">
              <p><i class="fa-solid fa-clock-rotate-left"></i> Remote</p>
              <p><i class="fa-solid fa-clock-rotate-left"></i> Remote</p>
            </div>
            <p class="pb-3">
              <i class="fa-solid fa-clock-rotate-left"></i> Remote
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
              <a href="" class="add">+</a>
              <button class="detail">JOB DETAIL</button>
            </div>
          </div>
    `;
  });
}

async function cards(){
  let res = await axios(Job_API)
  let data = res.data
  drawCard(data)
}
cards()