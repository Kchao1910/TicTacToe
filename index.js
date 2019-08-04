let choiceWrapper = document.querySelectorAll(".choice-wrapper");
let player1Score = document.querySelector("#player1-score");
let player2Score = document.querySelector("#player2-score");
let message = document.querySelector("#message");
let player1Choices = [];
let player2Choices = [];

const winningCombinations = [
  "123",
  "456",
  "789",
  "147",
  "258",
  "369",
  "159",
  "357"
];

start();

function start() {
  choiceWrapper.forEach(element => element.addEventListener('click', game, false));
}

function game(event) {
  let eventTarget = event.target;
  let choice = getChoice();
  playerMove(eventTarget, choice);
  removeClickEvent(eventTarget);
  switchChoice(choice);
  determineCombination();
}

function playerMove(eventTarget, choice) {
  eventTarget.textContent = choice;
  recordChoice(eventTarget.id, choice);
}

function removeClickEvent(eventTarget) {
  eventTarget.removeEventListener('click', game, false);
}

function getChoice() {
  return document.querySelector("#choice").getAttribute("value");
}

function switchChoice(choice) {
  choice = (choice === "X") ? "O" : "X";
  document.querySelector("#choice").setAttribute("value", choice);
}

function recordChoice(id, choice) {
  if (choice === "X") {
    player1Choices.push(id);
  }
  else {
    player2Choices.push(id);
  }
}

function determineCombination() {
  let player1Turns = player1Choices.length;
  let player2Turns = player2Choices.length;

  if (player1Turns < 3) {
    return;
  }

  if (player1Turns !== player2Turns) {
    determineWinner(player1Choices, "Player 1");
  }
  else if (player1Turns === player2Turns) {
    determineWinner(player2Choices, "Player 2");
  }
}

function determineWinner(playerChoices, player) {
  let sortedCombination = sortChoices(playerChoices);
  console.log(sortedCombination);
  for (let combo of winningCombinations) {
    let matchedPositions = 0;

    for (let char in combo) {
      if (sortedCombination.includes(combo[char])) {
        matchedPositions += 1;
      }
    }

    if (matchedPositions === 3) {
      updateScore(player);
      removeAllClickEvents();
      return;
    }

  }
}

function sortChoices(player) {
  return player.sort().join("");
}

function updateScore(player) {
  if (player === "Player 1") {
    player1Score.textContent = parseInt(player1Score.textContent) + 1;
    message.textContent = `${player} Wins!`;
  }
  else {
    player2Score.textContent = parseInt(player2Score.textContent) + 1;
    message.textContent = `${player} Wins!`;
  }
}

function resetGame() {
  choiceWrapper.forEach(element => element.textContent = "");
  player1Choices = [];
  player2Choices = [];
  document.querySelector("#choice").setAttribute("value", "X");
  message.textContent = "";
  start();
}

function removeAllClickEvents() {
  choiceWrapper.forEach(element => element.removeEventListener('click', game, false));
}

