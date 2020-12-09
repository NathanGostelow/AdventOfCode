import input from './Input/input_day6';

const getGroupInputs = () => {
    const delimitedInput = input.split('\n');
    const groupArray = [];
    let groupAnswers = ''
    delimitedInput.forEach((value, index) => {
        if(value !== "") groupAnswers = `${groupAnswers}${value}` ;
        if(value === "" || index === delimitedInput.length - 1) {
            groupArray.push(groupAnswers);
            groupAnswers = ''
        }
    })
    return groupArray;
}

const getGroupInputsAsArrays = () => {
    const delimitedInput = input.split('\n');
    const groupArray = [];
    let groupAnswers = []
    delimitedInput.forEach((value, index) => {
        if(value !== "") groupAnswers.push(value.split('')) ;
        if(value === "" || index === delimitedInput.length - 1) {
            groupArray.push(groupAnswers);
            groupAnswers = []
        }
    })
    return groupArray;
}

const groupsAsStrings = getGroupInputs();
const groupsAsArrays = getGroupInputsAsArrays();


export const aocFunction6_1 = () => {
    let count = 0;
    groupsAsStrings.forEach(group => { 
        const answers = group.split('')
        const newAnswers = answers.filter((answer, index) => answers.indexOf(answer) === index);
        count += newAnswers.length;
    })
    return count
}

export const aocFunction6_2 = () => {
    let count = 0;
    groupsAsArrays.forEach(group => {
        const commonValues = group.reduce((answerArray, nextAnswerArray) => answerArray.filter(answer => nextAnswerArray.includes(answer)));
        count += commonValues.length;
    })

    return count
}