import {input} from './input.js';
import {TextListToArrayOfStrings} from '../data-loaders/TextListToArrayOfStrings.js';

let inputFormatted = TextListToArrayOfStrings(input);

// How many passwords are valid according to the new interpretation of the policies?

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
        let firstIndex = (item.match(/.+?(?=-)/))[0];
        // Regex: Everything between dash and space
        let secondIndex = (item.match(/(?<=-).*?(?=\s)/))[0];
        // Regex: Everything between space and colon
        let requiredChar = (item.match(/(?<=\s).*?(?=:)/))[0];
        // Regex: Everything after colon and space
        let password = (item.match(/(?<=:\s).*/))[0];

        // Find chars at required indexes
        let indexChars = password.charAt(firstIndex - 1) + password.charAt(secondIndex - 1);

        // See if indexChars contains requiredChar
        var regx = new RegExp(requiredChar, 'g');
        if (indexChars.match(regx)?.length === 1) {
            totalValid++;
        }
    });

    return totalValid;
}

numOfValidPasswords(inputFormatted);