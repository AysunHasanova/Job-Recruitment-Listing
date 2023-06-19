let Mock_API = "http://localhost:3000/users";
let menu = document.querySelector("#menu");
let nav = document.querySelector("nav");
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
let Team_API = "http://localhost:3000/team";
let row = document.querySelector(".team");

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
    } else if (!signPassword.value && signEmail.value && username.value) {
      setSuccess(signEmail);
      setSuccess(username);
      setError(signPassword, "Password is required");
    } else if (!signEmail.value && signPassword.value && username.value) {
      setSuccess(signPassword);
      setSuccess(username);
      setError(signEmail, "Email is required");
    } else if (!signEmail.value && !signPassword.value && username.value) {
      setSuccess(username);
      setError(signEmail, "Email is required");
      setError(signPassword, "Password is required");
    } else {
      setError(signEmail, "Email is required");
      setError(signPassword, "Password is required");
      setError(username, "Username is required");
    }
  });

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (loginEmail.value && loginPassword.value) {
      let obj = data.find(
        (item) =>
          item.email === loginEmail.value &&
          item.password === loginPassword.value
      );
      let wrongPassword = data.find(
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
      } else if (wrongPassword) {
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

async function drawCard(arr) {
  row.innerHTML = "";
  arr.forEach((element) => {
    row.innerHTML += `

    <div class="col col-3 text-center">
    <img src=${element.image} alt="" />
    <h2>${element.member}</h2>
    <p>${element.job}</p>
    <ul class="d-flex gap-2 align-items-center justify-content-center">
      <li>
        <a href=${element.google}><i class="fa-brands fa-google"></i></a>
      </li>
      <li>
        <a href=${element.behance}><i class="fa-brands fa-behance"></i></a>
      </li>
      <li>
        <a href=${element.insta}><i class="fa-brands fa-instagram"></i></a>
      </li>
      <li>
        <a href=${element.windows}><i class="fa-brands fa-windows"></i></a>
      </li>
    </ul>
  </div>
    `;
  });
}

async function team() {
  let res = await axios(Team_API);
  let data = res.data;
  drawCard(data)
}
team()