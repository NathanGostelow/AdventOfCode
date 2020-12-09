import input from './Input/input_day7';


const generateCamelCaseBag = (startWord, word2, word3) => `${startWord}${word2.charAt(0).toUpperCase() + word2.slice(1)}${word3.charAt(0).toUpperCase() + word3.slice(1)}`

const replaceValues = (bags) => {
    const arrayOfValues = [];
    bags.forEach(bag => {
        const bagWords = bag.split(' ');
        if(bagWords.length === 3) return false;
        const count = bagWords[0];
        if(bagWords[3].slice(-1) === '.') bagWords[3] = bagWords[3].slice(0, bagWords[3].length-1);
        const lastWord = parseInt(count) > 1 ? bagWords[3].slice(0, -1) : bagWords[3]
        const camelCasedBag = generateCamelCaseBag(bagWords[1], bagWords[2], lastWord)
        arrayOfValues.push({type: camelCasedBag, count});
    })
    return arrayOfValues;
}

const lines = input.split('\n');
const counts = {prev: null, current: 0};

const recurseThroughBag = (bagToFind) => {
    const bagsFound =[];
    lines.forEach(line => {
        const [bag, contains] = line.split('contain ');
        const containerValues = contains.split(', ');
        const bagValuesToGoThrough = replaceValues(containerValues);
        const bagWords = bag.split(' ')
        const newBag = generateCamelCaseBag(bagWords[0], bagWords[1], bagWords[2].slice(0, -1));

        const containsShinyThings = bagValuesToGoThrough.find(element => element.type === bagToFind);
        if(containsShinyThings) {
            bagsFound.push(newBag);
        }
    })
    return bagsFound;
}

export const aocFunction7_1 = () => {
    const finalBags = [];
    let initialBags = recurseThroughBag('shinyGoldBag')
    finalBags.push(...initialBags);

    counts.prev = counts.current;
    counts.current = finalBags.length;
    do {
    
        const foundBags = [];
        initialBags.forEach(value => {
            foundBags.push(...recurseThroughBag(value))
        });
        const filteredBags = foundBags.filter((value, index) => foundBags.indexOf(value) === index);
        
        finalBags.push(...filteredBags);
        
        initialBags = filteredBags;

        counts.prev = counts.current;
        counts.current = finalBags.length;

    }while(counts.current !== counts.prev);
    const finalfinalBag = finalBags.filter((value, index) => finalBags.indexOf(value) === index)
    return finalfinalBag.length;
}

// const checkBags = (bagToFind) => {
    
//     if(bagToFind.includes('shiny gold')) return [];
//     const nodesFound = [];
//     lines.find(value => {
//         const [bag, contents] = value.split(' contain ');
//         const contentsArray = contents.split(', ')

//         if(value.includes(bagToFind)) {
//             nodesFound.push(bag);
//         }
//     });
//     return nodesFound;
// }

const parseData = () => {
    const parsedData = [];
    lines.forEach(line => {
        const bagData = {parent: null, children: []}
        const [bag, contents] = line.split(' contain ');
        const [bagType, bagColour] = bag.split(' ');
        contents.split(', ').forEach(value => {
            if(value.includes('no other bag')) return
            const [count, type, colour] = value.split(' ');

            bagData.children.push({parent: `${type} ${colour}`, count});   
        })
        
        bagData.parent = `${bagType} ${bagColour}`;
        parsedData.push(bagData);
    })

    return parsedData;
}

const findBags = (bagToFind, arrayToSearch) => {
    const found = [];

    arrayToSearch.forEach(rule => {
        if(rule.parent === bagToFind && !found.find(val => val.parent === bagToFind)){
            rule.children.forEach(child => {
                for(let i = 0; i < child.count; i++) {
                    found.push(child);
                }
            })
            
        }
    })
    return found;
}

export const aocFunction7_2 = () => {

    const rules = parseData();
    const finalFinds = []
    let foundChildren = []

    const values = findBags('shiny gold', rules)
    foundChildren.push(...values);
    finalFinds.push(...values);

    counts.prev = counts.current;
    counts.current = finalFinds.length
    do {
        const foundBags = [];
        foundChildren.forEach(child => {
            const searched = findBags(child.parent, rules);
            foundBags.push(...searched);
        })
        finalFinds.push(...foundBags);
        foundChildren = foundBags;
        counts.prev = counts.current;
        counts.current = finalFinds.length
    } while (counts.prev !== counts.current)

    return finalFinds.length;
}