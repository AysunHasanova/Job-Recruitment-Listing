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
let categorySearch = document.querySelector("#category-search");
let areaSearch = document.querySelector("#area-search");

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
                <p class="marka">${element.company}</p>
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
              <a href="" class="add"><i class="fa-solid fa-bookmark"></i></a>
              <a href="detail.html?id=${element.id}" class="detail">APPLY</a>
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

categorySearch.addEventListener("change", async function (e) {
  let res = await axios(Job_API);
  let data = await res.data;
  let filtered = data.filter((item) =>
    item.nameJob
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase())
  );
  drawCard(filtered);
});
areaSearch.addEventListener("change", async function (e) {
  let res = await axios(Job_API);
  let data = await res.data;
  let filtered = data.filter((item) =>
    item.country
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase())
  );
  drawCard(filtered);
});
