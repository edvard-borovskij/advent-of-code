const values = (await (Bun.file("src/2023/04/input.txt").text())).split('\n'); 
const res = values.map((card) => {
    const [win, my]  = card.substring(card.indexOf(':')+1, card.length).split('|').map((val) => val.match(/(\d)+/g)?.map((val)=> val ? +val : 0));
    return my?.reduce((acc, val) => acc = win?.includes(val) ? acc +=1 : acc, 0); 
});

let i = 0;
let j = 0;
let cardsWon = 0;
let output: number[] = [];

for(i = 0; i < res.length; i++){
    output[i] = 1; 
}

for(i=0; i < res.length; i++){
    cardsWon = res[i];
    for(j=i+1; cardsWon > 0 && j < res.length; j++){
        let numberOfCards = output[i];
        output[j] += (1 * numberOfCards);
        cardsWon--;
    }
}

Bun.write("src/2023/04/output2.txt", output.reduce((acc, val)=> acc+=val).toString());