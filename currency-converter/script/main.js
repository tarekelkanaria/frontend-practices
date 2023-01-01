import { apiKey } from "./hidden.js";
let baseCurrencyList = document.querySelector(".base-list");
let convertedCurrencyList = document.querySelector(".converted-list");
let baseBtn = document.querySelector(".base-currency");
let convertedBtn = document.querySelector(".converted-currency");
let excuteBtn = document.querySelector(".convert");
let inputAmount = document.getElementById("amount-from");
let outputAmount = document.querySelector(".amount-to");
fetch("https://api.currencyfreaks.com/supported-currencies")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((curr) => {
      if (
        curr.currencyCode &&
        curr.icon &&
        curr.status === "AVAILABLE" &&
        curr.countryName &&
        curr.countryName !== "Global"
      ) {
        if (curr.currencyCode === "USD") {
          baseBtn.innerHTML = `<img src="${curr.icon}" class="icon" /> <span class="base-code">${curr.currencyCode}</span> ${curr.countryName} <i class="fa fa-chevron-down"></i>`;
        }
        let baseCurrencyItem = document.createElement("li");
        let baseCurrencyIcon = document.createElement("img");
        let baseCurrCode = document.createElement("span");
        baseCurrencyItem.className = "base-item";
        baseCurrencyIcon.className = "icon";
        baseCurrencyIcon.src = curr.icon;
        baseCurrCode.className = "base-code";
        baseCurrCode.innerText = curr.currencyCode;
        baseCurrencyItem.innerText = curr.countryName;
        baseCurrencyItem.prepend(baseCurrCode);
        baseCurrencyItem.prepend(baseCurrencyIcon);
        baseCurrencyList.append(baseCurrencyItem);
        if (curr.currencyCode === "EGP") {
          convertedBtn.innerHTML = `<img src="${curr.icon}" class="icon" /> <span class="convert-code">${curr.currencyCode}</span> ${curr.countryName} <i class="fa fa-chevron-down"></i>`;
        }
        let converCurrencyItem = document.createElement("li");
        let converCurrencyIcon = document.createElement("img");
        let converCurrCode = document.createElement("span");
        converCurrencyItem.className = "convert-item";
        converCurrencyIcon.className = "icon";
        converCurrencyIcon.src = curr.icon;
        converCurrCode.className = "convert-code";
        converCurrCode.innerText = curr.currencyCode;
        converCurrencyItem.innerText = curr.countryName;
        converCurrencyItem.prepend(converCurrCode);
        converCurrencyItem.prepend(converCurrencyIcon);
        convertedCurrencyList.append(converCurrencyItem);
      }
    });
  })
  .catch((err) => console.log(err));
baseBtn.addEventListener("click", () => {
  baseCurrencyList.classList.toggle("show");
});
convertedBtn.addEventListener("click", () => {
  convertedCurrencyList.classList.toggle("show");
});
document.body.addEventListener("click", (e) => {
  if (e.target.className === "base-item") {
    baseBtn.innerHTML = `${e.target.innerHTML} <i class="fa fa-chevron-down"></i>`;
    baseCurrencyList.classList.toggle("show");
  }
  if (e.target.className === "convert-item") {
    convertedBtn.innerHTML = `${e.target.innerHTML} <i class="fa fa-chevron-down"></i>`;
    convertedCurrencyList.classList.toggle("show");
  }
});
fetch(`https://api.currencyfreaks.com/latest?apikey=${apiKey}`)
  .then((res) => res.json())
  .then((data) => {
    excuteBtn.addEventListener("click", () => {
      if (inputAmount.value) {
        let baseCodeCurr = document.querySelector(
          ".base-currency .base-code"
        ).innerText;
        let dollarRate = inputAmount.value / data.rates[baseCodeCurr];
        let convertCodeCurr = document.querySelector(
          ".converted-currency .convert-code"
        ).innerText;
        outputAmount.innerHTML = (
          dollarRate * data.rates[convertCodeCurr]
        ).toFixed(2);
      } else {
        alert("Please Enter value in Amount feild");
      }
    });
  });
