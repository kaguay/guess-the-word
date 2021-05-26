//The unordered list where the player's guessed letters will appear.
const guessedLettersElement = document.querySelector(".guessed-letters");
//The button with the text "Guess!" in it.
const guessButton = document.querySelector(".guess");
//The text input where the player will guess a letter.
const playerInput = document.querySelector(".letter");
//The empty paragraph where the word in progress will appear.
const progressParagraph = document.querySelector(".word-in-progress");
//The paragraph where the remaining guesses will display.
const showRemainingGuesses  = document.querySelector(".remaining");
//The span inside the paragraph where the remaining guesses will display.
const remaminingGuessesSpan = document.querySelector(".remaining span");
//The empty paragraph where messages will appear when the player guesses a letter.
const guessMessage = document.querySelector(".message");
//The hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector(".play-again");
//Test word
let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

//Add an Async Function
const getWord = async function () {
    const response = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    //console.log(words);
    const wordArray = words.split("\n")
    //console.log(wordArray);
    //Grad a random word
    const pullRandomWord = Math.floor(Math.random()*wordArray.length);
    word = wordArray[pullRandomWord].trim();
    placeholder(word);
};

getWord();


//Create and name a function to update the paragraph's innerText for the "words-in-progress" element with circle symbols (●) to represent each letter in the word. The symbols will stay on the screen until the correct letter is guessed (in a future step).
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
}
    progressParagraph.innerText = placeholderLetters.join("");
};


guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    //empty the message
    guessMessage.innerText = "";
    //get the user input
    const captureInput = playerInput.value;
    //console.log(captureInput);
    //make sure the guess is valid
    var validGuess = validateInput(captureInput);
    //console.log(validGuess);

    if (validGuess) {
        makeGuess(captureInput);
    }
    //clear the player input
    playerInput.value = "";
});

const validateInput = function (input) {
    const acceptedLetterSequence = /[a-zA-Z]/;
    if (input.length === 0) {
        guessMessage.innerText = "Please enter a letter.";
    }
    if (input.length > 1) {
        guessMessage.innerText = "Please only enter one letter.";
    }
    if (!input.match(acceptedLetterSequence)) {
        guessMessage.innerText = "Please enter a letter A-Z.";
    } else {
        return input;
    };
};

const makeGuess = function (captureInput) {
    captureInput = captureInput.toUpperCase(); 

    if (guessedLetters.includes(captureInput)) {
        guessMessage.innerText= "You already guessed that letter. Try entering a different letter.";
    } else {
        guessedLetters.push(captureInput);
        console.log(guessedLetters);
        remainingGuessCount(captureInput);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

//Create a Function to Show the Guessed Letters
const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

//Create a Function to Update the Word in Progress
const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    console.log(wordArray);
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    progressParagraph.innerText = revealWord.join("");
    playerWins();
};

//Create a Function to Count Guesses Remaining
const remainingGuessCount = function (captureInput) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(captureInput)) {
        guessMessage.innerText = `${captureInput} is not in the word. Try again!`;
        remainingGuesses -= 1;   
    } else {
        guessMessage.innerText = `Great guess! The word has the letter ${captureInput} in it!`; 
    }

    if (remainingGuesses === 0) {
        guessMessage.innerText = `GAME OVER! The word was ${upperWord.toUpperCase()}.`;
        startOver();
    } else if (remainingGuesses === 1 ) {
        showRemainingGuesses.innerText = `You have ${remainingGuesses} guess remaining...choose carefully!`;
    } else {
        showRemainingGuesses.innerText = `You have ${remainingGuesses} guesses left.`;
    }

};

//Create a Function to Check If the Player Won
const playerWins = function () {
    if (word.toUpperCase() === progressParagraph.innerText) {
        guessMessage.classList.add("win");
        guessMessage.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;

        startOver();
    }
};

//Create a Function to Hide and Show Elements
const startOver = function () {
    guessButton.classList.add("hide");
    showRemainingGuesses.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    guessMessage.classList.remove("win");
    guessMessage.innerText = "";
    guessedLettersElement.innerText = "";
    guessedLetters = [];
    remainingGuesses = 8;
    showRemainingGuesses.innerText = `${remainingGuesses} guesses`;
    getWord();

    guessButton.classList.remove("hide");
    showRemainingGuesses.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");

});