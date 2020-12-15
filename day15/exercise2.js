import {input} from './input.js';
import {generateNewMap} from './exercise1.js';
import {TextListToArrayOfStrings} from '../data-loaders/TextListToArrayOfStrings.js';

let inputFormatted = TextListToArrayOfStrings(input);

// What will be the 30000000th number spoken?

// SOLUTION:
function getXthNum(data, numberGoal) {
    let dataArr = data[0].split(',');

    // Keep last / next nums in memory so we don't have to keep entire list
    let currentNum = parseInt(dataArr.pop());
    let nextNum;

    // Initiate map with current data, need to store last index of/and value but not entire list
    let listMap = generateNewMap(dataArr);

    // Do this numberGoal - 1 times to get to our goal number (-1 since we calculate the next num in previous step)
    for (var i = listMap.size; i < numberGoal - 1; i++) {
        if (listMap.has(currentNum)) {   
            // Seen it before
            nextNum = i - listMap.get(currentNum);
        }
        else {
            // Is first time
            nextNum = 0;
        }
    
        listMap.set(currentNum, i);
        currentNum = nextNum;
    }

    return currentNum;
}

getXthNum(inputFormatted, 30000000);