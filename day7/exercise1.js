import {input} from './input.js';
import {TextListToArrayOfStrings} from '../data-loaders/TextListToArrayOfStrings.js';

let inputFormatted = TextListToArrayOfStrings(input);

// How many bag colors can eventually contain at least one shiny gold bag?

// PSEUDOCODE:
// for each rule in list (a string)
// if, after contains, includes color we're looking for
// increment counter

// SOLUTION:
let setOfContainers = new Set; // To improve, move this into function and account for recursion resetting it

function getContainerColorsNum(data, colorOfInnerBag) {
    data.forEach(rule => {
        let ruleSplit = rule.split(' bags contain ');
        let containerColor = ruleSplit[0];
        let bagsContained = ruleSplit[1];

        if (bagsContained.includes(colorOfInnerBag)) {
            setOfContainers.add(containerColor);
            getContainerColorsNum(data, containerColor);
        }
    });

    return setOfContainers.size;
}

getContainerColorsNum(inputFormatted, 'shiny gold');