let contactRow = document.querySelector(".contact");
let Message_API = "http://localhost:3000/messages";
let searchInput = document.querySelector("#search")

$(document).ready(function () {
  $("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("menuDisplayed");
    $(".admin").toggleClass("adminContent");
  });
});

async function drawCard(arr) {
  contactRow.innerHTML = "";
  arr.forEach((element) => {
    contactRow.innerHTML += `
      <div class="col col-4 card">
            <a href="" onclick=deleteMes(${element.id}) class=" text-danger "><i class="fa-solid fa-trash"></i></a>
            <p><b>Name:</b> ${element.name}</p>
            <p><b>Phone:</b> ${element.phone}</p>
            <p><b>Email:</b> ${element.email}</p>
            <p><b>Subject:</b> ${element.subject}</p>
            <p>
             <b>Message:</b> ${element.message}
            </p>
  
          </div>
      `;
  });
}
drawCard();

async function messages() {
  let res = await axios(Message_API);
  let data = await res.data;
  drawCard(data);
}
messages()

async function deleteMes(id) {
  await axios.delete(`${Message_API}/${id}`);
}

searchInput.addEventListener("input", async function (e) {
  let res = await axios(Message_API);
  let data = await res.data;
  let filtered = data
    .filter((item) =>
      item.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()) 
    );
  drawCard(filtered);
});
