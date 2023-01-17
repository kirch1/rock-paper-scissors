class Fighter {
    constructor(id, img, color, beats) {
        this.id = id;
        this.img = img;
        this.color = color;
        this.beats = beats;
    }
}

var fightersData = {
    classic:[   
        new Fighter('Rock', 'assets/fighters/classic/rock.svg', '#9A7197', ['Scissors']),
        new Fighter('Paper', 'assets/fighters/classic/paper.svg', '#60B2E5', ['Rock']),
        new Fighter('Scissors', 'assets/fighters/classic/scissors.svg', '#FF8966', ['Paper'])
    ],
    advanced: [
        new Fighter('Water', 'assets/fighters/advanced/water.svg', '#4B84AD', ['Fire', 'Plant']),
        new Fighter('Fire', 'assets/fighters/advanced/fire.svg', '#A72608', ['Plant', 'Psychic']),
        new Fighter('Plant', 'assets/fighters/advanced/plant.svg', '#06D6A0', ['Psychic', 'Electric']),
        new Fighter('Psychic', 'assets/fighters/advanced/psychic.svg', '#B47EB3', ['Electric', 'Water']),
        new Fighter('Electric', 'assets/fighters/advanced/electric.svg', '#FFD166', ['Water', 'Fire'])
    ]
};
