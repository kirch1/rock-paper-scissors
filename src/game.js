class Game {
    constructor(player1, player2, gameMode) {
        this.player1 = player1;
        this.player2 = player2;
        this.gameMode = gameMode;
        this.gameData = {
            player1Fighter: null,
            player2Fighter: null
        }
    }

    setFighters(player1Fighter,player2Fighter) {
        this.gameData.player1Fighter = player1Fighter;
        this.gameData.player2Fighter = player2Fighter;
    }

    playRound() {
        var fighter1 = this.gameData.player1Fighter;
        var fighter2 = this.gameData.player2Fighter;

        if(fighter1.id === fighter2.id) {
            return 'DRAW!'
        }
        if(fighter1.beats.includes(fighter2.id)){
            this.player1.wins++;
            return `${this.player1.name} WINS!`;
        }
        if(fighter2.beats.includes(fighter1.id)){
            this.player2.wins++;
            return `${this.player2.name} WINS!`;
        }
        return 'GAME ERROR';
    }

    resetGame() {
        this.gameData = {
            player2Fighter: null,
            player2Fighter: null
        }
    }
}
