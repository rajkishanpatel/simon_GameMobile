var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickPattern = [];
var started = false;
var level = 0;


// STARTING NEW GAME ON KEY PRESS
$(document).click(function () {
    if (!started) {
        $(".text-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


// USER CLICK
$(".btn").click(function () {
    var userChosenColour = this.id;
    // console.log(userChosenColour);
    userClickPattern.push(userChosenColour);

    // USER CLICK SOUND
    sound(userChosenColour);

    // USER CLICK ANIMATION
    animation(userChosenColour);

    // CHECKING ANSWER
    checkAnswer(userClickPattern.length - 1);

});

function checkAnswer(gameLevel) {
    if (gamePattern[gameLevel] === userClickPattern[gameLevel]) {
        if (gamePattern.length === userClickPattern.length) {
            setTimeout(function () {
                nextSequence()
            }, 1000);
        }
    } else {
        sound("wrong");
        $("body").addClass("game-over")
        $(".text-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200);

        startOver();
    };
}



// GAME PATTERN
function nextSequence() {
    userClickPattern = [];
    level++;
    $(".text-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // GAME PATTERN SOUND AND ANIMATION
    sound(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
}


function sound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animation(colour) {
    $("#" + colour).addClass("pressed");
    setTimeout(function () {
        $("#" + colour).removeClass("pressed")
    }, 150);
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

