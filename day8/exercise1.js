import {input} from './input.js';
import {TextListToArrayOfStrings} from '../data-loaders/TextListToArrayOfStrings.js';

let inputFormatted = TextListToArrayOfStrings(input);

// Immediately before any instruction is executed a second time, what value is in the accumulator?

// PSEUDOCODE:
// init accumulator to zero
// create a set of unique indexes of instructions already visited
// init index
// while (index of current instruction is not in set) and (index of instruction is not null)
// for instruction[index]
// if nop, continue to next item (increment index)
// if acc, adjust accumulator then continue to next item (increment index)
// if jump, increment index up or down
// if instruction is in set, return accumulator and finish program

// SOLUTION:
export function getFinalAccumulatorValue(data) {
    let accumulator = 0;
    let indexSet = new Set();
    let index = 0;

    while(!indexSet.has(index) && data[index] !== undefined) {
        let instruction = data[index].split(' ');
        let type = instruction[0];
        let num = instruction[1];

        indexSet.add(index);

        if (type === 'nop') {
            index++;
        }
        else if (type === 'acc') {
            accumulator += parseInt(num);
            index++;
        }
        else if (type === 'jmp') {
            index += parseInt(num);
        }
    }
    
    // indexSet.has(index) indicates that the index has been run before, so we're in a loop (true = loop)
    return [accumulator, indexSet.has(index)];
}

getFinalAccumulatorValue(inputFormatted);