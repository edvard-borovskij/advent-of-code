const lines = (await (Bun.file("src/2023/06/input2.txt").text())).split('\n'); 
let [timeVal, distanceVal] = lines.map((line) => line.match(/(\d)+/g)?.join(''));

let time = [timeVal];
let distance = [distanceVal];

const getDistance = (totalMs: number, loadMs: number ): number => {
    let leftMs = totalMs - loadMs;
    let distanceMm = leftMs * loadMs; 
    return distanceMm;
};

let i: number;
let j: number;
let waysToWinThisRace: number;
let waysToWinAllRaces = 1;
let currentRaceRecord: number;
let numberOfRaces = time?.length;


for(i = 0; i < numberOfRaces; i++){
    currentRaceRecord = +distance[i];
    waysToWinThisRace = 0;
    for(j = 0; j < time[i]; j++){
        let travelledDistanceWithThisSetup = getDistance(time[i], j);
        // console.log(`Race: ${i+1}; Delay: ${j}; Distance: ${travelledDistanceWithThisSetup}`);
        waysToWinThisRace += travelledDistanceWithThisSetup > currentRaceRecord ? 1 : 0;
    }
    waysToWinAllRaces *= waysToWinThisRace;
}
Bun.write("src/2023/06/output2.txt", waysToWinAllRaces.toString());