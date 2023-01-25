const player1 = new Player("Human", false, {
    default: 'joy.png',
    win: ['excited.png'],
    lose: ['hate.png', 'confused.png']
});
const player2 = new Player("Robot", true,{
    default: 'smile.png',
    win: ['cool.png', 'grinning.png', 'laugh.png', 'wink.png'],
    lose: ['angry.png', 'sad.png', 'scare.png']
});
player1.retrieveStatsFromStorage();
player2.retrieveStatsFromStorage();
let game = null;
let enableUserInteraction = true;

const player1Section = document.getElementById('player-one-section');
const player1Name = document.getElementById('player-one-name');
const player1Score = document.getElementById('player-one-score');
const player1Streak = document.getElementById('player-one-streak');
const player1StreakMax = document.getElementById('player-one-streak-max');
const player1Img = document.getElementById('player-one-img');
const player2Section = document.getElementById('player-two-section');
const player2Name = document.getElementById('player-two-name');
const player2Score = document.getElementById('player-two-score');
const player2Streak = document.getElementById('player-two-streak');
const player2StreakMax = document.getElementById('player-two-streak-max');
const player2Img = document.getElementById('player-two-img');
const infoText = document.getElementById('info-text');
const gameSelectorSection = document.getElementById('selection-section');
const classicSelector = document.getElementById('classic-selection');
const advancedSelector = document.getElementById('advanced-selection');
const fightersSection = document.getElementById('fighters-selection');
const changeGame = document.getElementById('change-game');
const resetStats = document.getElementById('reset-stats');

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
        selectFighters(event);
        startFightSequence();
    }
});

changeGame.addEventListener('click', function() {
    show(gameSelectorSection);
    setInfoText('Select Game Mode!');
    hide(fightersSection);
    hide(changeGame);
});

resetStats.addEventListener('click', function() {
    player1.resetStats();
    player2.resetStats();
    displayPlayerData();
});

function displayPlayerData() {
    player1Name.innerText = player1.name;
    player1Score.innerText = player1.wins;
    player1Streak.innerText = player1.streak;
    player1StreakMax.innerText = player1.topStreak;
    player2Name.innerText = player2.name;
    player2Score.innerText = player2.wins;
    player2Streak.innerText = player2.streak;
    player2StreakMax.innerText = player2.topStreak;
}

function displayFightersSection() {
    show(changeGame);
    hide(gameSelectorSection);
    addFighters();
    setInfoText('Select Your Fighter!');
    show(fightersSection);
}

function addFighters() {
    const fighters = fightersData[game.gameMode];
    fightersSection.innerHTML = '';
    fighters.forEach((fighter,i) => {
        fightersSection.innerHTML += `<img draggable="false" id="fighter" class="fighter" data-fighter-index="${i}" src="${fighter.img}" alt="${fighter.id} fighter"/>`
    }) 
}

function selectFighters(event) {
    const fighterIndex = event.target.dataset.fighterIndex;
    const player1Fighter = player1.takeTurn(game.gameMode, fighterIndex);
    const player2Fighter = player2.takeTurn(game.gameMode);
    game.setFighters(player1Fighter, player2Fighter);
}

function startFightSequence() {
    enableUserInteraction = false;
    hide(changeGame);
    hide(resetStats);
    displayPlayer1Selection();
    setTimeout(function() {
        displayPlayer2Selection();
        setInfoText(game.playRound());
        showReactions();
        displayPlayerData();
        setTimeout(function() {
            displayFightersSection();
            enableUserInteraction = true;
            game.resetGame();
            resetPlayerSections();
            show(changeGame);
            show(resetStats);
        }, 2600);
    },1200);
}

function displayPlayer1Selection() {
    const fighter = game.gameData.player1Fighter;
    setInfoText(`${player1.name} picked ${fighter.id}!`);
    player1Section.style.backgroundColor = fighter.color + '90';
    fightersSection.innerHTML = '';
    fightersSection.innerHTML += `<img draggable="false" class="fighter" src="${fighter.img}" alt="${fighter.id} fighter"/>`
}

function displayPlayer2Selection() {
    const fighter = game.gameData.player2Fighter;
    player2Section.style.backgroundColor = fighter.color + '90';
    fightersSection.innerHTML += '<p> VS. </p>'
    fightersSection.innerHTML += `<img draggable="false" class="fighter" src="${fighter.img}" alt="${fighter.id} fighter"/>`
}

function showReactions() {
    if(game.gameData.winner === player1) {
        player1Img.src = './assets/human/' + getRandomElement(player1.paths.win);
        player2Img.src = './assets/robot/' + getRandomElement(player2.paths.lose);
    }else if(game.gameData.winner === player2) {
        player1Img.src = './assets/human/' + getRandomElement(player1.paths.lose);
        player2Img.src = './assets/robot/' + getRandomElement(player2.paths.win);
    }
}

function resetPlayerSections() {
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
