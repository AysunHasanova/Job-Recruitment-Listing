
let Team_API = "http://localhost:3000/team";
let row = document.querySelector(".team");

async function drawCard(arr) {
  row.innerHTML = "";
  arr.forEach((element) => {
    row.innerHTML += `

    <div class="col col-3 text-center">
    <img src=${element.image} alt="" />
    <h2>${element.member}</h2>
    <p>${element.position}</p>
    <ul class="d-flex gap-2 align-items-center justify-content-center">
      <li>
        <a href=${element.google}><i class="fa-brands fa-google"></i></a>
      </li>
      <li>
        <a href=${element.behance}><i class="fa-brands fa-behance"></i></a>
      </li>
      <li>
        <a href=${element.insta}><i class="fa-brands fa-instagram"></i></a>
      </li>
      <li>
        <a href=${element.windows}><i class="fa-brands fa-windows"></i></a>
      </li>
    </ul>
  </div>
    `;
  });
}

async function team() {
  let res = await axios(Team_API);
  let data = res.data;
  drawCard(data)
}
team()