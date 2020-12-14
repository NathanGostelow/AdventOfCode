import {testInput, input} from './Input/input_day11';

const parseData = (data) => {
    const parsedData = data.split('\n').map(val => val.split(''));
    return parsedData;
}

const stringifyGrid = (data) => {
    const copiedData = data.slice(0);
    let stringifiedRows = [];
    stringifiedRows = copiedData.map(value => {
        const newRow = value.join('');
        return newRow;
    });
    return stringifiedRows.join('\n');
}

const isOccupied = (seat) => seat === '#';

const checkSeat = (rowIndex, seatIndex, seatingArea) => {
    let adjacentSeats = 0;
    const previousRow = rowIndex - 1;
    const previousSeat = seatIndex - 1;
    const nextRow = rowIndex + 1;
    const nextSeat = seatIndex + 1;
    //calculate all seats at -1 current row
    if(previousRow !== -1) {
        // diagonal top-left
        if(previousSeat !== -1) {
            if(isOccupied(seatingArea[previousRow][previousSeat])) adjacentSeats++;
        }
        // diagonal top-right
        if(nextSeat !== seatingArea[0].length){
            if(isOccupied(seatingArea[previousRow][nextSeat])) adjacentSeats++
        }
        // top middle
        if(isOccupied(seatingArea[previousRow][seatIndex])) adjacentSeats++
    }
    // not left most seat
    if(previousSeat !== -1) {
        if(isOccupied(seatingArea[rowIndex][previousSeat])) adjacentSeats++
    }
    // not right most seat
    if(nextSeat !== seatingArea[0].length){
        if(isOccupied(seatingArea[rowIndex][nextSeat])) adjacentSeats++
    }
    //calculate all seats at +1 current row 
    if(nextRow !== seatingArea.length) {
        if(previousSeat !== -1) {
            if(isOccupied(seatingArea[nextRow][previousSeat])) adjacentSeats++
        }
        // middle right 
        if(nextSeat !== seatingArea[0].length) {
            if(isOccupied(seatingArea[nextRow][nextSeat])) adjacentSeats++
        }
        // middle bottom 
        if(isOccupied(seatingArea[nextRow][seatIndex])) adjacentSeats++
    }
    return adjacentSeats;
}

const findStabilisedSeating = (seatingArea) => {
    let copiedSeatingArea = seatingArea.slice(0);
    let updated = false;

    const updatedSeatingArea = [];
    let updatedRow = []

    copiedSeatingArea.forEach((row, rowIndex) => {
        row.forEach((seat, seatIndex) => {
            if(seat !== '.' ) {
                const adjacentSeats = checkSeat(rowIndex, seatIndex, seatingArea);
                if(adjacentSeats >= 4 && copiedSeatingArea[rowIndex][seatIndex] === '#') {
                    updatedRow.push('L');
                    updated = true;
                }
                if(adjacentSeats === 0 && copiedSeatingArea[rowIndex][seatIndex] === 'L') {
                    updatedRow.push('#');
                    updated = true
                }
            }
            if(updatedRow.length - 1 !== seatIndex) updatedRow.push(row[seatIndex]);

        })
        updatedSeatingArea.push(updatedRow);
        updatedRow = []
    })
    copiedSeatingArea = updatedSeatingArea;
    return [updatedSeatingArea, updated]
}

const recursiveCall = (seatingArea) => {
    let updated = false;
    let newSeatingAreaToSearch = seatingArea.slice(0)
    do {
        const [newSeatingArea, hasUpdated] = findStabilisedSeating(newSeatingAreaToSearch)
        updated = hasUpdated
        newSeatingAreaToSearch = newSeatingArea;
    }while(updated);

    const numberOfSeats = stringifyGrid(newSeatingAreaToSearch).match(/#/g).length;
        return numberOfSeats
}

export const aocFunction11_1 = () => {
    
    // const seatingArea = parseData(testInput);
    // const answer = recursiveCall(seatingArea);
    const seatingArea = parseData(input);
    const answer = recursiveCall(seatingArea);
    return answer;
}