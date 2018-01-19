// Model - Word bank for the hangman game. All one worded countries.

var wordPool = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia",
  "Austria", "Azerbaijan", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium ", "Belize", "Benin", "Bhutan",
  "Bolivia", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burundi", "Cambodia", "Cameroon", "Canada", "Chad",
  "Chile", "China", "Colombia", "Comoros", "Croatia", "Cuba", "Cyprus", "Czechia", "Denmark", "Djibouti",
  "Dominica", "Ecuador", "Egypt", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guyana", "Haiti",
  "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia",
  "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico",
  "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman",
  "Pakistan", "Palau", "Palestine", "Panama", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar", "Romania", "Russia", "Rwanda", "Samoa", "Senegal", "Serbia", "Seychelles", "Singapore",
  "Slovakia", "Slovenia", "Somalia", "Spain", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland",
  "Syria", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Tunisia", "Turkey", "Turkmenistan",
  "Tuvalu", "Uganda", "Ukraine","Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen",
  "Zambia", "Zimbabwe"];

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
  splitWord =wordPool[level].toLowerCase("").trim().split("");
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

// function to cature a key press
document.onkeyup = function(event) {
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
  }
  populate();
  if((blankedWord.join("")) === (splitWord.join(""))){
    console.log("you winner");
    $("#winModal").modal("show");
    winText();
    levelUp();
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

var winText = function(){
  document.getElementById('facts').innerHTML = "To learn more interesting facts about "+ blankedWord.join("") + "click here!";
  document.getElementById('wiki').href = "https://en.wikipedia.org/wiki/"+blankedWord.join("");
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
