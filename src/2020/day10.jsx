import {testInput, testInput2, input} from './Input/input_day10';

const getAdapters = (input) => {
    let adapters = input.split('\n');
    adapters = adapters.map(adapter => parseInt(adapter))
    // add value zero so we have the socket
    adapters.unshift(0);
    //sort values
    const sortedAdapters = adapters.sort((a, b) => a-b);
    // add device value (largest value + 3);
    sortedAdapters.push(sortedAdapters[sortedAdapters.length-1] + 3);
    return sortedAdapters;
} 

const getDifferences = (input) => {
    let diff1 = 0;
    let diff3 = 0;
    
    for(let i = 0; i < input.length-1; i++) {
        const smallInput = input[i];
        const largeInput = input[i+1];
        const inputDifference = largeInput - smallInput;

        if(inputDifference === 1) diff1++
        if(inputDifference === 3) diff3++
    }

    const differencesMultiplied = diff1 * diff3;
    return differencesMultiplied;
}

export const aocFunction10_1 = () => {
    // const adapters = getAdapters(testInput);
    // const adapters = getAdapters(testInput2);
    const adapters = getAdapters(input);
    const answer = getDifferences(adapters);
    return answer;    
}