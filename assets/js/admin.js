let Job_API = "http://localhost:3000/jobs";
let jobBody = document.querySelector(".jobTable");
let submitBtn = document.querySelector(".btn-primary");
let jobName = document.querySelector("#jobName");
let companyName = document.querySelector("#companyName");
let city = document.querySelector("#city");
let country = document.querySelector("#country");
let firstPrice = document.querySelector("#firstPrice");
let lastPrice = document.querySelector("#lastPrice");
let imgFile = document.querySelector("#image");
let jobForm = document.querySelector("form");
let base64;
let editedId;

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
    <button class="primary edit text-light" onclick="window.dialog.showModal();editFun(${element.id});">
    <i class="fa-solid fa-pen-nib"></i>
        </button>
    
    <button class="btn btn-danger text-light" onclick=deleteUser(${element.id})><i class="fa-solid fa-trash"></i></button>
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
    city: city.value,
    country: country.value,
    firstprice: firstPrice.value,
    lastprice: lastPrice.value,
    image: base64,
  };
  await axios.post(Job_API, jobObj);
  jobTable();
}

async function editJob(id) {
  const jobObj = {
    nameJob: jobName.value,
    company: companyName.value,
    city: city.value,
    country: country.value,
    firstprice: firstPrice.value,
    lastprice: lastPrice.value,
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
  firstPrice.value = data.firstprice;
  lastPrice.value = data.lastprice;

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
  firstPrice.value = "";
  lastPrice.value = "";
});
