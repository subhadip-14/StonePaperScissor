// script.js
const choices = ["Stone", "Paper", "Scissors"];
const buttons = document.querySelectorAll(".choice");
const computerChoiceSpan = document.getElementById("computer-choice");
const userChoiceSpan = document.getElementById("user-choice");
const resultSpan = document.getElementById("game-result");
const userScoreSpan = document.getElementById("user-score");
const computerScoreSpan = document.getElementById("computer-score");
const exitButton = document.getElementById("exit-button");

let userScore = 0;
let computerScore = 0;

// Game logic
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const userChoice = parseInt(button.getAttribute("data-choice"));
    const computerChoice = Math.floor(Math.random() * 3);

    // Update choices
    computerChoiceSpan.textContent = choices[computerChoice];
    userChoiceSpan.textContent = choices[userChoice];

    // Determine result
    const result = determineResult(computerChoice, userChoice);
    if (result === 0) {
      resultSpan.textContent = "It's a tie!";
      resultSpan.style.color = "#ffa500";
    } else if (result === 1) {
      resultSpan.textContent = "You win!";
      resultSpan.style.color = "#4caf50";
      userScore++;
    } else {
      resultSpan.textContent = "You lose!";
      resultSpan.style.color = "#f44336";
      computerScore++;
    }

    // Update scores
    userScoreSpan.textContent = userScore;
    computerScoreSpan.textContent = computerScore;
  });
});

// Exit button functionality
exitButton.addEventListener("click", () => {
  alert("Thank you for playing!");
  location.reload(); // Reloads the page to reset the game
});

// Function to determine the result
function determineResult(comp, user) {
  if (comp === user) return 0; // Tie
  if ((comp === 0 && user === 1) || (comp === 1 && user === 2) || (comp === 2 && user === 0)) return 1; // User wins
  return -1; // Computer wins
}
