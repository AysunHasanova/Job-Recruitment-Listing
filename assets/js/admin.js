let Job_API = "http://localhost:3000/jobs";
let Mock_API = "http://localhost:3000/users";
let jobBody = document.querySelector(".jobTable");
let userBody = document.querySelector(".userTable");
$(document).ready(function () {
  $("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("menuDisplayed");
    $(".admin").toggleClass("adminContent");
  });
});

async function drawTable(arr) {
  jobBody.innerHTML = "";
  arr.forEach((element) => {
    jobBody.innerHTML += `
    <tr>
    <td class="id">${element.id}</td>
    <td><img src=${element.image}></td>
    <td>${element.company}</td>
    <td>${element.nameJob}</td>
    <td>${element.country},${element.city}</td>
    <td>$${element.firstprice}k-${element.lastprice}k</td>
    <td>
    <button class="primary edit text-light" onclick="window.dialog.showModal();">
    <i class="fa-solid fa-pen-nib"></i>
        </button>
    
    <button class="btn btn-danger text-light"><i class="fa-solid fa-trash"></i></button>
    </td>
    </tr>
    `;
  });
}
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
    <button class="primary edit text-light" onclick="window.dialog.showModal();">
    <i class="fa-solid fa-pen-nib"></i>
        </button>
    <button class="btn btn-danger text-light"><i class="fa-solid fa-trash"></i></button>
    </td>
    </tr>
    `;
  });
}
async function jobTable() {
  let res = await axios(Job_API);
  let data = await res.data;
  drawTable(data);
}
jobTable();
async function userTable() {
  let res = await axios(Mock_API);
  let data = await res.data;
  drawUserTable(data);
}
userTable();
