export function CodeCreation(length: number = 4): number[]{
    const code: number[]=[];
    while(code.length<length){
        const num=Math.floor(Math.random()*10)
        if(code.includes(num)){
            continue
        }
        code.push(num);
    }
    return code;
}

export function bulls(guess:number[], secretCode:number[]):number{
    let bullsAmount=0;
    for(let i=0;i<secretCode.length;i++){
        if(secretCode[i]===guess[i]){
            bullsAmount++;
        }
    }
    return bullsAmount;
}

export function pgias(guess:number[], secretCode:number[]):number{
    let pgiasAmount=0;
    for(let i=0;i<secretCode.length;i++){
        for(let j=0; j<secretCode.length; j++){
            if(secretCode[i]===guess[j]&&i!=j){
                pgiasAmount++;
            }
        }
    }
    return pgiasAmount;
}
