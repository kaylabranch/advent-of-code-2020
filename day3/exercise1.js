import {input} from './input.js';
import {TextListToArrayOfStrings} from '../data-loaders/TextListToArrayOfStrings.js';

let inputFormatted = TextListToArrayOfStrings(input);

// Count all the trees you would encounter for the slope right 3, down 1

// PSEUDOCODE:
// set up input multiplication
// iterate data, incrementing trees for each #

// SOLUTION:
function numOfTrees(data, rowsToTraverse, colsToTraverse) {
    // Manipulate data input
    let dataMultiplier = Math.ceil(((data.length / data[0].length) / rowsToTraverse) * colsToTraverse);
    let datasetLarge = data.map(row => {
        return row.repeat(dataMultiplier);
    });

    // Iterate
    let totalTrees = 0;
    datasetLarge.forEach((row, i) => {
        let node = i === 0 ? row[0] : row[colsToTraverse * i];
        if (node === '#') {
            totalTrees++;
        }
    });

    return totalTrees;
}

numOfTrees(inputFormatted, 1, 3);