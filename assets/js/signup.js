let form = document.querySelector("form");

let inputName = document.querySelector("#inputName");
let inputEmail = document.querySelector("#inputEmail");
let inputPassword = document.querySelector("#inputPassword");

let userData = JSON.parse(localStorage.getItem("usersData")) ?? [];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let userObj = {
    username: inputName.value,
    email: inputEmail.value,
    password: inputPassword.value,
  };

  userData.push(userObj);

  localStorage.setItem("usersData", JSON.stringify(userData));

  window.location = "login.html";
});
