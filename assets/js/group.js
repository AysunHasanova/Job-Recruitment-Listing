let searchInput = document.querySelector("#search");
let Team_API = "http://localhost:3000/team";
let tBody = document.querySelector("tbody");
let member = document.querySelector("#member");
let job = document.querySelector("#job");
let instaLink = document.querySelector("#insta");
let behanceLink = document.querySelector("#behance");
let googleLink = document.querySelector("#google");
let windowLink = document.querySelector("#windows");
let imgFile = document.querySelector("#image");
let form = document.querySelector("form");
let submitBtn = document.querySelector(".btn-primary");
let editedId;
let base64;

$(document).ready(function () {
  $("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("menuDisplayed");
    $(".admin").toggleClass("adminContent");
  });
});

async function drawTable(arr) {
  tBody.innerHTML = "";
  arr.forEach((element) => {
    tBody.innerHTML += `
      <tr>
      <td class="id">${element.id}</td>
      <td><img src=${element.image}></td>
      <td>${element.member}</td>
      <td>${element.job}</td>
      <td><a href=${element.insta}><i class="fa-brands fa-instagram"></i></a></td>
      <td><a href=${element.behance}><i class="fa-brands fa-behance"></i></a></td>
      <td><a href=${element.google}><i class="fa-brands fa-google"></i></a></td>
      <td><a href=${element.windows}><i class="fa-brands fa-windows"></i></a></td>
      <td>
      <button class="primary edit text-light" onclick="window.dialog.showModal();editFun(${element.id});">
      <i class="fa-solid fa-pen-nib"></i>
          </button>
      
      <button class="btn btn-danger text-light" onclick=deleted(${element.id})><i class="fa-solid fa-trash"></i></button>
      </td>
      </tr>
      `;
  });
}

async function teamTable() {
  let res = await axios(Team_API);
  let data = await res.data;
  drawTable(data);
}
teamTable();

async function deleted(id) {
  await axios.delete(`${Team_API}/${id}`);
}

async function createMember() {
  const teamObj = {
    member: member.value,
    job: job.value,
    insta: instaLink.value,
    behance: behanceLink.value,
    google: googleLink.value,
    windows: windowLink.value,
    image: base64,
  };
  await axios.post(Team_API, teamObj);
  teamTable();
}

async function editTeam(id) {
  const teamObj = {
    member: member.value,
    company: job.value,
    insta: instaLink.value,
    behance: behanceLink.value,
    google: googleLink.value,
    windows: windowLink.value,
    image: base64,
  };
  await axios.patch(`${Team_API}/${id}`, teamObj);
  teamTable();
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
  let res = await axios(`${Team_API}/${id}`);
  let data = await res.data;
  member.value = data.member;
  job.value = data.job;
  instaLink.value = data.insta;
  behanceLink.value = data.behance;
  googleLink.value = data.google;
  windowLink.value = data.windows;

  submitBtn.innerHTML = "Edit";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (submitBtn.innerHTML == "Submit") {
    createMember();
  } else {
    editTeam(editedId);
    submitBtn.innerHTML = "Submit";
  }

  member.value = "";
  job.value = "";
  instaLink.value = "";
  behanceLink.value = "";
  googleLink.value = "";
  windowLink.value = "";
});

searchInput.addEventListener("input", async function (e) {
    let res = await axios(Team_API);
    let data = await res.data;
    let filtered = data
      .filter((item) =>
        item.member.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()) 
      );
    drawTable(filtered);
  });