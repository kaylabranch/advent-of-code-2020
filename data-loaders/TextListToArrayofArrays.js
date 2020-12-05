export const TextListToArrayOfArrays = (txt) => {
    let arrayOfStrings = txt.split('\n');
    let arrayOfArrays = [];

    let i = 0;
    arrayOfStrings.forEach(str => {
        if (str.length > 0) {
            arrayOfArrays[i] ? arrayOfArrays[i].push(str) : arrayOfArrays.push([str]);
        }
        else{
            i++;
        }
    });

    return arrayOfArrays;
}