const maxColor = (colorName: string, game: string) : number => {
    const pattern = new RegExp(`(\\d)+ ${colorName}`, 'g'); 
    const maxColor = game.match(pattern)?.map((color) => color.replace(colorName, '')).reduce((acc, v) =>  acc = (+acc > +v) ? +acc : +v, 0);
    return maxColor == null ? 0 : maxColor;
}

const games = (await (Bun.file("src/2023/02/input.txt").text())).split('\n');
let sum = 0;
games.forEach((game) => {
        sum+=maxColor('blue', game) * maxColor('green', game) * maxColor('red', game); 
});

Bun.write("src/2023/02/output2.txt", sum.toString());