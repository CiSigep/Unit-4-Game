var game;

function RNGRange(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(function(){
    game = {
        // Variables
        scoreToMatch,
        totalScore,
        wins,
        losses,
        values: [],

        // Elements
        crystals: $('.crystal'),
        matchElement: $('#scoreToMatch'),
        scoreElement: $('#totalScore'),
        winsElement: $('#wins span'),
        lossesElement: $('#losses span'),

        //Functions
        render(){
            this.matchElement.text(this.scoreToMatch);
            this.scoreElement.text(this.totalScore);

            this.winsElement.text(this.wins);
            this.lossesElement.text(this.losses);
        },

        reset(){
            this.scoreToMatch = RNGRange(19, 120);
            this.totalScore = 0;

            this.values = [];

            for(var i = 0; i < this.crystals.length; i++)
                this.values.push(RNGRange(1, 12));
        },

        initialize(){
            this.wins = 0;
            this.losses = 0;
            this.reset();
            
            this.crystals.click(function(event){
                game.setTotalScore(game.getTotalScore() + game.getValue($(this).data("which")));

                game.render();
            });

            this.render();
        },

        setTotalScore(totalScore) {
            this.totalScore = totalScore;
        },

        getTotalScore(){
            return this.totalScore;
        },

        getValue(index){
            return this.values[index]
        }

    }

    game.initialize();
});