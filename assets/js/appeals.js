let contactRow = document.querySelector(".contact");
let Appeals_API = "http://localhost:3000/appeals";
let searchInput = document.querySelector("#search");

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
  // tBody.classList.add("table-dark");
}
modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    localStorage.setItem("mode", "dark");
  } else {
    localStorage.setItem("mode", "light");
  }
});

async function drawCard(arr) {
  contactRow.innerHTML = "";
  arr.forEach((element) => {
    contactRow.innerHTML += `
      <div class="col col-4 card">

            <a href="" onclick=deleteMes(${element.id}) class=" text-danger "><i class="fa-solid fa-trash"></i></a>
            <h4><b>${element.company}</b></h4>
            <p><b>Name:</b> ${element.name}</p>
            <p><b>Phone:</b> ${element.phone}</p>
            <p><b>Email:</b> ${element.email}</p>
            <p>
             <b>Message:</b> ${element.message}
            </p>
  
          </div>
      `;
  });
}
drawCard();

async function messages() {
  let res = await axios(Appeals_API);
  let data = await res.data;
  drawCard(data);
}
messages();

async function deleteMes(id) {
  await axios.delete(`${Appeals_API}/${id}`);
}

searchInput.addEventListener("input", async function (e) {
  let res = await axios(Appeals_API);
  let data = await res.data;
  let filtered = data.filter((item) =>
    item.company.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  drawCard(filtered);
});
