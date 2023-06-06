let form = document.querySelector("form");

let inputName = document.querySelector("#inputName");
let inputEmail = document.querySelector("#inputEmail");
let inputPassword = document.querySelector("#inputPassword");

let userData = JSON.parse(localStorage.getItem("usersData")) ?? [];
// console.log(userData);
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let userObj = {
    id: Date.now(),
    username: inputName.value,
    email: inputEmail.value,
    password: inputPassword.value,
  };
  let found = false;
  for (let i = 0; i < userData.length; i++) {
    if (userObj.username === userData[i].username) {
      found = true;
      break;
    }
  }

  if (found) {
    alert("User is already");
  } else {
    userData.push(userObj);

    localStorage.setItem("usersData", JSON.stringify(userData));

    window.location = `login.html?id=${userObj.id}`;
  }
});
