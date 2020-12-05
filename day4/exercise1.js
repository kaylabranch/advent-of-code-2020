import {input} from './input.js';
import {TextListToArrayOfArrays} from '../data-loaders/TextListToArrayOfArrays.js';

let inputFormatted = TextListToArrayOfArrays(input);

// Count the number of valid passports

// PSEUDOCODE:
// for each passport in list,
// run it against a function that checks if all required fields are present
// increment total if so

// SOLUTION:
const requiredFields = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid'
]

function numOfValidPassports(data) {
    let total = 0;

    data.forEach(passport => {
        if (meetsRequirements(passport)) {
            total++;
        };
    });

    return total;
}

function meetsRequirements(passport) {    
    let passportWhole = '';
    passport.forEach(line => {
        passportWhole = `${passportWhole} ${line}`;
    });
    
    let passportIsInvalid = requiredFields.some(field => {
        return !passportWhole.includes(`${field}:`);
    });

    return !passportIsInvalid;
}

numOfValidPassports(inputFormatted);