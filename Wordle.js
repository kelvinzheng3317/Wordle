import { WORDS } from "./words.js"

function initBoard() {
    const gameGrid = document.querySelector('.game-grid');

    for (let i=0; i<6; ++i) {
        let row = document.createElement('div');
        row.className = "word-row";
        let rowId = `row${i}`;
        row.setAttribute('id', rowId);
        for (let j=0; j<5; ++j) {
            let letter = document.createElement('div');
            letter.classList.add('letter');
            letter.classList.add(j);
            row.appendChild(letter);
        }
        gameGrid.appendChild(row);
    }
}
// must initialize board before accesing elements from it
initBoard();


// initialize values
const numGuesses = 6;
let guessesLeft = 6;
let currGuess = [];
let alreadyGuessed = [];
// row variables
let currRowNum = 0;
let rowId = 'row' + currRowNum;
let currRow = document.getElementById(rowId);
let currSquare = currRow.firstChild;
console.log(currRow);

const rightWord = WORDS[Math.floor(Math.random() * WORDS.length)];
// THIS IS FOR TESTING PURPOSES
console.log(rightWord);


function isLetter(str) {
    return str.length === 1 && (/[a-zA-Z]/).test(str);
}

function isValidWord(currGuess) {
    let currWord = currGuess.join('');
    return currWord.length==5 && !alreadyGuessed.includes(currWord) && WORDS.includes(currWord);
}

function checkGuess() {
    let userWins = true;
    // iterates backwards through square tile elements
    for (let i=4; i>-1; --i) {
        if (currGuess[i] === rightWord[i]) {
            currSquare.classList.add('correct-letter');
        } else if (rightWord.includes(currGuess[i])) {
            currSquare.classList.add('wrong-spot');
            userWins = false;
        } else {
            currSquare.classList.add('wrong-letter');
            userWins = false;
        }
        currSquare = currSquare.previousSibling;
    }
    console.log('userWins is ' + userWins);
    // check for win and alert player if so
    if (userWins) {
        alert('You Win');
    } else if (guessesLeft === 1) { // player ran out of guesses
        alert('You Lose');
    } else {
        alreadyGuessed.push(currGuess.join(''));
        guessesLeft--;
        currGuess = [];
        
        // This method of initializing and updating dom elem is kinda inefficient
        // FIND BETTER SOLUTION LATER
        currRowNum++;
        rowId = 'row' + currRowNum;
        currRow = currRow.nextSibling;
        currSquare = currRow.firstChild;
        console.log('rowId is ' + rowId);
        console.log(currRow);
        console.log(currSquare);
    }
}

function handleKeyDown(char) {
    // this is for debugging purposes
    console.log(char);

    if (char=='Enter' && currGuess.length===5 && isValidWord(currGuess)) {
        checkGuess();
    } else if (char === 'Backspace') {
        // currSquare is current EMPTY SQUARE
        // only exception to this is when there's 5 letters, every space is occupied
        if (currGuess.length < 5 && currGuess.length > 0) {
            currSquare = currSquare.previousSibling;
        }
        if (currGuess.length > 0) {            
            currGuess.pop();
            currSquare.innerText = "";
        }
        console.log(currGuess);
        return;
    } else if (isLetter(char) == false) {  // not a letter/Enter/Backspace
        return;
    } else if (currGuess.length > 4) {  // not 5 letters
        return;
    } else {  // handle letter
        currGuess.push(char);
        currSquare.innerText = char;
        if (currGuess.length < 5) {
            currSquare = currSquare.nextSibling;
        }
    }
}

function createKeyboardListeners() {
    let keyRow = document.querySelector('.key-row');
    let letterKey = null;
    while (keyRow) {
        letterKey = keyRow.firstElementChild;
        while (letterKey != null) {
            console.log(letterKey);
            letterKey.addEventListener('mousedown', (e) => {
                handleKeyDown(e.target.id);
            })
            letterKey = letterKey.nextElementSibling;
        }
        keyRow = keyRow.nextElementSibling;
    }
    /*
    This fixes clicking on the backspace img(not button) not working
    NOTE: not the most efficent, as the backspace img now has 2 event listeners
    one that works and one that does nothing
    */
    let backSpaceKeyImg = document.querySelector('#Backspace img');
    backSpaceKeyImg.addEventListener('mousedown', () => {
        handleKeyDown('Backspace');
    })
}

createKeyboardListeners();

document.addEventListener('keydown', (e) => {
    handleKeyDown(e.key);
});