import { WORDS } from "./words.js"

const numGuesses = 6;
let guessesLeft = numGuesses;

const rightWord = WORDS[Math.floor(Math.random() * WORDS.length)];

function initBoard() {
    const gameGrid = document.querySelector('.game-grid');

    for (let i=0; i<numGuesses; ++i) {
        let row = document.createElement('div');
        row.className = "word-row";
        let rowId = `row${i}`;
        row.setAttribute('id', rowId);
        for (let j=0; j<5; ++j) {
            let letter = document.createElement('div');
            letter.className = 'letter';
            row.appendChild(letter);
        }
        gameGrid.appendChild(row);
    }
}

initBoard();