import input_day1 from './Input/input_day1';

const convertText = (text) => {
    const arrayOfStrings = text.split('\n');
    const parsedArray = arrayOfStrings.map(value => parseInt(value, 10));
    return parsedArray
}

const dataToUse = convertText(input_day1);

export const aocFunction1_1 = () => {
    let answer;
    dataToUse.forEach(value => {
        const valueToFind = 2020 - value;
        const foundValue = dataToUse.find(
            missingValue => missingValue === valueToFind
        );
        if (foundValue) {
            answer = valueToFind * value;
        }
    });
    return answer;
};

export const aocFunction1_2 = () => {
    let answer;
    for (let i = 0; i < dataToUse.length; i++) {
        for (let j = i + 1; j < dataToUse.length; j++) {
            for (let k = i + 2; k < dataToUse.length; k++) {
                const sumOf3 = dataToUse[i] + dataToUse[j] + dataToUse[k];
                if (sumOf3 === 2020) {
                    const multipliedValues = dataToUse[i] * dataToUse[j] * dataToUse[k];
                        answer = multipliedValues;
                        return multipliedValues;
                }
            }
        }
    }
    return answer;
};
