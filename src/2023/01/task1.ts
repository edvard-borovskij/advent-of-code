// ==1

const text = await (Bun.file("src/2023/01/input.txt").text()); 
const values = text.split('\n');
const extractedNumbers = values.map((x) => x.match(/[0-9]/g));
// console.log(extractedNumbers);
const combinedNumbers = extractedNumbers.map((x) => x != null && x.length != 0 ? x[0]+x[x?.length-1] : [null]);
// console.log(combinedNumbers);
const sumNumbers = combinedNumbers.reduce((acc, val) => acc += +val, 0);
// console.log(sumNumbers);
Bun.write("src/2023/01/output1.txt", sumNumbers.toString());