import {input} from './input.js';
import {TextListToArrayOfStrings} from '../data-loaders/TextListToArrayOfStrings.js';

let inputFormatted = TextListToArrayOfStrings(input);

// What is the Manhattan distance between that location and the ship's starting position with new instructions?

// SOLUTION:
function rotate(x, y, angle) {
    let cx = 0; // these are zero b/c the waypoint rotates relatively around the ship, so around [0,0]
    let cy = 0;
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [Math.round(nx), Math.round(ny)];
}

function getManhattanDistance(data) {
    let [shipHor, shipVert] = [0, 0];
    let [waypointHor, waypointVert] = [10, 1];

    data.forEach(instruction => {
        let type = instruction.match(/\D/)?.[0];
        let num = parseInt(instruction.match(/\d+/)?.[0]);

        switch(type) {
            case 'N':                 
                waypointVert += num;                 
                break;
            case 'S':
                waypointVert -= num;
                break;
            case 'E':                 
                waypointHor += num;                 
                break;
            case 'W':
                waypointHor -= num;
                break;
            case 'L':
                [waypointHor, waypointVert] = rotate(waypointHor, waypointVert, -num);
                break;
            case 'R':
                [waypointHor, waypointVert] = rotate(waypointHor, waypointVert, num);
                break;
            case 'F':
                [shipHor, shipVert] = [shipHor + (waypointHor * num), shipVert + (waypointVert * num)];
                break;
            default:
                break;
        }
    });
    
    return Math.abs(shipHor) + Math.abs(shipVert);
}

getManhattanDistance(inputFormatted);