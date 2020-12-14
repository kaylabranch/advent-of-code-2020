import { input } from './input.js';
import { TextListToArrayOfStrings } from '../data-loaders/TextListToArrayOfStrings.js';

let inputFormatted = TextListToArrayOfStrings(input);

// What is the earliest timestamp such that all of the listed bus IDs 
// depart at offsets matching their positions in the list?

// SOLUTION:
function getBusIdTimesMinutesToWait(data) {
    let busIds = data[1].split(',').map((busId, index) => {if (busId !== 'x') {return [parseInt(busId), index]}} ).filter(busId => busId !== undefined);
    let timestamp = busIds[0][0];
    let step = busIds[0][0];

    // Start at 1 because the first bus is taken care of in timestamp/step already
    for (let i = 1; i < busIds.length; i++) {
        const [busId, index] = busIds[i];
        while ((timestamp + index) % busId !== 0) {
            timestamp += step;
        }
        step = step * busId;
    }
    
    return timestamp;
};

getBusIdTimesMinutesToWait(inputFormatted);