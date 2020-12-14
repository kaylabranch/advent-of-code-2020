import {input} from './input.js';
import {TextListToArrayOfStrings} from '../data-loaders/TextListToArrayOfStrings.js';

let inputFormatted = TextListToArrayOfStrings(input);

// What is the sum of all values left in memory after it completes?

// PSEUDOCODE:
// for each line in data
// if mask, update mask
// if memory instruction, 
// encode new memory value
// apply mask to value
// encode new value
// add memory + newvalue to set
// after for each, go through each item in set and return += values

// SOLUTION:
export function getMask(mask) {
    return mask.match(/(?<=mask\s=\s).*/)?.[0];
}

export function getMemory(memory) {
    return [parseInt(memory.match(/(?<=\[).+?(?=\])/)?.[0]), parseInt(memory.match(/(?<=\=\s).*/)?.[0])];
}

export function convertNumTo36Bits(value) {
    let valToBits = value.toString(2);
    let zerosToAdd = 36 - valToBits.length;
    for (var i = 0; i < zerosToAdd; i++) {
        valToBits = 0 + valToBits;
    }
    return valToBits;
}

function applyMaskAndConvert(mask, value) {
    let maskedValue = [...value];

    [...mask].forEach((bit, index) => {
        if (bit !== 'X') {
            maskedValue[index] = bit;
        }
    });

    return parseInt(maskedValue.join('').toString(), 2);
}

function getMemorySum(data) {
    let currentMask = '';
    let memorySlots = {};

    data.forEach(instruction => {
        let mask = getMask(instruction);

        if (mask) {
            currentMask = mask;
        }
        else {
            let memory = getMemory(instruction);
            memorySlots[memory[0]] = applyMaskAndConvert(currentMask, convertNumTo36Bits(memory[1]));
        }
    });
    
    return Object.values(memorySlots).reduce((x, y) => x + y);
}

getMemorySum(inputFormatted);