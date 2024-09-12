let score = JSON.parse(localStorage.getItem("score"));
const autoPlayBtn = document.querySelector(".js-auto-play");
const scoreText = document.querySelector(".js-score");
const rockButton = document.querySelector(".js-rock-button");
const paperButton = document.querySelector(".js-paper-button");
const scissorsButton = document.querySelector(".js-scissors-button");
const resetButton = document.querySelector(".js-reset-button");
const resetConf = document.querySelector(".reset-conf");
const yesBtn = document.querySelector(".js-yes");
const noBtn = document.querySelector(".js-no");

if (score === null) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
}
updateScore();
function resetScore() {
  score.losses = 0;
  score.ties = 0;
  score.wins = 0;
  localStorage.removeItem("score");
  updateScore();
}
function updateScore() {
  scoreText.innerText = `Make your move.
        Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";
  if (playerMove === computerMove) {
    result = "Tie";
    score.ties++;
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose";
      score.losses++;
    } else if (computerMove === "paper") {
      result = "You win";
      score.wins++;
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win";
      score.wins++;
    } else {
      result = "You lose";
      score.losses++;
    }
  } else if (playerMove === "rock") {
    if (computerMove === "paper") {
      result = "You lose";
      score.losses++;
    } else {
      result = "You win";
      score.wins++;
    }
  }

  localStorage.setItem("score", JSON.stringify(score));

  if (isAutoPlaying) {
    scoreText.innerText = `Bot 1 picked ${playerMove}, Bot 2 picked ${computerMove}.
                  Bot 1 Wins: ${score.wins}
                  Bot 2 Wins: ${score.losses}
                  Ties: ${score.ties}`;
  } else {
    scoreText.innerText = `You picked ${playerMove}, the computer picked ${computerMove}, ${result}.
                  Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
  }
}
function pickComputerMove() {
  let computerMove = "";
  const compSelect = Math.floor(Math.random() * 3);
  if (compSelect === 0) {
    computerMove = "rock";
  } else if (compSelect === 1) {
    computerMove = "paper";
  } else if (compSelect === 2) {
    computerMove = "scissors";
  }
  return computerMove;
}

let isAutoPlaying = false;
let intervalID;

function autoPlay() {
  if (!isAutoPlaying) {
    autoPlayBtn.innerText = "Stop Auto Play";
    intervalID = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    autoPlayBtn.innerText = "Auto Play";
    isAutoPlaying = false;
    clearInterval(intervalID);
  }
}
rockButton.addEventListener("click", () => {
  playGame("rock");
});
paperButton.addEventListener("click", () => {
  playGame("paper");
});
scissorsButton.addEventListener("click", () => {
  playGame("scissors");
});
autoPlayBtn.addEventListener("click", () => {
  autoPlay();
});
resetButton.addEventListener("click", () => {
  resetConf.classList.toggle("hidden");
});
yesBtn.addEventListener("click", () => {
  resetScore();
  resetConf.classList.toggle("hidden");
});
noBtn.addEventListener("click", () => {
  resetConf.classList.toggle("hidden");
});
//Keyboard shortcuts
document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  } else if (event.key === "a") {
    autoPlay();
  } else if (event.key === "Backspace") {
    resetConf.classList.toggle("hidden");
  }
});
