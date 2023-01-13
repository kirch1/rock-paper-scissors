var player1 = new Player("Jason", false);
var player2 = new Player("Robro", true);
var game = null;

var player1Section = document.getElementById('player-one-section');
var player1Name = document.getElementById('player-one-name');
var player1Score = document.getElementById('player-one-score');
var player2Section = document.getElementById('player-two-section');
var player2Name = document.getElementById('player-two-name');
var player2Score = document.getElementById('player-two-score');



window.addEventListener('load', function() {
    displayPlayerData();
});

function displayPlayerData() {
    player1Name.innerText = player1.name;
    player1Score.innerText = player1.wins;
    player2Name.innerText = player2.name;
    player2Score.innerText = player2.wins;
}
