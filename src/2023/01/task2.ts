function getCoordinates(input: string): string {
    const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const numbersToDigits = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9};
    
    function getIndexes(value: string, last = false) : {[key: string]: number} {
        let indexes: {[key: string]: number} = {};
        numbers.map((number) => indexes[number] = last ? value.lastIndexOf(number): value.indexOf(number));
        const filtered = Object.entries(indexes).filter(([, value]) => value != -1);
        return Object.fromEntries(filtered); 
    }
    
    const firstIndexes = getIndexes(input);
    const lastIndexes = getIndexes(input, true);
    
    //both text and digits present 
    if(Object.keys(firstIndexes).length && Object.keys(lastIndexes).length){
        const lowestIndex = Object.entries(firstIndexes).reduce(([prevKey, prevVal], [curKey, curVal]) => prevVal < curVal ? [prevKey, prevVal] : [curKey, curVal]);
        const lowestIndexObj = Object.fromEntries([lowestIndex]);
        const highestIndex = Object.entries(lastIndexes).reduce(([prevKey, prevVal], [curKey, curVal]) => prevVal > curVal ? [prevKey, prevVal] : [curKey, curVal]);
        const highestIndexObj = Object.fromEntries([highestIndex]);
            
        
        let sampleArray = Array.from(input);
        let firstDigit = 0; 
        let secondDigit = 0;
    
        // get first digit
        let found = false;
        let iteration = 0;
        
        if(Object.keys(lowestIndexObj)){
            while(!found && iteration < Object.values(lowestIndexObj)[0]){
                found = (/^\d$/.test((sampleArray[iteration++])));
            }
            const word = Object.keys(lowestIndexObj)[0].toString();
            // @ts-expect-error
            firstDigit = found ? +sampleArray[--iteration] : numbersToDigits[word];
        } 
    
        // get last digit
        found = false;
        iteration = sampleArray.length;
    
        if(Object.keys(highestIndexObj)){
            while(!found && iteration > Object.values(highestIndexObj)[0]){ 
                found = (/^\d$/.test((sampleArray[--iteration])));
            }
            const word = Object.keys(highestIndexObj)[0].toString();
            // @ts-expect-error
            secondDigit = found ? +sampleArray[iteration] : numbersToDigits[word];
        }

        return `${firstDigit}${secondDigit}`;
    } else {
        const extractedNumbers = input.match(/[0-9]/g);
        const combinedNumbers = extractedNumbers != null ? extractedNumbers[0] + extractedNumbers[extractedNumbers.length-1] : '0';
        return combinedNumbers;
    }
}

const text = await (Bun.file("src/2023/01/input.txt").text()); 
const values = text.split('\n');

const numberSum = values.reduce((acc, val) => acc += +getCoordinates(val), 0);
Bun.write("src/2023/01/output2.txt", numberSum.toString());
