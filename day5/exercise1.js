import {input} from './input.js';
import {TextListToArrayOfStrings} from '../data-loaders/TextListToArrayOfStrings.js';

let inputFormatted = TextListToArrayOfStrings(input);

// What is the highest seat ID on a boarding pass?

// SOLUTION:
const numOfRows = 128;
const numOfCols = 8;

function getHalf(rowStart, rowEnd) {
    return ((rowEnd - rowStart) / 2) + rowStart;
}

function findRow(seat) {
    let rowStart = 0;
    let rowEnd = numOfRows;

    [...seat].forEach(char => {
        if (char === 'F') {
            // Get first half of rows
            rowEnd = getHalf(rowStart, rowEnd);
        }
        else if (char === 'B') {
            // Get second half of rows
            rowStart = getHalf(rowStart, rowEnd);
        }
    });

    // Return rowStart because row #s actually start at 0 not 1, and end at 127 not 128
    return rowStart;
}

function findColumn(seat) {
    let colStart = 0;
    let colEnd = numOfCols;

    [...seat].forEach(char => {
        if (char === 'L') {
            // Get first half of cols
            colEnd = getHalf(colStart, colEnd);
        }
        else if (char === 'R') {
            // Get second half of cols
            colStart = getHalf(colStart, colEnd);
        }
    });

    // Return colStart because col #s actually start at 0 not 1, and end at 7 not 8
    return colStart;
}

function getSeatId(seat) {
    return (findRow(seat.slice(0, 7)) * 8) + findColumn(seat.slice(7, 10));
}

function getListOfSeatIds(data) {
    return data.map(seat => {
        return getSeatId(seat);
    });
}

function getHighestSeatId(data) {
    return Math.max(...getListOfSeatIds(data));
}

getHighestSeatId(inputFormatted);