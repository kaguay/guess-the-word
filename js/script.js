//The unordered list where the player's guessed letters will appear.
const guessedLetters = document.querySelector(".guessed-letters");
//The button with the text "Guess!" in it.
const guessButton = document.querySelector(".guess");
//The text input where the player will guess a letter.
const playerInput = document.querySelector(".letter");
//The empty paragraph where the word in progress will appear.
const progressParagraph = document.querySelector(".word-in-progress");
//The paragraph where the remaining guesses will display.
const remainingGuesses  = document.querySelector(".remaining");
//The span inside the paragraph where the remaining guesses will display.
const remaminingGuessesSpan = document.querySelector(".remaining span");
//The empty paragraph where messages will appear when the player guesses a letter.
const guessMessage = document.querySelector(".message");
//The hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector(".play-again");
//Test word
const word = "magnolia";

//Create and name a function to update the paragraph's innerText for the "words-in-progress" element with circle symbols (●) to represent each letter in the word. The symbols will stay on the screen until the correct letter is guessed (in a future step).
const placeholder = function () {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
}
    progressParagraph.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const captureInput = playerInput.value;
    console.log(captureInput);
    playerInput.value = "";
});