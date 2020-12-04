export const TextListToArrayOfArraysOfChars = (txt) => {
    let arrayOfStrings = txt.split('\n');
    let arrayOfArrays = arrayOfStrings.map(str => {return [...str]});
    return arrayOfArrays;
}