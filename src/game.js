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
        var fighter1 = this.gameData.player1Fighter;
        var fighter2 = this.gameData.player2Fighter;

        if(fighter1.id === fighter2.id) {
            this.gameData.winner = null;
            return 'Its a Draw!'
        }
        if(fighter1.beats.includes(fighter2.id)){
            this.player1.giveWin();
            this.player2.giveLoss();
            this.player1.saveStatsToStorage();
            this.player2.saveStatsToStorage();
            this.gameData.winner = this.player1;
            return `${fighter1.id} beats ${fighter2.id}!\n${this.player1.name} WINS!`;
        }
        if(fighter2.beats.includes(fighter1.id)){
            this.player2.giveWin();
            this.player1.giveLoss();
            this.player1.saveStatsToStorage();
            this.player2.saveStatsToStorage();
            this.gameData.winner = this.player2;
            return `${fighter2.id} beats ${fighter1.id}!\n${this.player2.name} WINS!`;
        }

    }

    resetGame() {
        this.gameData = {
            player2Fighter: null,
            player2Fighter: null,
            winner: 0
        }
    }
}
