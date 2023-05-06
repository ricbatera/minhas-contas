// console.log(55273 / 900);
let num = 1
const formula = (loteria)=>{
    const cotas = 900;
    const divisao = loteria / cotas;
    const str = divisao.toString();
    const dec = str.split('.');
    let newV = `0.${dec[1]}`
    newV = newV.slice(0,8)
    let pedra = parseFloat(newV) * cotas;
    pedra = Math.round(pedra);

    if(pedra == 29){
        console.log(`Jogo nº${num}: ${loteria} - ${pedra}`);
        num++;
    }
}

const formula2 = (loteria)=>{
    const cotas = 900;
    const divisao = loteria / cotas;
    const str = divisao.toString();
    const dec = str.split('.');
    let newV = `0.${dec[1]}`
    newV = newV.slice(0,8)
    let pedra = parseFloat(newV) * cotas;
    pedra = Math.round(pedra);
    console.log(`Jogo nº${num}: ${loteria} - ${pedra}`);

}

formula2(13930);
// for (let i = 0; i < 99999 ; i++)formula(i);

