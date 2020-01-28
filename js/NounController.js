var training;
var currentIndex = 0;
var currentNoun = undefined;

var timeOutId;
var intervalId;
var secondsPerNoun = 30;
var timeLeft = secondsPerNoun;

function getNounsList() {
  var list = [];
  list.push(new Noun("amor", [SIMPLES, ABSTRATO]));
  list.push(new Noun("casa", [SIMPLES]));
  list.push(new Noun("felicidade", [SIMPLES]));
  list.push(new Noun("livro", [SIMPLES]));
  list.push(new Noun("roupa", [SIMPLES]));

  list.push(new Noun("arco-íris", [COMPOSTO]));
  list.push(new Noun("beija-flor", [COMPOSTO]));
  list.push(new Noun("malmequer", [COMPOSTO]));
  list.push(new Noun("passatempo", [COMPOSTO]));
  list.push(new Noun("segunda-feira", [COMPOSTO]));
  list.push(new Noun("aguardente", [COMPOSTO]));
  list.push(new Noun("fidalgo", [COMPOSTO]));
  list.push(new Noun("planalto", [COMPOSTO]));
  list.push(new Noun("vinagre", [COMPOSTO]));

  list.push(new Noun("algodão", [PRIMITIVO]));
  list.push(new Noun("chuva", [PRIMITIVO]));
  list.push(new Noun("folha", [PRIMITIVO]));
  list.push(new Noun("pedra", [PRIMITIVO]));
  list.push(new Noun("quilo", [PRIMITIVO]));

  list.push(new Noun("açucareiro", [DERIVADO]));
  list.push(new Noun("chuvada", [DERIVADO]));
  list.push(new Noun("território", [DERIVADO]));
  list.push(new Noun("jardinagem", [DERIVADO]));
  list.push(new Noun("livraria", [DERIVADO]));

  list.push(new Noun("mãe", [COMUM]));
  list.push(new Noun("uva", [COMUM]));
  list.push(new Noun("computador", [COMUM]));
  list.push(new Noun("papagaio", [COMUM]));
  list.push(new Noun("planeta", [COMUM]));

  list.push(new Noun("Brasil", [PROPRIO]));
  list.push(new Noun("Flávia", [PROPRIO]));
  list.push(new Noun("Nilo", [PROPRIO]));
  list.push(new Noun("Serra da Mantiqueira", [PROPRIO]));

  list.push(new Noun("arquipélago", [COLETIVO]));
  list.push(new Noun("cardume", [COLETIVO]));
  list.push(new Noun("constelação", [COLETIVO]));
  list.push(new Noun("pomar", [COLETIVO]));
  list.push(new Noun("rebanho", [COLETIVO]));

  list.push(new Noun("mesa", [CONCRETO]));
  list.push(new Noun("chuva", [CONCRETO]));
  list.push(new Noun("Felipe", [CONCRETO]));
  list.push(new Noun("cachorro", [CONCRETO]));
  list.push(new Noun("samambaia", [CONCRETO]));

  list.push(new Noun("calor", [ABSTRATO]));
  list.push(new Noun("beleza", [ABSTRATO]));
  list.push(new Noun("pobreza", [ABSTRATO]));
  list.push(new Noun("crescimento", [ABSTRATO]));

  return list;
}

function startTraining() {

  training = new Training(getNounsList());

  document.getElementById("nouns").style = "display: none;";
  document.getElementById("result").style = "";
  document.getElementById("nounPane").style = "";

  setNextNoun();
}
  
function setNextNoun() {
  currentNoun = this.training.getCurrentNoun();

  if(!currentNoun) {
    document.getElementById("nounPane").style = "display: none;";
    return;
  }

  currentIndex++;

  document.getElementById("noun").innerHTML = currentNoun.noun;
  
  timeLeft = secondsPerNoun;
  document.getElementById("seconds").innerHTML = timeLeft;
  intervalId = setInterval(countdown, 1000); 
  timeOutId = setTimeout(function(){ timeOut(currentIndex) }, secondsPerNoun * 1000);
}
      
function countdown() {
  document.getElementById("seconds").innerHTML = timeLeft-1;
  if (timeLeft == 0) {
    clearTimeout(intervalId);
  } else {
    timeLeft--;
  }
}

function timeOut(_currentIndex) {
  if(_currentIndex === currentIndex && !training.getNoun(_currentIndex - 1).answer) {
     checkAnswer(undefined, undefined);
  } 
}

function checkAnswer(enteredValue, event) {
  clearTimeout(timeOutId);
  clearTimeout(intervalId);

  var description = "?";

  if(event) {
    description = event.target.value;
  }
 
  currentNoun.answer = enteredValue;
  currentNoun.responseTime = secondsPerNoun - timeLeft;
  currentNoun.savedTime = timeLeft;
  training.setAnswer(currentNoun);

  if(currentNoun.isCorrectAnswer()) {
    document.getElementById("correctTotal").innerHTML = training.totalCorrectAnswers;
    document.getElementById("correctPanel").innerHTML = document.getElementById("correctPanel").innerHTML + "<br>" + currentNoun.noun + " : " + description;
  } else {
    document.getElementById("wrongTotal").innerHTML = training.totalWrongAnswers;
    document.getElementById("wrongPanel").innerHTML = document.getElementById("wrongPanel").innerHTML + "<br>" + currentNoun.noun + " : " + description + " (valor certo: " + currentNoun.getTypes() + ")" ;
  }
  
  document.getElementById("total").innerHTML = training.totalOperationsAnswered;

  document.getElementById("avarageTime").innerHTML = training.getAvarageResponseTime();

  document.getElementById("score").innerHTML = training.totalScore;

  setNextNoun();
}
