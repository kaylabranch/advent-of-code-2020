import {input} from './input.js';
import {TextListToArrayOfStrings} from '../data-loaders/TextListToArrayOfStrings.js';

let inputFormatted = TextListToArrayOfStrings(input);

// What do you get if you multiply those six departure values together?

// PSEUDOCODE:
// determine which field is which (while ticketIncomplete, run through tickets and start sorting numbers)
// then look for the six fields on your ticket that start with the word departure
// what do you get if you multiply those six values together?
// WOOF kinda

// SOLUTION:
function getValidNums(rules) {
    let validNums = new Set();

    rules.map(rule => {
        let beginningRange = rule.match(/.+?(?=-)/);
        let endingRange = rule.match(/(?<=-).*/);
        for (var i = parseInt(beginningRange); i <= endingRange; i++) {
            validNums.add(i);
        }
    });

    return validNums;
}

function getValidTickets(otherTickets, validNums) {
    let validTickets= [...otherTickets];

    otherTickets.forEach(ticket => {
        let ticketNumbers = ticket.split(',');

        for (var n = 0; n < ticketNumbers.length; n++) {
            if (!validNums.has(parseInt(ticketNumbers[n]))) {
                validTickets.splice(validTickets.indexOf(ticket), 1);
                break;
            }
        }
    });

    return validTickets;
}

function getRange(start, end) {
    return Array.from({length: parseInt(end)}, (a, b) => b + parseInt(start));
}

function isOrIsBetween(num, start, end) {
    return num >= start && num <= end;
}

function getTicketScanningErrorRate(data) {
    const myTicket = data.join('').match(/(?<=your\sticket:).*?(?=nearby)/g)[0].split(',');
    const otherTickets = data.slice(data.indexOf('nearby tickets:') + 1);
    const rules = data.slice(0, data.indexOf('your ticket:')).filter(r => r !== '');
    const rulesRanges = rules.join('').match(/(\d+-\d+)/g);
    const validTickets = getValidTickets(otherTickets, getValidNums(rulesRanges));
    const rulesObjects = {};

    // Create object of rules and their properties
    rules.forEach((rule, index) => {
        const name = rule.match(/.+?(?=:)/g);
        const firstRangeArr = rule.match(/(?<=:\s).*?(?=\sor)/g)?.[0].split('-');
        const secondRangeArr = rule.match(/(?<=or\s).*/g)?.[0].split('-');

        rulesObjects[index] = {
            'name': name[0],
            'possibleIndexes': Array.from({length: validTickets[0].split(',').length}, (v, i) => i),
            'firstRange': [firstRangeArr?.[0], firstRangeArr?.[1]],
            'secondRange': [secondRangeArr?.[0], secondRangeArr?.[1]]
        }
    });

    // Create an array where each element is an array of the ticket's nth column (turning columns into rows)
    let numbersByIndex = [];
    for (var i = 0; i < validTickets.length; i++) {
        let ticket = validTickets[i].split(',');
        for (var j = 0; j < ticket.length; j++) {
            numbersByIndex[j] ? numbersByIndex[j].push(ticket[j]) : numbersByIndex.push([ticket[j]]);
        }
    }

    // Iterating through rules and comparing against numbers in columns, so that we only have valid possible indexes left
    Object.values(rulesObjects).forEach((rule, index) => {
        for (var i = 0; i < numbersByIndex.length; i++) {
            for (var j = 0; j < numbersByIndex[i].length; j++) {
                let num = parseInt(numbersByIndex[i][j]);
                if (!isOrIsBetween(num, rule.firstRange[0], rule.firstRange[1]) 
                && !isOrIsBetween(num, rule.secondRange[0], rule.secondRange[1])) {
                    rule.possibleIndexes.splice(rule.possibleIndexes.indexOf(i), 1);
                    break;
                }                
            }
        }
    });

    // Go through valid possible indexes and strip away indexes that best suit other rules 
    // (If a rule has possible indexes of [0, 3] but another rule has possible indexes of [3], obviously 3 belongs to the second and zero belongs to the first)
    let ticketNumbers = new Set();
    let rulesObjectsSortedByNumOfPossibleIndexes = Object.values(rulesObjects).sort((a, b) => a.possibleIndexes.length - b.possibleIndexes.length);
    Object.values(rulesObjectsSortedByNumOfPossibleIndexes).forEach(rule => {
        let tempRuleIndexes = JSON.parse(JSON.stringify(rule.possibleIndexes));
        tempRuleIndexes.forEach(possibleIndex => {
            if (ticketNumbers.has(possibleIndex)) {
                rule.possibleIndexes.splice(rule.possibleIndexes.indexOf(possibleIndex), 1);
            }
        });

        if (rule.possibleIndexes.length === 1) {
            ticketNumbers.add(rule.possibleIndexes[0]);
        }
    });

    // Lol now get every 'departure' field and its index
    let departureIndexes = Object.values(rulesObjectsSortedByNumOfPossibleIndexes)
                            .filter(rule => rule.name.includes('departure'))
                            .map(rule => rule.possibleIndexes[0])
                            .sort((a, b) => a - b);


    // Get departure totals product
    let departureTotal = 1;
    myTicket.forEach((num, index) => {
        if (departureIndexes.includes(index)) {
            departureTotal = departureTotal * parseInt(num);
        }
    });

    return departureTotal;
}

getTicketScanningErrorRate(inputFormatted);