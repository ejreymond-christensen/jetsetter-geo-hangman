/*
*** Global Variables ***
*/
var level = 0;
var splitWord="";
var blankedWord = [];
var playerLives = 5;
var guessedLetters = [];


/*
*** View Model - Set up ***
*/

// Ramndomize the model, so each game is unique. Needs to run only on initial load. function (from W3schools) that randomizes the wordPool array, so each game will be unique.
var scramble = function(){
  wordPool = wordPool.sort(function(a, b){
     return 0.5 - Math.random();
   });
};
scramble();
//console.log(wordPool);


// creation of the splitWord array so each letter has to be guessed.
var randomWordPicker = function(){
  splitWord =wordPool[level].name.toLowerCase("").trim().split("");
};
randomWordPicker();
//console.log(splitWord);


// Creation of the blanked/Hidden word stored in blankedWord, so the unguessed letters do not show.
var blankify = function (splitWord){
  for (var i=0; i < splitWord.length; i++){
    if ((letterPool.indexOf(splitWord[i]) > -1)){
      blankedWord.push(" _ ");
    }
    else{
      blankedWord.push(splitWord[i]);
    }
  }
};
blankify(splitWord);
//console.log(blankedWord);


/*
*** ViewModel - User interaction section ***
*/

// function to cature a key press.
document.onkeyup = function(event) {

  // this statement checks if the key is a valid letter.
  if ((letterPool.indexOf(event.key) > -1)){

    //this statement will check if the letter is already guessed and in the word, if both are no it subtracts a life.
    if ((splitWord.indexOf(event.key) === -1) && (guessedLetters.indexOf(event.key) === -1)){
      playerLives = playerLives - 1;
    }

    //this statement checks if the letter has already been guessed, if so, nothing happens, if not it pushes it to the already guessed array.
    if (guessedLetters.indexOf(event.key) === -1){
      //console.log(event.key);
      guessedLetters.push(event.key);
      guessedLetters.sort();
      //console.log("letters that have been guessed " +guessedLetters);
    }

    //this statement loops through the blanked word and replaces a letter if the player guesses right.
    for (var i = 0; i < blankedWord.length; i++) {
      if (splitWord[i] === (event.key)){
        blankedWord[splitWord.indexOf(event.key, [i])] = event.key;
        //console.log("corrrect letter is "+ event.key);
        //console.log(blankedWord);
      }
    }
    // this statement determines if the player has lost and creates the lost modal.
    if(playerLives === 0){
      $("#loseModal").modal("show");
      modalText("lFlagImg","lmName", "lmRegion", "lmCapital", "lmPop", "lmFacts", "lWiki", "lmArea");
    }
    populate();
    // this statement determines if the player has won and creates the win modal.
    if((blankedWord.join("")) === (splitWord.join(""))){
      //console.log("you winner");
      $("#winModal").modal("show");
      modalText("flagImg","mName", "mRegion", "mCapital", "mPop", "mfacts", "wiki", "mArea");
      levelUp();
    }
  }
};

//this function populates the HTML on changes, called on every key stroke.
var populate = function(){
  document.getElementById('guesses').innerHTML = guessedLetters.join("  ");
  document.getElementById("level").textContent = "Level: " + level;
  document.getElementById("word").innerHTML = blankedWord.join("&nbsp");
  document.getElementById("lives").textContent = "Lives: " + playerLives;
  document.getElementById("hint").textContent = "Hint: It is in the region of " + wordPool[level].region;
};
populate();

//This function populates the modal on a win or loss.
var modalText = function(a,b,c,d,e,f,g,h){
  document.getElementById(a).src = "img/flags/"+wordPool[level].code + ".svg";
  document.getElementById(b).innerHTML = splitWord.join("").toUpperCase();
  document.getElementById(c).textContent = "Region: " + wordPool[level].region;
  document.getElementById(d).textContent = "Capital: " + wordPool[level].capital;
  document.getElementById(e).textContent = "Population: " + wordPool[level].popu;
  document.getElementById(f).innerHTML = "Click the Wikipedia button to learn more interesting facts about "+ splitWord.join("").toUpperCase() + "!";
  document.getElementById(g).href = "https://en.wikipedia.org/wiki/"+wordPool[level].name;
  document.getElementById(h).textContent = "Area: " + wordPool[level].area +" km²";
};

//On a win this this function resets the match.
var levelUp = function(){
  level++;
  playerLives = 5;
  splitWord="";
  blankedWord = [];
  guessedLetters = [];

  randomWordPicker();
  blankify(splitWord);
  populate();

   // console.log(wordPool);
   // console.log(splitWord);
   // console.log(blankedWord);
};

//On a loss this function resets the match, level and scrambles the array, so the whole game is reset.
var reset = function(){
  level = 0;
  scramble();
  levelUp();

  // console.log(wordPool);
  // console.log(splitWord);
  // console.log(blankedWord);
};
