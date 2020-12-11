import {input} from './input.js';
import {TextListToArrayOfChars} from '../data-loaders/TextListToArrayOfChars.js';

let inputFormatted = TextListToArrayOfChars(input);

// Apply the new seating rules repeatedly until no seats change state. How many seats end up occupied?

// SOLUTION:
const emptySeat = new RegExp('\L');
const occupiedSeat = new RegExp('\#');

function findSeat(data, rowChange, colChange, curRow, curCol) {
    // For each direction, continue incrementing row and/or column until we find and push either a L or # or nothing at all
    let newRow = curRow + rowChange;
    let newCol = curCol + colChange;
    let newSeat = data[newRow]?.[newCol];

    // Would love to just test for floor (/\./) but the dang call stack is flipping out so testing for all other conditions
    if (emptySeat.test(newSeat) || occupiedSeat.test(newSeat) || newSeat === undefined) {
        return newSeat;
    }
    else {
        return findSeat(data, rowChange, colChange, newRow, newCol);
    }
}

function getNumDirectionalSeats(data, rowIndex, seatIndex) {
    let seatList = [
        findSeat(data, -1, 0, rowIndex, seatIndex), // up
        findSeat(data, 1, 0, rowIndex, seatIndex), // down        
        findSeat(data, 0, -1, rowIndex, seatIndex), // left
        findSeat(data, 0, 1, rowIndex, seatIndex), // right
        findSeat(data, -1, -1, rowIndex, seatIndex), // up left
        findSeat(data, -1, 1, rowIndex, seatIndex), // up right
        findSeat(data, 1, -1, rowIndex, seatIndex), // down left
        findSeat(data, 1, 1, rowIndex, seatIndex), // down right
    ];
    
    return seatList.filter(seat => occupiedSeat.test(seat))?.length;
}

function getSettledNumOfOccupiedSeats(data) {
    let changesWereMade = false;
    let numOccupiedSeats = 0;
    let newGrid = JSON.parse(JSON.stringify(data));

    data.forEach((row, r) => {
        [...row].forEach((seat, s) => {
            let numDirectionalSeats = getNumDirectionalSeats(data, r, s);

            if (emptySeat.test(seat) && numDirectionalSeats === 0) {
                changesWereMade = true;
                newGrid[r][s] = '#';
                numOccupiedSeats++;
            }
            else if (occupiedSeat.test(seat)) {
                if (numDirectionalSeats >= 5) {
                    changesWereMade = true;
                    newGrid[r][s] = 'L';
                }
                else {
                    numOccupiedSeats++;
                }
            }
        });
    });

    if (!changesWereMade) {
        return numOccupiedSeats;
    }
    else {
        return getSettledNumOfOccupiedSeats(newGrid);
    }
}

getSettledNumOfOccupiedSeats(inputFormatted);