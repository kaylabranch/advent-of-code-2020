import {input} from './input.js';
import {TextListToArrayOfArrays} from '../data-loaders/TextListToArrayOfArrays.js';

let inputFormatted = TextListToArrayOfArrays(input);

// For each group, count the number of questions to which anyone answered "yes". What is the sum of those counts?

// PSEUDOCODE:
// set yes counter
// for each group
// iterate per people, for each unique answer increment counter
// finally sum and return the yes counter

// SOLUTION:
function getGroupYesses(group) {
    let groupYesses = new Set();

    group.forEach(person => {
        [...person].forEach(answer => {
            groupYesses.add(answer) 
        });
    });

    return groupYesses.size;
}

function sumOfYesses(data) {
    let totalYesses = 0;

    data.forEach(group => {
        totalYesses += getGroupYesses(group);
    });

    return totalYesses;
}

sumOfYesses(inputFormatted);