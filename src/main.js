var player1 = new Player("Human", false, {
    default: 'joy.png',
    win: ['excited.png'],
    lose: ['hate.png', 'confused.png']
});
var player2 = new Player("Robot", true,{
    default: 'smile.png',
    win: ['cool.png', 'grinning.png', 'laugh.png', 'wing.png'],
    lose: ['angry.png', 'sad.png', 'scare.png']
});
var game = null;
var enableUserInteraction = true;

var player1Section = document.getElementById('player-one-section');
var player1Name = document.getElementById('player-one-name');
var player1Score = document.getElementById('player-one-score');
var player1Img = document.getElementById('player-one-img');
var player2Section = document.getElementById('player-two-section');
var player2Name = document.getElementById('player-two-name');
var player2Score = document.getElementById('player-two-score');
var player2Img = document.getElementById('player-two-img');
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
    if(event.target.id === 'fighter' & enableUserInteraction) {
        enableUserInteraction = false;
        selectFighters(event);
        startFightSequence();
    }
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
    resetPlayerSection();
}

function addFighters() {
    var fighters = fightersData[game.gameMode];
    fightersSection.innerHTML = '';
    for(var i = 0; i < fighters.length; i++) {
        fightersSection.innerHTML += `<img draggable="false" id="fighter" class="fighter" data-fighter-index="${i}" src="${fighters[i].img}" alt="${fighters[i].id} fighter" />`
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
        setInfoText(game.playRound());
        showReactions();
        displayPlayerData();
        setTimeout(function() {
            displayFightersSection();
            enableUserInteraction = true;
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

function showReactions() {
    if(game.gameData.winner === 1) {
        player1Img.src = './assets/human/' + getRandomElement(player1.paths.win);
        player2Img.src = './assets/robot/' + getRandomElement(player2.paths.lose);
    }else if(game.gameData.winner === 2) {
        player1Img.src = './assets/human/' + getRandomElement(player1.paths.lose);
        player2Img.src = './assets/robot/' + getRandomElement(player2.paths.win);
    }
}

function resetPlayerSection() {
    player1Section.style.backgroundColor = 'rgba(255, 255, 255, .2)';
    player2Section.style.backgroundColor = 'rgba(255, 255, 255, .2)';
    player1Img.src = './assets/human/' + player1.paths.default;
    player2Img.src = './assets/robot/' + player2.paths.default;
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

function getRandomElement(arr) {
    return arr[Math.floor((arr.length) * Math.random())];
}
