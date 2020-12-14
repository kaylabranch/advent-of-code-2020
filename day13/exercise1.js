import {input} from './input.js';
import {TextListToArrayOfStrings} from '../data-loaders/TextListToArrayOfStrings.js';

let inputFormatted = TextListToArrayOfStrings(input);

// What is the ID of the earliest bus you can take to the airport 
// multiplied by the number of minutes you'll need to wait for that bus?

// PSEUDOCODE:
// get each buses next departure starting at timestamp
// return first bus to depart * its id

// SOLUTION:
function getBusIdTimesMinutesToWait(data) {
    let timestamp = data[0];
    let busIds = data[1].match(/(\d+)/g);
    let nextBus;

    busIds.forEach(busId => {
        let statusAtTimestamp = timestamp / busId;
        let minsToWait = (Math.ceil(statusAtTimestamp) * busId) - timestamp;
        if (nextBus === undefined || minsToWait < nextBus[1]) {
            nextBus = [busId, minsToWait];
        }
    });

    return nextBus[0] * nextBus[1];
}

getBusIdTimesMinutesToWait(inputFormatted);