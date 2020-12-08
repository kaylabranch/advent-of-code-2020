import {input} from './input.js';
import {getFinalAccumulatorValue} from './exercise1.js';
import {TextListToArrayOfStrings} from '../data-loaders/TextListToArrayOfStrings.js';

let inputFormatted = TextListToArrayOfStrings(input);

// What is the value of the accumulator after the program terminates?

// SOLUTION:
function getFixedAccumulatorValue(data) {
    let fixedData = [...data];
    let accumulator = 0;

    for (var i = 0; i < data.length; i++) {
        let instruction = fixedData[i].split(' ');
        let type = instruction[0];

        if (type === 'jmp') {
            fixedData[i] = fixedData[i].replace('jmp', 'nop');
        }
        else if (type === 'nop') {
            fixedData[i] = fixedData[i].replace('nop', 'jmp');
        }

        let results = getFinalAccumulatorValue(fixedData);

        if (results[2] === false) {
            accumulator = results[1];
            break;
        }
        else {
            fixedData = [...data];
        }
    }
    
    return accumulator;
}

getFixedAccumulatorValue(inputFormatted);