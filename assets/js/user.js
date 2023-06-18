let Mock_API = "http://localhost:3000/users";
let userBody = document.querySelector(".userTable");
let userForm = document.querySelector("form");
let userName = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let submitBtn = document.querySelector(".btn-primary");
let editedId;

$(document).ready(function () {
  $("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("menuDisplayed");
    $(".admin").toggleClass("adminContent");
  });
});

async function drawUserTable(arr) {
  userBody.innerHTML = "";
  arr.forEach((element) => {
    userBody.innerHTML += `
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
      };
    await axios.post(Mock_API, obj);
    userTable();
  }

async function editUser(id) {
  const userObj = {
    username: userName.value,
    email: email.value,
    password: password.value,
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
  submitBtn.innerHTML = "Edit";
}

userForm.addEventListener("submit", (e) => {
  e.preventDefault();

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
