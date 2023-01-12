class Game {
    constructor(player1, computer, gameMode) {
        this.player1 = player1;
        this.computer = computer;
        this.gameMode = 'classic';
        this.gameData = {
            humanFighter: null,
            computerFighter: null
        }
    }

    setFighters(humanFighter,computerFighter) {
        this.gameData.humanFighter = humanFighter;
        this.gameData.computerFighter = computerFighter;
    }

    playRound() {
        if(humanFighter.id === robotFighter.id) {
            return 'DRAW!'
        }
        if(humanFighter.beats.includes(robotFighter.id)){
            this.human.wins++;
            return `${this.human.name} WINS!`;
        }
        this.robot.wins++;
        return `${this.robot.name} WINS!`;
    }

    resetGame() {
        this.gameData = {
            humanFighter: null,
            computerFighter: null
        }
    }
}
