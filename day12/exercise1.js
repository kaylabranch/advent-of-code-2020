import {input} from './input.js';
import {TextListToArrayOfStrings} from '../data-loaders/TextListToArrayOfStrings.js';

let inputFormatted = TextListToArrayOfStrings(input);

// What is the Manhattan distance between that location and the ship's starting position?

// PSEUDOCODE:
// set starting point [0,0]
// foreach instruction get type (letter)
// apply rule to starting point per instruction
// after loop, return sum of new coordinates

// SOLUTION:
function getDegrees(directionFacing, directionGoing, num) {
    let newDirection = directionGoing === 'L' ? directionFacing - parseInt(num) : directionFacing + parseInt(num);
    let orientation = newDirection % 360;

    if (orientation < 0) {
        orientation += 360;
    }
    return orientation;
}

function getManhattanDistance(data) {
    let [hor, vert] = [0, 0]; // horizontal, vertical
    let directionFacing = 90; // east

    data.forEach(instruction => {
        let type = instruction.match(/\D/)?.[0];
        let num = parseInt(instruction.match(/\d+/)?.[0]);

        switch(type) {
            case 'N':                 
                vert += num;                 
                break;
            case 'S':
                vert -= num;
                break;
            case 'E':                 
                hor += num;                 
                break;
            case 'W':
                hor -= num;
                break;
            case 'L':
                directionFacing = getDegrees(directionFacing, 'L', num);
                break;
            case 'R':
                directionFacing = getDegrees(directionFacing, 'R', num);
                break;
            case 'F':
                switch (directionFacing) {
                    case 0:
                    case 360:
                        vert += num;
                        break;
                    case 90:
                        hor += num;
                        break;
                    case 180:
                        vert -= num;
                        break;
                    case 270:
                        hor -= num;
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    });
    
    return Math.abs(hor) + Math.abs(vert);
}

getManhattanDistance(inputFormatted);