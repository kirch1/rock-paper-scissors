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

    saveStatsToStorage() {
        localStorage.setItem(this.name + "_wins", this.wins);
        localStorage.setItem(this.name + "_streak", this.streak);
        localStorage.setItem(this.name + "_top_streak", this.topStreak);
    }

    retrieveStatsFromStorage() {
        if(localStorage.getItem(this.name + "_wins") !== null) {
            this.wins = parseInt(localStorage.getItem(this.name + "_wins"));
            this.streak = parseInt(localStorage.getItem(this.name + "_streak"));
            this.topStreak = parseInt(localStorage.getItem(this.name + "_top_streak"));
        }
    }
}
