var game;

function RNGRange(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(function(){
    game = {
        // Variables
        scoreToMatch: 0,
        totalScore: 0,
        wins: 0,
        losses: 0,
        values: [],

        // Elements
        crystals: $('.crystal'),
        matchElement: $('#scoreToMatch'),
        scoreElement: $('#totalScore'),
        winsElement: $('#wins span'),
        lossesElement: $('#losses span'),

        //Functions
        // Renders values to the browser
        render(){
            this.matchElement.text(this.scoreToMatch);
            this.scoreElement.text(this.totalScore);

            this.winsElement.text(this.wins);
            this.lossesElement.text(this.losses);
        },

        // Resets the game
        reset(){
            var viableGame = false;

            while(!viableGame){
                this.scoreToMatch = RNGRange(19, 120);
                this.totalScore = 0;

                this.values = [];

                for(var i = 0; i < this.crystals.length; i++)
                    this.values.push(RNGRange(1, 12));

                // Don't give the player an unwinnable game.
                viableGame = this.isValidGame(this.scoreToMatch, this.values);
            }
        },

        // Initialize the object
        initialize(){
            this.wins = 0;
            this.losses = 0;
            this.reset();
            
            // Set Click on all the crystals
            this.crystals.click(function(event){
                game.setTotalScore(game.getTotalScore() + game.getValue($(this).data("which")));

                if(game.getTotalScore() === game.getScoreToMatch()){
                    game.incrementWins();
                    game.reset();
                }
                else if(game.getTotalScore() > game.getScoreToMatch()){
                    game.incrementLosses();
                    game.reset();
                } 

                game.render();
            });

            this.render();
        },

        // Checks if we have a winnable game
        isValidGame(score, arr) {
            // Games with 1 in the array are always winnable
            if(arr.indexOf(1) !== -1)
                return true;

            // To verify, we need the unique values in sorted order.
            var uniqueArr = arr.filter(function(item, index){
                return arr.indexOf(item) >= index;
            });

            uniqueArr.sort(function(a, b){ return a - b; });

            //console.log(arr);
            //console.log(uniqueArr);
            
            return this.isValidRec(score, uniqueArr).isIt;
        },

        // Checking if the game is winnable is a Combinational Sum problem
        // We can use a recursive algorithm to find a solution
        // If no solution is found, the game shouldn't be winnable
        isValidRec(rem, arr, possible = { isIt: false }, start = 0){
            // We've gone past our value or a solution has already been found, return.
            if(rem < 0 || possible.isIt)
              return possible;
            // Solution found, flip possible's value to true
            else if (rem === 0){
              possible.isIt = true;
          
              return possible;
            }
            
            // Still looking, take more from the value we're looking at.
            // Remember where we've been, so we don't retry a potential solution.
            for(var i = start; i < arr.length; i++)
              this.isValidRec(rem - arr[i], arr, possible, i);
          
            return possible;
        },

        // Get and Set
        setTotalScore(totalScore) {
            this.totalScore = totalScore;
        },

        getTotalScore(){
            return this.totalScore;
        },

        getValue(index){
            return this.values[index]
        },

        getScoreToMatch(){
            return this.scoreToMatch;
        },

        incrementWins(){
            this.wins++;
        },

        incrementLosses(){
            this.losses++;
        }

    }

    game.initialize();
});