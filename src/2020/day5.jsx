import input from './Input/input_day5';


const inputToUse = input.split('\n');

const binarySpacePartitionSearch = ( input ) => {
    const returnValue = {column: null, row: null};
    const tempRowValues = {minValue: 0, maxValue: 127};
    const tempColumnValues = {minValue: 0, maxValue: 7};
    const rowValues = input.split('');
    const columnValues = rowValues.splice(7, 3);

    rowValues.forEach((value, index) => {
        const totalRowsLeft = ((tempRowValues.maxValue - tempRowValues.minValue));
        const rowHalf = totalRowsLeft / 2
        if(value === 'F') tempRowValues.maxValue =  Math.floor(tempRowValues.maxValue - rowHalf); //lower
        if(value === 'B') tempRowValues.minValue = Math.ceil(tempRowValues.maxValue - rowHalf); // upper
        if(totalRowsLeft === 1) returnValue.row = value === 'F' ? (tempRowValues.minValue) : (tempRowValues.maxValue);
        return returnValue;
    })

    columnValues.forEach((value, index) => {
        const totalColumnsLeft = (tempColumnValues.maxValue - tempColumnValues.minValue); 
        const columnHalf = totalColumnsLeft / 2
        if(value === 'L') tempColumnValues.maxValue = Math.floor(tempColumnValues.maxValue - columnHalf); // lower
        if(value === 'R') tempColumnValues.minValue = Math.ceil(tempColumnValues.maxValue - columnHalf); // upper
        if(totalColumnsLeft === 1) returnValue.column = value === 'L' ? (tempColumnValues.minValue) : (tempColumnValues.maxValue);
        return returnValue;
    })
    const calcedVal = ((returnValue.row * 8) + returnValue.column);
    returnValue.id = calcedVal;
    return returnValue;
}

const arrayOfIds = []


export const aocFunction5_1 = () => {
    let highestId = 0;
    inputToUse.forEach(search => {
        const idToCheck = binarySpacePartitionSearch(search)
        if(idToCheck.id > highestId) highestId = idToCheck.id;
    });

    return highestId;
}

const checkIfSeat = (data) => {
    if(data.row === 0 || data.row === 127) return false
    if(!arrayOfIds.find(ele => ele.id === data.id + 1) && arrayOfIds.find(ele => ele.id === data.id + 2)) return data.id + 1
}

export const aocFunction5_2 = () => {
    let answer;
    inputToUse.forEach(search => {
        const seatData = binarySpacePartitionSearch(search)
        arrayOfIds.push(seatData);
    });
    arrayOfIds.forEach(check => {
        const seat = checkIfSeat(check)
        if(seat) {
            answer = seat;
        }
    })

    return answer;
}
