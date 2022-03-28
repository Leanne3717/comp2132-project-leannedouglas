/*
	Author: Leanne Douglas
	Date:	March 27, 2022
    Notes:	COMP2132 - Final Project
*/

// Assign HTML page elements to constants
const $wrapperSubhead = $('#wrapper_subhead');
const $gameTitle      = $('#game_title');
const $imageArea      = $('#image_area');
const $gameArea       = $('#game_area');
const $wordArea       = $('#word_letters');
const $hintText       = $('#word_hint');
const $difficulty     = $('#difficulty');
const $guesses        = $('#guesses');
const $inputLetters   = $('#input_letters');
const $btnStart       = $('#btn_start');
const $btnInstruc     = $('#btn_instructions');
const $btnLetter      = $('.btn_letter');
const $popupInstruc   = $('#popup_instruc');
const $popupWon       = $('#popup_won');
const $popupLost      = $('#popup_lost');

const $popups		  = $('.popup');
const $btnClosePopup  = $('.btn_close_popup');
const $gameImage      = $imageArea.children().first();

// Create constants and variables for other data.
const imageFolder      = "images/";
const imagePrefix      = "hangman-";
const imageExtension   = ".jpg";
const fadeDelay        = 1000;
const transparent      = 0;
const opaque           = 1;
let   currentImage;
let   arrayOfLetters;
let   incorrectGuesses;
const maxIncorrectGuesses = 7;
let   lettersMatched;
let   answer;
let   hint;
let   difficultyLevel;


// -------------------------------------------------------------------
// Initial settings: hide the popups and disable the letter buttons.
$popups.css("opacity", transparent);
$popups.fadeOut();

enableLetters(false);

$imageArea.hide();
$gameArea.hide();
$inputLetters.hide();


// -------------------------------------------------------------------
// Click events for the buttons.
$btnStart.click(startGame);
$btnInstruc.click(displayPopup);
$btnClosePopup.click(closePopup);
$btnLetter.click(guessLetter);


// -------------------------------------------------------------------
// Function to start a new game.
function startGame()
{
	// Set variables for a random number (for selecting a word at random).
	let max       = wordList.length - 1;
	let wordIndex = Math.round(Math.random() * max);

	// Set the variable for the number of letters that have been
	// matched.
	lettersMatched = 0;

	$wrapperSubhead.slideUp(fadeDelay);
	$gameTitle.slideUp(fadeDelay);
	$imageArea.slideDown(fadeDelay);
	$gameArea.slideDown(fadeDelay);
	$inputLetters.slideDown(fadeDelay);

	// Enable all the letter buttons.
	enableLetters(true);

	// Get a new word, a hint, and the difficulty level
	answer          = wordList[wordIndex].word;
	hint           = wordList[wordIndex].hint;
	difficultyLevel = wordList[wordIndex].difficulty;

	// Convert the word (string) into a character array
	arrayOfLetters = answer.split('');

	// Empty out any existing letters in the answer area
	$wordArea.html('');

	// Display the correct number of blank lines for the new word
	let htmlText = ``;

	arrayOfLetters.forEach(function()
	{
		htmlText += `<li></li>`
	});

	$wordArea.html(htmlText);

	// Display the hint
	$hintText.html(`Hint: ${hint}`);

	// Reset the 'incorrect guesses' counter and output
	incorrectGuesses = 0;

	$difficulty.html(`Difficulty level: ${difficultyLevel}`);
	$guesses.html(`Incorrect guesses: ${incorrectGuesses}/${maxIncorrectGuesses}`);

	// Display the starting hangman image
	updateImage();
}


// -------------------------------------------------------------------
// Function to respond to the user guessing a letter.
function guessLetter()
{
	// Only continue if the letter button was still enabled
	if($(this).hasClass("btn_enabled"))
	{
		// Set a flag to check if the letter was found in the word
		// and a counter to loop through the letters in the word.
		let letterFound = false;
		let letterCounter = 1;

		// Determine which letter was guessed.
		let currentLetter = $(this).text().toUpperCase();

		// Disable the selected letter button.
		$(this).removeClass("btn_enabled");
		$(this).addClass("btn_disabled");

		// Loop through all the letters in the word's letter array.
		arrayOfLetters.forEach(function(letter)
		{
			// If the letter was found, display it in the correct position
			// and update the variable for the number of letters matched.
			if(currentLetter == letter.toUpperCase())
			{
				$(`#word_letters li:nth-child(${letterCounter})`).html(currentLetter);
				letterFound = true;
				lettersMatched++;
			}

			// Increment the counter
			letterCounter++;
		});

		// If the guessed letter WAS found, check to see if they have found
		// all the letters yet. If so, display a popup letting them know they
		// won and then end the game.
		if(letterFound)
		{
			if(lettersMatched == answer.length)
			{
				gameWon();
			}
		}
		// Otherwise, if the guessed letter was NOT found, increment and update
		// the 'incorrect guesses' counter and change the game image.
		else
		{
			incorrectGuesses += 1;
			$guesses.html(`Incorrect guesses: ${incorrectGuesses}/${maxIncorrectGuesses}`);

			updateImage();

			// If the user has used up their guesses, display a popup
			// letting them know they lost and then end the game.
			if(incorrectGuesses >= maxIncorrectGuesses)
			{
				gameLost();
			}
		}
	}
}

// -------------------------------------------------------------------
// Function to update the game image.
function updateImage()
{
	currentImage = imageFolder + imagePrefix + incorrectGuesses + imageExtension;
	$gameImage.attr("src", currentImage);
}


// -------------------------------------------------------------------
// Function to run if the game was lost.
function gameLost()
{
	// Disable all the letter buttons.
	enableLetters(false);

	$popupLost.css("opacity", opaque);
	$popupLost.fadeIn(fadeDelay);

	console.log(`You lost! The correct answer was: ${answer}.`);
}


// -------------------------------------------------------------------
// Function to run if the game was won.
function gameWon()
{
	// Disable all the letter buttons.
	enableLetters(false);

	$popupWon.css("opacity", opaque);
	$popupWon.fadeIn(fadeDelay);

	console.log('You won!');
}


// -------------------------------------------------------------------
// Function to toggle all letter buttons between disabled and enabled.
function enableLetters(enableThem)
{
	if(enableThem)
	{
		$btnLetter.removeClass("btn_disabled");
		$btnLetter.addClass("btn_enabled");
	}
	else
	{
		$btnLetter.removeClass("btn_enabled");
		$btnLetter.addClass("btn_disabled");	
	}
}


// -------------------------------------------------------------------
// Function to close the popup message.
function closePopup()
{
	$(this).closest('.popup').fadeOut(fadeDelay);
	$(this).closest('.popup').css("opacity", transparent);
}


// -------------------------------------------------------------------
// Function to display the popup message.
function displayPopup()
{
	$popupInstruc.css("opacity", opaque);
	$popupInstruc.fadeIn(fadeDelay);
}
