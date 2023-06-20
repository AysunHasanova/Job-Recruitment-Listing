let nums = document.querySelectorAll(".num");
let numbers = document.querySelectorAll(".number");
let interval = 5000;
let intervalNum = 8000;
let menu = document.querySelector("#menu");
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
let Job_API = "http://localhost:3000/jobs";
let rowJob = document.querySelector("#job-row");
let jobSearch = document.querySelector(".search");
let userProfile = document.querySelector(".user-profile");
let savedJob = document.querySelector(".save");
let idUser = new URLSearchParams(window.location.search).get("id");

axios(`${Mock_API}/${idUser}`).then((res) => {
  userProfile.innerHTML = `<a href="" class="text-light" ><i class="fa-solid fa-user"></i> ${res.data.username}</a>
  <a href="index.html" class="text-light mx-1" onclick=deleteUser(${idUser})><i class="fa-solid fa-right-from-bracket"></i></a>
  `;
  savedJob.innerHTML = `<a href="./saved.html"><i class="fa-solid fa-bookmark"></i></a>`;
});
async function deleteUser(id) {
  await axios.delete(`${Mock_API}/${id}`);
}

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

function drawCard(arr) {
  rowJob.innerHTML = "";
  arr.forEach((element) => {
    rowJob.innerHTML += `
    <div class="col col-4 card py-3 px-2">
            <div class="d-flex align-items-center justify-content-around">
              <img src=${element.image} alt="" />
              <div class="mx-3">
                <p class="city">${element.country}, ${element.city}</p>
                <h3 class="marka">${element.company}</h3>
              </div>
            </div>
            <hr />
            <div class="d-flex align-items-center justify-content-between">
              <p><i class="fa-solid fa-clock-rotate-left"></i> Remote</p>
              <p><i class="fa-solid fa-clock-rotate-left"></i> Full time</p>
            </div>
            <p class="pb-3">
              <i class="fa-solid fa-clock-rotate-left"></i> Part time
            </p>
            <h5>${element.nameJob}</h5>
            <p class="text-start">
              ${element.aboutJob}
            </p>
            <div class="text-start">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-regular fa-star-half-stroke"></i>
            </div>
            <div class="text-start">
              <i class="fa-solid fa-dollar-sign"></i> <span>$${element.price}</span>
            </div>
            <div class="text-start my-4">
              <a href="" class="add" onclick=saved(${element.id})><i class="fa-solid fa-bookmark"></i></a>
              <button onclick=apply(${element.id}) class="detail">APPLY</button>
            </div>
          </div>
    `;
  });
}

async function cards() {
  let res = await axios(Job_API);
  let data = res.data;
  drawCard(data);
}
cards();

jobSearch.addEventListener("input", async function (e) {
  let res = await axios(Job_API);
  let data = await res.data;
  let filtered = data.filter((item) =>
    `${item.nameJob.toLocaleLowerCase()},${item.company.toLocaleLowerCase()}`.includes(
      e.target.value.toLocaleLowerCase()
    )
  );
  drawCard(filtered);
});
let allJob = JSON.parse(localStorage.getItem("Saved")) || [];
// console.log(allJob);
async function saved(id) {
  if (idUser) {
    let res = await axios(Job_API);
    let data = await res.data;
    let selectedObj = allJob.find((item) => item.id == id);
    if (!allJob.includes(selectedObj)) {
      let savedJob = data.find((obj) => obj.id == id);
      allJob.push(savedJob);
      localStorage.setItem("Saved", JSON.stringify(allJob));
    } else {
      alert("You are already saved");
    }
  } else {
    alert("You need sign");
  }
}

function apply(id) {
  if (idUser) {
    window.location.href = `detail.html?id=${id}`;
  } else {
    alert("You need sign");
  }
}
