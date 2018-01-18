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
// wordPool.sort(function(a, b){
//   return 0.5 - Math.random();
// });

console.log(wordPool);

// creation of the word to guess.

var splitWord = wordPool[1].toLowerCase("").trim().split("");


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


// User interaction
var guessedLetters = [];

// function to cature a key press
document.onkeyup = function(event) {
  if (guessedLetters.indexOf(event.key) === -1){
    //console.log(event.key);
    guessedLetters.push(event.key);
    guessedLetters.sort();
    console.log("letters that have been guessed " +guessedLetters);
  }
  for (var i = 0; i < blankedWord.length; i++) {
    if (splitWord[i] === (event.key)){
      blankedWord[splitWord.indexOf(event.key, [i])] = event.key;
      console.log("corrrect letter is "+ event.key);
      console.log(blankedWord);
    }
  }
};

/*Hints
Normalize with .trim() and .toLowerCase()
if it returns -1 then that means it was not in the array, thus it is a life agianst player
*/

// Game function

// Ramndomize the model, so each game is unique. Needs to run only on initial load.

// function for each set, pulls the next array object.

// run word through a function, Normalize with .trim() and .toLowerCase() and then split the word.

//
