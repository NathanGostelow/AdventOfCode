
import input_day2 from './Input/input_day2';

const mapInput = (text) => {
    const arrayOfStrings = text.split('\n');
    const inputMapped = arrayOfStrings.map(value => {
        const inputSplit = value.split(':')
        const requirementsSplit = inputSplit[0].split(' ');
        const minMaxSplit = requirementsSplit[0].split('-');
        const inputMap = {
            min: minMaxSplit[0],
            max: minMaxSplit[1],
            requirement: requirementsSplit[1],
            password: inputSplit[1].trim()
        }
        return(inputMap);
    })
    return inputMapped
}

const mappedData = mapInput(input_day2);

const isBetweenMinAndMax = ({min, max, password, requirement}) => {
    const re = new RegExp(requirement,"g");
    const countArray = password.match(re) || [];
    const isBetween = countArray.length >= min && countArray.length  <= max;
    return isBetween;
}


export const aocFunction2_1 = () => {
    let count = 0;

    mappedData.forEach(dataObject => {
        count = isBetweenMinAndMax(dataObject) ? count + 1 : count;
    })
    return count;
};

const isInEitherPosition = ({min, max, password, requirement}) => {
    
    if(password.length < max - 1) return false;
    const isInFirstPosition = password[min - 1] === requirement;
    const isInSecondPosition = password[max - 1] === requirement;
    return ((isInFirstPosition && !isInSecondPosition) || (isInSecondPosition && !isInFirstPosition)) || false;
}

export const aocFunction2_2 = () => {
    let count = 0;
    mappedData.forEach(dataObject => {
        count = isInEitherPosition(dataObject) ? count + 1 : count;
    })
        return count;
};
