let form = document.querySelector("form");

let inputEmail = document.querySelector("#exampleInputEmail1");
let inputPassword = document.querySelector("#exampleInputPassword1");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (inputEmail && inputPassword) {
    let allUsers = JSON.parse(localStorage.getItem("usersData"));
    let userObj = allUsers.find(
      (item) =>
        item.email === inputEmail.value && item.password === inputPassword.value
    );
    if (userObj) {
      localStorage.setItem("userName", userObj.username);
      window.location = "index.html";
    } else {
      alert("No user you need register");
    }
  }
});
