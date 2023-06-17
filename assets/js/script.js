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

// signForm.addEventListener("submit", async function (e) {
//   e.preventDefault();
//   let userObj = {
//     username: username.value,
//     email: signEmail.value,
//     password: signPassword.value,
//   };
//   await axios.post(Mock_API, userObj);
// });

async function api() {
  let res = await axios(Mock_API);
  let data = res.data;
  signForm.addEventListener("submit", async function (e) {
    e.preventDefault();
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
      alert("User is already");
    } else {
      await axios.post(Mock_API, userObj);
      alert("Account created")
      
    }
  });
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      let userEmail = data.find((item) => item.email === loginEmail.value);
      let userPassword = data.find(
        (item) => item.password === loginPassword.value
      );

      if (userEmail && userPassword) {
        window.location = "index.html";
      } else if (!userPassword && userEmail) {
        alert("Password is wrong!");
      } else {
        alert("No user found, you need sign up");
      }
    }
  });
}
api();
