window.addEventListener('load', init);

// Globals

// Available Levels
const levels = {
  easy: 5,
  medium: 4,
  hard: 3
};

// To change level
let currentLevel = levels.easy;

let time = 30;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
let seconds = document.querySelector('#seconds');
const retry = document.querySelector("#retry");
const difficulty = document.querySelector("#difficulty");
const timer = document.querySelectorAll(".timer");

let words = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'dogs',
  'look',
  'eat',
  'stew',
  'switch',
  'brim',
  'pot',
  'by',
  'in',
  'developer',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'find',
  'swim',
  'detail',
  'measure',
  'a',
  'an',
  'suit',
  'army',
  'planned',
  'mirror',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
  'definition'
];

const level2 = [
  'acquaintance',
  'establishment',
  'abberation',
  'acknowledgment',
  'boisterous',
  'clairvoyant',
  'condescending',
  'encompass',
  'harassment',
  'infrastructure',
  'methodology',
  'promulgate',
  'anthropological',
  'complementation',
  'broadmindedness',
  'commensurations',
  'determinateness',
  'efficaciousness',
  'discombobulates',
  'antifundamentalist',
  'agammaglobulinemic',
  'internationalities',
  'organophosphoruses',
  'reconstructionisms',
  'puzzleheadednesses'
];

// Initialize Game
function init() {
  // Show number of seconds in UI
  seconds.innerHTML = currentLevel;
  // Load word from array
  showWord(words);
  // Start matching on word input
  wordInput.addEventListener('input', startMatch);
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 50);
}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = '';
    score++;
    // Check score for difficulty increase
    if (score === 10) {
      increaseDifficulty();
    }
  }

  // If score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!!!';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}

// Pick & show random word
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
  // Make sure time is not run out
  if (time > 0) {
    // Decrement
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = time;
  // Change timer color
  if (time > 2) {
    timeDisplay.style.color = "#66FF00";
  } else if (time === 2) {
    timeDisplay.style.color = "#ffcc33";
  } else {
    timeDisplay.style.color = "#fd0e35";
  }
}



// Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = 'Game Over!!!';
    wordInput.disabled = true;
    wordInput.placeholder = "";
    score = -1;
  }
}

// Increase diffculty
function increaseDifficulty() {
  words = words.filter(word => word.length > 8);
  Array.prototype.push.apply(words, level2);
  console.log(words);
}

//Set difficulty level
function setDifficulty() {
  let difficultyLevel = difficulty.value;
  switch (difficultyLevel) {
    case "0":
      currentLevel = levels.easy;
      seconds.innerHTML = 5;
      break;
    case "1":
      currentLevel = levels.medium;
      seconds.innerHTML = 4;
      break;
    case "2":
      currentLevel = levels.hard;
      seconds.innerHTML = 3;
      break;
  }
}

// Restart game
retry.addEventListener("click", function () {
  location.reload();
});

