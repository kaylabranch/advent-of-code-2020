import {input} from './input.js';
import {TextListToArrayOfArrays} from '../data-loaders/TextListToArrayOfArrays.js';

let inputFormatted = TextListToArrayOfArrays(input);

// Count the number of valid passports - those that have all required fields and valid values

// PSEUDOCODE:
// for each passport in list,
// run it against a function that checks if all required fields are present and conditions are met
// increment total if so

// SOLUTION:
export const requiredFields = [
    ['byr', /^(19[2-8][0-9]|199[0-9]|200[0-2])$/],
    ['iyr', /^(201[0-9]|2020)$/],
    ['eyr', /^(202[0-9]|2030)$/],
    ['hgt', /^(((1[5-8][0-9]|19[0-3])cm)|((59|6[0-9]|7[0-6])in))$/],
    ['hcl', /^#[0-9a-fA-F]{6}$/],
    ['ecl', /^(amb|blu|brn|gry|grn|hzl|oth)$/],
    ['pid', /^\d{9}$/]
]

export function numOfValidPassports(data) {
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
    
    return !requiredFields.some(field => {
        if (passportWhole.includes(`${field[0]}:`)) {
            // If key exists, check for regex
            // Get value for field in question (from field to next space)
            // Run match
            let regxStr = `(?<=${field[0]}:)(\\S+)`;
            let regx = new RegExp(regxStr, 'g');
            let fieldValue = regx.exec(passportWhole)[0];
            
            if (!field[1]?.test(fieldValue)) {
                return true;
            }
        }
        else {
            return true;
        }
    });
}

numOfValidPassports(inputFormatted);