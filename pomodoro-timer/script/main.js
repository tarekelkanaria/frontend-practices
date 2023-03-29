// Exercise 2
let cont = document.getElementsByClassName("pomodor")[0];
cont.style.cssText =
  "color: #4db6ac; text-align: center; font-size: 28px; font-weight: bold;";
let workElement = document.createElement("p");
workElement.innerText = "Work time : ";
let secTime = document.createElement("span");
let horTime = document.createElement("span");
let minTime = document.createElement("span");
let workText = document.getElementsByClassName("work")[0];
let startWorkBtn = document.getElementsByClassName("s-work")[0];
let breakElement = document.createElement("p");
breakElement.innerText = "break time : ";
let secTimeBr = document.createElement("span");
let horTimeBr = document.createElement("span");
let minTimeBr = document.createElement("span");
let breakText = document.getElementsByClassName("break")[0];
let startBreaktBtn = document.getElementsByClassName("s-break")[0];
let resumeBtn = document.getElementsByClassName("r-work")[0];
let endBtn = document.getElementsByClassName("e-work")[0];
let interval = null;
secTime.innerText = "00";
minTime.innerText = "00";
horTime.innerText = "00";
secTimeBr.innerText = "00";
minTimeBr.innerText = "00";
horTimeBr.innerText = "00";
let sec = 0;
let min = 0;
let hor = 0;
function timer() {
  sec++;
  if (sec >= 60) {
    sec = 1;
    min += 1;
    if (min >= 60) {
      min = 1;
      hor += 1;
    }
  }
  if (sec <= 9) {
    secTime.innerText = "0" + sec;
  } else {
    secTime.innerText = sec;
  }
  if (min <= 9) {
    minTime.innerText = "0" + min;
  } else {
    minTime.innerText = min;
  }
  horTime.innerText = hor;
}
let secBr = 0;
let minBr = 0;
let horBr = 0;
function breakTimer() {
  secBr++;
  if (secBr >= 60) {
    minBr = 1;
    minBr += 1;
    if (minBr >= 60) {
      minBr = 1;
      horBr += 1;
    }
  }
  if (secBr <= 9) {
    secTimeBr.innerText = "0" + secBr;
  } else {
    secTimeBr.innerText = secBr;
  }
  if (minBr <= 9) {
    minTimeBr.innerText = "0" + minBr;
  } else {
    minTimeBr.innerText = minBr;
  }
  horTimeBr.innerText = horBr;
}
function countTime() {
  interval = setInterval(timer, 1000);
}
function breakTime() {
  clearInterval(interval);
  intervalBreak = setInterval(breakTimer, 1000);
}
function resume() {
  clearInterval(intervalBreak);
  countTime();
}
function end() {
  alert(
    "Your work hours : " +
      secTime.innerText +
      " sec " +
      minTime.innerText +
      " Min " +
      horTime.innerText +
      " hour " +
      " Your break hours : " +
      secTimeBr.innerText +
      " sec " +
      minTimeBr.innerText +
      " min " +
      horTimeBr.innerText +
      " hour "
  );
  clearInterval(interval);
  clearInterval(intervalBreak);
}
startWorkBtn.addEventListener("click", countTime);
startBreaktBtn.addEventListener("click", breakTime);
resumeBtn.addEventListener("click", resume);
endBtn.addEventListener("click", end);
workElement.append(horTime, " : ", minTime, " : ", secTime);
breakElement.append(horTimeBr, " : ", minTimeBr, " : ", secTimeBr);
workText.append(workElement);
breakText.append(breakElement);
workText.style.cssText = "color: black;";
breakText.style.cssText = "color: black;";
let buttons = document.querySelectorAll(".controls button");
buttons.forEach((ele) => {
  ele.style.cssText =
    "border: none; color: white; background-color: #9e9e9e; padding: 20px; font-weight: bold; cursor: pointer;";
  ele.addEventListener("click", function () {
    ele.style.cssText =
      "border: none; color: white; background-color: #4db6ac; padding: 20px; font-weight: bold; cursor: pointer;";
  });
});
