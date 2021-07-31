//button colrs to be clicked
var buttonColors = ["red", "yellow", "blue", "green"];
//empty array to store game pattern
var gamePattern = [];
var userClickedPattern = [];

var started = false;

//Create a new variable called level and start at level 0.
var level = 0;

//to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  });

function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    //console.log("sucees");
    if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
        }, 1000);
    }
}else{
    //console.log("wrong");
    playSound("wrong");
    //apply game-over(css) class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
     //change the contents displayed by the h1 display game over
     $("#level-title").text("Game Over, Press a key to play again!");
     //remove that class from body of the game after 200 milisecs
     setTimeout(function(){
        $("body").removeClass("game-over");
     }, 200);
     startAgain();
}
}

function startAgain(){
level = 0;
gamePattern = [];
started = false;
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    //generate random numbers
    var randomNumber = Math.floor(Math.random() * 4);
    //get any random buttoncolor
    var randomButtonColorChosen = buttonColors[randomNumber];
    //add this buttoncolor to the gamePattern
    gamePattern.push(randomButtonColorChosen);
    
$("#"+randomButtonColorChosen).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomButtonColorChosen);
}

function playSound(name){
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

