// Create letters column
// create array from the letters and select letters element
let letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector(".letters");
// loop over the array and create span contain each letter
lettersArray.forEach((letter) => {
  let letterElement = document.createElement("span");
  let letterText = document.createTextNode(letter);
  letterElement.className = "letters__letter";
  letterElement.append(letterText);
  lettersContainer.appendChild(letterElement);
});

// Generate word and category
const words = {
  movies: [
    "the weeping meadow",
    "persona",
    "the turin horse",
    "god father",
    "there will be blood",
    "inception",
    "deer hunter",
    "taxi driver",
    "scent of a woman",
    "nostalghia",
  ],
  programming: ["html", "css", "javascript", "python", "php", "java", "sql"],
  wirters: [
    "albert camus",
    "naguib mahfouz",
    "samuel beckett",
    "sartre",
    "dostoevsky",
    "kafka",
  ],
  actors: [
    "daniel day lewis",
    "sean penn",
    "al pacino",
    "robert de niro",
    "johnny depp",
    "keira knightley",
    "julia roberts",
    "meg ryan",
  ],
  "Music artists": ["pink floyed", "queen", "nirvana", "the smiths", "ayreon"],
};
// Get random category
let wordsKeys = Object.keys(words);
let categoryNumber = Math.floor(Math.random() * wordsKeys.length);
let randomCategoryName = wordsKeys[categoryNumber];
let randomCategoryValue = words[randomCategoryName];
// Get random word depending on the random category
let wordNumber = Math.floor(Math.random() * randomCategoryValue.length);
let randomWord = randomCategoryValue[wordNumber];
// Select span to show category
document.querySelector(".category span").innerHTML = randomCategoryName;

// Generate letter guess
// Select letter guess element
let guessContainer = document.querySelector(".letter-guess");
let wordLetters = Array.from(randomWord);
wordLetters.forEach((letter) => {
  // Create empty span
  let letterElement = document.createElement("span");

  // create class for space
  if (letter === " ") {
    letterElement.className = "with-space";
  }
  guessContainer.appendChild(letterElement);
});

// Choose the letters functionality
// Select all empty spans that didn't contain space
let spans = document.querySelectorAll(".letter-guess span");
// set wrong attempts
let wrongAttempts = 0;
// function to Fill the guess letters
let writeLetters = (letter, index) => {
  spans.forEach((spanLetter, spanIndex) => {
    if (index === spanIndex) {
      spanLetter.innerHTML = letter;
    }
  });
  // check if all the guess letters is filled with letters
  let onlyLetters = Array.from(spans).filter(
    (letter) => letter.className !== "with-space"
  );
  if (onlyLetters.every((letter) => letter.innerHTML !== "")) {
    gameFininsh();
  }
};
// listen to click on letters
document.addEventListener("click", (e) => {
  let chosenStatus;
  // prevent more than one click on each letter
  if (e.target.className === "letters__letter") {
    // Set the choose status
    chosenStatus = false;
    e.target.classList.add("clicked");
  }
  // extract selected letter
  let selectedLetter = e.target.innerHTML.toLowerCase();
  // loop over the chosen word and compare each letter with selected letter
  // if they are the same call write function to fill the guess letters
  wordLetters.forEach((wordLetter, index) => {
    if (wordLetter === selectedLetter) {
      chosenStatus = true;
      writeLetters(wordLetter, index);
    }
  });
  if (chosenStatus === false) {
    // increase wrong attempts
    wrongAttempts++;
    // add wrong class to the draw class
    document
      .querySelector(".hang-draw__draw")
      .classList.add(`wrong-${wrongAttempts}`);
    // add sound effect and end game if worng attempts = 8
    if (wrongAttempts < 8 && wrongAttempts > 0) {
      document.getElementById("wrong").play();
    } else {
      document.getElementById("fail").play();
      gameOver();
      lettersContainer.classList.add("end");
    }
  } else if (chosenStatus === true) {
    // add sound effect
    document.getElementById("right").play();
  }
});
// when the game is finish with fail
let gameOver = () => {
  let finElement = document.createElement("div");
  finElement.innerHTML = `Game Over, The Word is ${randomWord.toUpperCase()}`;
  finElement.classList.add("popup");
  let resetBtn = document.createElement("button");
  resetBtn.classList.add("reset");
  resetBtn.innerText = "Try Again";
  resetBtn.addEventListener("click", () => {
    window.location.reload();
  });
  finElement.append(resetBtn);
  let bodyEnd = document.getElementById("fail");
  bodyEnd.after(finElement);
};
// when the game is finish with success
let gameFininsh = () => {
  let finElement = document.createElement("div");
  finElement.innerHTML = `Congratulations, Your Word is ${randomWord.toUpperCase()},
  ${
    wrongAttempts > 4
      ? "Your level is middle"
      : wrongAttempts > 0
      ? "Your level is Good"
      : "Your level is excellent"
  },
  Your wrong attempts is ${wrongAttempts}`;
  finElement.classList.add("popup");
  let resetBtn = document.createElement("button");
  resetBtn.classList.add("reset");
  resetBtn.innerText = "Let's play again";
  resetBtn.addEventListener("click", () => {
    window.location.reload();
  });
  finElement.append(resetBtn);
  let bodyEnd = document.getElementById("fail");
  bodyEnd.after(finElement);
};
