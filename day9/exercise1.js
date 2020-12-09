import {input} from './input.js';
import {TextListToArrayOfStrings} from '../data-loaders/TextListToArrayOfStrings.js';

let inputFormatted = TextListToArrayOfStrings(input);

// What is the first number that does not sum to 2 numbers in its preamble?

// PSEUDOCODE:
// for loop through data after preamble (+ 25)
// each line, 
// loop through preamble
// each num, subtract from current data index and see if remainder is also in preamble
// if so, continue by incrementing preamble index and moving to next line
// if not, return and break

// SOLUTION:
function getFirstNonSumNumber(data) {
    let preambleLength = 25;
    let preambleIndex = 0;
 
    for (var i = preambleLength; i < data.length; i++) {
        for (var j = preambleIndex; j < i; j++) {
            let numTwoIndex = data.indexOf((data[i] - data[j]).toString());

            if (numTwoIndex <= j + preambleLength && numTwoIndex > 0) {
                preambleIndex++;
                break;
            }
            else if (j === i - 1) {
                // Return non sum number
                return data[i];
            }
        }
    }
    
    return 'No non sums found';
 }

getFirstNonSumNumber(inputFormatted);