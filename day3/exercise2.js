import {input} from './input.js';
import {numOfTrees} from './exercise1.js';
import {TextListToArrayOfStrings} from '../data-loaders/TextListToArrayOfStrings.js';

let inputFormatted = TextListToArrayOfStrings(input);

// What do you get if you multiply together the number of trees encountered on each of the listed slopes?

// PSEUDOCODE:
// run function from exercise 1 for each input
// multiple together

// SOLUTION:
function totalNumOfTrees(list) {
    let sum;

    list.forEach(item => {
        let numTrees = numOfTrees(inputFormatted, item[0], item[1]);
        sum = sum ? sum * numTrees : numTrees;
    });

    return sum;
}

let testCases = [
    [1, 1],
    [1, 3],
    [1, 5],
    [1, 7],
    [2, 1]
]

totalNumOfTrees(testCases);