import {testInput, input} from './Input/input_day9';

const parseData = (data) => {
    const parsedData = data.split('\n').map(val => parseInt(val));
    return parsedData;
}

const getFirstInvalidValue = (data, preambleSize) => {
    const array = data.slice(0);
    let invalidValue;

    for(let i = preambleSize; i < array.length; i++){
        const valueToCheck = array[i];
        const indexToSearch = i - preambleSize;
        const arrayToSearch = array.slice(indexToSearch, preambleSize + indexToSearch).sort();

        let hasSum = false;
        arrayToSearch.forEach(val => {
            const valueToFind = valueToCheck - val;
            const arrayToSearchHasOtherValue = arrayToSearch.find(value => value === valueToFind)
            if(arrayToSearchHasOtherValue) hasSum = true;
            
        })
        if(!hasSum) invalidValue = valueToCheck;
    }

    return invalidValue;
}

export const aocFunction9_1 = () => {
    // const parsedData = parseData(testInput);
    // const answer = getFirstInvalidValue(parsedData, 5);
    const parsedData = parseData(input);
    const answer = getFirstInvalidValue(parsedData, 25);
    return answer;
}