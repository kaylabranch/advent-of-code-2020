import {input} from './input.js';
import {TextListToArrayOfStrings} from '../data-loaders/TextListToArrayOfStrings.js';

let inputFormatted = TextListToArrayOfStrings(input);

// What is the number of 1-jolt differences multiplied by the number of 3-jolt differences?

// PSEUDOCODE:
// init numOnes to 0
// init numThrees to three to account for final device joltage
// for each adapter in list data,
// starting at zero, find an item in data that is +1 away from the starting index
// if found, increment numOnes
// if not found, find one +2 away but dont increment anything
// if not found, find one +3 away and increment numThrees
// if not found or at end of list, return num of 1s found times num of 3s found

// SOLUTION:
function getJoltDiff(data) {
    let numOnes = 0;
    let numThrees = 1;
    let currentJoltage = 0;

    for (var i = 0; i < data.length; i++) {
        let joltPlusOne = currentJoltage + 1;
        let joltPlusTwo = currentJoltage + 2;
        let joltPlusThree = currentJoltage + 3;

        if (data.indexOf(joltPlusOne.toString()) > 0) {
            // Found adapter 1 jolts away
            numOnes++;
            currentJoltage = joltPlusOne;
        }
        else if (data.indexOf(joltPlusTwo.toString()) > 0) {
            // Found adapter 2 jolts away
            currentJoltage = joltPlusTwo;
        }
        else if (data.indexOf(joltPlusThree.toString()) > 0) {
            // Found adapter 3 jolts away
            numThrees++;
            currentJoltage = joltPlusThree;
        }
    };

    return numOnes * numThrees;
}

getJoltDiff(inputFormatted);