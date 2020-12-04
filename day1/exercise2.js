import {input} from './input.js';
import {TextListToArray} from '../data-loaders/TextListToArray.js';

let inputFormatted = TextListToArray(input);

// Find the THREE entries that sum to 2020 and then multiply those two numbers together

// PSEUDOCODE:
// for each, minus # from 2020
// then loop again, one off from first loop index, and minus THAT # from previous subtraction value
// then look for remainder in the rest of the array
// if found, multiply and return
// else continue

// SOLUTION:
function multipleOf2020SumOfThree(data) {
    data.some(num => {
        let difference = 2020 - parseInt(num);

        // slice does not modify the original data
        let found = data.slice(1).some(secondNum => {
            let newDifference = difference - parseInt(secondNum);

            if (data.includes(newDifference.toString())) {
                return newDifference * num * secondNum;
            }
        });
        // makes sure to exit outer loop as soon as answer is found, prevents extra work
        return found;
    });
}

multipleOf2020SumOfThree(inputFormatted);