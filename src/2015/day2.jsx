import input from './Input/input_2';

const dataToUse = input.split('\n');


export const aocFunction2_1 = () => {
    let totalValue = 0;
    dataToUse.forEach(val => {
        const[length, width, height] = val.split('x');
        const minValue = Math.min((length * width),(width * height),(length * height))
        const total = ((2 * (length * width)) + (2* (width * height)) + (2* (length * height))) + minValue;
        totalValue += total ;
    });
    return totalValue;
}

export const aocFunction2_2 = () => {
    let count = 0;
    let countIndex = 0;
    const arrayOfVals = input.split('');
    arrayOfVals.forEach((val, index) => {
        val === '(' ? count += 1 : count -= 1 
        if(count === -1) console.log(count, countIndex);
        if(count === -1 && countIndex === 0) countIndex = index +1;
    });
    console.log(count);
    return countIndex;
}