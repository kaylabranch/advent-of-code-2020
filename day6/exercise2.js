import {input} from './input.js';
import {TextListToArrayOfArrays} from '../data-loaders/TextListToArrayOfArrays.js';

let inputFormatted = TextListToArrayOfArrays(input);

// For each group, count the number of questions to which everyone answered "yes". What is the sum of those counts?

// SOLUTION:
let questions = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

function getGroupYesses(group) {
    let groupYesses = 0;

    questions.forEach((question, index) => {
        for (var p = 0; p < group.length; p++) {
            if (!group[p].includes(question)) {
                // exit iteration for this question entirely, next letter
                break;
            }
            
            if (group.length === p + 1) {
                groupYesses++;
            }
        };
    });

    return groupYesses;
}

function sumOfYesses(data) {
    let totalYesses = 0;

    data.forEach(group => {
        totalYesses += getGroupYesses(group);
    });

    return totalYesses;
}

sumOfYesses(inputFormatted);