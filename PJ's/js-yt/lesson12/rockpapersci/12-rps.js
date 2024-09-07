let score = JSON.parse(localStorage.getItem("score"));
const autoPlayBtn = document.querySelector(".js-auto-play");
const scoreText = document.querySelector(".js-score");
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
function pickAutoMove() {
  let autoMove = "";
  const autoSelect = Math.floor(Math.random() * 3);
  if (autoSelect === 0) {
    autoMove = "rock";
  } else if (autoSelect === 1) {
    autoMove = "paper";
  } else if (autoSelect === 2) {
    autoMove = "scissors";
  }
  return autoMove;
}
function autoPlay() {
  /*     if (autoPlayBtn.innerText === 'Stop') {

    } */
  autoPlayBtn.innerText = "Stop";

  intervalID = setInterval(function () {
    const autoMove = pickAutoMove();
    const computerMove = pickComputerMove();
    console.log(autoMove);
    console.log(computerMove);
    let intervalID;
    let result = "";
    if (autoMove === "scissors") {
      if (computerMove === "rock") {
        result = "Comp1 Wins";
      } else if (computerMove === "paper") {
        result = "Comp2 Wins";
      } else if (computerMove === "scissors") {
        result = "Tie";
      }
    } else if (autoMove === "paper") {
      if (computerMove === "rock") {
        result = "Comp2 Wins";
      } else if (computerMove === "paper") {
        result = "Tie";
      } else {
        result = "Comp1 Wins";
      }
    } else if (autoMove === "rock") {
      if (computerMove === "rock") {
        result = "Tie";
      } else if (computerMove === "paper") {
        result = "Comp1 Wins";
      } else {
        result = "Comp2 Wins";
      }
    }
    if (result === "Comp2 Wins") {
      score.wins++;
    } else if (result === "Comp1 Wins") {
      score.losses++;
    } else if (result === "Tie") {
      score.ties++;
    }
    scoreText.innerText = `Computer 2 picked ${autoMove}, Computer 1 picked ${computerMove}, ${result}.
    Computer 2 Wins: ${score.wins} Computer 1 Wins: ${score.losses} Ties: ${score.ties}`;
  }, 1000);
}
