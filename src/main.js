var player1 = new Player("Jason", false);
var player2 = new Player("Robro", true);
var game = null;

var player1Section = document.getElementById('player-one-section');
var player1Name = document.getElementById('player-one-name');
var player1Score = document.getElementById('player-one-score');
var player2Section = document.getElementById('player-two-section');
var player2Name = document.getElementById('player-two-name');
var player2Score = document.getElementById('player-two-score');
var infoText = document.getElementById('info-text');
var gameSelectorSection = document.getElementById('selection-section');
var classicSelector = document.getElementById('classic-selection');
var advancedSelector = document.getElementById('advanced-selection');
var fightersSection = document.getElementById('fighters-selection');

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

fightersSection.addEventListener('click', function(event) {
    selectFighters(event);
    startFightSequence();
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
    setInfoText('Select Your Fighter!');
    show(fightersSection);
    player1Section.style.backgroundColor = 'rgba(255, 255, 255, .2)';
    player2Section.style.backgroundColor = 'rgba(255, 255, 255, .2)';
}

function addFighters() {
    var fighters = fightersData[game.gameMode];
    fightersSection.innerHTML = '';
    for(var i = 0; i < fighters.length; i++) {
        fightersSection.innerHTML += `<img draggable="false" class="fighter" data-fighter-index="${i}" src="${fighters[i].img}" alt="${fighters[i].id} fighter" />`
    }
}

function selectFighters(event) {
    var fighterIndex = event.target.dataset.fighterIndex;
    var player1Fighter = player1.takeTurn(game.gameMode, fighterIndex);
    var player2Fighter = player2.takeTurn(game.gameMode);
    game.setFighters(player1Fighter, player2Fighter);
}

function startFightSequence() {
    displayPlayer1Selection();
    setTimeout(function() {
        displayPlayer2Selection();
        var result = game.playRound();
        var f1 = game.gameData.player1Fighter.id;
        var f2 = game.gameData.player2Fighter.id;
        setInfoText(`${f1} vs ${f2}\n${result}`);
        displayPlayerData();
        setTimeout(function() {
            displayFightersSection();
        }, 2500);
    },1000);
}

function displayPlayer1Selection() {
    var fighter = game.gameData.player1Fighter;
    setInfoText(`${player1.name} picked ${fighter.id}!`);
    player1Section.style.backgroundColor = fighter.color + '90';
    fightersSection.innerHTML = '';
    fightersSection.innerHTML += `<img draggable="false" class="fighter" src="${fighter.img}" alt="${fighter.id} fighter"/>`
}

function displayPlayer2Selection() {
    var fighter = game.gameData.player2Fighter;
    player2Section.style.backgroundColor = fighter.color + '90';
    fightersSection.innerHTML += `<img draggable="false" class="fighter" src="${fighter.img}" alt="${fighter.id} fighter"/>`
}

function setInfoText(text) {
    infoText.innerText = text;
}

function show(element) {
    element.classList.remove('hidden');
}

function hide(element) {
    element.classList.add('hidden');
}
