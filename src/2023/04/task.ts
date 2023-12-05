const values = (await (Bun.file("src/2023/04/input.txt").text())).split('\n'); 
const res = values.map((card) => {
    const [win, my]  = card.substring(card.indexOf(':')+1, card.length).split('|').map((val) => val.match(/(\d)+/g)?.map((val)=> val ? +val : 0));
    const red = my?.reduce((acc, val) => acc = win?.includes(val) ? acc +=1 : acc, 0); 
    return red != undefined && red > 1 ? Math.pow(2, red-1): red;
}).reduce((acc,val)=> acc !== undefined && val !== undefined ? acc+=val : 0);

Bun.write("src/2023/04/output1.txt", res.toString());