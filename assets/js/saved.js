let savedJobs = JSON.parse(localStorage.getItem("Saved")) || [];
let row = document.querySelector(".row");

savedJobs.forEach((element) => {
    row.innerHTML += `
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
            <a href="" class="btn btn-danger">Delete</a>
              <button onclick=apply(${element.id}) class="detail">APPLY</button>
            </div>
          </div>
    `;
});

let allRemoveBtns = document.querySelectorAll(".btn-danger");

allRemoveBtns.forEach((item) => {
  item.addEventListener("click", function () {
    // console.log("salam");
    favorits = JSON.parse(localStorage.getItem("Saved"));

    // let index = favorits.findIndex((e) => e.id == item.id);
    // console.log(index);
    // favorits.splice(index, 1);

    let updatedJob = savedJobs.filter(
      (el) => el.id != item.getAttribute("id")
    );

    localStorage.setItem("Saved", JSON.stringify(updatedJob));

    // this.parentElement.parentElement.parentElement.remove();
    this.closest("span").remove();
  });
});