import input_day3 from './Input/input_day3';

const getMap = (input) => {
    const arrayOfRows = input_day3.split('\n');
    const trimmedArrayOfRows = arrayOfRows.map(val => val.trim());
    return trimmedArrayOfRows;
}

const mapToUse = getMap(input_day3);

const calculateNumberOfTreesHit = (moveX, moveY) => {
    let countOfTrees = 0;
    let positionX = 0;
    let positionY = 0;
    const numOfRows = mapToUse.length - 1;
    const rowLength = mapToUse[0].length;
    do {
        positionX = positionX + moveX >= rowLength ? (positionX+moveX - rowLength) : positionX + moveX;
        positionY = positionY + moveY;
        const row = mapToUse[positionY];
        if(row[positionX] === '#') countOfTrees++;
      } while (positionY < numOfRows);
    return countOfTrees;
}

export const aocFunction3_1 = () => {
    return calculateNumberOfTreesHit(3, 1);
}

export const aocFunction3_2 = () => {
    const slopes = [{moveX: 1, moveY: 1},{moveX: 3, moveY: 1},{moveX: 5, moveY: 1},{moveX: 7, moveY: 1},{moveX: 1, moveY: 2}]
    let multipliedValue = 0;
    slopes.forEach(slope => {
        const numberOfTreesHit = calculateNumberOfTreesHit(slope.moveX, slope.moveY);
        multipliedValue = multipliedValue === 0 ? numberOfTreesHit : multipliedValue * numberOfTreesHit;
    })
    return multipliedValue;
}