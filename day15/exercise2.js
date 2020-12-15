import {input} from './input.js';
import {generateNewMap} from './exercise1.js';
import {TextListToArrayOfStrings} from '../data-loaders/TextListToArrayOfStrings.js';

let inputFormatted = TextListToArrayOfStrings(input);

// What will be the 30000000th number spoken?

// SOLUTION:
function getXthNum(data, numberGoal) {
    let dataArr = data[0].split(',');
    let currentNum = parseInt(dataArr.pop());
    let nextNum;
    let listMap = generateNewMap(dataArr);

    for (var i = listMap.size; i < numberGoal - 1; i++) {
        nextNum = listMap.has(currentNum) ? i - listMap.get(currentNum) : 0;
        listMap.set(currentNum, i);
        currentNum = nextNum;
    }

    return currentNum;
}

getXthNum(inputFormatted, 30000000);