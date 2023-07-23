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
// row variables
let currRowNum = 0;
let rowId = 'row' + currRowNum;
let currRow = document.getElementById(rowId);
let currSquare = currRow.firstChild;
console.log(currRow);

const rightWord = WORDS[Math.floor(Math.random() * WORDS.length)];


function isLetter(str) {
    return str.length === 1 && str.match(/[a-zA-Z]/i);
}

function handleKeyDown(e) {
    let char = e.key;
    // this is for debugging purposes
    console.log(e.key);
    // FIXME: CREATE FUNCTIONS FOR HANDLING ENTER
    // if (char === 'Enter' && currentGuess.length===5 && isValidWord(currentGuess) {
    //     checkGuess();
    // }

    if (char === 'Backspace') {
        // currSquare is current EMPTY SQUARE
        // only exception to this is there 5 letters, every space is occupied
        if (currGuess.length < 5 && currGuess.length > 0) {
            currSquare = currSquare.previousSibling;
        }
        if (currGuess.length > 0) {            
            currGuess.pop();
            currSquare.innerText = "";
        }
        console.log(currGuess);
        return;
    } else if (isLetter(char) === null) {
        return;
    } else if (currGuess.length > 4) {
        return;
    } else {
        currGuess.push(char);
        // FOR DEBUGGING
        console.log(currGuess);
        currSquare.innerText = char;
        if (currGuess.length < 5) {
            currSquare = currSquare.nextSibling;
        }
    }
}



document.addEventListener('keydown', handleKeyDown);