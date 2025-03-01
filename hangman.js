// Word bank: 50 unique 5-letter words with no repeating letters
const words = [
    "brick", "clamp", "frost", "grind", "plumb", "sword", "trick", "carlo", "jumps", "quilt",
    "wharf", "zebra", "crown", "globe", "fetch", "mirth", "proud", "snack", "tiger", "vapor",
    "wedge", "amber", "clove", "drums", "flint", "hinge", "joint", "knees", "lofty", "mould",
    "mount", "minus", "medal", "lapse", "infer", "heads", "goats", "urged", "vital", "waste",
    "fluid", "yield", "zesty", "earth", "cramp", "dwell", "elbow", "cheap", "cargo", "bench"
];

let selectedWord = "";
let guessedLetters = [];
let remainingLives = 5;

// Initialize game
function setupGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = new Array(selectedWord.length).fill("_");
    remainingLives = 5;
    
    document.getElementById("lives").innerText = remainingLives;
    updateWordDisplay();
    resetHangmanGraphic();
}

// Update the displayed word
function updateWordDisplay() {
    for (let i = 0; i < selectedWord.length; i++) {
        document.getElementById(`s-${i}`).innerText = guessedLetters[i];
    }
}

// Reset hangman figure
function resetHangmanGraphic() {
    document.getElementById("head").style.display = "none";
    document.getElementById("arm-1").style.display = "none";
    document.getElementById("arm-2").style.display = "none";
    document.getElementById("torso").style.display = "none";
    document.getElementById("foot-1").style.display = "none";
    document.getElementById("foot-2").style.display = "none";
}

// Check user input
function checkLetter() {
    let input = prompt("Enter a letter:").toLowerCase();

    if (input === null || input.length !== 1 || !/^[a-z0-9]$/.test(input)) {
        alert("Invalid input. Please enter a single letter or number.");
        return;
    }

    if (selectedWord.includes(input)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === input) {
                guessedLetters[i] = input;
            }
        }
        updateWordDisplay();
    } else {
        remainingLives--;
        updateHangmanGraphic();
    }

    document.getElementById("lives").innerText = remainingLives;
    checkGameOver();
}

// Update the hangman drawing
function updateHangmanGraphic() {
    switch (remainingLives) {
        case 4: document.getElementById("head").style.display = "block"; break;
        case 3: document.getElementById("arm-1").style.display = "block"; break;
        case 2: document.getElementById("arm-2").style.display = "block"; break;
        case 1: document.getElementById("torso").style.display = "block"; break;
        case 0: 
            document.getElementById("foot-1").style.display = "block";
            document.getElementById("foot-2").style.display = "block";
            break;
    }
}

// Check if the game is won or lost
function checkGameOver() {
    if (!guessedLetters.includes("_")) {
        alert("Congratulations! You guessed the word!");
        setupGame();
    } else if (remainingLives === 0) {
        alert(`Game over! The word was: ${selectedWord}`);
        setupGame();
    }
}