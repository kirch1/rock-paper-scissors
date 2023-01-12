class Player {
    constructor(name, isComputer) {
        this.name = name;
        this.isComputer = isComputer;
        this.wins = 0;
    }

    takeTurn(gameMode, selection) {
        var fighters = fightersData[gameMode];
        if(this.isComputer){
            selection = Math.ceil(3 * Math.random());
        }
        return fighters[selection];
    }
}
