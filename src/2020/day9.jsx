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

const getContigousListSummed = (data, numberToSum) => {
    let summedVal;
    const indices = {start: 0, end: 0};
    for(let i = 0; i < data.length; i++) {
        let sum = 0;
        const sumArray = [];
        for(let j = i; j <  data.length; j++) {
            if(sum < numberToSum) {
                sum += data[j]; 
            sumArray.push(data[j])

            }
            if(sum > numberToSum) break;
        }
        console.log(sum, 'indextostart: ', i, sumArray);
        if(sum === numberToSum) {
            summedVal = sumArray;
            break;
        }
    }
    const max = Math.max(...summedVal);
    const min = Math.min(...summedVal);
    const totalSum = max + min;
    console.log(max, min, totalSum);
    return totalSum;
}

export const aocFunction9_1 = () => {
    // const parsedData = parseData(testInput);
    // const answer = getFirstInvalidValue(parsedData, 5);
    const parsedData = parseData(input);
    const answer = getFirstInvalidValue(parsedData, 25);
    return answer;
}

export const aocFunction9_2 = () => {
    // const parsedData = parseData(testInput);
    // const invalidValue = getFirstInvalidValue(parsedData, 5);
    // const answer = getContigousListSummed(parsedData, invalidValue);
    const parsedData = parseData(input);
    const invalidValue = getFirstInvalidValue(parsedData, 25);
    const answer = getContigousListSummed(parsedData, invalidValue);

    return answer
}