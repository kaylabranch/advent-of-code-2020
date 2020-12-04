import {input} from './input.js';
import {TextListToArrayOfStrings} from '../data-loaders/TextListToArrayOfStrings.js';

let inputFormatted = TextListToArrayOfStrings(input);

// Find the two entries that sum to 2020 and then multiply those two numbers together

// PSEUDOCODE:
// for each, minus # from 2020
// look for that other number in the rest of the array
// if found, multiply and return
// else continue

// SOLUTION:
function multipleOf2020Sum(data) {
    // some returns the first instance where the condition is true
    data.some(num => {
        let difference = 2020 - parseInt(num);
        if (data.includes(difference.toString())) {
            return difference * num;
        }
    });
}

multipleOf2020Sum(inputFormatted);