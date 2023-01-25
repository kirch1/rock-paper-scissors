class Game {
    constructor(player1, player2, gameMode) {
        this.player1 = player1;
        this.player2 = player2;
        this.gameMode = gameMode;
        this.gameData = {
            player1Fighter: null,
            player2Fighter: null,
            winner: null
        }
    }

    setFighters(player1Fighter,player2Fighter) {
        this.gameData.player1Fighter = player1Fighter;
        this.gameData.player2Fighter = player2Fighter;
    }

    playRound() {
        const fighter1 = this.gameData.player1Fighter;
        const fighter2 = this.gameData.player2Fighter;

        if(fighter1.id === fighter2.id) {
            this.gameData.winner = null;
            return 'Its a Draw!'
        }
        if(fighter1.beats.includes(fighter2.id)){
            this.processWin(this.player1, this.player2)
            return `${fighter1.id} beats ${fighter2.id}!\n${this.player1.name} WINS!`;
        }
        if(fighter2.beats.includes(fighter1.id)){
            this.processWin(this.player2, this.player1)
            return `${fighter2.id} beats ${fighter1.id}!\n${this.player2.name} WINS!`;
        }
    }

    processWin(winner, loser) {
        winner.giveWin();
        loser.giveLoss();
        winner.saveStatsToStorage();
        loser.saveStatsToStorage();
        this.gameData.winner = winner;
    }

    resetGame() {
        this.gameData = {
            player2Fighter: null,
            player2Fighter: null,
            winner: 0
        }
    }
}
