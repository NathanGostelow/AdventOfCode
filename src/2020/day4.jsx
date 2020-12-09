import input from './Input/input_day4';

const dataToUse = input.split('\n');

const collectPassports = () => {
    const passports = [];
    let passportIndex = passports.length;
    dataToUse.forEach((value,index) => {
        if(value === "") passportIndex++
        if(!passports[passportIndex]) passports[passportIndex] = value
        else passports[passportIndex] += ` ${value}`;
    })
    return passports
}

const hasValidLines = (passport) => {
    const hasCid = passport.search('cid:') !== -1;
    const passportLines = passport.split(' ');

    if(passportLines.length === 8) return true;
    if(!hasCid && passportLines.length === 7 ) return true
    return false;
};

const isBetweenInclusive = (min, max, value) =>  value >= min && value <= max

const birthYearValidator = valueToValidate => isBetweenInclusive(1920, 2002, valueToValidate);
const issueYearValidator = valueToValidate => isBetweenInclusive(2010, 2020, valueToValidate);
const expirationYearValidator = valueToValidate => isBetweenInclusive(2020, 2030, valueToValidate);
const heightValidator = valueToValidate => {
    let cmValid = false;
    let inValid = false;
    if(valueToValidate.includes('cm')) cmValid = isBetweenInclusive(150, 193, valueToValidate.replace('cm', ''));
    if(valueToValidate.includes('in')) inValid = isBetweenInclusive(59, 76, valueToValidate.replace('in', ''));
    return cmValid || inValid;
}
const hairColourValidator = valueToValidate => {
    const re = new RegExp('^#[0-9a-f]{6}', 'i');
    const valid = !!valueToValidate.match(re);
    return valid;
}
const eyeColourValidator = valueToValidate => {
    const validEyeColours = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
    const valid = validEyeColours.includes(valueToValidate);
    return valid;
}
const passportIdValidator = valueToValidate => {
    const valid = /^\d+$/.test(valueToValidate) && valueToValidate.length === 9;
    return valid;
}

const validator = (fieldToValidate, valueToValidate) => {
    switch(fieldToValidate){
        case  'byr':
            return birthYearValidator(valueToValidate);
        case 'iyr':
            return issueYearValidator(valueToValidate);  
        case 'eyr':
            return expirationYearValidator(valueToValidate);  
        case 'hgt':
            return heightValidator(valueToValidate);  
        case 'hcl':
            return hairColourValidator(valueToValidate);  
        case 'ecl':
            return eyeColourValidator(valueToValidate);  
        case 'pid':
            return passportIdValidator(valueToValidate);  
        case 'cid':
            return true;
        default :
            return false;
    }
}

const hasValidData = (passport) => {
    const passportFields = passport.split(' ');    
    let invalidFields = [];
    passportFields.forEach(entry => {
        const [field, value] = entry.split(':');
        const isValidField = validator(field, value);
        if(!isValidField) invalidFields.push({field, value});
    })
    return invalidFields.length === 0;
}

export const aocFunction4_1 = () => {
    let count = 0;
    const listOfPassports = collectPassports();

    listOfPassports.forEach(pass => {
        if(hasValidLines(pass)) count++
    })
    return count;
}

export const aocFunction4_2 = () => {
    let count = 0;
    const listOfPassports = collectPassports();

    listOfPassports.forEach(pass => {
        console.log(hasValidData(pass));
        if(hasValidLines(pass) && hasValidData(pass)) count++
    })
    return count;
}