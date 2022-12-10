let progressBar = document.querySelector(".progress-bar");
// get all the height after subtract the client height
let remainingHeight =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;
// on scroll the progress bar width will be as the same percentage of
// the percentage of the scroll from the remaining height.
document.addEventListener("scroll", () => {
  progressBar.style.width = `${
    (document.documentElement.scrollTop / remainingHeight) * 100
  }%`;
});
