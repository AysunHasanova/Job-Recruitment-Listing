let Job_API = "http://localhost:3000/jobs";

let jobBody = document.querySelector(".jobTable");

let submitBtn = document.querySelector(".btn-primary")

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

async function jobTable() {
  let res = await axios(Job_API);
  let data = await res.data;
  drawTable(data);
}
jobTable();


