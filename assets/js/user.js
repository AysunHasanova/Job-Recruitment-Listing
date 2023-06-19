let Mock_API = "http://localhost:3000/users";
let tBody = document.querySelector(".userTable");
let userForm = document.querySelector("form");
let userName = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let submitBtn = document.querySelector(".btn-primary");
let isAdmin = document.querySelector("#isAdmin");
let searchInput = document.querySelector("#search");
let editBtn = document.querySelector(".edit");
let editedId;

$(document).ready(function () {
  $("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("menuDisplayed");
    $(".admin").toggleClass("adminContent");
  });
});

let body = document.querySelector("body");
let modeToggle = body.querySelector(".mode-toggle");
let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
  body.classList.toggle("dark");
  tBody.classList.add("table-dark");
}
modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    localStorage.setItem("mode", "dark");
  } else {
    localStorage.setItem("mode", "light");
  }
});

async function drawUserTable(arr) {
  tBody.innerHTML = "";
  arr.forEach((element) => {
    tBody.innerHTML += `
      <tr>
      <td class="id">${element.id}</td>
      <td>${element.username}</td>
      <td>${element.email}</td>
      <td>${element.password}</td>
      <td>
      <button  class="primary edit text-light" onclick="window.dialog.showModal();editFun(${element.id});">
      <i class="fa-solid fa-pen-nib"></i>
          </button>
      <button class="btn btn-danger text-light" onclick=deleteUser(${element.id})><i class="fa-solid fa-trash"></i></button>
      </td>
      </tr>
      `;
  });
}
async function userTable() {
  let res = await axios(Mock_API);
  let data = await res.data;
  drawUserTable(data);
}
userTable();
async function deleteUser(id) {
  await axios.delete(`${Mock_API}/${id}`);
}

async function createUser() {
  const userObj = {
    username: userName.value,
    email: email.value,
    password: password.value,
    isAdmin: isAdmin.value,
  };
  await axios.post(Mock_API, userObj);
  userTable();
}

async function editUser(id) {
  const userObj = {
    username: userName.value,
    email: email.value,
    password: password.value,
    isAdmin: isAdmin.value,
  };
  await axios.patch(`${Mock_API}/${id}`, userObj);
  userTable();
}

async function editFun(id) {
  editedId = id;
  let res = await axios(`${Mock_API}/${id}`);
  let data = await res.data;
  userName.value = data.username;
  email.value = data.email;
  password.value = data.password;
  isAdmin.value = data.isAdmin;
  submitBtn.innerHTML = "Edit";
}

userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(isAdmin.value);
  if (submitBtn.innerHTML == "Submit") {
    createUser();
  } else {
    editUser(editedId);
    
    submitBtn.innerHTML = "Submit";
  }
  userName.value = "";
  email.value = "";
  password.value = "";
});

searchInput.addEventListener("input", async function (e) {
  let res = await axios(Mock_API);
  let data = await res.data;
  let filtered = data.filter((item) =>
    item.username
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase())
  );
  drawUserTable(filtered);
});
