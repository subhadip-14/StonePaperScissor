const choices = ["🪨 Stone", "📄 Paper", "✂️ Scissors"];
const buttons = document.querySelectorAll(".choice");
const computerChoiceSpan = document.getElementById("computer-choice");
const userChoiceSpan = document.getElementById("user-choice");
const resultSpan = document.getElementById("game-result");
const userScoreSpan = document.getElementById("user-score");
const computerScoreSpan = document.getElementById("computer-score");
const handshake = document.getElementById("handshake");
const exitButton = document.getElementById("exit-button");

let userScore = 0;
let computerScore = 0;

// Function to speak text
function speak(text, callback) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;

    // When the speech is finished, call the callback function
    utterance.onend = callback;

    speechSynthesis.speak(utterance);
}

// Game logic
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.add("clicked"); // Button click animation
    setTimeout(() => button.classList.remove("clicked"), 200);

    const userChoice = parseInt(button.getAttribute("data-choice"));
    const computerChoice = Math.floor(Math.random() * 3);

    // Start shaking hands animation
    handshake.textContent = "✊ ✊";
    handshake.classList.add("shaking");

    // Hide results during animation
    computerChoiceSpan.textContent = "-";
    userChoiceSpan.textContent = "-";
    resultSpan.textContent = "Rock... Paper... Scissors!";
    resultSpan.style.color = "#ffa500";

    // Speak the countdown and shake hands until speech is done
    speak("Rock... Paper... Scissors!", () => {
        // Stop shaking animation
        handshake.classList.remove("shaking");
        handshake.textContent = "";

        // Reveal choices
        computerChoiceSpan.textContent = choices[computerChoice];
        userChoiceSpan.textContent = choices[userChoice];

        // Speak choices
        speak(`You chose ${choices[userChoice].split(" ")[1]}. Computer chose ${choices[computerChoice].split(" ")[1]}.`);

        // Determine result
        const result = determineResult(computerChoice, userChoice);
        let resultMessage = "";

        if (result === 0) {
            resultMessage = "It's a tie!";
            resultSpan.style.color = "#ffa500";
        } else if (result === 1) {
            resultMessage = "You win!";
            resultSpan.style.color = "#4caf50";
            userScore++;
            userChoiceSpan.classList.add("winner");
        } else {
            resultMessage = "You lose!";
            resultSpan.style.color = "#f44336";
            computerScore++;
            computerChoiceSpan.classList.add("winner");
        }

        // Display and speak the result
        resultSpan.textContent = resultMessage;
        speak(resultMessage);

        // Flash animation for result
        resultSpan.classList.add("flash");
        setTimeout(() => resultSpan.classList.remove("flash"), 500);

        // Remove winner highlight
        setTimeout(() => {
            userChoiceSpan.classList.remove("winner");
            computerChoiceSpan.classList.remove("winner");
        }, 800);

        // Update scores
        userScoreSpan.textContent = userScore;
        computerScoreSpan.textContent = computerScore;
    });
  });
});

// Exit button functionality
exitButton.addEventListener("click", () => {
    speak("Thank you for playing! Goodbye!", () => location.reload()); // Delay reload for voice to finish
});

// Function to determine the result
function determineResult(comp, user) {
  if (comp === user) return 0;
  if ((comp === 0 && user === 1) || (comp === 1 && user === 2) || (comp === 2 && user === 0)) return 1;
  return -1;
}
