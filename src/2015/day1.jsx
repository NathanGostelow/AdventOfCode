import input from './Input/input_1';

export const aocFunction1_1 = () => {
    let count = 0;
    const arrayOfVals = input.split('');
    arrayOfVals.forEach(val => {
        val === '(' ? count += 1 : count -= 1 
    });
    return count;
}

export const aocFunction1_2 = () => {
    let count = 0;
    let countIndex = 0;
    const arrayOfVals = input.split('');
    arrayOfVals.forEach((val, index) => {
        val === '(' ? count += 1 : count -= 1 
        if(count === -1 && countIndex === 0) countIndex = index +1;
    });
    return countIndex;
}