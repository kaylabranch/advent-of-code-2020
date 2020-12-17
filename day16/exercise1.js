import {input} from './input.js';
import {TextListToArrayOfStrings} from '../data-loaders/TextListToArrayOfStrings.js';

let inputFormatted = TextListToArrayOfStrings(input);

// Consider the validity of the nearby tickets you scanned. What is your ticket scanning error rate?

// PSEUDOCODE:
// set error rate counter to 0
// parse rules, my ticket, other tickets
// maybe create a list of only valid numbers
// for each ticket, and for each # in ticket, 
// if that # isn't in 'valid numbers' increment counter w/ that #

// SOLUTION:
function getTicketScanningErrorRate(data) {
    let errorRate = 0;

    const otherTickets = data.slice(data.indexOf('nearby tickets:') + 1);
    const rules = data.slice(0, data.indexOf('your ticket:')).join('').match(/(\d+-\d+)/g);

    let validNums = new Set();
    rules.map(rule => {
        let beginningRange = rule.match(/.+?(?=-)/);
        let endingRange = rule.match(/(?<=-).*/);
        for (var i = parseInt(beginningRange); i <= endingRange; i++) {
            validNums.add(i);
        }
    });

    otherTickets.forEach(ticket => {
        ticket.split(',').forEach(num => {
            if (!validNums.has(parseInt(num))) {
                errorRate += parseInt(num);
            }
        });         
    });

    return errorRate;
}

getTicketScanningErrorRate(inputFormatted);