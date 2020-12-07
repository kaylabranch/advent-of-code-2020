import {input} from './input.js';
import {TextListToArrayOfStrings} from '../data-loaders/TextListToArrayOfStrings.js';

let inputFormatted = TextListToArrayOfStrings(input);

// How many individual bags are required inside your single shiny gold bag?

// PSEUDOCODE:
// for each rule in list (a string)
// find # of bags contained, increment
// for each color of bag contained, repeat

// SOLUTION:
let numOfInnerBags = 0;

function getNumOfInnerBags(data, colorOfOuterBag) {
    data.forEach(rule => {
        let ruleSplit = rule.split(' bags contain ');
        let containerColor = ruleSplit[0];

        if (containerColor === colorOfOuterBag) {
            let bagsContained = ruleSplit[1].split(',');

            bagsContained.forEach(bag => {
                if (bag.includes('no other bags')) {
                    return;
                }

                let num = parseInt(bag.trim().match(/\d+/g)[0]);
                let color = bag.trim().split(/\d\s/)[1].split(/( bag| bags)/)[0];

                numOfInnerBags = numOfInnerBags + num;

                for (var i = 0; i < num; i++) {
                    getNumOfInnerBags(data, color); // To improve, don't run function again - add or return values n times
                }
            });
        }
    });

    return numOfInnerBags;
}

getNumOfInnerBags(inputFormatted, 'shiny gold');