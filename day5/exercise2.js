import {input} from './input.js';
import {getListOfSeatIds} from './exercise1.js';
import {TextListToArrayOfStrings} from '../data-loaders/TextListToArrayOfStrings.js';

let inputFormatted = TextListToArrayOfStrings(input);

// What is the ID of your seat?

// SOLUTION:
function findMissingSeat(data) {
    let sortedSeatIds = getListOfSeatIds(data).sort(function(a, b) { return a - b; });

    let seatBeforeMissing = sortedSeatIds.filter((seat, index) => {
        return (seat + 1 !== sortedSeatIds[index + 1]) && (index + 1 !== sortedSeatIds.length);
    });

    return parseInt(seatBeforeMissing) + 1;
}

findMissingSeat(inputFormatted);