let buttonColours = ["red","blue","green","yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence(){

    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);

    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


$(".btn").click(function(event){
    let userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

$(".btn").click(function(event){
    animatePress(event.target.id);
});

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100)
}

function checkAnswer(current){
    if(userClickedPattern[current] === gamePattern[current]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence()
            },1000)
        }
    }else{
        playSound("Wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}