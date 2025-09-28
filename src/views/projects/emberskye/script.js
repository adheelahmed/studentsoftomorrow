let currentWord = "Cat";
let score = 0;
let usedWords = ["Cat"];
let timeLeft = 30;

const wordDisplay = document.getElementById("current-word");
const input = document.getElementById("player-input");
const submitBtn = document.getElementById("submit-btn");
const message = document.getElementById("message");
const scoreDisplay = document.getElementById("score");
const wordList = document.getElementById("word-list");
const timerDisplay = document.getElementById("timer");

// Example word list for computer response
const wordBank = ["apple", "elephant", "tiger", "rabbit", "tree", "eagle", "rat", "egg", "grape", "ear", "tea", "ant"];

submitBtn.addEventListener("click", checkWord);
input.addEventListener("keypress", function(e){
    if(e.key === "Enter") checkWord();
});

// Timer countdown
const timerInterval = setInterval(() => {
    if(timeLeft > 0) {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
    } else {
        message.textContent = "Time's up! Game over.";
        submitBtn.disabled = true;
        input.disabled = true;
        clearInterval(timerInterval);
    }
}, 1000);

function checkWord() {
    let playerWord = input.value.trim().toLowerCase();
    if(playerWord === "") {
        message.textContent = "Please enter a word!";
        return;
    }

    let lastChar = currentWord.slice(-1).toLowerCase();

    // Check if word starts with last letter of current word
    if(playerWord[0] !== lastChar) {
        message.textContent = `Word must start with "${lastChar.toUpperCase()}"!`;
        input.value = "";
        return;
    }

    // Check for repeated word
    if(usedWords.includes(playerWord)) {
        message.textContent = "This word has already been used!";
        input.value = "";
        return;
    }

    // Word is valid
    score++;
    scoreDisplay.textContent = score;
    currentWord = playerWord;
    wordDisplay.textContent = capitalize(currentWord);
    usedWords.push(playerWord);

    const li = document.createElement("li");
    li.textContent = capitalize(playerWord) + " (You)";
    wordList.appendChild(li);

    input.value = "";
    input.focus();
    message.textContent = "Good job!";

    // Computer responds after 1 second
    setTimeout(computerTurn, 1000);
}

function computerTurn() {
    let lastChar = currentWord.slice(-1).toLowerCase();
    let options = wordBank.filter(word => word[0] === lastChar && !usedWords.includes(word));

    if(options.length === 0) {
        message.textContent = "Computer cannot continue. You win!";
        submitBtn.disabled = true;
        input.disabled = true;
        return;
    }

    let computerWord = options[Math.floor(Math.random() * options.length)];
    currentWord = computerWord;
    wordDisplay.textContent = capitalize(currentWord);
    usedWords.push(computerWord);

    const li = document.createElement("li");
    li.textContent = capitalize(computerWord) + " (Computer)";
    wordList.appendChild(li);

    score++;
    scoreDisplay.textContent = score;
    message.textContent = "Computer played!";
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
