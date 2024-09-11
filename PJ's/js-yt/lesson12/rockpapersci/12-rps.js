let score = JSON.parse(localStorage.getItem("score"));
const autoPlayBtn = document.querySelector(".js-auto-play");
const scoreText = document.querySelector(".js-score");
const rockButton = document.querySelector(".js-rock-button");
const paperButton = document.querySelector(".js-paper-button");
const scissorsButton = document.querySelector(".js-scissors-button");

if (score === null) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
}
updateScore();
function updateScore() {
  scoreText.innerText = `Make your move.
        Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";
  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose";
    } else if (computerMove === "paper") {
      result = "You win";
    } else if (computerMove === "scissors") {
      result = "Tie";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win";
    } else if (computerMove === "paper") {
      result = "Tie";
    } else {
      result = "You lose";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "You lose";
    } else {
      result = "You win";
    }
  }

  if (result === "You win") {
    score.wins++;
  } else if (result === "You lose") {
    score.losses++;
  } else if (result === "Tie") {
    score.ties++;
  }

  localStorage.setItem("score", JSON.stringify(score));

  scoreText.innerText = `You picked ${playerMove}, the computer picked ${computerMove}, ${result}.
                  Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
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
    autoPlayBtn.innerText = "Stop";
    intervalID = setInterval(function () {
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
document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  }
});
