const squares = document.querySelectorAll('.square');
let xScore = document.querySelector('#x-score');
let oScore = document.querySelector('#o-score');
const result = document.querySelector('#game-result');

const backgroundMusic = document.getElementById("background-music");
const clickSound = document.getElementById("click-sound");

const resetButton = document.querySelector("#reset-button");
const aiToggleButton = document.getElementById("ai-toggle-button");
const helpButton = document.getElementById("help-button");
const helpDialogue = document.getElementById("help-dialogue");
const closeDialogue = document.getElementById("close-dialogue");

const musicOn = document.getElementById("music-on");
const musicOff = document.getElementById("music-off");
const musicToggle = document.getElementById("music-toggle");
let isMusicOn = false;

let xIsNext = true;
let gameOver = false;
let aiToggle = false;

for (let i = 0; i < squares.length; i++) {
  squares[i].addEventListener("click", function () {
    if (this.innerHTML === "" && !gameOver) {
      this.innerHTML = xIsNext ? "X" : "O";
      clickSound.currentTime = 0;
      clickSound.play();
      xIsNext = !xIsNext;
    if (checkForWinner()) {
      gameOver = true;
      if (!xIsNext) {
        result.innerHTML = `X Wins!`;
        xScore.innerHTML = parseInt(xScore.innerHTML) + 1;
      } else {
        result.innerHTML = `O Wins!`;
        oScore.innerHTML = parseInt(oScore.innerHTML) + 1;
      }
    } else if (checkForStalemate()) {
      gameOver = true;
      result.innerHTML = "Stalemate";
    } else {
      if (aiToggle) {
        handleAIMove();
      }
    }
  }
  });
}

function checkForWinner() {
    const winningCombinations = [    
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
  
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (
        squares[a].innerHTML === squares[b].innerHTML &&
        squares[b].innerHTML === squares[c].innerHTML &&
        squares[a].innerHTML !== ""
      ) {
        return true
      }
    }
    return null
  }

const checkForStalemate = () => {
    return [...squares].every(square => square.innerHTML !== '')
  };

function handleAIMove() {
  const availableSquares = [];
  for (const square of squares) {
    if (square.innerHTML === "") {
      availableSquares.push(square);
    }
  }

  const randomIndex = Math.floor(Math.random() * availableSquares.length);
  availableSquares[randomIndex].innerHTML = 'O';

  if (checkForWinner()) {
    gameOver = true;
    result.innerHTML = 'O Wins!';
    oScore.innerHTML = parseInt(oScore.innerHTML) + 1;
  } else if (checkForStalemate()) {
    gameOver = true;
    result.innerHTML = 'Stalemate';
  } else {
    xIsNext = true;
  }
}

function handleReset() {
  for (const square of squares) {
    square.innerHTML = '';
  }
  gameOver = false;
  xIsNext = true;
  result.innerHTML = 'Player X Moves First';
}

resetButton.addEventListener('click', handleReset);

aiToggleButton.addEventListener("click", function() {
  if ([...squares].every(square => square.innerHTML === '')) {
    aiToggle = !aiToggle;
    if (aiToggle) {
      aiToggleButton.textContent = "AI Opponent: On";
    } else {
      aiToggleButton.textContent = "AI Opponent: Off";
    }
  }
});

helpButton.addEventListener("click", function() {
  helpDialogue.style.display = "block";
});

closeDialogue.addEventListener("click", function() {
  helpDialogue.style.display = "none";
});

musicToggle.addEventListener("click", () => {
  if (isMusicOn) {
    musicOn.style.display = "none";
    musicOff.style.display = "block";
    backgroundMusic.pause();
    isMusicOn = false;
  } else {
    musicOff.style.display = "none";
    musicOn.style.display = "block";
    backgroundMusic.play();
    isMusicOn = true;
  }
});