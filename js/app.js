// Ramndomize the model, so each game is unique. Needs to run only on initial load. function (from W3schools) that randomizes the wordPool array, so each game will be unique.
var scramble = function(){
  wordPool = wordPool.sort(function(a, b){
     return 0.5 - Math.random();
   });
};
scramble();

// wordPool.sort(function(a, b){
//    return 0.5 - Math.random();
//  });

console.log(wordPool);

var level = 0;

// creation of the word to guess.

var splitWord="";

var randomWordPicker = function(){
  splitWord =wordPool[level].name.toLowerCase("").trim().split("");
};
randomWordPicker();
console.log(splitWord);

// Creation of the blanked/Hidden worded

var blankedWord = [];

var blankify = function (splitWord){
  for (var i=0; i < splitWord.length; i++){
    blankedWord.push(" _ ");
  }
};
blankify(splitWord);
console.log(blankedWord);

var playerLives = 5;


/*
***User interaction section***
*/

var guessedLetters = [];

document.onkeyup = function(event) {
  if ((letterPool.indexOf(event.key) === -1)){
    console.log("bad choice");
  }
  else{
    gameEngine();
  }
};


// function to cature a key press
document.onkeyup = function(event) {

  if ((letterPool.indexOf(event.key) > -1)){

    //this statement will check if the letter is already guessed and in the word, if both are no it subtracts a life.
    if ((splitWord.indexOf(event.key) === -1) && (guessedLetters.indexOf(event.key) === -1)){
      playerLives = playerLives - 1;
    }

    //this statement checks if the letter has already been pushed, if so, nothing happens, if not it pushes it to the already guessed array.
    if (guessedLetters.indexOf(event.key) === -1){
      //console.log(event.key);
      guessedLetters.push(event.key);
      guessedLetters.sort();
      console.log("letters that have been guessed " +guessedLetters);
    }

    //this statement loops through the blanked word and replaces a letter if the player guesses right.
    for (var i = 0; i < blankedWord.length; i++) {
      if (splitWord[i] === (event.key)){
        blankedWord[splitWord.indexOf(event.key, [i])] = event.key;
        console.log("corrrect letter is "+ event.key);
        console.log(blankedWord);
      }
    }
    if(playerLives === 0){
      //reset();
      $("#loseModal").modal("show");
      modalText("lFlagImg","lmName", "lmRegion", "lmCapital", "lmPop", "lmFacts", "lWiki");
    }
    populate();
    if((blankedWord.join("")) === (splitWord.join(""))){
      console.log("you winner");
      $("#winModal").modal("show");
      modalText("flagImg","mName", "mRegion", "mCapital", "mPop", "mfacts", "wiki");
      levelUp();
    }
  }
};

//this function populates the HTML on changes, called on every key stroke
var populate = function(){
  document.getElementById('guesses').innerHTML = guessedLetters.join("  ");
  document.getElementById("level").textContent = "Level: " + level;
  document.getElementById("word").innerHTML = blankedWord.join(" ");
  document.getElementById("lives").textContent = "Lives: " + playerLives;
};
populate();

var modalText = function(a,b,c,d,e,f,g){
  document.getElementById(a).src = "img/flags/"+wordPool[level].code + ".svg";
  document.getElementById(b).innerHTML = splitWord.join("").toUpperCase();
  document.getElementById(c).textContent = "Region: " + wordPool[level].region;
  document.getElementById(d).textContent = "Capital: " + wordPool[level].capital;
  document.getElementById(e).textContent = "Population: " + wordPool[level].popu;
  document.getElementById(f).innerHTML = "Click the Wikipedia button to learn more interesting facts about "+ splitWord.join("").toUpperCase() + "!";
  document.getElementById(g).href = "https://en.wikipedia.org/wiki/"+splitWord.join("");
};

var levelUp = function(){
  level++;
  playerLives = 5;
  splitWord="";
  blankedWord = [];
  guessedLetters = [];

  randomWordPicker();
  blankify(splitWord);
  populate();

   console.log(wordPool);
   console.log(splitWord);
   console.log(blankedWord);
};

var reset = function(){
  level = 0;
  scramble();
  levelUp();

   console.log(wordPool);
   console.log(splitWord);
   console.log(blankedWord);
};
