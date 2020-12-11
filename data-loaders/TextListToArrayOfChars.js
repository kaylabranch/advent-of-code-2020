export const TextListToArrayOfChars = (txt) => {
    let arrayOfStrings = txt.split('\n');
    let arrayOfArrays = [];

    arrayOfStrings.forEach(str => {
        if (str.length > 0) {
            arrayOfArrays.push([...str]);
        }
    });

    return arrayOfArrays;
}