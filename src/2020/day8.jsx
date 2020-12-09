import {testInput, input} from './Input/input_day8';

const getInstructions = (input) => {
    const lines = input.split('\n');
    const newData = lines.map(line => {
        const [operation, argument] = line.split(' ');
        const parsedArgument = parseInt(argument);
        return {operation, argument: parsedArgument, count: 0}
    })
    return newData;
}

const setNewCount = (array, position) => {
    const newArray = [...array];
    const prevValue = array[position];
    const newCountvalue = array[position].count +1;
    newArray[position] = {...prevValue, count: newCountvalue};
    return newArray;
}

const loopThroughInstructions = (array) => {
    let accumulator = 0;
    let breakLoop = false;
    let position = 0;
    let arrayToSearch = [...array]
    const instructionsLength = arrayToSearch.length - 1;

    do {
        const newArray = [...arrayToSearch];
        const instruction = newArray[position];
        console.log(position, instructionsLength, instruction);
        if(instruction.count === 1 || position === instructionsLength){
            if(instruction.operation === 'acc') accumulator += instruction.argument;
            breakLoop = true;
        }
        if(!breakLoop) {
            if(instruction.operation === 'nop'){
                arrayToSearch[position] = {...instruction, count: instruction.count + 1}
                position++;
            }
            if(instruction.operation === 'acc'){
                arrayToSearch[position] =  {...instruction, count: instruction.count + 1}
                position++;
                accumulator += instruction.argument;
            }
            if(instruction.operation === 'jmp'){
                arrayToSearch[position] = {...instruction, count: instruction.count + 1}

                position += instruction.argument;
                if(position > instructionsLength) position -= instructionsLength;
                if(position < 0) position += instructionsLength;
            }
        }
       
    } while(!breakLoop)
    return [accumulator, position === instructionsLength];
}

export const aocFunction8_1 = () => {
    // const instructions = getInstructions(testInput);
    // const [answer, _] = loopThroughInstructions(instructions);
    const instructions = getInstructions(input)
    const [answer, _] = loopThroughInstructions(instructions);
    return answer;
}

const changeOperationAtPosition = (array, position) => {
    const newArray = [...array];
    const prevValue = array[position];
    const newOperationValue = array[position].operation === 'nop' ? 'jmp' : 'nop';
    newArray[position] = {...prevValue, operation: newOperationValue};
    return newArray;

}


const replaceNopOrJmpValues = (instructions) => {
    let endAccumulatorValue = 0;
    const positionsToChange = [];
    const newArray = [...instructions];
    newArray.forEach((instruction, index) => {
        if( instruction.operation === 'nop' || instruction.operation === 'jmp') {
                positionsToChange.push(index);
            }
    })
    let hasReachedTheEnd = false
    do{
        const arrayToUse = changeOperationAtPosition(newArray, positionsToChange[0]);
        const [answer, reachedTheEnd] = loopThroughInstructions(arrayToUse);
        if(!reachedTheEnd) {
            positionsToChange.shift()
            if(positionsToChange.length === 0) hasReachedTheEnd = true;
        }
        if(reachedTheEnd){
            endAccumulatorValue = answer;
            hasReachedTheEnd = true;
        }
    }while (!hasReachedTheEnd)
    return endAccumulatorValue;
}

export const aocFunction8_2 = () => {
    // const instructions = getInstructions(testInput);
    // const answer = replaceNopOrJmpValues(instructions);
    // console.log(answer);
    const instructions = getInstructions(input);
    const answer = replaceNopOrJmpValues(instructions);
    return answer;
}