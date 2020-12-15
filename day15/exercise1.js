import {input} from './input.js';
import {TextListToArrayOfStrings} from '../data-loaders/TextListToArrayOfStrings.js';

let inputFormatted = TextListToArrayOfStrings(input);

// What will be the 2020th number spoken?

// SOLUTION:
export function generateNewMap(arr) {
    let newMap = new Map();
    arr.map((str, index) => {
        newMap.set(parseInt(str, 10), index);
    });
    return newMap;
}

function get2020thNum(data) {
    let dataArr = data[0].split(',');

    // Keep last / next nums in memory so we don't have to keep entire list
    let currentNum = parseInt(dataArr.pop());
    let nextNum;

    // Initiate map with current data, need to store last index of/and value but not entire list
    let listMap = generateNewMap(dataArr);

    // Do this 2019 times to get to our goal number - we calc 2020 num in 2019 iteration, zero-based index
    for (var i = listMap.size; i < 2019; i++) {
        nextNum = listMap.has(currentNum) ? i - listMap.get(currentNum) : 0;
        listMap.set(currentNum, i);
        currentNum = nextNum;
    }

    return currentNum;
}

get2020thNum(inputFormatted);