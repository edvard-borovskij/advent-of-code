// type Cube = {
//     "blue": number,
//     "red": number,
//     "green": number,
// }
// 
// const maxColors = (colorNames: string[], game: string) : Cube => {
//     const result = colorNames.map((colorName) => {
//         const pattern = new RegExp(`(\\d)+ ${colorName}`, 'g');
//         const maxColor = game.match(pattern)?.map((color) => color.replace(colorName, '')).reduce((acc, v) =>  acc = (+acc > +v) ? +acc : +v, 0);
//         return maxColor == null ? 0 : maxColor;
//     });
//     console.log(result);
// }
// 
// maxColors(['red', 'green', 'blue'], 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green');


const maxColor = (colorName: string, game: string) : number => {
    const pattern = new RegExp(`(\\d)+ ${colorName}`, 'g'); 
    const maxColor = game.match(pattern)?.map((color) => color.replace(colorName, '')).reduce((acc, v) =>  acc = (+acc > +v) ? +acc : +v, 0);
    return maxColor == null ? 0 : maxColor;
}

const setup = {"red": 12, "green": 13, "blue": 14} ;

const games = (await (Bun.file("src/2023/02/input.txt").text())).split('\n');
let sum = 0;
games.forEach((game, index) => {
    if(setup.blue >= maxColor('blue', game) && setup.green >= maxColor('green', game) && setup.red >= maxColor('red', game)){
        sum+=index+1;
    } 
});

Bun.write("src/2023/02/output1.txt", sum.toString());
