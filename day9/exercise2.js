import {input} from './input.js';
import {getFirstNonSumNumber} from './exercise1.js';
import {TextListToArrayOfStrings} from '../data-loaders/TextListToArrayOfStrings.js';

let inputFormatted = TextListToArrayOfStrings(input);

// find a contiguous set of at least two numbers in your list which sum to the invalid number from step 1
// then add together and return the smallest and largest number in this contiguous range

// PSEUDOCODE:
// initialize counter
// initialize bool for match
// initialize starting index
// while no match
// for loop and for each num, combine with counter and add num to set
// check if counter === invalid number
// if so, continue to step 2
// else if less than invalid number, increment index and add another
// else if larger than invalid number, reset counter and increment startingindex, start for loop over with new index
// step 2: get max and min nums from set, return sum

// SOLUTION:
function getEncryptionWeakness(data) {    
    let invalidNum = getFirstNonSumNumber(data);
    let counter = 0;
    let numSet = new Set();
    let isMatch = false;
    let startingIndex = 0;

    while (!isMatch && startingIndex <= data.length) {        
        for (var i = startingIndex; i < data.length; i++) {
            numSet.add(parseInt(data[i]));
            counter += parseInt(data[i]);

            if (counter > invalidNum) {
                numSet = new Set();
                counter = 0;
                startingIndex++;
                break;
            }
            else if (counter == invalidNum) {
                isMatch = true;
                break;
            }
        }
    }

    // Pt 2
    let largestNum = null;
    let smallestNum = null;

    [...numSet.values()].forEach(val => {
        if (largestNum === null || val > largestNum) {
            largestNum = val;
        }
        if (smallestNum === null || val < smallestNum) {
            smallestNum = val;
        }
    });

    return largestNum + smallestNum;
}

getEncryptionWeakness(inputFormatted);