//frontend
$(document).ready(function(){
  var a = new Player();
  var b = new Player();
  var game = new Game(a, b);
  console.log(game)
  $("#rollButton").click(function(){
    game.rollDice();
    if (game.currentPlayer.totalScore + game.turnScore >= 100) {
      $('#win').text("YOU WIN!!");
    }
    // $('#player1Score').text(game.player1.totalScore);
    $('#turnScore').text(game.turnScore);
  });
  $("#endTurn").click(function(){
    game.switchPlayers();
    $('#turnScore').text(game.turnScore);
    $('#player1Score').text(game.player1.totalScore);
    $('#player2Score').text(game.player2.totalScore);
  })
});

//backend
// var game = new Game(player1, player2);
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


function Game(a, b) {
  this.player1 = a;
  this.player2 = b;
  this.currentPlayer = this.player1;
  this.turnScore = 0;
}

// var game = new Game(player1, player2);


Game.prototype.switchPlayers = function() {
  $('.alert').toggle();
  this.currentPlayer.totalScore += this.turnScore;
  this.turnScore = 0;
  if (this.currentPlayer == this.player1) {
    this.currentPlayer = this.player2;
  } else {
    this.currentPlayer = this.player1;
  }
}

Game.prototype.rollDice = function() {
  var roll = (Math.floor(Math.random() * 6 ) + 1);
  console.log("roll=" + roll);
  if (roll > 1) {
    this.turnScore += roll;
  } else {
    this.turnScore = 0;
    this.switchPlayers();
  }
  console.log(this.turnScore);





}
