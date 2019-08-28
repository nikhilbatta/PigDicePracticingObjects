//frontend
$(document).ready(function(){
  $("#howManyClick").click(function(){
    var diceNum = parseInt($("#howMany").val());
    var a = new Player();
    var b = new Player();
    var game = new Game(a, b, diceNum);
    $('#numInput').hide();
    $('#gameBoard').show();
  $("#rollButton").click(function(){
    game.rollDice();
    if (game.currentPlayer.totalScore + game.turnScore >= 100) {
      $('#win').text("YOU WIN!!");
    }
    $('#turnScore').text(game.turnScore);
    $('#player1Score').text(game.player1.totalScore);
    $('#player2Score').text(game.player2.totalScore);
  });
  $("#endTurn").click(function(){
    $('.alert').toggle();
    game.switchPlayers();
    $('#turnScore').text(game.turnScore);
    $('#player1Score').text(game.player1.totalScore);
    $('#player2Score').text(game.player2.totalScore);
  });
});

});

function Player(){
  this.totalScore = 0;
}

Player.prototype.addRoll = function(roll) {
  this.totalScore += roll;
  if (this.totalScore >= 100) {
    alert("You Won");
  }
}
 Player.prototype.bankrupt = function(){
   this.totalScore = 0
 }
function Game(a, b, diceNum) {
  this.player1 = a;
  this.player2 = b;
  this.diceNum = diceNum;
  this.currentPlayer = this.player1;
  this.turnScore = 0;
}

Game.prototype.switchPlayers = function() {
  this.currentPlayer.totalScore += this.turnScore;
  this.turnScore = 0;
  if (this.currentPlayer == this.player1) {
    this.currentPlayer = this.player2;
  } else {
    this.currentPlayer = this.player1;
  }
}

Game.prototype.rollDice = function() {
  var rolls = [];
  for ( var i = 1; i <= this.diceNum; i++) {
    var roll = (Math.floor(Math.random() * 6 ) + 1);
    rolls.push(roll);
  }
  var ones = 0;
  rolls.forEach(function(roll){
    if(roll === 1) {ones++;}
  });
  console.log(rolls);
  if(ones >= 2){
    console.log("hi");
    this.turnScore = 0;
    this.currentPlayer.bankrupt();
    console.log(this.currentPlayer)
    $('.alert').toggle();
    this.switchPlayers();
  } else if(ones === 1 ){
    this.turnScore = 0;
    $('.alert').toggle();
    this.switchPlayers();
  } else {
    var rollsTotal = 0;
    rolls.forEach(function(roll){
      rollsTotal += roll;
    });
    this.turnScore += rollsTotal;
  }
}
