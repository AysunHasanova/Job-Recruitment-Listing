let form = document.querySelector("form");

let inputEmail = document.querySelector("#exampleInputEmail1");
let inputPassword = document.querySelector("#exampleInputPassword1");
let id = new URLSearchParams(window.location.search).get("id");
let allUsers = JSON.parse(localStorage.getItem("usersData"));

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (inputEmail && inputPassword) {
    let userEmail = allUsers.find((item) => item.email === inputEmail.value);
    let userPassword = allUsers.find(
      (item) => item.password === inputPassword.value
    );

    if (userEmail && userPassword) {
      // localStorage.setItem("userName", userObj.username);
      window.location = "index.html";
    } else if (!userPassword && userEmail) {
      alert("Password is wrong!");
    } else {
      alert("No user found, you need sign up");
    }
  }
});
