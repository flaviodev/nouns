class Noun {
    constructor(noun, type) {
      this.noun = noun;
      this.type = type;
      this.answer = undefined;
      this.responseTime = undefined;
      this.savedTime = undefined;
    }

    isCorrectAnswer() {
      var result = false;

      this.type.forEach(t => {
        if(this.answer === t.id) {
          result = true;
          return;
        }
      });

      return result;
    }
    
    getTypes() {
      var types = [];

      this.type.forEach(t => {
        types.push(t.description);
      });

      return types.join(" ou ");
    }

    toString() {
      var _answer = "?";
      if(this.answer)
        _answer = this.answer;

      return this.nuoun + " : " +  _answer;
    }
}