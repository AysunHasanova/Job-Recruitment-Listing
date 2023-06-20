let applyForm = document.querySelector(".apply-form");
let nameInp = document.querySelector("#name");
let emailInp = document.querySelector("#email");
let phoneInp = document.querySelector("#phone");
let messageInp = document.querySelector("#message");
let companyInp = document.querySelector("#company");
let id = new URLSearchParams(window.location.search).get("id");
let jobName = document.querySelector("#job");
let price = document.querySelector("#price");
let city = document.querySelector(".city");
let company = document.querySelector(".marka");
let country = document.querySelector(".country");
let image = document.querySelector(".img");
let Job_API = "http://localhost:3000/jobs";
let Appeals_API = "http://localhost:3000/appeals";
let base64;

axios(`${Job_API}/${id}`).then((res) => {
  companyInp.value = res.data.company;
  price.innerHTML = ` <i class="fa-solid fa-dollar-sign" style="color:#ffbb33;" ></i> $${res.data.price} `;
  jobName.innerHTML = `${res.data.nameJob}`;
  city.innerHTML = `${res.data.country},${res.data.city}`;
  company.innerHTML = `${res.data.company}`;
  image.innerHTML = ` <img src=${res.data.image} class="company-img" alt="" />`;
});

applyForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  let applyObj = {
    name: nameInp.value,
    email: emailInp.value,
    phone: phoneInp.value,
    message: messageInp.value,
    company: companyInp.value,
  };
  await axios.post(Appeals_API, applyObj);
});

