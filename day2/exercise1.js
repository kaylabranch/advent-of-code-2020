import {input} from './input.js';
import {TextListToArray} from '../data-loaders/TextListToArray.js';

let inputFormatted = TextListToArray(input);

// How many passwords are valid according to their policies?

// PSEUDOCODE:
// set counter for valid passwords
// for each entry, parse line to split out the password and the policy
// check if password meets policy
// if so, increment counter
// else, continue to end

// SOLUTION:
function numOfValidPasswords(data) {
    var totalValid = 0;

    data.map(item => {
        // Regex: Everything before the dash
        let minLimit = (item.match(/.+?(?=-)/))[0];
        // Regex: Everything between dash and space
        let maxLimit = (item.match(/(?<=-).*?(?=\s)/))[0];
        // Regex: Everything between space and colon
        let requiredChar = (item.match(/(?<=\s).*?(?=:)/))[0];
        // Regex: Everything after colon and space
        let password = (item.match(/(?<=:\s).*/))[0];

        // Count # of requiredChars in each password
        var regx = new RegExp(requiredChar, 'g');
        let numRequiredCharsInPassword = password.match(regx)?.length;

        if (numRequiredCharsInPassword >= minLimit && numRequiredCharsInPassword <= maxLimit) {
            totalValid++;
        }
    });

    return totalValid;
}

numOfValidPasswords(inputFormatted);