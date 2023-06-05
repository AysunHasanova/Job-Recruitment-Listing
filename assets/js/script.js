let nums = document.querySelectorAll(".num");
let interval = 3000;

nums.forEach((num) => {
  let startNum = 0;
  let endNum = parseInt(num.getAttribute("data-val"));
  let duration = Math.floor(interval / endNum);
  let counter = setInterval(function () {
    startNum += 20;
    num.textContent = startNum;
    if (startNum == endNum) {
      clearInterval(counter);
    }
  },duration);
});
