import {input} from './input.js';
import {getMask, getMemory, convertNumTo36Bits} from './exercise1.js';
import {TextListToArrayOfStrings} from '../data-loaders/TextListToArrayOfStrings.js';

let inputFormatted = TextListToArrayOfStrings(input);

// What is the sum of all values left in memory after it completes, with new rules?

// PSEUDOCODE:
// this time the mask modifies the address, not the value
// will need to take any floating bits and generate new addresses

// SOLUTION:
export function generateAddresses(mask, value) {
    let addresses = [[...value]];

    [...mask].forEach((bit, index) => {
        if (bit === '1') {
            addresses.forEach(address => {
                address[index] = bit;
            });
        }
        else if (bit === 'X') {
            addresses.forEach(address => {
                address[index] = '0';
                let spawnedAddress = [...address];
                spawnedAddress[index] = '1';
                addresses.push(spawnedAddress);
            });
        }
    });

    return addresses.map(address => parseInt(address.join('').toString(), 2));
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
            let addressToBits = convertNumTo36Bits(memory[0]);
            let allAddresses = generateAddresses(currentMask, addressToBits);
            
            allAddresses.forEach(address => {
                memorySlots[address] = memory[1];
            });
        }
    });
    
    return Object.values(memorySlots).reduce((x, y) => x + y);
}

getMemorySum(inputFormatted);