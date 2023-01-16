class Player {
    constructor(name, computerControlled, paths) {
        this.name = name;
        this.computerControlled = computerControlled;
        this.paths = paths;
        this.wins = 0;
        this.streak = 0;
        this.topStreak = 0;
    }

    takeTurn(gameMode, selection) {
        var fighters = fightersData[gameMode];
        if(this.computerControlled){
            selection = Math.floor((fighters.length) * Math.random());
        }
        return fighters[selection];
    }

    giveWin() {
        this.wins++;
        this.streak++;
        if(this.streak > this.topStreak) {
            this.topStreak = this.streak;
        }
    }

    giveLoss() {
        this.streak = 0;
    }
}
