let buttonColors = ["red", "blue", "green", "yellow"];
let userClickedPatern = [];
let gamePattern = [];
let level = 0;
let started = false;

/**
 * Function that generate a new random number.
 * @returns random number between 0 and 3
 */
const randomNumber = function () {
  return Math.floor(Math.random() * 4);
};

/**
 * Function that generate the game pattern, set animation on div elements and clean variables.
 */
const nextSequence = function () {
  userClickedPatern = [];
  level++;
  $("#level-title").text("Nivel " + level);
  let random = randomNumber();
  let randomChosenColour = buttonColors[random];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
};

/**
 * Function that reproduces the audio according to the color it receives as a parameter.
 * @param {"The name of the color"} name 
 */
const playSound = function (name) {
  let audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
};

/**
 * Function that set animation on the user answer.
 * @param {"The name of the color"} currentColour 
 */
const animatePress = function (currentColour) {
  let activeButton = document.querySelector("#" + currentColour);
  activeButton.classList.add("pressed");
  setTimeout(() => {
    activeButton.classList.remove("pressed");
  }, 100);
};

/**
 * Function that checks the user's response with the game pattern
 * @param {"Index value of the last element of the array"} currentLevel 
 */
const checkAnswer = function (currentLevel) {
  if (gamePattern[currentLevel] === userClickedPatern[currentLevel]) {
    if (userClickedPatern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("#level-title").text("Game Over, Presiona una tecla para reiniciar");
    let body = document.querySelector("body");
    body.classList.add("game-over");
    setTimeout(() => {
      body.classList.remove("game-over");
    }, 200);
    startOver();
  }
};

/**
 * Function that clears the game control variables.
 */
const startOver = function () {
  level = 0;
  gamePattern = [];
  started = false;
};

//When the event click on a color happens, it calls the functions and takes the id of the color.
$(".btn").click(function () {
  let value = $(this).attr("id");
  userClickedPatern.push(value);
  playSound(value);
  animatePress(value);
  checkAnswer(userClickedPatern.length - 1);
});

//When the event key press occurs, it checks if the game started, or if not, it keeps the next level of the game.
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
