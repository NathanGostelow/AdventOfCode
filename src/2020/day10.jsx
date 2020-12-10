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


const getAllSetsOfPermutations = (input) => {
    const inputToSearch = input.slice(0);
    const paths = [ ...Array(inputToSearch.length).keys() ].map( i => 0);
    for(let i = 0; i < inputToSearch.length; i++){
        const currentVal = inputToSearch[i];
        const firstAfter = inputToSearch[i+1]
        const secondAfter = inputToSearch[i+2];
        const thirdAfter = inputToSearch[i+3];

        paths[i] = paths[i] === 0 ? 1 : paths[i];
        const currentPath = paths[i];
        
        if(firstAfter - currentVal <= 3) paths[i+1] =  currentPath + paths[i+1]; 
        if(secondAfter - currentVal <= 3) paths[i+2] = currentPath + paths[i+2]; 
        if(thirdAfter - currentVal <= 3) paths[i+3] =  currentPath + paths[i+3]; 

    }
    
    return paths[paths.length-1]
}

export const aocFunction10_1 = () => {
    // const adapters = getAdapters(testInput);
    // const adapters = getAdapters(testInput2);
    // const adapters = getAdapters(input);
    // const answer = getDifferences(adapters);
    const adapters = getAdapters(input);
    const answer = getDifferences(adapters);
    return answer;    
}

export const aocFunction10_2 = () => {
    // const adapters = getAdapters(testInput);
    // const adapters = getAdapters(testInput2);
    // const adapters = getAdapters(input);
    // const answer = getDifferences(adapters);
    const adapters = getAdapters(input);
    const answer = getAllSetsOfPermutations(adapters);
    return answer;    
}