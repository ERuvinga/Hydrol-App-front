
const ArroundBy10 = (floatNumber:string) =>{
    return Math.round((parseFloat(floatNumber)*10))/10;
}

const savingDataOfEsp =(datas:String[], RecoilFunctionSaving:any)=>{
    // Compteur 1
    const Appart_1 = datas[0].split("_");
    const Appart_2 = datas[1].split("_");
    RecoilFunctionSaving([
        {
            vitesse: ArroundBy10(Appart_1[0]),
            litre: ArroundBy10(Appart_1[1]),
        },
        {
            vitesse: ArroundBy10(Appart_2[0]),
            litre: ArroundBy10(Appart_2[1]),
        },
    ]);
}

export {
    savingDataOfEsp
}