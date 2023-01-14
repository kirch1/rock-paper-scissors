var player1 = new Player("Jason", false);
var player2 = new Player("Robro", true);
var game = null;

var player1Section = document.getElementById('player-one-section');
var player1Name = document.getElementById('player-one-name');
var player1Score = document.getElementById('player-one-score');
var player2Section = document.getElementById('player-two-section');
var player2Name = document.getElementById('player-two-name');
var player2Score = document.getElementById('player-two-score');
var gameSelectorSection = document.getElementById('selection-section');
var classicSelector = document.getElementById('classic-selection');
var advancedSelector = document.getElementById('advanced-selection');
var fightersSection = document.getElementById('fighters-selection')

window.addEventListener('load', function() {
    displayPlayerData();
});

classicSelector.addEventListener('click', function() {
    game = new Game(player1, player2, 'classic');
    displayFightersSection();
});

advancedSelector.addEventListener('click', function() {
    game = new Game(player1, player2, 'advanced');
    displayFightersSection();
});

function displayPlayerData() {
    player1Name.innerText = player1.name;
    player1Score.innerText = player1.wins;
    player2Name.innerText = player2.name;
    player2Score.innerText = player2.wins;
}

function displayFightersSection() {
    hide(gameSelectorSection);
    addFighters();
    show(fightersSection);
}

function addFighters() {
    var fighters = fightersData[game.gameMode];
    fightersSection.innerHTML = '';
    for(var i = 0; i < fighters.length; i++) {
        fightersSection.innerHTML += `<img class="fighter" src="${fighters[i].img}" alt="${fighters[i].id} fighter" />`
    }
}

function show(element) {
    element.classList.remove('hidden');
}

function hide(element) {
    element.classList.add('hidden');
}
