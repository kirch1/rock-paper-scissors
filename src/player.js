class Player {
    constructor(name) {
        this.name = name;
        this.wins = 0;
    }

    takeTurn(isClassic, selection) {

        if(this.name === 'Robot'){
            if(isClassic){
                selection = Math.ceil(3 * Math.random())
            }
            selection = Math.ceil(5 * Math.random())
        }

        if(isClassic) {
            return basicFighters[selection];
        }else {
            return advancedFighters[selection];
        }
    }
}
