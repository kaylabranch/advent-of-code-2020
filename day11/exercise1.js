import {input} from './input.js';
import {TextListToArrayOfChars} from '../data-loaders/TextListToArrayOfChars.js';

let inputFormatted = TextListToArrayOfChars(input);

// Apply the seating rules repeatedly until no seats change state. How many seats end up occupied?

// PSEUDOCODE:
// set bool for changes = false
// set numoccupied = 0
// for loop each row,
// and for loop each seat
// apply rule depending on seat type
// if change is made, bool updated to true
// at end of iteration, if changes bool is still false we can return # of occupied seats
// else, re-run with new graph and reset bool/num values

// SOLUTION:
const emptySeat = new RegExp('\L');
const occupiedSeat = new RegExp('\#');

function getNumSurroundingOccupants(data, rowIndex, seatIndex) {
    let seatGrid = [];
    let rows = [data[rowIndex - 1], data[rowIndex], data[rowIndex + 1]];
    let cols = [seatIndex - 1, seatIndex, seatIndex + 1]
    
    // Add surrounding seats to grid
    for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
            seatGrid.push(rows[r]?.[cols[c]]);
        }
    }

    // Remove center seat
    seatGrid.splice(4, 1);

    return seatGrid.filter(seat => occupiedSeat.test(seat)).length;
}

function getSettledNumOfOccupiedSeats(data) {
    let changesWereMade = false;
    let numOccupiedSeats = 0;
    let newGrid = JSON.parse(JSON.stringify(data));

    data.forEach((row, r) => {
        [...row].forEach((seat, s) => {
            let numSurroundingSeats = getNumSurroundingOccupants(data, r, s);

            if (emptySeat.test(seat) && numSurroundingSeats === 0) {
                changesWereMade = true;
                newGrid[r][s] = '#';
                numOccupiedSeats++;
            }
            else if (occupiedSeat.test(seat)) {
                if (numSurroundingSeats >= 4) {
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