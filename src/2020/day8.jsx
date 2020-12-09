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

const loopThroughInstructions = (instructions) => {
    let accumulator = 0;
    let breakLoop = false;
    let position = 0;
    const instructionsLength = instructions.lenght;
    do {
        const instruction = instructions[position];
        if(instruction.count === 1){
            // visited before break the loop
            breakLoop = true;
        }
        if(!breakLoop) {
            if(instruction.operation === 'nop'){
                position++;
                instruction.count++;
            }
            if(instruction.operation === 'acc'){
                position++;
                accumulator += instruction.argument;
                instruction.count++;
            }
            if(instruction.operation === 'jmp'){
                position += instruction.argument;
                if(position > instructionsLength) position -= instructionsLength;
                if(position < instructionsLength) position -= instructionsLength;
                instruction.count++;
            }
        }
       
    } while(!breakLoop)
    return accumulator;
}

export const aocFunction8_1 = () => {
    // const instructions = getInstructions(testInput);
    // const testAnswer = loopThroughInstructions(instructions);
    const instructions = getInstructions(input)
    const answer = loopThroughInstructions(instructions);
    return answer;
}