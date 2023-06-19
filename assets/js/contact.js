let contactForm = document.querySelector(".contact-form");
let Message_API = "http://localhost:3000/messages";
let nameInput = document.querySelector("#name");
let emailInput = document.querySelector("#email");
let subjectInput = document.querySelector("#subject");
let phoneInput = document.querySelector("#phone");
let message = document.querySelector("#message");
let contactRow = document.querySelector(".contact");


contactForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  let obj = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    subject: subjectInput.value,
    message: message.value,
  };
  await axios.post(Message_API, obj);
});

