var buttonColor=["green","red","yellow","blue"];
var gamePattern=[];
var userPattern=[];
var level=0;
var start=false;

$('button').click(function(){
  if(!start){
    $('button').text("START").css("background-color","lightgreen").css("display","none");
    $('#title-h1').text("LeveL "+ level );
    nextSequence();
    start=true;
  }
});

$(document).keydown(function(){
if(!start){
  $('#title-h1').text("LeveL "+ level );
  nextSequence();
  start=true;
}

});



$('.btn').click(function(){
  var userChosenColor=$(this).attr("id");
  userPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userPattern.length-1);
});

function checkAnswer(currentLevel)
{ if(gamePattern[currentLevel]===userPattern[currentLevel]){
  if(userPattern.length===gamePattern.length)
  { setTimeout(function(){
    nextSequence();
  },1000);
  }
}
else {
    playSound("wrong");
    $("body").addClass("game-over");
    $('button').text("RESTART").css("background-color","#ff4646").css("display","inline-block");

    $("#title-h1").text("Game Over, Press Any Key to Restart.");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(pressedColor)
{
  $("#"+pressedColor).addClass("pressed");
  setTimeout(()=>{
  $("#"+pressedColor).removeClass("pressed");
},100);
}

function nextSequence()
{
  userPattern = [];
  level++;
  $("#title-h1").text("LeveL " + level);
  var randomNum=Math.floor(Math.random()*4);

  var chosenColor=buttonColor[randomNum];
  gamePattern.push(chosenColor);
  $("#" + chosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(chosenColor);

}

function startOver() {
  level = 0;
  gamePattern = [];
  start = false;
}
