class Training {
    constructor(arrayNouns) {
      this.nouns = this._shuffle(arrayNouns);
      this.currentNounIndex = 0;
      this.totalnounsAnswered = 0;
      this.totalWrongAnswers = 0;
      this.totalCorrectAnswers = 0;
      this.totalTimeResponse = 0;
      this.totalScore = 0;
    }

    getNoun(index) {
        return this.nouns[index];
    }

    getCurrentNoun() {
        if(this.currentNounIndex >= this.nouns.length)
            return undefined;

        return this.nouns[this.currentNounIndex];
    }

    setAnswer(noun) {
        this.nouns[this.currentNounIndex] = noun;

        if(noun.isCorrectAnswer()) {
            this.totalCorrectAnswers++;
            this.totalScore += 10;
            this.totalScore += Math.round(noun.savedTime/2);
        } else {
            this.totalWrongAnswers++;
            if(this.totalScore >= 5) {
                this.totalScore -= 5;
            } else {
                this.totalScore = 0;
            }
        }

        this.totalnounsAnswered++;
        this.totalTimeResponse += noun.responseTime;

        this.currentNounIndex++;
    }

    getAvarageResponseTime() {
        return  Math.ceil(this.totalTimeResponse / this.totalnounsAnswered);
    }

    _shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        
        while (0 !== currentIndex) {
        
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
        
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        
        return array;
    }    
}