let Job_API = "http://localhost:3000/jobs";
let Mock_API = "http://localhost:3000/users";
let jobBody = document.querySelector(".jobTable");
let submitBtn = document.querySelector(".btn-primary");
let jobName = document.querySelector("#jobName");
let aboutJob = document.querySelector("#about");
let companyName = document.querySelector("#companyName");
let city = document.querySelector("#city");
let country = document.querySelector("#country");
let price = document.querySelector("#firstPrice");
let imgFile = document.querySelector("#image");
let jobForm = document.querySelector("form");
let tBody = document.querySelector("tbody");
let searchInput = document.querySelector("#search");

let base64;
let editedId;

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
    <td>${element.aboutJob}</td>
    <td>${element.country},${element.city}</td>
    <td>$${element.price}</td>
    <td>
    <a class="primary edit text-success" onclick="window.dialog.showModal();editFun(${element.id});">
    <i class="fa-solid fa-pen-nib"></i>
        </a>
    
    <a class=" text-danger" onclick=deleteUser(${element.id})><i class="fa-solid fa-trash"></i></a>
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

async function deleteUser(id) {
  await axios.delete(`${Job_API}/${id}`);
}

async function createJob() {
  const jobObj = {
    nameJob: jobName.value,
    company: companyName.value,
    aboutJob: aboutJob.value,
    city: city.value,
    country: country.value,
    price: price.value,
    image: base64,
  };
  await axios.post(Job_API, jobObj);
  jobTable();
}

async function editJob(id) {
  const jobObj = {
    nameJob: jobName.value,
    company: companyName.value,
    aboutJob: aboutJob.value,
    city: city.value,
    country: country.value,
    price: price.value,
    image: base64,
  };
  await axios.patch(`${Job_API}/${id}`, jobObj);
  jobTable();
}

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const uploadImage = async (event) => {
  const file = event.target.files[0];
  base64 = await convertBase64(file);
};

imgFile.addEventListener("change", (e) => {
  uploadImage(e);
});

async function editFun(id) {
  editedId = id;
  let res = await axios(`${Job_API}/${id}`);
  let data = await res.data;
  jobName.value = data.nameJob;
  companyName.value = data.company;
  city.value = data.city;
  country.value = data.country;
  price.value = data.price;
  aboutJob.value = data.aboutJob;

  submitBtn.innerHTML = "Edit";
}

jobForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (submitBtn.innerHTML == "Submit") {
    createJob();
  } else {
    editJob(editedId);
    submitBtn.innerHTML = "Submit";
  }

  jobName.value = "";
  companyName.value = "";
  city.value = "";
  country.value = "";
  price.value = "";
  aboutJob.value = "";
});

searchInput.addEventListener("input", async function (e) {
  let res = await axios(Job_API);
  let data = await res.data;
  let filtered = data.filter((item) =>
    item.company
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase())
  );
  drawTable(filtered);
});
