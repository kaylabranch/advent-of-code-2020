import { input } from './input.js';
import { TextListToArrayOfStrings } from '../data-loaders/TextListToArrayOfStrings.js';

let inputFormatted = TextListToArrayOfStrings(input);
let sortedInput = inputFormatted.sort((a, b) => a - b);

// What is the total number of distinct ways you can arrange the adapters to connect the charging outlet to your device?

// PSEUDOCODE:
// memoization + recursion
// sort input for speed
// WOOF

// SOLUTION:
const adapterConfigurations = [];

function getTotalAdapterConfigCount(data, currentAdapter = '0') {
    if (currentAdapter === '0' && data.indexOf(currentAdapter) < 0) {
        // Zero is the value of the charging outlet's joltage, we need this even if it's not in our input list
        data.unshift('0');
    }

    let configCount = 0;
    let currentAdapterIndex = data.indexOf(currentAdapter);

    if (currentAdapterIndex === data.length - 1) {
        // End
        return true;
    }

    if (currentAdapterIndex in adapterConfigurations) {
        return adapterConfigurations[currentAdapterIndex];
    }
    
    data.slice(currentAdapterIndex)
        .filter(adapter => {
            return (parseInt(adapter) <= parseInt(currentAdapter) + 3) && (parseInt(adapter) >= parseInt(currentAdapter) + 1);
        })
        .forEach(adapter => {
            configCount += getTotalAdapterConfigCount(data, adapter);
        });

    adapterConfigurations[currentAdapterIndex] = configCount;
    return configCount;
}

getTotalAdapterConfigCount(sortedInput);